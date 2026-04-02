import { useState, useMemo, useRef } from 'react';
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
import { format, differenceInYears, differenceInMonths, parse, isValid } from 'date-fns';
import { CalendarIcon, CheckCircle2, XCircle, Upload, ArrowLeft, ArrowRight, AlertTriangle } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
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
  const [dobText, setDobText] = useState('');
  const [dobOpen, setDobOpen] = useState(false);
  const [studyYear, setStudyYear] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [university, setUniversity] = useState('');
  const [prevInternship, setPrevInternship] = useState('');
  const [wasInEU, setWasInEU] = useState('');
  const [euCountry, setEuCountry] = useState('');
  const [hadBanOrDeportation, setHadBanOrDeportation] = useState('');
  const [banCountry, setBanCountry] = useState('');
  const [eligibilityChecked, setEligibilityChecked] = useState(false);

  // Step 2
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [englishLevel, setEnglishLevel] = useState('');
  const [selectedAnimals, setSelectedAnimals] = useState<string[]>([]);
  const [animalsOtherText, setAnimalsOtherText] = useState('');
  const [agricultureInterest, setAgricultureInterest] = useState('');
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [passportExpiry, setPassportExpiry] = useState<Date>();
  const [passportExpiryText, setPassportExpiryText] = useState('');
  const [passportExpiryOpen, setPassportExpiryOpen] = useState(false);
  const [passportPdf, setPassportPdf] = useState<File | null>(null);
  const [engCert, setEngCert] = useState<File | null>(null);
  const [enrollmentLetter, setEnrollmentLetter] = useState<File | null>(null);
  const [transcript, setTranscript] = useState<File | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Check if university is agrar
  const isAgrarUni = useMemo(() => {
    const lower = university.toLowerCase();
    return lower.includes('аграр') || lower.includes('agrar');
  }, [university]);

  // Eligibility errors (hard blocks)
  const eligibilityErrors = useMemo(() => {
    const errors: string[] = [];
    if (dob) {
      const age = differenceInYears(new Date(), dob);
      if (age < 18 || age > 29) {
        errors.push(t(
          'Вам должно быть от 18 до 29 лет для подачи заявки',
          'Сиздин жашыңыз 18-29 аралыгында болушу керек'
        ));
      }
    }
    if (prevInternship === 'yes') {
      errors.push(t(
        'Вы не можете подать заявку повторно',
        'Сиз кайталап катталууга мүмкүн эмес'
      ));
    }
    return errors;
  }, [dob, prevInternship, lang]);

  // University/course/field warning (soft block with orange warning)
  const universityWarning = useMemo(() => {
    if (!university.trim() || !studyYear || !fieldOfStudy) return null;
    const isValidField = ['zoology', 'veterinary'].includes(fieldOfStudy);

    // Fall 1: nicht Agrar-Uni
    if (!isAgrarUni) {
      return t('Вы учитесь в другом университете. Для участия необходимо поступить в Аграрный университет на бакалавриат или магистратуру и предоставить подтверждение.', 'Сиз учурда башка окуу жайда окуйсуз. Катышуу үчүн Агрардык университетке бакалавр же магистратурага тапшырып, кабыл алынгандыгы тууралуу тастыктама көрсөтүү керек.');
    }

    // Agrar-Uni + Kurs 4/5
    if (studyYear === '4' || studyYear === '5') {
      if (isValidField) {
        // Fall 2
        return t('Вы учитесь на 4–5 курсе. Пожалуйста, подайте документы в магистратуру Аграрного университета и предоставьте подтверждение о зачислении. Только в этом случае вы сможете участвовать в программе.', 'Сиз 4–5-курста окуйсуз. Сураныч, Агрардык университеттин магистратурасына тапшырыңыз жана кабыл алынгандыгыңызды тастыктаган документти жибериңиз. Ошондо гана программага катыша аласыз.');
      } else {
        // Fall 3 (Другое)
        return t('Вы учитесь на 4–5 курсе по направлению вне программы. Поступите в магистратуру Аграрного университета по направлению Зоотехника (Животноводство) или Ветеринария и предоставьте подтверждение.', 'Сиз 4–5-курста программага кирбеген багытта окуйсуз. Агрардык университеттин магистратурасына Зоотехника (мал чарбачылык) же Ветеринария багыты боюнча тапшырып, тастыктама көрсөтүңүз.');
      }
    }

    // Agrar-Uni + Kurs 1-3 + Другое
    if (fieldOfStudy === 'other') {
      return t('К сожалению, ваше направление обучения не входит в программу. Для участия необходимо перевестись на направление Зоотехника (Животноводство) или Ветеринария и предоставить подтверждение.', 'Тилекке каршы, сиздин окуу багытыңыз программага кирбейт. Катышуу үчүн Зоотехника (мал чарбачылык) же Ветеринария багытына которулуп, тастыктама көрсөтүү зарыл.');
    }

    // Fall 4: Agrar + 1-3 + valid field → OK
    return null;
  }, [university, studyYear, fieldOfStudy, isAgrarUni]);

  const allStep1Filled = !!dob && !!studyYear && !!fieldOfStudy && !!university.trim() && !!prevInternship;
  const isEligible = allStep1Filled && eligibilityErrors.length === 0 && !universityWarning;

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

  // Button enabled when name + email + password >= 6 (docs are optional)
  const canSubmit = fullName.trim().length > 0 && email.trim().length > 0 && password.length >= 6;

  // Date text input handler
  const handleDobTextChange = (value: string) => {
    setDobText(value);
    const parsed = parse(value, 'dd.MM.yyyy', new Date());
    if (isValid(parsed) && parsed.getFullYear() >= 1990 && parsed.getFullYear() <= 2010) {
      setDob(parsed);
    }
  };

  const handleDobCalendarSelect = (date: Date | undefined) => {
    setDob(date);
    if (date) {
      setDobText(format(date, 'dd.MM.yyyy'));
      setDobOpen(false);
    }
  };

  const handlePassportExpiryTextChange = (value: string) => {
    setPassportExpiryText(value);
    const parsed = parse(value, 'dd.MM.yyyy', new Date());
    if (isValid(parsed) && parsed >= new Date()) {
      setPassportExpiry(parsed);
    }
  };

  const handlePassportExpiryCalendarSelect = (date: Date | undefined) => {
    setPassportExpiry(date);
    if (date) {
      setPassportExpiryText(format(date, 'dd.MM.yyyy'));
      setPassportExpiryOpen(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setError('');
    setSubmitting(true);

    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { emailRedirectTo: window.location.origin },
      });

      if (signUpError) throw signUpError;
      const userId = authData.user?.id;
      if (!userId) throw new Error('Registration failed');

      await supabase.from('user_roles').insert({ user_id: userId, role: 'intern' as const });

      await supabase.from('applications').insert({
        user_id: userId,
        full_name: fullName.trim(),
        email: email.trim(),
        program: 'Agricultural Internship - Denmark',
        status: 'pending',
        date_of_birth: dob ? format(dob, 'yyyy-MM-dd') : null,
        english_level: englishLevel || null,
        animals: [...selectedAnimals.filter(a => a !== 'other'), ...(selectedAnimals.includes('other') && animalsOtherText.trim() ? [animalsOtherText.trim()] : [])].join(', ') || null,
        agriculture_interest: agricultureInterest.trim() || null,
      });

      // Upload files (all optional)
      const uploads: { file: File; name: string }[] = [];
      if (passportPdf) uploads.push({ file: passportPdf, name: 'passport.pdf' });
      if (engCert) uploads.push({ file: engCert, name: 'english_certificate' });
      if (enrollmentLetter) uploads.push({ file: enrollmentLetter, name: 'enrollment_letter' });
      if (transcript) uploads.push({ file: transcript, name: 'transcript' });
      if (profilePhoto) uploads.push({ file: profilePhoto, name: 'profile_photo' });

      for (const { file, name } of uploads) {
        const ext = file.name.split('.').pop() || 'pdf';
        await supabase.storage
          .from('documents')
          .upload(`${userId}/${name}.${ext}`, file, { upsert: true });
      }

      // Sign out after registration so user logs in fresh
      await supabase.auth.signOut();

      navigate('/registration-success', { replace: true });
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
    { value: 'zoology', label: t('Зоотехника / Животноводство', 'Зоотехника / Мал чарбачылык') },
    { value: 'veterinary', label: t('Ветеринарная медицина', 'Ветеринардык медицина') },
    { value: 'other', label: t('Другое', 'Башка тармак') },
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
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-8 relative">
      <a href="/" className="absolute top-4 left-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" />
        {t('Назад на главную', 'Башкы бетке кайтуу')}
      </a>
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
                <div className="flex gap-2">
                  <Input
                    placeholder="дд.мм.гггг"
                    value={dobText}
                    onChange={(e) => handleDobTextChange(e.target.value)}
                    className="flex-1"
                  />
                  <Popover open={dobOpen} onOpenChange={setDobOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="icon" className="shrink-0">
                        <CalendarIcon className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <Calendar
                        mode="single"
                        selected={dob}
                        onSelect={handleDobCalendarSelect}
                        defaultMonth={new Date(2000, 0)}
                        fromYear={1990}
                        toYear={2010}
                        captionLayout="dropdown-buttons"
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                {dob && (
                  <p className="text-xs text-muted-foreground">
                    {t('Возраст', 'Жашы')}: {differenceInYears(new Date(), dob)} {t('лет', 'жаш')}
                  </p>
                )}
                {dob && (differenceInYears(new Date(), dob) < 18 || differenceInYears(new Date(), dob) > 29) && (
                  <p className="text-sm text-destructive font-medium">
                    {t(
                      `К сожалению, вам ${differenceInYears(new Date(), dob)} лет. Для участия в программе необходимо быть в возрасте от 18 до 29 лет.`,
                      `Кечиресиз, сиздин жашыңыз ${differenceInYears(new Date(), dob)} жашта. Программага катышуу үчүн 18 менен 29 жаш аралыгында болуу керек.`
                    )}
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

              {/* University */}
              <div className="space-y-2">
                <Label>{t('В каком учебном заведении (университет или колледж) вы учитесь?', 'Сиз кайсы окуу жайында (университет же колледж) окуйсуз?')}</Label>
                <Input
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  placeholder={t('Введите название университета', 'Университеттин аталышын жазыңыз')}
                />
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
                {prevInternship === 'yes' && (
                  <Alert variant="destructive" className="mt-2">
                    <XCircle className="h-4 w-4" />
                    <AlertDescription>
                      {t('К сожалению, вы не можете повторно участвовать в программе стажировки в Дании. Датское государство не выдаёт визу на повторную стажировку в данной сфере — каждый участник может пройти стажировку только один раз.', 'Тилекке каршы, сиз Даниядагы стажировка программасына кайра катыша албайсыз. Дания мамлекети бул тармакта экинчи жолу стажировка үчүн виза бербейт — ар бир катышуучу бир гана жолу стажировкадан өтө алат.')}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Were you in an EU country before? */}
              <div className="space-y-2">
                <Label>{t('Были ли вы ранее в стране ЕС?', 'Сиз мурда ЕС өлкөсүндө болгонсузбу?')}</Label>
                <Select value={wasInEU} onValueChange={(v) => { setWasInEU(v); if (v === 'no') setEuCountry(''); }}>
                  <SelectTrigger><SelectValue placeholder={t('Выберите', 'Тандаңыз')} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">{t('Нет', 'Жок')}</SelectItem>
                    <SelectItem value="yes">{t('Да', 'Ооба')}</SelectItem>
                  </SelectContent>
                </Select>
                {wasInEU === 'yes' && (
                  <div className="space-y-2 pt-1">
                    <Label>{t('В какой стране ЕС вы были?', 'Кайсы ЕС өлкөсүндө болгонсуз?')}</Label>
                    <Input value={euCountry} onChange={(e) => setEuCountry(e.target.value)} placeholder={t('Укажите страну', 'Өлкөнү көрсөтүңүз')} />
                  </div>
                )}
              </div>

              {/* Entry ban or deportation */}
              <div className="space-y-2">
                <Label>{t('Был ли у вас запрет на въезд или депортация?', 'Кирүүгө тыюу же депортация болгонбу?')}</Label>
                <Select value={hadBanOrDeportation} onValueChange={(v) => { setHadBanOrDeportation(v); if (v === 'no') setBanCountry(''); }}>
                  <SelectTrigger><SelectValue placeholder={t('Выберите', 'Тандаңыз')} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">{t('Нет', 'Жок')}</SelectItem>
                    <SelectItem value="yes">{t('Да', 'Ооба')}</SelectItem>
                  </SelectContent>
                </Select>
                {hadBanOrDeportation === 'yes' && (
                  <div className="space-y-2 pt-1">
                    <Label>{t('В какой стране?', 'Кайсы өлкөдө?')}</Label>
                    <Input value={banCountry} onChange={(e) => setBanCountry(e.target.value)} placeholder={t('Укажите страну', 'Өлкөнү көрсөтүңүз')} />
                  </div>
                )}
              </div>

              {/* University warning */}
              {universityWarning && (
                <Alert className="border-orange-400/50 bg-orange-50 text-orange-900 dark:bg-orange-950/30 dark:text-orange-200 dark:border-orange-500/30">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  <AlertDescription>{universityWarning}</AlertDescription>
                </Alert>
              )}

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
                <Alert className="border-primary/50 bg-primary/5 text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <AlertDescription>
                    {t('Вы соответствуете требованиям! Переход к регистрации...', 'Сиз талаптарга жооп бересиз! Каттоого өтүү...')}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                className="w-full"
                disabled={!allStep1Filled || !!universityWarning}
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
                <Label>{t('Полное имя', 'Толук аты-жөнү')} *</Label>
                <Input value={fullName} onChange={(e) => setFullName(e.target.value)} required placeholder={t('Иванов Иван Иванович', 'Аты-жөнүңүз')} />
              </div>

              <div className="space-y-2">
                <Label>Email *</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="email@example.com" />
              </div>

              <div className="space-y-2">
                <Label>{t('Пароль (мин. 6 символов)', 'Сырсөз (мин. 6 белги)')} *</Label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
              </div>

              {/* English level */}
              <div className="space-y-2">
                <Label>{t('Уровень английского языка', 'Англис тилинин деңгээли')}</Label>
                <Select value={englishLevel} onValueChange={setEnglishLevel}>
                  <SelectTrigger><SelectValue placeholder={t('Выберите уровень', 'Деңгээл тандаңыз')} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A2">A2</SelectItem>
                    <SelectItem value="B1">B1</SelectItem>
                    <SelectItem value="B2">B2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Animals */}
              <div className="space-y-2">
                <Label>{t('С какими животными умеете работать?', 'Кайсы жаныбарлар менен иштей аласыз?')}</Label>
                <Input
                  value={animals}
                  onChange={(e) => setAnimals(e.target.value)}
                  placeholder={t('Напр.: коровы, лошади, овцы', 'Мис.: уйлар, жылкылар, коюлар')}
                />
              </div>

              {/* Agriculture interest */}
              <div className="space-y-2">
                <Label>{t('Почему вам интересно сельское хозяйство?', 'Эмне үчүн айыл чарба сизге кызыктуу?')}</Label>
                <Input
                  value={agricultureInterest}
                  onChange={(e) => setAgricultureInterest(e.target.value)}
                  placeholder={t('Кратко опишите...', 'Кыскача жазыңыз...')}
                />
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
                <div className="flex gap-2">
                  <Input
                    placeholder="дд.мм.гггг"
                    value={passportExpiryText}
                    onChange={(e) => handlePassportExpiryTextChange(e.target.value)}
                    className="flex-1"
                  />
                  <Popover open={passportExpiryOpen} onOpenChange={setPassportExpiryOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="icon" className="shrink-0">
                        <CalendarIcon className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <Calendar
                        mode="single"
                        selected={passportExpiry}
                        onSelect={handlePassportExpiryCalendarSelect}
                        fromDate={new Date()}
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                {passportWarning && (
                  <Alert className="border-accent/50 bg-accent/10 text-foreground">
                    <AlertTriangle className="h-4 w-4 text-accent" />
                    <AlertDescription>{passportWarning}</AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Documents warning */}
              <Alert className="border-yellow-500/50 bg-yellow-500/10 text-foreground">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-sm">
                  {t(
                    'Важно: Ваш профиль будет рассмотрен только при наличии всех необходимых документов. Профили с неполными документами будут автоматически удалены через 30 дней.',
                    'Маанилүү: Профилиңиз бардык документтер жүктөлгөндө гана каралат. Толук эмес профилдер 30 күндөн кийин автоматтык түрдө жок кылынат.'
                  )}
                </AlertDescription>
              </Alert>

              <div className="space-y-1 pt-2">
                <p className="text-sm font-medium">{t('Документы (необязательно)', 'Документтер (милдеттүү эмес)')}</p>
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

              <Button type="submit" className="w-full" disabled={submitting || !canSubmit}>
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
