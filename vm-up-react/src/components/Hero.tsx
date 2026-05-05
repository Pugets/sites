import { motion } from 'framer-motion';

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`;

export function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: '#111111',
        backgroundImage: NOISE_SVG,
        backgroundSize: '256px 256px',
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 70% 50%, rgba(196,120,48,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: '#c47830' }}
          >
            Research Grade · Third-Party Tested
          </p>
          <h1
            className="text-4xl md:text-5xl font-semibold leading-tight mb-6"
            style={{ color: '#f2f1ef', letterSpacing: '-0.03em' }}
          >
            Precision Peptides
            <br />
            for Advanced Research
          </h1>
          <p className="text-sm mb-8" style={{ color: '#888888', lineHeight: 1.7, maxWidth: 420 }}>
            Every batch independently verified for sequence accuracy and purity.
            Trusted by researchers worldwide.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#products"
              className="px-6 py-3 text-sm font-semibold rounded focus:outline-none focus-visible:ring-2 active:scale-95"
              style={{
                background: '#c47830',
                color: 'white',
                transition: 'opacity 0.15s, transform 0.1s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Shop Peptides
            </a>
            <a
              href="#tools"
              className="px-6 py-3 text-sm font-semibold rounded focus:outline-none focus-visible:ring-2 active:scale-95"
              style={{
                border: '1px solid #2a2a2a',
                color: '#f2f1ef',
                transition: 'border-color 0.15s, transform 0.1s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#555555')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#2a2a2a')}
            >
              Research Tools
            </a>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 gap-px"
          style={{ border: '1px solid #2a2a2a', borderRadius: 8 }}
        >
          {[
            { value: '99%+', label: 'Purity Standard' },
            { value: '48h', label: 'Avg. Fulfillment' },
            { value: 'CoA', label: 'Per Batch' },
            { value: 'SSL', label: 'Encrypted Orders' },
          ].map((s, i) => (
            <div
              key={i}
              className="p-6"
              style={{
                background: i % 2 === 0 ? '#161616' : '#131313',
                borderRadius: i === 0 ? '8px 0 0 0' : i === 1 ? '0 8px 0 0' : i === 2 ? '0 0 0 8px' : '0 0 8px 0',
              }}
            >
              <p
                className="text-2xl font-semibold mb-1"
                style={{ color: '#c47830', letterSpacing: '-0.03em' }}
              >
                {s.value}
              </p>
              <p className="text-xs" style={{ color: '#555555' }}>{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
