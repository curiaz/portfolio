import { BackToTop } from "@/components/BackToTop";
import { ContactCard } from "@/components/ContactCard";
import { ContactForm } from "@/components/ContactForm";
import { Navbar } from "@/components/Navbar";
import { ProfileImageModal } from "@/components/ProfileImageModal";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";
import { SkillBadge } from "@/components/SkillBadge";

const sectionClass = "mx-auto max-w-7xl px-3.5 py-9 sm:px-6 sm:py-12 md:py-14 lg:px-8 lg:py-20";
const cardClass =
  "rounded-[22px] border border-slate-800 bg-slate-950/80 p-3.5 shadow-[0_18px_60px_rgba(2,6,23,0.28)] transition duration-300 hover:-translate-y-0.5 hover:border-cyan-400/35 sm:rounded-[28px] sm:p-5 md:p-6";
const pillLinkClass =
  "inline-flex items-center justify-center rounded-full border border-slate-700 px-3.5 py-2 text-xs font-semibold text-slate-300 transition hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-white/5 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 sm:px-4 sm:text-sm";

const skills = [
  {
    category: "Languages",
    description: "Core languages for frontend work, backend logic, and automation.",
    items: ["Python", "TypeScript", "JavaScript", "HTML", "CSS"],
  },
  {
    category: "Frameworks",
    description: "Frameworks used for responsive applications and API-driven systems.",
    items: ["Next.js", "FastAPI", "Flask"],
  },
  {
    category: "Tools",
    description: "Tools and platforms for collaboration, design, data, and deployment.",
    items: ["Git", "GitHub", "VS Code", "Figma", "Supabase", "Firebase"],
  },
];

const experience = [
  {
    role: "Software Developer Intern",
    company: "Inspire Holdings Inc.",
    date: "Feb 2026 - Jun 2026",
    description:
      "Contributed to a web-based pawnshop management system for branch operations, customer records, transactions, payments, renewals, redemptions, and financial monitoring.",
    highlights: [
      "Built and refined backend APIs, database integrations, and business logic.",
      "Helped improve transaction accuracy and day-to-day operational workflows.",
      "Worked with the team on requirements, troubleshooting, testing, and release stabilization.",
    ],
    featured: true,
  },
  {
    role: "Service Crew",
    company: "McDonald's 32nd St. BGC - GADC",
    date: "Jun 2023 - Dec 2023",
    description:
      "Supported cashier, lobby, dining, and customer-facing operations in a fast-paced service environment.",
    highlights: [
      "Strengthened communication, discipline, and attention to detail under pressure.",
      "Built dependable teamwork habits through daily operations and customer support.",
    ],
    featured: false,
  },
];

const featuredProjects = [
  {
    title: "MediChain",
    subtitle: "AI-Driven Diagnosis and Prescription System",
    description:
      "Healthcare-focused academic system for diagnosis and prescription support with secure record handling.",
    tech: ["Python", "TypeScript", "Next.js", "FastAPI", "Blockchain", "AES", "SHA-256"],
    highlights: [
      "AI-assisted diagnosis workflow",
      "Encrypted health record handling",
      "Testing, debugging, and deployment support",
    ],
    accent: "linear-gradient(90deg, rgba(34,211,238,0.95), rgba(59,130,246,0.95), rgba(139,92,246,0.95))",
    previewSrc: "/medichain.png",
    previewPath: "/medichain.png",
    previewAlt: "MediChain website preview",
  },
  {
    title: "Pawnshop Management System",
    description:
      "Operational web platform for customer records, pawn transactions, payments, renewals, redemptions, and branch monitoring.",
    tech: ["NestJS", "TypeScript", "Prisma", "PostgreSQL", "Supabase", "JWT", "Redis", "Jest", "Next.js", "React", "Tailwind CSS"],
    highlights: [
      "Branch operations workflow",
      "Customer and transaction tracking",
      "Financial monitoring support",
    ],
    accent: "linear-gradient(90deg, rgba(16,185,129,0.95), rgba(34,211,238,0.95), rgba(59,130,246,0.95))",
    previewSrc: "/pms.png",
    previewPath: "/pms.png",
    previewAlt: "Pawnshop Management System website preview",
  },
  {
    title: "Inspire Cinema Ticket System",
    description:
      "A cinema booking web app with public movie and ticket flows, plus an admin dashboard for managing cinema operations.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "JavaScript", "Prisma ORM", "PostgreSQL"],
    highlights: [
      "Public browsing and ticket booking flows",
      "Admin dashboard for cinema operations",
      "Database-backed feature set with Prisma and PostgreSQL",
    ],
    accent: "linear-gradient(90deg, rgba(245,158,11,0.95), rgba(34,211,238,0.95), rgba(59,130,246,0.95))",
    previewSrc: "/images/cinema.png",
    previewPath: "/images/cinema.png",
    previewAlt: "Inspire Cinema Ticket System website preview",
  },
  {
    title: "Developer Portfolio Website",
    description:
      "Responsive portfolio built with reusable components, concise content, and a recruiter-friendly structure.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    highlights: [
      "Single-page responsive layout",
      "Reusable component system",
      "Production build workflow",
    ],
    accent: "linear-gradient(90deg, rgba(99,102,241,0.95), rgba(34,211,238,0.95), rgba(16,185,129,0.95))",
    previewSrc: "/images/dev.png",
    previewPath: "/images/dev.png",
    previewAlt: "Developer portfolio website preview",
  },
];

