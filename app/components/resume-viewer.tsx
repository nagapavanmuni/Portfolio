"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, ExternalLink, FileText, Maximize2, Minimize2, ImageIcon, ZoomIn } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import ImageLightbox from "./image-lightbox"

interface ResumeViewerProps {
  className?: string
}

export default function ResumeViewer({ className = "" }: ResumeViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showImages, setShowImages] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string; title: string } | null>(null)

  const resumePath = "/resume/naga-pavan-muni-resume.pdf"
  const resumeImages = [
    {
      src: "/resume/resume-page-1.png",
      alt: "Resume Page 1 - Contact, Summary, Education, Experience",
      title: "Page 1: Contact & Experience",
    },
    {
      src: "/resume/resume-page-2.png",
      alt: "Resume Page 2 - Projects and Technical Skills",
      title: "Page 2: Projects & Skills",
    },
  ]

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = resumePath
    link.download = "Naga-Pavan-Muni-Resume.pdf"
    link.target = "_blank"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleOpenInNewTab = () => {
    window.open(resumePath, "_blank", "noopener,noreferrer")
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const handleImageClick = (image: (typeof resumeImages)[0]) => {
    setLightboxImage({
      src: image.src,
      alt: image.alt,
      title: image.title,
    })
    setLightboxOpen(true)
  }

  return (
    <>
      <Card className={`overflow-hidden ${isFullscreen ? "fixed inset-4 z-50" : ""} ${className}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Resume</h3>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowImages(!showImages)}
              className="hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300"
            >
              <ImageIcon className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
            >
              <Download className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenInNewTab}
              className="hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={toggleFullscreen}
              className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Content */}
        <div
          className={`relative bg-gray-50 dark:bg-gray-800/50 ${isFullscreen ? "h-[calc(100vh-8rem)]" : "h-96 md:h-[600px]"}`}
        >
          {showImages ? (
            <div className="p-4 h-full overflow-auto">
              <div className="grid gap-4 md:grid-cols-2 h-full">
                {resumeImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-200/50 dark:border-gray-700/50 group cursor-pointer hover:shadow-xl transition-all duration-300"
                    onClick={() => handleImageClick(image)}
                  >
                    <div className="aspect-[8.5/11] relative">
                      <Image
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        fill
                        className="object-contain object-center transition-all duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={index === 0}
                        quality={95}
                      />

                      {/* Zoom overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 dark:bg-gray-900/90 rounded-full p-3 backdrop-blur-sm">
                          <ZoomIn className="h-6 w-6 text-gray-900 dark:text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Loading resume...</p>
                  </div>
                </div>
              )}

              <iframe
                src={`${resumePath}#toolbar=1&navpanes=1&scrollbar=1&page=1&view=FitH`}
                className="w-full h-full border-0"
                title="Naga Pavan Muni Resume"
                onLoad={() => setIsLoading(false)}
                onError={() => setIsLoading(false)}
              />
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">Naga Pavan Muni - Full Stack Developer</span>
            <span className="text-gray-500 dark:text-gray-400">
              Click images to enlarge • Last updated: December 2024
            </span>
          </div>
        </div>
      </Card>

      {/* Image Lightbox */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        image={lightboxImage}
        onDownload={handleDownload}
      />
    </>
  )
}
