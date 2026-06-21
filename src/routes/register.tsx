import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AuthShell, inputStyle, primaryBtn } from "@/components/auth/AuthShell";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Регистрация — МоДелизМ Форум" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const nav = useNavigate();
  const [agree, setAgree] = useState(true);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) return toast.error("Подтвердите согласие с правилами");
    toast.success("Аккаунт создан (демо)");
    nav({ to: "/onboarding" });
  };

  return (
    <AuthShell
      title="Создать аккаунт"
      subtitle="Несколько секунд — и вы внутри сообщества"
      footer={
        <>
          Уже есть аккаунт?{" "}
          <Link to="/login" style={{ color: "var(--accent)", fontWeight: 600 }}>
            Войти
          </Link>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-[12px]">
        <input required placeholder="Имя и фамилия" style={inputStyle} />
        <input required type="email" placeholder="Email" style={inputStyle} />
        <input required type="password" placeholder="Пароль (от 8 символов)" minLength={8} style={inputStyle} />
        <label className="flex items-start gap-[10px]" style={{ fontSize: "var(--fs-xs)", color: "var(--foreground-70)", marginTop: 8 }}>
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} style={{ marginTop: 3, accentColor: "var(--accent)" }} />
          <span>
            Я принимаю{" "}
            <a href="#" style={{ color: "var(--accent)" }}>правила сообщества</a> и{" "}
            <a href="#" style={{ color: "var(--accent)" }}>политику</a> обработки данных
          </span>
        </label>
        <button type="submit" style={{ ...primaryBtn, marginTop: 16 }}>
          Создать аккаунт
        </button>
      </form>
      <div className="mt-[24px] flex items-center gap-[12px]" style={{ color: "var(--foreground-50)", fontSize: "var(--fs-xs)" }}>
        <span style={{ flex: 1, height: 1, background: "var(--border)" }} />
        ИЛИ
        <span style={{ flex: 1, height: 1, background: "var(--border)" }} />
      </div>
      <div className="mt-[16px] grid grid-cols-2 gap-[8px]">
        {["VK", "Яндекс"].map((p) => (
          <button
            key={p}
            type="button"
            style={{
              background: "var(--background-surface)",
              border: "1px solid var(--border)",
              padding: "10px 14px",
              borderRadius: "var(--r-button)",
              fontSize: "var(--fs-sm)",
              color: "var(--foreground)",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            {p}
          </button>
        ))}
      </div>
    </AuthShell>
  );
}
