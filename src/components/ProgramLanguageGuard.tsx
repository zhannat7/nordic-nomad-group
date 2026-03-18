import { useI18n } from '@/lib/i18n';
import { Navigate } from 'react-router-dom';

const ProgramLanguageGuard = ({ children }: { children: React.ReactNode }) => {
  const { lang } = useI18n();

  if (lang !== 'ru' && lang !== 'ky') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProgramLanguageGuard;
