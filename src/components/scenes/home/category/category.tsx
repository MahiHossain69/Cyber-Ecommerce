import Link from "next/link";
import { Smartphone, Watch, Camera, Headphones, Monitor, Gamepad2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  {
    id: 1,
    name: "Phones",
    icon: Smartphone,
    link: "/smartphones",
  },
  {
    id: 2,
    name: "Smart Watches",
    icon: Watch,
    link: "/smartwatches",
  },
  {
    id: 3,
    name: "Cameras",
    icon: Camera,
    link: "/cameras",
  },
  {
    id: 4,
    name: "Headphones",
    icon: Headphones,
    link: "/headphones",
  },
  {
    id: 5,
    name: "Computers",
    icon: Monitor,
    link: "/computers",
  },
  {
    id: 6,
    name: "Gaming",
    icon: Gamepad2,
    link: "/gaming",
  },
];

export function Category() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#FAFAFA]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-black">Browse By Category</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full cursor-pointer bg-white border-gray-200 hover:bg-gray-50"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full cursor-pointer bg-white border-gray-200 hover:bg-gray-50"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link key={category.id} href={category.link}>
                <Button
                  variant="ghost"
                  className="w-full bg-[#EDEDED] cursor-pointer hover:bg-[#E0E0E0] rounded-2xl h-auto p-6 flex flex-col items-center justify-center gap-3 transition-all duration-200 hover:shadow-md group border-0"
                >
                  <div className="w-12 h-12 flex items-center justify-center">
                    <Icon className="w-10! h-10! text-black group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm font-medium text-black text-center whitespace-normal">
                    {category.name}
                  </span>
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
