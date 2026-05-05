import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCartStore } from '../store/cartStore';
import type { Product } from '../types';

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="flex flex-col" style={{ padding: '0' }}>
      {/* Image area */}
      <div
        className="relative overflow-hidden"
        style={{ background: '#111111', aspectRatio: '4/3' }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center text-xs font-mono uppercase tracking-widest"
          style={{ color: '#2a2a2a' }}
        >
          {product.name}
        </div>
        {product.badge && (
          <span
            className="absolute top-3 right-3 px-2 py-0.5 text-xs font-semibold rounded"
            style={{ background: '#c47830', color: 'white' }}
          >
            {product.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <p className="text-xs mb-1" style={{ color: '#888888' }}>{product.category}</p>
        <h3
          className="text-base font-semibold mb-2"
          style={{ color: '#111111', letterSpacing: '-0.02em' }}
        >
          {product.name}
        </h3>
        <p className="text-xs leading-relaxed flex-1 mb-4" style={{ color: '#555555', lineHeight: 1.6 }}>
          {product.description}
        </p>

        <div className="mt-auto">
          <p className="text-lg font-semibold mb-3" style={{ color: '#111111', letterSpacing: '-0.02em' }}>
            ${product.price.toFixed(2)}
          </p>

          <div className="flex items-center gap-2">
            {/* Qty selector */}
            <div
              className="flex items-center rounded"
              style={{ border: '1px solid #dddbd7' }}
            >
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-8 h-8 flex items-center justify-center text-sm focus:outline-none active:scale-90"
                style={{ color: '#555555', transition: 'color 0.1s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#111111')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#555555')}
              >
                −
              </button>
              <span className="w-6 text-center text-sm" style={{ color: '#111111' }}>
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-8 h-8 flex items-center justify-center text-sm focus:outline-none active:scale-90"
                style={{ color: '#555555', transition: 'color 0.1s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#111111')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#555555')}
              >
                +
              </button>
            </div>

            {/* Add to cart */}
            <motion.button
              onClick={handleAdd}
              whileTap={{ scale: 0.97 }}
              className="flex-1 py-2 text-xs font-semibold uppercase tracking-wider rounded focus:outline-none focus-visible:ring-1"
              style={{
                border: '1px solid #111111',
                color: added ? 'white' : '#111111',
                background: added ? '#111111' : 'transparent',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => {
                if (!added) {
                  e.currentTarget.style.background = '#111111';
                  e.currentTarget.style.color = 'white';
                }
              }}
              onMouseLeave={(e) => {
                if (!added) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#111111';
                }
              }}
            >
              {added ? '✓ Added' : 'Add to Cart'}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
