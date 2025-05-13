"use client"

import { useState, useEffect } from "react"
import GameIframe from "./GameIframe"
import GameList from "./GameList"
import GameplayGuide from "./GameplayGuide"
import GameFeatures from "./GameFeatures"
import WhyPlayGame from "./WhyPlayGame"
import FAQ from "./FAQ"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { useGames } from "@/hooks/useGames"
import { useRouter, usePathname } from "next/navigation"
import { Game } from "@/lib/games"

interface HomeProps {
  defaultGame: Game | null
}

export default function Home({ defaultGame }: HomeProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const { games, loading } = useGames()
  const [currentGame, setCurrentGame] = useState<string | null>(null)

  useEffect(() => {
    if (defaultGame && !currentGame) {
      setCurrentGame(defaultGame.slug)
    }
  }, [defaultGame, currentGame])

  const handleGameSelect = (slug: string) => {
    if (slug === currentGame) return
    setCurrentGame(slug)
    router.push(`/${slug}`, { scroll: false })
  }

  const selectedGame = currentGame ? games?.find(game => game.slug === currentGame) : defaultGame

  // 共享的内容渲染函数
  const renderGameContent = (isMobile = false) => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      );
    }

    if (!selectedGame) {
      return (
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold mb-4">Welcome to Game Portal</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Select a game from the list to start playing
          </p>
        </div>
      );
    }

    return (
      <>
        {/* Title Section */}
        <div className={`text-center ${isMobile ? 'mb-6' : 'mb-8'}`}>
          <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text`}>
            {selectedGame.title}
          </h1>
          <p className={`${isMobile ? 'text-base' : 'text-lg'} bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text font-medium max-w-8xl mx-auto px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm`}>
            {selectedGame.description}
          </p>
        </div>

        {/* Game Frame */}
        <div id="game-frame">
          <GameIframe
            game={selectedGame}
            onGameSelect={handleGameSelect}
            isDarkMode={isDarkMode}
          />
        </div>

        {/* Features Section */}
        {selectedGame.features?.items && selectedGame.features.items.length > 0 && (
          <div id="features" className={isMobile ? 'mt-6' : 'mt-8'}>
            <GameFeatures
              features={selectedGame.features}
              characteristics={null}
            />
          </div>
        )}

        {/* Characteristics Section */}
        {selectedGame.characteristics?.items && selectedGame.characteristics.items.length > 0 && (
          <div id="characteristics" className={isMobile ? 'mt-6' : 'mt-8'}>
            <GameFeatures
              features={null}
              characteristics={selectedGame.characteristics}
            />
          </div>
        )}

        {/* How to Play Section */}
        {selectedGame.howToPlayIntro && selectedGame.howToPlaySteps && selectedGame.howToPlaySteps.length > 0 && (
          <div id="how-to-play" className={isMobile ? 'mt-6' : 'mt-8'}>
            <GameplayGuide
              intro={selectedGame.howToPlayIntro}
              steps={selectedGame.howToPlaySteps}
              videoUrls={selectedGame.videoUrls}
            />
          </div>
        )}

        {/* Why Play Section */}
        {selectedGame.whyPlay?.items && selectedGame.whyPlay.items.length > 0 && (
          <div id="why-play" className={isMobile ? 'mt-6' : 'mt-8'}>
            <WhyPlayGame reasons={selectedGame.whyPlay} />
          </div>
        )}

        {/* FAQ Section */}
        {selectedGame.faq?.items && selectedGame.faq.items.length > 0 && (
          <div id="faq" className={isMobile ? 'mt-6' : 'mt-8'}>
            <FAQ faq={selectedGame.faq} />
          </div>
        )}
      </>
    );
  };

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <Navbar 
          isDarkMode={isDarkMode} 
          onToggleTheme={() => setIsDarkMode(!isDarkMode)} 
          currentGameTitle={selectedGame?.title}
        />
        <main>
          {/* 桌面端布局 */}
          <div className="hidden lg:flex">
            {/* 左侧固定宽度空白区域 */}
            <div className="w-[100px] flex-shrink-0" />

            {/* 中间内容区域 */}
            <div className="flex-1 p-8">
              {renderGameContent(false)}
            </div>

            {/* 右侧游戏列表 */}
            <div className="w-80 border-l border-gray-200 dark:border-gray-800 p-4">
              <div className="mb-4">
                <h2 className="text-xl font-semibold">Hot Games</h2>
              </div>
              {loading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
                </div>
              ) : (
                <GameList
                  games={games}
                  currentGame={currentGame}
                  onGameSelect={handleGameSelect}
                  isDarkMode={isDarkMode}
                />
              )}
            </div>
          </div>

          {/* 移动端布局 */}
          <div className="lg:hidden p-4">
            <div className="space-y-6">
              {renderGameContent(true)}
              
              {/* 移动端游戏列表 */}
              {selectedGame && (
                <div className="mt-12">
                  <h2 className="text-xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
                    更多热门游戏
                  </h2>
                  <GameList
                    games={games}
                    currentGame={currentGame}
                    onGameSelect={handleGameSelect}
                    isDarkMode={isDarkMode}
                  />
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
} 