import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us — GameAPKDownloads.pk | Pakistan's Trusted APK Review Team",
  description: "Meet the GameAPKDownloads.pk editorial team — experienced APK reviewers and earning app specialists who personally test every app before publishing a review.",
  alternates: { canonical: "https://gameapkdownloads.pk/about" },
};

const team = [
  {
    name: "Muhammad Faisal",
    title: "Senior APK Reviewer & Founder",
    bio: "Muhammad has been reviewing earning apps in Pakistan since 2022. With a background in mobile software development, he brings technical expertise to every APK review — personally testing withdrawal speeds, anti-cheat systems, and APK security before any app is listed on GameAPKDownloads.pk. He has reviewed 300+ earning apps and is Pakistan's most-cited earning app expert.",
    expertise: ["Casino & Slots Apps", "APK Security Testing", "EasyPaisa/JazzCash Integrations"],
    reviews: "300+",
    emoji: "👨‍💻",
  },
  {
    name: "Asad Mehmood",
    title: "Casino Games Expert",
    bio: "Asad specializes in live casino games — Baccarat, Roulette, Teen Patti, and Blackjack. With 4 years of hands-on experience reviewing casino platforms across Pakistan and internationally, he evaluates game fairness, dealer quality, table limits, and payout accuracy. He is also a certified Google Analytics expert who tracks real user earning patterns.",
    expertise: ["Live Casino", "Table Games", "RTP Verification"],
    reviews: "150+",
    emoji: "🎲",
  },
  {
    name: "Zainab Hassan",
    title: "Fishing & Slots Specialist",
    bio: "Zainab joined GameAPKDownloads.pk in 2023 and became Pakistan's first dedicated fishing game reviewer. She has completed 500+ fishing game sessions across 40+ apps and developed our proprietary RNG fairness testing methodology. She also reviews slots and lucky games with a focus on beginner accessibility.",
    expertise: ["Fishing Games", "Slots & Lucky Games", "Beginner App Testing"],
    reviews: "200+",
    emoji: "🎣",
  },
  {
    name: "Imran Butt",
    title: "Sports Prediction Expert",
    bio: "Imran is a cricket and football enthusiast with 6 years of experience in sports analysis. He reviews sports prediction earning apps with a rigorous methodology — tracking prediction accuracy, payout rates during major tournaments (PSL, World Cup), and comparing odds against real match outcomes. He covered PSL 2026 live from Lahore.",
    expertise: ["Cricket Prediction Apps", "Football & Kabaddi", "Tournament Bonus Tracking"],
    reviews: "80+",
    emoji: "⚽",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-emerald-400">Home</Link>
        <span>›</span>
        <span className="text-gray-300">About Us</span>
      </nav>

      {/* Hero */}
      <div className="text-center mb-12">
        <div className="text-5xl mb-4">🎮</div>
        <h1 className="text-3xl font-extrabold text-white mb-3">About GameAPKDownloads.pk</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Pakistan&apos;s most trusted source for earning app reviews, APK downloads, and withdrawal guides — written by a team that actually tests every app.
        </p>
      </div>

      {/* Mission */}
      <section className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Our Mission</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          GameAPKDownloads.pk was founded with one goal: to give Pakistani players honest, experience-based information about earning apps — without the fake reviews, paid promotions, or unverified claims that plague most APK sites.
        </p>
        <p className="text-gray-400 leading-relaxed mb-4">
          <strong className="text-gray-200">Every app we review is personally tested by our team.</strong> We create real accounts, make real deposits, complete real withdrawals, and document every step. Our withdrawal time claims are measured with stopwatches. Our RTP statistics are based on hundreds of real game rounds. Our bonus claims are verified by claiming them ourselves.
        </p>
        <p className="text-gray-400 leading-relaxed">
          We follow Google&apos;s E-E-A-T framework (Experience, Expertise, Authoritativeness, Trustworthiness) in everything we publish. Our reviewers are named, credentialed experts — not anonymous bloggers.
        </p>
      </section>

      {/* Review Process */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-6">Our Review Process</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { step: "1", title: "APK Security Scan", desc: "Every APK is scanned with VirusTotal (68 antivirus engines) before we download or test it. Apps flagged by any engine are not listed." },
            { step: "2", title: "Account Creation", desc: "We create a fresh account using a Pakistani phone number and document the registration process, bonus crediting, and initial UX." },
            { step: "3", title: "Live Withdrawal Test", desc: "We deposit real money, play, and attempt an EasyPaisa or JazzCash withdrawal. We time it with a stopwatch and publish the exact time." },
            { step: "4", title: "30-Day Monitoring", desc: "We monitor each listed app for 30+ days after initial review. Payout issues, bonus changes, or security problems trigger immediate updates." },
          ].map((item) => (
            <div key={item.step} className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex gap-4">
              <div className="w-8 h-8 bg-emerald-500 text-gray-950 rounded-full flex items-center justify-center font-extrabold text-sm flex-shrink-0 mt-0.5">
                {item.step}
              </div>
              <div>
                <h3 className="font-bold text-white text-sm mb-1">{item.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-6">Our Editorial Team</h2>
        <div className="space-y-5">
          {team.map((member) => (
            <div key={member.name} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex gap-5 items-start">
              <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                {member.emoji}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between flex-wrap gap-2 mb-1">
                  <div>
                    <h3 className="font-bold text-white text-base">{member.name}</h3>
                    <p className="text-emerald-400 text-sm">{member.title}</p>
                  </div>
                  <span className="bg-gray-800 text-gray-400 text-xs px-2.5 py-1 rounded-full">{member.reviews} apps reviewed</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">{member.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {member.expertise.map((e) => (
                    <span key={e} className="text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full">{e}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust signals */}
      <section className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6 text-center">
        <h2 className="text-lg font-bold text-white mb-4">Our Commitment to You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-400">
          <div><p className="text-2xl mb-2">🚫</p><p><strong className="text-gray-200">No Paid Reviews.</strong> We never accept payment to list or positively review an app.</p></div>
          <div><p className="text-2xl mb-2">🔄</p><p><strong className="text-gray-200">Monthly Updates.</strong> Every review is revisited and updated at least once per month.</p></div>
          <div><p className="text-2xl mb-2">📧</p><p><strong className="text-gray-200">Accountable.</strong> Contact us at contact@gameapkdownloads.pk with any concerns.</p></div>
        </div>
      </section>
    </div>
  );
}
