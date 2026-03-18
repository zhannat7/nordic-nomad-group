import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import { Heart, Target, ShieldCheck, Scale, X } from 'lucide-react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

GlobalWorkerOptions.workerSrc = pdfWorker;

const cards = [
  { icon: Heart, key: 'about.card1' },
  { icon: Target, key: 'about.card2' },
  { icon: ShieldCheck, key: 'about.card3' },
  { icon: Scale, key: 'about.card4' },
];

const AboutSection = () => {
  const { t, isCyrillic } = useI18n();
  const cx = isCyrillic ? 'cyrillic-text' : '';
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const pdfContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!pdfUrl || !pdfContainerRef.current) return;
    let cancelled = false;
    const container = pdfContainerRef.current;
    container.innerHTML = '';

    const renderPdf = async () => {
      setPdfError(null);
      setIsPdfLoading(true);
      try {
        const loadingTask = getDocument({ url: pdfUrl });
        const pdf = await loadingTask.promise;
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum += 1) {
          if (cancelled) return;
          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale: 1.35 });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          if (!context) continue;
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.className = 'mx-auto w-full max-w-4xl rounded-lg border border-border bg-card';
          container.appendChild(canvas);
          await page.render({ canvas, canvasContext: context, viewport }).promise;
        }
      } catch {
        if (!cancelled) setPdfError('PDF konnte in diesem Browser nicht angezeigt werden.');
      } finally {
        if (!cancelled) setIsPdfLoading(false);
      }
    };
    renderPdf();
    return () => { cancelled = true; container.innerHTML = ''; };
  }, [pdfUrl]);

  const handleView = async () => {
    try {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
      const res = await fetch('/documents/registration-certificate.pdf');
      if (!res.ok) { setPdfError('PDF konnte nicht geladen werden.'); return; }
      const blob = await res.blob();
      setPdfUrl(URL.createObjectURL(blob));
    } catch {
      setPdfUrl(null);
      setPdfError('PDF konnte nicht geladen werden.');
    }
  };

  const handleCloseModal = () => {
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    setPdfUrl(null);
    setPdfError(null);
    setIsPdfLoading(false);
  };

  return (
    <section id="about" className="section-padding section-alt">
      <div className="container max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="section-label">🏢 {t('about.title')}</span>
          <h2 className={`section-title ${cx}`}>{t('about.title')}</h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`section-desc mx-auto text-center ${cx}`}
        >
          {t('about.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-14 text-center"
        >
          <h3 className={`font-display text-xl text-foreground md:text-2xl ${cx}`}>
            {t('about.mission_title')}
          </h3>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`mx-auto mt-4 max-w-3xl text-center text-sm text-muted-foreground leading-relaxed md:text-base ${cx}`}
        >
          {t('about.mission')}
        </motion.p>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {cards.map(({ icon: Icon, key }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.08 * i }}
              className="card-base"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/8 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h4 className={`text-base font-semibold text-foreground ${cx}`}>{t(`${key}.title`)}</h4>
              <p className={`mt-2 text-sm text-muted-foreground leading-relaxed ${cx}`}>{t(`${key}.desc`)}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mt-14 max-w-xl rounded-xl border border-primary/15 bg-primary/5 p-6"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏛️</span>
            <p className={`text-sm font-medium text-foreground ${cx}`}>
              {t('about.cert_registered')}
            </p>
          </div>
          <div className="mt-5 flex gap-3">
            <button
              type="button"
              onClick={handleView}
              className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
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
              className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              {t('about.cert_download')}
            </button>
          </div>
        </motion.div>
      </div>

      {pdfUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm p-4" onClick={handleCloseModal}>
          <div
            className="relative w-full max-w-5xl rounded-xl border border-border bg-card shadow-2xl"
            style={{ height: '85vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleCloseModal}
              className="absolute -right-3 -top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-md hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="h-full w-full overflow-auto rounded-xl bg-muted/20 p-4">
              {isPdfLoading && <p className="pb-3 text-sm text-muted-foreground">PDF wird geladen…</p>}
              {pdfError && <p className="pb-3 text-sm text-destructive">{pdfError}</p>}
              <div ref={pdfContainerRef} className="flex flex-col gap-3" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutSection;
