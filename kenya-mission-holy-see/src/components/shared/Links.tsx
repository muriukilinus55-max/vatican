import type { AnchorHTMLAttributes, ReactNode } from "react";

export function AccessibleButton({
  children,
  className = "",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }) {
  return (
    <a
      className={`inline-flex min-h-11 items-center justify-center border border-[#006b3c] px-5 py-2.5 font-bold no-underline ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}

export function ExternalLink({
  href,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}
