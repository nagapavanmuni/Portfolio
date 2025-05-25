import { Card } from "@/components/ui/card"
import SmoothScrollSection from "./smooth-scroll-section"

const technologies = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "TailwindCSS", "Redux", "GraphQL"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express", "Python", "Django", "PostgreSQL", "MongoDB"],
  },
  {
    category: "DevOps",
    skills: ["Docker", "Git", "Linux"],
  },
  {
    category: "Tools",
    skills: ["VS Code", "Postman", "Figma", "Jest", "GitHub", "Vercel"],
  },
]

export default function TechStack() {
  return (
    <div className="grid gap-10 md:grid-cols-2">
      {technologies.map((tech, index) => (
        <SmoothScrollSection key={tech.category} animationType="scale" delay={index * 200}>
          <Card className="p-8 group hover:shadow-2xl transition-all duration-700 border-gray-200/30 dark:border-gray-700/30 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg hover:scale-105 hover:-rotate-1 hover:bg-white/80 dark:hover:bg-gray-800/80">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-transparent to-purple-50/40 dark:from-blue-950/30 dark:to-purple-950/30 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-lg" />

            <div className="relative z-10">
              <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-500 group-hover:scale-105">
                {tech.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {tech.skills.map((skill, skillIndex) => (
                  <span
                    key={skill}
                    className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-blue-900/30 dark:to-purple-900/30 px-3 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 ring-1 ring-blue-200/50 dark:ring-blue-700/50 hover:from-purple-50/80 hover:to-pink-50/80 dark:hover:from-purple-800/30 dark:hover:to-pink-800/30 hover:text-purple-700 dark:hover:text-purple-300 transition-all duration-500 hover:scale-110 hover:rotate-3 hover:shadow-lg cursor-default"
                    style={{
                      animationDelay: `${skillIndex * 100}ms`,
                      transitionDelay: `${skillIndex * 50}ms`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </SmoothScrollSection>
      ))}
    </div>
  )
}
