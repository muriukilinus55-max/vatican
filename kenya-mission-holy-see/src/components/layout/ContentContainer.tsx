import type { ReactNode } from "react";

export function ContentContainer({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-8">{children}</div>;
}
