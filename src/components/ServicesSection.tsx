import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import InternCard from '@/components/InternCard';

const ServicesSection = () => {
  const { t, lang } = useI18n();
  const [selectedInterns, setSelectedInterns] = useState<Set<string>>(new Set());

  const { data: interns = [] } = useQuery({
    queryKey: ['approved-interns'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('applications')
        .select('id, full_name, date_of_birth, english_level, animals, agriculture_interest, user_id')
        .eq('status', 'approved');
      if (error) throw error;
      return data ?? [];
    },
  });

  // Hide section for Russian and Kyrgyz (after all hooks)
  if (lang === 'ru' || lang === 'ky') return null;

  const toggleIntern = (id: string) => {
    setSelectedInterns((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section id="services" className="section-padding">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12">
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
            {t('candidates.count')}: {interns.length}
          </motion.div>
        </div>

        {interns.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {interns.map((intern) => (
              <InternCard
                key={intern.id}
                intern={intern}
                selected={selectedInterns.has(intern.id)}
                onToggle={toggleIntern}
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
