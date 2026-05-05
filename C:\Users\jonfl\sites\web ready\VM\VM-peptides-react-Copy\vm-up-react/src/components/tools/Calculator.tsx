import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface State {
  peptideMg: string;
  waterMl: string;
  doseMcg: string;
}

interface Results {
  concentration: number | null;
  volumeMl: number | null;
  syringeUnits: number | null;
}

function calculate(state: State): Results {
  const mg = parseFloat(state.peptideMg);
  const ml = parseFloat(state.waterMl);
  const dose = parseFloat(state.doseMcg);

  if (!mg || !ml || mg <= 0 || ml <= 0) {
    return { concentration: null, volumeMl: null, syringeUnits: null };
  }

  const concentration = (mg * 1000) / ml; // mcg/mL
  const volumeMl = dose > 0 ? dose / concentration : null;
  const syringeUnits = volumeMl !== null ? volumeMl * 100 : null;

  return { concentration, volumeMl, syringeUnits };
}

function ResultValue({ value, unit, label, highlight = false }: {
  value: number | null;
  unit: string;
  label: string;
  highlight?: boolean;
}) {
  const display = value !== null ? value.toFixed(value < 1 ? 3 : 1) : '—';

  return (
    <div
      className="p-4 rounded"
      style={{
        background: highlight ? 'rgba(196,120,48,0.07)' : 'rgba(255,255,255,0.5)',
        borderLeft: highlight ? '3px solid #c47830' : '3px solid transparent',
      }}
    >
      <p className="text-xs font-medium uppercase tracking-widest mb-1" style={{ color: '#888888' }}>
        {label}
      </p>
      <AnimatePresence mode="wait">
        <motion.p
          key={display}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.18 }}
          className="text-2xl font-semibold"
          style={{ color: highlight ? '#c47830' : '#111111', letterSpacing: '-0.02em' }}
        >
          {display}
          {value !== null && (
            <span className="text-sm font-normal ml-1" style={{ color: '#888888' }}>
              {unit}
            </span>
          )}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

export function Calculator() {
  const [state, setState] = useState<State>({ peptideMg: '', waterMl: '', doseMcg: '' });
  const results = calculate(state);

  const set = (field: keyof State) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setState((s) => ({ ...s, [field]: e.target.value }));

  const inputClass =
    'w-full px-3 py-2.5 text-sm border rounded focus:outline-none focus:ring-1 bg-white';
  const inputStyle = {
    borderColor: '#dddbd7',
    color: '#111111',
    fontFamily: 'Inter, sans-serif',
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Inputs */}
      <div className="space-y-5">
        <h3 className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#888888' }}>
          Reconstitution Parameters
        </h3>

        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: '#555555' }}>
            Peptide Amount (mg)
          </label>
          <input
            type="number"
            min="0"
            step="0.1"
            placeholder="e.g. 5"
            value={state.peptideMg}
            onChange={set('peptideMg')}
            className={inputClass}
            style={{ ...inputStyle, '--tw-ring-color': '#c47830' } as React.CSSProperties}
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: '#555555' }}>
            Bacteriostatic Water (mL)
          </label>
          <input
            type="number"
            min="0"
            step="0.1"
            placeholder="e.g. 2"
            value={state.waterMl}
            onChange={set('waterMl')}
            className={inputClass}
            style={inputStyle}
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: '#555555' }}>
            Desired Dose (mcg)
          </label>
          <input
            type="number"
            min="0"
            step="1"
            placeholder="e.g. 250"
            value={state.doseMcg}
            onChange={set('doseMcg')}
            className={inputClass}
            style={inputStyle}
          />
        </div>

        <p className="text-xs leading-relaxed" style={{ color: '#888888' }}>
          Syringe units assume a U-100 insulin syringe (100 units = 1 mL). For research use only.
        </p>
      </div>

      {/* Results */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#888888' }}>
          Calculated Values
        </h3>

        <ResultValue
          value={results.concentration}
          unit="mcg/mL"
          label="Solution Concentration"
        />
        <ResultValue
          value={results.volumeMl}
          unit="mL"
          label="Injection Volume"
        />
        <ResultValue
          value={results.syringeUnits}
          unit="units"
          label="Syringe Units (U-100)"
          highlight
        />

        <AnimatePresence>
          {results.concentration !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div
                className="mt-2 p-3 rounded text-xs leading-relaxed"
                style={{ background: '#f2f1ef', color: '#555555' }}
              >
                Reconstitute {state.peptideMg} mg in {state.waterMl} mL BAC water.
                {results.syringeUnits !== null && (
                  <> Draw to <strong style={{ color: '#111111' }}>{results.syringeUnits.toFixed(1)} units</strong> on a U-100 syringe per {state.doseMcg} mcg dose.</>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
