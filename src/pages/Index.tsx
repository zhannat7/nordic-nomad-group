import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import AboutSection from '@/components/AboutSection';
import WhySection from '@/components/WhySection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import StatusBar from '@/components/StatusBar';
import { I18nProvider } from '@/lib/i18n';

const Index = () => {
  return (
    <I18nProvider>
      <div className="min-h-screen">
        <Header />
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <WhySection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
        <StatusBar />
      </div>
    </I18nProvider>
  );
};

export default Index;
