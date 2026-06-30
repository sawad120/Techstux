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
      <h2 className="text-lg font-bold text-white mb-4" style={SYNE}>{title}</h2>
      <div className="text-sm text-neutral-500 leading-[1.85] font-light space-y-4" style={MANROPE}>
        {children}
      </div>
    </motion.section>
  );
}

export default function Privacy() {
  return (
    <PageLayout>
      <section className="px-6 lg:px-10 py-24">
        <div className="max-w-3xl mx-auto">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-[10px] tracking-[0.4em] text-neutral-600 uppercase mb-6" style={MONO}>
            Legal
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4" style={SYNE}>
            Privacy Policy
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-sm text-neutral-600 mb-12" style={MONO}>
            Effective Date: June 30, 2026
          </motion.p>

          <div className="space-y-10">
            <PolicySection title="Introduction">
              <p>
                Techstux values your privacy and is committed to protecting your personal information. This Privacy
                Policy explains how we collect, use, and protect the information you provide through our website.
              </p>
            </PolicySection>

            <PolicySection title="Information We Collect">
              <p>We may collect:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Name</li>
                <li>Email address</li>
                <li>Messages submitted through the contact form</li>
                <li>Website usage data (such as analytics)</li>
              </ul>
            </PolicySection>

            <PolicySection title="How We Use Your Information">
              <p>We use your information to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Respond to inquiries</li>
                <li>Improve our services</li>
                <li>Communicate with users</li>
                <li>Maintain website security</li>
              </ul>
            </PolicySection>

            <PolicySection title="Information Sharing">
              <p>
                We do not sell or rent your personal information. Information may only be shared when required by law
                or to provide our services.
              </p>
            </PolicySection>

            <PolicySection title="Data Security">
              <p>
                We use reasonable security measures to protect your information. However, no online system can guarantee
                complete security.
              </p>
            </PolicySection>

            <PolicySection title="Cookies">
              <p>Our website may use cookies to improve user experience and website performance.</p>
            </PolicySection>

            <PolicySection title="Third-Party Services">
              <p>Our website may use trusted third-party services such as:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Google Analytics</li>
                <li>EmailJS</li>
                <li>Hosting providers</li>
              </ul>
              <p>Each service has its own privacy policy.</p>
            </PolicySection>

            <PolicySection title="Your Rights">
              <p>You may request to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Access your information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your personal data</li>
              </ul>
            </PolicySection>

            <PolicySection title="Contact">
              <p>If you have any questions regarding this Privacy Policy, contact us at:</p>
              <p>
                Email:{" "}
                <a href="mailto:hello@techstux.com" className="text-neutral-300 hover:text-white transition-colors underline underline-offset-4 decoration-neutral-700">
                  hello@techstux.com
                </a>
              </p>
            </PolicySection>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-xl border border-neutral-800/60 bg-[#151515] p-8"
            >
              <p className="text-sm text-neutral-500 leading-[1.85] font-light" style={MANROPE}>
                By using the Techstux website, you agree to this Privacy Policy. We may update this policy from time
                to time, and changes will be published on this page.
              </p>
            </motion.section>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
