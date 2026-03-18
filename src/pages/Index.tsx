import Header from '@/components/Header';
import CurrencyTicker from '@/components/CurrencyTicker';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import WhySection from '@/components/WhySection';
import TestimonialsSection from '@/components/TestimonialsSection';
import MapSection from '@/components/MapSection';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CurrencyTicker />
      <HeroSection />
      <AboutSection />
      <WhySection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
