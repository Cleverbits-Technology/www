"use client";

import { FormEvent, useState } from "react";

import { site } from "@/data/site";

const topics = [
  "Proactive IT support",
  "Security",
  "Remote monitoring",
  "Not sure — describe the setup",
] as const;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "ready">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const suburb = String(data.get("suburb") ?? "").trim();
    const topic = String(data.get("topic") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = `${site.shortName} enquiry from ${name || "website"}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Suburb: ${suburb || "—"}`,
      `Topic: ${topic}`,
      "",
      message,
    ].join("\n");

    const recipient = site.contact.email || "";
    const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setStatus("ready");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-5">
      <p className="text-sm text-text-secondary">
        This form opens your email app with the details filled in. Nothing is stored on this site
        yet.
        {site.contact.email ? ` Messages go to ${site.contact.email}.` : ""}
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" required />
        <Field label="Email" name="email" type="email" autoComplete="email" required />
      </div>
      <Field
        label="Suburb"
        name="suburb"
        autoComplete="address-level2"
        placeholder={site.area.city}
      />
      <label className="block">
        <span className="text-sm font-semibold text-text-primary">What do you need?</span>
        <select
          name="topic"
          required
          className="mt-2 w-full rounded-[var(--radius-sm)] border border-border-subtle bg-surface-card px-3 py-2.5 text-text-primary"
          defaultValue=""
        >
          <option value="" disabled>
            Choose one
          </option>
          {topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="text-sm font-semibold text-text-primary">The setup, in brief</span>
        <textarea
          name="message"
          required
          rows={6}
          className="mt-2 w-full resize-y rounded-[var(--radius-sm)] border border-border-subtle bg-surface-card px-3 py-2.5 text-text-primary"
          placeholder="Devices, how you work, and what is going wrong or what you want kept an eye on."
        />
      </label>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-[var(--radius-md)] border-2 border-transparent bg-brand-primary px-5 py-2.5 text-sm font-semibold text-text-inverse hover:bg-brand-secondary"
      >
        Open email draft
      </button>
      {status === "ready" ? (
        <p className="text-sm text-text-secondary" role="status">
          If your email app did not open, copy the same details into a message and send it when an
          address is published here.
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-text-primary">{label}</span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-[var(--radius-sm)] border border-border-subtle bg-surface-card px-3 py-2.5 text-text-primary"
      />
    </label>
  );
}
