// Mock data for МоДелизМ Club prototype
export type ID = string;

export interface User {
  id: ID;
  name: string;
  city: string;
  interests: string;
  avatar: string;
  subscription?: "Тестовый" | "Месяц" | "Полгода" | "Год" | null;
}

export interface Comment {
  id: ID;
  authorId: ID;
  time: string;
  text: string;
  likes?: number;
  replies?: Comment[];
}

export interface Post {
  id: ID;
  authorId: ID;
  date: string;
  category: string;
  title: string;
  text: string;
  image?: string;
  images?: string[];
  tags?: string[];
  views?: number;
  likes: number;
  comments: number;
  saves?: number;
  reposts?: number;
  status?: "published" | "moderation";
  isFollowing?: boolean;
  commentList?: Comment[];
  repostedBy?: ID;
}

export type AdCondition = "Новое" | "Б/у — отлично" | "Б/у — хорошо" | "Под восстановление";

export interface AdSeller {
  id: ID;
  name: string;
  avatar: string;
  rating: number;
  deals: number;
  since: string;
}

export interface Ad {
  id: ID;
  title: string;
  price: number;
  category: string;
  subcategory: string;
  city: string;
  image: string;
  gallery?: string[];
  description?: string;
  delivery: string[];
  deliveryDetails?: string;
  condition?: AdCondition;
  status: "Продаю" | "Куплю" | "Обменяю";
  contact: string;
  authorId: ID;
  seller?: AdSeller;
  views?: number;
  likes?: number;
  createdAt?: string;
  moderation?: "published" | "moderation" | "rejected";
}

export interface Category {
  id: ID;
  name: string;
  description: string;
  icon: string; // lucide icon name
  members: number;
  subcategories: { id: ID; name: string }[];
}

export interface Community {
  id: ID;
  name: string;
  description: string;
  members: number;
  category: string;
  joined?: boolean;
}

export interface Banner {
  id: ID;
  title: string;
  text: string;
  cta: string;
  until: string;
  color: string;
}

export interface Tariff {
  id: ID;
  name: string;
  price: number;
  period: string;
  features: string[];
  popular?: boolean;
}

export interface Message {
  id: ID;
  authorId: ID;
  time: string;
  text: string;
}

export interface Dialog {
  id: ID;
  userId: ID;
  lastMessage: string;
  time: string;
  unread?: number;
  messages: Message[];
}

const avatar = (seed: string) =>
  `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(seed)}&backgroundColor=c8102e,1f2937,374151,6b7280`;

const photo = (id: number) =>
  `https://picsum.photos/seed/modelizm${id}/800/600`;

export const users: User[] = [
  { id: "u1", name: "Александр RC", city: "Краснодар", interests: "RC авто, ДВС 1:8", avatar: avatar("Александр RC"), subscription: "Год" },
  { id: "u2", name: "Сергей ДВС", city: "Москва", interests: "Двигатели, тюнинг", avatar: avatar("Сергей ДВС"), subscription: "Месяц" },
  { id: "u3", name: "Михаил Квадро", city: "Санкт-Петербург", interests: "FPV, квадрокоптеры", avatar: avatar("Михаил Квадро"), subscription: "Полгода" },
  { id: "u4", name: "Андрей Самолёты", city: "Новосибирск", interests: "Авиамодели, планеры", avatar: avatar("Андрей Самолёты"), subscription: null },
  { id: "u5", name: "Дмитрий Моделист", city: "Екатеринбург", interests: "Корабли, катера", avatar: avatar("Дмитрий Моделист"), subscription: "Тестовый" },
  { id: "u6", name: "Игорь Электрик", city: "Казань", interests: "Электроника, DIY", avatar: avatar("Игорь Электрик"), subscription: "Месяц" },
  { id: "u7", name: "Павел Самокат", city: "Сочи", interests: "Электросамокаты, моды", avatar: avatar("Павел Самокат"), subscription: null },
  { id: "u8", name: "Олег Разработчик", city: "Ростов-на-Дону", interests: "Автопилоты, прошивки", avatar: avatar("Олег Разработчик"), subscription: "Год" },
];

export const me: User = users[0];

