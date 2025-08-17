// src/pages/Services.tsx
import React from "react";
import { motion } from "framer-motion";
import Section from "../components/ui/Section";
import { GlassCard } from "../components/ui/GlassCard";
import { StatBand } from "../components/ui/StatBand";
import { Link } from "react-router-dom";
import { COMPANY } from "../config/company";
import {
  Globe,
  Smartphone,
  Workflow,
  Server,
  ShieldCheck,
  GaugeCircle,
  Palette,
  Bot,
  Rocket,
  Plug,
  Database,
  LineChart,
  Headphones,
  ArrowRight,
  CheckCircle2,
  CalendarClock,
  Wrench,
} from "lucide-react";

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

// -------------------- Data --------------------
const METRICS = [
  { label: "โปรเจกต์สำเร็จ", value: "10+" },
  { label: "Uptime", value: "99.9%" },
  { label: "ค่าเฉลี่ยเวลาปล่อยฟีเจอร์", value: "< 2 สัปดาห์" },
];

const SERVICES = [
  {
    icon: Globe,
    title: "เว็บไซต์ & เว็บแอป",
    desc: "Modern Web / SEO พร้อม Core Web Vitals ดีตั้งแต่วันแรก",
    bullets: [
      "Corporate / Landing / Microsite",
      "Dashboard & Admin Portal",
      "Next.js/React + Tailwind + Edge/CDN",
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile App (iOS / Android)",
    desc: "React Native เร็ว คุ้ม ดูแลระยะยาวได้",
    bullets: ["Onboarding, Push, In‑app purchase", "Deploy สโตร์ + CI/CD", "Design System คู่แฝดเว็บ"],
  },
  {
    icon: Plug,
    title: "Integration & Payments",
    desc: "เชื่อมต่อระบบชำระเงิน KYC อีเมล ใบเสร็จ และระบบภายนอก",
    bullets: ["Stripe / Omise / GB Prime Pay", "SSO / OAuth2", "Webhooks, CRM, Line OA"],
  },
  {
    icon: Workflow,
    title: "Automation / RPA / OCR",
    desc: "ลดงานซ้ำซ้อนด้วยบอท Blue Prism + OCR ตามขั้นตอนธุรกิจ",
    bullets: ["จัดการเอกสารอัตโนมัติ", "เชื่อม ERP/บัญชี", "ออกแบบ Flow + Monitor"],
  },
  {
    icon: Server,
    title: "Cloud & DevOps",
    desc: "โครงสร้างพื้นฐานปลอดภัย เสถียร สเกลได้",
    bullets: ["Vercel / Cloudflare / Docker", "CI/CD + Backups", "Observability (Logs/Metrics)"]
  },
  {
    icon: Palette,
    title: "UX/UI & Research",
    desc: "ออกแบบจากข้อมูลจริง ใช้ง่ายตั้งแต่ครั้งแรก",
    bullets: ["Design System", "Prototype/Usability Test", "A/B + Heatmap"]
  },
  {
    icon: Bot,
    title: "Data & AI Features",
    desc: "คุณสมบัติฉลาด ๆ เช่น ค้นหาฉลาด, สรุป, จัดหมวดอัตโนมัติ",
    bullets: ["NLP/ข้อความภาษาไทย", "Vector Search", "Analytics Dashboard"],
  },
];

const PLANS = [
  {
    name: "Starter",
    for: "เริ่มต้นเปิดตัวเร็ว",
    highlights: ["Landing/Website + แบบฟอร์ม", "SSL/Analytics/SEO basic", "ซัพพอร์ตอีเมล"],
    cta: "เริ่มคุย",
  },
  {
    name: "Growth",
    for: "ขยายฟีเจอร์/รับชำระเงิน",
    highlights: ["เว็บแอป + Dashboard", "Payment + Receipt + Webhook", "CI/CD + Backups"],
    featured: true,
    cta: "นัดเดโม่",
  },
  {
    name: "Enterprise",
    for: "องค์กร/สถาบัน",
    highlights: ["SSO/RBAC/Policy", "SLA/Uptime/Monitoring", "ที่ปรึกษาและเทรนนิ่ง"],
    cta: "คุย Solution",
  },
];

const PROCESS = [
  { icon: CalendarClock, title: "Discover", text: "เก็บโจทย์/เป้าหมาย กำหนด KPI/Scope" },
  { icon: Palette, title: "Design", text: "UX Flow, Wireframe, Prototype, Design System" },
  { icon: Wrench, title: "Build", text: "Dev + QA + Security review พร้อม CI/CD" },
  { icon: Rocket, title: "Launch", text: "Rollout + Observability + Feedback loop" },
  { icon: LineChart, title: "Grow", text: "A/B, Analytics, Roadmap ต่อเนื่อง" },
];

const FAQ = [
  {
    q: "ใช้เทคโนโลยีอะไรเป็นหลัก?",
    a: "React/Next.js, Node.js, MySQL/PlanetScale, Cloudflare/Vercel, และ Stripe สำหรับการชำระเงิน—เลือกจากเป้าหมายและข้อจำกัดของโปรเจกต์จริง",
  },
  {
    q: "ระยะเวลาส่งมอบทั่วไป?",
    a: "MVP ขนาดเล็ก 2–6 สัปดาห์, โปรเจกต์ที่มีแดชบอร์ด/จ่ายเงิน 6–10 สัปดาห์ ทั้งหมดวัดผลเป็นสปรินต์",
  },
  {
    q: "รองรับงานหลังบ้านองค์กร?",
    a: "รองรับ SSO, RBAC, Audit Log, Backup/Retention และนโยบายความปลอดภัยตามแนวทาง OWASP",
  },
];

// -------------------- UI Parts --------------------
function ServiceCard({ s }: { s: any }) {
  const Icon = s.icon as any;
  return (
    <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
      <GlassCard className="h-full p-5">
        <div className="flex items-start gap-3">
          <Icon className="h-5 w-5" />
          <div>
            <div className="text-lg font-medium">{s.title}</div>
            <p className="mt-1 text-neutral-300">{s.desc}</p>
          </div>
        </div>
        <ul className="mt-3 space-y-1 text-sm text-neutral-300">
          {s.bullets?.map((b: string) => (
            <li key={b} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-sky-400" /> {b}</li>
          ))}
        </ul>
      </GlassCard>
    </motion.div>
  );
}

function PlanCard({ p }: { p: any }) {
  return (
    <GlassCard className={`relative h-full p-6 ${p.featured ? "ring-1 ring-sky-400/40" : ""}`}>
      {p.featured && (
        <span className="absolute -top-3 right-4 rounded-full border border-white/10 bg-white/10 px-2 py-0.5 text-xs">ยอดนิยม</span>
      )}
      <div className="text-xl font-semibold">{p.name}</div>
      <div className="text-sm opacity-80">{p.for}</div>
      <ul className="mt-3 space-y-2 text-neutral-300 text-sm">
        {p.highlights.map((h: string) => (
          <li key={h} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-sky-400" /> {h}</li>
        ))}
      </ul>
      <div className="mt-4">
        <Link to="/contact" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-sm">{p.cta} <ArrowRight className="h-4 w-4"/></Link>
      </div>
    </GlassCard>
  );
}

// -------------------- Page --------------------
export default function Services() {
  return (
    <div className="relative">
      {/* HERO */}
      <Section aurora angleBottom className="pt-16 pb-10">
        <div className="grid items-center gap-8 md:grid-cols-[1.15fr_.85fr]">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">
              บริการของ {COMPANY.th}
            </span>
            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
              บริการครบวงจร <span className="text-sky-300">ออกแบบ‑พัฒนา‑สเกล</span>
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-neutral-300">
              {COMPANY.summary}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link to="/portfolio" className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2 inline-flex items-center gap-2">ดูเคสจริง <ArrowRight className="h-4 w-4"/></Link>
              <Link to="/contact" className="rounded-2xl border border-white/10 bg-transparent px-4 py-2">เริ่มต้นคุย</Link>
            </div>
          </motion.div>

          <GlassCard className="p-0 overflow-hidden">
            <img src={COMPANY.hero} alt="services" className="h-[420px] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"/>
          </GlassCard>
        </div>
      </Section>

      {/* METRICS */}
      <Section className="py-10">
        <StatBand stats={METRICS} />
      </Section>

      {/* SERVICE GRID */}
      <Section aurora angleTop angleBottom className="py-16">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">สิ่งที่เราทำ</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <ServiceCard key={s.title} s={s} />
          ))}
        </div>
      </Section>

      {/* PLANS */}
      <Section className="py-16">
        <div className="grid items-end gap-6 md:grid-cols-[1.1fr_.9fr]">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">แพ็กเกจตัวอย่าง</h2>
            <p className="mt-2 max-w-xl text-neutral-300">เราปรับสcope/ราคาให้เหมาะกับเป้าหมายธุรกิจของคุณ—ตัวอย่างแพ็กเกจต่อไปนี้เป็นจุดตั้งต้น</p>
          </div>
          <div className="text-right"><Link to="/contact" className="text-sm underline underline-offset-4 opacity-90">สอบถามสcope/ใบเสนอราคา →</Link></div>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {PLANS.map((p) => (
            <PlanCard key={p.name} p={p} />
          ))}
        </div>
      </Section>

      {/* PROCESS */}
      <Section aurora angleTop angleBottom className="py-16">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">กระบวนการทำงาน</h2>
        <div className="grid gap-4 md:grid-cols-5">
          {PROCESS.map((st) => (
            <GlassCard key={st.title} className="p-5">
              <div className="flex items-start gap-3">
                <st.icon className="h-5 w-5" />
                <div>
                  <div className="font-medium">{st.title}</div>
                  <p className="text-sm text-neutral-300">{st.text}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section className="py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {FAQ.map((f) => (
            <GlassCard key={f.q} className="p-6">
              <div className="text-lg font-semibold">{f.q}</div>
              <p className="mt-1 text-neutral-300">{f.a}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section aurora angleTop className="py-16">
        <GlassCard className="grid gap-6 p-6 md:grid-cols-[1.2fr_.8fr] md:p-10">
          <div>
            <h3 className="text-2xl font-semibold leading-tight">อยากเริ่มจาก MVP หรือย้ายระบบเดิม?</h3>
            <p className="mt-2 text-neutral-300">เล่าเป้าหมายและข้อจำกัดให้เราฟัง—เราจะช่วยออกแบบเส้นทางที่วัดผลได้และขยายต่อได้</p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <a href={`mailto:${COMPANY.email}`} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2">อีเมล: {COMPANY.email}</a>
              <Link to="/portfolio" className="rounded-2xl border border-white/10 bg-transparent px-4 py-2">ดูเคสศึกษา</Link>
            </div>
          </div>
          <form onSubmit={(e)=>{e.preventDefault(); alert("นี่เป็นฟอร์มตัวอย่าง—เชื่อมต่อ API หรือบริการรับฟอร์มของคุณ");}} className="grid gap-3">
            <input className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none" placeholder="ชื่อของคุณ" required />
            <input className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none" placeholder="อีเมล" type="email" required />
            <textarea className="min-h-[120px] rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none" placeholder="เล่าโปรเจกต์/เป้าหมายของคุณ" required />
            <button className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2" type="submit">เริ่มต้นพูดคุย</button>
          </form>
        </GlassCard>
      </Section>
    </div>
  );
}
