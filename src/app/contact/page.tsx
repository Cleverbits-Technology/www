import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} about IT support, security, or remote monitoring in ${site.area.city}, ${site.area.region}.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <p className="text-sm font-semibold tracking-[0.12em] text-brand-accent uppercase">
        Contact
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-brand-primary">
        Tell us what you rely on
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-text-secondary">
        A useful first note includes the suburb, the devices that matter, and whether something is
        already broken or you want it watched. We will reply with a clear next step — including if
        we are not the right fit.
      </p>

      {site.contact.note ? (
        <p className="mt-6 rounded-[var(--radius-md)] border-l-4 border-brand-accent bg-surface-card px-4 py-3 text-sm text-text-secondary">
          {site.contact.note}
        </p>
      ) : null}

      <ContactForm />
    </div>
  );
}