export const categories: Category[] = [
  {
    id: "c1", name: "Автомодели", description: "RC авто всех масштабов", icon: "Car", members: 2840,
    subcategories: [
      { id: "s1", name: "Масштаб 1:5" },
      { id: "s2", name: "Масштаб 1:8" },
      { id: "s3", name: "Масштаб 1:10" },
      { id: "s4", name: "Масштаб 1:16" },
      { id: "s5", name: "ДВС" },
      { id: "s6", name: "Электро" },
      { id: "s7", name: "Тюнинг" },
      { id: "s8", name: "Запчасти" },
    ],
  },
  { id: "c2", name: "Самолёты", description: "Авиамодели и планеры", icon: "Plane", members: 1920, subcategories: [{ id: "s1", name: "Планеры" }, { id: "s2", name: "Пилотажки" }] },
  { id: "c3", name: "Корабли", description: "Катера и судомодели", icon: "Ship", members: 740, subcategories: [{ id: "s1", name: "Катера" }, { id: "s2", name: "Парусники" }] },
  { id: "c4", name: "Квадрокоптеры", description: "FPV, дроны, мультироторы", icon: "Send", members: 3180, subcategories: [{ id: "s1", name: "FPV" }, { id: "s2", name: "Съёмочные" }] },
  { id: "c5", name: "Электроника", description: "Платы, датчики, DIY", icon: "Cpu", members: 1450, subcategories: [{ id: "s1", name: "Контроллеры" }, { id: "s2", name: "Датчики" }] },
  { id: "c6", name: "Аккумуляторы", description: "LiPo, Li-ion, NiMH", icon: "BatteryCharging", members: 890, subcategories: [{ id: "s1", name: "LiPo" }, { id: "s2", name: "Li-ion" }] },
  { id: "c7", name: "Радиоаппаратура", description: "Пульты, приёмники", icon: "Radio", members: 1120, subcategories: [{ id: "s1", name: "Пульты" }, { id: "s2", name: "Приёмники" }] },
  { id: "c8", name: "Электросамокаты", description: "Самокаты и моды", icon: "Zap", members: 980, subcategories: [{ id: "s1", name: "Контроллеры" }, { id: "s2", name: "Моды" }] },
  { id: "c9", name: "Разработчики", description: "Прошивки, автопилоты", icon: "Code2", members: 540, subcategories: [{ id: "s1", name: "Автопилоты" }, { id: "s2", name: "Прошивки" }] },
  { id: "c10", name: "Запчасти", description: "Детали и комплектующие", icon: "Wrench", members: 2210, subcategories: [{ id: "s1", name: "Шасси" }, { id: "s2", name: "Моторы" }] },
];


const cmt = (id: string, authorId: ID, time: string, text: string, likes = 0, replies: Comment[] = []): Comment => ({ id, authorId, time, text, likes, replies });

