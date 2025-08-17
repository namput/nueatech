// src/components/Footer.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-r from-gray-950 via-black to-gray-950 text-white py-16 overflow-hidden">
      {/* เอฟเฟกต์ Background อลังการ */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 w-[40rem] h-[40rem] bg-fuchsia-500/20 rounded-full blur-3xl animate-pulse -translate-x-1/2" />
        <div className="absolute bottom-[-15%] right-[20%] w-[30rem] h-[30rem] bg-sky-500/20 rounded-full blur-3xl animate-pulse delay-300" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Company Info */}
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-wide bg-gradient-to-r from-fuchsia-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-md">
            บริษัท เหนือเทค จำกัด
          </h3>
          <p className="text-sm md:text-base mt-2 text-gray-300">
            นวัตกรรมเพื่อคนไทย — Thai Innovation for Everyone
          </p>

          <div className="mt-6 text-sm md:text-base space-y-2 text-gray-400">
            <p>เลขทะเบียนนิติบุคคล: 0635568000993</p>
            <p className="flex items-center justify-center gap-2">
              <Mail size={16} />
              <a
                href="mailto:contact@nueatech.co.th"
                className="underline hover:text-white transition-colors"
              >
                contact@nueatech.co.th
              </a>
            </p>
            <p className="flex items-center justify-center gap-2 max-w-xl mx-auto text-center">
              <MapPin size={16} />
              สำนักงานใหญ่: 4 บ้านเซอทะ หมู่ 2 ตำบลหนองหลวง อำเภออุ้มผาง จังหวัดตาก
              63170
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-gray-700/40" />

        {/* Bottom Section */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="mb-4 md:mb-0 text-gray-400">
            © 2025 บริษัท เหนือเทค จำกัด. สงวนลิขสิทธิ์.
          </p>
          <div className="flex gap-6 text-gray-300">
            <Link to="/privacy" className="hover:text-white transition-colors">
              ข้อกำหนดการใช้งาน / Privacy Policy
            </Link>
            <Link to="/careers" className="hover:text-white transition-colors">
              ร่วมงานกับเรา
            </Link>
            <a
              href="https://facebook.com/gusonplatform"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Facebook size={16} /> Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;