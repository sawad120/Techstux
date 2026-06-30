import { Link } from "wouter";
import { MANROPE, SYNE } from "@/lib/fonts";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0e0e0e] px-6" style={MANROPE}>
      <div className="text-center max-w-md">
        <h1 className="text-5xl font-extrabold text-white mb-4" style={SYNE}>404</h1>
        <p className="text-sm text-neutral-500 mb-8">This page doesn&apos;t exist.</p>
        <Link href="/" className="text-sm text-neutral-400 hover:text-white border border-neutral-800 px-6 py-3 rounded-full transition-colors">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
