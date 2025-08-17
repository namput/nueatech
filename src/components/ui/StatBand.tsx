import React from "react";

export function StatBand({ stats }: { stats: { label: string; value: string }[] }){
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {stats.map((s) => (
        <div key={s.label} className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="text-sm opacity-80">{s.label}</div>
          <div className="text-2xl font-semibold">{s.value}</div>
        </div>
      ))}
    </div>
  );
}