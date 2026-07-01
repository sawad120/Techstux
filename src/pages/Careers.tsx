import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import { MANROPE, MONO, SYNE } from "@/lib/fonts";

export default function Careers() {
  return (
    <PageLayout>
      <section className="relative px-6 lg:px-10 py-24 min-h-screen overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-gradient-to-b from-neutral-800/20 to-transparent blur-3xl rounded-full pointer-events-none opacity-50" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-[10px] tracking-[0.4em] text-neutral-600 uppercase mb-6 text-center" style={MONO}>
            Careers at Techstux
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-8 text-center" style={SYNE}>
            Build Your Future with Techstux
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-neutral-400 leading-relaxed font-light mb-16 text-center max-w-3xl mx-auto" style={MANROPE}>
            Join Techstux and gain real-world experience by working on meaningful projects under professional mentorship while building your skills and career.
          </motion.p>

          <div className="space-y-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4" style={SYNE}>Why Join Techstux</h2>
              <p className="text-sm md:text-base text-neutral-400 leading-relaxed font-light" style={MANROPE}>
                At Techstux, we believe the best way to learn is by building real products. We provide students and professionals with opportunities to work on real client projects, collaborate with talented teams, and grow through practical experience.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-6" style={SYNE}>Benefits</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm md:text-base text-neutral-400 font-light" style={MANROPE}>
                {[
                  "Real Project Experience",
                  "Professional Mentorship",
                  "Portfolio Building",
                  "Remote Collaboration",
                  "Skill Development",
                  "Career Growth",
                  "Flexible Learning",
                  "Team Environment"
                ].map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-6" style={SYNE}>Opportunities</h2>
              <p className="text-sm md:text-base text-neutral-400 mb-6 font-light" style={MANROPE}>
                We are looking for talented people in:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm md:text-base text-neutral-400 font-light" style={MANROPE}>
                {[
                  "Web Development",
                  "UI/UX Design",
                  "Graphic Design",
                  "Video Editing",
                  "AI & Automation",
                  "Digital Marketing",
                  "Content Writing"
                ].map((opp, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 shrink-0" />
                    {opp}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-6" style={SYNE}>Hiring Process</h2>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-gradient-to-b before:from-transparent before:via-neutral-800 before:to-transparent">
                {[
                  "Submit Application",
                  "Profile Review",
                  "Skill Assessment",
                  "Interview (if required)",
                  "Project Onboarding"
                ].map((step, i) => (
                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-neutral-800 bg-[#151515] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 text-neutral-500 font-mono text-sm z-10" style={MONO}>
                      {i + 1}
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-neutral-800/60 bg-[#151515] text-neutral-300 text-sm font-light" style={MANROPE}>
                      {step}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="mt-16 p-10 rounded-2xl border border-neutral-800/60 bg-gradient-to-b from-[#181818] to-[#111111] text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-neutral-600 to-transparent opacity-30" />
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4" style={SYNE}>Ready to Grow With Us?</h2>
              <p className="text-sm md:text-base text-neutral-400 font-light mb-8 max-w-lg mx-auto" style={MANROPE}>
                Become part of Techstux and build your future through real industry experience.
              </p>
              <a href="mailto:techstuxworks@gmail.com?subject=Career Application — Techstux" 
                 className="inline-block bg-white text-neutral-900 px-8 py-3.5 text-sm font-semibold rounded-full hover:bg-neutral-100 transition-colors" style={MANROPE}>
                Apply Now
              </a>
            </motion.div>

          </div>
        </div>
      </section>
    </PageLayout>
  );
}
