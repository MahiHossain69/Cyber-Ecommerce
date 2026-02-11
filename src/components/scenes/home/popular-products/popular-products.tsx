import Image from "next/image";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    title: "Popular Products",
    description: "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
    image: "/popular-product/pp-1.svg",
    bgColor: "bg-[#F5F5F5]",
  },
  {
    id: 2,
    title: "Ipad Pro",
    description: "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
    image: "/popular-product/pp-2.svg",
    bgColor: "bg-[#F5F5F5]",
  },
  {
    id: 3,
    title: "Samsung Galaxy",
    description: "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
    image: "/popular-product/pp-3.svg",
    bgColor: "bg-[#F5F5F5]",
  },
  {
    id: 4,
    title: "Macbook Pro",
    description: "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
    image: "/popular-product/pp-4.svg",
    bgColor: "bg-[#2C2C2C]",
  },
];

export function PopularProducts() {
  return (
    <section className=" bg-[#FAFAFA]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className=" overflow-hidden flex flex-col transition-all duration-500 ease-in-out hover:bg-[#2C2C2C] group hover:shadow-xl"
            >
              {/* Product Image */}
              <div className="relative w-full aspect-square p-8">
                <div className="relative w-full h-full">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col gap-4 p-6 pt-0">
                <h3 className="text-xl sm:text-2xl font-normal text-black group-hover:text-white transition-colors duration-500">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-500 group-hover:text-gray-400 leading-relaxed line-clamp-3 transition-colors duration-500">
                  {product.description}
                </p>
                <Button
                  variant="outline"
                  className="w-full cursor-pointer border-black text-black hover:bg-black hover:text-white  group-hover:text-black transition-all duration-500 rounded-lg h-12 text-sm font-medium mt-2"
                >
                  Shop Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
