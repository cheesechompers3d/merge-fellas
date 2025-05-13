"use client"

import Advertisement from "./Advertisement"
import Image from "next/image"
import { Game } from "@/lib/types"
import { ReactNode } from "react"
import { useRouter } from "next/navigation"

interface GameListProps {
  games?: Game[]
  currentGame: string | null
  onGameSelect: (slug: string) => void
  isDarkMode: boolean
}

export default function GameList({
  games = [],
  currentGame,
  onGameSelect,
  isDarkMode,
}: GameListProps) {
  const router = useRouter()

  const renderAdSlot = (index: number) => (
    <div key={`ad-${index}`} className="col-span-full my-2">
      {index === 0 ? (
        <Advertisement position="content" index={index} />
      ) : (
        <div className="h-[20px] bg-gray-800 rounded-lg flex items-center justify-center text-gray-400">
           --------------{index + 1}--------------
        </div>
      )}
    </div>
  )

  const handleGameClick = (slug: string) => {
    onGameSelect(slug)
    router.push(`/${slug}`)
    const gameFrame = document.getElementById('game-frame')
    if (gameFrame) {
      gameFrame.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const renderGameItems = (): ReactNode[] => {
    const items: ReactNode[] = []
    games.forEach((game, index) => {
      items.push(
        <div
          key={game.slug}
          className={`cursor-pointer transition-transform duration-300 hover:scale-105 ${
            currentGame === game.slug ? "ring-2 ring-blue-500 rounded-lg" : ""
          }`}
          onClick={() => handleGameClick(game.slug)}
        >
          <div className="relative aspect-square rounded-lg overflow-hidden mb-2">
            <Image
              src={game.icon}
              alt={game.title}
              fill
              className="object-cover"
            />
          </div>
          <h3 className="text-sm font-medium text-center truncate px-2">
            {game.title}
          </h3>
        </div>
      )

      // 每6个游戏（3行）后添加广告位
      if ((index + 1) % 6 === 0) {
        items.push(renderAdSlot(Math.floor(index / 6)))
      }
    })
    return items
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
      {renderGameItems()}
    </div>
  )
} 