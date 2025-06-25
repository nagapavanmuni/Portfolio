"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

interface LiveTextProps {
  texts: string[]
  className?: string
  speed?: number
  pauseDuration?: number
}

export default function DynamicLiveText({ texts, className = "", speed = 100, pauseDuration = 2000 }: LiveTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [showCursor, setShowCursor] = useState(true)
  const { resolvedTheme } = useTheme()
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const currentFullText = texts[currentTextIndex]

    if (isTyping) {
      if (currentText.length < currentFullText.length) {
        timeoutRef.current = setTimeout(() => {
          setCurrentText(currentFullText.slice(0, currentText.length + 1))
        }, speed)
      } else {
        timeoutRef.current = setTimeout(() => {
          setIsTyping(false)
        }, pauseDuration)
      }
    } else {
      if (currentText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1))
        }, speed / 2)
      } else {
        setCurrentTextIndex((prev) => (prev + 1) % texts.length)
        setIsTyping(true)
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [currentText, currentTextIndex, isTyping, texts, speed, pauseDuration])

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  // Theme-aware gradient colors
  const getGradientClasses = () => {
    if (resolvedTheme === "dark") {
      return "bg-gradient-to-r from-teal-300 via-blue-400 to-purple-400"
    }
    return "bg-gradient-to-r from-teal-500 via-blue-600 to-purple-600"
  }

  const getUnderlineClasses = () => {
    if (resolvedTheme === "dark") {
      return "bg-gradient-to-r from-teal-300 to-purple-400"
    }
    return "bg-gradient-to-r from-teal-500 to-purple-600"
  }

  const getGlowClasses = () => {
    if (resolvedTheme === "dark") {
      return "bg-gradient-to-r from-teal-300/30 via-blue-400/30 to-purple-400/30"
    }
    return "bg-gradient-to-r from-teal-500/20 via-blue-600/20 to-purple-600/20"
  }

  return (
    <div className={`relative ${className}`}>
      <motion.span
        className={`inline-block ${getGradientClasses()} bg-clip-text text-transparent font-bold`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {currentText}
        <motion.span
          className={`inline-block w-0.5 h-[1em] ml-1 ${
            resolvedTheme === "dark" ? "bg-blue-400" : "bg-blue-600"
          } ${showCursor ? "opacity-100" : "opacity-0"}`}
          animate={{
            scaleY: [1, 0.8, 1],
            opacity: showCursor ? 1 : 0,
          }}
          transition={{
            scaleY: { duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
            opacity: { duration: 0.1 },
          }}
        />
      </motion.span>

      {/* Animated underline */}
      <motion.div
        className={`absolute bottom-0 left-0 h-0.5 ${getUnderlineClasses()}`}
        initial={{ width: 0 }}
        animate={{ width: isTyping ? `${(currentText.length / texts[currentTextIndex].length) * 100}%` : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Glow effect */}
      <motion.div
        className={`absolute inset-0 ${getGlowClasses()} blur-xl -z-10`}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
    </div>
  )
}
