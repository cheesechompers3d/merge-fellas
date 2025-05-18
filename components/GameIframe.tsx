"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Game } from "@/lib/games"
import { cn } from "@/lib/utils"

interface GameIframeProps {
  game: Game
  onGameSelect: (slug: string) => void
  isDarkMode: boolean
  isMobile?: boolean
}

export default function GameIframe({ game, onGameSelect, isDarkMode, isMobile }: GameIframeProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handleFullscreen = () => {
    if (iframeRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        iframeRef.current.requestFullscreen()
      }
    }
  }

  const handlePlayGame = () => {
    setIsPlaying(true)
    // Auto enter fullscreen on mobile
    if (isMobile && iframeRef.current) {
      setTimeout(() => {
        iframeRef.current?.requestFullscreen()
      }, 100)
    }
  }

  return (
    <div className="space-y-8">
      <div id="game-frame" className="relative aspect-video rounded-lg overflow-hidden bg-gray-900">
        {isPlaying ? (
          <>
            <iframe
              ref={iframeRef}
              src={game.url}
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button
              onClick={handleFullscreen}
              className={cn(
                "absolute p-2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-lg transition-all duration-200 z-10",
                isMobile ? "top-2 right-2" : "top-4 right-4"
              )}
              title="Toggle Fullscreen"
            >
              <svg
                className={cn(
                  "text-white",
                  isMobile ? "w-5 h-5" : "w-6 h-6"
                )}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8V6a2 2 0 012-2h2M4 16v2a2 2 0 002 2h2m8-20h2a2 2 0 012 2v2m0 12v2a2 2 0 01-2 2h-2"
                />
              </svg>
            </button>
          </>
        ) : (
          <>
            <div className="absolute inset-0">
              <Image
                src={game.previewImage || "/images/placeholder.jpg"}
                alt={game.title}
                fill
                sizes={isMobile ? "100vw" : "80vw"}
                className="object-cover blur-sm transform scale-105"
                priority
              />
              <div className="absolute inset-0 bg-black bg-opacity-60" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
              <div className={cn(
                "relative rounded-2xl overflow-hidden shadow-2xl",
                isMobile ? "w-24 h-24" : "w-32 h-32"
              )}>
                <Image
                  src={game.icon}
                  alt={game.title}
                  fill
                  sizes={isMobile ? "96px" : "128px"}
                  className="object-cover"
                  priority
                />
              </div>
              <button
                onClick={handlePlayGame}
                className={cn(
                  "flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105",
                  isMobile ? "px-4 py-2 text-sm" : "px-6 py-3"
                )}
              >
                <svg
                  className={cn(
                    "text-white",
                    isMobile ? "w-5 h-5" : "w-6 h-6"
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Play Game
              </button>
            </div>
          </>
        )}
      </div>

      {game.info && (
        <div className={cn(
          "bg-gray-900 rounded-lg p-6",
          isMobile && "p-4"
        )}>
          <h2 className={cn(
            "text-2xl font-bold mb-4 text-white",
            isMobile && "text-xl"
          )}>Game Information</h2>
          <p className="text-gray-300 leading-relaxed">
            {game.info}
          </p>
        </div>
      )}
    </div>
  )
}

