// src/config/company.ts
// ตั้งค่าข้อมูลบริษัทให้ทั้งเว็บใช้ร่วมกันที่ไฟล์นี้ไฟล์เดียว

export type SocialLink = { name: string; url: string };

export type CompanyConfig = {
  th: string;         // ชื่อบริษัทภาษาไทย
  en: string;         // ชื่อบริษัทภาษาอังกฤษ
  tagline: string;    // สโลแกนสั้นๆ โดนๆ
  summary: string;    // คำอธิบายสั้น ว่าเราคือใคร ทำอะไร เพื่อใคร
  email: string;
  phone?: string;
  address?: string;
  logo: string;       // URL โลโก้ (แนะนำไฟล์ .svg หรือ .png)
  hero: string;       // URL รูป Hero บนหน้า Home
  socials: SocialLink[];
};

export const COMPANY: CompanyConfig = {
  th: "บริษัท เหนือเทค จำกัด",
  en: "Nueatech Co., Ltd.",
  tagline: "สร้างแพลตฟอร์มที่คนใช้จริง รักจริง และเติบโตได้จริง",
  summary:
    "เราคือทีมเทคโนโลยีที่โฟกัสผลลัพธ์ สร้างโปรดักต์คุณภาพระดับโลกจากประเทศไทย เน้นความเรียบง่าย เร็ว และวัดผลได้",
  email: "hello@nueatech.example",
  phone: "",
  address: "Bangkok, Thailand",
  logo: "/logo.png",                      // ← เปลี่ยนเป็นโลโก้จริงของคุณ
  hero: "/logo.png",                // ← เปลี่ยนเป็นภาพ hero จริงของคุณ
  socials: [
    { name: "Facebook", url: "https://facebook.com/yourpage" },
    { name: "LinkedIn", url: "https://linkedin.com/company/yourco" },
  ],
};