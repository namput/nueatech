// src/pages/About.tsx
import React from "react";
import { motion } from "framer-motion";
import { COMPANY } from "../config/company";
import Section from "../components/ui/Section";
import { GlassCard } from "../components/ui/GlassCard";
import { StatBand } from "../components/ui/StatBand";
import { Link } from "react-router-dom";
import { Target, Rocket, ShieldCheck, Users, Sparkles, Building2, GaugeCircle, Globe2, HeartHandshake, Award, Clock3 } from "lucide-react";

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const METRICS = [
  { label: "ผู้ใช้/ลูกค้า", value: "1,200+" },
  { label: "Uptime", value: "99.9%" },
  { label: "เวลาปล่อยฟีเจอร์เฉลี่ย", value: "< 2 สัปดาห์" },
];

const VALUES = [
  { icon: Target, title: "User-first", desc: "ตัดสินใจจากคุณค่าที่ผู้ใช้ได้รับ ไม่ใช่จำนวนสไลด์" },
  { icon: GaugeCircle, title: "Performance by Design", desc: "เร็ว ลื่น เสถียร ตั้งแต่วันแรก (Core Web Vitals)" },
  { icon: ShieldCheck, title: "Security by Default", desc: "ออกแบบความปลอดภัยตั้งแต่ต้น ไม่ใช่แค่ปะชุน" },
  { icon: Rocket, title: "Ship & Learn", desc: "ปล่อยไว เรียนรู้ไว ปรับปรุงเชิงข้อมูล" },
];

const TIMELINE = [
  { year: "2021", title: "เริ่มทีมเล็ก", info: "ทดลองเครื่องมือสําหรับผู้สอนและผู้เรียน" },
  { year: "2022", title: "MVP", info: "เปิด Beta เว็บไซต์สําเร็จรูปสำหรับติวเตอร์" },
  { year: "2023", title: "โตด้วยฟีเจอร์สำคัญ", info: "ชำระเงิน/ใบเสร็จ/ซับโดเมนอัตโนมัติ" },
  { year: "2024", title: "ปรับสถาปัตย์", info: "CDN + Edge ช่วยความเร็วและเสถียรภาพทั่วประเทศ" },
  { year: "2025", title: "ขยายสู่องค์กร", info: "เตรียมแพ็กเกจสําหรับสถาบัน/ธุรกิจ" },
];

