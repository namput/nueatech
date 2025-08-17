
import React from 'react';
import { Link } from 'react-router-dom';
import { GlassCard } from '../../components/ui/GlassCard';
import { formatDateTH } from '../../utils/blog';
import { Tag, Calendar, Clock } from 'lucide-react';
import type { PostMeta } from '../../data/posts';

export default function PostCard({ p }: { p: PostMeta }){
  return (
    <GlassCard className="overflow-hidden">
      {p.cover && (
        <div className="relative">
          <img src={p.cover} alt={p.title} className="h-48 w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 text-xs opacity-90">
          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5">{p.category}</span>
          <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {formatDateTH(p.date)}</span>
        </div>
        <h3 className="mt-2 text-lg font-semibold leading-snug">
          <Link to={`/blog/${p.slug}`}>{p.title}</Link>
        </h3>
        <p className="mt-1 text-neutral-300 text-sm">{p.excerpt}</p>
        {p.tags && (
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            {p.tags.map((t) => (
              <span key={t} className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5">
                <Tag className="h-3.5 w-3.5" /> {t}
              </span>
            ))}
          </div>
        )}
        <div className="mt-3 text-right">
          <Link to={`/blog/${p.slug}`} className="text-sm underline underline-offset-4 opacity-90 hover:opacity-100">อ่านต่อ →</Link>
        </div>
      </div>
    </GlassCard>
  );
}
