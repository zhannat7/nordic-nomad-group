import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import { Heart, Target, ShieldCheck, Scale } from 'lucide-react';

const cards = [
  { icon: Heart, key: 'about.card1' },
  { icon: Target, key: 'about.card2' },
  { icon: ShieldCheck, key: 'about.card3' },
  { icon: Scale, key: 'about.card4' },
];

const AboutSection = () => {
  const { t, isCyrillic } = useI18n();
  const cx = isCyrillic ? 'cyrillic-text' : '';

  return (
    <section id="about" className="section-padding border-t border-border">
      <div className="container max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`text-center font-display text-3xl font-bold text-foreground md:text-4xl ${cx}`}
        >
          {t('about.title')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-muted-foreground md:text-lg ${cx}`}
        >
          {t('about.subtitle')}
        </motion.p>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`mt-12 text-center font-display text-xl font-semibold text-foreground md:text-2xl ${cx}`}
        >
          {t('about.mission_title')}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground md:text-base ${cx}`}
        >
          {t('about.mission')}
        </motion.p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {cards.map(({ icon: Icon, key }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="rounded-lg border border-border bg-card p-6 shadow-sm"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h4 className={`font-semibold text-foreground ${cx}`}>{t(`${key}.title`)}</h4>
              <p className={`mt-1 text-sm leading-relaxed text-muted-foreground ${cx}`}>{t(`${key}.desc`)}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-12 max-w-xl rounded-lg border-2 border-primary/30 bg-primary/5 p-5"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏛️</span>
            <p className={`text-sm font-medium text-foreground ${cx}`}>
              {t('about.cert_registered')}
            </p>
          </div>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={async () => {
                const res = await fetch('/documents/registration-certificate.pdf');
                const blob = await res.blob();
                const url = URL.createObjectURL(blob);
                window.open(url, '_blank');
              }}
              className="inline-flex items-center justify-center rounded-md border border-primary/30 bg-card px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
            >
              {t('about.cert_view')}
            </button>
            <button
              type="button"
              onClick={async () => {
                const res = await fetch('/documents/registration-certificate.pdf');
                const blob = await res.blob();
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'Nordic-Nomad-Group-Certificate.pdf';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }}
              className="inline-flex items-center justify-center rounded-md border border-primary/30 bg-card px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
            >
              {t('about.cert_download')}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
