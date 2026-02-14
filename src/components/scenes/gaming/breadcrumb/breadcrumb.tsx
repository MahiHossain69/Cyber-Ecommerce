import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumb() {
  return (
    <nav className="flex items-center gap-2 text-sm mb-6">
      <Link href="/" className="text-gray-500 hover:text-black transition-colors">
        Home
      </Link>
      <ChevronRight className="w-4 h-4 text-gray-400" />
      <Link href="/">
      <span className="text-gray-500  hover:text-black">Catalog</span>
      </Link>
      <ChevronRight className="w-4 h-4 text-gray-400" />
      <span className="text-black font-medium">Gaming</span>
    </nav>
  );
}
