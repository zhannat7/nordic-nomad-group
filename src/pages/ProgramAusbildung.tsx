import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useI18n } from '@/lib/i18n';

const ProgramAusbildung = () => {
  const { t } = useI18n();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container py-16">
        <h1 className="text-4xl font-bold text-foreground mb-6">{t('program.ausbildung.title')}</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">{t('program.ausbildung.desc')}</p>
      </main>
      <Footer />
    </div>
  );
};

export default ProgramAusbildung;
