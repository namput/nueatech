// src/pages/Portfolio.tsx
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "../components/ui/Section";
import { GlassCard } from "../components/ui/GlassCard";
import { Link } from "react-router-dom";
import { COMPANY } from "../config/company";
import {
  Search,
  Filter,
  Tag,
  ExternalLink,
  ArrowRight,
  GaugeCircle,
  ShieldCheck,
  Users,
  Timer,
  CheckCircle2,
  X,
} from "lucide-react";

// ----------------------------------------
// Types
// ----------------------------------------
interface Metric { label: string; value: string }
interface CaseStudy {
  id: string;
  title: string;
  year: string;
  cover: string;
  summary: string;
  categories: string[];
  tags: string[];
  link?: string; // external/demo
  metrics?: Metric[];
  stack?: string[];
  details?: {
    challenge?: string;
    solution?: string[]; // bullets
    outcome?: string[]; // bullets
  }
}

// ----------------------------------------
// Data (ตัวอย่าง – ปรับได้ตามเคสจริง)
// ----------------------------------------
const CASES: CaseStudy[] = [
  {
    id: "guson",
    title: "guson (กูสอน) – แพลตฟอร์มเว็บไซต์สำหรับติวเตอร์",
    year: "2024–2025",
    cover:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1600&auto=format&fit=crop",
    summary:
      "ให้ผู้สอนเปิดคอร์ส/ขายคอร์สได้เร็ว มีซับโดเมนอัตโนมัติ ชำระเงิน/ใบเสร็จ/แดชบอร์ดจัดการ",
    categories: ["Web", "Platform"],
    tags: ["Subdomain", "Payments", "Receipt", "Dashboard"],
    link: "https://guson.co",
    metrics: [
      { label: "Time‑to‑launch", value: "ลด 80%" },
      { label: "Uptime", value: "99.9%" },
      { label: "Core Vitals", value: "Good" },
    ],
    stack: ["React", "Tailwind", "Node.js", "MySQL", "Cloudflare", "Vercel"],
    details: {
      challenge:
        "ผู้สอนจำนวนมากต้องการเว็บไซต์เร็ว ใช้ง่าย ไม่ซับซ้อน และมีระบบจ่ายเงิน/เอกสารถูกต้อง",
      solution: [
        "ระบบสมัคร + ซับโดเมนอัตโนมัติ",
        "เชื่อมชำระเงิน + ใบเสร็จ",
        "แดชบอร์ดบริหารคอร์ส/คำสั่งซื้อ",
      ],
      outcome: [
        "เปิดตัวคลื่นแรกภายในไม่กี่สัปดาห์",
        "ตัวชี้วัดความเร็วหน้าเว็บผ่านระดับ Good",
      ],
    },
  },
  {
    id: "identity",
    title: "Identity & Onboarding – รวม KYC + Payment + Receipt ใน flow เดียว",
    year: "2024",
    cover:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1600&auto=format&fit=crop",
    summary:
      "ปรับขั้นตอนรับผู้ใช้ใหม่ ลดการหลุดระหว่างทาง และบันทึกหลักฐานการชำระเงินอัตโนมัติ",
    categories: ["Integration", "Payments"],
    tags: ["KYC", "Webhook", "Anti‑fraud"],
    metrics: [
      { label: "Drop‑off", value: "−23%" },
      { label: "Time‑to‑verify", value: "< 2 นาที" },
    ],
    stack: ["React", "Node", "Stripe/Omise", "Cloudflare Workers"],
    details: {
      solution: ["รวมแบบฟอร์มเดียว", "ตรวจสอบตัวตน + ชำระเงิน + ออกเอกสาร"],
      outcome: ["อัตราผ่านขั้นตอนสูงขึ้น", "รายงานตรวจสอบย้อนหลัง"],
    },
  },
  {
    id: "rpa",
    title: "OCR/RPA – จัดการเอกสารอัตโนมัติ",
    year: "2023",
    cover:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1600&auto=format&fit=crop",
    summary:
      "ย่นเวลาทำเอกสารด้วย Blue Prism + OCR เชื่อม ERP/บัญชี ลดงานซ้ำ",
    categories: ["Automation", "OCR/RPA"],
    tags: ["Blue Prism", "OCR", "ERP"],
    metrics: [
      { label: "Cycle time", value: "−60%" },
      { label: "Accuracy", value: "> 95%" },
    ],
    stack: ["Blue Prism", "Python", "Node", "Rest APIs"],
  },
  {
    id: "mobile",
    title: "Mobile App – React Native โมดูลพื้นฐานครบ",
    year: "2023",
    cover:
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=1600&auto=format&fit=crop",
    summary:
      "Onboarding, Push, Offline, CI/CD สำหรับสโตร์ พร้อม Design System",
    categories: ["Mobile"],
    tags: ["React Native", "Push", "CI/CD"],
    stack: ["React Native", "Expo/Gradle", "Fastlane"],
  },
  {
    id: "nlp-ta",
    title: "NLP (TH) – การจำแนกข้อความตาม TA",
    year: "2024",
    cover:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop",
    summary:
      "ต้นแบบฟีเจอร์ Data/AI สำหรับภาษาไทย: จัดหมวด, สรุป, วิเคราะห์อารมณ์",
    categories: ["Data/AI", "NLP"],
    tags: ["Thai NLP", "Classification", "Vector Search"],
    stack: ["Python", "scikit‑learn", "Embeddings"],
  },
  {
    id: "corp-revamp",
    title: "Corporate Website Revamp – คะแนน Core Web Vitals ดี",
    year: "2025",
    cover:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
    summary:
      "ปรับโครงสร้างเว็บองค์กรให้เร็ว ลื่น และ SEO พร้อม โทนภาพรวมสอดคล้องแบรนด์",
    categories: ["Web"],
    tags: ["SEO", "Core Vitals", "Design System"],
    stack: ["React", "Tailwind", "Vercel", "Cloudflare"],
  },
];

