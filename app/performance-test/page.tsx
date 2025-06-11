import UnifiedLayout from "../components/unified-layout"
import BrowserTestSuite from "../components/browser-test-suite"
import InteractiveDemo from "../components/interactive-demo"
import ResumeLinkTester from "../components/resume-link-tester"
import SmoothScrollSection from "../components/smooth-scroll-section"

export default function PerformanceTestPage() {
  return (
    <UnifiedLayout showSectionNav={false}>
      <div className="min-h-screen py-16 md:py-20 lg:py-24">
        <div className="container px-4 md:px-6 space-y-12">
          <SmoothScrollSection animationType="fadeIn">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Website Testing & Verification
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-600 dark:text-gray-300 md:text-lg">
                Test browser compatibility, resume link accessibility, and interactive element behavior.
              </p>
            </div>
          </SmoothScrollSection>

          <SmoothScrollSection animationType="slideUp" delay={200}>
            <ResumeLinkTester />
          </SmoothScrollSection>

          <SmoothScrollSection animationType="slideUp" delay={400}>
            <BrowserTestSuite />
          </SmoothScrollSection>

          <SmoothScrollSection animationType="slideUp" delay={600}>
            <InteractiveDemo />
          </SmoothScrollSection>

          <SmoothScrollSection animationType="fadeIn" delay={800}>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 space-y-4">
              <h2 className="text-xl font-semibold">Testing Guidelines</h2>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h3 className="font-medium mb-2">Resume Links:</h3>
                  <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                    <li>• Primary: New Google Drive URL</li>
                    <li>• Fallback: Previous working URL</li>
                    <li>• Download: Local PDF backup</li>
                    <li>• Automatic fallback on failure</li>
                    <li>• Cross-device compatibility</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Expected Results:</h3>
                  <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                    <li>• Resume opens in new tab</li>
                    <li>• Download works on all devices</li>
                    <li>• Fallback activates if needed</li>
                    <li>• Mobile-friendly viewing</li>
                    <li>• Consistent across browsers</li>
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
