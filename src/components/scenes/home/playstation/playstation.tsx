import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Playstation() {
  return (
    <section className=" bg-white">
      <div className="mx-auto max-w-360 px-0 sm:px-6 lg:px-8">
        {/* Mobile Layout - Stacked Vertically */}
        <div className="flex flex-col xl:hidden">
          {/* Apple AirPods Max - Mobile */}
          <div className="bg-[#EDEDED] overflow-hidden relative flex flex-col items-center py-8 px-6">
            <div className="w-full max-w-50 h-50 relative mb-6">
              <Image
                src="/home/playstation/airpodmob.svg"
                alt="Apple AirPods Max"
                fill
                className="object-contain"
              />
            </div>
            <div className="text-center">
              <h3 className="text-[34px] font-light text-black">
                Apple AirPods <span className="font-bold">Max</span>
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Computational audio. Listen, it's powerful
              </p>
            </div>
          </div>

          {/* Apple Vision Pro - Mobile */}
          <div className="bg-[#353535] overflow-hidden relative flex flex-col items-center py-8 px-6">
            <div className="w-full max-w-50 h-50 relative mb-6">
              <Image
                src="/home/playstation/visionmob.svg"
                alt="Apple Vision Pro"
                fill
                className="object-contain"
              />
            </div>
            <div className="text-center">
              <h3 className="text-[34px] font-light text-white">
                Apple Vision <span className="font-bold">Pro</span>
              </h3>
              <p className="text-sm text-gray-400 mt-2">
                An immersive way to experience entertainment
              </p>
            </div>
          </div>

          {/* PlayStation 5 - Mobile */}
          <div className="bg-white overflow-hidden relative flex flex-col items-center py-8 px-6">
            <div className="w-full max-w-50 h-50 relative mb-6">
              <Image
                src="/home/playstation/playstationmob.svg"
                alt="PlayStation 5"
                fill
                className="object-contain"
              />
            </div>
            <div className="text-center">
              <h2 className="text-[34px] font-medium text-black mb-2">
                Playstation 5
              </h2>
              <p className="text-sm text-gray-500">
                Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.
              </p>
            </div>
          </div>

          {/* MacBook Air - Mobile */}
          <div className="bg-[#EDEDED] overflow-hidden relative flex flex-col items-center py-8 px-6">
            <div className="w-full max-w-70 h-50 relative mb-6">
              <Image
                src="/home/playstation/macbookmob.svg"
                alt="MacBook Air"
                fill
                className="object-contain"
              />
            </div>
            <div className="text-center">
              <h2 className="text-[34px] font-light text-black">
                Macbook <span className="font-bold">Air</span>
              </h2>
              <p className="text-sm text-gray-500 mt-2 mb-6">
                The new 15-inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.
              </p>
             <Link href="/computers">
              <Button
                variant="outline"
                className="border-black bg-transparent text-black hover:bg-black hover:text-white transition-all duration-300 px-12 py-5 rounded-md w-full max-w-50"
              >
                Shop Now
              </Button>
             </Link>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Original Design */}
        <div className="hidden xl:flex flex-row gap-0">
          {/* Left Section - PlayStation 5 on top, AirPods and Vision Pro below */}
          <div className="flex flex-col gap-0 w-180">
            {/* PlayStation 5 - 720x328 */}
            <div className="bg-white rounded-none overflow-hidden relative h-82 flex items-center">
              {/* Image on Left */}
              <div className="w-1/2 2xl:h-73.5 xl:h-54 relative">
                <Image
                  src="/home/playstation/playstation.svg"
                  alt="PlayStation 5"
                  height={343}
                  width={360}
                  className="object-contain object-left"
                />
              </div>
              {/* Text on Right */}
              <div className="w-1/2 pr-6 xl:pr-8">
                <h2 className="text-3xl xl:text-[29px] font-medium text-black mb-3">
                  Playstation 5
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.
                </p>
              </div>
            </div>

            {/* Bottom Row - AirPods and Vision Pro */}
            <div className="flex flex-row gap-0">
              {/* Apple AirPods Max - 360x272 */}
              <div className="bg-[#EDEDED] rounded-none overflow-hidden relative h-68 w-1/2 flex items-center">
                {/* Image on Left */}
                <div className="w-1/2 h-full relative">
                  <Image
                    src="/home/playstation/airpod.svg"
                    alt="Apple AirPods Max"
                    fill
                    className="object-contain object-left"
                  />
                </div>
                {/* Text on Right */}
                <div className="w-1/2 pr-4 xl:pr-6">
                  <h3 className="text-[29px] font-light text-black">
                    Apple
                  </h3>
                  <h3 className="text-[29px] font-light text-black">
                    AirPods
                  </h3>
                  <h3 className="text-[29px] font-semibold text-black mb-2">
                    Max
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Computational audio. Listen, it's powerful
                  </p>
                </div>
              </div>

              {/* Apple Vision Pro - 360x272 */}
              <div className="bg-[#353535] rounded-none overflow-hidden relative h-68 w-1/2 flex items-center">
                {/* Image on Left */}
                <div className="w-1/2 h-40 relative">
                  <Image
                    src="/home/playstation/vision.svg"
                    alt="Apple Vision Pro"
                    height={190}
                    width={136}
                    className="object-contain object-center"
                  />
                </div>
                {/* Text on Right */}
                <div className="w-1/2 pr-4 xl:pr-6">
                  <h3 className="text-[29px] font-light text-white">
                    Apple
                  </h3>
                  <h3 className="text-[29px] font-light text-white">
                    Vision{" "}
                    <span className="font-semibold">Pro</span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                    An immersive way to experience entertainment
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - MacBook Air - 720x600 */}
          <div className="w-180 h-150 bg-[#EDEDED] rounded-none overflow-hidden relative flex flex-col justify-between p-8 xl:p-12">
            <div className="mt-30 relative z-10">
              <h2 className="text-5xl xl:text-6xl font-light text-black">
                Macbook
              </h2>
              <h2 className="text-5xl xl:text-6xl font-bold text-black mb-4">
                Air
              </h2>
              <p className="text-base text-gray-500 max-w-90 mb-6">
                The new 15-inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.
              </p>
             <Link href="/computers">
              <Button
                variant="outline"
                className="border-black cursor-pointer bg-transparent text-black hover:bg-black hover:text-white transition-all duration-300 px-8 py-5 rounded-md"
              >
                Shop Now
              </Button>
             </Link>
            </div>
            {/* Background Image */}
            <div className="absolute my-7 right-0 w-3/4 h-3/4">
              <Image
                src="/home/playstation/macbook.svg"
                alt="MacBook Air"
                fill
                className="object-contain object-bottom-right"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