export const posts: Post[] = [
  { id: "p1", authorId: "u1", date: "2 ч назад", category: "Автомодели", title: "Новый проект на шасси 1:8", text: "Собрал новый багги на базе HB Racing. Делюсь первыми впечатлениями от обкатки ДВС: на первых баках мотор работал стабильно, температура головы держалась в районе 110°C, что для нового двигателя — отличный показатель. После 4 баков перешёл на штатный режим и сразу заметил прирост отзывчивости.", image: photo(1), tags: ["ДВС", "1:8", "багги", "HBRacing"], views: 1240, likes: 42, comments: 3, saves: 18, reposts: 4, isFollowing: true, commentList: [
    cmt("c1", "u2", "1 ч назад", "Какую свечу ставил? У меня на той же голове перегревала.", 5, [
      cmt("c1r1", "u1", "55 мин назад", "OS A5, средняя. На нитро 25% — оптимально.", 2),
    ]),
    cmt("c2", "u4", "40 мин назад", "Красивый багги! Сколько весит в сборе?", 1),
    cmt("c3", "u6", "20 мин назад", "Поделись настройками иглы потом", 0),
  ] },
  { id: "p2", authorId: "u3", date: "4 ч назад", category: "Квадрокоптеры", title: "FPV полёт над лесом", text: "Снял красивое видео на 5-дюймовой раме с GoPro. Настройки PID наконец-то идеальные.", image: photo(2), tags: ["FPV", "5дюймов", "GoPro"], views: 3420, likes: 88, comments: 2, saves: 34, reposts: 9, isFollowing: true, commentList: [
    cmt("c1", "u6", "3 ч назад", "PID поделишься?", 3),
    cmt("c2", "u8", "2 ч назад", "Какая частота? 2.4 или 5.8?", 1),
  ] },
  { id: "p3", authorId: "u4", date: "вчера", category: "Самолёты", title: "Реставрация Як-52", text: "Восстанавливаю модель Як-52 в масштабе 1:6. Ищу комплект декалей.", image: photo(3), tags: ["Як52", "1:6", "реставрация"], views: 890, likes: 31, comments: 1, saves: 7, reposts: 2, commentList: [
    cmt("c1", "u5", "23 ч назад", "У меня остался комплект, напиши в личку", 4),
  ] },
  { id: "p4", authorId: "u2", date: "вчера", category: "Запчасти", title: "Обзор нового мотора Castle 1717", text: "Поставил на дрэгстер. Отдача — космос. Подробности в посте.", image: photo(4), tags: ["Castle", "дрэгстер", "мотор"], views: 1560, likes: 56, comments: 2, saves: 22, reposts: 6, isFollowing: true, commentList: [
    cmt("c1", "u1", "20 ч назад", "Какой ESC использовал?", 2),
    cmt("c2", "u7", "18 ч назад", "Цена вопроса?", 0),
  ] },
  { id: "p5", authorId: "u6", date: "2 дня назад", category: "Электроника", title: "Самодельный контроллер ESC", text: "Спаял свой ESC на STM32. Поделюсь схемой и прошивкой.", image: photo(5), tags: ["ESC", "STM32", "DIY"], views: 2110, likes: 73, comments: 2, saves: 41, reposts: 11, commentList: [
    cmt("c1", "u8", "1 день назад", "Схему в студию!", 6),
    cmt("c2", "u2", "1 день назад", "Какая макс мощность?", 1),
  ] },
  { id: "p6", authorId: "u5", date: "3 дня назад", category: "Корабли", title: "Радиоуправляемый катер своими руками", text: "Корпус из стеклопластика, мотор 540. Первые ходовые испытания на пруду.", image: photo(6), tags: ["катер", "стеклопластик", "DIY"], views: 640, likes: 22, comments: 1, saves: 5, reposts: 1, commentList: [cmt("c1", "u3", "2 дня назад", "Скорость какая?", 0)] },
  { id: "p7", authorId: "u8", date: "3 дня назад", category: "Разработчики", title: "ArduPilot 4.5 — что нового", text: "Разбор основных фич нового релиза автопилота.", image: photo(7), tags: ["ArduPilot", "автопилот"], views: 1340, likes: 41, comments: 0, saves: 28, reposts: 7, isFollowing: true, commentList: [] },
  { id: "p8", authorId: "u7", date: "4 дня назад", category: "Электросамокаты", title: "Моддинг контроллера на самокате", text: "Поставил кастомную прошивку, мощность +30%.", image: photo(8), tags: ["прошивка", "мод"], views: 520, likes: 19, comments: 0, saves: 3, reposts: 0, commentList: [] },
  { id: "p9", authorId: "u1", date: "5 дней назад", category: "Автомодели", title: "Гонки в Краснодаре — итоги", text: "Прошли весенние гонки. Сделал фотоотчёт и обзор шасси участников.", image: photo(9), tags: ["гонки", "Краснодар"], views: 1880, likes: 64, comments: 1, saves: 19, reposts: 5, isFollowing: true, commentList: [cmt("c1", "u4", "4 дня назад", "Огонь репортаж!", 3)] },
  { id: "p10", authorId: "u3", date: "неделю назад", category: "Квадрокоптеры", title: "Сборка 7-дюймового лонг-рейнджа", text: "Дальность 12 км, время полёта 25 минут. Конфигурация внутри.", image: photo(10), tags: ["7дюймов", "longrange"], views: 2960, likes: 95, comments: 1, saves: 52, reposts: 14, isFollowing: true, commentList: [cmt("c1", "u8", "6 дней назад", "Какая батарея?", 4)] },
  { id: "p11", authorId: "u4", date: "неделю назад", category: "Самолёты", title: "Первый полёт планера 2.5м", text: "Сделал планер с пенополистирола, размах 2.5 м. Парит шикарно, термики ловит уверенно.", image: photo(21), tags: ["планер", "термики"], views: 720, likes: 28, comments: 0, saves: 9, reposts: 2, commentList: [] },
  { id: "p12", authorId: "u2", date: "неделю назад", category: "Запчасти", title: "Распаковка нового сервопривода Savox", text: "Пришёл Savox SC-1256TG. Усилие 20 кг·см, скорость 0.15 сек.", image: photo(22), tags: ["Savox", "сервопривод"], views: 980, likes: 36, comments: 0, saves: 14, reposts: 3, commentList: [] },
  { id: "p13", authorId: "u6", date: "10 дней назад", category: "Электроника", title: "Разбор приёмника FrSky R-XSR", text: "Маленький, лёгкий, бьёт далеко. Подробный обзор и тесты.", image: photo(23), tags: ["FrSky", "приёмник"], views: 1450, likes: 47, comments: 0, saves: 21, reposts: 6, isFollowing: true, commentList: [] },
  { id: "p14", authorId: "u8", date: "10 дней назад", category: "Разработчики", title: "Настройка автопилота для дальних миссий", text: "Параметры failsafe, RTL, точки маршрута — мой подход.", image: photo(24), tags: ["автопилот", "missions"], views: 1120, likes: 39, comments: 0, saves: 27, reposts: 8, commentList: [] },
  { id: "p15", authorId: "u1", date: "2 недели назад", category: "Автомодели", title: "Замена амортизаторов на 1:10", text: "Поставил алюминиевые на туринг. Машина перестала козлить на буграх.", image: photo(25), tags: ["1:10", "туринг", "амортизаторы"], views: 1340, likes: 51, comments: 0, saves: 16, reposts: 4, isFollowing: true, commentList: [] },
  { id: "p16", authorId: "u3", date: "2 недели назад", category: "Квадрокоптеры", title: "Cinewhoop для съёмок интерьеров", text: "Собрал 3-дюймовый сайнвуп под GoPro Naked. Идеален для интерьеров.", image: photo(26), tags: ["Cinewhoop", "съёмка"], views: 2180, likes: 79, comments: 0, saves: 38, reposts: 12, commentList: [] },
  { id: "p17", authorId: "u5", date: "2 недели назад", category: "Корабли", title: "Парусник на радиоуправлении", text: "Сделал парусную яхту 1:50. Ветер ловит — улетает по пруду.", image: photo(27), tags: ["парусник", "яхта"], views: 580, likes: 24, comments: 0, saves: 6, reposts: 1, commentList: [] },
  { id: "p18", authorId: "u7", date: "3 недели назад", category: "Электросамокаты", title: "Новый аккумулятор 60V 30Ah", text: "Сборка из 21700 ячеек. Запас хода теперь +50%.", image: photo(28), tags: ["батарея", "21700"], views: 690, likes: 26, comments: 0, saves: 8, reposts: 2, commentList: [] },
  { id: "p19", authorId: "u6", date: "3 недели назад", category: "Электроника", title: "Pixhawk 6C — обзор", text: "Новый Pixhawk вышел. Что внутри и зачем оно надо.", image: photo(29), tags: ["Pixhawk", "обзор"], views: 1820, likes: 62, comments: 0, saves: 33, reposts: 9, commentList: [] },
  { id: "p20", authorId: "u2", date: "месяц назад", category: "Запчасти", title: "Подборка моторов для багги 1:8", text: "Сравнил Reds, OS, Picco. Кто лучше держит температуру.", image: photo(30), tags: ["моторы", "сравнение"], views: 2410, likes: 87, comments: 0, saves: 44, reposts: 13, isFollowing: true, commentList: [] },
  { id: "p21", authorId: "u6", date: "месяц назад", category: "Электроника", title: "Самодельный GPS-трекер для модели", text: "Маленький модуль на ESP32 + L80 GPS. Шлёт координаты по LoRa на 5 км. Идеально для поиска улетевшего самолёта.", image: photo(31), tags: ["GPS", "ESP32", "LoRa"], views: 980, likes: 38, comments: 0, saves: 19, reposts: 5, commentList: [] },
  { id: "p22", authorId: "u1", date: "месяц назад", category: "Автомодели", title: "Сезон открыт: первые гонки 2026", text: "Стартанули в Краснодаре. 18 пилотов, 3 класса. Фотоотчёт и краткий анализ круга лидеров.", images: [photo(32), photo(33)], tags: ["гонки", "сезон2026"], views: 3200, likes: 104, comments: 1, saves: 47, reposts: 18, isFollowing: true, commentList: [cmt("c1", "u4", "3 нед назад", "Огонь сезон стартанул!", 5)] },
];

