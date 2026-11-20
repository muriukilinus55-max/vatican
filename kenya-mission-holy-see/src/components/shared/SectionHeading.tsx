export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="border-l-4 border-[#006b3c] pl-4 text-2xl font-bold leading-tight">
      {children}
    </h2>
  );
}
