// src/pages/BlogPost.tsx
// เวอร์ชันนิ่งสุด: ตัด state MD/ปลั๊กอินออก ใช้ static import ตรง ๆ + ErrorBoundary
// ไม่ขึ้นกับการโหลดแบบไดนามิกอีกต่อไป → หมดปัญหา rehypePlugins/remarkPlugins เป็น null

import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Section from '../components/ui/Section';
import { GlassCard } from '../components/ui/GlassCard';
import { POSTS } from '../data/posts';
import { Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react';

// ✅ static imports
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const formatDateTH = (iso: string) => {
  const d = new Date(iso);
  const m = ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];
  return `${d.getDate()} ${m[d.getMonth()]} ${d.getFullYear()+543}`;
};
const estimateReadingTime = (text: string) => {
  const words = text.replace(/```[\s\S]*?```/g, ' ').replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words/250))} นาที`;
};
const preprocess = (raw: string) => {
  let s = raw;
  if (/<html|<head|<meta|<!DOCTYPE/i.test(s)) {
    const body = s.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    s = body ? body[1] : s;
    s = s.replace(/<head[\s\S]*?<\/head>/gi, '')
         .replace(/<meta[^>]*>/gi, '')
         .replace(/<link[^>]*>/gi, '')
         .replace(/<script[\s\S]*?<\/script>/gi, '');
  }
  const fence = /^```[\w-]*\n([\s\S]*?)\n```\s*$/;
  const m = s.trim().match(fence);
  if (m) s = m[1];
  return s;
};
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError:boolean; msg?:string}>{
  constructor(p:any){ super(p); this.state = {hasError:false}; }
  static getDerivedStateFromError(err:any){ return {hasError:true, msg:String(err?.message||err)}; }
  componentDidCatch(err:any, info:any){ console.error('BlogPost crashed:', err, info); }
  render(){ return this.state.hasError ? <div className="text-sm text-red-300">เกิดข้อผิดพลาดในการแสดงบทความ — {this.state.msg}</div> : this.props.children as any; }
}

export default function BlogPost(){
  const { slug } = useParams();
  const meta = useMemo(()=> POSTS.find(p => p.slug === slug && p.published !== false), [slug]);
  const [content, setContent] = useState<string>('กำลังโหลด…');
  const [error, setError] = useState<string>('');
  const [reading, setReading] = useState<string>('');

  useEffect(()=>{
    if(!meta) return;
    const src = meta.source?.startsWith('/') ? meta.source : `/${meta.source}`;
    fetch(src, { cache: 'no-cache' })
      .then(r=>{ if(!r.ok) throw new Error(`โหลดไฟล์ไม่สำเร็จ (${r.status})`); return r.text(); })
      .then(md=>{ const body = preprocess(md); setContent(body); setReading(estimateReadingTime(body)); document.title = `${meta.title} – Blog`; })
      .catch(e=>{ setError(e.message||'ไม่พบไฟล์บทความ'); setContent(`# ไม่พบไฟล์บทความ\n\nแหล่งที่มา: ${src}`); });
  }, [meta]);

  if(!meta){
    return (
      <Section className="py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="text-2xl font-semibold">ไม่พบบทความ</div>
          <div className="mt-2"><Link to="/blog" className="underline underline-offset-4">กลับไปหน้าบล็อก</Link></div>
        </div>
      </Section>
    );
  }

  return (
    <div className="relative">
      <Section aurora angleBottom className="pt-16 pb-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-sm opacity-90"><Link to="/blog" className="underline underline-offset-4">บล็อก</Link> / <span className="opacity-80">{meta.category}</span></div>
          <h1 className="mt-2 text-3xl font-semibold md:text-5xl leading-tight">{meta.title}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm opacity-90">
            <span className="inline-flex items-center gap-1"><Calendar className="h-4 w-4"/> {formatDateTH(meta.date)}</span>
            {reading && <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4"/> {reading}</span>}
          </div>
          {error && <div className="mt-2 text-xs text-red-300">ข้อผิดพลาด: {error}</div>}
        </div>
      </Section>

      {meta.cover && (
        <Section className="pb-0 pt-0">
          <div className="max-w-6xl mx-auto px-6">
            <GlassCard className="overflow-hidden"><img src={meta.cover} alt={meta.title} className="h-[360px] w-full object-cover"/></GlassCard>
          </div>
        </Section>
      )}

      <Section aurora angleTop className="py-10">
        <div className="max-w-6xl mx-auto px-6">
          <GlassCard className="p-6">
            <article className="prose prose-invert max-w-none">
              <ErrorBoundary>
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
              </ErrorBoundary>
            </article>
          </GlassCard>
        </div>
      </Section>

      <Section className="py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-between gap-3 text-sm">
          {(() => { const idx = POSTS.findIndex(p => p.slug === slug); const prev = idx>0 ? POSTS[idx-1] : null; return prev ? (
            <Link to={`/blog/${prev.slug}`} className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2"><ArrowLeft className="h-4 w-4"/> {prev.title}</Link>
          ) : <span/> })()}
          {(() => { const idx = POSTS.findIndex(p => p.slug === slug); const next = idx<POSTS.length-1 ? POSTS[idx+1] : null; return next ? (
            <Link to={`/blog/${next.slug}`} className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">{next.title} <ArrowRight className="h-4 w-4"/></Link>
          ) : <span/> })()}
        </div>
      </Section>
    </div>
  );
}

// ต้องมีแพ็กเกจเหล่านี้:
// npm i react-markdown remark-gfm rehype-raw