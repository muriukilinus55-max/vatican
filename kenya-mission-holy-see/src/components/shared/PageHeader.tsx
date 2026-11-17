import { ContentContainer } from "@/components/layout/ContentContainer";

export function PageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <header className="border-b border-[#d9ded9] bg-[#f7f8f5]">
      <ContentContainer>
        <div className="py-10 sm:py-14">
          <h1 className="m-0 max-w-[780px] text-4xl font-bold leading-tight text-[#1d2521] sm:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 max-w-2xl text-lg leading-7 text-[#59665f]">{description}</p>
          ) : null}
        </div>
      </ContentContainer>
    </header>
  );
}
