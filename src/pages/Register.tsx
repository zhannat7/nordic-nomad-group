import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useI18n } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, differenceInYears, differenceInMonths } from 'date-fns';
import { CalendarIcon, CheckCircle2, XCircle, Upload, ArrowLeft, ArrowRight, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import logo from '@/assets/logo.jpeg';

const Register = () => {
  const { lang } = useI18n();
  const navigate = useNavigate();
  const isKy = lang === 'ky';

  const t = (ru: string, ky: string) => (isKy ? ky : ru);

  // Step state
  const [step, setStep] = useState<1 | 2>(1);

  // Step 1
  const [dob, setDob] = useState<Date>();
  const [studyYear, setStudyYear] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [prevInternship, setPrevInternship] = useState('');
  const [eligibilityChecked, setEligibilityChecked] = useState(false);

  // Step 2
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [passportExpiry, setPassportExpiry] = useState<Date>();
  const [passportPdf, setPassportPdf] = useState<File | null>(null);
  const [engCert, setEngCert] = useState<File | null>(null);
  const [enrollmentLetter, setEnrollmentLetter] = useState<File | null>(null);
  const [transcript, setTranscript] = useState<File | null>(null);
  const [powerOfAttorney, setPowerOfAttorney] = useState<File | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Eligibility validation
  const eligibilityErrors = useMemo(() => {
    const errors: string[] = [];
    if (dob) {
      const age = differenceInYears(new Date(), dob);
      if (age < 18 || age > 30) {
        errors.push(t(
          'Вам должно быть от 18 до 30 лет для подачи заявки',
          'Сиздин жашыңыз 18-30 аралыгында болушу керек'
        ));
      }
    }
    if (studyYear === '4' || studyYear === '5') {
      errors.push(t(
        'Только студенты 1-3 курса могут подать заявку',
        '1-3 курстун студенттери гана катталса болот'
      ));
    }
    if (fieldOfStudy && fieldOfStudy !== 'agricultural') {
      errors.push(t(
        'Только студенты сельскохозяйственных специальностей могут подать заявку',
        'Айыл чарба адистигиндеги студенттер гана катталса болот'
      ));
    }
    if (prevInternship === 'yes') {
      errors.push(t(
        'Вы не можете подать заявку повторно',
        'Сиз кайталап катталууга мүмкүн эмес'
      ));
    }
    return errors;
  }, [dob, studyYear, fieldOfStudy, prevInternship, lang]);

  const allStep1Filled = !!dob && !!studyYear && !!fieldOfStudy && !!prevInternship;
  const isEligible = allStep1Filled && eligibilityErrors.length === 0;

  const handleCheckEligibility = () => {
    setEligibilityChecked(true);
    if (isEligible) {
      setTimeout(() => setStep(2), 800);
    }
  };

  // Passport expiry warning
  const passportWarning = useMemo(() => {
    if (!passportExpiry) return null;
    const months = differenceInMonths(passportExpiry, new Date());
    if (months < 6) {
      return t(
        'Внимание: срок действия паспорта менее 6 месяцев!',
        'Эскертүү: паспорттун мөөнөтү 6 айдан аз!'
      );
    }
    return null;
  }, [passportExpiry, lang]);

  const allStep2Filled = fullName.trim() && email.trim() && password.length >= 6 && passportPdf && engCert && enrollmentLetter && transcript && powerOfAttorney;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allStep2Filled) return;
    setError('');
    setSubmitting(true);

    try {
      // 1. Sign up user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { emailRedirectTo: window.location.origin },
      });

      if (signUpError) throw signUpError;
      const userId = authData.user?.id;
      if (!userId) throw new Error('Registration failed');

      // 2. Assign intern role
      await supabase.from('user_roles').insert({ user_id: userId, role: 'intern' as const });

      // 3. Create application
      await supabase.from('applications').insert({
        user_id: userId,
        full_name: fullName.trim(),
        email: email.trim(),
        program: 'Agricultural Internship - Denmark',
        status: 'pending',
      });

      // 4. Upload files
      const uploads: { file: File; name: string }[] = [
        { file: passportPdf!, name: 'passport.pdf' },
        { file: engCert!, name: 'english_certificate' },
        { file: enrollmentLetter!, name: 'enrollment_letter' },
        { file: transcript!, name: 'transcript' },
        { file: powerOfAttorney!, name: 'power_of_attorney' },
      ];

      if (profilePhoto) {
        uploads.push({ file: profilePhoto, name: 'profile_photo' });
      }

      for (const { file, name } of uploads) {
        const ext = file.name.split('.').pop() || 'pdf';
        await supabase.storage
          .from('documents')
          .upload(`${userId}/${name}.${ext}`, file, { upsert: true });
      }

      toast({
        title: t('Заявка отправлена!', 'Арыз жөнөтүлдү!'),
        description: t(
          'Ваш профиль отправлен. Администратор рассмотрит вашу заявку.',
          'Сиздин профилиңиз жөнөтүлдү. Администратор кароого алат.'
        ),
      });

      navigate('/profile', { replace: true });
    } catch (err: any) {
      setError(err.message || t('Ошибка регистрации', 'Каттоо катасы'));
    } finally {
      setSubmitting(false);
    }
  };

  const studyYears = [
    { value: '1', label: t('1 курс', '1-курс') },
    { value: '2', label: t('2 курс', '2-курс') },
    { value: '3', label: t('3 курс', '3-курс') },
    { value: '4', label: t('4 курс', '4-курс') },
    { value: '5', label: t('5 курс', '5-курс') },
  ];

  const fields = [
    { value: 'agricultural', label: t('Сельское хозяйство', 'Айыл чарба') },
    { value: 'other', label: t('Другое', 'Башка') },
  ];

  const FileInput = ({ label, file, onChange, accept = '.pdf,.jpg,.jpeg,.png' }: { label: string; file: File | null; onChange: (f: File | null) => void; accept?: string }) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <label className={cn(
        "flex cursor-pointer items-center gap-3 rounded-md border border-input bg-background px-4 py-3 text-sm transition-colors hover:border-primary",
        file && "border-primary/50 bg-primary/5"
      )}>
        <Upload className="h-4 w-4 shrink-0 text-muted-foreground" />
        <span className={cn("truncate", file ? "text-foreground" : "text-muted-foreground")}>
          {file ? file.name : t('Выбрать файл...', 'Файл тандаңыз...')}
        </span>
        <input type="file" accept={accept} className="hidden" onChange={(e) => onChange(e.target.files?.[0] || null)} />
      </label>
    </div>
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <a href="/" className="mx-auto mb-2 block">
            <img src={logo} alt="Nordic Nomad Group" className="mx-auto h-14 w-auto" />
          </a>
          <CardTitle className="text-2xl">
            {t('Регистрация', 'Каттоо')}
          </CardTitle>
          <CardDescription>
            {step === 1
              ? t('Шаг 1: Проверка соответствия требованиям', 'Кадам 1: Талаптарга ылайыктуулукту текшерүү')
              : t('Шаг 2: Заполните форму регистрации', 'Кадам 2: Каттоо формасын толтуруңуз')}
          </CardDescription>
          {/* Step indicator */}
          <div className="mt-3 flex items-center justify-center gap-2">
            <div className={cn("h-2 w-16 rounded-full", step === 1 ? "bg-primary" : "bg-primary/30")} />
            <div className={cn("h-2 w-16 rounded-full", step === 2 ? "bg-primary" : "bg-muted")} />
          </div>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* ========== STEP 1 ========== */}
          {step === 1 && (
            <div className="space-y-4">
              {/* Date of birth */}
              <div className="space-y-2">
                <Label>{t('Дата рождения', 'Туулган күн')}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !dob && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dob ? format(dob, 'dd.MM.yyyy') : t('Выберите дату', 'Күндү тандаңыз')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dob}
                      onSelect={setDob}
                      defaultMonth={new Date(2000, 0)}
                      fromYear={1990}
                      toYear={2010}
                      captionLayout="dropdown-buttons"
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                {dob && (
                  <p className="text-xs text-muted-foreground">
                    {t('Возраст', 'Жашы')}: {differenceInYears(new Date(), dob)} {t('лет', 'жаш')}
                  </p>
                )}
              </div>

              {/* Study year */}
              <div className="space-y-2">
                <Label>{t('Курс обучения', 'Окуу курсу')}</Label>
                <Select value={studyYear} onValueChange={setStudyYear}>
                  <SelectTrigger><SelectValue placeholder={t('Выберите курс', 'Курс тандаңыз')} /></SelectTrigger>
                  <SelectContent>
                    {studyYears.map((y) => (
                      <SelectItem key={y.value} value={y.value}>{y.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Field of study */}
              <div className="space-y-2">
                <Label>{t('Направление обучения', 'Окуу багыты')}</Label>
                <Select value={fieldOfStudy} onValueChange={setFieldOfStudy}>
                  <SelectTrigger><SelectValue placeholder={t('Выберите направление', 'Багыт тандаңыз')} /></SelectTrigger>
                  <SelectContent>
                    {fields.map((f) => (
                      <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Previous internship */}
              <div className="space-y-2">
                <Label>{t('Проходили ли вы ранее стажировку в Дании?', 'Данияда мурда стажировка өткөндүңүзбү?')}</Label>
                <Select value={prevInternship} onValueChange={setPrevInternship}>
                  <SelectTrigger><SelectValue placeholder={t('Выберите', 'Тандаңыз')} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">{t('Нет', 'Жок')}</SelectItem>
                    <SelectItem value="yes">{t('Да', 'Ооба')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Eligibility results */}
              {eligibilityChecked && eligibilityErrors.length > 0 && (
                <div className="space-y-2">
                  {eligibilityErrors.map((err, i) => (
                    <Alert key={i} variant="destructive">
                      <XCircle className="h-4 w-4" />
                      <AlertDescription>{err}</AlertDescription>
                    </Alert>
                  ))}
                </div>
              )}

              {eligibilityChecked && isEligible && (
                <Alert className="border-green-500/50 bg-green-50 text-green-800">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertDescription>
                    {t('Вы соответствуете требованиям! Переход к регистрации...', 'Сиз талаптарга жооп бересиз! Каттоого өтүү...')}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                className="w-full"
                disabled={!allStep1Filled}
                onClick={handleCheckEligibility}
              >
                {t('Проверить', 'Текшерүү')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <a href="/login" className="block text-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t('Уже есть аккаунт? Войти', 'Аккаунтуңуз барбы? Кирүү')}
              </a>
            </div>
          )}

          {/* ========== STEP 2 ========== */}
          {step === 2 && (
            <form onSubmit={handleRegister} className="space-y-4">
              <Button type="button" variant="ghost" size="sm" onClick={() => setStep(1)} className="mb-2">
                <ArrowLeft className="mr-1 h-4 w-4" />
                {t('Назад', 'Артка')}
              </Button>

              <div className="space-y-2">
                <Label>{t('Полное имя', 'Толук аты-жөнү')}</Label>
                <Input value={fullName} onChange={(e) => setFullName(e.target.value)} required placeholder={t('Иванов Иван Иванович', 'Аты-жөнүңүз')} />
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="email@example.com" />
              </div>

              <div className="space-y-2">
                <Label>{t('Пароль (мин. 6 символов)', 'Сырсөз (мин. 6 белги)')}</Label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
              </div>

              <FileInput
                label={t('Фото профиля (необязательно)', 'Профиль сүрөтү (милдеттүү эмес)')}
                file={profilePhoto}
                onChange={setProfilePhoto}
                accept=".jpg,.jpeg,.png,.webp"
              />

              {/* Passport expiry */}
              <div className="space-y-2">
                <Label>{t('Срок действия паспорта', 'Паспорттун мөөнөтү')}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !passportExpiry && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {passportExpiry ? format(passportExpiry, 'dd.MM.yyyy') : t('Выберите дату', 'Күндү тандаңыз')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={passportExpiry}
                      onSelect={setPassportExpiry}
                      fromDate={new Date()}
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                {passportWarning && (
                  <Alert className="border-amber-500/50 bg-amber-50 text-amber-800">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <AlertDescription>{passportWarning}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-1 pt-2">
                <p className="text-sm font-medium">{t('Обязательные документы', 'Милдеттүү документтер')}</p>
              </div>

              <FileInput
                label={t('Паспорт PDF (все страницы включая обложку)', 'Паспорт PDF (бардык барактар, мукабаны кошо)')}
                file={passportPdf}
                onChange={setPassportPdf}
              />

              <FileInput
                label={t('Сертификат английского языка (KET / IELTS / TOEFL)', 'Англис тили сертификаты (KET / IELTS / TOEFL)')}
                file={engCert}
                onChange={setEngCert}
              />

              <FileInput
                label={t('Справка о зачислении из университета', 'Университеттен каттоо справкасы')}
                file={enrollmentLetter}
                onChange={setEnrollmentLetter}
              />

              <FileInput
                label={t('Академическая справка (перевод на англ., нотариально заверенная)', 'Академиялык справка (англисче, нотариалдык)')}
                file={transcript}
                onChange={setTranscript}
              />

              <FileInput
                label={t('Подписанная доверенность', 'Кол коюлган ишеним кат')}
                file={powerOfAttorney}
                onChange={setPowerOfAttorney}
              />

              <Button type="submit" className="w-full" disabled={submitting || !allStep2Filled}>
                {submitting ? '...' : t('Зарегистрироваться', 'Катталуу')}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
