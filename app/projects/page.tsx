import SmoothScrollSection from "../components/smooth-scroll-section"
import ProjectsSection from "../components/projects-section"
import UnifiedLayout from "../components/unified-layout"

export default function ProjectsPage() {
  return (
    <UnifiedLayout showBackNav={true} backNavVariant="arrow">
      <div className="min-h-screen py-16 md:py-20 lg:py-24">
        <div className="container px-4 md:px-6">
          <SmoothScrollSection animationType="blur" delay={100}>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Projects
            </h2>
          </SmoothScrollSection>

          <ProjectsSection />
        </div>
      </div>
    </UnifiedLayout>
  )
}
