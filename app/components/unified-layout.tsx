"use client"

import type React from "react"
import NavigationHeader from "./navigation-header"
import GestureScrollHandler from "./gesture-scroll-handler"
import EnhancedThemeBackground from "./enhanced-theme-background"
import SectionNavigation from "./section-navigation"
import BackNavigation from "./back-navigation"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface UnifiedLayoutProps {
  children: React.ReactNode
  showSectionNav?: boolean
  showBackNav?: boolean
  backNavVariant?: "arrow" | "cross" | "home"
}

export default function UnifiedLayout({
  children,
  showSectionNav = true,
  showBackNav = true,
  backNavVariant = "arrow",
}: UnifiedLayoutProps) {
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 relative overflow-hidden transition-colors duration-500">
      <EnhancedThemeBackground />
      <GestureScrollHandler />
      <NavigationHeader />
      {showSectionNav && <SectionNavigation />}
      {showBackNav && !isHomePage && <BackNavigation variant={backNavVariant} position="top-left" showLabel={true} />}

      <main className="relative z-10">{children}</main>

      <footer className="border-t border-gray-200/30 dark:border-gray-700/30 relative z-10 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm mt-8 transition-colors duration-500">
        <div className="container flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6">
          <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Naga Pavan Muni. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            {["Terms of Service", "Privacy"].map((item) => (
              <Link
                key={item}
                className="text-xs hover:underline underline-offset-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-all duration-300 hover:scale-105"
                href="#"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  )
}
