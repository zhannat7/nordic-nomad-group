// i18n provider - internationalization context
import { createContext, useContext, useState, ReactNode } from 'react';

export type Lang = 'en' | 'da' | 'ru' | 'ky';

type Translations = Record<string, Record<Lang, string>>;

const t: Translations = {
  // Candidates page
  'candidates.title': {
    en: 'Browse Available Interns for Your Farm',
    da: 'Gennemse tilgængelige praktikanter til din gård',
    ru: '', ky: '',
  },
  'candidates.desc': {
    en: 'Discover qualified, motivated young people from Kyrgyzstan ready to work on your farm. All candidates speak English and have a genuine interest in agriculture. Select the ones you like and send us an inquiry.',
    da: 'Mød kvalificerede, motiverede unge fra Kirgisistan, der er klar til at arbejde på din gård. Alle kandidater taler engelsk og har en ægte interesse i landbrug.',
    ru: '', ky: '',
  },
  'candidates.count': {
    en: 'Available Interns',
    da: 'Tilgængelige praktikanter',
    ru: '', ky: '',
  },

  // Nav
  'nav.about': { en: 'About us', da: 'Om os', ru: 'О нас', ky: 'Биз жөнүндө' },
  'nav.services': { en: 'Candidate Profiles', da: 'Candidate Profiles', ru: 'Candidate Profiles', ky: 'Candidate Profiles' },
  'nav.faq': { en: 'FAQ', da: 'FAQ', ru: 'Вопросы', ky: 'Суроолор' },
  'nav.contact': { en: 'Contact us', da: 'Kontakt os', ru: 'Контакты', ky: 'Байланыш' },
  'nav.privacy': { en: 'Privacy policy', da: 'Privatlivspolitik', ru: 'Политика конф.', ky: 'Купуялуулук' },
  'nav.candidates': { en: 'See candidates', da: 'Se kandidater', ru: 'Кандидаты', ky: 'Талапкерлер' },
  'nav.order': { en: 'Order intern/employee', da: 'Bestil praktikant/medarbejder', ru: 'Заказать стажёра', ky: 'Стажёр заказдоо' },
  'nav.programs': { en: 'Programs', da: 'Programmer', ru: 'Программы', ky: 'Программалар' },
  'program.agriculture': { en: 'Agricultural Internship – Denmark', da: 'Landbrugspraktik – Danmark', ru: 'Сельскохозяйственная стажировка – Дания', ky: 'Айыл чарба стажировкасы – Дания' },
  'program.ausbildung': { en: 'Ausbildung – Germany', da: 'Ausbildung – Tyskland', ru: 'Аусбильдунг – Германия', ky: 'Аусбильдунг – Германия' },
  'program.medical': { en: 'Medical Diploma Recognition – Germany', da: 'Medicinsk diplomgodkendelse – Tyskland', ru: 'Признание медицинского диплома – Германия', ky: 'Медициналык дипломду таануу – Германия' },
  'program.agriculture.title': { en: 'Agricultural Internship – Denmark', da: 'Landbrugspraktik – Danmark', ru: 'Сельскохозяйственная стажировка – Дания', ky: 'Айыл чарба стажировкасы – Дания' },
  'program.agriculture.desc': { en: 'Learn about our agricultural internship program in Denmark.', da: 'Lær mere om vores landbrugspraktikprogram i Danmark.', ru: 'Узнайте о нашей программе сельскохозяйственной стажировки в Дании.', ky: 'Данияда айыл чарба стажировкасы программабыз жөнүндө билиңиз.' },
  'program.ausbildung.title': { en: 'Ausbildung – Germany', da: 'Ausbildung – Tyskland', ru: 'Аусбильдунг – Германия', ky: 'Аусбильдунг – Германия' },
  'program.ausbildung.desc': { en: 'Explore vocational training opportunities in Germany.', da: 'Udforsk erhvervsuddannelsesmuligheder i Tyskland.', ru: 'Откройте возможности профессионального обучения в Германии.', ky: 'Германиядагы кесиптик окуу мүмкүнчүлүктөрүн изилдеңиз.' },
  'program.medical.title': { en: 'Medical Diploma Recognition – Germany', da: 'Medicinsk diplomgodkendelse – Tyskland', ru: 'Признание медицинского диплома – Германия', ky: 'Медициналык дипломду таануу – Германия' },
  'program.medical.desc': { en: 'Get your medical diploma recognized in Germany.', da: 'Få dit medicinske diplom anerkendt i Tyskland.', ru: 'Получите признание вашего медицинского диплома в Германии.', ky: 'Медициналык дипломуңузду Германияда тааныткылаңыз.' },

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
    ru: 'Практика и стажировка в Европе',
    ky: 'Европада практика жана стажировка',
  },
  'hero.subtitle': {
    en: 'We make it easy and reliable to hire skilled interns and employees from abroad, so your business can grow and thrive.',
    da: 'Vi gør det nemt og pålideligt at ansætte dygtige praktikanter og medarbejdere fra udlandet, så din virksomhed kan vokse og trives.',
    ru: 'Nordic Nomad Group помогает талантливым и ответственным студентам из Кыргызстана найти практику в Дании',
    ky: 'Nordic Nomad Group Кыргызстандын талантуу жана жооптуу студенттерге Дания мамлекетинде практика табууга жардам берет',
  },
  'hero.stat_interns': {
    en: 'Interns placed', da: 'Praktikanter formidlet', ru: 'Практикантов устроено', ky: 'Практиканттар жайгаштырылды',
  },
  'hero.stat_years': {
    en: 'Years experience', da: 'Års erfaring', ru: 'Года опыта', ky: 'Жыл тажрыйба',
  },
  'hero.stat_legal': {
    en: 'Legal & compliant', da: 'Lovligt og korrekt', ru: 'Законно и прозрачно', ky: 'Мыйзамдуу',
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
  'about.title': {
    en: 'About Nordic Nomad Group',
    da: 'Om Nordic Nomad Group',
    ru: 'О Nordic Nomad Group',
    ky: 'Nordic Nomad Group жөнүндө',
  },
  'about.subtitle': {
    en: 'Nordic Nomad Group is a Denmark-registered recruitment agency (CVR: 44829363). We connect qualified, motivated interns from Kyrgyzstan with Danish farms and businesses. Our interns are aged 18-29, speak English, and are ready to work. We handle all documentation and coordination — making the hiring process simple and reliable for you.',
    da: 'Nordic Nomad Group er et dansk-registreret rekrutteringsbureau (CVR: 44829363). Vi forbinder kvalificerede, motiverede praktikanter fra Kirgisistan med danske gårde og virksomheder. Vores praktikanter er mellem 18-29 år, taler engelsk og er klar til at arbejde. Vi håndterer al dokumentation og koordinering.',
    ru: 'Мы — датское рекрутинговое агентство, которое помогает талантливым и трудолюбивым студентам в возрасте 18-29 лет из Кыргызстана найти практику и обучение в Европе.',
    ky: 'Биз — Кыргызстандан 18-29 жаштагы таланттуу жана эмгекчил студенттерге Европада стажировка жана окуу табууга жардам берген дания рекрутинг агенттиги.',
  },
  'about.mission_title': {
    en: 'Our mission',
    da: 'Vores mission',
    ru: 'Наша миссия',
    ky: 'Биздин миссия',
  },
  'about.mission': {
    en: 'Nordic Nomad Group was founded with a clear mission: to build a bridge between talented people from Kyrgyzstan and employers in Europe who need qualified, motivated workers. As a company registered in Denmark (CVR 44829363), we operate with full transparency and compliance with European standards. We believe that international mobility creates opportunities for both candidates and employers.',
    da: 'Nordic Nomad Group blev grundlagt med en klar mission: at bygge bro mellem talentfulde mennesker fra Kirgisistan og arbejdsgivere i Europa, der har brug for kvalificerede, motiverede medarbejdere. Som en virksomhed registreret i Danmark (CVR 44829363) arbejder vi med fuld gennemsigtighed og overholdelse af europæiske standarder. Vi tror på, at international mobilitet skaber muligheder for både kandidater og arbejdsgivere.',
    ru: 'Nordic Nomad Group была основана с чёткой миссией: создать мост между талантливыми людьми из Кыргызстана и работодателями в Европе, которым нужны квалифицированные, мотивированные работники. Как компания, зарегистрированная в Дании (CVR 44829363), мы работаем с полной прозрачностью и соблюдением европейских норм. Мы верим, что международная мобильность создаёт возможности для кандидатов и работодателей.',
    ky: 'Nordic Nomad Group так миссия менен негизделген: Кыргызстандагы таланттуу адамдар менен квалификациялуу, мотивациялуу жумушчуларга муктаж Европадагы иш берүүчүлөрдүн ортосунда көпүрө куруу. Данияда катталган компания катары (CVR 44829363) биз толук ачыктык жана европалык стандарттарга ылайык иштейбиз.',
  },
  'about.card1.title': {
    en: 'People first', da: 'Mennesker først', ru: 'Люди на первом месте', ky: 'Адамдар биринчи',
  },
  'about.card1.desc': {
    en: 'We treat every candidate with respect and individual attention.',
    da: 'Vi behandler hver kandidat med respekt og individuel opmærksomhed.',
    ru: 'К каждому кандидату мы относимся с уважением и индивидуальным вниманием.',
    ky: 'Ар бир талапкерге урмат жана жеке көңүл бурабыз.',
  },
  'about.card2.title': {
    en: 'Quality matching', da: 'Kvalitetsmatch', ru: 'Качественный подбор', ky: 'Сапаттуу тандоо',
  },
  'about.card2.desc': {
    en: 'We carefully match candidates to suitable positions.',
    da: 'Vi matcher omhyggeligt kandidater til passende stillinger.',
    ru: 'Мы тщательно подбираем кандидатов к подходящим вакансиям.',
    ky: 'Талапкерлерди ылайыктуу вакансияларга кылдаттык менен тандайбыз.',
  },
  'about.card3.title': {
    en: 'Full support', da: 'Fuld support', ru: 'Полная поддержка', ky: 'Толук колдоо',
  },
  'about.card3.desc': {
    en: 'From application to employment — we accompany you every step of the way.',
    da: 'Fra ansøgning til ansættelse — vi følger dig hele vejen.',
    ru: 'От заявки до трудоустройства — мы сопровождаем вас на каждом шагу.',
    ky: 'Арыздан жумушка орношууга чейин — ар бир кадамда коштойбуз.',
  },
  'about.card4.title': {
    en: 'Legal and transparent', da: 'Lovligt og gennemsigtigt', ru: 'Законно и прозрачно', ky: 'Мыйзамдуу жана ачык',
  },
  'about.card4.desc': {
    en: 'All placements are fully legal and compliant with regulations.',
    da: 'Alle ansættelser er fuldt lovlige og overholder reglerne.',
    ru: 'Все трудоустройства полностью законны и соответствуют нормам.',
    ky: 'Бардык жумушка орноштуруулар толугу менен мыйзамдуу.',
  },
  'about.cert_registered': {
    en: 'Officially registered in Denmark since 01.07.2024',
    da: 'Officielt registreret i Danmark siden 01.07.2024',
    ru: 'Официально зарегистрирована в Дании с 01.07.2024',
    ky: 'Дания мамлекетинде 01.07.2024-жылдан расмий катталган',
  },
  'about.cert_view': {
    en: '👁️ View Certificate',
    da: '👁️ Se certifikat',
    ru: '👁️ Посмотреть свидетельство',
    ky: '👁️ Күбөлүктү көрүү',
  },
  'about.cert_download': {
    en: '⬇️ Download',
    da: '⬇️ Download',
    ru: '⬇️ Скачать',
    ky: '⬇️ Жүктөп алуу',
  },

  // Why choose
  'why.title': { en: 'Why choose Nordic Nomad Group?', da: 'Hvorfor vælge Nordic Nomad Group?', ru: 'Почему Nordic Nomad Group?', ky: 'Эмне үчүн Nordic Nomad Group?' },
  'why.desc': {
    en: 'We recommend suitable, highly motivated and responsible interns from Kyrgyzstan for Danish farm businesses. We handle all administrative processes so you can focus on your farm.',
    da: 'Vi anbefaler egnede, højt motiverede og ansvarlige praktikanter fra Kirgisistan til danske landbrugsvirksomheder. Vi håndterer alle administrative processer, så du kan fokusere på din gård.',
    ru: 'Мы рекомендуем подходящих, высоко мотивированных и ответственных практикантов из Кыргызстана для датских фермерских предприятий. Мы берём на себя все административные процессы.',
    ky: 'Биз Кыргызстандан ылайыктуу, мотивациялуу жана жоопкерчиликтүү практиканттарды Дания фермерлик ишканаларына сунуштайбыз. Бардык административдик процесстерди биз аткарабыз.',
  },

  'why1.title': { en: '2 years of experience', da: '2 års erfaring', ru: '2 года опыта', ky: '2 жыл тажрыйба' },
  'why1.desc': {
    en: 'For 2 years we have been successfully placing motivated interns from Kyrgyzstan on Danish farms, building trust with our partners.',
    da: 'I 2 år har vi med succes formidlet motiverede praktikanter fra Kirgisistan til danske gårde og opbygget tillid hos vores partnere.',
    ru: 'Уже 2 года мы успешно размещаем мотивированных практикантов из Кыргызстана на датских фермах, строя доверие с нашими партнёрами.',
    ky: '2 жылдан бери Кыргызстандан мотивациялуу практиканттарды Дания фермаларына ийгиликтүү жайгаштырып, өнөктөштөр менен ишеним курабыз.',
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

  // Founder
  'founder.label': { en: 'Leadership', da: 'Ledelse', ru: 'Руководство', ky: 'Жетекчилик' },
  'founder.title': { en: 'Meet our Founder', da: 'Mød vores grundlægger', ru: 'Наш основатель', ky: 'Биздин негиздөөчү' },
  'founder.role': { en: 'CEO & Founder', da: 'CEO & Grundlægger', ru: 'CEO и основатель', ky: 'CEO жана негиздөөчү' },
  'founder.bio': {
    en: 'Tahmina founded Nordic Nomad Group with a clear vision: to bridge the gap between talented professionals from Central Asia and European companies in need of dedicated, skilled workforce. With deep expertise in international recruitment and cross-cultural management, she leads the company with a hands-on approach — ensuring every candidate and partner receives personal, transparent, and reliable support throughout the entire process.',
    da: 'Tahmina grundlagde Nordic Nomad Group med en klar vision: at bygge bro mellem talentfulde fagfolk fra Centralasien og europæiske virksomheder, der har brug for en dedikeret og dygtig arbejdsstyrke. Med dyb ekspertise inden for international rekruttering og tværkulturel ledelse leder hun virksomheden med en praktisk tilgang — og sikrer, at hver kandidat og partner modtager personlig, gennemsigtig og pålidelig støtte gennem hele processen.',
    ru: 'Тахмина основала Nordic Nomad Group с ясной целью: соединить талантливых специалистов из Центральной Азии с европейскими компаниями, нуждающимися в квалифицированных сотрудниках. Обладая глубокой экспертизой в международном рекрутинге и межкультурном управлении, она руководит компанией лично — обеспечивая каждому кандидату и партнёру прозрачную и надёжную поддержку на всех этапах.',
    ky: 'Тахмина Nordic Nomad Group компаниясын так максат менен негиздеген: Борбордук Азиядагы таланттуу адистерди квалификациялуу кызматкерлерге муктаж Европа компаниялары менен байланыштыруу. Эл аралык рекрутинг жана маданияттар аралык башкаруу боюнча терең тажрыйбасы менен, ал компанияны жеке башкарат — ар бир талапкерге жана өнөктөшкө бардык этаптарда ачык жана ишенимдүү колдоо көрсөтөт.',
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

  // How it works
  'nav.howitworks': { en: 'How it works', da: 'Sådan fungerer det', ru: 'Как это работает', ky: 'Кантип иштейт' },
  'hiw.label': { en: 'Process', da: 'Proces', ru: 'Процесс', ky: 'Процесс' },
  'hiw.title': { en: 'How it works', da: 'Sådan fungerer det', ru: 'Как это работает', ky: 'Кантип иштейт' },
  'hiw.desc': {
    en: 'Whether you are an applicant or a company — here is the step-by-step process from start to finish.',
    da: 'Uanset om du er ansøger eller virksomhed — her er processen trin for trin.',
    ru: 'Независимо от того, кандидат вы или компания — вот пошаговый процесс от начала до конца.',
    ky: 'Талапкер болсоңуз да, компания болсоңуз да — башынан аягына чейинки процесс.',
  },
  'hiw.a.title': { en: 'For Applicants', da: 'For ansøgere', ru: 'Для кандидатов', ky: 'Талапкерлер үчүн' },
  'hiw.a.step1': { en: 'Submit your application online', da: 'Indsend din ansøgning online', ru: 'Подайте заявку онлайн', ky: 'Арызды онлайн жөнөтүңүз' },
  'hiw.a.step2': { en: 'We review and select candidates', da: 'Vi gennemgår og udvælger kandidater', ru: 'Мы рассматриваем и отбираем кандидатов', ky: 'Биз талапкерлерди карап, тандайбыз' },
  'hiw.a.step3': { en: 'Online interview with our team', da: 'Online interview med vores team', ru: 'Онлайн-собеседование с нашей командой', ky: 'Биздин команда менен онлайн-интервью' },
  'hiw.a.step4': { en: 'Matching with a suitable employer', da: 'Matching med en passende arbejdsgiver', ru: 'Подбор подходящего работодателя', ky: 'Ылайыктуу иш берүүчүгө дал келтирүү' },
  'hiw.a.step5': { en: 'Visa & work permit processing', da: 'Visum & arbejdstilladelse', ru: 'Оформление визы и разрешения на работу', ky: 'Виза жана жумуш уруксатын тариздөө' },
  'hiw.a.step6': { en: 'Arrival and onboarding in Europe', da: 'Ankomst og onboarding i Europa', ru: 'Приезд и адаптация в Европе', ky: 'Европага келүү жана адаптация' },
  'hiw.a.step7': { en: 'Start working and growing!', da: 'Begynd at arbejde og vækste!', ru: 'Начинайте работать и развиваться!', ky: 'Иштеп баштаңыз жана өсүңүз!' },
  'hiw.c.title': { en: 'For Companies', da: 'For virksomheder', ru: 'Для компаний', ky: 'Компаниялар үчүн' },
  'hiw.c.step1': { en: 'Send us your staffing request', da: 'Send os din bemandingsanmodning', ru: 'Отправьте нам запрос на персонал', ky: 'Бизге кадрлар боюнча суроо-талап жөнөтүңүз' },
  'hiw.c.step2': { en: 'We select the best candidates for you', da: 'Vi udvælger de bedste kandidater til dig', ru: 'Мы подберём лучших кандидатов для вас', ky: 'Биз сиз үчүн мыкты талапкерлерди тандайбыз' },
  'hiw.c.step3': { en: 'Review profiles and approve matches', da: 'Gennemgå profiler og godkend match', ru: 'Просмотрите профили и подтвердите выбор', ky: 'Профилдерди карап, тандоону бекитиңиз' },
  'hiw.c.step4': { en: 'We handle all documentation & permits', da: 'Vi håndterer al dokumentation & tilladelser', ru: 'Мы оформляем все документы и разрешения', ky: 'Биз бардык документтерди жана уруксаттарды тариздейбиз' },
  'hiw.c.step5': { en: 'Candidate arrives and starts working', da: 'Kandidaten ankommer og begynder at arbejde', ru: 'Кандидат приезжает и начинает работу', ky: 'Талапкер келип, иштей баштайт' },
  'hiw.c.step6': { en: 'Ongoing support from our team', da: 'Løbende support fra vores team', ru: 'Постоянная поддержка от нашей команды', ky: 'Биздин командадан үзгүлтүксүз колдоо' },
  'hiw.a.cta': { en: 'Apply now', da: 'Ansøg nu', ru: 'Подать заявку', ky: 'Арыз берүү' },
  'hiw.c.cta': { en: 'Request staff', da: 'Anmod om personale', ru: 'Запросить персонал', ky: 'Кадр суроо' },

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
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem('app-lang');
    return (saved === 'en' || saved === 'da' || saved === 'ru' || saved === 'ky') ? saved : 'da';
  });
  const isCyrillic = lang === 'ru' || lang === 'ky';

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem('app-lang', newLang);
  };

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
  if (!ctx) {
    // Fallback for HMR edge cases — return safe defaults
    return {
      lang: 'en' as Lang,
      setLang: (() => {}) as (l: Lang) => void,
      t: (key: string) => key,
      isCyrillic: false,
    };
  }
  return ctx;
};

export const languages: { code: Lang; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'da', label: 'Dansk' },
  { code: 'ru', label: 'Русский' },
  { code: 'ky', label: 'Кыргызча' },
];
