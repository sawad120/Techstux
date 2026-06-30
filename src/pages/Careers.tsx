import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import { MANROPE, MONO, SYNE } from "@/lib/fonts";

function SectionCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: delay * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-xl border border-neutral-800/80 bg-[#181818] p-8 overflow-hidden"
    >
      {children}
    </motion.div>
  );
}

export default function Careers() {
  const benefits = [
    "Real-world project experience",
    "Professional mentorship",
    "Portfolio-building opportunities",
    "Flexible remote collaboration",
    "Skill development",
    "Collaborative team environment",
    "Career growth opportunities",
  ];

  const roles = [
    "Web Development",
    "UI/UX Design",
    "Graphic Design",
    "Video Editing",
    "Digital Marketing",
    "AI & Automation",
    "Content Writing",
    "Project Management",
  ];

  const hiringSteps = [
    "Submit your application.",
    "Initial profile review.",
    "Skill assessment.",
    "Interview (if required).",
    "Project onboarding.",
  ];

  return (
    <PageLayout>
      <section className="relative px-6 lg:px-10 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "80px 80px" }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-[10px] tracking-[0.4em] text-neutral-600 uppercase mb-6" style={MONO}>
            Careers at Techstux
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6" style={SYNE}>
            Build Your Future with Techstux
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-base sm:text-lg text-neutral-500 max-w-2xl mx-auto leading-[1.85] font-light" style={MANROPE}>
            Join a team that&apos;s bridging education and industry by creating real-world opportunities for students
            and delivering quality digital solutions for businesses.
          </motion.p>
        </div>
      </section>

      <div className="relative h-12 overflow-hidden bg-[#0e0e0e]">
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          <path d="M0,0 L1440,32 L1440,48 L0,48 Z" fill="#111111" />
        </svg>
      </div>

      <section className="px-6 lg:px-10 py-20 bg-[#111111]">
        <div className="max-w-5xl mx-auto space-y-8">
          <SectionCard delay={0}>
            <p className="text-[10px] tracking-[0.35em] text-neutral-700 uppercase mb-4" style={MONO}>Why Join Techstux</p>
            <p className="text-sm text-neutral-500 leading-[1.85] font-light" style={MANROPE}>
              At Techstux, we believe learning happens through real projects. Whether you&apos;re a student, developer,
              designer, or creative professional, you&apos;ll gain practical experience, collaborate with talented people,
              and grow your career while working on meaningful projects.
            </p>
          </SectionCard>

          <SectionCard delay={1}>
            <p className="text-[10px] tracking-[0.35em] text-neutral-700 uppercase mb-6" style={MONO}>What You&apos;ll Get</p>
            <ul className="grid sm:grid-cols-2 gap-3">
              {benefits.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-neutral-400 font-light" style={MANROPE}>
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-500" />
                  {item}
                </li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard delay={2}>
            <p className="text-[10px] tracking-[0.35em] text-neutral-700 uppercase mb-6" style={MONO}>Who Can Apply</p>
            <p className="text-sm text-neutral-500 leading-[1.85] font-light mb-6" style={MANROPE}>
              We welcome applications from people interested in:
            </p>
            <div className="flex flex-wrap gap-2">
              {roles.map((role) => (
                <span key={role} className="text-xs border border-neutral-800 text-neutral-400 px-4 py-2 rounded-full tracking-wide">
                  {role}
                </span>
              ))}
            </div>
          </SectionCard>

          <SectionCard delay={3}>
            <p className="text-[10px] tracking-[0.35em] text-neutral-700 uppercase mb-6" style={MONO}>Our Hiring Process</p>
            <ol className="space-y-4">
              {hiringSteps.map((step, i) => (
                <li key={step} className="flex items-start gap-4">
                  <span className="text-xs text-neutral-600 tracking-widest mt-0.5 shrink-0" style={MONO}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-neutral-400 font-light" style={MANROPE}>{step}</span>
                </li>
              ))}
            </ol>
          </SectionCard>

          <SectionCard delay={4}>
            <p className="text-[10px] tracking-[0.35em] text-neutral-700 uppercase mb-4" style={MONO}>Current Openings</p>
            <p className="text-sm text-neutral-500 leading-[1.85] font-light mb-2" style={MANROPE}>
              We are always looking for passionate and talented individuals.
            </p>
            <p className="text-sm text-neutral-500 leading-[1.85] font-light mb-8" style={MANROPE}>
              No suitable role available? Send us your resume and portfolio for future opportunities.
            </p>
            <a
              href="mailto:hello@techstux.com?subject=Career Application — Techstux"
              className="inline-flex items-center gap-2 bg-white text-neutral-900 px-8 py-3.5 text-sm font-semibold tracking-wide rounded-full hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] transition-shadow duration-500"
              style={MANROPE}
            >
              Apply Now
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </SectionCard>
        </div>
      </section>
    </PageLayout>
  );
}
