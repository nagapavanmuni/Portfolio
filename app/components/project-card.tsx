import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  link: string
  tags: string[]
  demoLink?: string
}

export default function ProjectCard({ title, description, image, link, tags, demoLink }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-700 border-gray-200/30 dark:border-gray-700/30 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg hover:scale-105 hover:rotate-1 hover:bg-white/80 dark:hover:bg-gray-800/80 h-full flex flex-col">
      {/* Fixed aspect ratio container optimized for logo-style images */}
      <div className="relative w-full h-64 md:h-56 lg:h-64 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-800 dark:via-gray-900 dark:to-blue-950/30 flex-shrink-0 flex items-center justify-center p-8">
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={image || "/placeholder.svg"}
            alt={`${title} project logo`}
            fill
            className="object-contain object-center transition-all duration-1000 group-hover:scale-110 group-hover:rotate-2 filter drop-shadow-lg group-hover:drop-shadow-xl"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={false}
            quality={95}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>

        {/* Subtle gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-all duration-700" />

        {/* Hover overlay with links */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/10 backdrop-blur-sm">
          <div className="flex space-x-3">
            <Link
              href={link}
              target="_blank"
              className="flex items-center gap-2 px-3 py-2 bg-white/95 dark:bg-gray-900/95 rounded-lg text-sm font-medium text-gray-900 dark:text-white hover:bg-white dark:hover:bg-gray-900 transition-all duration-300 hover:scale-110 shadow-lg backdrop-blur-sm"
            >
              <Github className="h-4 w-4" />
              Code
            </Link>
            {demoLink && (
              <Link
                href={demoLink}
                target="_blank"
                className="flex items-center gap-2 px-3 py-2 bg-blue-600/95 hover:bg-blue-600 rounded-lg text-sm font-medium text-white transition-all duration-300 hover:scale-110 shadow-lg backdrop-blur-sm"
              >
                <ExternalLink className="h-4 w-4" />
                Demo
              </Link>
            )}
          </div>
        </div>

        {/* Corner accent for visual interest */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
      </div>

      {/* Content area with flex-grow to ensure equal heights */}
      <CardContent className="p-6 relative flex-grow flex flex-col">
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-purple-50/30 dark:from-gray-800/50 dark:to-purple-900/20 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-b-lg" />

        <div className="relative z-10 flex-grow flex flex-col">
          <h3 className="font-semibold text-xl mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-500 group-hover:scale-105 leading-tight">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-500 flex-grow">
            {description}
          </p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {tags.map((tag, index) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs bg-blue-50/80 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200/50 dark:border-blue-700/50 hover:scale-110 hover:bg-purple-50/80 dark:hover:bg-purple-900/30 hover:text-purple-700 dark:hover:text-purple-300 transition-all duration-500"
                style={{
                  animationDelay: `${index * 100}ms`,
                  transitionDelay: `${index * 50}ms`,
                }}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      {/* Footer with consistent positioning */}
      <CardFooter className="p-6 pt-0 relative z-10 mt-auto">
        <div className="flex items-center justify-between w-full">
          <Link
            href={link}
            target="_blank"
            className="inline-flex items-center gap-2 text-sm hover:underline text-blue-600 dark:text-blue-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-500 hover:scale-110 group/link"
          >
            <Github className="h-4 w-4 group-hover/link:rotate-12 group-hover/link:scale-125 transition-all duration-500" />
            View on GitHub
          </Link>

          {demoLink && (
            <Link
              href={demoLink}
              target="_blank"
              className="inline-flex items-center gap-2 text-sm hover:underline text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-all duration-500 hover:scale-110 group/link"
            >
              <ExternalLink className="h-4 w-4 group-hover/link:rotate-12 group-hover/link:scale-125 transition-all duration-500" />
              Live Demo
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
