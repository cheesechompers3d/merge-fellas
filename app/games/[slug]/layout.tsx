"use client"

import GameListWrapper from '@/components/GameListWrapper'
import Advertisement from '@/components/Advertisement'
import { getGames } from '@/lib/games'

export default async function GameLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { slug: string }
}) {
  const games = await getGames()

  return (
    <div className="container mx-auto px-4 py-4 lg:py-8">
      {/* 桌面端布局 */}
      <div className="hidden lg:grid lg:grid-cols-4 gap-8">
        <div className="col-span-3">
          {children}
        </div>
        <div className="space-y-8">
          <GameListWrapper games={games} currentGame={params.slug} />
          <Advertisement position="sidebar" />
        </div>
      </div>

      {/* 移动端布局 */}
      <div className="lg:hidden flex flex-col space-y-6">
        {/* 主要内容 */}
        <div>
          {children}
        </div>
        
        {/* 移动端游戏列表 */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
            更多热门游戏
          </h2>
          <GameListWrapper games={games} currentGame={params.slug} />
          <Advertisement position="content" />
        </div>
      </div>
    </div>
  )
} 