import React from "react";

export default function PrivacyPolicy() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <h1 className="text-3xl font-semibold">นโยบายความเป็นส่วนตัว</h1>
      <p className="mt-3 max-w-3xl text-neutral-300">คำอธิบายแนวทางการเก็บ ใช้ และเปิดเผยข้อมูลส่วนบุคคลของผู้ใช้ (ตัวอย่าง)</p>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-neutral-300">
        <li>เราเก็บข้อมูลเท่าที่จำเป็นต่อการให้บริการ</li>
        <li>ผู้ใช้สามารถร้องขอลบ/ดาวน์โหลดข้อมูลส่วนตัวได้</li>
        <li>มีมาตรการรักษาความปลอดภัยตามสมควร</li>
      </ul>
    </section>
  );
}
