import { Hero } from "@/components/scenes/home/hero";
import { Category } from "@/components/scenes/home/category";
import { NewArrival } from "@/components/scenes/home/new-arrival";
import { Playstation } from "@/components/scenes/playstation";

export default function Home() {
  return (
    <main>
      <Hero />
      <Playstation />
      <Category />
      <NewArrival />
    </main>
  );
}
