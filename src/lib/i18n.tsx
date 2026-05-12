// i18n provider - internationalization context
import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "da" | "en" | "ky" | "ru";

type Translations = Record<string, Record<Lang, string>>;

const t: Translations = {
  // Candidates page
  "candidates.title": {
    en: "Browse Available Interns for Your Farm",
    da: "Gennemse tilgængelige praktikanter til din gård",
    ru: "",
    ky: "",
  },
  "candidates.desc": {
    en: "Discover qualified, motivated young people from Kyrgyzstan ready to work on your farm. All candidates speak English and have a genuine interest in agriculture. Select the ones you like and send us an inquiry.",
    da: "Mød kvalificerede, motiverede unge fra Kirgisistan, der er klar til at arbejde på din gård. Alle kandidater taler engelsk og har en ægte interesse i landbrug.",
    ru: "",
    ky: "",
  },
  "candidates.count": {
    en: "Available Interns",
    da: "Tilgængelige praktikanter",
    ru: "",
    ky: "",
  },

  // Nav
  "nav.about": { en: "About us", da: "Om os", ru: "О нас", ky: "Биз жөнүндө" },
  "nav.services": {
    en: "Candidate Profiles",
    da: "Kandidatprofiler",
    ru: "Candidate Profiles",
    ky: "Candidate Profiles",
  },
  "nav.faq": { en: "FAQ", da: "FAQ", ru: "Вопросы", ky: "Суроолор" },
  "nav.contact": { en: "Contact us", da: "Kontakt os", ru: "Контакты", ky: "Байланыш" },
  "nav.privacy": { en: "Privacy policy", da: "Privatlivspolitik", ru: "Политика конф.", ky: "Купуялуулук" },
  "nav.candidates": { en: "See candidates", da: "Se kandidater", ru: "Кандидаты", ky: "Талапкерлер" },
  "nav.order": {
    en: "Order intern/employee",
    da: "Bestil praktikant/medarbejder",
    ru: "Заказать стажёра",
    ky: "Стажёр заказдоо",
  },
  "nav.programs": { en: "Programs", da: "Programmer", ru: "Программы", ky: "Программалар" },
  "program.agriculture": {
    en: "Agricultural Internship – Denmark",
    da: "Landbrugspraktik – Danmark",
    ru: "Сельскохозяйственная стажировка – Дания",
    ky: "Айыл чарба стажировкасы – Дания",
  },
  "program.ausbildung": {
    en: "Ausbildung – Germany",
    da: "Ausbildung – Tyskland",
    ru: "Аусбильдунг – Германия",
    ky: "Аусбильдунг – Германия",
  },
  "program.medical": {
    en: "Medical Diploma Recognition – Germany",
    da: "Medicinsk diplomgodkendelse – Tyskland",
    ru: "Признание медицинского диплома – Германия",
    ky: "Медициналык дипломду таануу – Германия",
  },
  "program.agriculture.title": {
    en: "Agricultural Internship – Denmark",
    da: "Landbrugspraktik – Danmark",
    ru: "Сельскохозяйственная стажировка – Дания",
    ky: "Айыл чарба стажировкасы – Дания",
  },
  "program.agriculture.desc": {
    en: "Learn about our agricultural internship program in Denmark.",
    da: "Lær mere om vores landbrugspraktikprogram i Danmark.",
    ru: "Узнайте о нашей программе сельскохозяйственной стажировки в Дании.",
    ky: "Данияда айыл чарба стажировкасы программабыз жөнүндө билиңиз.",
  },
  "program.ausbildung.title": {
    en: "Ausbildung – Germany",
    da: "Ausbildung – Tyskland",
    ru: "Аусбильдунг – Германия",
    ky: "Аусбильдунг – Германия",
  },
  "program.ausbildung.desc": {
    en: "Explore vocational training opportunities in Germany.",
    da: "Udforsk erhvervsuddannelsesmuligheder i Tyskland.",
    ru: "Откройте возможности профессионального обучения в Германии.",
    ky: "Германиядагы кесиптик окуу мүмкүнчүлүктөрүн изилдеңиз.",
  },
  "program.medical.title": {
    en: "Medical Diploma Recognition – Germany",
    da: "Medicinsk diplomgodkendelse – Tyskland",
    ru: "Признание медицинского диплома – Германия",
    ky: "Медициналык дипломду таануу – Германия",
  },
  "program.medical.desc": {
    en: "Get your medical diploma recognized in Germany.",
    da: "Få dit medicinske diplom anerkendt i Tyskland.",
    ru: "Получите признание вашего медицинского диплома в Германии.",
    ky: "Медициналык дипломуңузду Германияда тааныткылаңыз.",
  },

  // Hero
  "hero.tagline": {
    en: "We help find interns for your company",
    da: "Vi hjælper med at finde praktikanter til din virksomhed",
    ru: "Мы помогаем найти стажёров для вашей компании",
    ky: "Биз сиздин компанияңызга стажёрлорду табууга жардам беребиз",
  },
  "hero.title": {
    en: "Optimize your business with workforce from Kyrgyzstan",
    da: "Optimer din virksomhed med arbejdskraft fra Kirgisistan",
    ru: "Твой путь в Данию начинается здесь",
    ky: "Данияга жолуңуз ушул жерден башталат",
  },
  "hero.subtitle": {
    en: "We connect you with motivated and skilled interns, making international hiring simple and reliable.",
    da: "Vi forbinder dig med motiverede og dygtige praktikanter og gør international ansættelse enkel og pålidelig.",
    ru: "Мы помогаем студентам из Кыргызстана пройти официальную сельскохозяйственную стажировку в Дании — с контрактом, визой и поддержкой на каждом шагу.",
    ky: "Биз Кыргызстандан студенттерге Данияда расмий айыл чарба стажировкасынан өтүүгө жардам берем — контракт, виза жана ар бир кадамда колдоо менен.",
  },
  "hero.service1": {
    en: "✔ Consulting & Coordination Service",
    da: "✔ Konsulentservice & koordinering",
    ru: "",
    ky: "",
  },
  "hero.service2": { en: "✔ International Placement Support", da: "✔ International formidlingsstøtte", ru: "", ky: "" },
  "hero.service3": { en: "✔ Trainee Placement Assistance", da: "✔ Praktikantstøtte", ru: "", ky: "" },
  "hero.stat_interns": {
    en: "Interns placed",
    da: "Praktikanter formidlet",
    ru: "Практикантов устроено",
    ky: "Практиканттар жайгаштырылды",
  },
  "hero.stat_years": {
    en: "Years experience",
    da: "Års erfaring",
    ru: "Года опыта",
    ky: "Жыл тажрыйба",
  },
  "hero.stat_legal": {
    en: "Legal & compliant",
    da: "Lovligt og korrekt",
    ru: "Законно и прозрачно",
    ky: "Мыйзамдуу",
  },

  // Service cards
  "service1.title": {
    en: "Available employees",
    da: "Ledige medarbejdere",
    ru: "Доступные сотрудники",
    ky: "Жеткиликтүү кызматкерлер",
  },
  "service1.desc": {
    en: "Do you need an experienced feed master or employee for your farm to help with daily tasks?",
    da: "Har du brug for en erfaren fodermester eller medarbejder til dit landbrug til at hjælpe med daglige opgaver?",
    ru: "Вам нужен опытный кормомастер или сотрудник для вашей фермы?",
    ky: "Күнүмдүк иштерге жардам берүү үчүн тажрыйбалуу тоютчу же кызматкер керекпи?",
  },
  "service1.link": {
    en: "See our current candidates",
    da: "Se vores aktuelle kandidater",
    ru: "Смотреть кандидатов",
    ky: "Талапкерлерди көрүү",
  },
  "service1.link2": {
    en: "Read more about our services",
    da: "Læs mere om vores ydelser",
    ru: "Подробнее об услугах",
    ky: "Кызматтар жөнүндө",
  },

  "service2.title": {
    en: "Order an intern or feed master",
    da: "Bestil en praktikant eller fodermester",
    ru: "Заказать стажёра или кормомастера",
    ky: "Стажёр же тоютчу заказдоо",
  },
  "service2.desc": {
    en: "Fill out the form and we will contact you as soon as possible with our best candidates for your farm.",
    da: "Udfyld formularen og vi kontakter dig hurtigst muligt med vores bud på de bedste kandidater til dit landbrug.",
    ru: "Заполните форму, и мы свяжемся с вами с лучшими кандидатами для вашей фермы.",
    ky: "Форманы толтуруңуз, биз сизге фермаңыз үчүн мыкты талапкерлерди сунуштайбыз.",
  },
  "service2.link": {
    en: "Fill out the form here",
    da: "Udfyld formularen her",
    ru: "Заполнить форму",
    ky: "Форманы толтуруу",
  },

  "service3.title": {
    en: "Help with work permit application",
    da: "Hjælp til ansøgning om arbejdstilladelse",
    ru: "Помощь с рабочим разрешением",
    ky: "Жумуш уруксаты боюнча жардам",
  },
  "service3.desc": {
    en: "Do you have employees who need to apply for or extend their residence and work permit?",
    da: "Har du medarbejdere som skal søge/forlænge deres opholds- og arbejdstilladelse?",
    ru: "Есть ли у вас сотрудники, которым нужно подать заявку на разрешение на работу?",
    ky: "Жашоо жана жумуш уруксатын алуу/узартуу керек болгон кызматкерлериңиз барбы?",
  },
  "service3.link": { en: "Read more here", da: "Læs mere her", ru: "Подробнее", ky: "Толугураак" },

  // About section
  "about.title": {
    en: "About Nordic Nomad Group",
    da: "Om Nordic Nomad Group",
    ru: "О Nordic Nomad Group",
    ky: "Nordic Nomad Group жөнүндө",
  },
  "about.subtitle": {
    en: "Nordic Nomad Group is a Denmark-registered consulting and coordination company (CVR: 44829363). We connect qualified, motivated interns from Kyrgyzstan with Danish farms. We handle all documentation and coordination — making the process simple and reliable for you.",
    da: "Nordic Nomad Group er et dansk-registreret konsulent- og koordineringsfirma (CVR: 44829363). Vi forbinder kvalificerede, motiverede praktikanter fra Kirgisistan med danske gårde. Vi håndterer al dokumentation og koordinering.",
    ru: "Мы — датская консультационная компания, которая помогает студентам 18–29 лет из Кыргызстана пройти официальную стажировку на фермах Дании.",
    ky: "Биз — Кыргызстандан 18–29 жаштагы студенттерге Дания фермаларында расмий стажировкадан өтүүгө жардам берген дания консалтинг компаниясы.",
  },
  "about.mission_title": {
    en: "Our mission",
    da: "Vores mission",
    ru: "Наша миссия",
    ky: "Биздин миссия",
  },
  "about.mission": {
    en: "Nordic Nomad Group was founded to connect Danish farms and businesses with qualified, motivated interns from Kyrgyzstan. As a Denmark-registered company (CVR 44829363), we operate with full transparency and compliance with European standards. We handle everything — so you can focus on your farm.",
    da: "Nordic Nomad Group blev grundlagt for at forbinde danske gårde og virksomheder med kvalificerede, motiverede praktikanter fra Kirgisistan. Som en dansk-registreret virksomhed (CVR 44829363) arbejder vi med fuld gennemsigtighed. Vi håndterer alt — så du kan fokusere på din gård.",
    ru: "Nordic Nomad Group была основана с чёткой миссией: создать мост между талантливыми людьми из Кыргызстана и работодателями в Европе, которым нужны квалифицированные, мотивированные работники. Как компания, зарегистрированная в Дании (CVR 44829363), мы работаем с полной прозрачностью и соблюдением европейских норм. Мы верим, что международная мобильность создаёт возможности для кандидатов и работодателей.",
    ky: "Nordic Nomad Group так миссия менен негизделген: Кыргызстандагы таланттуу адамдар менен квалификациялуу, мотивациялуу жумушчуларга муктаж Европадагы иш берүүчүлөрдүн ортосунда көпүрө куруу. Данияда катталган компания катары (CVR 44829363) биз толук ачыктык жана европалык стандарттарга ылайык иштейбиз.",
  },
  "about.card1.title": {
    en: "Dedicated interns",
    da: "Dedikerede praktikanter",
    ru: "Люди на первом месте",
    ky: "Адамдар биринчи",
  },
  "about.card1.desc": {
    en: "We carefully select only motivated and responsible interns for your farm.",
    da: "Vi udvælger omhyggeligt kun motiverede og ansvarlige praktikanter til din gård.",
    ru: "К каждому кандидату мы относимся с уважением и индивидуальным вниманием.",
    ky: "Ар бир талапкерге урмат жана жеке көңүл бурабыз.",
  },
  "about.card2.title": {
    en: "Full documentation",
    da: "Fuld dokumentation",
    ru: "Качественный подбор",
    ky: "Сапаттуу тандоо",
  },
  "about.card2.desc": {
    en: "We handle all paperwork and administrative processes for you.",
    da: "Vi håndterer al dokumentation og alle administrative processer for dig.",
    ru: "Мы тщательно подбираем кандидатов к подходящим вакансиям.",
    ky: "Талапкерлерди ылайыктуу вакансияларга кылдаттык менен тандайбыз.",
  },
  "about.card3.title": {
    en: "Ongoing support",
    da: "Løbende support",
    ru: "Полная поддержка",
    ky: "Толук колдоо",
  },
  "about.card3.desc": {
    en: "We stay in contact throughout the entire internship period.",
    da: "Vi holder kontakt gennem hele praktikperioden.",
    ru: "От заявки до трудоустройства — мы сопровождаем вас на каждом шагу.",
    ky: "Арыздан жумушка орношууга чейин — ар бир кадамда коштойбуз.",
  },
  "about.card4.title": {
    en: "Legal & transparent",
    da: "Lovligt og gennemsigtigt",
    ru: "Законно и прозрачно",
    ky: "Мыйзамдуу жана ачык",
  },
  "about.card4.desc": {
    en: "All placements are fully legal and compliant with Danish regulations.",
    da: "Alle ansættelser er fuldt lovlige og overholder dansk lovgivning.",
    ru: "Все трудоустройства полностью законны и соответствуют нормам.",
    ky: "Бардык жумушка орноштуруулар толугу менен мыйзамдуу.",
  },
  "about.cert_registered": {
    en: "Officially registered in Denmark since 01.07.2024",
    da: "Officielt registreret i Danmark siden 01.07.2024",
    ru: "Официально зарегистрирована в Дании с 01.07.2024",
    ky: "Дания мамлекетинде 01.07.2024-жылдан расмий катталган",
  },
  "about.cert_view": {
    en: "👁️ View Certificate",
    da: "👁️ Se certifikat",
    ru: "👁️ Посмотреть свидетельство",
    ky: "👁️ Күбөлүктү көрүү",
  },
  "about.cert_download": {
    en: "⬇️ Download",
    da: "⬇️ Download",
    ru: "⬇️ Скачать",
    ky: "⬇️ Жүктөп алуу",
  },

  // Why choose
  "why.title": {
    en: "Why choose Nordic Nomad Group?",
    da: "Hvorfor vælge Nordic Nomad Group?",
    ru: "Почему Nordic Nomad Group?",
    ky: "Эмне үчүн Nordic Nomad Group?",
  },
  "why.desc": {
    en: "We recommend suitable, highly motivated and responsible interns from Kyrgyzstan for Danish farm businesses. We handle all administrative processes so you can focus on your farm.",
    da: "Vi anbefaler egnede, højt motiverede og ansvarlige praktikanter fra Kirgisistan til danske landbrugsvirksomheder. Vi håndterer alle administrative processer, så du kan fokusere på din gård.",
    ru: "Мы рекомендуем подходящих, высоко мотивированных и ответственных практикантов из Кыргызстана для датских фермерских предприятий. Мы берём на себя все административные процессы.",
    ky: "Биз Кыргызстандан ылайыктуу, мотивациялуу жана жоопкерчиликтүү практиканттарды Дания фермерлик ишканаларына сунуштайбыз. Бардык административдик процесстерди биз аткарабыз.",
  },

  "why1.title": {
    en: "2 years of experience",
    da: "2 års erfaring",
    ru: "Мы рядом на каждом шагу",
    ky: "Ар бир кадамда жаныңыздабыз",
  },
  "why1.desc": {
    en: "For 2 years we have successfully placed motivated interns from Kyrgyzstan on Danish farms. Our partners trust us.",
    da: "I 2 år har vi med succes formidlet motiverede praktikanter fra Kirgisistan til danske gårde. Vores partnere stoler på os.",
    ru: "Мы сопровождаем вас от подачи заявки до отъезда в Данию — консультируем, объясняем и направляем на каждом этапе.",
    ky: "Арыз берүүдөн Данияга чейин — консультация берип, түшүндүрүп, ар бир кадамда жол көрсөтөбүз.",
  },
  "why2.title": {
    en: "Extra hands for your farm",
    da: "Ekstra hænder til din gård",
    ru: "Помощь с документами",
    ky: "Документтер боюнча жол көрсөтүү",
  },
  "why2.desc": {
    en: "Get reliable, hard-working interns to increase productivity on your farm. We handle all the paperwork.",
    da: "Få pålidelige, arbejdsomme praktikanter til at øge produktiviteten. Vi klarer al dokumentationen.",
    ru: "Мы объясняем какие документы нужны, как их правильно подготовить и куда подать.",
    ky: "Кандай документтер керек экенин, аларды кантип даярдоону жана кайда тапшырууну жол көрсөтөбүз.",
  },
  "why3.title": {
    en: "Ongoing contact & support",
    da: "Løbende kontakt & support",
    ru: "Законно и прозрачно",
    ky: "Мыйзамдуу жана ачык",
  },
  "why3.desc": {
    en: "We stay in contact with you and the intern throughout the entire placement period. You are never alone.",
    da: "Vi holder kontakt med dig og praktikanten gennem hele perioden. Du er aldrig alene.",
    ru: "Мы работаем официально. Окончательное решение принимает SIRI — мы честно информируем вас о каждом шаге.",
    ky: "Биз расмий иштейбиз. Акыркы чечимди SIRI кабыл алат — ар бир кадам жөнүндө чынчылдык менен жол көрсөтөбүз.",
  },

  // Founder
  "founder.label": { en: "Leadership", da: "Ledelse", ru: "Руководство", ky: "Жетекчилик" },
  "founder.title": {
    en: "Meet our Founder",
    da: "Mød vores grundlægger",
    ru: "Наш основатель",
    ky: "Биздин негиздөөчү",
  },
  "founder.role": { en: "CEO & Founder", da: "CEO & Grundlægger", ru: "CEO и основатель", ky: "CEO жана негиздөөчү" },
  "founder.name": {
    en: "Takhmina Islambek kyzy",
    da: "Takhmina Islambek kyzy",
    ru: "Тахмина Исламбек кызы",
    ky: "Тахмина Исламбек кызы",
  },
  "founder.bio": {
    en: "Takhmina founded Nordic Nomad Group with one mission: to make international hiring simple and reliable for Danish farms. Born in Kyrgyzstan and living in Denmark, she personally understands both sides. Fluent in 5 languages — Kyrgyz, Russian, English, Turkish and Danish — she ensures every partnership runs smoothly and professionally.",
    da: "Takhmina grundlagde Nordic Nomad Group med ét mål: at gøre international ansættelse enkel og pålidelig for danske gårde. Født i Kirgisistan og bosiddende i Danmark forstår hun personligt begge sider. Hun taler 5 sprog — og sikrer, at hvert samarbejde forløber professionelt og gnidningsfrit.",
    ru: "Тахмина основала Nordic Nomad Group с одной миссией: создать законный и надёжный путь для кыргызских студентов работать и учиться в Дании. Родившись в Кыргызстане и живя в Дании, она лично соединяет два мира. Владея 5 языками — кыргызским, русским, английским, турецким и датским — она ведёт каждое дело с прозрачностью и преданностью.",
    ky: "Тахмина Nordic Nomad Group компаниясын бир максат менен негиздеген: кыргыз студенттери үчүн Данияда мыйзамдуу жана ишенимдүү жол түзүү. Кыргызстанда туулуп, Данияда жашап, ал эки дүйнөнү жеке байланыштырат. 5 тилди билет — кыргыз, орус, англис, түрк жана дат — ар бир ишти ачыктык жана берилгендик менен жүргүзөт.",
  },

  // Contact
  "contact.title": { en: "Contact us", da: "Kontakt os", ru: "Свяжитесь с нами", ky: "Биз менен байланышыңыз" },
  "contact.desc": {
    en: "Do you have questions, or would you like to explore your options for hiring a new employee? Call us, or fill out the form.",
    da: "Har du spørgsmål, eller vil du undersøge dine muligheder for ansættelse af en ny medarbejder? Ring, eller udfyld formularen.",
    ru: "У вас есть вопросы или вы хотите изучить возможности найма? Позвоните или заполните форму.",
    ky: "Суроолоруңуз барбы же жаңы кызматкер жалдоо мүмкүнчүлүктөрүн изилдегиңиз келеби? Чалыңыз же форманы толтуруңуз.",
  },
  "contact.phone_hours": {
    en: "Phone hours Mon-Fri: 09:00 - 15:00",
    da: "Telefontid Man-Fre: 09.00 - 15.00",
    ru: "Время звонков Пн-Пт: 09:00 - 15:00",
    ky: "Чалуу убактысы Дш-Жм: 09:00 - 15:00",
  },
  "contact.response": {
    en: "We will contact you as soon as possible",
    da: "Vi kontakter dig hurtigst muligt",
    ru: "Мы свяжемся с вами как можно скорее",
    ky: "Биз сиз менен мүмкүн болушунча тезирээк байланышабыз",
  },
  "contact.name": { en: "Name", da: "Navn", ru: "Имя", ky: "Аты-жөнү" },
  "contact.email": { en: "Email", da: "Email", ru: "Эл. почта", ky: "Эл. почта" },
  "contact.message": { en: "Message", da: "Besked", ru: "Сообщение", ky: "Билдирүү" },
  "contact.consent": {
    en: "Yes, I give permission for data to be stored and handled",
    da: "Ja, jeg giver tilladelse til at data bliver gemt og håndteret",
    ru: "Да, я даю разрешение на хранение и обработку данных",
    ky: "Ооба, маалыматтарды сактоого жана иштетүүге уруксат берем",
  },
  "contact.send": { en: "Send message", da: "Send besked", ru: "Отправить", ky: "Жөнөтүү" },
  "contact.success": {
    en: "We will call you within 24 hours",
    da: "Vi ringer dig inden for 24 timer",
    ru: "Мы позвоним вам в течение 24 часов",
    ky: "Биз 24 сааттын ичинде чалабыз",
  },

  // Footer
  "footer.rights": {
    en: "All rights reserved.",
    da: "Alle rettigheder forbeholdes.",
    ru: "Все права защищены.",
    ky: "Бардык укуктар корголгон.",
  },
  "footer.services_link": { en: "Our services", da: "Vores ydelser", ru: "Наши услуги", ky: "Биздин кызматтар" },

  // How it works
  "nav.howitworks": { en: "How it works", da: "Sådan fungerer det", ru: "Как это работает", ky: "Кантип иштейт" },
  "hiw.label": { en: "Process", da: "Proces", ru: "Процесс", ky: "Процесс" },
  "hiw.title": { en: "How it works", da: "Sådan fungerer det", ru: "Как это работает", ky: "Кантип иштейт" },
  "hiw.desc": {
    en: "Whether you are an applicant or a company — here is the step-by-step process from start to finish.",
    da: "Uanset om du er ansøger eller virksomhed — her er processen trin for trin.",
    ru: "Независимо от того, кандидат вы или компания — вот пошаговый процесс от начала до конца.",
    ky: "Талапкер болсоңуз да, компания болсоңуз да — башынан аягына чейинки процесс.",
  },
  "hiw.a.title": { en: "For Applicants", da: "For ansøgere", ru: "Для кандидатов", ky: "Талапкерлер үчүн" },
  "hiw.a.step1": {
    en: "Submit your application online",
    da: "Indsend din ansøgning online",
    ru: "Подайте заявку онлайн",
    ky: "Арызды онлайн жөнөтүңүз",
  },
  "hiw.a.step2": {
    en: "We review and select candidates",
    da: "Vi gennemgår og udvælger kandidater",
    ru: "Мы рассматриваем и отбираем кандидатов",
    ky: "Биз талапкерлерди карап, тандайбыз",
  },
  "hiw.a.step3": {
    en: "Online interview with our team",
    da: "Online interview med vores team",
    ru: "Онлайн-собеседование с нашей командой",
    ky: "Биздин команда менен онлайн-интервью",
  },
  "hiw.a.step4": {
    en: "Matching with a suitable employer",
    da: "Matching med en passende arbejdsgiver",
    ru: "Подбор подходящего работодателя",
    ky: "Ылайыктуу иш берүүчүгө дал келтирүү",
  },
  "hiw.a.step5": {
    en: "Visa & work permit processing",
    da: "Visum & arbejdstilladelse",
    ru: "Оформление визы и разрешения на работу",
    ky: "Виза жана жумуш уруксатын тариздөө",
  },
  "hiw.a.step6": {
    en: "Arrival and onboarding in Europe",
    da: "Ankomst og onboarding i Europa",
    ru: "Приезд и адаптация в Европе",
    ky: "Европага келүү жана адаптация",
  },
  "hiw.a.step7": {
    en: "Start working and growing!",
    da: "Begynd at arbejde og vækste!",
    ru: "Начинайте работать и развиваться!",
    ky: "Иштеп баштаңыз жана өсүңүз!",
  },
  "hiw.c.title": { en: "For Companies", da: "For virksomheder", ru: "Для компаний", ky: "Компаниялар үчүн" },
  "hiw.c.step1": {
    en: "Send us your staffing request",
    da: "Send os din bemandingsanmodning",
    ru: "Отправьте нам запрос на персонал",
    ky: "Бизге кадрлар боюнча суроо-талап жөнөтүңүз",
  },
  "hiw.c.step2": {
    en: "We select the best candidates for you",
    da: "Vi udvælger de bedste kandidater til dig",
    ru: "Мы подберём лучших кандидатов для вас",
    ky: "Биз сиз үчүн мыкты талапкерлерди тандайбыз",
  },
  "hiw.c.step3": {
    en: "Review profiles and approve matches",
    da: "Gennemgå profiler og godkend match",
    ru: "Просмотрите профили и подтвердите выбор",
    ky: "Профилдерди карап, тандоону бекитиңиз",
  },
  "hiw.c.step4": {
    en: "We handle all documentation & permits",
    da: "Vi håndterer al dokumentation & tilladelser",
    ru: "Мы оформляем все документы и разрешения",
    ky: "Биз бардык документтерди жана уруксаттарды тариздейбиз",
  },
  "hiw.c.step5": {
    en: "Candidate arrives and starts working",
    da: "Kandidaten ankommer og begynder at arbejde",
    ru: "Кандидат приезжает и начинает работу",
    ky: "Талапкер келип, иштей баштайт",
  },
  "hiw.c.step6": {
    en: "Ongoing support from our team",
    da: "Løbende support fra vores team",
    ru: "Постоянная поддержка от нашей команды",
    ky: "Биздин командадан үзгүлтүксүз колдоо",
  },
  "hiw.a.cta": { en: "Apply now", da: "Ansøg nu", ru: "Подать заявку", ky: "Арыз берүү" },
  "hiw.c.cta": { en: "Request staff", da: "Anmod om personale", ru: "Запросить персонал", ky: "Кадр суроо" },

  // Status bar
  "status.online": {
    en: "Consultants online now",
    da: "Konsulenter online nu",
    ru: "Консультанты онлайн",
    ky: "Консультанттар онлайн",
  },
  "status.response": {
    en: "Response time: < 2 hours",
    da: "Svartid: < 2 timer",
    ru: "Время ответа: < 2 часов",
    ky: "Жооп убактысы: < 2 саат",
  },
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
    const saved = localStorage.getItem("app-lang");
    return saved === "en" || saved === "da" || saved === "ru" || saved === "ky" ? saved : "da";
  });
  const isCyrillic = lang === "ru" || lang === "ky";

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("app-lang", newLang);
  };

  const translate = (key: string): string => {
    return t[key]?.[lang] || t[key]?.["en"] || key;
  };

  return <I18nContext.Provider value={{ lang, setLang, t: translate, isCyrillic }}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    // Fallback for HMR edge cases — return safe defaults
    return {
      lang: "en" as Lang,
      setLang: (() => {}) as (l: Lang) => void,
      t: (key: string) => key,
      isCyrillic: false,
    };
  }
  return ctx;
};

export const languages: { code: Lang; label: string; flag: string }[] = [
  { code: "da", label: "Dansk", flag: "🇩🇰" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ky", label: "Кыргызча", flag: "🇰🇬" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
];
