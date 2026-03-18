import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const ServicesSection = () => {
  const { t, lang } = useI18n();

  // Hide section for Russian and Kyrgyz
  if (lang === 'ru' || lang === 'ky') return null;

  const { data: internCount = 0 } = useQuery({
    queryKey: ['intern-count'],
    queryFn: async () => {
      const { count } = await supabase
        .from('applications')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'approved');
      return count ?? 0;
    },
  });

  return (
    <section id="services" className="section-padding">
      <div className="container max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground"
        >
          {t('candidates.title')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 text-base md:text-lg leading-relaxed text-muted-foreground"
        >
          {t('candidates.desc')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary"
        >
          <Users size={18} />
          {t('candidates.count')}: {internCount}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
