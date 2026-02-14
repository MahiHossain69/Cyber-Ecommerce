import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface ProductBreadcrumbProps {
  category: string;
}

export function ProductBreadcrumb({ category }: ProductBreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm mb-8">
      <Link href="/" className="text-gray-400 hover:text-black transition-colors">
        Home
      </Link>
      <ChevronRight className="w-4 h-4 text-gray-400" />
      <span className="text-gray-400">Catalog</span>
      <ChevronRight className="w-4 h-4 text-gray-400" />
      <span className="text-black font-medium">{category}</span>
    </nav>
  );
}
