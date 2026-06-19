type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300/90 sm:mb-3 sm:text-xs sm:tracking-[0.35em]">
        {eyebrow}
      </p>
      <h2 className="text-[1.45rem] font-semibold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-xs leading-6 text-slate-300 sm:mt-4 sm:text-sm sm:leading-7 md:text-base">
        {description}
      </p>
    </div>
  );
}
