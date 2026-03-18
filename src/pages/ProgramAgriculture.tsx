import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';

const ProgramAgriculture = () => {
  const { t } = useI18n();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
        className="flex-1 container py-16"
      >
        <h1 className="text-4xl font-bold text-foreground mb-6">{t('program.agriculture.title')}</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">{t('program.agriculture.desc')}</p>
      </motion.main>
      <Footer />
    </div>
  );
};

export default ProgramAgriculture;
