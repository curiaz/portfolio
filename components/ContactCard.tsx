import type { ReactNode } from "react";

type ContactCardProps = {
  label: string;
  value: string;
  href?: string;
  icon: ReactNode;
};

export function ContactCard({ label, value, href, icon }: ContactCardProps) {
  const content = (
    <>
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10 text-sm text-cyan-300 ring-1 ring-cyan-400/20 sm:h-11 sm:w-11 sm:text-base">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400 sm:text-xs sm:tracking-[0.28em]">{label}</p>
        <p className="mt-1 break-words text-xs font-medium text-white sm:text-sm">{value}</p>
      </div>
    </>
  );

  const baseClass =
    "flex min-w-0 items-center gap-3 rounded-[22px] border border-slate-800 bg-slate-950/80 p-3.5 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-500/40 hover:shadow-[0_18px_50px_rgba(2,132,199,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 sm:gap-4 sm:rounded-3xl sm:p-5 md:flex-col md:items-start lg:flex-row lg:items-center";

  if (href) {
    return (
      <a className={baseClass} href={href}>
        {content}
      </a>
    );
  }

  return <div className={baseClass}>{content}</div>;
}
