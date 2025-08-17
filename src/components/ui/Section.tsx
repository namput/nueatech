
import React from "react";

type Props = {
  id?: string;
  className?: string;
  children: React.ReactNode;
  aurora?: boolean;        // พื้นหลังเรืองแสง
  angleTop?: boolean;      // เงา/ไล่พื้นด้านบน
  angleBottom?: boolean;   // เงา/ไล่พื้นด้านล่าง
};

export default function Section({ id, className = "", children, aurora, angleTop, angleBottom }: Props) {
  return (
    <section
      id={id}
      className={`relative isolate overflow-hidden ${className}`}
    >
      {/* พื้นหลังทั้งหมดต้อง pointer-events-none และอยู่หลัง content (-z-10) */}
      {aurora && (
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-16 left-1/2 size-[520px] -translate-x-1/2 rounded-full bg-sky-500/15 blur-3xl" />
          <div className="absolute -bottom-20 right-1/3 size-[440px] rounded-full bg-purple-500/15 blur-3xl" />
        </div>
      )}

      {angleTop && (
        <div className="pointer-events-none absolute left-0 right-0 top-0 -z-10 h-12 bg-gradient-to-b from-black/10 to-transparent" />
      )}

      {angleBottom && (
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 -z-10 h-12 bg-gradient-to-t from-black/10 to-transparent" />
      )}

      {/* เนื้อหา */}
      <div className="max-w-6xl mx-auto px-6">{children}</div>
    </section>
  );
}