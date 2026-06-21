import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, ArrowRight, UserPlus, LogIn, ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import cover from "@/assets/cover-modelizm.jpg";

// No real hero video yet — set to empty string to use poster only.
const VIDEO_URL = "";

export const Route = createFileRoute("/welcome")({
  head: () => ({
    meta: [
      { title: "МоДелизМ Форум — сообщество моделистов России" },
      { name: "description", content: "Социальная платформа для RC-моделистов: лента, чаты по категориям, объявления и сообщества." },
    ],
  }),
  component: WelcomePage,
});

function WelcomePage() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [videoError, setVideoError] = useState(!VIDEO_URL);

  useEffect(() => {
    const t = setTimeout(() => setShowContent(true), 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (videoRef.current && !videoError) {
      videoRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [videoError]);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (isPlaying) v.pause();
    else v.play().catch(() => {});
    setIsPlaying(!isPlaying);
  }

  function toggleMute() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !isMuted;
    setIsMuted(!isMuted);
  }

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  };

  return (
    <div className="relative w-full overflow-hidden" style={{ minHeight: "100dvh", background: "var(--bg-primary)" }}>
      {/* Background: video or poster */}
      <div className="absolute inset-0 z-0">
        {videoError ? (
          <>
            <img src={cover} alt="Сборка RC-моделей" className="h-full w-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(26,26,30,0.55) 0%, rgba(26,26,30,0.75) 60%, var(--bg-primary) 100%)" }} />
          </>
        ) : (
          <>
            <video
              ref={videoRef}
              src={VIDEO_URL}
              poster={cover}
              autoPlay
              muted
              loop
              playsInline
              onLoadedData={() => setVideoLoaded(true)}
              onError={() => setVideoError(true)}
              className={`h-full w-full object-cover transition-opacity duration-1000 ${videoLoaded ? "opacity-100" : "opacity-0"}`}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(26,26,30,0.45) 0%, rgba(26,26,30,0.70) 65%, var(--bg-primary) 100%)" }} />
          </>
        )}
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Top bar: theme toggle */}
      <div className="absolute top-0 right-0 z-20 flex items-center gap-[12px] p-[24px]">
        <ThemeToggle />
      </div>

      {/* Video controls (desktop/tablet only) */}
      {!videoError && (
        <div className="absolute bottom-[24px] right-[24px] z-20 hidden sm:flex gap-[8px]">
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Пауза" : "Воспроизвести"}
            className="grid place-items-center"
            style={{ width: 40, height: 40, borderRadius: "var(--r-pill)", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", backdropFilter: "blur(8px)" }}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button
            onClick={toggleMute}
            aria-label={isMuted ? "Включить звук" : "Выключить звук"}
            className="grid place-items-center"
            style={{ width: 40, height: 40, borderRadius: "var(--r-pill)", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", backdropFilter: "blur(8px)" }}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>
      )}

      {/* Hero content overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center px-[24px] text-center" style={{ minHeight: "100dvh" }}>
        <AnimatePresence>
          {showContent && (
            <motion.div
              key="hero"
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="flex w-full max-w-[820px] flex-col items-center"
            >
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-[8px]"
                style={{
                  background: "rgba(229, 57, 53, 0.12)",
                  border: "1px solid rgba(229, 57, 53, 0.30)",
                  color: "#ef5350",
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  padding: "6px 14px",
                  borderRadius: "var(--r-pill)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: 999, background: "#ef5350" }} />
                Сообщество моделистов России
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mt-[24px]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(40px, 8vw, 96px)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.04em",
                  fontWeight: 900,
                  color: "#ffffff",
                  textShadow: "0 4px 24px rgba(0,0,0,0.5)",
                }}
              >
                МОДЕЛИЗМ
                <br />
                <span style={{ color: "#e53935" }}>Форум</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-[24px]"
                style={{
                  fontSize: "clamp(16px, 2vw, 20px)",
                  color: "rgba(240,240,240,0.85)",
                  maxWidth: 560,
                  lineHeight: 1.5,
                  textShadow: "0 2px 12px rgba(0,0,0,0.4)",
                }}
              >
                Всё для моделиста в одном месте. Лента, чаты, объявления, сообщество.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-[40px] flex flex-col sm:flex-row items-stretch sm:items-center gap-[12px] w-full sm:w-auto">
                <button
                  onClick={() => navigate({ to: "/register" })}
                  className="flex items-center justify-center gap-[10px] active:scale-[0.97] transition-all"
                  style={{
                    padding: "0 32px",
                    height: 56,
                    borderRadius: "var(--r-pill)",
                    background: "var(--accent)",
                    color: "#ffffff",
                    fontSize: 16,
                    fontWeight: 700,
                    boxShadow: "var(--shadow-glow-accent)",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-hover)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "var(--accent)")}
                >
                  <UserPlus size={18} />
                  Создать аккаунт
                  <ArrowRight size={18} />
                </button>

                <button
                  onClick={() => navigate({ to: "/login" })}
                  className="flex items-center justify-center gap-[10px] active:scale-[0.97] transition-all"
                  style={{
                    padding: "0 32px",
                    height: 56,
                    borderRadius: "var(--r-pill)",
                    background: "rgba(255,255,255,0.08)",
                    color: "#ffffff",
                    fontSize: 16,
                    fontWeight: 700,
                    border: "2px solid rgba(255,255,255,0.25)",
                    cursor: "pointer",
                    backdropFilter: "blur(8px)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
                >
                  <LogIn size={18} />
                  Войти
                </button>
              </motion.div>

              {/* Stats */}
              <motion.div variants={fadeUp} className="mt-[48px] flex items-center justify-center gap-[24px] sm:gap-[48px] flex-wrap">
                {[
                  { value: "5 000+", label: "моделистов" },
                  { value: "12", label: "категорий" },
                  { value: "24/7", label: "доступ" },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col items-center">
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.02em" }}>
                      {s.value}
                    </div>
                    <div style={{ fontSize: 12, color: "rgba(240,240,240,0.7)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4, fontFamily: "var(--font-mono)" }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} className="mt-[32px]" style={{ fontSize: 13, color: "rgba(240,240,240,0.6)" }}>
                <Link to="/" style={{ color: "rgba(240,240,240,0.7)", textDecoration: "underline" }}>
                  Перейти к прототипу ленты
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll indicator (desktop/tablet) */}
      {showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-[24px] left-1/2 z-10 hidden sm:flex -translate-x-1/2 flex-col items-center gap-[6px]"
          style={{ color: "rgba(240,240,240,0.6)" }}
        >
          <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", fontFamily: "var(--font-mono)" }}>
            Узнать больше
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
