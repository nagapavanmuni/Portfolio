<<<<<<< HEAD
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
=======
"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import UnifiedLayout from "./components/unified-layout"
import { ArrowRight, User, Briefcase, Code, Wrench, Mail } from "lucide-react"

export default function Page() {
  const sections = [
    {
      id: "about",
      title: "About Me",
      description: "Learn more about my background and interests",
      icon: User,
      color: "from-teal-500 to-blue-500",
      textColor: "text-teal-600 dark:text-teal-400",
      hoverColor: "hover:bg-teal-50 dark:hover:bg-teal-900/20",
      shadowColor: "shadow-teal-200/50 dark:shadow-teal-800/50",
    },
    {
      id: "experience",
      title: "Experience",
      description: "Explore my professional journey and achievements",
      icon: Briefcase,
      color: "from-blue-500 to-indigo-500",
      textColor: "text-blue-600 dark:text-blue-400",
      hoverColor: "hover:bg-blue-50 dark:hover:bg-blue-900/20",
      shadowColor: "shadow-blue-200/50 dark:shadow-blue-800/50",
    },
    {
      id: "projects",
      title: "Projects",
      description: "Check out my latest work and creations",
      icon: Code,
      color: "from-indigo-500 to-purple-500",
      textColor: "text-indigo-600 dark:text-indigo-400",
      hoverColor: "hover:bg-indigo-50 dark:hover:bg-indigo-900/20",
      shadowColor: "shadow-indigo-200/50 dark:shadow-indigo-800/50",
    },
    {
      id: "skills",
      title: "Skills",
      description: "Discover my technical expertise and capabilities",
      icon: Wrench,
      color: "from-purple-500 to-pink-500",
      textColor: "text-purple-600 dark:text-purple-400",
      hoverColor: "hover:bg-purple-50 dark:hover:bg-purple-900/20",
      shadowColor: "shadow-purple-200/50 dark:shadow-purple-800/50",
    },
    {
      id: "contact",
      title: "Contact",
      description: "Get in touch with me for opportunities or questions",
      icon: Mail,
      color: "from-pink-500 to-rose-500",
      textColor: "text-pink-600 dark:text-pink-400",
      hoverColor: "hover:bg-pink-50 dark:hover:bg-pink-900/20",
      shadowColor: "shadow-pink-200/50 dark:shadow-pink-800/50",
    },
  ]

  return (
    <UnifiedLayout showSectionNav={false}>
      <div className="container px-4 md:px-6 py-16 md:py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center space-y-8 text-center mb-16"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 dark:from-teal-300 dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent animate-gradient-x">
            Naga Pavan Muni
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-600 dark:text-gray-300 md:text-xl leading-relaxed">
            Full Stack Developer specializing in modern web technologies and creating elegant solutions to complex
            problems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/${section.id}`} className="block h-full">
                <div
                  className={`h-full group p-6 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] ${section.hoverColor}`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${section.color} text-white`}>
                      <section.icon className="h-6 w-6" />
                    </div>
                    <h2
                      className={`text-2xl font-semibold ${section.textColor} group-hover:scale-105 transition-transform duration-300`}
                    >
                      {section.title}
                    </h2>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{section.description}</p>
                  <div className="flex justify-end">
                    <Button
                      variant="ghost"
                      className={`${section.textColor} ${section.hoverColor} group-hover:translate-x-1 transition-transform duration-300`}
                    >
                      Explore <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </UnifiedLayout>
>>>>>>> f85d32de63cf560b3a18dcf7cd069e6b9af11838
  )
}
