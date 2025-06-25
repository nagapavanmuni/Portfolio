import SmoothScrollSection from "../components/smooth-scroll-section"
import ContactForm from "../components/contact-form"
import UnifiedLayout from "../components/unified-layout"

export default function ContactPage() {
  return (
    <UnifiedLayout showBackNav={true} backNavVariant="arrow">
      <div className="min-h-screen py-16 md:py-20 lg:py-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-2xl">
            <SmoothScrollSection animationType="blur" delay={100}>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-12 text-center bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Get in Touch
              </h2>
            </SmoothScrollSection>
            <SmoothScrollSection animationType="scale" delay={300}>
              <ContactForm />
            </SmoothScrollSection>
          </div>
        </div>
      </div>
    </UnifiedLayout>
  )
}
