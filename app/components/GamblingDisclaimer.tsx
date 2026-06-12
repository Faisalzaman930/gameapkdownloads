export default function GamblingDisclaimer() {
  return (
    <div className="bg-yellow-950/40 border border-yellow-600/30 rounded-xl px-4 py-3 text-xs text-yellow-200/80 leading-relaxed flex gap-2 items-start">
      <span className="text-yellow-500 flex-shrink-0 mt-0.5">⚠️</span>
      <p>
        <strong className="text-yellow-200">Responsible Gaming Notice:</strong>{" "}
        This site lists entertainment and skill-based apps. Some apps involve real money. Please play
        responsibly. Online gambling laws vary by region — ensure compliance with local regulations
        before downloading.{" "}
        <strong className="text-yellow-200">Users must be 18+.</strong>
      </p>
    </div>
  );
}
