import Header from '@/components/Header';
import CurrencyTicker from '@/components/CurrencyTicker';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import AboutSection from '@/components/AboutSection';
import WhySection from '@/components/WhySection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import StatusBar from '@/components/StatusBar';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CurrencyTicker />
      <ServicesSection />
      <AboutSection />
      <WhySection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <StatusBar />
    </div>
  );
};

export default Index;
