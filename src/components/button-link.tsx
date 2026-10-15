import Link from "next/link";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "accent" | "inverse";
};

export function ButtonLink({ href, children, variant = "primary" }: ButtonLinkProps) {
  const styles = {
    primary:
      "bg-brand-primary text-text-inverse hover:bg-brand-secondary border-transparent",
    accent: "bg-brand-accent text-text-on-accent hover:brightness-110 border-transparent",
    ghost:
      "bg-transparent text-brand-secondary border-brand-secondary hover:border-brand-accent hover:text-brand-primary",
    inverse:
      "bg-transparent text-text-inverse border-text-inverse/50 hover:border-brand-accent-soft",
  }[variant];

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-[var(--radius-md)] border-2 px-5 py-2.5 text-sm font-semibold no-underline transition-colors ${styles}`}
    >
      {children}
    </Link>
  );
}
