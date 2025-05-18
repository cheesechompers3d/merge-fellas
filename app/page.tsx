"use client"

import { useEffect, useState } from 'react'
import type { Metadata } from "next"
import Home from "@/components/Home"
import { defaultConfig } from "@/lib/config"
import { getGameBySlug } from "@/lib/games"
import type { Game } from "@/lib/games"

interface PageProps {
  params: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const config = defaultConfig

  return {
    title: config.siteName,
    description: `Play ${config.siteName} - The Ultimate Gaming Experience`
  }
}

export default function Page() {
  const [defaultGame, setDefaultGame] = useState<Game | null>(null)
  const config = defaultConfig

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const game = await getGameBySlug(config.defaultGame)
        if (game) {
          setDefaultGame(game)
        } else {
          console.error('Default game not found:', config.defaultGame)
          setDefaultGame({
            slug: config.defaultGame,
            title: config.siteName,
            description: `Play ${config.siteName}`,
            icon: "/images/games/default-icon.jpg",
            url: "/",
            previewImage: "/images/games/default-preview.jpg",
            type: "game"
          })
        }
      } catch (error) {
        console.error('Error loading default game:', error)
        setDefaultGame({
          slug: config.defaultGame,
          title: config.siteName,
          description: `Play ${config.siteName}`,
          icon: "/images/games/default-icon.jpg",
          url: "/",
          previewImage: "/images/games/default-preview.jpg",
          type: "game"
        })
      }
    }

    fetchGame()
  }, [config.defaultGame, config.siteName])

  if (!defaultGame) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        </div>
      </div>
    )
  }

  return <Home defaultGame={defaultGame} />
}

