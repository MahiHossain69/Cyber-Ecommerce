"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Input } from "../ui/input";
import { useWishlist } from "@/contexts/wishlist-context";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const { wishlistCount } = useWishlist();

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: "/", label: "Home", active: true },
    { href: "/about", label: "About", active: false },
    { href: "/contact", label: "Contact Us", active: false },
    { href: "/blog", label: "Blog", active: false },
  ];

  return (
    <>
      <style jsx global>{`
        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="shrink-0 transition-opacity hover:opacity-80">
              <Image src="/Logo.svg" alt="Cyber Logo" width={65} height={22}/>
            </Link>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden flex-1 max-w-md md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors" />
                <Input
                  type="text"
                  placeholder="Search"
                  className="w-full rounded-md focus-visible:ring-0 bg-gray-100 py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:bg-muted"
                />
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden items-center gap-8 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative text-sm font-medium transition-colors hover:text-foreground",
                    link.active
                      ? "text-foreground after:absolute after:-bottom-5 after:left-0 after:right-0 after:h-0.5 after:bg-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Icons */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Mobile Search Icon */}
              <Button
                variant="ghost"
                size="icon-sm"
                className="md:hidden transition-transform active:scale-95"
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Wishlist */}
              <Button
                variant="ghost"
                size="icon-sm"
                className="hidden cursor-pointer sm:inline-flex transition-transform hover:scale-110 active:scale-95 relative"
                aria-label="Wishlist"
                asChild
              >
                <Link href="/wishlist">
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              </Button>

              {/* Cart */}
              <Button
                variant="ghost"
                size="icon-sm"
                className="transition-transform cursor-pointer hover:scale-110 active:scale-95"
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="h-5 w-5" />
              </Button>

              {/* User */}
              <Button
                variant="ghost"
                size="icon-sm"
                className="transition-transform cursor-pointer hover:scale-110 active:scale-95"
                aria-label="User Account"
              >
                <User className="h-5 w-5" />
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon-sm"
                className="lg:hidden transition-transform active:scale-95"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Menu"
              >
                <div className="relative h-5 w-5">
                  <Menu
                    className={cn(
                      "absolute inset-0 h-5 w-5 transition-all duration-300",
                      mobileMenuOpen
                        ? "rotate-90 opacity-0 scale-0"
                        : "rotate-0 opacity-100 scale-100"
                    )}
                  />
                  <X
                    className={cn(
                      "absolute inset-0 h-5 w-5 transition-all duration-300",
                      mobileMenuOpen
                        ? "rotate-0 opacity-100 scale-100"
                        : "-rotate-90 opacity-0 scale-0"
                    )}
                  />
                </div>
              </Button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div
            className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out md:hidden",
              mobileSearchOpen ? "max-h-20 pb-4" : "max-h-0"
            )}
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search"
                className="w-full focus-visible:ring-0 rounded-md bg-muted/50 py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:bg-muted"
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={cn(
            "overflow-hidden border-t border-border bg-background transition-all duration-300 ease-in-out lg:hidden",
            mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            {/* Mobile Navigation Links */}
            <div className="flex flex-col space-y-1">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-muted/50",
                    link.active
                      ? "text-foreground bg-muted/30"
                      : "text-muted-foreground"
                  )}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: mobileMenuOpen
                      ? "slideInFromTop 0.3s ease-out forwards"
                      : "none",
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Wishlist Link */}
            <div className="mt-4 border-t border-border pt-4 sm:hidden">
              <Link
                href="/wishlist"
                className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-muted/50 hover:text-foreground relative"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Heart className="h-5 w-5" />
                <span>Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
