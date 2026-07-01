import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
} from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_um9tdlr";
const EMAILJS_TEMPLATE_ID = "template_zi9kk88";
const EMAILJS_PUBLIC_KEY = "IJFPEJQgGbKxAZU5f";

const MONO = { fontFamily: "'Space Mono', monospace" };
const SYNE = { fontFamily: "'Syne', sans-serif" };
const MANROPE = { fontFamily: "'Manrope', sans-serif" };

function useCountUp(target: number, trigger: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let v = 0;
    const step = target / 60;
    const t = setInterval(() => {
      v += step;
      if (v >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(v));
    }, 16);
    return () => clearInterval(t);
  }, [trigger, target]);
  return count;
}

function CountStat({ val, label, suffix = "" }: { val: number | string; label: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const num = typeof val === "number" ? useCountUp(val, inView) : val;
  return (
    <div ref={ref} className="flex flex-col items-center py-8 px-6">
      <p className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-1" style={SYNE}>
        {typeof val === "number" ? num : val}{suffix}
      </p>
      <p className="text-[10px] text-neutral-600 tracking-[0.22em] uppercase" style={MONO}>{label}</p>
    </div>
  );
}

function GlowCard({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: delay * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={`relative group ${className}`}
    >
      <motion.div animate={{ opacity: hov ? 1 : 0 }} transition={{ duration: 0.4 }}
        className="absolute -inset-px rounded-xl bg-gradient-to-br from-neutral-500/40 via-transparent to-neutral-700/40 pointer-events-none" />
      <div className="relative bg-[#181818] rounded-xl border border-neutral-800/80 p-8 h-full overflow-hidden">
        <div className="absolute -top-6 -right-6 w-24 h-24 border border-neutral-700/20 rounded-full" />
        {children}
        <motion.div animate={{ scaleX: hov ? 1 : 0 }} transition={{ duration: 0.4 }}
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-400/60 to-transparent origin-left" />
      </div>
    </motion.div>
  );
}

function Orb({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) {
  return (
    <motion.div className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size }}
      animate={{ y: [0, -30, 0, 20, 0], x: [0, 15, -10, 5, 0], scale: [1, 1.08, 0.95, 1.04, 1] }}
      transition={{ duration: 14 + delay * 3, repeat: Infinity, ease: "easeInOut", delay }}>
      <div className="w-full h-full rounded-full blur-3xl opacity-[0.07]"
        style={{ background: "radial-gradient(circle, #94a3b8, transparent 70%)" }} />
    </motion.div>
  );
}

function MagneticBtn({ children, className, href }: { children: React.ReactNode; className?: string; href?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });
  const handle = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.35);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  };
  return (
    <motion.a ref={ref} href={href} style={{ x: sx, y: sy }}
      onMouseMove={handle} onMouseLeave={() => { x.set(0); y.set(0); }} className={className}>
      {children}
    </motion.a>
  );
}

