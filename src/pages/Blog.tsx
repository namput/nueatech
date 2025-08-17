
import React, { useMemo, useState } from 'react';
import Section from '../components/ui/Section';
import { GlassCard } from '../components/ui/GlassCard';
import PostCard from '../components/blog/PostCard';
import { POSTS, type PostMeta } from '../data/posts';
import { Search, Filter } from 'lucide-react';

const CATEGORIES = ['All', ...Array.from(new Set(POSTS.map(p => p.category)))];

export default function Blog(){
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  const [page, setPage] = useState(1);

  const pageSize = 6;

  const visible = useMemo(()=> POSTS.filter(p => p.published !== false), []);

  const filtered = useMemo(()=>{
    const term = q.trim().toLowerCase();
    return visible.filter(p => {
      const byCat = cat === 'All' || p.category === cat;
      const byQ = !term || p.title.toLowerCase().includes(term) || p.excerpt.toLowerCase().includes(term) || (p.tags||[]).some(t=>t.toLowerCase().includes(term));
      return byCat && byQ;
    }).sort((a,b)=> new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [visible, q, cat]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page-1)*pageSize, page*pageSize);

  return (
    <div className="relative">
      {/* HERO */}
      <Section aurora angleBottom className="pt-16 pb-10">
        <div className="grid items-center gap-8 md:grid-cols-[1.15fr_.85fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">บล็อก</span>
            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">เล่าเทคโนโลยีแบบใช้ได้จริง</h1>
            <p className="mt-3 max-w-2xl text-lg text-neutral-300">แชร์บทความจากประสบการณ์จริง—เว็บ, โมบาย, ระบบองค์กร, Performance, Security และการสร้างแพลตฟอร์มที่โตได้</p>
          </div>
          <GlassCard className="p-6">
            <div className="grid gap-3 md:grid-cols-2">
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                <Search className="h-4 w-4" />
                <input value={q} onChange={(e)=>{ setQ(e.target.value); setPage(1); }} placeholder="ค้นหาหัวข้อ/แท็ก" className="w-full bg-transparent outline-none placeholder:text-white/60"/>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="hidden items-center gap-1 rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-xs md:inline-flex"><Filter className="h-3.5 w-3.5" /> หมวดหมู่</span>
                {CATEGORIES.map((c)=> (
                  <button key={c} onClick={()=>{ setCat(c); setPage(1); }} className={`inline-flex items-center gap-2 rounded-2xl border px-3 py-1 text-sm ${cat===c? 'border-white/30 bg-white/15' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}>{c}</button>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      </Section>

      {/* GRID */}
      <Section aurora angleTop angleBottom className="py-16">
        {pageItems.length===0 ? (
          <div className="text-center opacity-80">ยังไม่มีบทความที่ตรงกับเงื่อนไข</div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {pageItems.map(p => <PostCard key={p.slug} p={p} />)}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-center gap-2 text-sm">
          <button disabled={page===1} onClick={()=> setPage(p=> Math.max(1, p-1))} className="rounded-xl border border-white/10 bg-white/5 px-3 py-1 disabled:opacity-40">ก่อนหน้า</button>
          <span className="opacity-80">หน้า {page} / {totalPages}</span>
          <button disabled={page===totalPages} onClick={()=> setPage(p=> Math.min(totalPages, p+1))} className="rounded-xl border border-white/10 bg-white/5 px-3 py-1 disabled:opacity-40">ถัดไป</button>
        </div>
      </Section>
    </div>
  );
}
