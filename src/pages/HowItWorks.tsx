import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';
import {
  UserCheck, Building2, ArrowRight,
  FileText, Search, Video, Handshake, Stamp, Plane, Rocket,
  Send, Users, ClipboardCheck, FolderCheck, Briefcase, HeadsetIcon,
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

const HowItWorks = () => {
  const { t, isCyrillic } = useI18n();

  const applicantSteps: { key: string; icon: LucideIcon }[] = [
    { key: 'hiw.a.step1', icon: FileText },
    { key: 'hiw.a.step2', icon: Search },
    { key: 'hiw.a.step3', icon: Video },
    { key: 'hiw.a.step4', icon: Handshake },
    { key: 'hiw.a.step5', icon: Stamp },
    { key: 'hiw.a.step6', icon: Plane },
    { key: 'hiw.a.step7', icon: Rocket },
  ];

  const companySteps: { key: string; icon: LucideIcon }[] = [
    { key: 'hiw.c.step1', icon: Send },
    { key: 'hiw.c.step2', icon: Users },
    { key: 'hiw.c.step3', icon: ClipboardCheck },
    { key: 'hiw.c.step4', icon: FolderCheck },
    { key: 'hiw.c.step5', icon: Briefcase },
    { key: 'hiw.c.step6', icon: HeadsetIcon },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.4 },
    }),
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className={`section-padding ${isCyrillic ? 'cyrillic-text' : ''}`}>
        <div className="container">
          {/* Title */}
          <div className="text-center mb-10">
            <span className="section-label">{t('hiw.label')}</span>
            <h1 className="section-title">{t('hiw.title')}</h1>
            <p className="section-desc mx-auto">{t('hiw.desc')}</p>
          </div>

          {/* Two columns */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Applicants */}
            <div className="card-base flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <UserCheck size={20} />
                </div>
                <h2 className="text-xl font-display text-foreground">{t('hiw.a.title')}</h2>
              </div>
              <ol className="flex flex-col gap-3">
                {applicantSteps.map((step, i) => (
                  <motion.li
                    key={step.key}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="flex items-start gap-3"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold mt-0.5">
                      {i + 1}
                    </span>
                    <div className="flex items-center gap-2 flex-1 min-h-[28px]">
                      <span className="text-sm text-foreground leading-snug">{t(step.key)}</span>
                      {i < applicantSteps.length - 1 && (
                        <ArrowRight size={14} className="shrink-0 text-muted-foreground/40 hidden sm:block" />
                      )}
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>

            {/* Companies */}
            <div className="card-base flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Building2 size={20} />
                </div>
                <h2 className="text-xl font-display text-foreground">{t('hiw.c.title')}</h2>
              </div>
              <ol className="flex flex-col gap-3">
                {companySteps.map((step, i) => (
                  <motion.li
                    key={step.key}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="flex items-start gap-3"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-bold mt-0.5">
                      {i + 1}
                    </span>
                    <div className="flex items-center gap-2 flex-1 min-h-[28px]">
                      <span className="text-sm text-foreground leading-snug">{t(step.key)}</span>
                      {i < companySteps.length - 1 && (
                        <ArrowRight size={14} className="shrink-0 text-muted-foreground/40 hidden sm:block" />
                      )}
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HowItWorks;
