// src/pages/Contact.tsx
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Section from "../components/ui/Section";
import { GlassCard } from "../components/ui/GlassCard";
import { COMPANY } from "../config/company";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  MessageSquare,
  Clock,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const ADDRESS =
  "สำนักงานใหญ่: 4 บ้านเซอทะ หมู่ 2 ตำบลหนองหลวง อำเภออุ้มผาง จังหวัดตาก 63170";

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const TOPICS = [
  { value: "project", label: "เริ่มโปรเจกต์ / ขอใบเสนอราคา" },
  { value: "support", label: "ซัพพอร์ตลูกค้า" },
  { value: "partnership", label: "พาร์ทเนอร์/ความร่วมมือ" },
  { value: "careers", label: "ร่วมงานกับเรา" },
  { value: "other", label: "อื่น ๆ" },
];

export default function Contact() {
  const email = COMPANY.email || "contact@nueatech.co.th";
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "project",
    message: "",
    consent: false,
    hp: "", // honeypot
  });

  const canSend = useMemo(
    () =>
      form.name.trim() &&
      /.+@.+\..+/.test(form.email) &&
      form.message.trim().length >= 10 &&
      form.consent,
    [form]
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSend || loading) return;
    setLoading(true);

    // ▶️ ตัวอย่าง submit — เปลี่ยนมาเชื่อม API ของคุณได้ทันที
    // try {
    //   await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    //   setSent(true);
    // } catch (err) { alert("ส่งไม่สำเร็จ ลองใหม่อีกครั้งหรือติดต่อทางอีเมล"); }

    // เดโม่: แสดงผลลัพธ์ และถือว่าสำเร็จ
    console.log("CONTACT_FORM", form);
    setTimeout(() => setSent(true), 400);
  }

  return (
    <div className="relative">
      {/* HERO */}
      <Section aurora angleBottom className="pt-16 pb-10">
        <div className="grid items-center gap-8 md:grid-cols-[1.15fr_.85fr]">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">ติดต่อ {COMPANY.th}</span>
            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
              คุยโจทย์จริง <span className="text-sky-300">ออกแบบทางออก</span> และเริ่มลงมือ
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-neutral-300">
              เล่าเป้าหมายและข้อจำกัดของคุณให้เราฟัง—เราจะช่วยวางสcopeที่วัดผลได้และขยายต่อได้ พร้อมตัวอย่างเคสใกล้เคียง
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-sm text-neutral-300">
              <span className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-1"><Clock className="h-4 w-4"/> ตอบกลับภายใน 1–2 วันทำการ</span>
              <span className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-1"><ShieldCheck className="h-4 w-4"/> เก็บข้อมูลอย่างเป็นความลับ</span>
            </div>
          </motion.div>

          <GlassCard className="p-0 overflow-hidden">
            <img src={COMPANY.hero} alt="contact" className="h-[420px] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </GlassCard>
        </div>
      </Section>

      {/* QUICK CONTACT */}
      <Section className="py-10">
        <div className="grid gap-4 md:grid-cols-3">
          <GlassCard className="p-5">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5" />
              <div>
                <div className="font-medium">อีเมล</div>
                <a href={`mailto:${email}`} className="text-sm text-sky-300 underline underline-offset-4">{email}</a>
                <p className="mt-1 text-sm text-neutral-300">เหมาะสำหรับสcope/ใบเสนอราคา และติดต่อธุรกิจ</p>
              </div>
            </div>
          </GlassCard>
          <GlassCard className="p-5">
            <div className="flex items-start gap-3">
              <Facebook className="h-5 w-5" />
              <div>
                <div className="font-medium">Facebook</div>
                <a href="https://facebook.com/gusonplatform" target="_blank" rel="noopener noreferrer" className="text-sm text-sky-300 underline underline-offset-4">facebook.com/gusonplatform</a>
                <p className="mt-1 text-sm text-neutral-300">อัปเดต/ข่าวสาร และ inbox เบื้องต้น</p>
              </div>
            </div>
          </GlassCard>
          <GlassCard className="p-5">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5" />
              <div>
                <div className="font-medium">ที่อยู่</div>
                <p className="text-sm text-neutral-300">{ADDRESS}</p>
                <div className="mt-1 text-sm"><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">เปิดแผนที่</a></div>
              </div>
            </div>
          </GlassCard>
        </div>
      </Section>

      {/* FORM */}
      <Section aurora angleTop angleBottom className="py-16">
        <div className="grid items-start gap-6 md:grid-cols-[1.1fr_.9fr]">
          <GlassCard className="p-6">
            {sent ? (
              <div className="grid place-items-center py-16 text-center">
                <div className="mb-2 inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/10">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <div className="text-xl font-semibold">ส่งคำขอเรียบร้อย</div>
                <p className="mt-1 text-neutral-300">ทีมงานจะติดต่อกลับภายใน 1–2 วันทำการ ขอบคุณที่ไว้วางใจ {COMPANY.th}</p>
                <div className="mt-4 text-sm">
                  <Link to="/services" className="underline underline-offset-4">ดูบริการของเรา</Link>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-3">
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label className="text-sm opacity-80">ชื่อ-นามสกุล *</label>
                    <input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
                      placeholder="เช่น คุณเหนือ"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm opacity-80">อีเมล *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
                      placeholder="you@company.com"
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label className="text-sm opacity-80">โทรศัพท์ (ทางเลือก)</label>
                    <input
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
                      placeholder="081‑234‑5678"
                    />
                  </div>
                  <div>
                    <label className="text-sm opacity-80">หัวข้อ *</label>
                    <select
                      value={form.topic}
                      onChange={(e) => setForm({ ...form, topic: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
                    >
                      {TOPICS.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm opacity-80">รายละเอียด *</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="mt-1 min-h-[140px] w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
                    placeholder="เล่าโจทย์/เป้าหมาย งบประมาณโดยประมาณ และกำหนดเวลาที่คาดหวัง"
                    required
                  />
                </div>
                {/* Honeypot */}
                <input
                  type="text"
                  value={form.hp}
                  onChange={(e) => setForm({ ...form, hp: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />
                <label className="mt-1 flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                  />
                  ฉันยอมรับ <Link to="/privacy" className="underline underline-offset-4">นโยบายความเป็นส่วนตัว</Link>
                </label>
                <div className="mt-2">
                  <button
                    type="submit"
                    disabled={!canSend || loading}
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-5 py-2 text-sm disabled:opacity-40"
                  >
                    ส่งข้อความ <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}
          </GlassCard>

          <div className="grid gap-4">
            <GlassCard className="p-5">
              <div className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5" />
                <div>
                  <div className="font-medium">อยากคุยเร็ว</div>
                  <p className="text-sm text-neutral-300">
                    ส่งหัวข้อ + ขนาดสcopeโดยประมาณ + เส้นตาย ให้เราได้ยิ่งดี เรายินดีเสนอแนวทาง/ช่วงราคาเบื้องต้นให้ก่อน
                  </p>
                  <div className="mt-2 text-sm">
                    <a href={`mailto:${email}`} className="rounded-2xl border border-white/10 bg-white/10 px-3 py-1.5">อีเมล: {email}</a>
                  </div>
                </div>
              </div>
            </GlassCard>
            <GlassCard className="p-5">
              <div className="font-medium">สิ่งที่ควรแจ้งเพื่อประเมินแม่นขึ้น</div>
              <ul className="mt-2 space-y-1 text-sm text-neutral-300">
                {["เป้าหมายธุรกิจ/ผู้ใช้หลัก", "หน้าหลักๆ/ฟีเจอร์สำคัญ", "การชำระเงิน/ใบเสร็จ/SSO (ถ้ามี)", "ข้อจำกัด: งบ/เวลา/เทคโนโลยีเดิม"].map((x) => (
                  <li key={x} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-sky-400" /> {x}</li>
                ))}
              </ul>
            </GlassCard>
            <GlassCard className="p-5">
              <div className="font-medium">เอกสารประกอบ</div>
              <p className="text-sm text-neutral-300">เรายอมรับไฟล์ spec/ภาพร่าง/ลิงก์เดโม่—ระบุในข้อความหรือแนบผ่านอีเมล</p>
              <div className="mt-2 text-sm">
                <Link to="/services" className="underline underline-offset-4">ดูบริการที่เราทำ</Link>
              </div>
            </GlassCard>
          </div>
        </div>
      </Section>

      {/* NOTE */}
      <Section className="py-6">
        <div className="text-xs opacity-70">
          หมายเหตุ: ข้อมูลของคุณจะถูกใช้เพื่อการติดต่อกลับและประเมินงานเท่านั้น ตาม <Link to="/privacy" className="underline underline-offset-4">นโยบายความเป็นส่วนตัว</Link> ของบริษัท
        </div>
      </Section>
    </div>
  );
}
