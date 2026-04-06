import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions — GameAPKDownloads.pk",
  description: "Terms and conditions for using GameAPKDownloads.pk. Covers APK downloads, earning app reviews, and your responsibilities as a visitor.",
  alternates: { canonical: "https://gameapkdownloads.pk/terms" },
};

export default function Terms() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-emerald-400">Home</Link>
        <span>›</span>
        <span className="text-gray-300">Terms & Conditions</span>
      </nav>
      <h1 className="text-3xl font-extrabold text-white mb-2">Terms & Conditions</h1>
      <p className="text-gray-500 text-sm mb-8">Last updated: April 7, 2026</p>

      <div className="space-y-8 text-gray-400 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-white mb-3">1. Acceptance of Terms</h2>
          <p>By accessing and using GameAPKDownloads.pk, you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use this website.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">2. Nature of the Website</h2>
          <p>GameAPKDownloads.pk is an informational website that provides reviews, guides, and information about mobile applications (APKs) available in Pakistan. We do not develop, own, or operate any of the games or applications listed on this site.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">3. Age Restriction</h2>
          <p>This website and the applications it describes are intended for adults aged <strong className="text-gray-300">18 years and above</strong>. By using this site, you confirm that you are at least 18 years old. We do not knowingly provide services to minors.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">4. No Financial Guarantee</h2>
          <p>The earning amounts mentioned on this website (bonuses, referral amounts, withdrawal figures) are based on information provided by app developers and user reports. GameAPKDownloads.pk does not guarantee any specific earnings. Financial results vary by user, skill level, and app availability.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">5. Third-Party Applications</h2>
          <p>All APK applications linked or described on this site are third-party products. We are not responsible for:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>The availability or functionality of any third-party app</li>
            <li>Any financial losses from using these applications</li>
            <li>Changes in app terms, bonuses, or withdrawal policies</li>
            <li>Device security issues arising from installing third-party APKs</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">6. Responsible Use</h2>
          <p>Users are encouraged to use earning apps responsibly. Do not spend more than you can afford to lose. Gambling-style games carry financial risk. GameAPKDownloads.pk promotes responsible gaming.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">7. Intellectual Property</h2>
          <p>All original content on GameAPKDownloads.pk (articles, reviews, guides) is owned by GameAPKDownloads.pk. Reproducing our content without permission is prohibited.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">8. Limitation of Liability</h2>
          <p>GameAPKDownloads.pk shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of this website or any applications linked herein.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">9. Changes to Terms</h2>
          <p>We reserve the right to modify these Terms at any time. Continued use of the website after changes constitutes acceptance of the new Terms.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">10. Governing Law</h2>
          <p>These Terms are governed by the laws of Pakistan. Any disputes shall be subject to the jurisdiction of Pakistani courts.</p>
        </section>
      </div>
    </div>
  );
}
