import Image from "next/image";

type SkillBadgeProps = {
  label: string;
  icon?: string;
};

export function SkillBadge({ label, icon }: SkillBadgeProps) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-200 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-400/50 hover:bg-slate-800 hover:text-white hover:shadow-[0_0_24px_rgba(34,211,238,0.14)] sm:px-3.5 sm:py-2 sm:text-sm">
      {icon && (
        <Image 
          src={icon} 
          alt={`${label} logo`} 
          width={16} 
          height={16} 
          className="object-contain" 
          style={{ width: "auto", height: "auto" }}
        />
      )}
      {label}
    </span>
  );
}
