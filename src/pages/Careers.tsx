// src/pages/Careers.tsx
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Section from "../components/ui/Section";
import { GlassCard } from "../components/ui/GlassCard";
import { COMPANY } from "../config/company";
import {
  Briefcase,
  Filter,
  Search,
  MapPin,
  Clock4,
  ArrowRight,
  Users,
  GaugeCircle,
  ShieldCheck,
  Rocket,
  Laptop,
  BrainCircuit,
  Smartphone,
  Server,
  Wrench,
  Palette,
  Bot,
  LineChart,
  HeartHandshake,
  GraduationCap,
  Mail,
  Globe2,
  Building2,
  DollarSign,
} from "lucide-react";

// --------------------------------------------------
// Types & Data
// --------------------------------------------------
export type Role = {
  id: string;
  title: string;
  dept: string;
  type: "Full‑time" | "Contract" | "Intern";
  location: string; // Remote / Hybrid (Bangkok) / On‑site (Tak)
  tags?: string[];
  summary: string;
  requirements?: string[]; // bullets
  nice?: string[]; // bullets
  applyLink?: string; // external form (optional)
};

const DEPARTMENTS = [
  "Engineering",
  "Product",
  "Design",
  "Data/AI",
  "Mobile",
  "Automation (RPA/OCR)",
  "Marketing/Growth",
  "Sales/Partnerships",
  "Customer Success",
  "Operations/Finance",
];

