"use client"

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
    <div 
      key={`ad-${index}`} 
      className="col-span-2 h-[120px] bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 my-2"
    >
      Ad Slot {index + 1}
    </div>
  )

  const handleGameClick = (slug: string) => {
    onGameSelect(slug)
    // 更新 URL
    router.push(`/${slug}`)
    // 使用平滑滚动到游戏 iframe 区域
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

      // 每4个游戏（2行）后添加广告位
      if ((index + 1) % 4 === 0) {
        items.push(renderAdSlot(Math.floor(index / 4)))
      }
    })
    return items
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {renderGameItems()}
    </div>
  )
} 