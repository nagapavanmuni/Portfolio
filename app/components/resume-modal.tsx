"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Download, ExternalLink, X, FileText, AlertCircle, ImageIcon, ZoomIn } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"
import ImageLightbox from "./image-lightbox"

interface ResumeModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [pdfSupported, setPdfSupported] = useState(true)
  const [showImages, setShowImages] = useState(true)
  const [showPdf, setShowPdf] = useState(false) // Start with images by default
  const [imagesLoaded, setImagesLoaded] = useState({ page1: false, page2: false })
  const [imageErrors, setImageErrors] = useState({ page1: false, page2: false })
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string; title: string } | null>(null)
  const [pdfLoadAttempted, setPdfLoadAttempted] = useState(false)
  const [pdfLoadError, setPdfLoadError] = useState(false)

  const resumePath = "/resume/naga-pavan-muni-resume.pdf"
  const resumeImages = [
    {
      src: "/resume/resume-page-1.png",
      alt: "Resume Page 1 - Contact, Summary, Education, Experience",
      title: "Page 1: Contact & Experience",
      description: "Contact information, professional summary, education, and work experience",
    },
    {
      src: "/resume/resume-page-2.png",
      alt: "Resume Page 2 - Projects and Technical Skills",
      title: "Page 2: Projects & Skills",
      description: "Project portfolio and comprehensive technical skills",
    },
  ]

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      setHasError(false)
      setImagesLoaded({ page1: false, page2: false })
      setImageErrors({ page1: false, page2: false })
      setPdfLoadAttempted(false)
      setPdfLoadError(false)

      // Check PDF support and device capabilities
      const checkPdfSupport = () => {
        const userAgent = navigator.userAgent.toLowerCase()
        const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
        const isIOS = /ipad|iphone|ipod/.test(userAgent)
        const isSafari = /safari/.test(userAgent) && !/chrome/.test(userAgent)

        // Disable PDF viewer for iOS and mobile Safari due to compatibility issues
        if (isIOS || (isMobile && isSafari)) {
          setPdfSupported(false)
        }

        setIsLoading(false)
      }

      const timer = setTimeout(checkPdfSupport, 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = resumePath
    link.download = "Naga-Pavan-Muni-Resume.pdf"
    link.target = "_blank"
    link.rel = "noopener noreferrer"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleOpenInNewTab = () => {
    window.open(resumePath, "_blank", "noopener,noreferrer")
  }

  const handlePdfError = () => {
    setPdfLoadError(true)
    setHasError(true)
    setIsLoading(false)
  }

  const handlePdfLoad = () => {
    setPdfLoadAttempted(true)
    setIsLoading(false)
    setHasError(false)
    setPdfLoadError(false)
  }

  const handleImageLoad = (page: "page1" | "page2") => {
    setImagesLoaded((prev) => ({ ...prev, [page]: true }))
  }

  const handleImageError = (page: "page1" | "page2") => {
    setImageErrors((prev) => ({ ...prev, [page]: true }))
  }

  const handleImageClick = (image: (typeof resumeImages)[0]) => {
    setLightboxImage({
      src: image.src,
      alt: image.alt,
      title: image.title,
    })
    setLightboxOpen(true)
  }

  const allImagesLoaded = imagesLoaded.page1 && imagesLoaded.page2
  const hasImageErrors = imageErrors.page1 || imageErrors.page2

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-7xl w-full h-[95vh] p-0 gap-0 bg-white dark:bg-gray-900 border-gray-200/50 dark:border-gray-700/50">
          {/* Header */}
          <DialogHeader className="flex flex-row items-center justify-between p-4 lg:p-6 border-b border-gray-200/50 dark:border-gray-700/50 space-y-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <DialogTitle className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Resume - Naga Pavan Muni
            </DialogTitle>

            <div className="flex items-center gap-1 lg:gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowImages(!showImages)}
                className={`hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300 ${
                  showImages ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300" : ""
                }`}
              >
                <ImageIcon className="h-4 w-4 lg:mr-2" />
                <span className="hidden lg:inline">{showImages ? "Hide" : "Show"} Images</span>
              </Button>

              {pdfSupported && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPdf(!showPdf)}
                  className={`hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300 ${
                    showPdf ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300" : ""
                  }`}
                >
                  <FileText className="h-4 w-4 lg:mr-2" />
                  <span className="hidden lg:inline">{showPdf ? "Hide" : "Show"} PDF</span>
                </Button>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
              >
                <Download className="h-4 w-4 lg:mr-2" />
                <span className="hidden lg:inline">Download</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleOpenInNewTab}
                className="hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300"
              >
                <ExternalLink className="h-4 w-4 lg:mr-2" />
                <span className="hidden lg:inline">Open</span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          {/* Content */}
          <div className="flex-1 relative bg-gray-50 dark:bg-gray-800/50 overflow-auto">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-10">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Loading resume...</p>
                </div>
              </div>
            )}

            <div className="p-4 lg:p-6 space-y-6 lg:space-y-8">
              {/* Resume Images Section */}
              {showImages && (
                <div className="space-y-4 lg:space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <ImageIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Resume Images</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">(Click to enlarge)</span>
                  </div>

                  {!allImagesLoaded && !hasImageErrors && (
                    <div className="flex items-center justify-center py-8">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Loading resume images...</p>
                      </div>
                    </div>
                  )}

                  <div className="grid gap-4 lg:gap-6 md:grid-cols-2">
                    {resumeImages.map((image, index) => (
                      <div
                        key={index}
                        className="relative bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-200/50 dark:border-gray-700/50 group hover:shadow-2xl transition-all duration-500 cursor-pointer"
                        onClick={() => handleImageClick(image)}
                      >
                        {/* Optimized aspect ratio container for resume pages */}
                        <div className="aspect-[8.5/11] relative">
                          {!imagesLoaded[index === 0 ? "page1" : "page2"] &&
                            !imageErrors[index === 0 ? "page1" : "page2"] && (
                              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                                <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                              </div>
                            )}

                          {imageErrors[index === 0 ? "page1" : "page2"] ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                              <div className="text-center">
                                <AlertCircle className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                                <p className="text-sm text-gray-600 dark:text-gray-300">Failed to load image</p>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleDownload()
                                  }}
                                  className="mt-2"
                                >
                                  Download PDF Instead
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <Image
                                src={image.src || "/placeholder.svg"}
                                alt={image.alt}
                                fill
                                className="object-contain object-center transition-all duration-500 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                                priority={index === 0}
                                quality={95}
                                onLoad={() => handleImageLoad(index === 0 ? "page1" : "page2")}
                                onError={() => handleImageError(index === 0 ? "page1" : "page2")}
                              />

                              {/* Zoom overlay */}
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 dark:bg-gray-900/90 rounded-full p-3 backdrop-blur-sm">
                                  <ZoomIn className="h-6 w-6 text-gray-900 dark:text-white" />
                                </div>
                              </div>
                            </>
                          )}
                        </div>

                        {/* Enhanced image info overlay */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-all duration-300">
                          <div className="text-white">
                            <p className="font-medium text-sm lg:text-base">{image.title}</p>
                            <p className="text-white/80 text-xs lg:text-sm mt-1">{image.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <ZoomIn className="h-4 w-4" />
                              <span className="text-xs">Click to enlarge</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PDF Viewer Section */}
              {showPdf && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">PDF Document</h3>
                  </div>

                  {hasError || !pdfSupported || pdfLoadError ? (
                    <div className="flex items-center justify-center p-8 bg-white dark:bg-gray-900 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                      <div className="text-center max-w-md">
                        <AlertCircle className="h-16 w-16 text-amber-500 mx-auto mb-4" />
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {!pdfSupported ? "PDF Viewer Not Supported" : "Unable to Load PDF"}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                          {!pdfSupported
                            ? "Your device doesn't support inline PDF viewing. The resume images above provide the same content, or you can download the PDF."
                            : "The PDF couldn't be displayed inline. Please try downloading or opening in a new tab, or view the resume images above."}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <Button
                            onClick={handleDownload}
                            className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download PDF
                          </Button>
                          <Button
                            variant="outline"
                            onClick={handleOpenInNewTab}
                            className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Open in New Tab
                          </Button>
                          {!showImages && (
                            <Button
                              variant="outline"
                              onClick={() => setShowImages(true)}
                              className="hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300"
                            >
                              <ImageIcon className="h-4 w-4 mr-2" />
                              View Images Instead
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-200/50 dark:border-gray-700/50">
                      <div className="relative">
                        {!pdfLoadAttempted && (
                          <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-10">
                            <div className="flex flex-col items-center gap-4">
                              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                              <p className="text-sm text-gray-600 dark:text-gray-300">Loading PDF...</p>
                            </div>
                          </div>
                        )}
                        <iframe
                          src={`${resumePath}#toolbar=1&navpanes=0&scrollbar=1&page=1&view=FitH&zoom=page-fit`}
                          className="w-full h-96 md:h-[700px] lg:h-[800px] border-0"
                          title="Naga Pavan Muni Resume PDF"
                          onLoad={handlePdfLoad}
                          onError={handlePdfError}
                          style={{
                            backgroundColor: "white",
                            minHeight: "600px",
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Fallback when both are hidden */}
              {!showImages && !showPdf && (
                <div className="flex items-center justify-center p-12 bg-white dark:bg-gray-900 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                  <div className="text-center">
                    <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Resume Hidden</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Use the toggle buttons above to show the resume images or PDF viewer.
                    </p>
                    <div className="flex gap-3 justify-center">
                      <Button
                        onClick={() => setShowImages(true)}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Show Images
                      </Button>
                      {pdfSupported && (
                        <Button
                          onClick={() => setShowPdf(true)}
                          variant="outline"
                          className="hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Show PDF
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Footer */}
          <div className="p-4 lg:p-6 border-t border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Last updated: December 2024</span>
                </div>
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  <span>2 pages • Click images to enlarge</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span>Need help?</span>
                <Button
                  variant="link"
                  size="sm"
                  onClick={handleDownload}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-0 h-auto text-xs"
                >
                  Download PDF
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
