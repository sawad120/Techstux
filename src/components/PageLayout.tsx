import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { MANROPE } from "@/lib/fonts";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "How It Works", href: "/#process" },
  { label: "Careers", href: "/careers" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "FAQ", href: "/#faq" },
];

const footerLinks = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "How It Works", href: "/#process" },
  { label: "Careers", href: "/careers" },
  { label: "Waitlist", href: "/#waitlist" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

export default function PageLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white overflow-x-hidden" style={MANROPE}>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-[#0e0e0e]/80 backdrop-blur-xl border-b border-white/5" : "bg-[#0e0e0e]/60 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/logo2-transparent.png" alt="Techstux" className="h-9 w-auto brightness-0 invert" />
          </Link>
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="relative text-xs text-white hover:text-white/80 transition-colors duration-200 group tracking-wide"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <a
              href="/#contact"
              className="text-xs border border-neutral-700 text-white hover:text-white/80 hover:border-white/50 px-5 py-2 rounded-full transition-all duration-300 hover:bg-white/5"
            >
              Contact
            </a>
          </div>
          <button type="button" className="lg:hidden flex flex-col gap-1.5 p-1" onClick={() => setMenuOpen(!menuOpen)}>
            <span className={`block h-px w-6 bg-neutral-400 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2.5" : ""}`} />
            <span className={`block h-px w-6 bg-neutral-400 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px w-6 bg-neutral-400 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden bg-[#0e0e0e]/95 backdrop-blur-xl border-b border-white/5"
            >
              <div className="flex flex-col gap-4 px-6 py-5">
                {navLinks.map((l) => (
                  <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} className="text-sm text-white hover:text-white/80 py-1 tracking-wide">
                    {l.label}
                  </a>
                ))}
                <a href="/#contact" onClick={() => setMenuOpen(false)} className="text-sm text-white border border-neutral-700 px-4 py-2 w-fit rounded-full">
                  Contact
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <main className="pt-16">{children}</main>

      <footer className="bg-[#0a0a0a] border-t border-white/[0.04] py-10 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <Link href="/" className="flex items-center gap-2.5">
              <img src="/logo2-transparent.png" alt="Techstux" className="h-7 w-auto brightness-0 invert opacity-30" />
            </Link>
            <div className="flex items-center gap-6 flex-wrap justify-center">
              {footerLinks.map((l) => (
                <a key={l.label} href={l.href} className="text-xs text-white hover:text-white/80 transition-colors tracking-wide">
                  {l.label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <a href="mailto:hello@techstux.com" className="w-8 h-8 rounded-full border border-neutral-800/60 flex items-center justify-center hover:border-neutral-600 transition-colors">
                <svg className="w-3.5 h-3.5 text-neutral-700 hover:text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </a>
              <a href="https://instagram.com/techstux" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-neutral-800/60 flex items-center justify-center hover:border-neutral-600 transition-colors">
                <svg className="w-3.5 h-3.5 text-neutral-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="border-t border-neutral-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white tracking-wide">© 2026 Techstux. All rights reserved.</p>
            <div className="flex gap-5">
              <Link href="/privacy-policy" className="text-xs text-white hover:text-white/80 transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
