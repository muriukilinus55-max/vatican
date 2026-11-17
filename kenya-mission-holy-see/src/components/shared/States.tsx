export function LoadingState() {
  return <p role="status">Loading…</p>;
}

export function ErrorState({ message }: { message: string }) {
  return <p role="alert" className="border-l-4 border-[#bb0000] pl-4">{message}</p>;
}

export function NotFoundState({
  title,
  description,
  backLabel,
  href,
}: {
  title: string;
  description: string;
  backLabel: string;
  href: string;
}) {
  return (
    <main id="main-content" className="mx-auto max-w-2xl px-5 py-20">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="mt-4">{description}</p>
      <a className="mt-6 inline-block font-bold underline" href={href}>{backLabel}</a>
    </main>
  );
}
