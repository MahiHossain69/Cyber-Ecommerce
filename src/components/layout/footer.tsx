import Image from "next/image";
import Link from "next/link";
import { Twitter, Facebook, Instagram } from "lucide-react";

export function Footer() {
  const servicesLinks = [
    "Bonus program",
    "Gift cards",
    "Credit and payment",
    "Service contracts",
    "Non-cash account",
    "Payment",
  ];

  const assistanceLinks = [
    "Find an order",
    "Terms of delivery",
    "Exchange and return of goods",
    "Guarantee",
    "Frequently asked questions",
    "Terms of use of the site",
  ];

  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Mobile Layout */}
        <div className="block lg:hidden">
          {/* Logo and Description */}
          <div className="mb-12 text-center">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/Logo.svg"
                alt="cyber"
                width={65}
                height={23}
                className="brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm mx-auto">
              We are a residential interior design firm located in Portland. Our
              boutique-studio offers more than
            </p>
          </div>

          {/* Services Section */}
          <div className="mb-12 text-center">
            <h3 className="text-base font-semibold text-white mb-6">
              Services
            </h3>
            <ul className="space-y-4">
              {servicesLinks.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Assistance Section */}
          <div className="mb-12 text-center">
            <h3 className="text-base font-semibold text-white mb-6">
              Assistance to the buyer
            </h3>
            <ul className="space-y-4">
              {assistanceLinks.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Icons */}
          <div className="flex items-center justify-center gap-6">
            <Link
              href="#"
              className="text-white hover:text-gray-400 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-6 h-6" />
            </Link>
            <Link
              href="#"
              className="text-white hover:text-gray-400 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-6 h-6" />
            </Link>
            <Link
              href="#"
              className="text-white hover:text-gray-400 transition-colors"
              aria-label="TikTok"
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </Link>
            <Link
              href="#"
              className="text-white hover:text-gray-400 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </Link>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Logo and Description */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/Logo.svg"
                alt="cyber"
                width={65}
                height={23}
                className="brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-8">
              We are a residential interior design firm located in Portland. Our
              boutique-studio offers more than
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-6">
              <Link
                href="#"
                className="text-white hover:text-gray-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-white hover:text-gray-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-white hover:text-gray-400 transition-colors"
                aria-label="TikTok"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </Link>
              <Link
                href="#"
                className="text-white hover:text-gray-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Services Section */}
          <div>
            <h3 className="text-base font-semibold text-white mb-6">
              Services
            </h3>
            <ul className="space-y-3">
              {servicesLinks.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Assistance Section */}
          <div>
            <h3 className="text-base font-semibold text-white mb-6">
              Assistance to the buyer
            </h3>
            <ul className="space-y-3">
              {assistanceLinks.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
