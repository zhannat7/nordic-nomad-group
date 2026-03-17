import { CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/lib/i18n';
import logo from '@/assets/logo.jpeg';

const RegistrationSuccess = () => {
  const { lang } = useI18n();
  const isKy = lang === 'ky';
  const t = (ru: string, ky: string) => (isKy ? ky : ru);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <a href="/" className="mx-auto mb-4 block">
            <img src={logo} alt="Nordic Nomad Group" className="mx-auto h-14 w-auto" />
          </a>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-xl">
            {t('Регистрация успешна!', 'Каттоо ийгиликтүү!')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            {t(
              'Ваш профиль отправлен на рассмотрение. Войдите в систему с вашим Email и паролем.',
              'Профилиңиз кароого жөнөтүлдү. Email жана сырсөзүңүз менен кириңиз.'
            )}
          </p>
          <Button asChild className="w-full">
            <a href="/login">{t('Войти', 'Кирүү')}</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationSuccess;
