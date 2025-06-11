import SmoothScrollSection from "../components/smooth-scroll-section"
import UnifiedLayout from "../components/unified-layout"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

export default function AboutPage() {
  return (
    <UnifiedLayout>
      <div className="min-h-screen py-16 md:py-20 lg:py-24">
        <SmoothScrollSection animationType="fadeIn" className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <SmoothScrollSection animationType="scale" delay={200}>
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 dark:from-teal-300 dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent animate-gradient-x">
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
                  { href: "mailto:nagapavanmuni@gmail.com", icon: Mail, label: "Email" },
                ].map(({ href, icon: Icon, label }, index) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      size="icon"
                      className="hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all duration-500 hover:scale-125 hover:rotate-12 hover:shadow-lg group"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <Icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                      <span className="sr-only">{label}</span>
                    </Button>
                  </a>
                ))}
              </div>
            </SmoothScrollSection>

            <SmoothScrollSection animationType="fadeIn" delay={600}>
              <div className="mt-12 max-w-3xl mx-auto bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">About Me</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  I'm a passionate Full Stack Developer with expertise in modern web technologies. With a strong
                  foundation in both frontend and backend development, I create responsive, user-friendly applications
                  that solve real-world problems.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  My journey in software development has equipped me with a diverse skill set, allowing me to tackle
                  complex challenges and deliver high-quality solutions. I'm constantly learning and adapting to new
                  technologies to stay at the forefront of web development.
                </p>
              </div>
            </SmoothScrollSection>
          </div>
        </SmoothScrollSection>
      </div>
    </UnifiedLayout>
  )
}
