export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f5f0] text-[#1f2933]">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-16">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#8b5e3c]">
          Portfolio
        </p>

        <h1 className="text-4xl font-bold leading-tight md:text-6xl">
          Hi, I&apos;m Jeremiah James A. Curias.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-700">
          I am a Computer Science graduate with experience in web development,
          system building, software documentation, and internship-based project
          development. I enjoy creating clean, useful, and user-friendly digital
          solutions.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="rounded-full bg-[#1f2933] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#374151]"
          >
            View Projects
          </a>

          <a
            href="mailto:dianahmaedelrio05@gmail.com"
            className="rounded-full border border-[#1f2933] px-6 py-3 text-sm font-semibold transition hover:bg-[#1f2933] hover:text-white"
          >
            Contact Me
          </a>
        </div>
      </section>
    </main>
  );
}