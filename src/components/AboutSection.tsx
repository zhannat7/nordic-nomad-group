import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import { Heart, Target, ShieldCheck, Scale, X, FileCheck } from 'lucide-react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

GlobalWorkerOptions.workerSrc = pdfWorker;

const cards = [
  { icon: Heart, key: 'about.card1', num: '01' },
  { icon: Target, key: 'about.card2', num: '02' },
  { icon: ShieldCheck, key: 'about.card3', num: '03' },
  { icon: Scale, key: 'about.card4', num: '04' },
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
        if (!cancelled) setPdfError('PDF could not be displayed in this browser.');
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
      if (!res.ok) { setPdfError('PDF could not be loaded.'); return; }
      const blob = await res.blob();
      setPdfUrl(URL.createObjectURL(blob));
    } catch {
      setPdfUrl(null);
      setPdfError('PDF could not be loaded.');
    }
  };

  const handleCloseModal = () => {
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    setPdfUrl(null);
    setPdfError(null);
    setIsPdfLoading(false);
  };

  return (
    <section id="about" className="relative section-padding">
      <div className="container max-w-6xl">
        {/* Editorial intro */}
        <div className="grid gap-12 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-4"
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-foreground/40" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground/70">
                About — 01
              </span>
            </div>
            <h2 className={`mt-6 font-display text-4xl leading-[1.05] text-foreground md:text-5xl ${cx}`}>
              {t('about.title')}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="md:col-span-7 md:col-start-6"
          >
            <p className={`text-lg leading-relaxed text-foreground/80 md:text-xl ${cx}`}>
              {t('about.subtitle')}
            </p>
            <div className="mt-8 border-l-2 border-accent pl-5">
              <p className={`text-[11px] font-semibold uppercase tracking-[0.25em] text-accent`}>
                {t('about.mission_title')}
              </p>
              <p className={`mt-3 text-sm leading-relaxed text-foreground/70 ${cx}`}>
                {t('about.mission')}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Cards — editorial grid */}
        <div className="mt-20 grid gap-px bg-foreground/10 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ icon: Icon, key, num }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.06 * i }}
              className="group relative flex flex-col bg-background p-8 transition-colors hover:bg-secondary"
            >
              <div className="flex items-start justify-between">
                <Icon className="h-6 w-6 text-primary" strokeWidth={1.4} />
                <span className="font-display text-2xl text-foreground/20">{num}</span>
              </div>
              <h4 className={`mt-10 font-display text-xl text-foreground ${cx}`}>
                {t(`${key}.title`)}
              </h4>
              <p className={`mt-3 text-sm leading-relaxed text-foreground/65 ${cx}`}>
                {t(`${key}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Certificate band */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 flex flex-col items-start justify-between gap-6 rounded-sm border border-foreground/10 bg-secondary/60 p-8 md:flex-row md:items-center"
        >
          <div className="flex items-center gap-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background">
              <FileCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground/60">
                Official record
              </p>
              <p className={`mt-1 font-display text-lg text-foreground ${cx}`}>
                {t('about.cert_registered')}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleView}
              className="rounded-full border border-foreground/20 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
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
              className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-primary"
            >
              {t('about.cert_download')}
            </button>
          </div>
        </motion.div>
      </div>

      {pdfUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 backdrop-blur-sm p-4" onClick={handleCloseModal}>
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
              {isPdfLoading && <p className="pb-3 text-sm text-muted-foreground">Loading…</p>}
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
