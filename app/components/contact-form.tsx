"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { submitContactForm } from "../actions"
import { useTheme } from "next-themes"

export default function ContactForm() {
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState("")
  const { resolvedTheme } = useTheme()

  async function handleSubmit(formData: FormData) {
    setPending(true)
    try {
      const response = await submitContactForm(formData)
      setMessage(response.message)
    } catch (error) {
      setMessage("Something went wrong. Please try again.")
    } finally {
      setPending(false)
    }
  }

  const getCardClasses = () => {
    if (resolvedTheme === "dark") {
      return "bg-gray-800/60 dark:bg-gray-800/60 border-gray-700/30 hover:bg-gray-800/80"
    }
    return "bg-white/60 border-gray-200/30 hover:bg-white/80"
  }

  const getInputClasses = () => {
    if (resolvedTheme === "dark") {
      return "bg-gray-900/70 border-gray-600/50 focus:border-blue-400 focus:shadow-blue-800/50"
    }
    return "bg-white/70 border-gray-300/50 focus:border-blue-500 focus:shadow-blue-200/50"
  }

  const getLabelClasses = () => {
    if (resolvedTheme === "dark") {
      return "text-gray-300 group-hover/input:text-blue-400"
    }
    return "text-gray-700 group-hover/input:text-blue-600"
  }

  return (
    <Card
      className={`p-8 group hover:shadow-2xl transition-all duration-700 backdrop-blur-lg hover:scale-105 ${getCardClasses()}`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          resolvedTheme === "dark"
            ? "from-blue-950/30 dark:to-purple-950/30"
            : "from-blue-50/40 via-transparent to-purple-50/40"
        } opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-lg`}
      />

      <form action={handleSubmit} className="space-y-6 relative z-10">
        <div className="group/input">
          <label
            htmlFor="name"
            className={`block text-sm font-medium mb-2 transition-all duration-500 ${getLabelClasses()}`}
          >
            Name
          </label>
          <Input
            id="name"
            name="name"
            required
            className={`${getInputClasses()} transition-all duration-500 focus:scale-105 focus:shadow-lg backdrop-blur-sm`}
          />
        </div>
        <div className="group/input">
          <label
            htmlFor="email"
            className={`block text-sm font-medium mb-2 transition-all duration-500 ${getLabelClasses()}`}
          >
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            className={`${getInputClasses()} transition-all duration-500 focus:scale-105 focus:shadow-lg backdrop-blur-sm`}
          />
        </div>
        <div className="group/input">
          <label
            htmlFor="message"
            className={`block text-sm font-medium mb-2 transition-all duration-500 ${getLabelClasses()}`}
          >
            Message
          </label>
          <Textarea
            id="message"
            name="message"
            required
            className={`${getInputClasses()} min-h-[120px] transition-all duration-500 focus:scale-105 focus:shadow-lg backdrop-blur-sm`}
          />
        </div>
        <Button
          type="submit"
          className={`w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 dark:from-blue-500 dark:via-purple-500 dark:to-pink-500 dark:hover:from-pink-500 dark:hover:via-purple-500 dark:hover:to-blue-500 text-white transition-all duration-700 hover:scale-105 hover:shadow-xl ${
            resolvedTheme === "dark" ? "hover:shadow-purple-800/50" : "hover:shadow-purple-200/50"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          disabled={pending}
        >
          {pending ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Sending...
            </span>
          ) : (
            "Send Message"
          )}
        </Button>
        {message && (
          <p
            className={`text-sm text-center mt-4 animate-pulse p-3 rounded-lg border ${
              resolvedTheme === "dark"
                ? "text-gray-300 bg-green-900/20 border-green-700/50"
                : "text-gray-600 bg-green-50/50 border-green-200/50"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </Card>
  )
}
