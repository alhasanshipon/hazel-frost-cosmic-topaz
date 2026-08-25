import { createFileRoute } from "@tanstack/react-router";
import { BusWala } from "@/components/bus-wala";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <BusWala />;
}
