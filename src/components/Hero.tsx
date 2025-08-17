import React from "react";
import { COMPANY } from "../config/company";
export function Hero({ title, subtitle, cta, image }: { title: string; subtitle?: string; cta?: React.ReactNode; image?: string; }) {
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 pb-16 pt-10 md:grid-cols-[1.1fr_.9fr]">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">
          <span>Product Builder from Thailand</span>
        </div>
        <h1 className="mt-5 text-4xl font-semibold leading-tight md:text-6xl">{title}</h1>
        {subtitle && <p className="mt-3 text-lg text-neutral-300">{subtitle}</p>}
        {cta && <div className="mt-6 flex flex-wrap items-center gap-3">{cta}</div>}
      </div>
      <div className="relative">
        <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-tr from-sky-400/30 via-fuchsia-400/20 to-indigo-400/20 blur-2xl" />
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-1">
          <img src={image ?? COMPANY.hero} alt={COMPANY.th} className="h-[420px] w-full rounded-[1.9rem] object-cover" />
        </div>
      </div>
    </section>
  );
}