function SectionHeader({ eyebrow, title, center = true }: { eyebrow: string; title: string; center?: boolean }) {
  return (
    <div className={`mb-16 ${center ? "text-center" : ""}`}>
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="text-[10px] tracking-[0.4em] text-neutral-600 uppercase mb-4" style={MONO}>
        {eyebrow}
      </motion.p>
      <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight" style={SYNE}>
        {title}
      </motion.h2>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.5 }}
      className="border-b border-neutral-800/60">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4">
        <span className="text-sm font-medium text-neutral-200" style={MANROPE}>{q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }}
          className="text-neutral-600 shrink-0 text-xl leading-none">+</motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
            className="overflow-hidden">
            <p className="text-sm text-neutral-500 leading-relaxed pb-5 font-light" style={MANROPE}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeModal, setActiveModal] = useState<null | "terms">(null);
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [waitlistSending, setWaitlistSending] = useState(false);
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const cursorX = useMotionValue(-100), cursorY = useMotionValue(-100);
  const springCX = useSpring(cursorX, { stiffness: 120, damping: 18 });
  const springCY = useSpring(cursorY, { stiffness: 120, damping: 18 });
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.28], [0, -60]);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }, []);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) {
      setContactStatus("error");
      return;
    }
    setContactStatus("sending");
    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form, { publicKey: EMAILJS_PUBLIC_KEY })
      .then(() => {
        setContactStatus("success");
        form.reset();
      })
      .catch((error) => {
        console.error("EmailJS error:", error?.status, error?.text ?? error);
        setContactStatus("error");
      });
  };

  useEffect(() => {
    AOS.init({ duration: 900, easing: "ease-out-cubic", once: true, offset: 60 });
    const onScroll = () => setScrolled(window.scrollY > 20);
    const onMove = (e: MouseEvent) => { cursorX.set(e.clientX); cursorY.set(e.clientY); };
    window.addEventListener("scroll", onScroll);
    window.addEventListener("mousemove", onMove);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("mousemove", onMove); };
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "How It Works", href: "#process" },
    { label: "Careers", href: "/careers" },
    { label: "Join Waitlist", href: "#waitlist" },
    { label: "FAQ", href: "#faq" },
  ];

  const services = [
    { num: "01", icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.3}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>, title: "Custom Development", desc: "Robust web apps, APIs, and data processing scripts built by vetted student developers under expert supervision." },
    { num: "02", icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.3}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" /></svg>, title: "AI & Automation", desc: "Custom AI model integrations, workflow automation, and intelligent asset generation pipelines." },
    { num: "03", icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.3}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" /></svg>, title: "Web Design & UI", desc: "Sleek, conversion-focused landing pages and B2B interfaces designed for impact and clarity." },
    { num: "04", icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.3}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" /></svg>, title: "Student Placement", desc: "Connecting ambitious students with real company projects for hands-on industry experience and career growth." },
  ];

  const faqs = [
    { q: "What is Techstux?", a: "Techstux is a B2B tech agency that bridges the gap between education and industry by connecting businesses with vetted student talent, mentored and managed by senior professionals." },
    { q: "Who are the students?", a: "We work with technically strong students from top engineering and design programs who are rigorously vetted through technical assessments and professional screening." },
    { q: "How is quality ensured?", a: "Every project is overseen by industry professionals who review deliverables, provide mentorship, and ensure everything meets professional standards before delivery." },
    { q: "How long does a typical project take?", a: "Most projects kick off within 48 hours of brief approval. Timelines vary by scope — a landing page could be done in a week, while a full web app may take 4–8 weeks." },
    { q: "How do I join as a student?", a: "Join our waitlist using the form on this page. We'll reach out when a project matching your skill set is available." },
    { q: "What does it cost?", a: "Pricing is project-based and competitive. Reach out via the contact section or email us for a custom quote." },
  ];

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white overflow-x-hidden" style={MANROPE}>

      <AnimatePresence>
        {activeModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setActiveModal(null)}>
            <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
              className="bg-[#181818] border border-neutral-800 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8"
              onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white" style={SYNE}>
                  Terms & Conditions
                </h2>
                <button onClick={() => setActiveModal(null)} className="text-neutral-500 hover:text-white text-2xl">×</button>
              </div>
              <div className="space-y-4 text-sm text-neutral-400 leading-relaxed" style={MANROPE}>
                <p><strong className="text-neutral-200">Last updated: June 2026</strong></p>
                <p>By accessing or using the Techstux website, you agree to be bound by these Terms & Conditions.</p>
                <p><strong className="text-neutral-300">Services:</strong> Techstux provides B2B technology and design services through vetted student talent supervised by industry professionals.</p>
                <p><strong className="text-neutral-300">Intellectual Property:</strong> All deliverables created for a client become the client's property upon full payment. Techstux retains rights to general methodologies and non-client-specific materials.</p>
                <p><strong className="text-neutral-300">Confidentiality:</strong> We sign NDAs on request and treat all client information as strictly confidential.</p>
                <p><strong className="text-neutral-300">Payments:</strong> Project pricing is agreed in writing before commencement. A deposit may be required.</p>
                <p><strong className="text-neutral-300">Limitation of Liability:</strong> Techstux is not liable for indirect, incidental, or consequential damages arising from use of our services.</p>
                <p><strong className="text-neutral-300">Governing Law:</strong> These terms are governed by applicable Indian law.</p>
                <p>For questions, contact techstuxworks@gmail.com.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.nav initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#0e0e0e]/80 backdrop-blur-xl border-b border-white/5" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <img src="/logo2-transparent.png" alt="Techstux" className="h-9 w-auto brightness-0 invert" />
          </a>
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map(l => (
              <a key={l.label} href={l.href}
                className="relative text-xs text-white hover:text-white/80 transition-colors duration-200 group tracking-wide"
                style={MANROPE}>
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <a href="#contact"
              className="text-xs border border-neutral-700 text-white hover:text-white/80 hover:border-white/50 px-5 py-2 rounded-full transition-all duration-300 hover:bg-white/5"
              style={MANROPE}>
              Contact
            </a>
          </div>
          <button className="lg:hidden flex flex-col gap-1.5 p-1" onClick={() => setMenuOpen(!menuOpen)}>
            <span className={`block h-px w-6 bg-neutral-400 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2.5" : ""}`} />
            <span className={`block h-px w-6 bg-neutral-400 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px w-6 bg-neutral-400 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden bg-[#0e0e0e]/95 backdrop-blur-xl border-b border-white/5">
              <div className="flex flex-col gap-4 px-6 py-5">
                {navLinks.map(l => (
                  <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
                    className="text-sm text-white hover:text-white/80 py-1 tracking-wide">{l.label}</a>
                ))}
                <a href="#contact" onClick={() => setMenuOpen(false)}
                  className="text-sm text-white border border-neutral-700 px-4 py-2 w-fit rounded-full">Contact</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <section className="relative min-h-screen flex items-center justify-center px-6 lg:px-10 pt-16 overflow-hidden">
        <Orb x="8%" y="15%" size={500} delay={0} />
        <Orb x="65%" y="5%" size={400} delay={2} />
        <Orb x="80%" y="60%" size={300} delay={1} />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "80px 80px" }} />
        <div className="absolute top-0 left-1/2 w-px h-32 bg-gradient-to-b from-transparent via-neutral-700 to-transparent" />

        <motion.div style={{ opacity: heroOpacity, y: heroY }}
          className="relative max-w-5xl mx-auto text-center z-10">

          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-[10px] tracking-[0.4em] text-neutral-600 uppercase mb-10 flex items-center justify-center gap-3"
            style={MONO}>
            <span className="w-8 h-px bg-neutral-700" />
            Learn · Build · Grow
            <span className="w-8 h-px bg-neutral-700" />
          </motion.p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.2rem] font-extrabold leading-[1.06] tracking-tight mb-6 flex flex-wrap justify-center gap-x-3 gap-y-2"
            style={SYNE}>
            {["Bridging", "Education", "&", "Industry."].map((word, i) => (
              <motion.span key={word}
                initial={{ opacity: 0, y: 60, rotateX: -30 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.5 + i * 0.12, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className={i >= 2 ? "text-neutral-400" : "text-white"}>
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7 }}
            className="text-base sm:text-lg text-neutral-500 max-w-2xl mx-auto leading-[1.85] mb-12 font-light"
            style={MANROPE}>
            Bridging the gap between education and industry through real-world project experience —
            connecting businesses with vetted student talent, mentored by industry professionals.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <MagneticBtn href="#contact"
              className="group relative overflow-hidden bg-white text-neutral-900 px-9 py-3.5 text-sm font-semibold tracking-wide rounded-full hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] transition-shadow duration-500">
              <span className="relative z-10 flex items-center gap-2" style={MANROPE}>
                Hire Us
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
              <motion.div className="absolute inset-0 bg-neutral-200"
                initial={{ x: "-100%" }} whileHover={{ x: 0 }} transition={{ duration: 0.35 }} />
            </MagneticBtn>
            <a href="#waitlist"
              className="text-sm text-neutral-500 hover:text-white transition-colors duration-300 tracking-wide underline underline-offset-4 decoration-neutral-800 hover:decoration-neutral-500"
              style={MANROPE}>
              Join Waitlist
            </a>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <motion.div animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-neutral-600 to-transparent origin-top" />
        </motion.div>
      </section>

      <div className="relative h-20 overflow-hidden -mt-1 bg-[#0e0e0e]">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          <path d="M0,0 L1440,52 L1440,80 L0,80 Z" fill="#111111" />
        </svg>
      </div>

      <section id="about" className="py-24 px-6 lg:px-10 bg-[#111111]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow="Who We Are" title="About Techstux" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <GlowCard delay={0}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-full border border-neutral-700 flex items-center justify-center">
                  <svg className="w-4 h-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                  </svg>
                </div>
                <span className="text-xs text-neutral-600 tracking-widest uppercase" style={MONO}>The Problem</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4" style={SYNE}>The Gap We're Closing</h3>
              <p className="text-sm text-neutral-500 leading-[1.85] font-light" style={MANROPE}>
                Students graduate with theoretical knowledge but lack real-world experience. Businesses need
                skilled tech talent but can't always afford senior teams. This creates a frustrating gap —
                companies struggle to ship, and students struggle to break in.
                <br /><br />
                Techstux exists to solve both problems at once.
              </p>
            </GlowCard>
            <GlowCard delay={1}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-full border border-neutral-700 flex items-center justify-center">
                  <svg className="w-4 h-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                  </svg>
                </div>
                <span className="text-xs text-neutral-600 tracking-widest uppercase" style={MONO}>Why We Started</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4" style={SYNE}>Built From Experience</h3>
              <p className="text-sm text-neutral-500 leading-[1.85] font-light" style={MANROPE}>
                Techstux was founded after witnessing first-hand how capable students go unseen and how
                businesses overpay for simple digital solutions. We built a model that gives students
                real projects to grow on, while delivering quality results to businesses at fair prices —
                with professionals ensuring every output meets the mark.
              </p>
            </GlowCard>
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 border border-neutral-800/60 rounded-xl p-8 bg-[#151515] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-[0.04]"
              style={{ background: "radial-gradient(circle, #94a3b8, transparent)" }} />
            <p className="text-[10px] tracking-[0.35em] text-neutral-700 uppercase mb-3" style={MONO}>Our Mission</p>
            <p className="text-xl sm:text-2xl font-bold text-neutral-200 leading-relaxed max-w-3xl" style={SYNE}>
              "To make real-world project experience accessible to every student, and quality tech talent accessible to every business."
            </p>
          </motion.div>
        </div>
      </section>

      <div className="relative h-20 overflow-hidden bg-[#111111]">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          <path d="M0,52 L1440,0 L1440,80 L0,80 Z" fill="#0e0e0e" />
        </svg>
      </div>

      <section className="py-24 px-6 lg:px-10 bg-[#0e0e0e]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow="Where We're Headed" title="Our Vision." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: "01", title: "Global Talent Network", desc: "A worldwide network of vetted student developers, designers, and AI engineers ready to deliver at scale." },
              { num: "02", title: "The New Hiring Model", desc: "Becoming the default way companies access affordable, supervised tech talent without long hiring cycles." },
              { num: "03", title: "Student Career Engine", desc: "Every student who works with us leaves with a portfolio, industry references, and a career head start." },
            ].map((v, i) => (
              <GlowCard key={v.title} delay={i}>
                <span className="text-xs text-neutral-700 tracking-widest block mb-6" style={MONO}>{v.num}</span>
                <h3 className="text-lg font-bold text-white mb-3" style={SYNE}>{v.title}</h3>
                <p className="text-sm text-neutral-600 leading-[1.75] font-light" style={MANROPE}>{v.desc}</p>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      <div className="relative h-20 overflow-hidden bg-[#0e0e0e]">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          <path d="M0,0 L1440,52 L1440,80 L0,80 Z" fill="#111111" />
        </svg>
      </div>

      <section id="services" className="py-24 px-6 lg:px-10 bg-[#111111]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow="What We Do" title="Our Expertise" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s, i) => (
              <GlowCard key={s.title} delay={i}>
                <div className="flex items-start justify-between mb-8">
                  <div className="text-neutral-500 group-hover:text-neutral-300 transition-colors duration-500">{s.icon}</div>
                  <span className="text-xs text-neutral-700 tracking-widest" style={MONO}>{s.num}</span>
                </div>
                <h3 className="text-base font-bold text-white mb-3" style={SYNE}>{s.title}</h3>
                <p className="text-sm text-neutral-600 leading-[1.75] font-light" style={MANROPE}>{s.desc}</p>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      <div className="relative h-20 overflow-hidden bg-[#111111]">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          <path d="M0,52 L1440,0 L1440,80 L0,80 Z" fill="#0e0e0e" />
        </svg>
      </div>

      <section id="process" className="py-24 px-6 lg:px-10 bg-[#0e0e0e]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow="How It Works" title="The Process." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative max-w-4xl mx-auto">
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="hidden md:block absolute top-12 left-[25%] right-[25%] h-px bg-gradient-to-r from-neutral-800 via-neutral-600 to-neutral-800 origin-left" />
            {[
              { num: "01", title: "Strict Vetting", desc: "Every student passes a rigorous technical and professional screening before being assigned to any project." },
              { num: "02", title: "Expert Mentorship", desc: "Senior professionals guide, review, and quality-check all deliverables at every stage of the project." },
            ].map((s, i) => (
              <motion.div key={s.num}
                initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center relative z-10">
                <div className="relative mb-10">
                  <motion.div whileHover={{ rotate: 45, scale: 1.1 }} transition={{ duration: 0.4 }}
                    className="w-24 h-24 border border-neutral-700/60 rotate-45 flex items-center justify-center bg-[#151515]">
                    <span className="text-sm text-neutral-500 tracking-widest -rotate-45" style={MONO}>{s.num}</span>
                  </motion.div>
                  <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3 + i, repeat: Infinity }}
                    className="absolute inset-0 border border-neutral-700/20 rotate-45 scale-125" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3" style={SYNE}>{s.title}</h3>
                <p className="text-sm text-neutral-600 leading-[1.75] font-light max-w-xs" style={MANROPE}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="relative h-20 overflow-hidden bg-[#0e0e0e]">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          <path d="M0,0 L1440,52 L1440,80 L0,80 Z" fill="#111111" />
        </svg>
      </div>

      <section id="waitlist" className="py-24 px-6 lg:px-10 bg-[#111111]">
        <div className="max-w-2xl mx-auto text-center">
          <SectionHeader eyebrow="Be First" title="Join the Waitlist." />
          <p className="text-sm text-neutral-500 leading-relaxed font-light -mt-8 mb-10" style={MANROPE}>
            Whether you're a student looking for real project experience or a company looking for tech help —
            drop your email and we'll reach out first.
          </p>
          <AnimatePresence mode="wait">
            {waitlistSubmitted ? (
              <motion.div key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="border border-neutral-800 rounded-xl py-10 px-8 text-center">
                <p className="text-2xl mb-2" style={SYNE}>You're on the list. ✓</p>
                <p className="text-sm text-neutral-600" style={MANROPE}>We'll be in touch soon.</p>
              </motion.div>
            ) : (
              <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                onSubmit={(e) => { 
                  e.preventDefault(); 
                  if (waitlistEmail) {
                    setWaitlistSending(true);
                    emailjs.send(
                      EMAILJS_SERVICE_ID, 
                      EMAILJS_TEMPLATE_ID, 
                      { name: "Waitlist Request", email: waitlistEmail, message: "A new user wants to join the waitlist." }, 
                      { publicKey: EMAILJS_PUBLIC_KEY }
                    ).then(() => {
                      setWaitlistSubmitted(true);
                      setWaitlistSending(false);
                    }).catch(err => {
                      console.error("Waitlist error:", err);
                      setWaitlistSending(false);
                    });
                  }
                }}
                className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <input type="email" required value={waitlistEmail}
                    onChange={e => setWaitlistEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-[#181818] border border-neutral-800 text-sm text-white placeholder-neutral-700 px-5 py-3.5 rounded-full focus:outline-none focus:border-neutral-600 transition-colors"
                    style={MANROPE} />
                </div>
                <motion.button type="submit" disabled={waitlistSending} whileHover={waitlistSending ? undefined : { scale: 1.03 }} whileTap={waitlistSending ? undefined : { scale: 0.97 }}
                  className="bg-white text-neutral-900 px-7 py-3.5 text-sm font-semibold rounded-full hover:bg-neutral-100 transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={MANROPE}>
                  {waitlistSending ? "Joining..." : "Join Waitlist"}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
          <p className="text-xs text-neutral-700 mt-4" style={MONO}>No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      <div className="relative h-20 overflow-hidden bg-[#111111]">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          <path d="M0,52 L1440,0 L1440,80 L0,80 Z" fill="#0e0e0e" />
        </svg>
      </div>

      <section id="faq" className="py-24 px-6 lg:px-10 bg-[#0e0e0e]">
        <div className="max-w-3xl mx-auto">
          <SectionHeader eyebrow="Common Questions" title="FAQ" />
          <div>
            {faqs.map(f => <FAQItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      <div className="relative h-20 overflow-hidden bg-[#0e0e0e]">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          <path d="M0,0 L1440,52 L1440,80 L0,80 Z" fill="#111111" />
        </svg>
      </div>

      <section id="contact" className="py-24 px-6 lg:px-10 bg-[#111111] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(100,116,139,0.04) 0%, transparent 70%)" }} />
        <div className="max-w-5xl mx-auto relative">
          <SectionHeader eyebrow="Get In Touch" title="Let's Build Something." />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="space-y-8">
              <p className="text-sm text-neutral-500 leading-[1.85] font-light" style={MANROPE}>
                Have a project in mind or want to explore how Techstux can help your business?
                Reach out — we respond within 24 hours.
              </p>
              <div className="space-y-5">
                <a href="mailto:techstuxworks@gmail.com"
                  className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center group-hover:border-neutral-600 transition-colors">
                    <svg className="w-4 h-4 text-neutral-600 group-hover:text-neutral-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-neutral-700 tracking-widest uppercase mb-1" style={MONO}>Email</p>
                    <p className="text-base text-neutral-300 group-hover:text-white transition-colors" style={MANROPE}>techstuxworks@gmail.com</p>
                  </div>
                </a>
                <a href="https://instagram.com/techstux" target="_blank" rel="noreferrer"
                  className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center group-hover:border-neutral-600 transition-colors">
                    <svg className="w-4 h-4 text-neutral-600 group-hover:text-neutral-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-neutral-700 tracking-widest uppercase mb-1" style={MONO}>Instagram</p>
                    <p className="text-sm text-neutral-300 group-hover:text-white transition-colors" style={MANROPE}>@techstux</p>
                  </div>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <form ref={formRef} id="contact-form" onSubmit={sendEmail} className="space-y-8">
                {[
                  { label: "Name", type: "text", ph: "John Smith", name: "name" },
                  { label: "Email", type: "email", ph: "you@company.com", name: "email" },
                ].map(f => (
                  <div key={f.label}>
                    <label className="block text-[10px] tracking-[0.28em] text-neutral-700 uppercase mb-3" style={MONO}>{f.label}</label>
                    <div className="relative">
                      <input type={f.type} name={f.name} required placeholder={f.ph}
                        className="w-full bg-transparent border-b border-neutral-800 pb-3 text-sm text-white placeholder-neutral-800 focus:outline-none focus:border-neutral-600 transition-colors duration-300 peer" style={MANROPE} />
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-white peer-focus:w-full transition-all duration-500" />
                    </div>
                  </div>
                ))}
                <div>
                  <label className="block text-[10px] tracking-[0.28em] text-neutral-700 uppercase mb-3" style={MONO}>Message</label>
                  <div className="relative">
                    <textarea name="message" rows={3} required placeholder="Tell us about your project…"
                      className="w-full bg-transparent border-b border-neutral-800 pb-3 text-sm text-white placeholder-neutral-800 focus:outline-none focus:border-neutral-600 transition-colors duration-300 resize-none peer" style={MANROPE} />
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-white peer-focus:w-full transition-all duration-500" />
                  </div>
                </div>
                <motion.button type="submit" disabled={contactStatus === "sending"}
                  whileHover={contactStatus === "sending" ? undefined : { scale: 1.02 }}
                  whileTap={contactStatus === "sending" ? undefined : { scale: 0.98 }}
                  className="group relative overflow-hidden border border-neutral-700 hover:border-white/50 text-neutral-300 hover:text-white px-10 py-4 text-sm tracking-[0.15em] uppercase transition-colors duration-300 rounded-full w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  style={MANROPE}>
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {contactStatus === "sending" ? "Sending…" : "Send Message"}
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                  <motion.div className="absolute inset-0 bg-white/5"
                    initial={{ x: "-100%" }} whileHover={{ x: 0 }} transition={{ duration: 0.4 }} />
                </motion.button>
                {contactStatus === "success" && (
                  <p className="text-sm text-emerald-400/90 text-center" style={MANROPE}>
                    Message sent successfully! We&apos;ll get back to you within 24 hours.
                  </p>
                )}
                {contactStatus === "error" && (
                  <p className="text-sm text-red-400/90 text-center" style={MANROPE}>
                    Failed to send message. Please try again or email techstuxworks@gmail.com.
                  </p>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="bg-[#0a0a0a] border-t border-white/[0.04] py-10 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-2.5">
              <img src="/logo2-transparent.png" alt="Techstux" className="h-7 w-auto brightness-0 invert opacity-30" />
            </div>
            <div className="flex items-center gap-6 flex-wrap justify-center">
              {[
                { label: "About", href: "#about" },
                { label: "Services", href: "#services" },
                { label: "How It Works", href: "#process" },
                { label: "Careers", href: "/careers" },
                { label: "Waitlist", href: "#waitlist" },
                { label: "FAQ", href: "#faq" },
                { label: "Contact", href: "#contact" },
              ].map(l => (
                <a key={l.label} href={l.href}
                  className="text-xs text-white hover:text-white/80 transition-colors tracking-wide" style={MANROPE}>{l.label}</a>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <a href="mailto:techstuxworks@gmail.com"
                className="w-8 h-8 rounded-full border border-neutral-800/60 flex items-center justify-center hover:border-neutral-600 transition-colors">
                <svg className="w-3.5 h-3.5 text-neutral-700 hover:text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </a>
              <a href="https://instagram.com/techstux" target="_blank" rel="noreferrer"
                className="w-8 h-8 rounded-full border border-neutral-800/60 flex items-center justify-center hover:border-neutral-600 transition-colors">
                <svg className="w-3.5 h-3.5 text-neutral-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="border-t border-neutral-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white tracking-wide" style={MANROPE}>© 2026 Techstux. All rights reserved.</p>
            <div className="flex gap-5">
              <a href="/privacy"
                className="text-xs text-white hover:text-white/80 transition-colors" style={MANROPE}>
                Privacy Policy
              </a>
              <button onClick={() => setActiveModal("terms")}
                className="text-xs text-white hover:text-white/80 transition-colors" style={MANROPE}>
                Terms & Conditions
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
