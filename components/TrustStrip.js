const ITEMS = [
  "Free digital proof",
  "No setup fees",
  "Low minimums",
  "UK business supplier",
  "Fast replies, same working day",
  "Branding included",
];

export default function TrustStrip() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="bg-dark text-white overflow-hidden">
      <div className="flex whitespace-nowrap animate-[marquee_28s_linear_infinite] py-3">
        {row.map((t, i) => (
          <span key={i} className="mx-6 text-sm font-medium tracking-wide flex items-center gap-2">
            <span className="text-accent">✦</span> {t}
          </span>
        ))}
      </div>
    </div>
  );
}
