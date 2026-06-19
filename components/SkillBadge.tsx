type SkillBadgeProps = {
  label: string;
};

export function SkillBadge({ label }: SkillBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-200 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-400/50 hover:bg-slate-800 hover:text-white hover:shadow-[0_0_24px_rgba(34,211,238,0.14)] sm:px-3.5 sm:py-2 sm:text-sm">
      {label}
    </span>
  );
}
