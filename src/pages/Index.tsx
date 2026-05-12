import { useI18n } from "@/lib/i18n";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WhySection from "@/components/WhySection";
import FounderSection from "@/components/FounderSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import ServicesSection from "@/components/ServicesSection";
import StatusBar from "@/components/StatusBar";
import CurrencyTicker from "@/components/CurrencyTicker";

const Index = () => {
  const { lang } = useI18n();
  const isStudent = lang === "ru" || lang === "ky";
  const isFarm = lang === "da" || lang === "en";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Farm view: DA / EN */}
      {isFarm && (
        <>
          <CurrencyTicker />
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <WhySection />
          <FounderSection />
          <ContactSection />
          <Footer />
        </>
      )}

      {/* Student view: RU / KY */}
      {isStudent && (
        <>
          <StatusBar />
          <HeroSection />
          <AboutSection />
          <FounderSection />
          <ContactSection />
          <Footer />
          <ChatBot />
        </>
      )}
    </div>
  );
};

export default Index;