const gal = (seeds: number[]) => seeds.map((s) => `https://picsum.photos/seed/mz-ad${s}/1200/900`);

const makeSeller = (uid: ID, rating: number, deals: number, since: string): AdSeller => {
  const u = users.find((x) => x.id === uid) ?? users[0];
  return { id: u.id, name: u.name, avatar: u.avatar, rating, deals, since };
};

const rawAds: Array<Omit<Ad, "image" | "gallery" | "seller"> & { seeds: number[]; sellerStats: [number, number, string] }> = [
  { id: "a1", title: "Двигатель ДВС Picco .21 для багги 1:8", price: 18000, category: "Автомодели", subcategory: "ДВС", city: "Краснодар", delivery: ["СДЭК", "Почта России"], deliveryDetails: "Отправка в день оплаты, трек предоставляется. Самовывоз в центре Краснодара.", condition: "Б/у — отлично", status: "Продаю", contact: "+7 900 000-00-01", authorId: "u1", description: "Двигатель Picco P3 21 в отличном состоянии. Откатан 8 баков, компрессия живая, гильза-поршень без задиров. Свеча новая OS A5. Подходит для багги и трагги класса 1:8. Продаю по причине перехода на электро.", views: 1240, likes: 18, createdAt: "2 часа назад", seeds: [11, 111, 112, 113, 114], sellerStats: [4.9, 47, "март 2022"] },
  { id: "a2", title: "Комплект колёс Pro-Line Trencher 1:8 (4 шт)", price: 4500, category: "Автомодели", subcategory: "Запчасти", city: "Москва", delivery: ["СДЭК", "Яндекс Доставка"], deliveryDetails: "Доставка по Москве курьером в день заказа. По регионам — СДЭК.", condition: "Новое", status: "Продаю", contact: "+7 900 000-00-02", authorId: "u2", description: "Новые колёса Pro-Line Trencher 3.8\" на чёрных дисках. Шипованный протектор для бездорожья. Подходят на трагги и монстры 1:8.", views: 820, likes: 12, createdAt: "5 часов назад", seeds: [12, 121, 122, 123], sellerStats: [4.8, 32, "июль 2021"] },
  { id: "a3", title: "Аккумулятор LiPo 6S 5000mAh 50C XT90", price: 3200, category: "Аккумуляторы", subcategory: "LiPo", city: "Санкт-Петербург", delivery: ["СДЭК"], deliveryDetails: "Аккумуляторы отправляются только СДЭК (наземкой), без авиа.", condition: "Б/у — отлично", status: "Продаю", contact: "tg @rc_spb", authorId: "u3", description: "LiPo 6S2P 5000mAh, 50C, разъём XT90. Использовался один сезон в FPV-квадрокоптере 7\". Циклов ~40, баланс ячеек идеальный (3.85 в покое). Без вздутий.", views: 2150, likes: 34, createdAt: "вчера", seeds: [13, 131, 132, 133, 134], sellerStats: [5.0, 89, "ноябрь 2020"] },
  { id: "a4", title: "Рама квадрокоптера iFlight Nazgul5 V3", price: 2800, category: "Квадрокоптеры", subcategory: "FPV", city: "Казань", delivery: ["Почта России", "СДЭК"], deliveryDetails: "Отправка по предоплате, упаковка в пузырчатую плёнку.", condition: "Новое", status: "Продаю", contact: "+7 900 000-00-04", authorId: "u6", description: "Рама iFlight Nazgul5 V3, 5\" фристайл, толщина лучей 6мм. Полный комплект крепежа, ТПУ-маунты под GoPro.", views: 1480, likes: 22, createdAt: "вчера", seeds: [14, 141, 142], sellerStats: [4.7, 21, "май 2023"] },
  { id: "a5", title: "Пульт Radiomaster TX16S MKII ELRS", price: 22000, category: "Радиоаппаратура", subcategory: "Пульты", city: "Москва", delivery: ["СДЭК", "Ozon"], deliveryDetails: "Полный комплект с зарядкой, оригинальная коробка.", condition: "Б/у — отлично", status: "Продаю", contact: "+7 900 000-00-05", authorId: "u4", description: "Radiomaster TX16S MKII, прошивка EdgeTX последняя, модуль ELRS внутренний 1W. Стики Hall-эффект AG01. Состояние идеальное, не падал.", views: 3210, likes: 56, createdAt: "2 дня назад", seeds: [15, 151, 152, 153, 154], sellerStats: [4.9, 64, "февраль 2022"] },
  { id: "a6", title: "ESC-регулятор Hobbywing Justock 120A", price: 5400, category: "Автомодели", subcategory: "Электро", city: "Сочи", delivery: ["СДЭК"], deliveryDetails: "Готов к встрече в Сочи, по России — СДЭК.", condition: "Б/у — отлично", status: "Куплю", contact: "tg @racer_sochi", authorId: "u7", description: "Куплю Hobbywing Justock 120A или аналог. Рассмотрю варианты от 4500₽ при хорошем состоянии.", views: 540, likes: 4, createdAt: "2 дня назад", seeds: [16, 161, 162], sellerStats: [4.6, 12, "сентябрь 2023"] },
  { id: "a7", title: "Сервопривод Savox SC-1256TG (титан)", price: 4900, category: "Запчасти", subcategory: "Моторы", city: "Новосибирск", delivery: ["Wildberries", "СДЭК"], deliveryDetails: "Отправка в течение 1–2 рабочих дней.", condition: "Новое", status: "Продаю", contact: "+7 900 000-00-07", authorId: "u4", description: "Savox SC-1256TG, 20 кг·см при 6В, 0.15 сек/60°, титановые шестерни. Новый, в заводской коробке.", views: 980, likes: 14, createdAt: "3 дня назад", seeds: [17, 171, 172, 173], sellerStats: [4.9, 64, "февраль 2022"] },
  { id: "a8", title: "Комплект декалей для Як-54 (масштаб 1:6)", price: 6700, category: "Самолёты", subcategory: "Пилотажки", city: "Ростов-на-Дону", delivery: ["СДЭК", "Почта России"], deliveryDetails: "Отправка в тубусе, аккуратная упаковка.", condition: "Новое", status: "Обменяю", contact: "tg @yak_pilot", authorId: "u8", description: "Полный комплект декалей для Як-54 1:6 советской раскраски. Готов обменять на исправный сервопривод HV или сложить с доплатой.", views: 320, likes: 6, createdAt: "3 дня назад", seeds: [18, 181, 182], sellerStats: [4.8, 18, "январь 2023"] },
  { id: "a9", title: "Корпус катера 1:20 из стеклопластика", price: 8500, category: "Корабли", subcategory: "Катера", city: "Екатеринбург", delivery: ["СДЭК"], deliveryDetails: "Крупногабарит — только СДЭК с дополнительной упаковкой.", condition: "Новое", status: "Продаю", contact: "+7 900 000-00-09", authorId: "u5", description: "Корпус глиссера 1:20, ручная формовка, стеклопластик 1.5мм. Без отделки, под покраску. Длина 600мм.", views: 410, likes: 9, createdAt: "4 дня назад", seeds: [19, 191, 192, 193], sellerStats: [4.7, 23, "октябрь 2022"] },
  { id: "a10", title: "Набор винтов APC 11x5.5E (5 пар)", price: 1200, category: "Запчасти", subcategory: "Моторы", city: "Краснодар", delivery: ["Почта России", "Ozon"], deliveryDetails: "Отправка Почтой 1 класса.", condition: "Новое", status: "Продаю", contact: "+7 900 000-00-10", authorId: "u1", description: "Электро-винты APC 11x5.5E, 5 пар. Балансировка с завода. Подходят для самолётов класса 1м.", views: 280, likes: 5, createdAt: "5 дней назад", seeds: [20, 201, 202], sellerStats: [4.9, 47, "март 2022"] },
  { id: "a11", title: "Шасси Mugen MBX8 ECO для багги 1:8", price: 24000, category: "Автомодели", subcategory: "Запчасти", city: "Краснодар", delivery: ["СДЭК"], deliveryDetails: "Самовывоз или СДЭК с осмотром при получении.", condition: "Б/у — хорошо", status: "Продаю", contact: "+7 900 000-00-11", authorId: "u1", description: "Полное шасси Mugen MBX8 ECO без электроники. Амортизаторы перебраны, новые масла. Подвеска без люфтов.", views: 1820, likes: 41, createdAt: "5 дней назад", seeds: [31, 311, 312, 313, 314], sellerStats: [4.9, 47, "март 2022"] },
  { id: "a12", title: "Мотор Castle 1717 Sensored 1650KV", price: 11500, category: "Автомодели", subcategory: "Электро", city: "Москва", delivery: ["СДЭК", "Яндекс Доставка"], deliveryDetails: "Москва — курьер, регионы — СДЭК.", condition: "Б/у — отлично", status: "Продаю", contact: "+7 900 000-00-12", authorId: "u2", description: "Castle Creations 1717 1650KV сенсорный. Откатан 3 сезона дрэга, состояние идеальное. С датчиком температуры.", views: 1240, likes: 27, createdAt: "неделю назад", seeds: [32, 321, 322, 323], sellerStats: [4.8, 32, "июль 2021"] },
  { id: "a13", title: "FPV-камера Caddx Ratel 2 V2", price: 3400, category: "Квадрокоптеры", subcategory: "FPV", city: "Санкт-Петербург", delivery: ["СДЭК", "Почта России"], deliveryDetails: "Отправка на следующий день.", condition: "Новое", status: "Продаю", contact: "tg @rc_spb", authorId: "u3", description: "Caddx Ratel 2 V2, 1200TVL, объектив 2.1мм, FOV 165°. Новая в блистере.", views: 980, likes: 15, createdAt: "неделю назад", seeds: [33, 331, 332], sellerStats: [5.0, 89, "ноябрь 2020"] },
  { id: "a14", title: "VTX TBS Unify Pro32 HV 5G8", price: 4200, category: "Квадрокоптеры", subcategory: "FPV", city: "Казань", delivery: ["Почта России"], deliveryDetails: "Только Почта, отслеживание включено.", condition: "Б/у — отлично", status: "Продаю", contact: "+7 900 000-00-14", authorId: "u6", description: "TBS Unify Pro32 HV, 25/200/500/800мВт. SmartAudio, MMCX. Без сколов, протестирован на стенде.", views: 670, likes: 11, createdAt: "неделю назад", seeds: [34, 341, 342], sellerStats: [4.7, 21, "май 2023"] },
  { id: "a15", title: "Полётный контроллер Holybro Kakute H7", price: 6800, category: "Электроника", subcategory: "Контроллеры", city: "Казань", delivery: ["СДЭК"], deliveryDetails: "Отправка в антистатическом пакете.", condition: "Новое", status: "Продаю", contact: "+7 900 000-00-15", authorId: "u6", description: "Holybro Kakute H7, H743, Betaflight 4.5. Новый, в комплекте провода и крепёж.", views: 1120, likes: 19, createdAt: "10 дней назад", seeds: [35, 351, 352, 353], sellerStats: [4.7, 21, "май 2023"] },
  { id: "a16", title: "Зарядное iCharger X8 1100W", price: 18500, category: "Аккумуляторы", subcategory: "LiPo", city: "Москва", delivery: ["СДЭК", "Ozon"], deliveryDetails: "Полный комплект: ЗУ, провода, балансировочные адаптеры.", condition: "Б/у — отлично", status: "Продаю", contact: "+7 900 000-00-16", authorId: "u2", description: "Junsi iCharger X8, 1100Вт, 30А. Прошивка последняя. Использовалось редко, состояние топ.", views: 1450, likes: 28, createdAt: "10 дней назад", seeds: [36, 361, 362, 363], sellerStats: [4.8, 32, "июль 2021"] },
  { id: "a17", title: "Аккумулятор LiPo 4S 2200mAh 75C", price: 1900, category: "Аккумуляторы", subcategory: "LiPo", city: "Краснодар", delivery: ["Почта России", "СДЭК"], deliveryDetails: "Только наземная отправка.", condition: "Новое", status: "Продаю", contact: "+7 900 000-00-17", authorId: "u1", description: "Новый CNHL Black Series 4S 2200mAh 75C, разъём XT60. В фабричной упаковке.", views: 540, likes: 8, createdAt: "10 дней назад", seeds: [37, 371, 372], sellerStats: [4.9, 47, "март 2022"] },
  { id: "a18", title: "Передатчик FrSky R-XSR (ACCST D16)", price: 1800, category: "Радиоаппаратура", subcategory: "Приёмники", city: "Новосибирск", delivery: ["Почта России"], deliveryDetails: "Отправка по предоплате.", condition: "Б/у — отлично", status: "Продаю", contact: "+7 900 000-00-18", authorId: "u4", description: "FrSky R-XSR, прошит на последнюю версию ACCST. Антенны без повреждений.", views: 460, likes: 6, createdAt: "2 недели назад", seeds: [38, 381], sellerStats: [4.9, 64, "февраль 2022"] },
  { id: "a19", title: "Сервотестер + контроллер серво Hitec", price: 1500, category: "Электроника", subcategory: "Датчики", city: "Сочи", delivery: ["СДЭК"], deliveryDetails: "Доставка только СДЭК.", condition: "Новое", status: "Продаю", contact: "tg @racer_sochi", authorId: "u7", description: "Многофункциональный сервотестер с дисплеем. Может работать как джиро-тест.", views: 280, likes: 3, createdAt: "2 недели назад", seeds: [39, 391, 392], sellerStats: [4.6, 12, "сентябрь 2023"] },
  { id: "a20", title: "Двигатель O.S. Speed B2103 для багги 1:8", price: 26000, category: "Автомодели", subcategory: "ДВС", city: "Москва", delivery: ["СДЭК"], deliveryDetails: "Только СДЭК. Готов выслать видео работы двигателя.", condition: "Б/у — отлично", status: "Продаю", contact: "+7 900 000-00-20", authorId: "u2", description: "O.S. Speed B2103 Type-S, 2 бака после капремонта (новые ГПП). Свеча новая. Полная диагностика прилагается.", views: 2340, likes: 52, createdAt: "2 недели назад", seeds: [40, 401, 402, 403, 404], sellerStats: [4.8, 32, "июль 2021"] },
  { id: "a21", title: "Краски Tamiya спрей TS — набор 8 цветов", price: 3600, category: "Запчасти", subcategory: "Шасси", city: "Екатеринбург", delivery: ["СДЭК", "Ozon"], deliveryDetails: "Аккуратная упаковка, отправка наземкой.", condition: "Новое", status: "Продаю", contact: "+7 900 000-00-21", authorId: "u5", description: "Набор спрей-красок Tamiya для лексана: TS-13 (лак), TS-49 (синий), TS-26, TS-86, TS-44 и др. 8 баллончиков по 100мл.", views: 720, likes: 12, createdAt: "3 недели назад", seeds: [41, 411, 412], sellerStats: [4.7, 23, "октябрь 2022"] },
  { id: "a22", title: "Кузов Pro-Line Chevy SS 1:10 короткий", price: 2400, category: "Автомодели", subcategory: "Запчасти", city: "Краснодар", delivery: ["Почта России", "СДЭК"], deliveryDetails: "Кузов чистый, под покраску.", condition: "Новое", status: "Продаю", contact: "+7 900 000-00-22", authorId: "u1", description: "Pro-Line Chevy SS для туринга 1:10, 190мм. Прозрачный, не тонирован, под покраску.", views: 380, likes: 7, createdAt: "3 недели назад", seeds: [42, 421, 422], sellerStats: [4.9, 47, "март 2022"] },
  { id: "a23", title: "Полётный комплект Pixhawk 6C Mini", price: 28000, category: "Разработчики", subcategory: "Автопилоты", city: "Ростов-на-Дону", delivery: ["СДЭК"], deliveryDetails: "Комплект: автопилот, GPS, PM, провода.", condition: "Новое", status: "Продаю", contact: "tg @pixhawk_rnd", authorId: "u8", description: "Holybro Pixhawk 6C Mini полный комплект. ArduPilot/PX4. Новый, не использовался.", views: 1620, likes: 31, createdAt: "3 недели назад", seeds: [43, 431, 432, 433], sellerStats: [4.8, 18, "январь 2023"] },
  { id: "a24", title: "Гироскоп MEMS BMI088 модуль", price: 850, category: "Электроника", subcategory: "Датчики", city: "Казань", delivery: ["Почта России"], deliveryDetails: "Отправка письмом 1 класса.", condition: "Новое", status: "Продаю", contact: "+7 900 000-00-24", authorId: "u6", description: "Модуль IMU на BMI088. SPI/I2C, 3.3В логика. В наличии 12 шт.", views: 240, likes: 2, createdAt: "месяц назад", seeds: [44, 441], sellerStats: [4.7, 21, "май 2023"] },
  { id: "a25", title: "Контроллер для электросамоката 60V 30A", price: 4500, category: "Электросамокаты", subcategory: "Контроллеры", city: "Сочи", delivery: ["СДЭК"], deliveryDetails: "С прошивкой под Kugoo/Dualtron.", condition: "Б/у — отлично", status: "Обменяю", contact: "tg @scooter_sochi", authorId: "u7", description: "Контроллер 60V 30A с FOC, прошивка кастомная. Меняю на батарею 60V не менее 25Ah.", views: 680, likes: 11, createdAt: "месяц назад", seeds: [45, 451, 452], sellerStats: [4.6, 12, "сентябрь 2023"] },
  { id: "a26", title: "Парусник Yacht Class 1м (RTR)", price: 14000, category: "Корабли", subcategory: "Парусники", city: "Екатеринбург", delivery: ["СДЭК"], deliveryDetails: "Крупногабарит, дополнительная защита корпуса.", condition: "Б/у — отлично", status: "Продаю", contact: "+7 900 000-00-26", authorId: "u5", description: "Парусная яхта класса 1м, готова к ходу. В комплекте 2 паруса, передатчик, ЗУ.", views: 320, likes: 5, createdAt: "месяц назад", seeds: [46, 461, 462, 463], sellerStats: [4.7, 23, "октябрь 2022"] },
  { id: "a27", title: "Набор инструмента Arrowmax 1:8 Touring", price: 7800, category: "Запчасти", subcategory: "Шасси", city: "Москва", delivery: ["СДЭК", "Ozon"], deliveryDetails: "Полный комплект в кейсе.", condition: "Новое", status: "Продаю", contact: "+7 900 000-00-27", authorId: "u2", description: "Arrowmax Honeycomb Tool Set для туринга и багги: шестигранники 1.5/2.0/2.5/3.0мм, плоские отвёртки, ключи. В алюминиевом кейсе.", views: 920, likes: 18, createdAt: "месяц назад", seeds: [47, 471, 472, 473], sellerStats: [4.8, 32, "июль 2021"] },
  { id: "a28", title: "Аэродинамический пакет для туринга 1:10", price: 2100, category: "Автомодели", subcategory: "Тюнинг", city: "Санкт-Петербург", delivery: ["Почта России"], deliveryDetails: "Лёгкая отправка письмом.", condition: "Новое", status: "Продаю", contact: "tg @rc_spb", authorId: "u3", description: "Прижимной обвес + сплиттер из лексана. Универсальная установка на туринг 190мм.", views: 410, likes: 7, createdAt: "месяц назад", seeds: [48, 481], sellerStats: [5.0, 89, "ноябрь 2020"] },
  { id: "a29", title: "Дрон DJI Avata комбо (Goggles 2 + RC Motion 2)", price: 95000, category: "Квадрокоптеры", subcategory: "Съёмочные", city: "Москва", delivery: ["СДЭК", "Яндекс Доставка"], deliveryDetails: "Полная коробка, чек сохранён, гарантия.", condition: "Б/у — отлично", status: "Продаю", contact: "+7 900 000-00-29", authorId: "u2", description: "DJI Avata комбо: дрон, очки Goggles 2, RC Motion 2, 3 батареи, чарджер. Налёт ~6 часов.", views: 4820, likes: 87, createdAt: "месяц назад", seeds: [49, 491, 492, 493, 494], sellerStats: [4.8, 32, "июль 2021"] },
  { id: "a30", title: "Планер EasyGlider 4 с электроприводом", price: 12500, category: "Самолёты", subcategory: "Планеры", city: "Новосибирск", delivery: ["СДЭК"], deliveryDetails: "Только СДЭК, большая коробка.", condition: "Б/у — отлично", status: "Продаю", contact: "+7 900 000-00-30", authorId: "u4", description: "Multiplex EasyGlider 4, размах 1.8м, мотор и регулятор установлены. Без электроники RX.", views: 760, likes: 13, createdAt: "2 месяца назад", seeds: [50, 501, 502], sellerStats: [4.9, 64, "февраль 2022"] },
];

