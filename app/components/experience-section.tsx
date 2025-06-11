import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { CalendarDays, MapPin } from "lucide-react"
import SmoothScrollSection from "./smooth-scroll-section"

const experiences = [
  {
    company: "Global Grad Intern, SLU",
    role: "Project Manager",
    duration: "Mar 2024 - May 2024",
    location: "Saint Louis, MO",
    description: [
      'Led the "Navigating SLU" project, conducting comprehensive research to enhance campus onboarding experiences for newly admitted students',
      "Developed and proposed innovative strategies to streamline campus navigation and improve accessibility of resources",
      "Created a digital guide with interactive maps and FAQs, reducing new student inquiries by 30 percent and improving satisfaction rates",
    ],
  },
  {
    company: "Excelerate",
    role: "Data Analyst",
    duration: "Aug 2023 - Sep 2023",
    location: "Remote",
    description: [
      "Performed comprehensive data cleaning and preprocessing, ensuring high data integrity and consistency",
      "Utilized Tableau and Microsoft Excel to conduct data analysis, generating reports and visualizations",
      "Collaborated with cross-functional teams to identify key insights and support data-driven decision making",
    ],
  },
  {
    company: "KodNest Technologies",
    role: "Intern",
    duration: "Jan 2023 - Aug 2023",
    location: "Bengaluru, IN",
    description: [
      "Developed and implemented advanced data structures and algorithms using Java, including linked lists, stacks, and queues, focusing on efficiency and scalability",
      "Collaborated with team members to optimize code performance and enhance user experience, incorporating principles of object-oriented design and software engineering best practices",
      "Conducted thorough testing and debugging to ensure robust functionality and reliability of applications, gaining hands-on experience in software development lifecycle practices",
    ],
  },
  {
    company: "CodeCraft Innovations",
    role: "Java Full Stack Intern",
    duration: "Jan 2023 - Aug 2023",
    description: [
      "Contributed to full-stack web application development using Java, Spring Boot, React.js, and MySQL",
      "Built REST APIs for user authentication, product catalog, and order management with proper error handling",
      "Worked on responsive UI components using React, integrated with backend services through RESTful APIs",
    ],
  },
]

export default function ExperienceSection() {
  return (
    <div className="space-y-12">
      {experiences.map((exp, index) => (
        <SmoothScrollSection key={index} animationType="slideLeft" delay={index * 200}>
          <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-700 border-gray-200/30 dark:border-gray-700/30 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg hover:scale-[1.02] hover:-rotate-1 hover:bg-white/80 dark:hover:bg-gray-800/80">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/40 to-purple-50/40 dark:from-blue-950/30 dark:to-purple-950/30 opacity-0 group-hover:opacity-100 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />

            <CardHeader className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-500">
                    {exp.role}
                  </h3>
                  <p className="text-lg font-medium bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-pink-600 group-hover:via-purple-600 group-hover:to-blue-600 transition-all duration-700">
                    {exp.company}
                  </p>
                </div>
                <div className="flex flex-col md:items-end gap-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-500">
                    <CalendarDays className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                    {exp.duration}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-500">
                    <MapPin className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                    {exp.location}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="relative z-10 space-y-4">
              <ul className="space-y-4">
                {exp.description.map((responsibility, i) => (
                  <li
                    key={i}
                    className="text-gray-700 dark:text-gray-300 flex items-start gap-3 leading-relaxed group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-500"
                  >
                    <span className="text-blue-500 mt-1.5 flex-shrink-0 group-hover:scale-125 group-hover:text-purple-500 transition-all duration-500">
                      •
                    </span>
                    {responsibility}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </SmoothScrollSection>
      ))}
    </div>
  )
}
