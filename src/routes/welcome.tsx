import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, MessageSquare, Megaphone, Users2, Newspaper } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import cover from "@/assets/cover-modelizm.jpg";

export const Route = createFileRoute("/welcome")({
  head: () => ({
    meta: [
      { title: "МоДелизМ Club — сообщество моделистов России" },
      { name: "description", content: "Социальная платформа для RC-моделистов: лента, чаты по категориям, объявления и сообщества." },
    ],
  }),
  component: WelcomePage,
});

function WelcomePage() {
  return (
    <div style={{ background: "var(--background)", color: "var(--foreground)", minHeight: "100vh" }}>
      {/* ===== MOBILE ONBOARDING (md:hidden) ===== */}
      <div className="md:hidden flex min-h-[100svh] flex-col px-[20px]" style={{ paddingTop: "max(20px, env(safe-area-inset-top))", paddingBottom: "max(20px, env(safe-area-inset-bottom))" }}>
        <div className="flex items-center justify-between">
          <Logo />
          <ThemeToggle />
        </div>

        <div className="relative mt-[20px] overflow-hidden" style={{ borderRadius: 24, boxShadow: "var(--shadow-float)" }}>
          <img src={cover} alt="" className="block w-full" style={{ aspectRatio: "4/5", objectFit: "cover" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.78) 100%)" }} />
          <div className="absolute bottom-[20px] left-[20px] right-[20px]">
            <div
              className="inline-flex items-center gap-[6px]"
              style={{
                background: "rgba(255,255,255,0.14)", color: "#fff",
                fontFamily: "var(--font-mono)", fontSize: 10,
                padding: "5px 10px", borderRadius: 999,
                letterSpacing: "0.08em", textTransform: "uppercase",
                backdropFilter: "blur(8px)",
              }}
            >
              <span style={{ width: 5, height: 5, borderRadius: 999, background: "var(--accent)" }} />
              v2.1 · бета
            </div>
            <h1
              className="mt-[12px]"
              style={{ fontFamily: "var(--font-display)", color: "#fff", fontSize: 32, lineHeight: 1.05, letterSpacing: "-0.02em", fontWeight: 800 }}
            >
              МоДелизМ <span style={{ color: "var(--accent)" }}>Club</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.78)", fontSize: 14, marginTop: 8, lineHeight: 1.45 }}>
              Сообщество RC-моделистов: сборки, чаты, объявления.
            </p>
          </div>
        </div>

        <div className="mt-[24px] flex flex-col gap-[10px]">
          {[
            { icon: Newspaper, t: "Лента сборок и обсуждений" },
            { icon: MessageSquare, t: "Чаты по подкатегориям" },
            { icon: Megaphone, t: "Объявления и обмен — от 20 ₽" },
          ].map(({ icon: Ic, t }) => (
            <div key={t} className="flex items-center gap-[12px]">
              <div className="grid h-[36px] w-[36px] shrink-0 place-items-center" style={{ background: "var(--accent-soft)", color: "var(--accent)", borderRadius: 10 }}>
                <Ic size={18} />
              </div>
              <span style={{ fontSize: 14, color: "var(--foreground-70)" }}>{t}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-[24px] flex flex-col gap-[10px]">
          <Link
            to="/register"
            className="inline-flex items-center justify-center gap-[6px]"
            style={{ background: "var(--accent)", color: "#fff", fontWeight: 600, height: 52, borderRadius: 14, fontSize: 15, boxShadow: "var(--shadow-button)" }}
          >
            Создать аккаунт <ArrowRight size={16} />
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center justify-center"
            style={{ height: 48, borderRadius: 14, fontSize: 14, color: "var(--foreground-70)" }}
          >
            У меня уже есть аккаунт
          </Link>
        </div>
      </div>

      {/* ===== DESKTOP LANDING ===== */}
      <div className="hidden md:block">
      <header
        className="sticky top-0 z-30 backdrop-blur"
        style={{ borderBottom: "1px solid var(--border)", background: "color-mix(in oklab, var(--background) 88%, transparent)" }}
      >
        <div className="mx-auto flex items-center justify-between" style={{ maxWidth: "var(--container-max)", padding: "14px var(--container-pad)" }}>
          <Logo />
          <nav className="hidden items-center gap-[24px] md:flex" style={{ fontSize: 13, color: "var(--foreground-70)" }}>
            <a href="#features">Возможности</a>
            <a href="#pricing">Подписка</a>
            <a href="https://modelizm23.ru" target="_blank" rel="noreferrer">Маркет</a>
          </nav>
          <div className="flex items-center gap-[8px]">
            <ThemeToggle />
            <Link to="/login" style={{ fontSize: 13, color: "var(--foreground-70)", padding: "8px 12px", borderRadius: "var(--r-button)" }}>Войти</Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-[6px]"
              style={{ background: "var(--accent)", color: "#fff", fontSize: 13, fontWeight: 600, padding: "9px 16px", borderRadius: "var(--r-button)", boxShadow: "var(--shadow-button)" }}
            >
              Регистрация <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </header>


      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{ padding: "80px var(--container-pad)" }}
      >
        <div className="mx-auto grid items-center gap-[48px] lg:grid-cols-2" style={{ maxWidth: "var(--container-max)" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          >
            <div
              className="inline-flex items-center gap-[8px]"
              style={{
                background: "var(--accent-soft)",
                color: "var(--accent)",
                fontFamily: "var(--font-mono)",
                fontSize: "var(--fs-xs)",
                padding: "6px 12px",
                borderRadius: "var(--r-pill)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--accent)" }} />
              v2.1 · бета
            </div>
            <h1
              className="mt-[24px]"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 6vw, 64px)", lineHeight: 1.02, letterSpacing: "-0.03em", fontWeight: 800 }}
            >
              МоДелизМ <span style={{ color: "var(--accent)" }}>Club</span>
              <span style={{ display: "block", color: "var(--foreground-70)", fontWeight: 500, fontSize: "0.45em", marginTop: 14 }}>
                Моделизм — это жизнь, остальное детали
              </span>
            </h1>
            <p className="mt-[24px]" style={{ fontSize: "var(--fs-body-lg)", color: "var(--foreground-70)", maxWidth: 520 }}>
              Сообщество RC-моделистов: авто, авиа, квадрокоптеры, корабли и электроника. Делитесь сборками, обсуждайте в чатах по категориям, покупайте и продавайте.
            </p>
            <div className="mt-[32px] flex flex-wrap gap-[12px]">
              <Link
                to="/register"
                style={{
                  background: "var(--accent)",
                  color: "#fff",
                  fontWeight: 600,
                  padding: "14px 24px",
                  borderRadius: "var(--r-button)",
                  boxShadow: "var(--shadow-button)",
                }}
              >
                Создать аккаунт
              </Link>
              <Link
                to="/"
                style={{
                  background: "var(--background-surface)",
                  color: "var(--foreground)",
                  fontWeight: 600,
                  padding: "14px 24px",
                  borderRadius: "var(--r-button)",
                  border: "1px solid var(--border)",
                }}
              >
                Открыть прототип
              </Link>
            </div>
            <div className="mt-[32px] flex items-center gap-[24px]" style={{ fontSize: "var(--fs-xs)", color: "var(--foreground-50)", fontFamily: "var(--font-mono)" }}>
              <span>10+ КАТЕГОРИЙ</span>
              <span style={{ width: 1, height: 12, background: "var(--border)" }} />
              <span>ЧАТЫ В РЕАЛЬНОМ ВРЕМЕНИ</span>
              <span style={{ width: 1, height: 12, background: "var(--border)" }} />
              <span>20 ₽ ОБЪЯВЛЕНИЕ</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
            className="relative"
          >
            <div
              className="relative overflow-hidden"
              style={{ borderRadius: "var(--r-card-lg)", border: "1px solid var(--border)", boxShadow: "var(--shadow-float)" }}
            >
              <img src={cover} alt="Сборка RC-моделей" className="block w-full" style={{ aspectRatio: "4/3", objectFit: "cover" }} />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.7) 100%)" }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-[24px]">
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-xs)", color: "rgba(255,255,255,0.6)", letterSpacing: "0.08em" }}>
                  LIVE FEED · 2 МИНУТЫ НАЗАД
                </div>
                <div style={{ color: "#fff", fontWeight: 600, fontSize: "var(--fs-body-lg)", marginTop: 6 }}>
                  Сборка Traxxas Slash 4×4 · обновлённая подвеска
                </div>
              </div>
            </div>
            <div
              className="absolute -bottom-6 -left-6 hidden md:block"
              style={{
                background: "var(--background-elevated)",
                border: "1px solid var(--border)",
                borderRadius: "var(--r-card)",
                padding: "16px 20px",
                boxShadow: "var(--shadow-card-hover)",
                fontFamily: "var(--font-mono)",
                fontSize: "var(--fs-mono)",
                color: "var(--foreground-70)",
              }}
            >
              <div style={{ color: "var(--accent)", fontWeight: 700 }}>+184</div>
              новых сборок за неделю
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: "80px var(--container-pad)", background: "var(--background-elevated)" }}>
        <div className="mx-auto" style={{ maxWidth: "var(--container-max)" }}>
          <div className="flex items-end justify-between gap-[24px] flex-wrap">
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em", maxWidth: 640 }}>
              Всё для моделиста — в одном месте
            </h2>
            <p style={{ color: "var(--foreground-70)", fontSize: "var(--fs-body-lg)", maxWidth: 360 }}>
              Социалка, маркетплейс и тематические чаты. Без рекламной свалки, без скрытых платежей.
            </p>
          </div>

          <div className="mt-[48px] grid gap-[16px] md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Newspaper, title: "Лента", text: "Сборки, фото, видео, обсуждения. Подписывайтесь на мастеров." },
              { icon: MessageSquare, title: "Чаты по категориям", text: "Свой канал у каждой подкатегории — от ДВС 1:8 до коптеров FPV." },
              { icon: Megaphone, title: "Объявления за 20 ₽", text: "Запчасти, готовые модели, обмен. ЮKassa / Т-Банк." },
              { icon: Users2, title: "Сообщества", text: "Локальные клубы, гонки, чемпионаты и совместные заезды." },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                style={{
                  background: "var(--background)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--r-card)",
                  padding: "24px",
                }}
              >
                <div
                  className="inline-flex items-center justify-center"
                  style={{ width: 44, height: 44, borderRadius: "var(--r-card-sm)", background: "var(--accent-soft)", color: "var(--accent)" }}
                >
                  <f.icon size={22} />
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--fs-h4)", marginTop: 16 }}>{f.title}</div>
                <p style={{ color: "var(--foreground-70)", fontSize: "var(--fs-sm)", marginTop: 8, lineHeight: 1.5 }}>{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "120px var(--container-pad) 96px" }}>
        <div className="mx-auto text-center" style={{ maxWidth: 720 }}>
          <Cpu size={36} color="var(--accent)" style={{ margin: "0 auto" }} />
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em", marginTop: 16 }}>
            Готовы собрать сообщество вместе с нами?
          </h3>
          <p style={{ color: "var(--foreground-70)", fontSize: "var(--fs-body-lg)", marginTop: 16 }}>
            Регистрация бесплатная. Первая публикация — за минуту.
          </p>
          <div className="mt-[32px] flex flex-wrap justify-center gap-[12px]">
            <Link
              to="/register"
              style={{ background: "var(--accent)", color: "#fff", fontWeight: 600, padding: "14px 28px", borderRadius: "var(--r-button)", boxShadow: "var(--shadow-button)" }}
            >
              Создать аккаунт
            </Link>
            <Link
              to="/login"
              style={{ background: "var(--background-surface)", color: "var(--foreground)", fontWeight: 600, padding: "14px 28px", borderRadius: "var(--r-button)", border: "1px solid var(--border)" }}
            >
              У меня уже есть
            </Link>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: "1px solid var(--border)", padding: "32px var(--container-pad)", color: "var(--foreground-50)", fontSize: "var(--fs-xs)", fontFamily: "var(--font-mono)" }}>
        <div className="mx-auto flex items-center justify-between" style={{ maxWidth: "var(--container-max)" }}>
          <span>© МоДелизМ Club · 2026</span>
          <span>v2.1 · prototype</span>
        </div>
      </footer>
      </div>
    </div>

  );
}