const ALL_ROLES: Role[] = [
  {
    id: "fe-react",
    title: "Full‑stack Engineer (React/Node)",
    dept: "Engineering",
    type: "Full‑time",
    location: "Remote‑first / Hybrid (Bangkok)",
    tags: ["React", "Node.js", "MySQL", "Cloudflare", "Vercel"],
    summary:
      "พัฒนาเว็บ/แดชบอร์ดของแพลตฟอร์ม guson ตั้งแต่ฟีเจอร์ผู้ใช้จนถึงแอดมิน เชื่อมต่อชำระเงิน/ใบเสร็จ และยกระดับประสิทธิภาพ",
    requirements: [
      "ถนัด React + TypeScript, State management และการออกแบบ component ที่ re‑usable",
      "Node.js + REST (หรือ GraphQL), ออกแบบ schema/SQL พื้นฐาน",
      "เข้าใจ Core Web Vitals, SSR/ISR, Caching/CDN",
    ],
    nice: ["มีประสบการณ์ Next.js/Edge", "เคยทำระบบ multi‑tenant/subdomain"],
  },
  {
    id: "rn-mobile",
    title: "Mobile Engineer (React Native)",
    dept: "Mobile",
    type: "Full‑time",
    location: "Remote‑first / Hybrid (Bangkok)",
    tags: ["React Native", "Push", "Auth", "CI/CD"],
    summary:
      "พัฒนาแอป iOS/Android ของระบบ guson โมดูลพื้นฐานครบ Onboarding/Push/Offline พร้อม CI/CD ขึ้นสโตร์",
    requirements: [
      "React Native/Expo, การจัดการ state, การเชื่อม API",
      "เข้าใจ Store submission, code‑signing, release pipeline",
    ],
    nice: ["Native Modules", "Performance profile (Flipper)"],
  },
  {
    id: "pm-product",
    title: "Product Manager",
    dept: "Product",
    type: "Full‑time",
    location: "Remote‑first / Hybrid (Bangkok)",
    tags: ["Roadmap", "KPI", "Research"],
    summary:
      "เจ้าของโจทย์ผู้ใช้ จัดลำดับความสำคัญ ออกแบบทดลอง และวัดผล—จากสัญญาณจริง ไม่ใช่ความรู้สึก",
    requirements: [
      "ตั้ง KPI/Metric ได้ชัด (activation, retention, conversion)",
      "เขียน spec/acceptance criteria ที่วัดผลได้",
      "ทำงานร่วมกับดีไซน์/วิศวกรแบบเร็วและเป็นระบบ",
    ],
    nice: ["เคยทำ marketplace/education platform", "รู้จัก A/B testing/analytics tools"],
  },
  {
    id: "ux-ui",
    title: "Product Designer (UX/UI)",
    dept: "Design",
    type: "Full‑time",
    location: "Remote‑first",
    tags: ["Design System", "Prototype", "Usability"],
    summary:
      "ออกแบบประสบการณ์ใช้งานที่เรียบง่าย ใช้ง่าย ตั้งแต่วันแรก ทั้งเว็บและโมบาย พร้อมระบบดีไซน์แบบขยายต่อได้",
    requirements: [
      "ทำ user flow, wireframe, prototype ได้",
      "คุม visual แบรนด์ + คิดระบบ component/variants",
    ],
    nice: ["ทดสอบ usability/heuristics", "มีผลงาน complex dashboard"],
  },
  {
    id: "devops",
    title: "Cloud/DevOps Engineer",
    dept: "Engineering",
    type: "Full‑time",
    location: "Remote‑first",
    tags: ["Cloudflare", "Vercel", "Docker", "CI/CD"],
    summary:
      "ดูแลโครงสร้างพื้นฐาน ความเร็ว เสถียรภาพ ความปลอดภัย และ observability ของแพลตฟอร์ม",
    requirements: [
      "คุ้นเคย CDN/Edge, DNS, TLS/SSL",
      "ตั้งค่า CI/CD, backup/restore, monitoring/logs",
    ],
    nice: ["WAF, rate‑limit, zero‑trust", "IaC (Terraform)"],
  },
  {
    id: "ai-nlp",
    title: "Data/AI Engineer (Thai NLP)",
    dept: "Data/AI",
    type: "Full‑time",
    location: "Remote‑first",
    tags: ["NLP‑TH", "Classification", "Vector Search"],
    summary:
      "สร้างฟีเจอร์ Data/AI เช่น จัดหมวด/สรุป/ค้นหาอัจฉริยะ บนคอนเทนต์ภาษาไทย และระบบติดตามผล",
    requirements: [
      "Python/Node อย่างน้อยหนึ่ง, ประสบการณ์ embeddings/IR",
      "เข้าใจกระบวนการประเมินคุณภาพโมเดลและ privacy",
    ],
    nice: ["Retrieval‑augmented features", "ประสบการณ์ production AI"],
  },
  {
    id: "rpa",
    title: "Automation Engineer (RPA/OCR)",
    dept: "Automation (RPA/OCR)",
    type: "Full‑time",
    location: "Remote‑first",
    tags: ["Blue Prism", "OCR", "ERP"],
    summary:
      "ออกแบบ/สร้างบอทงานเอกสารและเชื่อมต่อระบบภายในองค์กร ลดงานซ้ำ ย่นเวลา",
    requirements: [
      "RPA tool (เช่น Blue Prism) + พื้นฐาน SQL/REST",
      "คิด flow, error‑handling, และ log ที่ตรวจสอบได้",
    ],
  },
  {
    id: "growth",
    title: "Growth Marketer",
    dept: "Marketing/Growth",
    type: "Full‑time",
    location: "Remote‑first",
    tags: ["SEO", "Content", "Experiment"],
    summary:
      "วางกลยุทธ์และรันแคมเปญเติบโตของ guson ทั้ง SEO/คอนเทนต์/พาร์ทเนอร์ และทดลองแบบวัดผลได้",
    requirements: ["วัดผลด้วย data", "ทำแผนทดลองและรีพอร์ตเป็นระบบ"],
  },
  {
    id: "sales",
    title: "Sales/Partnerships (Education)",
    dept: "Sales/Partnerships",
    type: "Full‑time",
    location: "Hybrid (Bangkok)",
    tags: ["Outbound", "Partnership", "Demo"],
    summary:
      "เชื่อมต่อสถาบัน/พาร์ทเนอร์ด้านการศึกษา นำเสนอ solution และปิดดีลอย่างโปร",
    requirements: ["นำเสนอเดโม่ได้", "สร้างความสัมพันธ์ระยะยาว"],
  },
  {
    id: "cs",
    title: "Customer Success",
    dept: "Customer Success",
    type: "Full‑time",
    location: "Remote‑first",
    tags: ["Support", "Onboarding", "Feedback"],
    summary:
      "ช่วยผู้สอน/ลูกค้าเปิดใช้ระบบลื่นไหล ทำคู่มือสั้น ๆ และปิด loop ปัญหาเข้า dev/roadmap",
    requirements: ["สื่อสารชัดเจน เห็นใจผู้ใช้", "เขียนคอนเทนต์ช่วยเหลือตัวเองได้"],
  },
  {
    id: "finance",
    title: "Finance/Accounting (SaaS)",
    dept: "Operations/Finance",
    type: "Full‑time",
    location: "Hybrid (Tak/Bangkok)",
    tags: ["Invoice", "Tax", "Reporting"],
    summary:
      "ดูแลบัญชี/ภาษี/รายงานสำหรับแพลตฟอร์มที่มีการชำระเงินและใบเสร็จอัตโนมัติ",
    requirements: ["ทำรายงานงบ/ภาษีได้", "คุ้น online payment/receipt"],
  },
  {
    id: "open-app",
    title: "Open Application (ไม่ระบุตำแหน่ง)",
    dept: "ทุกแผนก",
    type: "Full‑time",
    location: "Remote‑first",
    tags: ["Self‑starter", "Generalist"],
    summary:
      "เรารับสมัครในทุกตำแหน่งที่เกี่ยวข้องกับ guson — ถ้าคุณเห็นโจทย์ที่เราไม่ได้โพสต์ ส่งโปรไฟล์มาเล่าได้เลย",
    requirements: ["เล่าปัญหาที่คุณอยากแก้ใน guson", "แนบผลงาน/ลิงก์/โค้ด/เดโม่"],
  },
];

