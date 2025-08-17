// src/pages/Team.tsx
import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Facebook, Mail, Award, Sparkles, Code2, ShieldCheck, Rocket, Users, Briefcase, GraduationCap } from "lucide-react";
import { COMPANY } from "../config/company";

// =============================================================
// TEAM DATA – อัปเดตตามข้อมูลจริง (3 คน)
// ใส่รูปไว้ใน public/images/ ตามพาธที่ระบุใน avatar
// =============================================================
export type Social = { name: "LinkedIn" | "Facebook" | "Email" | string; url: string };
export type Member = {
  name: string;
  role: string;
  avatar: string; // URL/path
  bio?: string;
  tags?: string[]; // expertise/keywords
  socials?: Social[];
};

const TEAM: Member[] = [
  {
    name: "เอกชัย ฉัตรพงศ์เลอเลิศ",
    role: "CEO / COO",
    avatar: "/images/aekkachai.jpg",
    bio: "ประธานเจ้าหน้าที่บริหาร (CEO) และหัวหน้าฝ่ายปฏิบัติการ (COO) ป.โท วิทยาการคอมพิวเตอร์ ธรรมศาสตร์ ผู้ก่อตั้งและผู้บริหารเทคโนโลยีของบริษัท เชี่ยวชาญ Mobile/Web, OCR‑RPA และการบริหารทีมพัฒนาซอฟต์แวร์ โปรเจกต์หลัก: guson.co",
    tags: ["Product", "Mobile", "Web", "RPA"],
    socials: [
      { name: "Email", url: "mailto:contact@nueatech.co.th" },
      { name: "Facebook", url: "https://facebook.com/gusonplatform" },
    ],
  },
  {
    name: "วันชนะ ฉัตรพงศ์เลอเลิศ",
    role: "CMO / CTO",
    avatar: "/images/wanchana.jpg",
    bio: "หัวหน้าฝ่ายการตลาด (CMO) และหัวหน้าฝ่ายเทคโนโลยี (CTO) กำลังศึกษาปริญญาตรี วิทยาการคอมพิวเตอร์ ม.รามคำแหง ดูแลการสื่อสารการตลาด การเติบโตของแบรนด์ และร่วมดูแลด้านเทคโนโลยีของแพลตฟอร์ม guson",
    tags: ["Marketing", "Growth", "Brand", "Tech"],
  },
  {
    name: "จีระอนันต์ ปวงรัตนคุณ",
    role: "Head of Finance & Accounting",
    avatar: "/images/jiraanan.jpg",
    bio: "จบการศึกษาสาขาการบัญชี มทร.ล้านนา ตาก ดูแลระบบบัญชี การเงิน ภาษี และรายงานงบการเงินของบริษัท เชี่ยวชาญการจัดทำบัญชีรายเดือนและประสานงานกับหน่วยงานภายนอก",
    tags: ["Accounting", "Finance", "Tax", "Reporting"],
  },
];

const ADVISORS: Member[] = [];
const OPEN_ROLES: { title: string; type: string; location: string; link: string }[] = [];

// =============================================================
// UI helpers
// =============================================================
const fade = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

function SocialIcon({ s }: { s: Social }) {
  const cls = "h-4 w-4";
  if (s.name === "LinkedIn") return <Linkedin className={cls} />;
  if (s.name === "Facebook") return <Facebook className={cls} />;
  if (s.name === "Email") return <Mail className={cls} />;
  return <Sparkles className={cls} />;
}

