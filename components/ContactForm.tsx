"use client";

import { useEffect, useState } from "react";

type FormState = {
  name: string;
  email: string;
  message: string;
};

type SubmitState = "idle" | "sending" | "success" | "error" | "fallback";

const initialState: FormState = {
  name: "",
  email: "",
  message: "",
};

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  useEffect(() => {
    if (submitState !== "success") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setStatus("");
      setSubmitState("idle");
    }, 2000);

    return () => window.clearTimeout(timeoutId);
  }, [submitState]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    setSubmitState("sending");
    setStatus("Sending your message...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = (await response.json()) as { error?: string; fallbackMailto?: string };

      if (data.fallbackMailto) {
        const subject = encodeURIComponent(`Portfolio inquiry from ${formState.name}`);
        const body = encodeURIComponent(
          `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
        );

        window.location.href = `mailto:${data.fallbackMailto}?subject=${subject}&body=${body}`;
        setFormState(initialState);
        setStatus("Email service is not configured on this deployment. Your email app is opening instead.");
        setSubmitState("fallback");
        return;
      }

      if (!response.ok) {
        setStatus(data.error || "Message could not be sent. Please try again.");
        setSubmitState("error");
        return;
      }

      setFormState(initialState);
      setStatus("Message sent successfully. Thank you for reaching out.");
      setSubmitState("success");
    } catch {
      setStatus("Message could not be sent. Please check your connection and try again.");
      setSubmitState("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="mt-4 sm:mt-6" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:gap-5">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-slate-200 sm:mb-2 sm:text-sm">
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={formState.name}
            onChange={(event) => setFormState((current) => ({ ...current, name: event.target.value }))}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50 focus:bg-white/10 sm:px-4 sm:py-3"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-slate-200 sm:mb-2 sm:text-sm">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={formState.email}
            onChange={(event) => setFormState((current) => ({ ...current, email: event.target.value }))}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50 focus:bg-white/10 sm:px-4 sm:py-3"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-slate-200 sm:mb-2 sm:text-sm">
            Message
          </label>
          <textarea
            id="message"
            required
            rows={5}
            value={formState.message}
            onChange={(event) => setFormState((current) => ({ ...current, message: event.target.value }))}
            className="w-full resize-y rounded-2xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50 focus:bg-white/10 sm:px-4 sm:py-3"
            placeholder="Tell me about the role, project, or support you need."
          />
        </div>

        {submitState !== "idle" ? (
          <div
            className={`rounded-2xl border px-4 py-3 text-xs leading-5 sm:text-sm sm:leading-6 ${
              submitState === "success"
                ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-100"
                : submitState === "fallback"
                  ? "border-amber-400/30 bg-amber-400/10 text-amber-100"
                : submitState === "error"
                  ? "border-rose-400/30 bg-rose-400/10 text-rose-100"
                  : "border-white/10 bg-white/5 text-slate-400"
            }`}
            aria-live="polite"
          >
            {status}
          </div>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2.5 text-xs font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 disabled:cursor-not-allowed disabled:opacity-60 sm:px-5 sm:py-3 sm:text-sm"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </div>
      </div>
    </form>
  );
}
