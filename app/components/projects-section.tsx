"use client"

import ProjectCard from "./project-card"
import SmoothScrollSection from "./smooth-scroll-section"

const projects = [
  {
    title: "Healthcare Cost Prediction",
    description:
      "Built a full-stack Healthcare Cost Prediction web application using React for the frontend and Node.js for the backend, delivering a seamless user experience for cost estimation with predictive analytics and interactive visualizations.",
    image: "/images/healthcare-logo.png",
    link: "https://github.com/nagapavanmuni/healthcare-dashboard",
    tags: ["Java", "MySQL", "React.js", "VS Code", "Render", "Git"],
  },
  {
    title: "Health Spot",
    description:
      "Developed a healthcare provider search platform integrating multiple geospatial APIs with failover logic, achieving high location resolution accuracy and responsive query performance with real-time appointment scheduling.",
    image: "/images/healthspot-logo.png",
    link: "https://github.com/nagapavanmuni/Healthspot",
    tags: ["React", "Next.js", "TypeScript", "Node.js", "Maps API", "Tailwind CSS"],
  },
  {
    title: "DEVMatch",
    description:
      "Built a developer matching platform using Go (Gin) for the backend and React with TypeScript for the frontend, ensuring seamless API integration and responsive UI design with real-time chat functionality.",
    image: "/images/devmatch-logo.png",
    link: "https://github.com/MunishMummadi/devmatch",
    tags: ["React", "TypeScript", "Node.js", "Tailwind CSS", "GO", "GitHub API"],
  },
]

export default function ProjectsSection() {
  return (
<<<<<<< HEAD
    <SmoothScrollSection id="projects" animationType="slideUp" className="py-20 md:py-28 lg:py-36">
      <div className="container px-4 md:px-6">
        <SmoothScrollSection animationType="blur" delay={100}>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-20 text-center bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Projects
          </h2>
        </SmoothScrollSection>

        {/* Responsive grid with consistent spacing */}
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {projects.map((project, index) => (
            <SmoothScrollSection key={project.title} animationType="scale" delay={200 + index * 200} className="h-full">
              <ProjectCard
                title={project.title}
                description={project.description}
                image={project.image}
                link={project.link}
                tags={project.tags}
              />
            </SmoothScrollSection>
          ))}
        </div>

        {/* Optional: Add a "View All Projects" button */}
        <SmoothScrollSection animationType="fadeIn" delay={800} className="mt-16 text-center">
          <div className="inline-flex items-center justify-center">
            <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-50/50 dark:bg-gray-800/50 px-4 py-2 rounded-full backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30">
              More projects coming soon...
            </span>
          </div>
        </SmoothScrollSection>
      </div>
    </SmoothScrollSection>
=======
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
      {projects.map((project, index) => (
        <SmoothScrollSection key={project.title} animationType="scale" delay={200 + index * 200} className="h-full">
          <ProjectCard
            title={project.title}
            description={project.description}
            image={project.image}
            link={project.link}
            tags={project.tags}
          />
        </SmoothScrollSection>
      ))}

      {/* Optional: Add a "View All Projects" button */}
      <SmoothScrollSection animationType="fadeIn" delay={800} className="mt-10 text-center col-span-full">
        <div className="inline-flex items-center justify-center">
          <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-50/50 dark:bg-gray-800/50 px-4 py-2 rounded-full backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30">
            More projects coming soon...
          </span>
        </div>
      </SmoothScrollSection>
    </div>
>>>>>>> f85d32de63cf560b3a18dcf7cd069e6b9af11838
  )
}