// --------------------------------------------------
// Helpers
// --------------------------------------------------
const fade = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.55 } } };

function Chip({ children, active, onClick }: { children: React.ReactNode; active?: boolean; onClick?: () => void }){
  return (
    <button onClick={onClick} className={`inline-flex items-center gap-2 rounded-2xl border px-3 py-1 text-sm ${active? 'border-white/30 bg-white/15' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}>{children}</button>
  );
}

function JobCard({ r }: { r: Role }){
  const mailto = `mailto:${COMPANY.email}?subject=${encodeURIComponent('สมัครงาน: ' + r.title)}&body=${encodeURIComponent('สวัสดีทีมงาน ' + COMPANY.th + `\n\nผม/ฉัน สนใจสมัครตำแหน่ง: ${r.title}\nลิงก์ผลงาน/เรซูเม่: \nข้อความเพิ่มเติม: \n\nขอบคุณครับ/ค่ะ`)}`;
  return (
    <motion.article variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
      <GlassCard className="h-full p-5">
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-lg font-semibold leading-tight">{r.title}</div>
              <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs opacity-90">
                <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5"><Briefcase className="h-3.5 w-3.5"/> {r.dept}</span>
                <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5"><Clock4 className="h-3.5 w-3.5"/> {r.type}</span>
                <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5"><MapPin className="h-3.5 w-3.5"/> {r.location}</span>
              </div>
            </div>
          </div>
          <p className="text-neutral-300 text-sm">{r.summary}</p>
          {r.tags && (
            <div className="mt-1 flex flex-wrap gap-2 text-xs">
              {r.tags.map(t => (
                <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5">{t}</span>
              ))}
            </div>
          )}
          {(r.requirements || r.nice) && (
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {r.requirements && (
                <div>
                  <div className="text-[13px] opacity-80">สิ่งที่ต้องมี</div>
                  <ul className="mt-1 space-y-1 text-sm text-neutral-300">
                    {r.requirements.map((x, i) => (<li key={i}>• {x}</li>))}
                  </ul>
                </div>
              )}
              {r.nice && (
                <div>
                  <div className="text-[13px] opacity-80">ถ้ามีจะดีมาก</div>
                  <ul className="mt-1 space-y-1 text-sm text-neutral-300">
                    {r.nice.map((x, i) => (<li key={i}>• {x}</li>))}
                  </ul>
                </div>
              )}
            </div>
          )}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {r.applyLink ? (
              <a href={r.applyLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-sm">สมัครตำแหน่งนี้ <ArrowRight className="h-4 w-4"/></a>
            ) : (
              <a href={mailto} className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-sm">สมัครงานทางอีเมล <Mail className="h-4 w-4"/></a>
            )}
          </div>
        </div>
      </GlassCard>
    </motion.article>
  );
}

// --------------------------------------------------
// Page
// --------------------------------------------------
export default function Careers(){
  const [q, setQ] = useState("");
  const [dept, setDept] = useState<string>("ทั้งหมด");
  const [type, setType] = useState<string>("ทั้งหมด");

  const TYPES = ["ทั้งหมด", "Full‑time", "Contract", "Intern"];
  const DEPTS = ["ทั้งหมด", ...DEPARTMENTS, "ทุกแผนก"];

  const filtered = useMemo(()=>{
    const term = q.trim().toLowerCase();
    return ALL_ROLES.filter(r => {
      const byQ = !term || r.title.toLowerCase().includes(term) || r.summary.toLowerCase().includes(term) || (r.tags||[]).some(t=> t.toLowerCase().includes(term));
      const byDept = dept === "ทั้งหมด" || r.dept === dept;
      const byType = type === "ทั้งหมด" || r.type === (type as any);
      return byQ && byDept && byType;
    });
  }, [q, dept, type]);

  return (
    <div className="relative">
      {/* HERO */}
      <Section aurora angleBottom className="pt-16 pb-10">
        <div className="grid items-center gap-8 md:grid-cols-[1.2fr_.8fr]">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">
              ร่วมงานกับ {COMPANY.th}
            </span>
            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
              สร้าง <span className="text-sky-300">guson</span> ให้เป็นแพลตฟอร์มที่คนไทยภูมิใจ
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-neutral-300">
              เราเปิดรับคนเก่งที่อยากลงมือทำจริงในทุกตำแหน่งที่เกี่ยวข้องกับ guson — ทีมเล็ก เคลื่อนที่ไว วัดผลชัด และเติบโตไปด้วยกัน
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-sm text-neutral-300">
              <span className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-1"><GaugeCircle className="h-4 w-4"/> Performance by design</span>
              <span className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-1"><ShieldCheck className="h-4 w-4"/> Security by default</span>
              <span className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-1"><Rocket className="h-4 w-4"/> Ship & learn</span>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
              <a href={`mailto:${COMPANY.email}`} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2 inline-flex items-center gap-2">ส่งเรซูเม่ <Mail className="h-4 w-4"/></a>
              <Link to="#open-roles" className="rounded-2xl border border-white/10 bg-transparent px-4 py-2">ดูตำแหน่งที่เปิดอยู่</Link>
            </div>
          </motion.div>

          <GlassCard className="p-6">
            <div className="grid gap-3 md:grid-cols-2">
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                <Search className="h-4 w-4" />
                <input value={q} onChange={(e)=> setQ(e.target.value)} placeholder="ค้นหาตำแหน่ง/สกิล/คีย์เวิร์ด" className="w-full bg-transparent outline-none placeholder:text-white/60"/>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="hidden items-center gap-1 rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-xs md:inline-flex"><Filter className="h-3.5 w-3.5"/> กรอง</span>
                {DEPTS.map((d)=> (
                  <Chip key={d} active={dept===d} onClick={()=> setDept(d)}>{d}</Chip>
                ))}
                {TYPES.map((t)=> (
                  <Chip key={t} active={type===t} onClick={()=> setType(t)}>{t}</Chip>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      </Section>

      {/* WHY JOIN */}
      <Section className="py-12">
        <h2 className="mb-5 text-2xl font-semibold tracking-tight">ทำไมต้องเข้าร่วมทีมเรา</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[{i:Users, t:"ทีมเล็ก พลังสูง", d:"ตัดสินใจเร็ว ไม่มีชั้นเชิงซ้อน งานของคุณมีผลต่อผู้ใช้จริง"},
            {i:GaugeCircle, t:"โฟกัสคุณภาพ/ความเร็ว", d:"Core Web Vitals, Observability, CI/CD ตั้งแต่วันแรก"},
            {i:ShieldCheck, t:"ความปลอดภัยโดยออกแบบ", d:"แนวทางตาม OWASP + นโยบายสำรองข้อมูล"},
            {i:BrainCircuit, t:"เรียนรู้จากของจริง", d:"โจทย์จริง วัดผลจริง ไม่ใช่เดโม่โชว์"},
            {i:HeartHandshake, t:"วัฒนธรรมช่วยเหลือ", d:"โค้ชชิ่ง/รีวิวงานอย่างสร้างสรรค์"},
            {i:Globe2, t:"Remote‑first", d:"ยืดหยุ่นเวลา/สถานที่ ผลลัพธ์สำคัญกว่าเวลา"}].map((x,idx)=>{
              const Icon:any = x.i; return (
                <GlassCard key={idx} className="p-5">
                  <div className="flex items-start gap-3"><Icon className="h-5 w-5"/><div><div className="font-medium">{x.t}</div><p className="text-neutral-300 text-sm">{x.d}</p></div></div>
                </GlassCard>
              );
            })}
        </div>
      </Section>

      {/* OPEN ROLES */}
      <Section id="open-roles" aurora angleTop angleBottom className="py-16">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">ตำแหน่งที่เปิดรับ</h2>
        {filtered.length === 0 ? (
          <div className="text-center opacity-80">ยังไม่มีตำแหน่งที่ตรงกับเงื่อนไข ลองเปลี่ยนตัวกรองหรือส่ง Open Application</div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map(r => <JobCard key={r.id} r={r} />)}
          </div>
        )}
      </Section>

      {/* HIRING PROCESS */}
      <Section className="py-16">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">กระบวนการรับสมัคร</h2>
        <div className="grid gap-4 md:grid-cols-5">
          {[{i:Mail, t:"Apply", d:"ส่งเรซูเม่/ผลงาน เล่าความถนัด/โจทย์ที่อยากแก้"},
            {i:HeartHandshake, t:"Screen", d:"พูดคุยเบื้องต้น 20‑30 นาที"},
            {i:Wrench, t:"Assignment/Portfolio", d:"แบบฝึกสั้นหรือรีวิวงานจริง"},
            {i:Users, t:"Interview", d:"เจาะลึกทักษะ/วิธีคิด + คำถามจากคุณ"},
            {i:DollarSign, t:"Offer", d:"สรุปบทบาท/ค่าตอบแทน/ช่วงเริ่มงาน"}].map((x, idx)=>{ const Icon:any = x.i; return (
              <GlassCard key={idx} className="p-5">
                <div className="flex items-start gap-3"><Icon className="h-5 w-5"/><div><div className="font-medium">{x.t}</div><p className="text-neutral-300 text-sm">{x.d}</p></div></div>
              </GlassCard>
            );})}
        </div>
      </Section>

      {/* CTA */}
      <Section aurora angleTop className="py-16">
        <GlassCard className="grid gap-6 p-6 md:grid-cols-[1.2fr_.8fr] md:p-10">
          <div>
            <h3 className="text-2xl font-semibold leading-tight">ไม่เห็นตำแหน่งที่ใช่? ส่งโปรไฟล์มาให้เราดู</h3>
            <p className="mt-2 text-neutral-300">เราเปิดรับคนที่อยากสร้างผลลัพธ์กับ guson เสมอ เล่าให้ฟังว่าคุณจะช่วยผู้ใช้ของเราได้อย่างไร</p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <a href={`mailto:${COMPANY.email}?subject=${encodeURIComponent('Open Application – ร่วมงานกับ ' + COMPANY.th)}`} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2">อีเมล: {COMPANY.email}</a>
              <Link to="/about" className="rounded-2xl border border-white/10 bg-transparent px-4 py-2">อ่านเรื่องราวของเรา</Link>
            </div>
          </div>
          <form onSubmit={(e)=>{e.preventDefault(); alert('นี่เป็นฟอร์มตัวอย่าง—คุณสามารถเชื่อมต่อบริการรับฟอร์ม (เช่น Formspree) หรือ API ของคุณเอง');}} className="grid gap-3">
            <input className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none" placeholder="ชื่อของคุณ" required />
            <input className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none" placeholder="อีเมล" type="email" required />
            <input className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none" placeholder="ลิงก์เรซูเม่/พอร์ต (URL)" />
            <textarea className="min-h-[120px] rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none" placeholder="เล่า skill/ผลงาน/โจทย์ที่อยากแก้ใน guson" required />
            <button className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2" type="submit">ส่งความสนใจ</button>
          </form>
        </GlassCard>
      </Section>

      {/* NOTE */}
      <Section className="py-6">
        <div className="text-xs opacity-70">
          หมายเหตุ: รายละเอียดสวัสดิการ/ค่าตอบแทนและรูปแบบการทำงานอาจแตกต่างตามตำแหน่งและประสบการณ์ โปรดระบุความคาดหวังของคุณในอีเมลเพื่อให้ประเมินได้เหมาะสม
        </div>
      </Section>
    </div>
  );
}
