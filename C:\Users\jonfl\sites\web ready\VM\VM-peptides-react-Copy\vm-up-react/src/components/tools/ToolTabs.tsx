import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator } from './Calculator';
import { SequenceVisualizer } from './SequenceVisualizer';

const TABS = [
  { id: 'recon', label: 'Reconstitution Calculator' },
  { id: 'seq',   label: 'Sequence Analyzer' },
] as const;

type TabId = typeof TABS[number]['id'];

export function ToolTabs() {
  const [active, setActive] = useState<TabId>('recon');

  return (
    <section className="py-20 px-6" style={{ background: '#f2f1ef' }}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#c47830' }}>
            Research Tools
          </p>
          <h2 className="text-3xl font-semibold" style={{ color: '#111111', letterSpacing: '-0.03em' }}>
            Peptide Research Calculator
          </h2>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: '#555555' }}>
            For laboratory use only. Not medical advice.
          </p>
        </div>

        {/* Tab strip */}
        <div className="flex border-b mb-8" style={{ borderColor: '#dddbd7' }}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className="relative px-5 py-3 text-sm font-medium focus:outline-none"
              style={{ color: active === tab.id ? '#111111' : '#888888' }}
            >
              {tab.label}
              {active === tab.id && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: '#c47830' }}
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab panels */}
        <div
          className="p-8 rounded-lg"
          style={{
            background: 'white',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              {active === 'recon' ? <Calculator /> : <SequenceVisualizer />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
