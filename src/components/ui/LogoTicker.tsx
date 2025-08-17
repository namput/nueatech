import React from "react";

export function LogoTicker({ items }: { items: { name: string; logo: string }[] }){
  const line = [...items, ...items];
  return (
    <div className="overflow-hidden py-6">
      <div className="ticker items-center">
        {line.map((p, i) => (
          <div key={i} className="flex h-12 w-32 items-center justify-center rounded-xl border border-white/10 bg-black/20">
            <img src={p.logo} alt={p.name} className="max-h-6 opacity-80" />
          </div>
        ))}
      </div>
    </div>
  );
}