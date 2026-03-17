import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useI18n } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Mail } from 'lucide-react';
import logo from '@/assets/logo.jpeg';
import { useEffect } from 'react';

const Login = () => {
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  const { user, role, loading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [forgotMode, setForgotMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user && role) {
      if (role === 'admin') navigate('/admin', { replace: true });
      else if (role === 'intern') navigate('/profile', { replace: true });
    }
  }, [user, role, loading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (authError) {
      setError(lang === 'ky' ? 'Туура эмес email же сырсөз' : lang === 'ru' ? 'Неверный email или пароль' : 'Invalid email or password');
      setSubmitting(false);
      return;
    }

    // Role will be fetched by AuthProvider, redirect handled by useEffect
    setSubmitting(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (resetError) {
      setError(resetError.message);
    } else {
      setResetSent(true);
    }
    setSubmitting(false);
  };

  const isKyrgyz = lang === 'ky';

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 relative">
      <a href="/" className="absolute top-4 left-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" />
        {isKyrgyz ? 'Башкы бетке кайтуу' : 'Назад на главную'}
      </a>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <a href="/" className="mx-auto mb-4 block">
            <img src={logo} alt="Nordic Nomad Group" className="mx-auto h-16 w-auto" />
          </a>
          <CardTitle className="text-2xl">
            {forgotMode
              ? (isKyrgyz ? 'Сырсөздү калыбына келтирүү' : 'Восстановление пароля')
              : (isKyrgyz ? 'Кирүү' : 'Войти')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {resetSent ? (
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                {isKyrgyz
                  ? 'Калыбына келтирүү шилтемеси электрондук почтаңызга жөнөтүлдү'
                  : 'Ссылка для сброса отправлена на вашу почту'}
              </p>
              <Button variant="outline" onClick={() => { setForgotMode(false); setResetSent(false); }} className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {isKyrgyz ? 'Кирүүгө кайтуу' : 'Вернуться к входу'}
              </Button>
            </div>
          ) : forgotMode ? (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reset-email">Email</Label>
                <Input
                  id="reset-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="email@example.com"
                />
              </div>
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting
                  ? '...'
                  : (isKyrgyz ? 'Шилтеме жөнөтүү' : 'Отправить ссылку')}
              </Button>
              <Button variant="ghost" onClick={() => setForgotMode(false)} className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {isKyrgyz ? 'Артка' : 'Назад'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="email@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">
                  {isKyrgyz ? 'Сырсөз' : 'Пароль'}
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? '...' : (isKyrgyz ? 'Кирүү' : 'Войти')}
              </Button>
              <button
                type="button"
                onClick={() => setForgotMode(true)}
                className="block w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {isKyrgyz ? 'Сырсөзүңүздү унуттуңузбу?' : 'Забыли пароль?'}
              </button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
