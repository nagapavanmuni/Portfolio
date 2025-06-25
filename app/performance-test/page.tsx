import UnifiedLayout from "../components/unified-layout"
import BrowserTestSuite from "../components/browser-test-suite"
import InteractiveDemo from "../components/interactive-demo"
import ResumeLinkTester from "../components/resume-link-tester"
import ThemePerformanceMonitor from "../components/theme-performance-monitor"
import SmoothScrollSection from "../components/smooth-scroll-section"

export default function PerformanceTestPage() {
  return (
    <UnifiedLayout showSectionNav={false} showBackNav={true} backNavVariant="cross">
      <div className="min-h-screen py-16 md:py-20 lg:py-24">
        <div className="container px-4 md:px-6 space-y-12">
          <SmoothScrollSection animationType="fadeIn">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Website Testing & Performance
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-600 dark:text-gray-300 md:text-lg">
                Comprehensive testing suite for theme transitions, animated backgrounds, browser compatibility, and
                interactive elements.
              </p>
            </div>
          </SmoothScrollSection>

          <SmoothScrollSection animationType="slideUp" delay={200}>
            <ThemePerformanceMonitor />
          </SmoothScrollSection>

          <SmoothScrollSection animationType="slideUp" delay={400}>
            <ResumeLinkTester />
          </SmoothScrollSection>

          <SmoothScrollSection animationType="slideUp" delay={600}>
            <BrowserTestSuite />
          </SmoothScrollSection>

          <SmoothScrollSection animationType="slideUp" delay={800}>
            <InteractiveDemo />
          </SmoothScrollSection>

          <SmoothScrollSection animationType="fadeIn" delay={1000}>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 space-y-4 border border-gray-200/50 dark:border-gray-700/50">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Enhanced Testing Features</h2>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Theme System:</h3>
                  <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                    <li>• Distinct animated backgrounds for light/dark modes</li>
                    <li>• Cosmic theme for dark mode with nebula effects</li>
                    <li>• Organic theme for light mode with flowing patterns</li>
                    <li>• Real-time performance monitoring</li>
                    <li>• Smooth 300ms theme transitions</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Animation Features:</h3>
                  <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                    <li>• 60fps target with hardware acceleration</li>
                    <li>• Interactive particles and ripple effects</li>
                    <li>• Scroll-responsive background changes</li>
                    <li>• Mouse interaction with floating elements</li>
                    <li>• Optimized for all device types</li>
                  </ul>
                </div>
              </div>
            </div>
          </SmoothScrollSection>
        </div>
      </div>
    </UnifiedLayout>
  )
}
