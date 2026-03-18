import Header from '@/components/Header';
import CurrencyTicker from '@/components/CurrencyTicker';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import WhySection from '@/components/WhySection';
import FounderSection from '@/components/FounderSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CurrencyTicker />
      <HeroSection />
      <AboutSection />
      <FounderSection />
      <WhySection />
      <ContactSection />
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
