"use client"

import type React from "react"
import NavigationHeader from "./navigation-header"
import GestureScrollHandler from "./gesture-scroll-handler"
import EnhancedBackground from "./enhanced-background"
import SectionNavigation from "./section-navigation"
import Link from "next/link"

interface UnifiedLayoutProps {
  children: React.ReactNode
  showSectionNav?: boolean
}

export default function UnifiedLayout({ children, showSectionNav = true }: UnifiedLayoutProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 relative overflow-hidden">
      <EnhancedBackground />
      <GestureScrollHandler />
      <NavigationHeader />
      {showSectionNav && <SectionNavigation />}

      <main className="relative z-10">{children}</main>

      <footer className="border-t border-gray-200/30 dark:border-gray-700/30 relative z-10 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm mt-8">
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
