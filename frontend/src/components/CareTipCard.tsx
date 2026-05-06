import type { ReactNode } from "react";
import { FiCheckCircle } from "react-icons/fi";

type CareTipCardProps = {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  badge?: string;
  tips: string[];
};

export default function CareTipCard({
  icon,
  title,
  subtitle,
  badge,
  tips,
}: CareTipCardProps) {
  return (
    <article className="group rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-5 shadow-michi-1 transition hover:-translate-y-1 hover:shadow-lg sm:p-6">
      <div className="flex items-start gap-4">
        <div className="mt-1 flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-[var(--panel2)] p-3 text-2xl text-[var(--accent)] shadow-michi-1 transition group-hover:scale-105">
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          {badge && (
            <span className="mb-2 inline-flex rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
              {badge}
            </span>
          )}

          <h2 className="text-xl font-extrabold text-[var(--text-strong)]">
            {title}
          </h2>

          {subtitle && (
            <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        {tips.map((tip, index) => (
          <div
            key={`${title}-${index}`}
            className="flex gap-3 rounded-2xl bg-[var(--panel2)] px-4 py-3 text-sm leading-6 text-[var(--text-strong)]"
          >
            <FiCheckCircle className="mt-1 shrink-0 text-[var(--accent)]" />
            <p>{tip}</p>
          </div>
        ))}
      </div>
    </article>
  );
}