import { NotFoundState } from "@/components/shared/States";

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <NotFoundState
          title="Page not found"
          description="The requested page could not be found."
          backLabel="Return to the homepage"
          href="/en"
        />
      </body>
    </html>
  );
}
