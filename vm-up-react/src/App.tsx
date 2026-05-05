import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AgeGate } from './components/AgeGate';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { ProductsGrid } from './components/ProductsGrid';
import { ToolTabs } from './components/tools/ToolTabs';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';

function App() {
  const [verified, setVerified] = useState(
    () => sessionStorage.getItem('ageVerified') === 'true'
  );

  const handleVerify = () => {
    sessionStorage.setItem('ageVerified', 'true');
    setVerified(true);
  };

  return (
    <>
      <AnimatePresence>
        {!verified && <AgeGate onConfirm={handleVerify} />}
      </AnimatePresence>

      {verified && (
        <>
          <DisclaimerBanner />
          <Navbar />
          <main>
            <Hero />
            <TrustBar />
            <ProductsGrid />
            <div id="tools">
              <ToolTabs />
            </div>
          </main>
          <Footer />
          <CartDrawer />
        </>
      )}
    </>
  );
}

export default App;
