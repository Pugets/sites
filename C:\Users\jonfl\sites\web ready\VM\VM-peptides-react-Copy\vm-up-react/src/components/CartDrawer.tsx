import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/cartStore';

export function CartDrawer() {
  const { items, isOpen, toggleCart, updateQuantity, removeItem, total } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(0,0,0,0.5)' }}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            className="fixed right-0 top-0 h-full z-50 flex flex-col w-80 max-w-full"
            style={{ background: 'white', boxShadow: '-4px 0 30px rgba(0,0,0,0.12)' }}
          >
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: '1px solid #dddbd7' }}
            >
              <h2 className="text-sm font-semibold" style={{ color: '#111111' }}>Cart</h2>
              <button
                onClick={toggleCart}
                className="text-xl leading-none focus:outline-none"
                style={{ color: '#888888' }}
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-6">
                  <p className="text-sm" style={{ color: '#888888' }}>Your cart is empty.</p>
                </div>
              ) : (
                <ul className="divide-y" style={{ borderColor: '#dddbd7' }}>
                  {items.map((item) => (
                    <li key={item.id} className="px-5 py-4 flex gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate" style={{ color: '#111111' }}>
                          {item.name}
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: '#888888' }}>
                          ${item.price.toFixed(2)} ea
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-sm rounded focus:outline-none"
                          style={{ border: '1px solid #dddbd7', color: '#555555' }}
                        >
                          −
                        </button>
                        <span className="text-sm w-4 text-center" style={{ color: '#111111' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-sm rounded focus:outline-none"
                          style={{ border: '1px solid #dddbd7', color: '#555555' }}
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-1 text-xs focus:outline-none"
                          style={{ color: '#888888' }}
                        >
                          ×
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div
                className="px-5 py-4"
                style={{ borderTop: '1px solid #dddbd7' }}
              >
                <div className="flex justify-between text-sm font-semibold mb-4" style={{ color: '#111111' }}>
                  <span>Total</span>
                  <span>${total().toFixed(2)}</span>
                </div>
                <button
                  className="w-full py-3 text-sm font-semibold rounded focus:outline-none active:scale-95"
                  style={{
                    background: '#111111',
                    color: 'white',
                    transition: 'opacity 0.15s, transform 0.1s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  Checkout
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
