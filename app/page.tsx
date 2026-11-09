import { BackToTop } from "@/components/BackToTop";
import { ContactCard } from "@/components/ContactCard";
import { ContactForm } from "@/components/ContactForm";
import { Navbar } from "@/components/Navbar";
import { ProfileImageModal } from "@/components/ProfileImageModal";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";
import { SkillBadge } from "@/components/SkillBadge";
import { ScatterWrapper } from "@/components/ScatterWrapper";
import Image from "next/image";

const sectionClass = "mx-auto max-w-7xl px-3.5 py-9 sm:px-6 sm:py-12 md:py-14 lg:px-8 lg:py-20";
const cardClass =
  "rounded-[22px] border border-slate-800 bg-slate-950/80 p-3.5 shadow-[0_18px_60px_rgba(2,6,23,0.28)] transition duration-300 hover:-translate-y-0.5 hover:border-cyan-400/35 sm:rounded-[28px] sm:p-5 md:p-6";
const pillLinkClass =
  "inline-flex items-center justify-center rounded-full border border-slate-700 px-3.5 py-2 text-xs font-semibold text-slate-300 transition hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-white/5 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 sm:px-4 sm:text-sm";

const skills = [
  {
    category: "Languages",
    description: "Core languages for frontend work, backend logic, and automation.",
    items: [
      { name: "Python", icon: "/images/python.png" },
      { name: "TypeScript", icon: "/images/typescript.png" },
      { name: "JavaScript", icon: "/images/js.png" },
      { name: "HTML", icon: "/images/html5.png" },
      { name: "CSS", icon: "/images/css3.png" },
    ],
  },
  {
    category: "Frameworks",
    description: "Frameworks used for responsive applications and API-driven systems.",
    items: [
      { name: "Next.js", icon: "/images/nextjs.png" },
      { name: "FastAPI", icon: "/images/fastapi.png" },
    ],
  },
  {
    category: "Tools",
    description: "Tools and platforms for collaboration, design, data, and deployment.",
    items: [
      { name: "GitHub", icon: "/images/github.webp" },
      { name: "VS Code", icon: "/images/vscode.png" },
      { name: "Figma", icon: "/images/figma.png" },
      { name: "Supabase", icon: "/images/supabase.png" },
      { name: "Firebase", icon: "/images/firebase.png" },
    ],
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
    subtitle: "AI-Driven Diagnosis and Prescription System for Common Illnesses",
    description:
      "Thesis project featuring diagnosis, prescription, and appointment management with account verification, video-call integration, database migrations, and CI/CD.",
    tech: ["JavaScript", "Python", "CSS", "PostgreSQL", "PLpgSQL", "Supabase", "Firebase", "Jupyter Notebook"],
    highlights: [
      "AI-driven diagnosis & electronic prescription workflows",
      "Secure account verification & real-time video-call integration",
      "Automated database migrations & CI/CD deployment pipeline",
    ],
    accent: "linear-gradient(90deg, rgba(34,211,238,0.95), rgba(59,130,246,0.95), rgba(139,92,246,0.95))",
    previewSrc: "/images/medichain.png",
    previewPath: "/images/medichain.png",
    previewAlt: "MediChain website preview",
  },
  {
    title: "Mercato",
    subtitle: "E-Commerce Content Management System",
    description:
      "Visual e-commerce website builder with Figma-style drag-and-drop editing, reusable sections, product binding, dynamic product components, and configurable themes.",
    tech: ["TypeScript", "JavaScript", "React", "Craft.js", "Node.js", "Firebase", "Tailwind CSS", "Figma"],
    highlights: [
      "Figma-style drag-and-drop canvas editing with Craft.js",
      "Reusable section architecture & dynamic product data binding",
      "Configurable store themes with real-time preview & canvas interactions",
    ],
    accent: "linear-gradient(90deg, rgba(236,72,153,0.95), rgba(244,63,94,0.95), rgba(249,115,22,0.95))",
    previewSrc: "/images/mercato.png",
    previewPath: "/images/mercato.png",
    previewAlt: "Mercato website preview",
  },
  {
    title: "Inspire Cinema",
    subtitle: "Ticket & Cinema Booking System",
    description:
      "Ticketing platform with responsive landing, seat selection, checkout, frontend payment flow, and robust backend booking and payment logic.",
    tech: ["TypeScript", "HTML/CSS", "Node.js", "Next.js", "React", "Tailwind CSS", "Prisma", "PostgreSQL"],
    highlights: [
      "Interactive movie browsing & visual seat selection matrix",
      "End-to-end checkout & frontend payment integration flows",
      "Reliable backend booking logic & ticket reservation management",
    ],
    accent: "linear-gradient(90deg, rgba(245,158,11,0.95), rgba(234,88,12,0.95), rgba(239,68,68,0.95))",
    previewSrc: "/images/cinema.png",
    previewPath: "/images/cinema.png",
    previewAlt: "Inspire Cinema Ticket System website preview",
  },
  {
    title: "Pawnshop Management System",
    subtitle: "Branch Operations & Financial Monitoring Platform",
    description:
      "Pawnshop management system with branch finance tracking, employee authorization, inventory management, daily operational sessions, real-time alerts, and QR scanning.",
    tech: ["NestJS", "TypeScript", "Prisma", "PostgreSQL", "Supabase", "JWT", "Redis", "Jest", "Next.js", "React", "Tailwind CSS"],
    highlights: [
      "Branch finance tracking, employee authorization & role security",
      "Real-time operational alerts, QR-code scanning & printable PDF reports",
      "Daily operational session management & inventory expiration monitoring",
    ],
    accent: "linear-gradient(90deg, rgba(16,185,129,0.95), rgba(34,211,238,0.95), rgba(59,130,246,0.95))",
    previewSrc: "/images/pms.png",
    previewPath: "/images/pms.png",
    previewAlt: "Pawnshop Management System website preview",
  },
  {
    title: "QuickPawn PMS",
    subtitle: "Multi-Tenant SaaS Platform",
    description:
      "Multi-tenant SaaS pawnshop management platform with responsive dashboards, REST APIs, database models, secure multi-branch access control, and scalable workflows.",
    tech: ["TypeScript", "Next.js", "React", "Tailwind CSS", "NestJS", "Node.js", "PostgreSQL", "Prisma", "Supabase", "Docker", "Jest"],
    highlights: [
      "Multi-tenant architecture with secure isolated branch access control",
      "High-performance REST APIs & scalable database models with Prisma",
      "Responsive analytics dashboards & end-to-end business workflows",
    ],
    accent: "linear-gradient(90deg, rgba(14,165,233,0.95), rgba(99,102,241,0.95), rgba(168,85,247,0.95))",
    previewSrc: "/images/quickpawn.png",
    previewPath: "/images/quickpawn.png",
    previewAlt: "QuickPawn PMS SaaS website preview",
  },
  {
    title: "QuickPawn Admin Portal",
    subtitle: "Multi-Tenant SaaS Administration & Billing",
    description:
      "Multi-tenant SaaS administration portal with automated tenant provisioning, subscription and billing management, role-based access control, and transactional emails.",
    tech: ["Next.js", "React", "NestJS", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma ORM", "Supabase"],
    highlights: [
      "Automated tenant onboarding, provisioning & tier management",
      "Subscription lifecycle, invoice tracking & billing management",
      "Role-based access control (RBAC) & transactional email notifications",
    ],
    accent: "linear-gradient(90deg, rgba(139,92,246,0.95), rgba(217,70,239,0.95), rgba(244,63,94,0.95))",
    previewSrc: "/images/quickpawn-admin.png",
    previewPath: "/images/quickpawn-admin.png",
    previewAlt: "QuickPawn PMS Admin Portal preview",
  },
  {
    title: "ServiceWho",
    subtitle: "Service Marketplace Platform",
    description:
      "Service marketplace connecting customers with service providers through role-based authentication, service browsing, booking management, and secure database architecture.",
    tech: ["Next.js", "React", "Node.js", "Express.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS"],
    highlights: [
      "Dual role-based authentication & profile handling for users and providers",
      "Interactive category browsing, search filters & booking management",
      "Secure relational data architecture powered by Prisma & PostgreSQL",
    ],
    accent: "linear-gradient(90deg, rgba(20,184,166,0.95), rgba(6,182,212,0.95), rgba(59,130,246,0.95))",
    previewSrc: "/images/servicewho.png",
    previewPath: "/images/servicewho.png",
    previewAlt: "ServiceWho Marketplace Platform preview",
  },
  {
    title: "BETH",
    subtitle: "Binance & Ethereum Algorithmic Trading Platform",
    description:
      "Personal algorithmic trading research platform for BTC/USDT and ETH/USDT with backtesting, paper trading, historical data analysis, and a monitoring dashboard.",
    tech: ["Python", "PostgreSQL", "SQLite", "Next.js", "TypeScript", "Tailwind CSS"],
    highlights: [
      "BTC/USDT & ETH/USDT automated strategy research & execution engine",
      "Comprehensive backtesting simulator with historical data analysis",
      "Real-time web monitoring dashboard for active strategies and paper trades",
    ],
    accent: "linear-gradient(90deg, rgba(234,179,8,0.95), rgba(249,115,22,0.95), rgba(16,185,129,0.95))",
    previewSrc: "/images/beth.png",
    previewPath: "/images/beth.png",
    previewAlt: "BETH Algorithmic Trading Platform preview",
  },
];

const education = [
  {
    title: "Bachelor of Science in Computer Science",
    school: "Taguig City University",
    date: "2022 - 2026",
    detail: "Final CGPA: 1.65",
    previewSrc: "/images/tcu.jpg",
  },
  {
    title: "Senior High School - TechVoc: Computer Programming",
    school: "Western Bicutan National High School",
    date: "2020 - 2022",
    detail: "Final Grade: 94",
    previewSrc: "/images/wbnhs.png",
  },
];

const contactCards = [
  {
    label: "Email",
    value: "jeremiahcurias@gmail.com",
    href: "mailto:jeremiahcurias@gmail.com",
    icon: <Image src="/images/gmail.png" alt="Email" width={18} height={18} className="object-contain" />,
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
    icon: <Image src="/images/google-maps.png" alt="Location" width={18} height={18} className="object-contain" />,
  },
  {
    label: "GitHub",
    value: "curiaz",
    href: "https://github.com/curiaz",
    icon: <Image src="/images/github.webp" alt="GitHub" width={18} height={18} className="object-contain" />,
  },
  {
    label: "LinkedIn",
    value: "Jeremiah James Curias",
    href: "https://www.linkedin.com/in/jeremiah-james-curias-b71076320/",
    icon: <Image src="/images/linkedin.png" alt="LinkedIn" width={18} height={18} className="object-contain" />,
  },
];

export default function Home() {
  return (
    <main id="top" className="relative overflow-x-clip">
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden" style={{ background: "radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)" }}>
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
      </div>

      <Navbar />

      <section className="mx-auto max-w-7xl px-3.5 pb-9 pt-5 sm:px-6 sm:pb-12 sm:pt-8 md:pb-14 lg:px-8 lg:pb-20 lg:pt-14">
        <div className="glass-panel relative overflow-hidden rounded-[22px] p-3.5 sm:rounded-[30px] sm:p-6 md:p-8 lg:rounded-[36px] lg:p-12 xl:p-14">
          <div className="grid items-center gap-7 md:gap-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(320px,0.88fr)] lg:items-stretch">
            <ScatterWrapper rotation={-2} className="min-w-0">
              <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1.5 text-xs text-cyan-100 sm:px-4 sm:py-2 sm:text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_5px_rgba(16,185,129,0.12)] sm:h-2 sm:w-2" />
                Open to opportunities
              </div>

              <div className="mt-4 flex items-center gap-4 sm:gap-5 md:gap-7 lg:gap-8">
                <ProfileImageModal src="/images/curias.jpg" alt="Portrait of Jeremiah James A. Curias" />
                <div className="min-w-0">
                  <h1 className="max-w-4xl text-[1.75rem] font-semibold leading-tight tracking-tight text-white text-balance min-[390px]:text-4xl md:text-5xl lg:text-[3.35rem] xl:text-6xl">
                    Jeremiah James A. Curias
                  </h1>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400 sm:mt-3 sm:text-sm sm:tracking-[0.35em]">
                    Aspiring Software Developer
                  </p>
                </div>
              </div>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8 md:text-lg lg:text-xl">
                I build reliable web systems with clean interfaces, practical backend logic, and a strong focus on real users.
              </p>

              <div className="mt-6 grid gap-2.5 min-[480px]:grid-cols-3 sm:mt-8 sm:gap-3">
                <a
                  href="#projects"
                  className="w-full inline-flex items-center justify-center rounded-full bg-cyan-400 px-5 py-2.5 text-xs font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-300 hover:shadow-[0_18px_35px_rgba(34,211,238,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 sm:px-6 sm:py-3 sm:text-sm"
                >
                  View Projects
                </a>
                <a
                  href="#contact"
                  className="w-full inline-flex items-center justify-center rounded-full border border-slate-700 bg-white/5 px-5 py-2.5 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 sm:px-6 sm:py-3 sm:text-sm"
                >
                  Contact Me
                </a>
                <a
                  href="/Jeremiah%20James%20Curias%20-%20CV.pdf"
                  download="Jeremiah James Curias - CV.pdf"
                  className="w-full inline-flex items-center justify-center rounded-full border border-violet-400/30 bg-violet-500/10 px-5 py-2.5 text-xs font-semibold text-violet-100 transition hover:-translate-y-0.5 hover:border-violet-300/50 hover:bg-violet-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/60 sm:px-6 sm:py-3 sm:text-sm"
                >
                  Download CV
                </a>
              </div>

              <div className="mt-6 grid gap-2.5 min-[480px]:grid-cols-3 sm:mt-8 sm:gap-3">
                {[
                  { value: "2026", label: "CS graduate" },
                  { value: "8", label: "Featured projects" },
                  { value: "Full-stack", label: "Web focus" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3 sm:rounded-3xl sm:p-4">
                    <p className="text-lg font-semibold text-white sm:text-2xl">{stat.value}</p>
                    <p className="mt-1 text-xs text-slate-400 sm:text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
              </div>
            </ScatterWrapper>

            <ScatterWrapper rotation={2} delay={0.2} className="relative min-w-0 h-full">
              <aside className="relative min-w-0 h-full">
              <div className="glass-panel relative flex h-full flex-col justify-between overflow-hidden rounded-[22px] p-3.5 sm:rounded-[30px] sm:p-5 md:p-6">
                <div className="flex flex-col gap-3 border-b border-white/5 pb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pb-5">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.26em] text-slate-400 sm:text-xs sm:tracking-[0.32em]">Profile</p>
                    <p className="mt-1.5 text-base font-semibold text-white sm:mt-2 sm:text-lg">Aspiring Software Developer / Engineer</p>
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
            </ScatterWrapper>
          </div>
        </div>
      </section>

      <section id="about" className={sectionClass}>
        <ScatterWrapper>
          <SectionHeading
            eyebrow="About"
            title="Practical software built with care"
            description="Computer Science graduate with hands-on experience in web development, backend APIs, database integration, testing, and collaborative delivery."
          />
        </ScatterWrapper>

        <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)]">
          <ScatterWrapper rotation={-2}>
            <div className={`${cardClass} lg:p-8 h-full`}>
              <p className="text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
                I enjoy turning requirements into useful, maintainable systems. My work includes internship development on an operational pawnshop platform and academic project work on a secure healthcare system, with a focus on clean implementation, debugging, documentation, and user-centered decisions.
              </p>
            </div>
          </ScatterWrapper>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              { label: "Development", value: "Web apps, APIs, and feature delivery" },
              { label: "Data", value: "Records, transactions, and integrations" },
              { label: "Delivery", value: "Testing, debugging, and documentation" },
              { label: "Teamwork", value: "Clear communication and reliable follow-through" },
            ].map((item, index) => (
              <ScatterWrapper key={item.label} rotation={index % 2 === 0 ? 2 : -2} delay={index * 0.1}>
                <div className={cardClass}>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-cyan-300/80 sm:text-xs sm:tracking-[0.28em]">{item.label}</p>
                  <p className="mt-2 text-xs leading-6 text-slate-200 sm:mt-3 sm:text-sm sm:leading-7">{item.value}</p>
                </div>
              </ScatterWrapper>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className={sectionClass}>
        <ScatterWrapper>
          <SectionHeading
            eyebrow="Skills"
            title="Focused stack for modern web delivery"
            description="A concise toolkit for building responsive interfaces, API-driven features, and maintainable project workflows."
          />
        </ScatterWrapper>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {skills.map((group, index) => (
            <ScatterWrapper key={group.category} rotation={index % 2 === 0 ? -3 : 3} delay={(index % 3) * 0.1}>
              <article className={`${cardClass} h-full`}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400 sm:text-xs sm:tracking-[0.3em]">0{index + 1}</p>
                  <h3 className="mt-1.5 text-lg font-semibold text-white sm:mt-2 sm:text-2xl">{group.category}</h3>
                </div>
              </div>
              <p className="mt-3 text-xs leading-6 text-slate-300 sm:mt-4 sm:text-sm sm:leading-7">{group.description}</p>
              <div className="mt-4 flex flex-wrap gap-2 sm:mt-5 sm:gap-3">
                {group.items.map((skill) => (
                  <SkillBadge key={skill.name} label={skill.name} icon={skill.icon} />
                ))}
              </div>
              </article>
            </ScatterWrapper>
          ))}
        </div>
      </section>

      <section id="experience" className={sectionClass}>
        <ScatterWrapper>
          <SectionHeading
            eyebrow="Experience"
            title="Hands-on work and service experience"
            description="Development and customer-facing roles that shaped technical delivery, communication, and dependable teamwork."
          />
        </ScatterWrapper>

        <div className="mt-8 space-y-5">
          {experience.map((item, index) => (
            <ScatterWrapper key={`${item.role}-${item.company}`} rotation={index % 2 === 0 ? -2 : 2}>
              <article
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
            </ScatterWrapper>
          ))}
        </div>
      </section>

      <section id="projects" className={sectionClass}>
        <ScatterWrapper>
          <SectionHeading
            eyebrow="Featured Projects"
            title="Selected work with practical outcomes"
            description="Projects that show backend integration, data workflows, security awareness, and responsive frontend implementation."
          />
        </ScatterWrapper>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <ScatterWrapper key={project.title} rotation={index % 2 === 0 ? -3 : 3} delay={(index % 3) * 0.1}>
              <ProjectCard
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
            </ScatterWrapper>
          ))}
        </div>
      </section>

      <section id="education" className={sectionClass}>
        <ScatterWrapper>
          <SectionHeading
            eyebrow="Education"
            title="Academic foundation"
            description="Formal training in computer science and programming, supported by project-based development experience."
          />
        </ScatterWrapper>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {education.map((item, index) => (
            <ScatterWrapper key={item.title} rotation={index % 2 === 0 ? -4 : 4} delay={index * 0.1}>
              <article className={`${cardClass} flex flex-col h-full`}>
              {item.previewSrc && (
                <div className="mb-4 overflow-hidden rounded-[16px] border border-white/10 sm:mb-5 sm:rounded-[20px]">
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={item.previewSrc}
                      alt={`${item.school} preview`}
                      fill
                      className="object-cover transition duration-500 hover:scale-[1.02]"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                </div>
              )}
              <div className="flex flex-col grow">
                <p className="text-[11px] uppercase tracking-[0.24em] text-cyan-300/80 sm:text-xs sm:tracking-[0.28em]">{item.date}</p>
                <h3 className="mt-2 text-lg font-semibold text-white sm:mt-3 sm:text-2xl">{item.title}</h3>
                <p className="mt-1.5 text-xs text-slate-400 sm:mt-2 sm:text-sm">{item.school}</p>
                <p className="mt-4 text-xs leading-6 text-slate-300 sm:mt-auto sm:pt-4 sm:text-sm sm:leading-7">{item.detail}</p>
              </div>
              </article>
            </ScatterWrapper>
          ))}
        </div>
      </section>

      <section id="contact" className={sectionClass}>
        <ScatterWrapper>
          <SectionHeading
            eyebrow="Contact"
            title="Let's discuss roles and project opportunities"
            description="Open to software development, web development, system support, and entry-level IT opportunities."
          />
        </ScatterWrapper>

        <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
            {contactCards.map((card, index) => (
              <ScatterWrapper key={card.label} rotation={index % 2 === 0 ? -3 : 3} delay={index * 0.1}>
                <ContactCard
                  label={card.label}
                  value={card.value}
                  href={card.href}
                  icon={<span aria-hidden="true">{card.icon}</span>}
                />
              </ScatterWrapper>
            ))}
          </div>

          <ScatterWrapper rotation={1} delay={0.2} className="h-full">
            <div className="glass-panel flex h-full flex-col rounded-[22px] p-3.5 sm:rounded-[30px] sm:p-6 md:p-8">
              <div className="flex flex-col gap-3 border-b border-white/5 pb-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4 sm:pb-5">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400 sm:text-xs sm:tracking-[0.35em]">Quick Message</p>
                <h3 className="mt-1.5 text-lg font-semibold text-white sm:mt-2 sm:text-2xl">Email Me</h3>
              </div>
            </div>

            <ContactForm />
            </div>
          </ScatterWrapper>
        </div>
      </section>

      <footer className="border-t border-white/5 bg-slate-950/65">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-8 text-center sm:px-6 lg:px-8">
          <p className="text-sm leading-6 text-slate-400">
            &copy; 2026 Jeremiah James A. Curias. All rights reserved.
          </p>
        </div>
      </footer>

      <BackToTop />
    </main>
  );
}
