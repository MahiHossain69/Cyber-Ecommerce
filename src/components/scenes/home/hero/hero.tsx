import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative bg-[#211C24] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center lg:h-158">
          {/* Left Content */}
          <div className="pt-12 pb-8 lg:py-0 text-center lg:text-left">
            {/* Pro.Beyond. */}
            <p className="text-gray-200 text-sm sm:text-[25px] mb-4 sm:mb-6 font-semibold tracking-wide">
              Pro.Beyond.
            </p>

            {/* Main Heading */}
            <h1 className="mb-6 2xl:flex 2xl:items-center 2xl:gap-3.5 sm:mb-6">
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-[96px] font-thin text-white tracking-tight leading-tight">
                IPhone 14
              </span>
              <span className="block text-4xl font-sans sm:text-5xl md:text-6xl lg:text-[96px] font-bold text-white mt-2 leading-tight">
                Pro
              </span>
            </h1>

            {/* Description */}
            <p className="text-gray-200 font-sans text-sm sm:text-base lg:text-lg mb-6 w-full mx-auto lg:mx-0 font-medium leading-relaxed">
              Created to change everything for the better. For everyone
            </p>

            {/* CTA Button */}
            <Button
              variant="outline"
              size="lg"
              className="border-white cursor-pointer text-white  bg-transparent hover:bg-white hover:text-black transition-all duration-300 px-8 sm:px-12 py-5 sm:py-6 text-base sm:text-lg rounded-md"
            >
              Shop Now
            </Button>
          </div>

          {/* Right Content - Phone Image */}
          <div className="relative flex justify-center lg:justify-end items-center  lg:pb-0">
            <div className="relative w-full max-w-70 sm:max-w-87.5 md:max-w-100 lg:max-w-112.5 xl:max-w-125">
              <Image
                src="/home/hero/hero.png"
                alt="iPhone 14 Pro"
                width={600}
                height={800}
                className="w-full h-auto object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
