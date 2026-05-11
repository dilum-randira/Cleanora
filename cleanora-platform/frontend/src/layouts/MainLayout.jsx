import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import { Toaster } from '../components/ui/sonner.jsx';

function MainLayout() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      window.requestAnimationFrame(() => {
        document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-cleanora-porcelain text-cleanora-ink">
      <Navbar />
      <main className="overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <Toaster />
    </div>
  );
}

export default MainLayout;
