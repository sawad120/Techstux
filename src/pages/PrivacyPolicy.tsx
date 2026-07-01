import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import { MANROPE, MONO, SYNE } from "@/lib/fonts";

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="border-b border-neutral-800/60 pb-10"
    >
      <h2 className="text-lg md:text-xl font-bold text-white mb-4" style={SYNE}>{title}</h2>
      <div className="text-sm md:text-base text-neutral-400 leading-relaxed font-light space-y-4" style={MANROPE}>
        {children}
      </div>
    </motion.section>
  );
}

export default function PrivacyPolicy() {
  return (
    <PageLayout>
      <section className="px-6 lg:px-10 py-24 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-[10px] tracking-[0.4em] text-neutral-600 uppercase mb-6" style={MONO}>
            Legal
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4" style={SYNE}>
            Privacy Policy
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-sm text-neutral-500 mb-16" style={MONO}>
            Effective Date: July 1, 2026
          </motion.p>

          <div className="space-y-12">
            <PolicySection title="Introduction">
              <p>
                At Techstux, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains what information we collect, how we use it, and how we protect it.
              </p>
            </PolicySection>

            <PolicySection title="Information We Collect">
              <ul className="list-disc pl-5 space-y-2">
                <li>Name</li>
                <li>Email Address</li>
                <li>Messages submitted through our contact forms</li>
                <li>Basic website analytics</li>
              </ul>
            </PolicySection>

            <PolicySection title="How We Use Your Information">
              <ul className="list-disc pl-5 space-y-2">
                <li>Respond to inquiries</li>
                <li>Improve our services</li>
                <li>Communicate with users</li>
                <li>Maintain website security</li>
              </ul>
            </PolicySection>

            <PolicySection title="Data Protection">
              <p>
                We take reasonable security measures to protect your personal information. However, no online service can guarantee absolute security.
              </p>
            </PolicySection>

            <PolicySection title="Cookies">
              <p>Our website may use cookies to improve your browsing experience.</p>
            </PolicySection>

            <PolicySection title="Third-Party Services">
              <p>We may use trusted third-party services such as:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>EmailJS</li>
                <li>Vercel</li>
                <li>GitHub</li>
                <li>Google Analytics (when enabled)</li>
              </ul>
            </PolicySection>

            <PolicySection title="Your Rights">
              <p>You may request to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Access your information</li>
                <li>Correct your information</li>
                <li>Request deletion of your data</li>
              </ul>
            </PolicySection>

            <PolicySection title="Contact">
              <p>
                Email:{" "}
                <a href="mailto:techstuxworks@gmail.com" className="text-neutral-300 hover:text-white transition-colors underline underline-offset-4 decoration-neutral-700">
                  techstuxworks@gmail.com
                </a>
              </p>
            </PolicySection>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-xl border border-neutral-800/60 bg-[#151515] p-8 mt-12"
            >
              <p className="text-sm md:text-base text-neutral-400 leading-relaxed font-light" style={MANROPE}>
                By using the Techstux website, you agree to this Privacy Policy. We may update this policy from time to time, and any changes will be published on this page.
              </p>
            </motion.section>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
