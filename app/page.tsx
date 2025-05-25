import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import Link from "next/link"
import ContactForm from "./components/contact-form"
import TechStack from "./components/tech-stack"
import ExperienceSection from "./components/experience-section"
import SmoothScrollSection from "./components/smooth-scroll-section"
import GestureScrollHandler from "./components/gesture-scroll-handler"
import NavigationHeader from "./components/navigation-header"
import SectionNavigation from "./components/section-navigation"
import ProjectsSection from "./components/projects-section"
import DynamicBackground from "./components/dynamic-background"

export default function Page() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 relative overflow-hidden">
      <DynamicBackground />
      <GestureScrollHandler />
      <NavigationHeader />
      <SectionNavigation />

      <main className="container px-4 md:px-6 relative z-10">
        <SmoothScrollSection id="about" animationType="fadeIn" className="py-20 md:py-28 lg:py-36">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <SmoothScrollSection animationType="scale" delay={200}>
                <div className="space-y-6">
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent animate-gradient-x">
                    Full Stack Developer
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-600 dark:text-gray-300 md:text-xl leading-relaxed">
                    Building digital experiences with modern technologies. Focused on creating elegant solutions to
                    complex problems with a passion for clean, efficient code.
                  </p>
                </div>
              </SmoothScrollSection>

              <SmoothScrollSection animationType="slideUp" delay={400}>
                <div className="flex space-x-4">
                  {[
                    { href: "https://github.com/nagapavanmuni", icon: Github, label: "GitHub" },
                    { href: "https://www.linkedin.com/in/nagapavanmuni/", icon: Linkedin, label: "LinkedIn" },
                    { href: "https://x.com/pavxnreddy16", icon: Twitter, label: "Twitter" },
                    { href: "mailto:hello@example.com", icon: Mail, label: "Email" },
                  ].map(({ href, icon: Icon, label }, index) => (
                    <Link key={label} href={href} target="_blank">
                      <Button
                        variant="outline"
                        size="icon"
                        className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-500 hover:scale-125 hover:rotate-12 hover:shadow-lg group"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <Icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                        <span className="sr-only">{label}</span>
                      </Button>
                    </Link>
                  ))}
                </div>
              </SmoothScrollSection>
            </div>
          </div>
        </SmoothScrollSection>

        <SmoothScrollSection id="experience" animationType="slideUp" className="py-20 md:py-28 lg:py-36">
          <div className="container px-4 md:px-6">
            <SmoothScrollSection animationType="blur" delay={100}>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-20 text-center bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Experience
              </h2>
            </SmoothScrollSection>
            <SmoothScrollSection animationType="slideLeft" delay={300}>
              <ExperienceSection />
            </SmoothScrollSection>
          </div>
        </SmoothScrollSection>

        <ProjectsSection />

        <SmoothScrollSection animationType="slideRight" className="py-20 md:py-28 lg:py-36">
          <div className="container px-4 md:px-6">
            <SmoothScrollSection animationType="blur" delay={100}>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-20 text-center bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Tech Stack
              </h2>
            </SmoothScrollSection>
            <SmoothScrollSection animationType="slideUp" delay={300}>
              <TechStack />
            </SmoothScrollSection>
          </div>
        </SmoothScrollSection>

        <SmoothScrollSection id="contact" animationType="slideUp" className="py-20 md:py-28 lg:py-36">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl">
              <SmoothScrollSection animationType="blur" delay={100}>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-20 text-center bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Get in Touch
                </h2>
              </SmoothScrollSection>
              <SmoothScrollSection animationType="scale" delay={300}>
                <ContactForm />
              </SmoothScrollSection>
            </div>
          </div>
        </SmoothScrollSection>
      </main>

      <footer className="border-t border-gray-200/30 dark:border-gray-700/30 relative z-10 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <SmoothScrollSection animationType="fadeIn">
          <div className="container flex flex-col gap-2 sm:flex-row py-8 w-full shrink-0 items-center px-4 md:px-6">
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
        </SmoothScrollSection>
      </footer>
    </div>
  )
}
