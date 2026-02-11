import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Banner() {
  return (
    <section className="relative w-full h-150 sm:h-125 lg:h-150 overflow-hidden">
      {/* Desktop Background Image */}
      <div className="hidden sm:block absolute inset-0">
        <Image
          src="/banner/banner.png"
          alt="Big Summer Sale"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Mobile Background Image */}
      <div className="block sm:hidden absolute inset-0">
        <Image
          src="/banner/bannerMob.png"
          alt="Big Summer Sale"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          {/* Big Summer */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-thin text-white mb-4 tracking-wide">
            Big Summer
          </h2>

          {/* Sale */}
          <h3 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 sm:mb-8">
            Sale
          </h3>

          {/* Description */}
          <p className="text-base sm:text-lg text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
            Commodo fames vitae vitae leo mauris in. Eu consequat.
          </p>

          {/* Shop Now Button */}
          <Button
            variant="outline"
            className="bg-transparent cursor-pointer border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 rounded-lg h-14 px-12 text-base font-medium"
          >
            Shop Now
          </Button>
        </div>
      </div>
    </section>
  );
}
