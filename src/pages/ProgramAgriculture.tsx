import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sprout, ClipboardList, ArrowRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const content = {
  ky: {
    title: 'Айыл чарба стажировка — Дания',
    descTitle: 'Сүрөттөмө',
    desc: 'Даниядагы айыл чарба стажировка программабыз Европадагы эң заманбап жана туруктуу фермаларда жаш студент-практиканттар үчүн уникалдуу мүмкүнчүлүк берет. Сиз мал чарбачылыгы, өсүмдүктөрдү башкаруу жана заманбап дыйканчылык технологиялары боюнча практикалык тажрыйбага ээ болосуз. Программа адатта 12–18 айга созулат жана жатакана, тамак-аш жана ай сайын стипендияны камтыйт.',
    reqTitle: 'Талаптар',
    reqs: [
      'Айыл чарба боюнча окуу программасына катталган жана сөзсүз 1–3-курста окуп жаткан болушу керек',
      'Англис тилинин негизги көндүмдөрү (кеминде A2 деңгээли)',
      'Ферма жумуштары үчүн физикалык даярдык',
      'Жашы: 18–29',
      'Кеминде 18 ай жарактуу паспорт',
      'Мал чарбасына кызыгуу (мисалы: уй, кой, чочко, тоок жана башка)',
      'Бул биринчи стажировка болушу керек (мурун Данияда стажировка өтпөгөн)',
    ],
    procTitle: 'Процесс',
    steps: [
      'Арызыңызды бардык керектүү документтер менен кошо тапшырыңыз',
      'Биз менен онлайн маектешүү',
      'Көндүмдөрдү баалоо жана билимин текшерүү',
      'Даниядагы ылайыктуу фермалар менен дал келтирүү',
      'Визага арыз берүү боюнча колдоо жана кетүүгө даярдык',
      'Данияга келүү жана фермадагы багытка көнүү',
    ],
    apply: 'Арыз берүү',
  },
  ru: {
    title: 'Сельскохозяйственная стажировка — Дания',
    descTitle: 'Описание',
    desc: 'Программа сельскохозяйственной стажировки в Дании предоставляет уникальную возможность для студентов пройти практику на современных и устойчивых фермах Европы. Вы получите практический опыт в животноводстве, управлении сельскохозяйственными культурами и современных агротехнологиях. Программа обычно длится 12–18 месяцев и включает проживание, питание и ежемесячную стипендию.',
    reqTitle: 'Требования',
    reqs: [
      'Обучение по сельскохозяйственной специальности (обязательно 1–3 курс)',
      'Базовый уровень английского языка (не ниже A2)',
      'Физическая готовность к работе на ферме',
      'Возраст: 18–29 лет',
      'Паспорт, действительный не менее 18 месяцев',
      'Интерес к животноводству (например: коровы, овцы, свиньи, куры и др.)',
      'Первая стажировка (ранее не проходили стажировку в Дании)',
    ],
    procTitle: 'Процесс',
    steps: [
      'Подача заявки со всеми необходимыми документами',
      'Онлайн-собеседование с нами',
      'Оценка навыков и проверка знаний',
      'Подбор подходящей фермы в Дании',
      'Поддержка при подаче на визу и подготовка к выезду',
      'Прибытие в Данию и адаптация на ферме',
    ],
    apply: 'Подать заявку',
  },
};

const ProgramAgriculture = () => {
  const navigate = useNavigate();
  const { lang } = useI18n();
  const c = lang === 'ru' ? content.ru : content.ky;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
        className="flex-1 container py-16 max-w-3xl"
      >
        <h1 className="text-4xl font-bold text-foreground mb-10">{c.title}</h1>

        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Sprout className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">{c.descTitle}</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">{c.desc}</p>
        </section>

        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <ClipboardList className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">{c.reqTitle}</h2>
          </div>
          <ul className="space-y-2 text-muted-foreground list-disc list-inside">
            {c.reqs.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </section>

        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <ArrowRight className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">{c.procTitle}</h2>
          </div>
          <ol className="space-y-2 text-muted-foreground list-decimal list-inside">
            {c.steps.map((s, i) => <li key={i}>{s}</li>)}
          </ol>
        </section>

        <div className="text-center">
          <Button size="lg" onClick={() => navigate('/register')} className="px-10">
            {c.apply}
          </Button>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default ProgramAgriculture;
