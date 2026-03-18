import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sprout, ClipboardList, ArrowRight } from 'lucide-react';

const ProgramAgriculture = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
        className="flex-1 container py-16 max-w-3xl"
      >
        <h1 className="text-4xl font-bold text-foreground mb-10">Айыл чарба стажировка — Дания</h1>

        {/* Сүрөттөмө */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Sprout className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Сүрөттөмө</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Даниядагы айыл чарба стажировка программабыз Европадагы эң заманбап жана туруктуу фермаларда жаш студент-практиканттар үчүн уникалдуу мүмкүнчүлүк берет. Сиз мал чарбачылыгы, өсүмдүктөрдү башкаруу жана заманбап дыйканчылык технологиялары боюнча практикалык тажрыйбага ээ болосуз. Программа адатта 12–18 айга созулат жана жатакана, тамак-аш жана ай сайын стипендияны камтыйт.
          </p>
        </section>

        {/* Талаптар */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <ClipboardList className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Талаптар</h2>
          </div>
          <ul className="space-y-2 text-muted-foreground list-disc list-inside">
            <li>Айыл чарба боюнча окуу программасына катталган жана сөзсүз 1–3-курста окуп жаткан болушу керек</li>
            <li>Англис тилинин негизги көндүмдөрү (кеминде A2 деңгээли)</li>
            <li>Ферма жумуштары үчүн физикалык даярдык</li>
            <li>Жашы: 18–29</li>
            <li>Кеминде 18 ай жарактуу паспорт</li>
            <li>Мал чарбасына кызыгуу (мисалы: уй, кой, чочко, тоок жана башка)</li>
            <li>Бул биринчи стажировка болушу керек (мурун Данияда стажировка өтпөгөн)</li>
          </ul>
        </section>

        {/* Процесс */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <ArrowRight className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Процесс</h2>
          </div>
          <ol className="space-y-2 text-muted-foreground list-decimal list-inside">
            <li>Арызыңызды бардык керектүү документтер менен кошо тапшырыңыз</li>
            <li>Биз менен онлайн маектешүү</li>
            <li>Көндүмдөрдү баалоо жана билимин текшерүү</li>
            <li>Даниядагы ылайыктуу фермалар менен дал келтирүү</li>
            <li>Визага арыз берүү боюнча колдоо жана кетүүгө даярдык</li>
            <li>Данияга келүү жана фермадагы багытка көнүү</li>
          </ol>
        </section>

        {/* Apply Button */}
        <div className="text-center">
          <Button size="lg" onClick={() => navigate('/register')} className="px-10">
            Арыз берүү
          </Button>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default ProgramAgriculture;