export const ads: Ad[] = rawAds.map((r) => {
  const { seeds, sellerStats, ...rest } = r;
  const gallery = gal(seeds);
  return {
    ...rest,
    image: gallery[0],
    gallery,
    seller: makeSeller(r.authorId, sellerStats[0], sellerStats[1], sellerStats[2]),
  };
});

export const adById = (id: ID) => ads.find((a) => a.id === id);

export const banners: Banner[] = [
  { id: "b1", title: "Магазин MODELIZM23", text: "Скидка 15% на все ДВС двигатели до конца месяца", cta: "Перейти", until: "до 30.06", color: "from-red-600 to-red-800" },
  { id: "b2", title: "Новый завоз LiPo батарей", text: "Большой выбор аккумуляторов под любые задачи", cta: "Смотреть", until: "до 15.07", color: "from-slate-700 to-slate-900" },
  { id: "b3", title: "Гонки RC в Краснодаре", text: "Регистрация открыта. Заявки до 20 июня", cta: "Записаться", until: "до 20.06", color: "from-red-700 to-slate-900" },
];

export const tariffs: Tariff[] = [
  { id: "t0", name: "Тестовый доступ", price: 1, period: "1 день", features: ["Все разделы", "Чаты", "Объявления"] },
  { id: "t1", name: "Месяц", price: 100, period: "30 дней", features: ["Все разделы", "Чаты", "Объявления", "Поддержка"] },
  { id: "t2", name: "Полгода", price: 500, period: "180 дней", features: ["Всё из «Месяц»", "Приоритет в ленте", "Скидки в магазине"], popular: true },
  { id: "t3", name: "Год", price: 800, period: "365 дней", features: ["Всё из «Полгода»", "Бесплатные объявления", "Бейдж Pro"] },
];

