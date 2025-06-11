import SmoothScrollSection from "../components/smooth-scroll-section"
import ExperienceSection from "../components/experience-section"
import UnifiedLayout from "../components/unified-layout"

export default function ExperiencePage() {
  return (
    <UnifiedLayout>
      <div className="min-h-screen py-16 md:py-20 lg:py-24">
        <div className="container px-4 md:px-6">
          <SmoothScrollSection animationType="blur" delay={100}>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-12 text-center bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent">
              Experience
            </h2>
          </SmoothScrollSection>
          <SmoothScrollSection animationType="slideLeft" delay={300}>
            <ExperienceSection />
          </SmoothScrollSection>
        </div>
      </div>
    </UnifiedLayout>
  )
}
