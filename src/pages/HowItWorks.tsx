import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
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
              <ol className="flex flex-col gap-0">
                {applicantSteps.map((step, i) => (
                  <motion.li
                    key={step.key}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="flex items-stretch gap-3"
                  >
                    <div className="flex flex-col items-center">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <step.icon size={16} />
                      </span>
                      {i < applicantSteps.length - 1 && (
                        <div className="w-px flex-1 bg-border my-1" />
                      )}
                    </div>
                    <div className="flex items-start flex-1 pb-4">
                      <span className="text-sm text-foreground leading-snug pt-1.5">{t(step.key)}</span>
                    </div>
                  </motion.li>
                ))}
              </ol>
              <div className="mt-auto pt-5">
                <Link
                  to="/register"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  {t('hiw.a.cta')}
                </Link>
              </div>
            </div>

            {/* Companies */}
            <div className="card-base flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Building2 size={20} />
                </div>
                <h2 className="text-xl font-display text-foreground">{t('hiw.c.title')}</h2>
              </div>
              <ol className="flex flex-col gap-0">
                {companySteps.map((step, i) => (
                  <motion.li
                    key={step.key}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="flex items-stretch gap-3"
                  >
                    <div className="flex flex-col items-center">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                        <step.icon size={16} />
                      </span>
                      {i < companySteps.length - 1 && (
                        <div className="w-px flex-1 bg-border my-1" />
                      )}
                    </div>
                    <div className="flex items-start flex-1 pb-4">
                      <span className="text-sm text-foreground leading-snug pt-1.5">{t(step.key)}</span>
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