const CATEGORIES = ["All", "Web", "Mobile", "Integration", "Payments", "Automation", "OCR/RPA", "Platform", "Data/AI", "NLP"];

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// ----------------------------------------
// Components
// ----------------------------------------
function Chip({ children, active, onClick }: { children: React.ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-2xl border px-3 py-1 text-sm transition-colors ${
        active ? "border-white/30 bg-white/15" : "border-white/10 bg-white/5 hover:bg-white/10"
      }`}
    >
      {children}
    </button>
  );
}

function MetricPill({ m }: { m: Metric }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/30 px-2 py-0.5 text-xs">
      <GaugeCircle className="h-3.5 w-3.5" /> {m.label}: <span className="font-semibold">{m.value}</span>
    </span>
  );
}

function CaseCard({ item, onOpen }: { item: CaseStudy; onOpen: (c: CaseStudy) => void }) {
  return (
    <motion.article variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
      <GlassCard className="overflow-hidden">
        <div className="relative">
          <img src={item.cover} alt={item.title} className="h-56 w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute left-3 top-3 flex gap-2">
            {item.categories.slice(0, 2).map((c) => (
              <span key={c} className="rounded-full border border-white/15 bg-black/30 px-2 py-0.5 text-[11px]">{c}</span>
            ))}
          </div>
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/30 px-2 py-0.5 text-[11px]"
            >
              เดโม่ <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg font-semibold leading-tight">{item.title}</h3>
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs opacity-90">{item.year}</span>
          </div>
          <p className="mt-1 text-neutral-300">{item.summary}</p>
          {item.metrics && (
            <div className="mt-3 flex flex-wrap gap-2">
              {item.metrics.map((m) => (
                <MetricPill key={m.label} m={m} />
              ))}
            </div>
          )}
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            {item.tags.map((t) => (
              <span key={t} className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5">
                <Tag className="h-3.5 w-3.5" /> {t}
              </span>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <button onClick={() => onOpen(item)} className="text-sm underline underline-offset-4 opacity-90 hover:opacity-100">
              ดูรายละเอียด →
            </button>
            {item.link ? (
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm">
                เปิดเดโม่ <ExternalLink className="h-4 w-4" />
              </a>
            ) : (
              <span className="text-xs opacity-70">Private build</span>
            )}
          </div>
        </div>
      </GlassCard>
    </motion.article>
  );
}

function CaseModal({ item, onClose }: { item: CaseStudy | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="relative max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-black/60 to-black/30"
          >
            <button onClick={onClose} className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/40 p-1">
              <X className="h-5 w-5" />
            </button>
            <img src={item.cover} alt={item.title} className="h-56 w-full object-cover" />
            <div className="grid gap-4 p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs">{item.year}</span>
                {item.categories.map((c) => (
                  <span key={c} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs">{c}</span>
                ))}
              </div>
              <h3 className="text-xl font-semibold leading-tight">{item.title}</h3>
              <p className="text-neutral-300">{item.summary}</p>

              {item.metrics && (
                <div className="flex flex-wrap gap-2">
                  {item.metrics.map((m) => (
                    <MetricPill key={m.label} m={m} />
                  ))}
                </div>
              )}

              {item.stack && (
                <div>
                  <div className="text-sm opacity-80">เทคโนโลยี</div>
                  <div className="mt-1 flex flex-wrap gap-2 text-sm">
                    {item.stack.map((s) => (
                      <span key={s} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5">{s}</span>
                    ))}
                  </div>
                </div>
              )}

              {item.details && (
                <div className="grid gap-3 text-sm text-neutral-200">
                  {item.details.challenge && (
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <div className="mb-1 text-[13px] opacity-80">โจทย์</div>
                      <div>{item.details.challenge}</div>
                    </div>
                  )}
                  {item.details.solution && (
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <div className="mb-1 text-[13px] opacity-80">แนวทาง</div>
                      <ul className="space-y-1">
                        {item.details.solution.map((s, i) => (
                          <li key={i} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-sky-400" /> {s}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {item.details.outcome && (
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <div className="mb-1 text-[13px] opacity-80">ผลลัพธ์</div>
                      <ul className="space-y-1">
                        {item.details.outcome.map((s, i) => (
                          <li key={i} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-sky-400" /> {s}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-1 flex items-center justify-between">
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm">
                    เปิดเดโม่ <ExternalLink className="h-4 w-4" />
                  </a>
                ) : (
                  <span className="text-xs opacity-70">Private build</span>
                )}
                <button onClick={onClose} className="rounded-2xl border border-white/10 bg-white/10 px-3 py-1.5 text-sm">ปิด</button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ----------------------------------------
// Page
// ----------------------------------------
export default function Portfolio() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const [sel, setSel] = useState<CaseStudy | null>(null);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return CASES.filter((c) => {
      const inCat = cat === "All" || c.categories.includes(cat);
      const inQ = !term ||
        c.title.toLowerCase().includes(term) ||
        c.summary.toLowerCase().includes(term) ||
        c.tags.some((t) => t.toLowerCase().includes(term));
      return inCat && inQ;
    });
  }, [q, cat]);

  return (
    <div className="relative">
      {/* HERO */}
      <Section aurora angleBottom className="pt-16 pb-10">
        <div className="grid items-center gap-8 md:grid-cols-[1.15fr_.85fr]">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">ผลงานของ {COMPANY.th}</span>
            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
              เรื่องจริงจากผู้ใช้จริง <span className="text-sky-300">วัดผลได้</span>
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-neutral-300">
              เคสศึกษาที่คัดมา: โจทย์ → วิธีทำ → ผลลัพธ์ พร้อมตัวเลข/มาตรวัด เพื่อให้คุณเห็นภาพก่อนเริ่มโปรเจกต์
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-sm text-neutral-300">
              <span className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-1"><GaugeCircle className="h-4 w-4" /> Performance</span>
              <span className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-1"><ShieldCheck className="h-4 w-4" /> Security by default</span>
              <span className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-1"><Users className="h-4 w-4" /> User‑first</span>
              <span className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-1"><Timer className="h-4 w-4" /> Ship & Learn</span>
            </div>
          </motion.div>

          <GlassCard className="p-0 overflow-hidden">
            <img src={COMPANY.hero} alt="portfolio" className="h-[420px] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </GlassCard>
        </div>
      </Section>

      {/* FILTER BAR */}
      <Section className="py-8">
        <GlassCard className="p-4">
          <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <Search className="h-4 w-4" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="ค้นหาชื่อเคส/แท็ก/คำสำคัญ"
                className="w-full bg-transparent outline-none placeholder:text-white/60"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="hidden items-center gap-1 rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-xs md:inline-flex">
                <Filter className="h-3.5 w-3.5" /> หมวดหมู่
              </span>
              {CATEGORIES.map((c) => (
                <Chip key={c} active={cat === c} onClick={() => setCat(c)}>
                  {c}
                </Chip>
              ))}
            </div>
          </div>
        </GlassCard>
      </Section>

      {/* GRID */}
      <Section aurora angleTop angleBottom className="py-16">
        {filtered.length === 0 ? (
          <div className="text-center opacity-80">ไม่พบเคสที่ตรงเงื่อนไข ลองเปลี่ยนคำค้นหาหรือหมวดหมู่</div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <CaseCard key={item.id} item={item} onOpen={setSel} />
            ))}
          </div>
        )}
      </Section>

      {/* CTA */}
      <Section className="py-16">
        <GlassCard className="grid gap-6 p-6 md:grid-cols-[1.2fr_.8fr] md:p-10">
          <div>
            <h3 className="text-2xl font-semibold leading-tight">อยากเห็นเดโม่ที่ตรงกับธุรกิจคุณ?</h3>
            <p className="mt-2 text-neutral-300">เราคัดเคสและตัวอย่างที่ใกล้เคียงให้ดูได้ พร้อมอธิบายการวัดผลและแผนสเกล</p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <Link to="/contact" className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2 inline-flex items-center gap-2">คุยกับทีมงาน <ArrowRight className="h-4 w-4"/></Link>
              <Link to="/services" className="rounded-2xl border border-white/10 bg-transparent px-4 py-2">ดูบริการ</Link>
            </div>
          </div>
          <div className="grid gap-2 text-sm text-neutral-300">
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">• ตัวอย่าง KPI: conversion, drop‑off, retention, TTFB/LCP</div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">• เอกสาร: scope, timeline, risk, SLA</div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">• บริการเสริม: training, handover, monitoring</div>
          </div>
        </GlassCard>
      </Section>

      {/* MODAL */}
      <CaseModal item={sel} onClose={() => setSel(null)} />
    </div>
  );
}
