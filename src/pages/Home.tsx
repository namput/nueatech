import React from "react";
import Section from "../components/ui/Section";
import { GlassCard } from "../components/ui/GlassCard";
import { LogoTicker } from "../components/ui/LogoTicker";
import { StatBand } from "../components/ui/StatBand";
import { Link } from "react-router-dom";
import { COMPANY } from "../config/company";
import { ArrowRight, ShieldCheck, GaugeCircle, Sparkles, Boxes } from "lucide-react";

const PARTNERS = [
  { name: "Stripe", logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" },
  { name: "Vercel", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Vercel_logo_black.svg" },
  { name: "Cloudflare", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Cloudflare_Logo.svg" },
];

const FEATURES = [
  { title: "Identity & Onboarding", desc: "KYC + Payment + Receipt ใน flow เดียว", icon: ShieldCheck },
  { title: "Performance by Design", desc: "Core Web Vitals ดีตั้งแต่วันแรก", icon: GaugeCircle },
  { title: "Content Engine", desc: "สถาปัตยกรรมคอนเทนต์วัดผลได้ + SEO", icon: Sparkles },
  { title: "Modular Platform", desc: "โครงสร้างแบบโมดูล ขยายง่าย ลดหนี้เทคนิค", icon: Boxes },
];

export default function Home(){
  return (
    <div className="relative">
      {/* HERO แบบ Aurora + Angled */}
      <Section aurora angleBottom className="pt-16 pb-10">
        <div className="grid items-center gap-8 md:grid-cols-[1.15fr_.85fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">{COMPANY.en} • Thailand</span>
            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
              สร้างแพลตฟอร์มให้ <span className="text-sky-300">เติบโตจริง</span> ในโลกจริง
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-neutral-300">{COMPANY.summary}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link to="/services" className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2 inline-flex items-center gap-2">ดูบริการ <ArrowRight className="h-4 w-4"/></Link>
              <Link to="/portfolio" className="rounded-2xl border border-white/10 bg-transparent px-4 py-2">เคสศึกษา</Link>
            </div>
          </div>
          <GlassCard className="p-2">
            <div className="relative overflow-hidden rounded-2xl">
              <img src={COMPANY.hero} alt={COMPANY.th} className="h-[420px] w-full object-cover"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"/>
              <div className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs">Demo Preview</div>
            </div>
          </GlassCard>
        </div>
        <div className="mt-8">
          <LogoTicker items={PARTNERS} />
        </div>
      </Section>

      {/* METRICS BAND */}
      <Section className="py-10">
        <StatBand stats={[
          { label: "ลูกค้า/ผู้ใช้", value: "1,200+" },
          { label: "ระบบพร้อมใช้งาน", value: "99.9%" },
          { label: "เวลาปล่อยฟีเจอร์เฉลี่ย", value: "< 2 สัปดาห์" },
        ]} />
      </Section>

      {/* FEATURE GRID – คอร์ปอเรตมากขึ้น */}
      <Section aurora angleTop angleBottom className="py-16">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">โซลูชันหลัก</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <GlassCard key={f.title} className="p-5">
              <div className="flex items-start gap-3">
                <f.icon className="h-5 w-5" />
                <div>
                  <div className="text-lg font-medium">{f.title}</div>
                  <p className="mt-1 text-neutral-300">{f.desc}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* CASE STUDIES (แบบกว้าง) */}
      <Section className="py-16">
        <div className="grid items-end gap-6 md:grid-cols-[1.1fr_.9fr]">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">เคสศึกษาล่าสุด</h2>
            <p className="mt-2 max-w-xl text-neutral-300">เรื่องจริงจากผู้ใช้จริง—สิ่งที่เราส่งมอบและผลลัพธ์ที่วัดได้</p>
            <div className="mt-5 grid gap-4">
              {[{t:"guson (กูสอน): เว็บไซต์สำหรับติวเตอร์แบบสำเร็จรูป",d:"ช่วยผู้สอนเปิดตัวคอร์สเร็วขึ้น 80% และมีเครื่องมือรับชำระเงิน/สลิปอัตโนมัติ"},{t:"Identity & Onboarding",d:"รวม KYC + Payment + Receipt ใน flow เดียว ลด drop-off 23%"}].map((c)=> (
                <GlassCard key={c.t} className="p-5">
                  <div className="text-lg font-medium">{c.t}</div>
                  <p className="mt-1 text-neutral-300">{c.d}</p>
                </GlassCard>
              ))}
            </div>
          </div>
          <GlassCard className="p-0 overflow-hidden">
            <img src={COMPANY.hero} alt="case" className="h-[360px] w-full object-cover" />
          </GlassCard>
        </div>
        <div className="mt-6 text-right">
          <Link to="/portfolio" className="text-sm opacity-85 underline underline-offset-4">ดูทั้งหมด →</Link>
        </div>
      </Section>

      {/* CTA */}
      <Section aurora angleTop className="py-16">
        <GlassCard className="grid gap-6 p-6 md:grid-cols-[1.2fr_.8fr] md:p-10">
          <div>
            <h3 className="text-2xl font-semibold leading-tight">พร้อมพาธุรกิจ/สถาบันของคุณให้เติบโต</h3>
            <p className="mt-2 text-neutral-300">คุยกับทีมเราเพื่อดีไซน์เส้นทางสู่ผลลัพธ์—เร็ว เสถียร และวัดผลได้</p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <Link to="/contact" className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2">ติดต่อทีมงาน</Link>
              <Link to="/services" className="rounded-2xl border border-white/10 bg-transparent px-4 py-2">ดูบริการ</Link>
            </div>
          </div>
          <form onSubmit={(e)=>{e.preventDefault(); alert("นี่เป็นฟอร์มตัวอย่าง—เชื่อมต่อ API หรือบริการรับฟอร์มของคุณ");}} className="grid gap-3">
            <input className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none" placeholder="ชื่อของคุณ" required />
            <input className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none" placeholder="อีเมล" type="email" required />
            <textarea className="min-h-[120px] rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none" placeholder="เล่าเป้าหมาย/โปรเจกต์ของคุณ" required />
            <button className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2" type="submit">เริ่มต้นพูดคุย</button>
          </form>
        </GlassCard>
      </Section>
    </div>
  );
}
