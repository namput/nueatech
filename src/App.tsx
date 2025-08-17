// src/App.tsx
import React, { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Team = lazy(() => import("./pages/Team"));
const Services = lazy(() => import("./pages/Services"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost")); // ✅ เพิ่มหน้าโพสต์เดี่ยว
const Contact = lazy(() => import("./pages/Contact"));
const Careers = lazy(() => import("./pages/Careers"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const NotFound = lazy(() => import("./pages/NotFound"));

// เลื่อนกลับไปบนสุดเมื่อเปลี่ยนหน้า (ช่วยตอนอ่านบทความ)
function ScrollToTop(){
  const { pathname } = useLocation();
  React.useEffect(()=>{ window.scrollTo({ top: 0, behavior: "smooth" }); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div
      className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-white/20"
      style={{ scrollPaddingTop: "var(--nav-h, 64px)" }}
    >
      <Navbar />
      <ScrollToTop />
      <main className="min-h-[60vh] pt-[var(--nav-h,64px)]">
        <Suspense fallback={<div className="px-4 py-10 text-center opacity-80">กำลังโหลดหน้า…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} /> {/* ✅ เส้นทางบทความเดี่ยว */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
