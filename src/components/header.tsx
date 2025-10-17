"use client";

import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link className="flex items-center space-x-2" href="/">
            <span className="font-bold">Next.js Starter</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-4">
          <div className="hidden items-center space-x-6 md:flex">
            <Link
              className="font-medium text-sm transition-colors hover:text-primary"
              href="/"
            >
              Home
            </Link>
            <Link
              className="font-medium text-sm transition-colors hover:text-primary"
              href="/dashboard"
            >
              Dashboard
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button asChild size="sm" variant="outline">
              <Link href="/login">Login</Link>
            </Button>
            <Button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              size="icon"
              variant="ghost"
            >
              <Sun className="dark:-rotate-90 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </nav>
      </div>
      <Separator />
    </header>
  );
}
