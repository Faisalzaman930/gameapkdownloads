import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — GameAPKDownloads.pk",
  description: "How GameAPKDownloads.pk collects, uses, and protects your data. We never sell your information. Read our full privacy commitment.",
  alternates: { canonical: "https://gameapkdownloads.pk/privacy-policy" },
};

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-emerald-400">Home</Link>
        <span>›</span>
        <span className="text-gray-300">Privacy Policy</span>
      </nav>
      <h1 className="text-3xl font-extrabold text-white mb-2">Privacy Policy</h1>
      <p className="text-gray-500 text-sm mb-8">Last updated: April 7, 2026</p>

      <div className="space-y-8 text-gray-400 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-white mb-3">1. Introduction</h2>
          <p>GameAPKDownloads.pk (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard information when you visit our website gameapkdownloads.pk.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">2. Information We Collect</h2>
          <p className="mb-2">We may collect the following types of information:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong className="text-gray-300">Usage Data:</strong> Pages visited, time spent, browser type, device type, and IP address (anonymized).</li>
            <li><strong className="text-gray-300">Cookies:</strong> We use cookies to improve site performance and understand how visitors use our site.</li>
            <li><strong className="text-gray-300">Analytics:</strong> We use Google Analytics to collect aggregated, anonymized data about site traffic.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">3. How We Use Your Information</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>To improve our website content and user experience</li>
            <li>To understand which games and pages are most popular</li>
            <li>To ensure the website functions correctly across devices</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">4. Third-Party Links</h2>
          <p>Our website contains links to third-party game applications and APK download sources. We are not responsible for the privacy practices of those external sites. We recommend reading their privacy policies before downloading any application.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">5. Cookies</h2>
          <p>We use essential cookies to operate the website and analytics cookies to understand visitor behavior. You can disable cookies in your browser settings, though this may affect some site functionality.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">6. Data Security</h2>
          <p>We do not collect personal data such as names, email addresses, or payment information. Our website is served over HTTPS to ensure encrypted connections.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">7. Children&apos;s Privacy</h2>
          <p>GameAPKDownloads.pk is intended for users aged 18 and above. We do not knowingly collect data from children under 18.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">8. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">9. Contact Us</h2>
          <p>If you have questions about this Privacy Policy, you can reach us at: <span className="text-emerald-400">contact@gameapkdownloads.pk</span></p>
        </section>
      </div>
    </div>
  );
}
