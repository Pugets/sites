import { motion } from 'framer-motion';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';

export function ProductsGrid() {
  return (
    <section id="products" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#c47830' }}>
            Catalog
          </p>
          <h2 className="text-3xl font-semibold" style={{ color: '#111111', letterSpacing: '-0.03em' }}>
            Research Peptides
          </h2>
        </div>

        {/* Collapsed-border grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{
            borderTop: '1px solid #dddbd7',
            borderLeft: '1px solid #dddbd7',
          }}
        >
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.07 }}
              style={{
                borderRight: '1px solid #dddbd7',
                borderBottom: '1px solid #dddbd7',
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-xs text-center" style={{ color: '#888888' }}>
          All products are for research purposes only. Not for human consumption.
        </p>
      </div>
    </section>
  );
}
