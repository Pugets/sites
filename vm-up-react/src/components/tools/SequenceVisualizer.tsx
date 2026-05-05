import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AMINO_ACIDS, TYPE_STYLES, PRESETS, calcMW, netCharge, calcPI } from '../../data/aminoAcids';
import type { AminoAcid } from '../../types';

const MAX_BEADS = 60;

interface Tooltip {
  aa: AminoAcid;
  x: number;
  y: number;
}

function CompositionBar({ sequence }: { sequence: string }) {
  const counts: Record<string, number> = { nonpolar: 0, polar: 0, positive: 0, negative: 0 };
  for (const r of sequence.toUpperCase()) {
    const aa = AMINO_ACIDS[r];
    if (aa) counts[aa.type]++;
  }
  const total = sequence.length || 1;
  const types = ['nonpolar', 'polar', 'positive', 'negative'] as const;

  return (
    <div>
      <div className="flex rounded overflow-hidden h-2 mb-2" style={{ background: '#e9e8e5' }}>
        {types.map((t) => (
          <motion.div
            key={t}
            animate={{ width: `${(counts[t] / total) * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ background: TYPE_STYLES[t].bg }}
          />
        ))}
      </div>
      <div className="flex gap-4 text-xs" style={{ color: '#888888' }}>
        {types.map((t) => (
          <span key={t} className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full" style={{ background: TYPE_STYLES[t].bg }} />
            {TYPE_STYLES[t].label} ({counts[t]})
          </span>
        ))}
      </div>
    </div>
  );
}

export function SequenceVisualizer() {
  const [input, setInput] = useState('');
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const sequence = input.toUpperCase().replace(/[^ACDEFGHIKLMNPQRSTVWY]/g, '');
  const displayBeads = sequence.slice(0, MAX_BEADS);
  const overflow = sequence.length - MAX_BEADS;

  const mw = sequence.length > 0 ? calcMW(sequence) : null;
  const charge = sequence.length > 0 ? netCharge(sequence, 7.4) : null;
  const pi = sequence.length > 0 ? calcPI(sequence) : null;

  const handleMouseEnter = (aa: AminoAcid, e: React.MouseEvent) => {
    setTooltip({ aa, x: e.clientX, y: e.clientY });
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (tooltip) setTooltip((t) => t && { ...t, x: e.clientX, y: e.clientY });
  };
  const handleMouseLeave = () => setTooltip(null);

  return (
    <div className="space-y-6">
      {/* Presets */}
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.name}
            onClick={() => setInput(p.sequence)}
            className="px-3 py-1 text-xs rounded border transition-colors duration-150"
            style={{
              borderColor: input === p.sequence ? '#c47830' : '#dddbd7',
              color: input === p.sequence ? '#c47830' : '#555555',
              background: input === p.sequence ? 'rgba(196,120,48,0.07)' : 'white',
            }}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Input */}
      <div>
        <label className="block text-xs font-medium mb-1.5" style={{ color: '#555555' }}>
          One-letter sequence (ACDEFGHIKLMNPQRSTVWY)
        </label>
        <input
          type="text"
          placeholder="e.g. GEPTGPASKVFDKPDL"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full px-3 py-2.5 text-sm border rounded focus:outline-none bg-white font-mono"
          style={{ borderColor: '#dddbd7', color: '#111111' }}
        />
      </div>

      {/* Bead chain */}
      <AnimatePresence mode="wait">
        {sequence.length > 0 && (
          <motion.div
            key={sequence}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              ref={containerRef}
              className="flex flex-wrap gap-1.5 p-4 rounded"
              style={{ background: '#f2f1ef', minHeight: 64 }}
              onMouseMove={handleMouseMove}
            >
              {Array.from(displayBeads).map((letter, i) => {
                const aa = AMINO_ACIDS[letter];
                if (!aa) return null;
                return (
                  <motion.button
                    key={`${letter}-${i}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 20,
                      delay: Math.min(i * 0.025, 1),
                    }}
                    onMouseEnter={(e) => handleMouseEnter(aa, e)}
                    onMouseLeave={handleMouseLeave}
                    className="w-8 h-8 rounded-full text-white text-xs font-semibold flex items-center justify-center cursor-default focus:outline-none"
                    style={{ background: TYPE_STYLES[aa.type].bg }}
                    tabIndex={-1}
                  >
                    {letter}
                  </motion.button>
                );
              })}
              {overflow > 0 && (
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium"
                  style={{ background: '#dddbd7', color: '#555555' }}
                >
                  +{overflow}
                </div>
              )}
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mt-4 grid grid-cols-3 gap-3"
            >
              {[
                { label: 'Length', value: sequence.length.toString(), unit: 'aa' },
                { label: 'Mol. Weight', value: mw ? mw.toFixed(1) : '—', unit: 'Da' },
                { label: 'Net Charge pH 7.4', value: charge !== null ? charge.toFixed(2) : '—', unit: '' },
                { label: 'Isoelectric Point', value: pi !== null ? pi.toFixed(2) : '—', unit: 'pH' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="p-3 rounded"
                  style={{ background: 'rgba(255,255,255,0.6)' }}
                >
                  <p className="text-xs mb-1" style={{ color: '#888888' }}>{s.label}</p>
                  <p className="text-lg font-semibold" style={{ color: '#111111', letterSpacing: '-0.02em' }}>
                    {s.value}
                    {s.unit && (
                      <span className="text-xs font-normal ml-1" style={{ color: '#888888' }}>
                        {s.unit}
                      </span>
                    )}
                  </p>
                </div>
              ))}

              {/* Composition bar spans full width */}
              <div className="col-span-3 p-3 rounded" style={{ background: 'rgba(255,255,255,0.6)' }}>
                <p className="text-xs mb-2" style={{ color: '#888888' }}>Composition</p>
                <CompositionBar sequence={sequence} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tooltip portal */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.1 }}
            className="fixed z-50 pointer-events-none text-xs rounded shadow-lg px-3 py-2"
            style={{
              left: tooltip.x + 12,
              top: tooltip.y - 48,
              background: '#111111',
              color: '#f2f1ef',
              minWidth: 140,
              boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
            }}
          >
            <p className="font-semibold">{tooltip.aa.name}</p>
            <p style={{ color: '#888888' }}>{tooltip.aa.shortName} · MW {tooltip.aa.mw} Da</p>
            <p style={{ color: TYPE_STYLES[tooltip.aa.type].bg }}>
              {TYPE_STYLES[tooltip.aa.type].label}
            </p>
            {tooltip.aa.pKaSideChain !== undefined && (
              <p style={{ color: '#888888' }}>pKa {tooltip.aa.pKaSideChain}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
