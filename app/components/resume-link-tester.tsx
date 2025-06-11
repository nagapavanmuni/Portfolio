"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, ExternalLink, Download, AlertTriangle } from "lucide-react"

const RESUME_LINKS = {
  primary: "https://drive.google.com/file/d/15kl4qW_Q_61jKKSr2MvdBv9Eqk8zbA9d/view?usp=drive_link",
  fallback: "https://drive.google.com/file/d/1DnokfeJA9NrTS1IZEboiIUeq4Lw92HIB/view?usp=drive_link",
  download: "/resume/naga-pavan-muni-resume.pdf",
}

interface LinkStatus {
  url: string
  status: "testing" | "accessible" | "error" | "unknown"
  label: string
}

export default function ResumeLinkTester() {
  const [linkStatuses, setLinkStatuses] = useState<LinkStatus[]>([
    { url: RESUME_LINKS.primary, status: "unknown", label: "Primary Resume Link" },
    { url: RESUME_LINKS.fallback, status: "unknown", label: "Fallback Resume Link" },
    { url: RESUME_LINKS.download, status: "unknown", label: "Local PDF Download" },
  ])

  const testLinks = async () => {
    setLinkStatuses((prev) => prev.map((link) => ({ ...link, status: "testing" })))

    const updatedStatuses = await Promise.all(
      linkStatuses.map(async (link) => {
        try {
          if (link.url.startsWith("/")) {
            // Test local file
            const response = await fetch(link.url, { method: "HEAD" })
            return {
              ...link,
              status: response.ok ? "accessible" : "error",
            }
          } else {
            // For external links, we can't really test due to CORS, so we'll mark as unknown
            return {
              ...link,
              status: "unknown",
            }
          }
        } catch (error) {
          return {
            ...link,
            status: "error",
          }
        }
      }),
    )

    setLinkStatuses(updatedStatuses)
  }

  useEffect(() => {
    testLinks()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accessible":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "testing":
        return <div className="h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "accessible":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Accessible</Badge>
      case "error":
        return <Badge variant="destructive">Error</Badge>
      case "testing":
        return <Badge variant="secondary">Testing...</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ExternalLink className="h-5 w-5 text-blue-500" />
          Resume Link Status
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Testing accessibility of resume links across different sources
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <Button onClick={testLinks} size="sm" className="w-full">
          Test All Links
        </Button>

        <div className="space-y-3">
          {linkStatuses.map((link, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                {getStatusIcon(link.status)}
                <div>
                  <h4 className="font-medium text-sm">{link.label}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-xs">{link.url}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(link.status)}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(link.url, "_blank", "noopener,noreferrer")}
                  className="h-8 w-8 p-0"
                >
                  {link.url.startsWith("/") ? <Download className="h-3 w-3" /> : <ExternalLink className="h-3 w-3" />}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <p>• Primary link: Updated Google Drive URL</p>
          <p>• Fallback link: Previous working Google Drive URL</p>
          <p>• Local download: PDF file served from the website</p>
          <p>• External links may show "Unknown" due to CORS restrictions</p>
        </div>
      </CardContent>
    </Card>
  )
}
