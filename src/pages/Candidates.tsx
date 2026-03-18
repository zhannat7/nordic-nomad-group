import Header from '@/components/Header';
import CurrencyTicker from '@/components/CurrencyTicker';
import ServicesSection from '@/components/ServicesSection';
import Footer from '@/components/Footer';

const Candidates = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CurrencyTicker />
      <ServicesSection />
      <Footer />
    </div>
  );
};

export default Candidates;
