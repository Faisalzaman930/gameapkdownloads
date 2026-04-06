import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimer — GameAPKDownloads.pk",
  description: "Important: earning apps involve real money and financial risk. Read our disclaimer before downloading any APK from GameAPKDownloads.pk.",
  alternates: { canonical: "https://gameapkdownloads.pk/disclaimer" },
};

export default function Disclaimer() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-emerald-400">Home</Link>
        <span>›</span>
        <span className="text-gray-300">Disclaimer</span>
      </nav>
      <h1 className="text-3xl font-extrabold text-white mb-2">Disclaimer</h1>
      <p className="text-gray-500 text-sm mb-8">Last updated: April 7, 2026</p>

      <div className="space-y-8 text-gray-400 text-sm leading-relaxed">
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 text-yellow-300 text-sm">
          ⚠️ <strong>Important:</strong> The earning apps listed on this website involve financial risk. Only use money you can afford to lose. This site is for adults 18+ only.
        </div>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">General Information Only</h2>
          <p>GameAPKDownloads.pk provides general information and reviews about mobile earning applications available in Pakistan. All content on this website is for informational purposes only and should not be construed as financial advice, investment advice, or endorsement of any particular application.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">No Affiliation</h2>
          <p>GameAPKDownloads.pk is an independent review website. We are not affiliated with, endorsed by, or officially connected to any of the apps or companies mentioned on this site. All app names, logos, and trademarks are the property of their respective owners.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">Earnings Disclaimer</h2>
          <p>Any earning figures, bonus amounts, or withdrawal amounts mentioned on this site are based on publicly available information from app developers and user-submitted experiences. <strong className="text-gray-300">Results are not typical.</strong> Actual earnings vary significantly and depend on time spent, skill level, app availability, and market conditions. We make no guarantee of income.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">APK Download Risk</h2>
          <p>Installing APK files from outside the Google Play Store carries inherent risk. While we take reasonable steps to verify the apps we list, we cannot guarantee that every APK is free from malware or security vulnerabilities. Always:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Download only from sources you trust</li>
            <li>Keep your device security settings up to date</li>
            <li>Use antivirus software on your Android device</li>
            <li>Never share your app login credentials with anyone</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">Accuracy of Information</h2>
          <p>We strive to keep all information up to date, but app features, bonus amounts, withdrawal limits, and availability can change at any time without notice. Always verify current details directly with the app before depositing any money.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">Responsible Gaming</h2>
          <p>Many apps on this site involve elements of chance. Please play responsibly. If you feel you may have a problem with gaming or spending, seek help from a professional. GameAPKDownloads.pk supports responsible gaming practices.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">Contact</h2>
          <p>For any questions regarding this disclaimer, contact us at: <span className="text-emerald-400">contact@gameapkdownloads.pk</span></p>
        </section>
      </div>
    </div>
  );
}
