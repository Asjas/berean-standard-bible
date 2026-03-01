import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/book/$bookId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/book/$bookId"!</div>;
}
