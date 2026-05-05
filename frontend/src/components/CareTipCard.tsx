import type { ReactNode } from "react";

type CareTipCardProps = {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  tips: string[];
};

export default function CareTipCard({
  icon,
  title,
  subtitle,
  tips,
}: CareTipCardProps) {
  return (
    <article className="rounded-3xl bg-[var(--panel)] p-5 shadow-michi-1">
      <div className="flex items-start gap-4">
        <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--panel2)] text-2xl text-[var(--accent)] shadow-michi-1">
          {icon}
        </div>

        <div className="min-w-0">
          <h2 className="text-xl font-bold text-[var(--text-strong)]">
            {title}
          </h2>

          {subtitle && (
            <p className="mt-1 text-sm text-[var(--text-soft)]">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 grid gap-3">
        {tips.map((tip, index) => (
          <div
            key={`${title}-${index}`}
            className="rounded-2xl bg-[var(--panel2)] px-4 py-3 text-sm leading-6 text-[var(--text-strong)]"
          >
            {tip}
          </div>
        ))}
      </div>
    </article>
  );
}