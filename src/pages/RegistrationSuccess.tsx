import { useState } from 'react';
import { CheckCircle2, Mail, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useI18n } from '@/lib/i18n';
import { supabase } from '@/integrations/supabase/client';
import logo from '@/assets/logo.jpeg';

const RegistrationSuccess = () => {
  const { lang } = useI18n();
  const isKy = lang === 'ky';
  const t = (ru: string, ky: string) => (isKy ? ky : ru);

  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendError, setResendError] = useState('');
  const [email, setEmail] = useState('');

  const handleResend = async () => {
    if (!email.trim()) return;
    setResending(true);
    setResendError('');
    setResendSuccess(false);

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email.trim(),
    });

    if (error) {
      setResendError(error.message);
    } else {
      setResendSuccess(true);
    }
    setResending(false);
  };

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
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Mail className="h-5 w-5" />
            <p>
              {t(
                'Пожалуйста, проверьте вашу электронную почту и нажмите на ссылку для подтверждения аккаунта.',
                'Электрондук почтаңызды текшерип, аккаунтту ырастоо үчүн шилтемени басыңыз.'
              )}
            </p>
          </div>

          <div className="space-y-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
            <Button
              variant="outline"
              className="w-full"
              onClick={handleResend}
              disabled={resending || !email.trim()}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${resending ? 'animate-spin' : ''}`} />
              {t('Отправить письмо повторно', 'Катты кайра жөнөтүү')}
            </Button>
          </div>

          {resendSuccess && (
            <Alert className="border-primary/50 bg-primary/5 text-foreground">
              <AlertDescription>
                {t('Письмо отправлено повторно!', 'Кат кайра жөнөтүлдү!')}
              </AlertDescription>
            </Alert>
          )}

          {resendError && (
            <Alert variant="destructive">
              <AlertDescription>{resendError}</AlertDescription>
            </Alert>
          )}

          <Button asChild className="w-full">
            <a href="/login">{t('Войти', 'Кирүү')}</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationSuccess;
