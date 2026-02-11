import { Hero } from "@/components/scenes/home/hero";
import { Category } from "@/components/scenes/home/category";
import { NewArrival } from "@/components/scenes/home/new-arrival";
import { PopularProducts } from "@/components/scenes/home/popular-products";
import { Discount } from "@/components/scenes/home/discount";
import { Banner } from "@/components/scenes/home/banner";
import { Playstation } from "@/components/scenes/playstation";

export default function Home() {
  return (
    <main>
      <Hero />
      <Playstation />
      <Category />
      <NewArrival />
      <PopularProducts />
      <Discount />
      <Banner />
    </main>
  );
}
