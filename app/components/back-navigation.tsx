"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, X, Home } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

interface BackNavigationProps {
  variant?: "arrow" | "cross" | "home"
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  showLabel?: boolean
  className?: string
}

export default function BackNavigation({
  variant = "arrow",
  position = "top-left",
  showLabel = true,
  className = "",
}: BackNavigationProps) {
  const router = useRouter()
  const { resolvedTheme } = useTheme()

  const handleBack = () => {
    router.push("/")
  }

  const getIcon = () => {
    const iconClass = `h-5 w-5 ${
      resolvedTheme === "dark" ? "text-gray-200 group-hover:text-teal-300" : "text-gray-700 group-hover:text-teal-600"
    }`

    switch (variant) {
      case "cross":
        return <X className={iconClass} />
      case "home":
        return <Home className={iconClass} />
      default:
        return <ArrowLeft className={iconClass} />
    }
  }

  const getPositionClasses = () => {
    switch (position) {
      case "top-right":
        return "top-6 right-6"
      case "bottom-left":
        return "bottom-6 left-6"
      case "bottom-right":
        return "bottom-6 right-6"
      default:
        return "top-6 left-6"
    }
  }

  const getLabel = () => {
    switch (variant) {
      case "cross":
        return "Close"
      case "home":
        return "Home"
      default:
        return "Back"
    }
  }

  const getButtonClasses = () => {
    if (resolvedTheme === "dark") {
      return "bg-gray-900/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-700/50 hover:bg-gray-800 dark:hover:bg-gray-700 hover:border-teal-500/50 shadow-lg hover:shadow-teal-500/20"
    }
    return "bg-white/90 backdrop-blur-sm border-gray-200/50 hover:bg-gray-50 hover:border-teal-500/50 shadow-lg hover:shadow-teal-500/20"
  }

  return (
    <motion.div
      className={`fixed ${getPositionClasses()} z-40 ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Button
        onClick={handleBack}
        variant="outline"
        size={showLabel ? "default" : "icon"}
        className={`${getButtonClasses()} hover:scale-110 transition-all duration-300 group`}
        aria-label={`${getLabel()} to home page`}
      >
        <motion.div whileHover={{ rotate: variant === "arrow" ? -5 : 0, scale: 1.1 }} transition={{ duration: 0.2 }}>
          {getIcon()}
        </motion.div>
        {showLabel && (
          <span
            className={`ml-2 group-hover:translate-x-0.5 transition-transform duration-200 ${
              resolvedTheme === "dark" ? "text-gray-200" : "text-gray-700"
            }`}
          >
            {getLabel()}
          </span>
        )}
      </Button>
    </motion.div>
  )
}
