const BADGES = [
  { icon: '🔬', label: '≥99% Purity' },
  { icon: '📋', label: 'CoA Per Batch' },
  { icon: '🔒', label: 'SSL Encrypted' },
  { icon: '🚚', label: 'Discreet Shipping' },
];

export function TrustBar() {
  return (
    <div
      className="py-4 px-6"
      style={{ background: '#111111', borderBottom: '1px solid #2a2a2a' }}
    >
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6">
        {BADGES.map((b) => (
          <div key={b.label} className="flex items-center gap-2">
            <span className="text-sm">{b.icon}</span>
            <span className="text-xs font-medium" style={{ color: '#888888' }}>
              {b.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
