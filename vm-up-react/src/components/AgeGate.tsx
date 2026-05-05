import { motion } from 'framer-motion';

interface Props {
  onConfirm: () => void;
}

export function AgeGate({ onConfirm }: Props) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: '#111111' }}
    >
      <div className="max-w-sm w-full text-center">
        <img
          src="/brand-assets/VM-logo.png"
          alt="VM Peptides"
          className="h-10 mx-auto mb-8 opacity-90"
        />
        <h1 className="text-2xl font-semibold mb-2" style={{ color: '#f2f1ef', letterSpacing: '-0.03em' }}>
          Age Verification
        </h1>
        <p className="text-sm mb-8" style={{ color: '#888888', lineHeight: 1.7 }}>
          VM Peptides products are intended for licensed researchers and adults 18+.
          By entering you confirm you meet these requirements.
        </p>
        <button
          onClick={onConfirm}
          className="w-full py-3 text-sm font-semibold rounded focus:outline-none focus-visible:ring-2 active:scale-95"
          style={{
            background: '#c47830',
            color: 'white',
            transition: 'opacity 0.15s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          I am 18+ and a licensed researcher
        </button>
        <p className="mt-4 text-xs" style={{ color: '#555555' }}>
          For laboratory and research use only. Not for human consumption.
        </p>
      </div>
    </motion.div>
  );
}
