type CardProps = {
  title: string;
  href?: string;
};

function Card({ title, href }: CardProps) {
  const content = <h3 className="m-0 text-lg font-bold">{title}</h3>;
  return (
    <article className="border border-[#d9ded9] p-5">
      {href ? <a className="underline" href={href}>{content}</a> : content}
    </article>
  );
}

export function NewsCard(props: CardProps) {
  return <Card {...props} />;
}

export function EventCard(props: CardProps) {
  return <Card {...props} />;
}

export function PublicationCard(props: CardProps) {
  return <Card {...props} />;
}

export function EngagementCard(props: CardProps) {
  return <Card {...props} />;
}
