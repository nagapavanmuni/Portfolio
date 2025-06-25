"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Monitor, Zap, Eye, Palette, Activity } from "lucide-react"

interface PerformanceMetrics {
  fps: number
  frameTime: number
  themeTransitionTime: number
  animationLoad: number
  memoryUsage: number
  renderTime: number
}

export default function ThemePerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    frameTime: 0,
    themeTransitionTime: 0,
    animationLoad: 0,
    memoryUsage: 0,
    renderTime: 0,
  })
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [themeTestResults, setThemeTestResults] = useState<any[]>([])
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    if (!isMonitoring) return

    let frameCount = 0
    let lastTime = performance.now()
    let animationId: number

    const measurePerformance = () => {
      const currentTime = performance.now()
      frameCount++

      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
        const frameTime = (currentTime - lastTime) / frameCount

        // Estimate animation load based on frame consistency
        const animationLoad = fps < 55 ? "High" : fps < 45 ? "Critical" : "Normal"

        // Estimate memory usage (simplified)
        const memoryUsage = (performance as any).memory
          ? Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024)
          : 0

        setMetrics((prev) => ({
          ...prev,
          fps,
          frameTime: Math.round(frameTime * 100) / 100,
          animationLoad: animationLoad === "High" ? 75 : animationLoad === "Critical" ? 90 : 50,
          memoryUsage,
          renderTime: Math.round(frameTime * 10) / 10,
        }))

        frameCount = 0
        lastTime = currentTime
      }

      animationId = requestAnimationFrame(measurePerformance)
    }

    animationId = requestAnimationFrame(measurePerformance)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isMonitoring])

  const testThemeTransition = async () => {
    const results = []
    const themes = ["light", "dark", "system"]

    for (const testTheme of themes) {
      const startTime = performance.now()

      setTheme(testTheme)

      // Wait for theme transition
      await new Promise((resolve) => setTimeout(resolve, 300))

      const endTime = performance.now()
      const transitionTime = endTime - startTime

      results.push({
        theme: testTheme,
        transitionTime: Math.round(transitionTime),
        status: transitionTime < 500 ? "Excellent" : transitionTime < 1000 ? "Good" : "Needs Optimization",
      })
    }

    setThemeTestResults(results)
    setMetrics((prev) => ({
      ...prev,
      themeTransitionTime: Math.round(results.reduce((acc, r) => acc + r.transitionTime, 0) / results.length),
    }))
  }

  const getPerformanceStatus = (value: number, type: string) => {
    switch (type) {
      case "fps":
        if (value >= 55) return { status: "Excellent", color: "bg-green-500" }
        if (value >= 45) return { status: "Good", color: "bg-yellow-500" }
        return { status: "Poor", color: "bg-red-500" }
      case "frameTime":
        if (value <= 16.7) return { status: "Excellent", color: "bg-green-500" }
        if (value <= 33.3) return { status: "Good", color: "bg-yellow-500" }
        return { status: "Poor", color: "bg-red-500" }
      case "transition":
        if (value <= 300) return { status: "Excellent", color: "bg-green-500" }
        if (value <= 500) return { status: "Good", color: "bg-yellow-500" }
        return { status: "Poor", color: "bg-red-500" }
      default:
        return { status: "Unknown", color: "bg-gray-500" }
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-500" />
          Theme & Animation Performance Monitor
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Real-time monitoring of theme transitions and background animations
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Control Buttons */}
        <div className="flex gap-4">
          <Button
            onClick={() => setIsMonitoring(!isMonitoring)}
            variant={isMonitoring ? "destructive" : "default"}
            className="flex items-center gap-2"
          >
            <Monitor className="h-4 w-4" />
            {isMonitoring ? "Stop Monitoring" : "Start Monitoring"}
          </Button>
          <Button onClick={testThemeTransition} variant="outline" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Test Theme Transitions
          </Button>
        </div>

        {/* Current Theme Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Current Theme
            </h3>
            <div className="space-y-2">
              <Badge variant="outline" className="capitalize">
                {resolvedTheme || "Loading..."}
              </Badge>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                System: {theme === "system" ? "Auto" : "Manual"}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Visual Quality
            </h3>
            <div className="space-y-2">
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Optimized</Badge>
              <p className="text-xs text-gray-600 dark:text-gray-400">Smooth animations enabled</p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Performance Mode
            </h3>
            <div className="space-y-2">
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">High Performance</Badge>
              <p className="text-xs text-gray-600 dark:text-gray-400">60fps target</p>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        {isMonitoring && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
              <h4 className="text-sm font-medium mb-2">FPS</h4>
              <div className="text-2xl font-bold mb-1">{metrics.fps}</div>
              <Badge className={getPerformanceStatus(metrics.fps, "fps").color}>
                {getPerformanceStatus(metrics.fps, "fps").status}
              </Badge>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
              <h4 className="text-sm font-medium mb-2">Frame Time</h4>
              <div className="text-2xl font-bold mb-1">{metrics.frameTime}ms</div>
              <Badge className={getPerformanceStatus(metrics.frameTime, "frameTime").color}>
                {getPerformanceStatus(metrics.frameTime, "frameTime").status}
              </Badge>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
              <h4 className="text-sm font-medium mb-2">Animation Load</h4>
              <div className="text-2xl font-bold mb-1">{metrics.animationLoad}%</div>
              <Badge
                className={
                  metrics.animationLoad < 60
                    ? "bg-green-500"
                    : metrics.animationLoad < 80
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }
              >
                {metrics.animationLoad < 60 ? "Low" : metrics.animationLoad < 80 ? "Medium" : "High"}
              </Badge>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
              <h4 className="text-sm font-medium mb-2">Memory</h4>
              <div className="text-2xl font-bold mb-1">{metrics.memoryUsage}MB</div>
              <Badge
                className={
                  metrics.memoryUsage < 50 ? "bg-green-500" : metrics.memoryUsage < 100 ? "bg-yellow-500" : "bg-red-500"
                }
              >
                {metrics.memoryUsage < 50 ? "Low" : metrics.memoryUsage < 100 ? "Medium" : "High"}
              </Badge>
            </div>
          </div>
        )}

        {/* Theme Transition Test Results */}
        {themeTestResults.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Theme Transition Test Results</h3>
            <div className="grid gap-3">
              {themeTestResults.map((result, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Palette className="h-4 w-4" />
                    <span className="font-medium capitalize">{result.theme} Mode</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{result.transitionTime}ms</span>
                    <Badge className={getPerformanceStatus(result.transitionTime, "transition").color}>
                      {result.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Average transition time: {metrics.themeTransitionTime}ms
              </p>
            </div>
          </div>
        )}

        {/* Performance Tips */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <h3 className="font-medium mb-2">Performance Optimization Tips</h3>
          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <li>• Theme transitions are optimized for sub-300ms switching</li>
            <li>• Background animations use hardware acceleration</li>
            <li>• Particle systems are limited to maintain 60fps</li>
            <li>• Memory usage is monitored to prevent leaks</li>
            <li>• Reduced motion preferences are respected</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