function MemberCard({ m }: { m: Member }) {
  return (
    <motion.article
      variants={fade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-1"
    >
      <div className="absolute -inset-1 rounded-[1.75rem] bg-gradient-to-tr from-sky-400/0 via-fuchsia-400/0 to-indigo-400/0 opacity-0 blur-xl transition-opacity group-hover:opacity-20" />
      <div className="relative grid grid-cols-[96px_1fr] gap-4 rounded-[1.6rem] bg-black/30 p-4">
        <img src={m.avatar} alt={m.name} className="h-24 w-24 rounded-2xl object-cover" />
        <div>
          <div className="text-lg font-semibold tracking-tight">{m.name}</div>
          <div className="text-sm opacity-80">{m.role}</div>
          {m.bio && <p className="mt-2 text-sm text-neutral-300">{m.bio}</p>}
          <div className="mt-3 flex flex-wrap gap-2">
            {m.tags?.map((t) => (
              <span key={t} className="rounded-xl border border-white/10 bg-white/5 px-2 py-1 text-xs text-neutral-200">
                {t}
              </span>
            ))}
          </div>
          {m.socials && (
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm opacity-90">
              {m.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-white">
                  <SocialIcon s={s} /> {s.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// =============================================================
// PAGE
// =============================================================
export default function Team() {
  return (
    <div className="relative">
      {/* Background Orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-sky-500/25 blur-3xl" />
        <div className="absolute top-1/3 -right-10 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-4 pb-12 pt-10">
        <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs opacity-90">
            <Users className="h-3.5 w-3.5" /> ทีมของ {COMPANY.th}
          </span>
          <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
            ทีมเล็ก พลังใหญ่ <span className="text-sky-300">ลงมือจริง</span> และเติบโตต่อเนื่อง
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-neutral-300">
            เราโฟกัส Ship ไว เรียนรู้ไว ดูแลผู้ใช้เป็นศูนย์กลาง—สร้างแพลตฟอร์มที่คนไทยใช้ได้จริง พร้อมมาตรฐานความปลอดภัยและคุณภาพระดับโปรดักชัน
          </p>
        </motion.div>
      </section>

      {/* CORE TEAM (3 คน) */}
      <section className="mx-auto max-w-7xl px-4 pb-14">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">แกนหลัก</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((m) => (
            <MemberCard key={m.name} m={m} />
          ))}
        </div>
      </section>

      {/* CULTURE / HOW WE WORK */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="grid gap-6 md:grid-cols-2">
          <motion.article variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold tracking-tight">แนวทางการทำงาน</h3>
            <ul className="mt-3 space-y-2 text-neutral-300">
              <li className="flex items-start gap-2"><Briefcase className="mt-0.5 h-4 w-4 text-sky-400" /> โฟกัสผลลัพธ์ ไม่ใช่ชั่วโมงนั่งโต๊ะ</li>
              <li className="flex items-start gap-2"><Award className="mt-0.5 h-4 w-4 text-sky-400" /> คุณภาพคือหน้าที่ของทุกคน ไม่ใช่แค่ QA</li>
              <li className="flex items-start gap-2"><Sparkles className="mt-0.5 h-4 w-4 text-sky-400" /> เรียบง่ายก่อน—ขยายเมื่อข้อมูลยืนยัน</li>
            </ul>
          </motion.article>

          <motion.article variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold tracking-tight">การเรียนรู้และเติบโต</h3>
            <ul className="mt-3 space-y-2 text-neutral-300">
              <li className="flex items-start gap-2"><GraduationCap className="mt-0.5 h-4 w-4 text-sky-400" /> บัดดี้ + โค้ชชิ่ง + โจทย์จริง</li>
              <li className="flex items-start gap-2"><Users className="mt-0.5 h-4 w-4 text-sky-400" /> แชร์ความรู้แบบสั้น กระชับ ไม่รุงรัง</li>
              <li className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 text-sky-400" /> Code review เพื่อยกระดับทั้งทีม</li>
            </ul>
          </motion.article>
        </div>
      </section>

      {/* OPEN ROLES – ปิดไว้ก่อน ถ้ายังไม่รับสมัครให้เว้นว่าง */}
      {OPEN_ROLES.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-24">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-sky-500/10 via-indigo-500/10 to-fuchsia-500/10 p-8 md:p-12">
            <div className="grid gap-8 md:grid-cols-[1.2fr_.8fr] md:gap-12">
              <div>
                <h3 className="text-2xl font-semibold leading-tight">อยากร่วมทีมกับเรา?</h3>
                <p className="mt-2 text-neutral-300">เรามองหาคนที่รักการลงมือทำและดูแลผู้ใช้ ลองดูตำแหน่งที่เปิดรับหรือทักมาคุยกัน</p>
                <div className="mt-4 flex flex-wrap gap-3 text-sm">
                  <a href="/careers" className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2">ดูตำแหน่งทั้งหมด</a>
                  <a href={`mailto:${COMPANY.email}`} className="rounded-2xl border border-white/10 bg-transparent px-4 py-2">อีเมล: {COMPANY.email}</a>
                </div>
              </div>
              <div className="grid gap-3">
                {OPEN_ROLES.map((r) => (
                  <a key={r.title} href={r.link} className="rounded-2xl border border-white/10 bg-black/20 p-4 hover:border-white/20">
                    <div className="text-base font-medium">{r.title}</div>
                    <div className="text-sm opacity-80">{r.type} • {r.location}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
