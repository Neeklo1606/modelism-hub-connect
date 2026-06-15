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
  status?: "published" | "moderation";
}

export interface Ad {
  id: ID;
  title: string;
  price: number;
  category: string;
  subcategory: string;
  city: string;
  image: string;
  delivery: string[];
  status: "Продаю" | "Куплю" | "Обменяю";
  contact: string;
  authorId: ID;
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

export const posts: Post[] = [
  { id: "p1", authorId: "u1", date: "2 ч назад", category: "Автомодели", title: "Новый проект на шасси 1:8", text: "Собрал новый багги на базе HB Racing. Делюсь первыми впечатлениями от обкатки ДВС: на первых баках мотор работал стабильно, температура головы держалась в районе 110°C, что для нового двигателя — отличный показатель. После 4 баков перешёл на штатный режим и сразу заметил прирост отзывчивости.", image: photo(1), tags: ["ДВС", "1:8", "багги", "HB Racing"], views: 1240, likes: 42, comments: 12 },
  { id: "p2", authorId: "u3", date: "4 ч назад", category: "Квадрокоптеры", title: "FPV полёт над лесом", text: "Снял красивое видео на 5-дюймовой раме с GoPro. Настройки PID наконец-то идеальные.", image: photo(2), tags: ["FPV", "5 дюймов", "GoPro"], views: 3420, likes: 88, comments: 24 },
  { id: "p3", authorId: "u4", date: "вчера", category: "Самолёты", title: "Реставрация Як-52", text: "Восстанавливаю модель Як-52 в масштабе 1:6. Ищу комплект декалей.", image: photo(3), tags: ["Як-52", "1:6", "реставрация"], views: 890, likes: 31, comments: 8 },
  { id: "p4", authorId: "u2", date: "вчера", category: "Запчасти", title: "Обзор нового мотора Castle 1717", text: "Поставил на дрэгстер. Отдача — космос. Подробности в посте.", image: photo(4), tags: ["Castle", "дрэгстер", "мотор"], views: 1560, likes: 56, comments: 17 },
  { id: "p5", authorId: "u6", date: "2 дня назад", category: "Электроника", title: "Самодельный контроллер ESC", text: "Спаял свой ESC на STM32. Поделюсь схемой и прошивкой.", image: photo(5), tags: ["ESC", "STM32", "DIY"], views: 2110, likes: 73, comments: 29 },
  { id: "p6", authorId: "u5", date: "3 дня назад", category: "Корабли", title: "Радиоуправляемый катер своими руками", text: "Корпус из стеклопластика, мотор 540. Первые ходовые испытания на пруду.", image: photo(6), tags: ["катер", "стеклопластик", "DIY"], views: 640, likes: 22, comments: 5 },
  { id: "p7", authorId: "u8", date: "3 дня назад", category: "Разработчики", title: "ArduPilot 4.5 — что нового", text: "Разбор основных фич нового релиза автопилота.", image: photo(7), tags: ["ArduPilot", "автопилот"], views: 1340, likes: 41, comments: 11 },
  { id: "p8", authorId: "u7", date: "4 дня назад", category: "Электросамокаты", title: "Моддинг контроллера на самокате", text: "Поставил кастомную прошивку, мощность +30%.", image: photo(8), tags: ["прошивка", "мод"], views: 520, likes: 19, comments: 4 },
  { id: "p9", authorId: "u1", date: "5 дней назад", category: "Автомодели", title: "Гонки в Краснодаре — итоги", text: "Прошли весенние гонки. Сделал фотоотчёт и обзор шасси участников.", image: photo(9), tags: ["гонки", "Краснодар"], views: 1880, likes: 64, comments: 22 },
  { id: "p10", authorId: "u3", date: "неделю назад", category: "Квадрокоптеры", title: "Сборка 7-дюймового лонг-рейнджа", text: "Дальность 12 км, время полёта 25 минут. Конфигурация внутри.", image: photo(10), tags: ["7 дюймов", "long range"], views: 2960, likes: 95, comments: 31 },
];

export const ads: Ad[] = [
  { id: "a1", title: "Двигатель ДВС 1:8 Picco .21", price: 18000, category: "Автомодели", subcategory: "ДВС", city: "Краснодар", image: photo(11), delivery: ["СДЭК", "Почта России"], status: "Продаю", contact: "+7 900 000-00-01", authorId: "u1" },
  { id: "a2", title: "Комплект колёс Pro-Line 1:8", price: 4500, category: "Автомодели", subcategory: "Запчасти", city: "Москва", image: photo(12), delivery: ["СДЭК", "Яндекс"], status: "Продаю", contact: "+7 900 000-00-02", authorId: "u2" },
  { id: "a3", title: "Аккумулятор LiPo 6S 5000mAh", price: 3200, category: "Аккумуляторы", subcategory: "LiPo", city: "СПб", image: photo(13), delivery: ["СДЭК"], status: "Продаю", contact: "tg @user", authorId: "u3" },
  { id: "a4", title: "Рама квадрокоптера 5\" iFlight", price: 2800, category: "Квадрокоптеры", subcategory: "FPV", city: "Казань", image: photo(14), delivery: ["Почта России"], status: "Продаю", contact: "+7 900 000-00-04", authorId: "u6" },
  { id: "a5", title: "Пульт Radiomaster TX16S", price: 22000, category: "Радиоаппаратура", subcategory: "Пульты", city: "Москва", image: photo(15), delivery: ["СДЭК", "Ozon"], status: "Продаю", contact: "+7 900 000-00-05", authorId: "u4" },
  { id: "a6", title: "ESC-регулятор Hobbywing 120A", price: 5400, category: "Автомодели", subcategory: "Электро", city: "Сочи", image: photo(16), delivery: ["СДЭК"], status: "Куплю", contact: "tg @racer", authorId: "u7" },
  { id: "a7", title: "Сервопривод Savox SC-1256TG", price: 4900, category: "Запчасти", subcategory: "Моторы", city: "Новосибирск", image: photo(17), delivery: ["Wildberries"], status: "Продаю", contact: "+7 900 000-00-07", authorId: "u4" },
  { id: "a8", title: "Запчасти для самолёта Як-54", price: 6700, category: "Самолёты", subcategory: "Пилотажки", city: "Ростов", image: photo(18), delivery: ["СДЭК", "Почта России"], status: "Обменяю", contact: "tg @pilot", authorId: "u8" },
  { id: "a9", title: "Корпус катера 1:20 стеклопластик", price: 8500, category: "Корабли", subcategory: "Катера", city: "Екатеринбург", image: photo(19), delivery: ["СДЭК"], status: "Продаю", contact: "+7 900 000-00-09", authorId: "u5" },
  { id: "a10", title: "Набор винтов APC (5 шт)", price: 1200, category: "Запчасти", subcategory: "Моторы", city: "Краснодар", image: photo(20), delivery: ["Почта России", "Ozon"], status: "Продаю", contact: "+7 900 000-00-10", authorId: "u1" },
];

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