export const communities: Community[] = [
  { id: "g1", name: "RC Авто Краснодар", description: "Локальное сообщество гонщиков", members: 412, category: "Автомодели", joined: true },
  { id: "g2", name: "Самолёты и авиамодели", description: "Сборка, обкатка, обмен опытом", members: 1180, category: "Самолёты" },
  { id: "g3", name: "Квадрокоптеры и FPV", description: "FPV полёты, настройка, гонки", members: 2210, category: "Квадрокоптеры" },
  { id: "g4", name: "Разработчики автопилотов", description: "ArduPilot, PX4, прошивки", members: 320, category: "Разработчики" },
  { id: "g5", name: "Барахолка запчастей", description: "Купля, продажа, обмен", members: 1640, category: "Запчасти" },
];

export const dialogs: Dialog[] = [
  {
    id: "d1", userId: "u1", lastMessage: "Привет, готов выслать двигатель", time: "12:34", unread: 2,
    messages: [
      { id: "m1", authorId: "u1", time: "12:30", text: "Привет! Получил твой запрос по двигателю." },
      { id: "m2", authorId: "u1", time: "12:34", text: "Привет, готов выслать двигатель" },
    ],
  },
  { id: "d2", userId: "u2", lastMessage: "Скинь фото головки", time: "11:02", messages: [{ id: "m1", authorId: "u2", time: "11:02", text: "Скинь фото головки" }] },
  { id: "d3", userId: "u3", lastMessage: "Снял видео полёта, смотри!", time: "вчера", messages: [{ id: "m1", authorId: "u3", time: "вчера", text: "Снял видео полёта, смотри!" }] },
  { id: "d4", userId: "u4", lastMessage: "Есть в наличии декали", time: "вчера", messages: [{ id: "m1", authorId: "u4", time: "вчера", text: "Есть в наличии декали" }] },
  { id: "d5", userId: "u5", lastMessage: "Спасибо за помощь!", time: "пн", messages: [{ id: "m1", authorId: "u5", time: "пн", text: "Спасибо за помощь!" }] },
];

export const chatMessages: Message[] = [
  { id: "cm1", authorId: "u2", time: "10:12", text: "Парни, кто гонял Picco на нитро 30%? Какие настройки иглы?" },
  { id: "cm2", authorId: "u1", time: "10:15", text: "У меня основная 2 щелчка от закрытия, холостая по факелу" },
  { id: "cm3", authorId: "u4", time: "10:20", text: "Главное — не перегреть. Следи за головой." },
  { id: "cm4", authorId: "u6", time: "10:25", text: "Тоже хочу попробовать, продаю свой O.S." },
  { id: "cm5", authorId: "u3", time: "10:31", text: "Видео обкатки скинете?" },
];

export const userById = (id: ID) => users.find((u) => u.id === id) ?? users[0];
export const categoryById = (id: ID) => categories.find((c) => c.id === id);
