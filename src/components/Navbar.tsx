
import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Rocket, ChevronDown } from "lucide-react";

const BRAND = {
  nameTH: "บริษัท เหนือเทค จำกัด",
  nameEN: "Nueatech Co., Ltd.",
  logo: "/logo.png",
};

const NAV = [
  { to: "/", label: "หน้าแรก" },
  { to: "/about", label: "เกี่ยวกับ" },
  { to: "/team", label: "ทีม" },
  { to: "/services", label: "บริการ" },
  { to: "/portfolio", label: "ผลงาน" },
  { to: "/blog", label: "บล็อก" },
  { to: "/careers", label: "ร่วมงาน" },
  { to: "/contact", label: "ติดต่อ" },
];

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const headerRef = React.useRef<HTMLElement | null>(null);
  const { pathname } = useLocation();

  React.useEffect(() => { setOpen(false); }, [pathname]);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // คำนวณความสูง header จริง แล้วเซ็ตเป็นตัวแปร CSS
  const setNavHeightVar = React.useCallback(() => {
    const h = headerRef.current?.offsetHeight ?? 64;
    document.documentElement.style.setProperty("--nav-h", `${h}px`);
  }, []);

  React.useEffect(() => {
    setNavHeightVar();
    const ro = new ResizeObserver(setNavHeightVar);
    if (headerRef.current) ro.observe(headerRef.current);
    const onResize = () => setNavHeightVar();
    window.addEventListener("resize", onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [setNavHeightVar, open, scrolled]);

  return (
    <header
      ref={headerRef as any}
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled
          ? "backdrop-blur bg-neutral-950/70 border-b border-white/10 shadow-[0_10px_40px_-20px_rgba(0,0,0,.6)]"
          : "bg-transparent"
      }`}
    >
      <div className="hidden justify-center border-b border-white/10 bg-gradient-to-r from-sky-500/15 via-fuchsia-500/10 to-indigo-500/10 px-3 py-1 text-xs text-neutral-200 md:flex">
        <span className="inline-flex items-center gap-2">
          <Rocket className="h-3.5 w-3.5" /> นวัตกรรมเพื่อคนไทย — Thai Innovation for Everyone
        </span>
      </div>

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="group flex items-center gap-3">
          <span className="relative inline-grid place-items-center">
            <span className="absolute -inset-2 rounded-xl bg-gradient-to-tr from-sky-400/25 via-fuchsia-400/15 to-indigo-400/15 blur-xl transition-opacity group-hover:opacity-100 opacity-60" />
            <img src={BRAND.logo} alt={BRAND.nameEN} className="relative z-10 h-8 w-8 rounded" />
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight text-neutral-100">{BRAND.nameTH}</div>
            <div className="text-[11px] opacity-70">{BRAND.nameEN}</div>
          </div>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-2 text-sm">
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `relative inline-flex items-center px-2 py-1.5 transition-opacity hover:opacity-100 ${
                      isActive ? "text-sky-400" : "opacity-85 text-neutral-200"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{item.label}</span>
                      <span className={`absolute -bottom-0.5 left-2 right-2 h-px origin-left scale-x-0 bg-gradient-to-r from-sky-400 via-fuchsia-400 to-indigo-400 transition-transform duration-300 ${isActive ? "scale-x-100" : "group-hover:scale-x-100"}`} />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <Link to="/contact" className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-3.5 py-2 text-sm">
            <span className="absolute inset-0 -z-10 bg-gradient-to-r from-sky-400/0 via-fuchsia-400/0 to-indigo-400/0 opacity-0 transition-opacity group-hover:opacity-20" />
            ติดต่อเรา
            <ChevronDown className="h-4 w-4 rotate-[-90deg] opacity-80" />
          </Link>
        </div>

        <button
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-2 text-neutral-200 md:hidden"
          aria-label="เปิดเมนู"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Sheet */}
      <div className={`md:hidden ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} fixed inset-x-0 top-[var(--nav-h,3.25rem)] z-40 origin-top transition-opacity`}>
        <div className="mx-3 rounded-2xl border border-white/10 bg-neutral-950/90 shadow-[0_20px_60px_-20px_rgba(0,0,0,.7)] backdrop-blur">
          <ul className="grid divide-y divide-white/10">
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={({ isActive }) => `block px-5 py-3 text-sm ${isActive ? "text-sky-400" : "text-neutral-200"}`}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
          <div className="p-3">
            <Link to="/contact" className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm">ติดต่อเรา</Link>
          </div>
        </div>
        <div className="h-3" />
      </div>
    </header>
  );
}