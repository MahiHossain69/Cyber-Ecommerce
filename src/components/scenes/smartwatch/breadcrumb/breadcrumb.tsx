import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumb() {
  return (
    <nav className="flex items-center gap-2 text-sm mb-8">
      <Link href="/" className="text-gray-400 hover:text-black">
        Home
      </Link>
      <ChevronRight className="w-4 h-4 text-gray-400" />
      <Link href="/" className="text-gray-400 hover:text-black">
        Catalog
      </Link>
      <ChevronRight className="w-4 h-4 text-gray-400" />
      <span className="text-black font-medium">Smart Watches</span>
    </nav>
  );
}
