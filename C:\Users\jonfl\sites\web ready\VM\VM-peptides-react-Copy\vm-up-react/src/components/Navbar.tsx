import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/cartStore';

const NAV_LINKS = ['Products', 'Research', 'About', 'FAQ'];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, toggleCart } = useCartStore();
  const cartCount = count();

  return (
    <header
      className="sticky top-0 z-40"
      style={{
        background: '#111111',
        borderBottom: '1px solid #2a2a2a',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-3 focus:outline-none focus-visible:ring-1"
          style={{ focusRingColor: '#c47830' } as React.CSSProperties}
        >
          <div
            className="w-8 h-8 flex items-center justify-center rounded"
            style={{ border: '1px solid #c47830' }}
          >
            <img src="/brand-assets/VM-logo.png" alt="VM" className="w-5 h-5 object-contain" />
          </div>
          <span className="text-sm font-semibold tracking-wide" style={{ color: '#f2f1ef' }}>
            VM Peptides
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="text-xs font-medium uppercase tracking-widest transition-colors duration-150 focus:outline-none focus-visible:underline"
              style={{ color: '#888888' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#f2f1ef')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#888888')}
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Cart button */}
          <button
            onClick={toggleCart}
            className="relative flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium focus:outline-none focus-visible:ring-1 active:scale-95"
            style={{
              border: '1px solid #c47830',
              color: '#c47830',
              transition: 'background 0.15s, transform 0.1s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(196,120,48,0.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            Cart
            {cartCount > 0 && (
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: '#c47830', color: 'white', fontSize: 10 }}
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1 p-2 focus:outline-none"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block w-5 h-px"
                style={{
                  background: '#f2f1ef',
                  transition: 'transform 0.2s, opacity 0.2s',
                  transform:
                    menuOpen && i === 0 ? 'rotate(45deg) translate(3px, 3px)' :
                    menuOpen && i === 1 ? 'scaleX(0)' :
                    menuOpen && i === 2 ? 'rotate(-45deg) translate(3px, -3px)' :
                    'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden"
            style={{ borderTop: '1px solid #2a2a2a' }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="block px-6 py-3 text-sm font-medium focus:outline-none"
                style={{ color: '#888888', borderBottom: '1px solid #2a2a2a' }}
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
