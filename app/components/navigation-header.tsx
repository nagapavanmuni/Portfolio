"use client"

import { Button } from "@/components/ui/button"
import { Menu, X, ExternalLink, Download } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import ScrollProgressIndicator from "./scroll-progress-indicator"
import { ThemeToggle } from "@/components/theme-toggle"

const navigationItems = [
  { id: "about", label: "About", href: "/about" },
  { id: "experience", label: "Experience", href: "/experience" },
  { id: "projects", label: "Projects", href: "/projects" },
  { id: "skills", label: "Skills", href: "/skills" },
  { id: "contact", label: "Contact", href: "/contact" },
]

// Updated resume links - primary and fallback
const RESUME_LINKS = {
  primary: "https://drive.google.com/file/d/15kl4qW_Q_61jKKSr2MvdBv9Eqk8zbA9d/view?usp=drive_link",
  fallback: "https://drive.google.com/file/d/1DnokfeJA9NrTS1IZEboiIUeq4Lw92HIB/view?usp=drive_link",
  download: "/resume/naga-pavan-muni-resume.pdf",
}

export default function NavigationHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [resumeLink, setResumeLink] = useState(RESUME_LINKS.primary)
  const pathname = usePathname()

  // Handle scroll state for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Test resume link accessibility
  useEffect(() => {
    const testResumeLink = async () => {
      try {
        // Try to fetch the primary link to see if it's accessible
        const response = await fetch(RESUME_LINKS.primary, { method: "HEAD", mode: "no-cors" })
        // If we get here without error, keep the primary link
        setResumeLink(RESUME_LINKS.primary)
      } catch (error) {
        // If primary link fails, use fallback
        console.warn("Primary resume link not accessible, using fallback")
        setResumeLink(RESUME_LINKS.fallback)
      }
    }

    testResumeLink()
  }, [])

  const handleMobileNavClick = () => {
    setIsMobileMenuOpen(false)
  }

  const handleResumeClick = () => {
    // Try primary link first, then fallback
    const linkToOpen = resumeLink
    window.open(linkToOpen, "_blank", "noopener,noreferrer")
  }

  const handleDownloadResume = () => {
    // Create a download link for the local PDF
    const link = document.createElement("a")
    link.href = RESUME_LINKS.download
    link.download = "Naga-Pavan-Muni-Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const isActive = (href: string) => {
    if (href === "/about" && pathname === "/") return true
    return pathname === href
  }

  return (
    <>
      <ScrollProgressIndicator />
      <header
        className={`sticky top-0 z-50 w-full border-b transition-all duration-500 ${
          isScrolled
            ? "border-gray-200/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-lg shadow-gray-200/20 dark:shadow-gray-800/20"
            : "border-gray-200/30 dark:border-gray-700/30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl"
        } supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60`}
      >
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <div className="flex items-center">
            <Link className="flex items-center space-x-2 group" href="/">
              <span className="font-bold text-lg bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:via-blue-500 group-hover:to-teal-500 transition-all duration-700">
                Naga Pavan Muni
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item, index) => (
              <Link
                key={item.id}
                href={item.href}
                className={`relative text-sm font-medium transition-all duration-500 hover:scale-110 group ${
                  isActive(item.href)
                    ? "text-teal-600 dark:text-teal-400"
                    : "text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                aria-label={`Navigate to ${item.label} section`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-teal-500 to-blue-500 transition-all duration-500 ${
                    isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={handleResumeClick}
                className="hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all duration-500 hover:scale-110 hover:shadow-lg hover:shadow-teal-200/50 dark:hover:shadow-teal-800/50 group"
                title="View Resume on Google Drive"
              >
                <span className="mr-2">Resume</span>
                <ExternalLink className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDownloadResume}
                className="hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all duration-500 hover:scale-110 group"
                title="Download Resume PDF"
              >
                <Download className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
            isMobileMenuOpen
              ? "max-h-96 opacity-100 border-t border-gray-200/30 dark:border-gray-700/30"
              : "max-h-0 opacity-0"
          }`}
        >
          <nav className="container px-4 py-4 space-y-4">
            {navigationItems.map((item, index) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={handleMobileNavClick}
                className={`block w-full text-left py-3 px-4 rounded-lg text-sm font-medium transition-all duration-500 ${
                  isActive(item.href)
                    ? "bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 shadow-lg shadow-teal-200/20 dark:shadow-teal-800/20"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-teal-600 dark:hover:text-teal-400"
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  transform: isMobileMenuOpen ? "translateY(0)" : "translateY(-20px)",
                }}
                aria-label={`Navigate to ${item.label} section`}
              >
                <div className="flex items-center justify-between">
                  {item.label}
                  {isActive(item.href) && <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />}
                </div>
              </Link>
            ))}

            <div className="pt-4 border-t border-gray-200/30 dark:border-gray-700/30 space-y-3">
              <Button
                variant="outline"
                onClick={handleResumeClick}
                className="w-full hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all duration-500 group"
                title="View Resume on Google Drive"
              >
                <span className="mr-2">View Resume</span>
                <ExternalLink className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              </Button>
              <Button
                variant="ghost"
                onClick={handleDownloadResume}
                className="w-full hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all duration-500 group"
                title="Download Resume PDF"
              >
                <span className="mr-2">Download PDF</span>
                <Download className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              </Button>
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}
