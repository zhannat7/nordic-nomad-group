import { useI18n } from '@/lib/i18n';

const StatusBar = () => {
  const { t } = useI18n();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-sm">
      <div className="container flex h-10 items-center justify-center gap-6 text-xs">
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          {t('status.online')}
        </span>
        <span className="text-muted-foreground">•</span>
        <span className="text-muted-foreground">{t('status.response')}</span>
      </div>
    </div>
  );
};

export default StatusBar;
