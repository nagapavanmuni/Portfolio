"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { submitContactForm } from "../actions"

export default function ContactForm() {
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState("")

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

  return (
    <Card className="p-8 group hover:shadow-2xl transition-all duration-700 border-gray-200/30 dark:border-gray-700/30 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg hover:scale-105 hover:bg-white/80 dark:hover:bg-gray-800/80">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-transparent to-purple-50/40 dark:from-blue-950/30 dark:to-purple-950/30 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-lg" />

      <form action={handleSubmit} className="space-y-6 relative z-10">
        <div className="group/input">
          <label
            htmlFor="name"
            className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300 group-hover/input:text-blue-600 dark:group-hover/input:text-blue-400 transition-all duration-500"
          >
            Name
          </label>
          <Input
            id="name"
            name="name"
            required
            className="bg-white/70 dark:bg-gray-900/70 border-gray-300/50 dark:border-gray-600/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-500 focus:scale-105 focus:shadow-lg focus:shadow-blue-200/50 dark:focus:shadow-blue-800/50 backdrop-blur-sm"
          />
        </div>
        <div className="group/input">
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300 group-hover/input:text-blue-600 dark:group-hover/input:text-blue-400 transition-all duration-500"
          >
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            className="bg-white/70 dark:bg-gray-900/70 border-gray-300/50 dark:border-gray-600/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-500 focus:scale-105 focus:shadow-lg focus:shadow-blue-200/50 dark:focus:shadow-blue-800/50 backdrop-blur-sm"
          />
        </div>
        <div className="group/input">
          <label
            htmlFor="message"
            className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300 group-hover/input:text-blue-600 dark:group-hover/input:text-blue-400 transition-all duration-500"
          >
            Message
          </label>
          <Textarea
            id="message"
            name="message"
            required
            className="bg-white/70 dark:bg-gray-900/70 border-gray-300/50 dark:border-gray-600/50 focus:border-blue-500 dark:focus:border-blue-400 min-h-[120px] transition-all duration-500 focus:scale-105 focus:shadow-lg focus:shadow-blue-200/50 dark:focus:shadow-blue-800/50 backdrop-blur-sm"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white transition-all duration-700 hover:scale-105 hover:shadow-xl hover:shadow-purple-200/50 dark:hover:shadow-purple-800/50 disabled:opacity-50 disabled:cursor-not-allowed"
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
          <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-300 animate-pulse bg-green-50/50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200/50 dark:border-green-700/50">
            {message}
          </p>
        )}
      </form>
    </Card>
  )
}
