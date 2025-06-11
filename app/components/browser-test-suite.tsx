"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, AlertCircle, Globe, Smartphone, Monitor } from "lucide-react"

interface BrowserTest {
  name: string
  description: string
  test: () => boolean | Promise<boolean>
  result?: boolean
  critical: boolean
}

interface DeviceTest {
  name: string
  description: string
  test: () => boolean
  result?: boolean
}

export default function BrowserTestSuite() {
  const [browserTests, setBrowserTests] = useState<BrowserTest[]>([])
  const [deviceTests, setDeviceTests] = useState<DeviceTest[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [browserInfo, setBrowserInfo] = useState<string>("")

  // Initialize tests
  useEffect(() => {
    const tests: BrowserTest[] = [
      {
        name: "CSS Transform Support",
        description: "Checks if browser supports CSS transforms for animations",
        test: () => {
          const div = document.createElement("div")
          div.style.transform = "translateX(10px)"
          return div.style.transform !== ""
        },
        critical: true,
      },
      {
        name: "CSS Transition Support",
        description: "Checks if browser supports CSS transitions for smooth effects",
        test: () => {
          const div = document.createElement("div")
          div.style.transition = "all 0.3s ease"
          return div.style.transition !== ""
        },
        critical: true,
      },
      {
        name: "CSS Opacity Support",
        description: "Checks if browser supports CSS opacity for fade effects",
        test: () => {
          const div = document.createElement("div")
          div.style.opacity = "0.5"
          return div.style.opacity !== ""
        },
        critical: true,
      },
      {
        name: "CSS Border Radius",
        description: "Checks if browser supports border-radius for rounded elements",
        test: () => {
          const div = document.createElement("div")
          div.style.borderRadius = "8px"
          return div.style.borderRadius !== ""
        },
        critical: false,
      },
      {
        name: "CSS Box Shadow",
        description: "Checks if browser supports box-shadow for depth effects",
        test: () => {
          const div = document.createElement("div")
          div.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)"
          return div.style.boxShadow !== ""
        },
        critical: false,
      },
      {
        name: "CSS Backdrop Filter",
        description: "Checks if browser supports backdrop-filter for glass effects",
        test: () => {
          const div = document.createElement("div")
          div.style.backdropFilter = "blur(10px)"
          return div.style.backdropFilter !== ""
        },
        critical: false,
      },
      {
        name: "Intersection Observer API",
        description: "Checks if browser supports Intersection Observer for scroll animations",
        test: () => typeof IntersectionObserver !== "undefined",
        critical: false,
      },
    ]

    const deviceTestList: DeviceTest[] = [
      {
        name: "Desktop Device",
        description: "Checks if device is desktop/laptop",
        test: () => !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      },
      {
        name: "Hover Support",
        description: "Checks if device supports hover interactions",
        test: () => window.matchMedia("(hover: hover)").matches,
      },
      {
        name: "Fine Pointer",
        description: "Checks if device has fine pointer control (mouse)",
        test: () => window.matchMedia("(pointer: fine)").matches,
      },
      {
        name: "Hardware Acceleration",
        description: "Checks if hardware acceleration is likely available",
        test: () => {
          const canvas = document.createElement("canvas")
          const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
          return !!gl
        },
      },
    ]

    setBrowserTests(tests)
    setDeviceTests(deviceTestList)

    // Detect browser
    const userAgent = navigator.userAgent
    let browser = "Unknown Browser"
    if (userAgent.includes("Chrome")) browser = "Google Chrome"
    else if (userAgent.includes("Firefox")) browser = "Mozilla Firefox"
    else if (userAgent.includes("Safari")) browser = "Safari"
    else if (userAgent.includes("Edge")) browser = "Microsoft Edge"

    setBrowserInfo(browser)
  }, [])

  const runTests = async () => {
    setIsRunning(true)
    setProgress(0)

    const totalTests = browserTests.length + deviceTests.length
    let completedTests = 0

    // Run browser tests
    const updatedBrowserTests = []
    for (const test of browserTests) {
      try {
        const result = await test.test()
        updatedBrowserTests.push({ ...test, result })
      } catch (error) {
        updatedBrowserTests.push({ ...test, result: false })
      }
      completedTests++
      setProgress((completedTests / totalTests) * 100)
    }

    // Run device tests
    const updatedDeviceTests = []
    for (const test of deviceTests) {
      try {
        const result = test.test()
        updatedDeviceTests.push({ ...test, result })
      } catch (error) {
        updatedDeviceTests.push({ ...test, result: false })
      }
      completedTests++
      setProgress((completedTests / totalTests) * 100)
    }

    setBrowserTests(updatedBrowserTests)
    setDeviceTests(updatedDeviceTests)
    setIsRunning(false)
  }

  const getTestIcon = (result?: boolean, critical?: boolean) => {
    if (result === undefined) return <AlertCircle className="h-4 w-4 text-gray-400" />
    if (result) return <CheckCircle className="h-4 w-4 text-green-500" />
    return <XCircle className={`h-4 w-4 ${critical ? "text-red-500" : "text-yellow-500"}`} />
  }

  const getCompatibilityScore = () => {
    const allTests = [...browserTests, ...deviceTests]
    const completedTests = allTests.filter((test) => test.result !== undefined)
    if (completedTests.length === 0) return 0

    const passedTests = completedTests.filter((test) => test.result === true)
    return Math.round((passedTests.length / completedTests.length) * 100)
  }

  const compatibilityScore = getCompatibilityScore()

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-blue-500" />
          Browser Compatibility Test Suite
        </CardTitle>
        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Current Browser: <span className="font-medium">{browserInfo}</span>
          </p>
          <Button onClick={runTests} disabled={isRunning} size="sm">
            {isRunning ? "Running Tests..." : "Run Compatibility Tests"}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Progress Bar */}
        {isRunning && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Running tests...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        )}

        {/* Compatibility Score */}
        {!isRunning && browserTests.some((test) => test.result !== undefined) && (
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold">
              <span
                className={
                  compatibilityScore >= 80
                    ? "text-green-500"
                    : compatibilityScore >= 60
                      ? "text-yellow-500"
                      : "text-red-500"
                }
              >
                {compatibilityScore}%
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Compatibility Score</p>
            <Badge
              variant={compatibilityScore >= 80 ? "default" : compatibilityScore >= 60 ? "secondary" : "destructive"}
            >
              {compatibilityScore >= 80 ? "Excellent" : compatibilityScore >= 60 ? "Good" : "Poor"} Compatibility
            </Badge>
          </div>
        )}

        {/* Browser Tests */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Browser Feature Tests
          </h3>
          <div className="grid gap-3">
            {browserTests.map((test, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                {getTestIcon(test.result, test.critical)}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-sm">{test.name}</h4>
                    {test.critical && (
                      <Badge variant="outline" className="text-xs">
                        Critical
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{test.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Tests */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Device Capability Tests
          </h3>
          <div className="grid gap-3">
            {deviceTests.map((test, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                {getTestIcon(test.result)}
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{test.name}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{test.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        {!isRunning && browserTests.some((test) => test.result !== undefined) && (
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Recommendations</h3>
            <div className="space-y-2">
              {compatibilityScore < 80 && (
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    Some features may not work optimally. Consider updating your browser or enabling hardware
                    acceleration.
                  </p>
                </div>
              )}
              {browserTests.some((test) => test.critical && test.result === false) && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <p className="text-sm text-red-800 dark:text-red-200">
                    Critical features are not supported. Some features may not work properly in this browser.
                  </p>
                </div>
              )}
              {compatibilityScore >= 80 && (
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    Your browser fully supports the web features. Enjoy the smooth experience!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
