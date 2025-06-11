"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MousePointer2, Sparkles } from "lucide-react"

export default function InteractiveDemo() {
  return (
    <Card className="w-full max-w-lg mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <MousePointer2 className="h-5 w-5 text-teal-500" />
          Interactive Elements Demo
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Test the standard cursor behavior with various interactive elements
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Interactive Elements */}
        <div className="space-y-3">
          <div className="flex gap-3">
            <Button className="hover-lift">
              <Sparkles className="h-4 w-4 mr-2" />
              Hover Me
            </Button>
            <Button variant="outline" className="hover-lift">
              Click Me
            </Button>
          </div>

          <Input placeholder="Type something here..." className="hover-lift" />

          <Textarea placeholder="Write a longer message..." className="hover-lift min-h-[100px]" />

          <div className="p-4 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 rounded-lg cursor-pointer hover-lift text-center">
            <p className="text-sm">Interactive area - hover and click!</p>
          </div>
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400 text-center pt-2 border-t border-gray-200/50 dark:border-gray-700/50">
          ✨ Standard cursor behavior with smooth hover effects
        </div>
      </CardContent>
    </Card>
  )
}