const education = [
  {
    title: "Bachelor of Science in Computer Science",
    school: "Taguig City University",
    date: "2022 - 2026",
    detail: "Final CGPA: 1.65",
  },
  {
    title: "Senior High School - TechVoc: Computer Programming",
    school: "Western Bicutan National High School",
    date: "2020 - 2022",
    detail: "Final Grade: 94",
  },
];

const contactCards = [
  {
    label: "Email",
    value: "jeremiahcurias@gmail.com",
    href: "mailto:jeremiahcurias@gmail.com",
    icon: "@",
  },
  {
    label: "Phone",
    value: "+63 998 906 6301",
    href: "tel:+639989066301",
    icon: "P",
  },
  {
    label: "Location",
    value: "Taguig City, Metro Manila",
    href: "https://www.google.com/maps/search/Taguig+City,+Metro+Manila",
    icon: "M",
  },
];

export default function Home() {
  return (
    <main id="top" className="relative overflow-x-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 portfolio-grid opacity-25" />
      <div aria-hidden="true" className="pointer-events-none absolute left-[-10rem] top-20 h-72 w-72 rounded-full bg-cyan-400/12 blur-3xl float-slow" />
      <div aria-hidden="true" className="pointer-events-none absolute right-[-10rem] top-80 h-80 w-80 rounded-full bg-violet-500/12 blur-3xl float-slow [animation-delay:1.4s]" />

      <Navbar />

      <section className="mx-auto max-w-7xl px-3.5 pb-9 pt-5 sm:px-6 sm:pb-12 sm:pt-8 md:pb-14 lg:px-8 lg:pb-20 lg:pt-14">
        <div className="glass-panel relative overflow-hidden rounded-[22px] p-3.5 sm:rounded-[30px] sm:p-6 md:p-8 lg:rounded-[36px] lg:p-12 xl:p-14">
          <div className="grid items-center gap-7 md:gap-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(320px,0.88fr)]">
            <div className="fade-up min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1.5 text-xs text-cyan-100 sm:px-4 sm:py-2 sm:text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_5px_rgba(16,185,129,0.12)] sm:h-2 sm:w-2" />
                Open to opportunities
              </div>

              <div className="mt-4 flex items-center gap-4 sm:gap-5 md:gap-7 lg:gap-8">
                <ProfileImageModal src="/images/IMG_0332.JPG" alt="Portrait of Jeremiah James A. Curias" />
                <div className="min-w-0">
                  <h1 className="max-w-4xl text-[1.75rem] font-semibold leading-tight tracking-tight text-white text-balance min-[390px]:text-4xl md:text-5xl lg:text-[3.35rem] xl:text-6xl">
                    Jeremiah James A. Curias
                  </h1>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400 sm:mt-3 sm:text-sm sm:tracking-[0.35em]">
                    Software Developer
                  </p>
                </div>
              </div>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8 md:text-lg lg:text-xl">
                I build reliable web systems with clean interfaces, practical backend logic, and a strong focus on real users.
              </p>

              <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-5 py-2.5 text-xs font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-300 hover:shadow-[0_18px_35px_rgba(34,211,238,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 sm:px-6 sm:py-3 sm:text-sm"
                >
                  View Projects
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-white/5 px-5 py-2.5 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 sm:px-6 sm:py-3 sm:text-sm"
                >
                  Contact Me
                </a>
                <a
                  href="/Curias_CV.pdf"
                  download
                  className="inline-flex items-center justify-center rounded-full border border-violet-400/30 bg-violet-500/10 px-5 py-2.5 text-xs font-semibold text-violet-100 transition hover:-translate-y-0.5 hover:border-violet-300/50 hover:bg-violet-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/60 sm:px-6 sm:py-3 sm:text-sm"
                >
                  Download CV
                </a>
              </div>

              <div className="mt-6 grid gap-2.5 min-[480px]:grid-cols-3 sm:mt-8 sm:gap-3">
                {[
                  { value: "2026", label: "CS graduate" },
                  { value: "3", label: "Featured projects" },
                  { value: "Full-stack", label: "Web focus" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3 sm:rounded-3xl sm:p-4">
                    <p className="text-lg font-semibold text-white sm:text-2xl">{stat.value}</p>
                    <p className="mt-1 text-xs text-slate-400 sm:text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="fade-up-delay-1 relative min-w-0">
              <div className="glass-panel relative overflow-hidden rounded-[22px] p-3.5 sm:rounded-[30px] sm:p-5 md:p-6">
                <div className="flex flex-col gap-3 border-b border-white/5 pb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pb-5">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.26em] text-slate-400 sm:text-xs sm:tracking-[0.32em]">Profile</p>
                    <p className="mt-1.5 text-base font-semibold text-white sm:mt-2 sm:text-lg">Software Developer / Engineer</p>
                  </div>
                  <div className="w-fit rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-200 sm:px-3 sm:py-2 sm:text-xs">
                    Available
                  </div>
                </div>

                <div className="mt-4 grid gap-3 text-xs text-slate-300 min-[520px]:grid-cols-3 sm:mt-6 sm:text-sm lg:grid-cols-1">
                  {[
                    ["Location", "Taguig City, Metro Manila"],
                    ["Email", "jeremiahcurias@gmail.com"],
                    ["Focus", "Web apps, backend APIs, databases"],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3 sm:rounded-3xl sm:p-4">
                      <p className="text-slate-400">{label}</p>
                      <p className="mt-1 break-words text-white">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl border border-cyan-400/15 bg-gradient-to-br from-cyan-400/10 to-violet-500/10 p-3.5 sm:mt-6 sm:rounded-3xl sm:p-5">
                  <p className="text-xs leading-6 text-slate-200 sm:text-sm sm:leading-7">
                    Practical, team-oriented, and ready to contribute to software teams that value reliable delivery.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section id="about" className={sectionClass}>
        <SectionHeading
          eyebrow="About"
          title="Practical software built with care"
          description="Computer Science graduate with hands-on experience in web development, backend APIs, database integration, testing, and collaborative delivery."
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)]">
          <div className={`${cardClass} lg:p-8`}>
            <p className="text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
              I enjoy turning requirements into useful, maintainable systems. My work includes internship development on an operational pawnshop platform and academic project work on a secure healthcare system, with a focus on clean implementation, debugging, documentation, and user-centered decisions.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              { label: "Development", value: "Web apps, APIs, and feature delivery" },
              { label: "Data", value: "Records, transactions, and integrations" },
              { label: "Delivery", value: "Testing, debugging, and documentation" },
              { label: "Teamwork", value: "Clear communication and reliable follow-through" },
            ].map((item) => (
              <div key={item.label} className={cardClass}>
                <p className="text-[11px] uppercase tracking-[0.24em] text-cyan-300/80 sm:text-xs sm:tracking-[0.28em]">{item.label}</p>
                <p className="mt-2 text-xs leading-6 text-slate-200 sm:mt-3 sm:text-sm sm:leading-7">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className={sectionClass}>
        <SectionHeading
          eyebrow="Skills"
          title="Focused stack for modern web delivery"
          description="A concise toolkit for building responsive interfaces, API-driven features, and maintainable project workflows."
        />

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {skills.map((group, index) => (
            <article key={group.category} className={`${cardClass} h-full`}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400 sm:text-xs sm:tracking-[0.3em]">0{index + 1}</p>
                  <h3 className="mt-1.5 text-lg font-semibold text-white sm:mt-2 sm:text-2xl">{group.category}</h3>
                </div>
                <span className="rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-300 sm:px-3 sm:text-xs sm:tracking-[0.24em]">
                  Core
                </span>
              </div>
              <p className="mt-3 text-xs leading-6 text-slate-300 sm:mt-4 sm:text-sm sm:leading-7">{group.description}</p>
              <div className="mt-4 flex flex-wrap gap-2 sm:mt-5 sm:gap-3">
                {group.items.map((skill) => (
                  <SkillBadge key={skill} label={skill} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="experience" className={sectionClass}>
        <SectionHeading
          eyebrow="Experience"
          title="Hands-on work and service experience"
          description="Development and customer-facing roles that shaped technical delivery, communication, and dependable teamwork."
        />

        <div className="mt-8 space-y-5">
          {experience.map((item) => (
            <article
              key={`${item.role}-${item.company}`}
              className={`${cardClass} relative grid gap-5 lg:grid-cols-[minmax(0,220px)_minmax(0,1fr)] lg:p-8 ${item.featured ? "shadow-[0_18px_60px_rgba(34,211,238,0.08)]" : ""}`}
            >
              <div className="lg:pr-6">
                <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-300/80 sm:text-sm sm:tracking-[0.28em]">{item.date}</p>
                <h3 className="mt-2 text-lg font-semibold text-white sm:mt-3 sm:text-2xl">{item.role}</h3>
                <p className="mt-1.5 text-xs text-slate-400 sm:mt-2 sm:text-sm">{item.company}</p>
              </div>
              <div className="border-t border-slate-800 pt-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                <p className="text-xs leading-6 text-slate-300 sm:text-sm sm:leading-7 md:leading-8 lg:text-base">{item.description}</p>
                <ul className="mt-4 space-y-2 border-l border-slate-800 pl-3 sm:mt-5 sm:space-y-3 sm:pl-4">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="text-xs leading-6 text-slate-300 sm:text-sm sm:leading-7">
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className={sectionClass}>
        <SectionHeading
          eyebrow="Featured Projects"
          title="Selected work with practical outcomes"
          description="Projects that show backend integration, data workflows, security awareness, and responsive frontend implementation."
        />

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              subtitle={project.subtitle}
              description={project.description}
              tech={project.tech}
              highlights={project.highlights}
              previewSrc={project.previewSrc}
              previewPath={project.previewPath}
              previewAlt={project.previewAlt}
              accent={project.accent}
            />
          ))}
        </div>
      </section>

      <section id="education" className={sectionClass}>
        <SectionHeading
          eyebrow="Education"
          title="Academic foundation"
          description="Formal training in computer science and programming, supported by project-based development experience."
        />

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {education.map((item) => (
            <article key={item.title} className={cardClass}>
              <p className="text-[11px] uppercase tracking-[0.24em] text-cyan-300/80 sm:text-xs sm:tracking-[0.28em]">{item.date}</p>
              <h3 className="mt-2 text-lg font-semibold text-white sm:mt-3 sm:text-2xl">{item.title}</h3>
              <p className="mt-1.5 text-xs text-slate-400 sm:mt-2 sm:text-sm">{item.school}</p>
              <p className="mt-4 text-xs leading-6 text-slate-300 sm:mt-5 sm:text-sm sm:leading-7">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className={sectionClass}>
        <SectionHeading
          eyebrow="Contact"
          title="Let's discuss roles and project opportunities"
          description="Open to software development, web development, system support, and entry-level IT opportunities."
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
            {contactCards.map((card) => (
              <ContactCard
                key={card.label}
                label={card.label}
                value={card.value}
                href={card.href}
                icon={<span aria-hidden="true">{card.icon}</span>}
              />
            ))}
          </div>

          <div className="glass-panel rounded-[22px] p-3.5 sm:rounded-[30px] sm:p-6 md:p-8">
            <div className="flex flex-col gap-3 border-b border-white/5 pb-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4 sm:pb-5">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400 sm:text-xs sm:tracking-[0.35em]">Quick Message</p>
                <h3 className="mt-1.5 text-lg font-semibold text-white sm:mt-2 sm:text-2xl">Email Me</h3>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 bg-slate-950/65">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-5 px-4 py-8 text-center sm:px-6 lg:px-8">
          <p className="max-w-2xl text-sm leading-6 text-slate-400">
            &copy; 2026 Jeremiah James A. Curias.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
            <a className={pillLinkClass} href="https://github.com/curiaz">
              GitHub
            </a>
            <a className={pillLinkClass} href="https://www.linkedin.com/in/curias-jeremiah-james-a-b71076320/">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>

      <BackToTop />
    </main>
  );
}
