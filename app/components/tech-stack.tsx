"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Layout, Server, Terminal, Wrench, Sparkles } from "lucide-react"
import SmoothScrollSection from "./smooth-scroll-section"

const technologies = {
  frontend: [
    { name: "React", level: "Advanced", category: "Framework" },
    { name: "Next.js", level: "Advanced", category: "Framework" },
    { name: "TypeScript", level: "Advanced", category: "Language" },
    { name: "TailwindCSS", level: "Advanced", category: "Styling" },
    { name: "Redux", level: "Intermediate", category: "State Management" },
    { name: "GraphQL", level: "Intermediate", category: "API" },
    { name: "HTML5", level: "Advanced", category: "Markup" },
    { name: "CSS3", level: "Advanced", category: "Styling" },
    { name: "JavaScript", level: "Advanced", category: "Language" },
    { name: "Responsive Design", level: "Advanced", category: "Design" },
    { name: "SASS/SCSS", level: "Intermediate", category: "Styling" },
  ],
  backend: [
    { name: "Node.js", level: "Advanced", category: "Runtime" },
    { name: "Express", level: "Advanced", category: "Framework" },
    { name: "Python", level: "Intermediate", category: "Language" },
    { name: "Django", level: "Intermediate", category: "Framework" },
    { name: "PostgreSQL", level: "Intermediate", category: "Database" },
    { name: "MongoDB", level: "Advanced", category: "Database" },
    { name: "RESTful APIs", level: "Advanced", category: "API" },
    { name: "Java", level: "Intermediate", category: "Language" },
    { name: "Spring Boot", level: "Intermediate", category: "Framework" },
  ],
  devops: [
    { name: "Docker", level: "Intermediate", category: "Containerization" },
    { name: "Git", level: "Advanced", category: "Version Control" },
    { name: "Linux", level: "Intermediate", category: "OS" },
    { name: "CI/CD", level: "Intermediate", category: "Automation" },
    { name: "AWS", level: "Intermediate", category: "Cloud" },
    { name: "Vercel", level: "Advanced", category: "Deployment" },
    { name: "GitHub Actions", level: "Intermediate", category: "Automation" },
  ],
  tools: [
    { name: "VS Code", level: "Advanced", category: "Editor" },
    { name: "Postman", level: "Advanced", category: "API Testing" },
    { name: "Figma", level: "Intermediate", category: "Design" },
    { name: "Jest", level: "Intermediate", category: "Testing" },
    { name: "GitHub", level: "Advanced", category: "Collaboration" },
    { name: "Jira", level: "Intermediate", category: "Project Management" },
    { name: "Slack", level: "Advanced", category: "Communication" },
  ],
}

const categoryIcons = {
  frontend: <Layout className="h-5 w-5" />,
  backend: <Server className="h-5 w-5" />,
  devops: <Terminal className="h-5 w-5" />,
  tools: <Wrench className="h-5 w-5" />,
}

const levelColors = {
  Advanced:
    "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent hover:from-blue-600 hover:to-purple-600",
  Intermediate:
    "bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-transparent hover:from-cyan-600 hover:to-blue-600",
  Beginner:
    "bg-gradient-to-r from-green-500 to-teal-500 text-white border-transparent hover:from-green-600 hover:to-teal-600",
}

export default function TechStack() {
  const [activeTab, setActiveTab] = useState("frontend")
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <Tabs defaultValue="frontend" className="w-full" onValueChange={setActiveTab}>
        <div className="flex justify-center mb-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-transparent">
            {Object.entries(categoryIcons).map(([category, icon]) => (
              <TabsTrigger
                key={category}
                value={category}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-lg ${
                  activeTab === category
                    ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-lg"
                    : "bg-gray-100/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/80"
                }`}
              >
                {icon}
                <span className="capitalize">{category}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {Object.entries(technologies).map(([category, skills]) => (
          <TabsContent key={category} value={category} className="mt-0 focus-visible:outline-none focus-visible:ring-0">
            <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-500">
              <div className="relative">
                {/* Background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-900/10 dark:to-purple-900/10 rounded-lg" />

                {/* Category description */}
                <div className="relative mb-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
                    {categoryIcons[category as keyof typeof categoryIcons]}
                    <span className="capitalize">{category} Skills</span>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {category === "frontend" && "Building responsive, accessible, and performant user interfaces."}
                    {category === "backend" && "Developing robust server-side applications and APIs."}
                    {category === "devops" && "Streamlining development operations and deployment processes."}
                    {category === "tools" && "Utilizing industry-standard tools for efficient development workflows."}
                  </p>
                </div>

                {/* Skills grid with categories */}
                <div className="space-y-6">
                  {/* Group skills by category */}
                  {Array.from(new Set(skills.map((skill) => skill.category))).map((skillCategory) => (
                    <div key={skillCategory} className="space-y-3">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        {skillCategory}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skills
                          .filter((skill) => skill.category === skillCategory)
                          .map((skill) => (
                            <Badge
                              key={skill.name}
                              className={`text-xs py-1.5 px-3 rounded-md transition-all duration-500 cursor-default relative group ${
                                hoveredSkill === skill.name ? "scale-110 shadow-md" : ""
                              } ${levelColors[skill.level as keyof typeof levelColors] || "bg-gray-100 dark:bg-gray-800"}`}
                              onMouseEnter={() => setHoveredSkill(skill.name)}
                              onMouseLeave={() => setHoveredSkill(null)}
                            >
                              <span className="relative z-10">{skill.name}</span>

                              {/* Skill level indicator */}
                              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                {skill.level === "Advanced" && (
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                )}
                                <span
                                  className={`relative inline-flex rounded-full h-3 w-3 ${
                                    skill.level === "Advanced"
                                      ? "bg-purple-400"
                                      : skill.level === "Intermediate"
                                        ? "bg-blue-400"
                                        : "bg-green-400"
                                  }`}
                                ></span>
                              </span>

                              {/* Tooltip */}
                              <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-20">
                                {skill.level}
                              </span>
                            </Badge>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Skill level legend */}
                <div className="mt-8 pt-4 border-t border-gray-200/50 dark:border-gray-700/50 flex flex-wrap gap-4 justify-center">
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-3 w-3 rounded-full bg-purple-400"></span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Advanced</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-3 w-3 rounded-full bg-blue-400"></span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Intermediate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-3 w-3 rounded-full bg-green-400"></span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Beginner</span>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Skills overview */}
      <SmoothScrollSection animationType="fadeIn" delay={500}>
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 shadow-inner">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Skills Overview</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-4 shadow-sm">
              <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-2">Core Strengths</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                  Full-stack JavaScript development
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                  React & Next.js applications
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                  Responsive UI/UX design
                </li>
              </ul>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-4 shadow-sm">
              <h4 className="font-medium text-purple-600 dark:text-purple-400 mb-2">Currently Learning</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                  AI/ML integration
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                  Kubernetes orchestration
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                  Web3 development
                </li>
              </ul>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-4 shadow-sm">
              <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Soft Skills</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                  Team collaboration
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                  Problem-solving
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                  Technical communication
                </li>
              </ul>
            </div>
          </div>
        </div>
      </SmoothScrollSection>
    </div>
  )
}
