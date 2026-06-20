# v4.0 — Раздел объявлений (МоДелизМ Club)

Апгрейд транзакционного трека: карточки, детальная страница, мастер создания, продвинутый список. Всё bespoke, только `var(--...)` токены, Framer Motion, без shadcn-дефолтов.

## Что меняется / добавляется

### Файлы
**Изменить:**
- `src/components/AdCard.tsx` — полный rewrite (v2)
- `src/routes/ads.tsx` — sticky-фильтры, поиск с debounce, сортировка, пагинация, skeleton
- `src/routes/ads.new.tsx` — 3-шаговый мастер
- `src/lib/mock.ts` — расширить `Ad` (gallery, description, seller, deliveryDetails, condition, createdAt, views, likes) + 30+ объявлений

**Создать:**
- `src/routes/ads.$id.tsx` — детальная страница
- `src/components/ads/AdGallery.tsx` — Embla карусель + thumbnails
- `src/components/ads/SellerCard.tsx` — карточка продавца
- `src/components/ads/SimilarAds.tsx` — горизонтальный скролл похожих
- `src/components/ads/AdCardSkeleton.tsx` — shimmer-скелет
- `src/components/ads/AdFilters.tsx` — sticky-сайдбар фильтров (desktop) + bottom sheet (mobile)
- `src/components/ads/AdSortBar.tsx` — поиск + сортировка
- `src/components/ads/wizard/StepIndicator.tsx` — индикатор 3-х шагов
- `src/components/ads/wizard/StepPhotos.tsx`, `StepData.tsx`, `StepPreview.tsx`
- `src/components/ads/wizard/SuccessModal.tsx` — AnimatePresence модалка
- `src/components/ui-bespoke/RadioCard.tsx`, `Checkbox.tsx` — кастомные контролы

## Дизайн-контракт

- Все цвета — `var(--accent)`, `var(--background-*)`, `var(--foreground-*)`, `var(--border*)`, `var(--success/warning/error)` и их `*-soft`
- Радиусы — `var(--r-card)`, `var(--r-card-sm)`, `var(--r-button)`, `var(--r-input)`, `var(--r-tag)`, `var(--r-pill)`, `var(--r-modal)`
- Тени — `var(--shadow-card)`, `--shadow-card-hover`, `--shadow-float`, `--shadow-glow-accent`, `--shadow-button`
- Spacing/font-size — точные px через `[16px]`-нотацию
- Анимации — только Framer Motion, без `layoutId`, ≤800ms, springs только на клик
- Работает в light+dark, RU-копия, без horizontal scroll, touch ≥44px

## AdCard v2

Bespoke карточка: фото 4:3 с hover-zoom, бейдж статуса (Продаю/Куплю/Обмен) в углу, иконка bookmark, заголовок (2 строки clamp), цена крупно `--font-display`, мета (категория · подкатегория), строка city + delivery icons, footer с views/likes/createdAt. Hover: подъём `--shadow-card-hover`, image scale 1.04. Состояния: default / liked / moderated (полупрозрачность + бейдж) / rejected (border --error).

## Детальная страница `/ads/$id`

Layout: 2 колонки (gallery + sticky правая info-панель), под ней блоки описание, доставка, продавец (SellerCard), похожие (SimilarAds horizontal scroll). Embla с thumbnails и стрелками. Кнопки «Написать», «Показать контакт» (раскрытие), «В избранное», «Поделиться».

## Wizard `/ads/new` (3 шага)

1. **Photos** — drag&drop зона, до 10, превью с reorder и удалением, первая = главная
2. **Data** — RadioCard (Продаю/Куплю/Обмен), название, описание, цена, категория/подкатегория, состояние, город, контакт, чекбоксы доставки
3. **Preview** — рендер как AdCard + детальный блок, кнопка «Оплатить 20 ₽ и опубликовать» → SuccessModal → redirect `/ads`

Custom StepIndicator (3 кружка + соединяющая полоса с заполнением), кастомный progress, валидация на каждом шаге, sticky bottom bar «Назад/Далее».

## `/ads` — список

- Sticky-сайдбар фильтров (desktop, 280px): категория, подкатегория, статус, цена range, город, состояние, доставка, чек «только с фото»
- Mobile: кнопка «Фильтры» → Bottom Sheet (Framer Motion drag)
- Topbar: search с debounce 300ms, сортировка (новые/дешевле/дороже/популярные), переключатель grid/list
- Skeleton 8 шт. при загрузке (имитируем 400ms)
- Пагинация «Показать ещё» по 12, без infinite
- Empty state с reset-фильтров

## Mock-данные (`src/lib/mock.ts`)

Расширяем `Ad`:
```ts
gallery: string[]; description: string; condition: "Новое" | "Б/у — отлично" | "Б/у — хорошо" | "Под восстановление";
seller: { id; name; avatar; rating; deals; since };
deliveryDetails: string; views: number; likes: number; createdAt: string;
```
30+ реалистичных объявлений по категориям RC: ДВС/электро, шасси, кузова, аккумуляторы, регуляторы, серво, передатчики, инструменты, краски, запчасти 1:8/1:10. Использовать Unsplash для gallery (4-6 фото на объявление).

## Технические заметки

- TanStack Router file-based: `ads.$id.tsx` + `createFileRoute("/ads/$id")`
- `<Link to="/ads/$id" params={{ id }}>` — никогда `<a href>`
- Embla: `bun add embla-carousel-react` (уже есть)
- Debounce: ручной `useEffect` + `setTimeout`, без lodash
- BottomSheet: `motion.div` с `drag="y"`, `dragConstraints`, `onDragEnd` для close
- Skeleton shimmer — переиспользовать паттерн из `feed/Skeleton.tsx`
- Все `<img>` с `aspect-ratio` или явными w/h, `loading="lazy"` только off-screen

## Что НЕ трогаем

- `src/styles.css` (токены уже есть)
- Лента `/`, профиль, чаты, авторизация, layout (Sidebar/MobileHeader/BottomNav)
- shadcn-файлы под `src/components/ui/*` (не используем, но не удаляем)
