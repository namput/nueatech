import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 text-center">
      <h1 className="text-5xl font-semibold">404</h1>
      <p className="mt-2 text-neutral-300">ไม่พบหน้าที่คุณต้องการ</p>
      <Link to="/" className="mt-4 inline-block rounded-2xl border border-white/10 bg-white/10 px-4 py-2">กลับหน้าแรก</Link>
    </section>
  );
}