const PARTNERS = [
  { name: "Stripe", logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" },
  { name: "Vercel", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Vercel_logo_black.svg" },
  { name: "Cloudflare", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Cloudflare_Logo.svg" },
];

export default function About() {
  return (
    <div className="relative">
      {/* HERO: Aurora + angled แยกอารมณ์จากเว็บส่วนตัว */}
      <Section aurora angleBottom className="pt-16 pb-10">
        <div className="grid items-center gap-8 md:grid-cols-[1.15fr_.85fr]">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">
              <Globe2 className="h-3.5 w-3.5" /> เกี่ยวกับ {COMPANY.th}
            </span>
            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
              เราสร้างแพลตฟอร์มที่ <span className="text-sky-300">เติบโตได้จริง</span> ในโลกจริง
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-neutral-300">{COMPANY.summary}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-neutral-300">
              <span className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-1"><Target className="h-4 w-4" /> โฟกัสผลลัพธ์</span>
              <span className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-1"><Rocket className="h-4 w-4" /> Ship ไว เรียนรู้ไว</span>
              <span className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-1"><ShieldCheck className="h-4 w-4" /> ปลอดภัยโดยออกแบบ</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
            <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-tr from-sky-400/30 via-fuchsia-400/20 to-indigo-400/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-1">
              <img src={COMPANY.hero} alt={COMPANY.th} className="h-[420px] w-full rounded-[1.9rem] object-cover" />
            </div>
          </motion.div>
        </div>
      </Section>

      {/* METRICS */}
      <Section className="py-10">
        <StatBand stats={METRICS} />
      </Section>

      {/* MISSION / STORY */}
      <Section aurora angleTop angleBottom className="py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <motion.article variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-semibold tracking-tight">พันธกิจ</h2>
              <p className="mt-2 text-neutral-300">ทำให้คนไทยเข้าถึงเทคโนโลยีคุณภาพระดับโลกโดยไม่ต้องเป็นสายเทค—เครื่องมือที่ใช้งานง่าย เร็ว เสถียร ราคาจับต้องได้ และสามารถเติบโตไปกับธุรกิจ/สถาบันของคุณ</p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {[{t:"คุณภาพระดับโปรดักชัน", i:Building2},{t:"Performance & Scalability", i:GaugeCircle},{t:"ซัพพอร์ตเข้าใจธุรกิจ", i:HeartHandshake},{t:"มาตรฐานความปลอดภัย", i:ShieldCheck}].map((x,idx)=>{
                  const Icon:any = x.i; return (
                    <div key={idx} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-sm"><Icon className="h-4 w-4"/> {x.t}</div>
                  );
                })}
              </div>
            </GlassCard>
          </motion.article>

          <motion.article variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-semibold tracking-tight">เรื่องราว</h2>
              <p className="mt-2 text-neutral-300">เริ่มจากทีมเล็กที่เชื่อในพลังของการลงมือทำจริง เราปั้นจาก MVP เล็ก ๆ สู่แพลตฟอร์มที่รองรับผู้ใช้จริงทั่วประเทศ ด้วยสถาปัตยกรรมที่เรียบง่าย รักษาง่าย และยืดหยุ่นต่อการเติบโต</p>
              <ul className="mt-3 space-y-2 text-neutral-300 text-sm">
                <li className="flex items-start gap-2"><Sparkles className="mt-0.5 h-4 w-4 text-sky-400" /> Shipping ที่แก้ปัญหาจริง—ลดงานซ้ำ เพิ่มประสบการณ์ผู้ใช้</li>
                <li className="flex items-start gap-2"><Sparkles className="mt-0.5 h-4 w-4 text-sky-400" /> ใช้ข้อมูลตัดสินใจ: A/B, heatmap, feedback loop</li>
                <li className="flex items-start gap-2"><Sparkles className="mt-0.5 h-4 w-4 text-sky-400" /> ความปลอดภัยเป็นวัฒนธรรม ไม่ใช่ feature เสริม</li>
              </ul>
            </GlassCard>
          </motion.article>
        </div>
      </Section>

      {/* VALUES */}
      <Section className="py-16">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">ค่านิยมหลัก</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <motion.div key={v.title} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <GlassCard className="p-5">
                <div className="flex items-start gap-3">
                  <v.icon className="h-5 w-5" />
                  <div>
                    <div className="text-lg font-medium">{v.title}</div>
                    <p className="mt-1 text-neutral-300">{v.desc}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* TIMELINE */}
      <Section aurora angleTop angleBottom className="py-16">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">เส้นทางของเรา</h2>
        <div className="relative pl-6">
          <div className="absolute left-2 top-0 h-full w-px bg-gradient-to-b from-white/60 via-white/20 to-transparent" />
          <div className="space-y-5">
            {TIMELINE.map((t) => (
              <motion.div key={t.year} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="relative">
                <div className="absolute -left-[11px] top-2 h-3 w-3 rounded-full bg-sky-400" />
                <GlassCard className="p-4">
                  <div className="flex items-center gap-3 text-sm opacity-90"><Clock3 className="h-4 w-4" /> {t.year}</div>
                  <div className="mt-1 text-lg font-medium">{t.title}</div>
                  <p className="text-neutral-300">{t.info}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* TRUST / PARTNERS */}
      <Section className="py-16">
        <div className="grid gap-6 md:grid-cols-[1.2fr_.8fr]">
          <GlassCard className="p-6">
            <h2 className="text-2xl font-semibold tracking-tight">ทำงานบนมาตรฐานระดับโลก</h2>
            <p className="mt-2 text-neutral-300">โครงสร้างพื้นฐานและพาร์ทเนอร์เชื่อถือได้ เพื่อความเร็ว เสถียรภาพ และความปลอดภัย</p>
            <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3">
              {PARTNERS.map((p) => (
                <div key={p.name} className="flex items-center justify-center rounded-xl border border-white/10 bg-black/20 p-4">
                  <img src={p.logo} alt={p.name} className="max-h-8 opacity-80" />
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h2 className="text-2xl font-semibold tracking-tight">รางวัล/การรับรอง</h2>
            <ul className="mt-3 space-y-2 text-neutral-300">
              <li className="flex items-start gap-2"><Award className="mt-0.5 h-4 w-4 text-sky-400" /> Core Web Vitals ระดับดีเยี่ยมในหน้า Landing หลัก</li>
              <li className="flex items-start gap-2"><Award className="mt-0.5 h-4 w-4 text-sky-400" /> แนวทางความปลอดภัยตาม OWASP + นโยบายสำรองข้อมูล</li>
            </ul>
            <div className="mt-4 text-sm">
              <Link to="/privacy" className="underline underline-offset-4 opacity-90 hover:opacity-100">อ่านนโยบายความเป็นส่วนตัว</Link>
            </div>
          </GlassCard>
        </div>
      </Section>

      {/* CTA */}
      <Section aurora angleTop className="py-16">
        <GlassCard className="grid gap-6 p-6 md:grid-cols-[1.2fr_.8fr] md:p-10">
          <div>
            <h3 className="text-2xl font-semibold leading-tight">มาร่วมสร้างสิ่งที่คนไทยภูมิใจไปด้วยกัน</h3>
            <p className="mt-2 text-neutral-300">ชวนคุยเรื่องเป้าหมาย โปรดักต์ และการสเกลให้โตอย่างยั่งยืน—เราพร้อมลงมือ</p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <a href={`mailto:${COMPANY.email}`} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2">อีเมล: {COMPANY.email}</a>
              <Link to="/careers" className="rounded-2xl border border-white/10 bg-transparent px-4 py-2">ดูตำแหน่งงาน</Link>
            </div>
          </div>
          <form onSubmit={(e)=>{e.preventDefault(); alert("นี่เป็นฟอร์มตัวอย่าง — โปรดเชื่อมต่อ Backend/บริการรับฟอร์มของคุณ (เช่น Formspree หรือ API ของคุณ)");}} className="rounded-2xl border border-white/10 bg-black/20 p-6 grid gap-3">
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
