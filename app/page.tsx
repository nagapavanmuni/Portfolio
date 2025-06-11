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
  )
}
