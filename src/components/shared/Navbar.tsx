"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import LogOut from "../modules/auth/logout/LogOut";
import Logo from "./logo";
import { getUser } from "@/services/auth";
import { UserTypes } from "@/types";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<UserTypes | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const getCurrentUser = async () => {
      const userData = await getUser();
      setUser(userData);
    };
    getCurrentUser();
  }, []);
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Meal", href: "/meal" },
    //  meal details
    { name: "Providers", href: "/providers" },
    // provider details

    // customer routes
    { name: "Card", href: "/cart" },
    { name: "Checkout", href: "/checkout" },
    { name: "My Orders", href: "/orders" },
    // order details /:id
    { name: "profile", href: "/profile" },

    // provider routes
    { name: "Dashboard", href: "/provider/dashboard" },
    { name: "Menu", href: "/provider/menu" },
    { name: "Orders", href: "/provider/orders" },

    // admin routes
    { name: "Dashboard", href: "/admin" },
    { name: "Users", href: "/admin/users" }, // manage uesrs
    { name: "Orders", href: "/admin/orders" }, // all orders
    { name: "Categories", href: "/admin/categories" }, // Manage categories
  ];
  const firstName = user?.name?.trim()?.split(" ")?.[0] || "";
  return (
    <nav className="w-full border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Logo />

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-red-500"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <>
              <Link href={"/dashboard"}>
                <Button>Dashboard</Button>
              </Link>
              <LogOut />
            </>
          ) : (
            <Link href={"/login"}>
              <Button>Login</Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          {firstName}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size={"icon"}>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex flex-col gap-3 px-3 pt-3"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`text-lg font-medium transition-colors ${
                    pathname === link.href ? "text-red-500" : "text-gray-800"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {user ? (
                <LogOut />
              ) : (
                <Link href={"/login"}>
                  <Button>Login</Button>
                </Link>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
