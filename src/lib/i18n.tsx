import { createContext, useContext, useState, ReactNode } from 'react';

export type Lang = 'en' | 'da' | 'ru' | 'ky';

type Translations = Record<string, Record<Lang, string>>;

const t: Translations = {
  // Nav
  'nav.about': { en: 'About us', da: 'Om os', ru: 'О нас', ky: 'Биз жөнүндө' },
  'nav.services': { en: 'Our services', da: 'Vores ydelser', ru: 'Наши услуги', ky: 'Биздин кызматтар' },
  'nav.faq': { en: 'FAQ', da: 'FAQ', ru: 'Вопросы', ky: 'Суроолор' },
  'nav.contact': { en: 'Contact us', da: 'Kontakt os', ru: 'Контакты', ky: 'Байланыш' },
  'nav.privacy': { en: 'Privacy policy', da: 'Privatlivspolitik', ru: 'Политика конф.', ky: 'Купуялуулук' },
  'nav.candidates': { en: 'See candidates', da: 'Se kandidater', ru: 'Кандидаты', ky: 'Талапкерлер' },
  'nav.order': { en: 'Order intern/employee', da: 'Bestil praktikant/medarbejder', ru: 'Заказать стажёра', ky: 'Стажёр заказдоо' },

  // Hero
  'hero.tagline': {
    en: 'We help find interns and employees for your company',
    da: 'Vi hjælper med at finde praktikanter og medarbejdere til din virksomhed',
    ru: 'Мы помогаем найти стажёров и сотрудников для вашей компании',
    ky: 'Биз сиздин компанияңызга стажёрлорду жана кызматкерлерди табууга жардам беребиз',
  },
  'hero.title': {
    en: 'Optimize your business with workforce from around the world',
    da: 'Optimer din virksomhed med arbejdskraft fra hele verden',
    ru: 'Оптимизируйте свой бизнес с рабочей силой со всего мира',
    ky: 'Бүт дүйнөдөн жумушчу күчү менен бизнесиңизди оптималдаштырыңыз',
  },
  'hero.subtitle': {
    en: 'We make it easy and reliable to hire skilled interns and employees from abroad, so your business can grow and thrive.',
    da: 'Vi gør det nemt og pålideligt at ansætte dygtige praktikanter og medarbejdere fra udlandet, så din virksomhed kan vokse og trives.',
    ru: 'Мы делаем наём квалифицированных стажёров и сотрудников из-за рубежа простым и надёжным, чтобы ваш бизнес мог расти и процветать.',
    ky: 'Чет өлкөлөрдөн квалификациялуу стажёрлорду жана кызматкерлерди жалдоону жеңил жана ишенимдүү кылабыз.',
  },

  // Service cards
  'service1.title': {
    en: 'Available employees',
    da: 'Ledige medarbejdere',
    ru: 'Доступные сотрудники',
    ky: 'Жеткиликтүү кызматкерлер',
  },
  'service1.desc': {
    en: 'Do you need an experienced feed master or employee for your farm to help with daily tasks?',
    da: 'Har du brug for en erfaren fodermester eller medarbejder til dit landbrug til at hjælpe med daglige opgaver?',
    ru: 'Вам нужен опытный кормомастер или сотрудник для вашей фермы?',
    ky: 'Күнүмдүк иштерге жардам берүү үчүн тажрыйбалуу тоютчу же кызматкер керекпи?',
  },
  'service1.link': { en: 'See our current candidates', da: 'Se vores aktuelle kandidater', ru: 'Смотреть кандидатов', ky: 'Талапкерлерди көрүү' },
  'service1.link2': { en: 'Read more about our services', da: 'Læs mere om vores ydelser', ru: 'Подробнее об услугах', ky: 'Кызматтар жөнүндө' },

  'service2.title': {
    en: 'Order an intern or feed master',
    da: 'Bestil en praktikant eller fodermester',
    ru: 'Заказать стажёра или кормомастера',
    ky: 'Стажёр же тоютчу заказдоо',
  },
  'service2.desc': {
    en: 'Fill out the form and we will contact you as soon as possible with our best candidates for your farm.',
    da: 'Udfyld formularen og vi kontakter dig hurtigst muligt med vores bud på de bedste kandidater til dit landbrug.',
    ru: 'Заполните форму, и мы свяжемся с вами с лучшими кандидатами для вашей фермы.',
    ky: 'Форманы толтуруңуз, биз сизге фермаңыз үчүн мыкты талапкерлерди сунуштайбыз.',
  },
  'service2.link': { en: 'Fill out the form here', da: 'Udfyld formularen her', ru: 'Заполнить форму', ky: 'Форманы толтуруу' },

  'service3.title': {
    en: 'Help with work permit application',
    da: 'Hjælp til ansøgning om arbejdstilladelse',
    ru: 'Помощь с рабочим разрешением',
    ky: 'Жумуш уруксаты боюнча жардам',
  },
  'service3.desc': {
    en: 'Do you have employees who need to apply for or extend their residence and work permit?',
    da: 'Har du medarbejdere som skal søge/forlænge deres opholds- og arbejdstilladelse?',
    ru: 'Есть ли у вас сотрудники, которым нужно подать заявку на разрешение на работу?',
    ky: 'Жашоо жана жумуш уруксатын алуу/узартуу керек болгон кызматкерлериңиз барбы?',
  },
  'service3.link': { en: 'Read more here', da: 'Læs mere her', ru: 'Подробнее', ky: 'Толугураак' },

  // About section
  'about.intro': {
    en: 'We understand that finding the right employees and interns can be a crucial factor for your company\'s success. That\'s why we\'re here to help you build a stronger workforce that meets your unique needs and goals.',
    da: 'Vi forstår, at det at finde de rette medarbejdere og praktikanter kan være en afgørende faktor for din virksomheds succes. Derfor er vi her for at hjælpe dig med at bygge en stærkere arbejdsstyrke, der kan imødekomme dine unikke behov og mål.',
    ru: 'Мы понимаем, что поиск правильных сотрудников может быть решающим фактором успеха вашей компании. Поэтому мы здесь, чтобы помочь вам.',
    ky: 'Биз туура кызматкерлерди табуу компанияңыздын ийгилиги үчүн маанилүү фактор болоорун түшүнөбүз. Ошондуктан сизге жардам берүү үчүн бул жердебиз.',
  },
  'about.body': {
    en: 'With over 15 years of experience, Nordic Nomad Group specializes in recruiting employees from abroad for Danish companies. Our goal is to be the preferred bridge between foreign labor and Danish employers – with a focus on delivering qualified, motivated, and stable candidates.',
    da: 'Med over 15 års erfaring er Nordic Nomad Group specialiseret i rekruttering af medarbejdere fra udlandet til danske virksomheder. Vores mål er at være den foretrukne brobygger mellem udenlandsk arbejdskraft og danske arbejdsgivere – med fokus på at levere kvalificerede, motiverede og stabile kandidater.',
    ru: 'Имея более 15 лет опыта, Nordic Nomad Group специализируется на подборе сотрудников из-за рубежа для датских компаний. Наша цель — быть надёжным мостом между иностранной рабочей силой и датскими работодателями.',
    ky: '15 жылдан ашуун тажрыйбасы менен Nordic Nomad Group дания компаниялары үчүн чет өлкөлүк кызматкерлерди тандоого адистешкен. Биздин максат — чет элдик жумушчу күчү менен дания иш берүүчүлөрүнүн ортосунда ишенимдүү көпүрө болуу.',
  },

  // Why choose
  'why.title': { en: 'Why choose Nordic Nomad Group?', da: 'Hvorfor vælge Nordic Nomad Group?', ru: 'Почему Nordic Nomad Group?', ky: 'Эмне үчүн Nordic Nomad Group?' },
  'why.desc': {
    en: 'Nordic Nomad Group offers qualified foreign workforce to Danish companies in multiple industries. Through our large candidate database, we ensure you get access to employees who match your specific needs.',
    da: 'Nordic Nomad Group tilbyder kvalificeret udenlandsk arbejdskraft til danske virksomheder i flere brancher. Gennem vores store kandidatdatabase sikrer vi, at du får adgang til medarbejdere, der matcher dine specifikke behov.',
    ru: 'Nordic Nomad Group предлагает квалифицированную иностранную рабочую силу для датских компаний. Через нашу базу кандидатов мы обеспечиваем доступ к сотрудникам, соответствующим вашим потребностям.',
    ky: 'Nordic Nomad Group дания компанияларына квалификациялуу чет элдик жумушчу күчүн сунуштайт. Талапкерлер базабыз аркылуу сиздин муктаждыктарыңызга ылайык кызматкерлерди камсыз кылабыз.',
  },

  'why1.title': { en: '15 years of specialization', da: '15 års specialisering', ru: '15 лет специализации', ky: '15 жыл адистик' },
  'why1.desc': {
    en: 'With over 15 years specializing in placing foreign interns in agricultural businesses, we have built a large database of engaged interns.',
    da: 'Med over 15 års specialisering i formidling af udenlandske praktikanter til landbrugsvirksomheder har vi opbygget en stor database af engagerede praktikanter.',
    ru: 'Более 15 лет специализации в размещении иностранных стажёров — большая база мотивированных кандидатов.',
    ky: '15 жылдан ашуун адистик — жигердүү стажёрлордун чоң базасы.',
  },
  'why2.title': { en: 'Extra hands for production', da: 'Ekstra hænder til produktionen', ru: 'Дополнительные руки', ky: 'Кошумча жумушчу күч' },
  'why2.desc': {
    en: 'Get extra hands to increase productivity while giving someone a great opportunity to learn and contribute.',
    da: 'Benyt din chance for at få ekstra hænder til at øge produktiviteten og samtidig give nogen en fantastisk mulighed for at lære.',
    ru: 'Получите дополнительные руки для повышения производительности и дайте кому-то возможность учиться.',
    ky: 'Өндүрүмдүүлүктү жогорулатуу үчүн кошумча колдорду алыңыз.',
  },
  'why3.title': { en: 'Ongoing contact & support', da: 'Løbende kontakt & support', ru: 'Постоянная поддержка', ky: 'Үзгүлтүксүз колдоо' },
  'why3.desc': {
    en: 'We strive to create a smooth and well-organized experience. Our continuous assistance ensures everyone is safe and well-supported.',
    da: 'Vi stræber efter at skabe en problemfri og velorganiseret oplevelse. Vores kontinuerlige assistance sikrer, at alle er trygge.',
    ru: 'Мы стремимся к гладкому и организованному процессу. Наша постоянная помощь обеспечивает поддержку.',
    ky: 'Жүйөлүү жана уюшкан тажрыйба үчүн аракеттенебиз. Үзгүлтүксүз жардам бардыгын колдойт.',
  },
  'why4.title': { en: 'Immigration help', da: 'Hjælp til immigrationsproces', ru: 'Помощь с иммиграцией', ky: 'Иммиграция жардамы' },
  'why4.desc': {
    en: 'Our diverse team has firsthand experience with the immigration process in Denmark and cultural differences.',
    da: 'Vores mangfoldige team har førstehåndserfaring med immigrationsprocessen i Danmark og kulturforskelle.',
    ru: 'Наша команда имеет личный опыт иммиграционного процесса в Дании и культурных различий.',
    ky: 'Биздин команда Даниядагы иммиграция процессин жана маданий айырмачылыктарды жеке тажрыйбадан билет.',
  },

  // Testimonials
  'testimonials.title': { en: 'What our clients say', da: 'Hvad siger vores kunder?', ru: 'Отзывы клиентов', ky: 'Кардарлардын пикирлери' },
  'testimonials.subtitle': {
    en: 'From increased productivity to transformative results, our partners share their success stories.',
    da: 'Fra øget produktivitet til transformative resultater deler vores partnere deres succeshistorier.',
    ru: 'От повышения производительности до трансформационных результатов — истории успеха наших партнёров.',
    ky: 'Өндүрүмдүүлүктүн жогорулашынан баштап трансформациялуу натыйжаларга чейин — өнөктөштөрүбүздүн ийгилик тарыхтары.',
  },

  // Contact
  'contact.title': { en: 'Contact us', da: 'Kontakt os', ru: 'Свяжитесь с нами', ky: 'Биз менен байланышыңыз' },
  'contact.desc': {
    en: 'Do you have questions, or would you like to explore your options for hiring a new employee? Call us, or fill out the form.',
    da: 'Har du spørgsmål, eller vil du undersøge dine muligheder for ansættelse af en ny medarbejder? Ring, eller udfyld formularen.',
    ru: 'У вас есть вопросы или вы хотите изучить возможности найма? Позвоните или заполните форму.',
    ky: 'Суроолоруңуз барбы же жаңы кызматкер жалдоо мүмкүнчүлүктөрүн изилдегиңиз келеби? Чалыңыз же форманы толтуруңуз.',
  },
  'contact.phone_hours': { en: 'Phone hours Mon-Fri: 09:00 - 15:00', da: 'Telefontid Man-Fre: 09.00 - 15.00', ru: 'Время звонков Пн-Пт: 09:00 - 15:00', ky: 'Чалуу убактысы Дш-Жм: 09:00 - 15:00' },
  'contact.response': { en: 'We will contact you as soon as possible', da: 'Vi kontakter dig hurtigst muligt', ru: 'Мы свяжемся с вами как можно скорее', ky: 'Биз сиз менен мүмкүн болушунча тезирээк байланышабыз' },
  'contact.name': { en: 'Name', da: 'Navn', ru: 'Имя', ky: 'Аты-жөнү' },
  'contact.email': { en: 'Email', da: 'Email', ru: 'Эл. почта', ky: 'Эл. почта' },
  'contact.message': { en: 'Message', da: 'Besked', ru: 'Сообщение', ky: 'Билдирүү' },
  'contact.consent': {
    en: 'Yes, I give permission for data to be stored and handled',
    da: 'Ja, jeg giver tilladelse til at data bliver gemt og håndteret',
    ru: 'Да, я даю разрешение на хранение и обработку данных',
    ky: 'Ооба, маалыматтарды сактоого жана иштетүүге уруксат берем',
  },
  'contact.send': { en: 'Send message', da: 'Send besked', ru: 'Отправить', ky: 'Жөнөтүү' },
  'contact.success': { en: 'We will call you within 24 hours', da: 'Vi ringer dig inden for 24 timer', ru: 'Мы позвоним вам в течение 24 часов', ky: 'Биз 24 сааттын ичинде чалабыз' },

  // Footer
  'footer.rights': { en: 'All rights reserved.', da: 'Alle rettigheder forbeholdes.', ru: 'Все права защищены.', ky: 'Бардык укуктар корголгон.' },
  'footer.services_link': { en: 'Our services', da: 'Vores ydelser', ru: 'Наши услуги', ky: 'Биздин кызматтар' },

  // Status bar
  'status.online': { en: 'Consultants online now', da: 'Konsulenter online nu', ru: 'Консультанты онлайн', ky: 'Консультанттар онлайн' },
  'status.response': { en: 'Response time: < 2 hours', da: 'Svartid: < 2 timer', ru: 'Время ответа: < 2 часов', ky: 'Жооп убактысы: < 2 саат' },
};

type I18nContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
  isCyrillic: boolean;
};

const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>('da');
  const isCyrillic = lang === 'ru' || lang === 'ky';

  const translate = (key: string): string => {
    return t[key]?.[lang] || t[key]?.['en'] || key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t: translate, isCyrillic }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
};

export const languages: { code: Lang; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'da', label: 'Dansk' },
  { code: 'ru', label: 'Русский' },
  { code: 'ky', label: 'Кыргызча' },
];
