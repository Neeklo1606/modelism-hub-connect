import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Вход — МоДелизМ Club" }] }),
  component: LoginPage,
});

function LoginPage() {
  const [tab, setTab] = useState<"login" | "signup">("login");
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Вход выполнен (демо)");
    navigate({ to: "/" });
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden bg-gradient-to-br from-primary to-slate-900 p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <Logo size={40} />
        <div>
          <h1 className="font-display text-4xl font-bold leading-tight">Сообщество моделистов России</h1>
          <p className="mt-3 max-w-md text-white/80">RC авто, авиамодели, квадрокоптеры, корабли, электроника. Объявления, чаты и единомышленники в одном месте.</p>
          <p className="mt-6 text-sm italic text-white/60">«Моделизм — это жизнь, остальное детали»</p>
        </div>
        <div className="text-xs text-white/40">© МоДелизМ Club</div>
      </div>

      <div className="flex flex-col justify-center px-6 py-10 sm:px-10">
        <div className="lg:hidden mb-6"><Logo size={36} /></div>
        <div className="mx-auto w-full max-w-sm">
          <h2 className="font-display text-2xl font-bold">{tab === "login" ? "Вход" : "Регистрация"}</h2>
          <p className="mt-1 text-sm text-muted-foreground">Добро пожаловать в МоДелизМ Club</p>

          <div className="mt-6 grid grid-cols-2 rounded-lg bg-muted p-1">
            <button onClick={() => setTab("login")} className={`rounded-md py-1.5 text-sm font-medium ${tab === "login" ? "bg-background shadow-sm" : "text-muted-foreground"}`}>Вход</button>
            <button onClick={() => setTab("signup")} className={`rounded-md py-1.5 text-sm font-medium ${tab === "signup" ? "bg-background shadow-sm" : "text-muted-foreground"}`}>Регистрация</button>
          </div>

          <form onSubmit={submit} className="mt-6 space-y-3">
            {tab === "signup" && (
              <input required placeholder="ФИО" className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
            )}
            <input required type="email" placeholder="Email или телефон" className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
            <input required type="password" placeholder="Пароль" className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
            <button type="submit" className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
              {tab === "login" ? "Войти" : "Создать аккаунт"}
            </button>
          </form>

          <Link to="/" className="mt-4 block text-center text-xs text-muted-foreground hover:text-primary">
            Посмотреть прототип без входа →
          </Link>
        </div>
      </div>
    </div>
  );
}
