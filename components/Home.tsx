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

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <Navbar 
          isDarkMode={isDarkMode} 
          onToggleTheme={() => setIsDarkMode(!isDarkMode)} 
          currentGameTitle={selectedGame?.title}
        />
        <main>
          <div className="flex">
            {/* 左侧固定宽度空白区域 */}
            <div className="hidden lg:block w-[100px] flex-shrink-0">
              {/* 这里可以放置一些固定内容或保持空白 */}
            </div>

            {/* 中间内容区域 */}
            <div className="flex-1 p-8">
              {loading ? (
                <div className="flex items-center justify-center h-96">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
                </div>
              ) : selectedGame ? (
                <>
                  {/* Title Section */}
                  <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">{selectedGame.title}</h1>
                    <p className="text-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text font-medium max-w-3xl mx-auto px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                      {selectedGame.description}
                    </p>
                  </div>

                  <div>
                    <GameIframe
                      game={selectedGame}
                      onGameSelect={handleGameSelect}
                      isDarkMode={isDarkMode}
                    />
                  </div>

                  {/* Features Section */}
                  {selectedGame.features?.items && selectedGame.features.items.length > 0 && (
                    <div id="features" className="mt-8">
                      <GameFeatures
                        features={selectedGame.features}
                        characteristics={null}
                      />
                    </div>
                  )}

                  {/* Characteristics Section */}
                  {selectedGame.characteristics?.items && selectedGame.characteristics.items.length > 0 && (
                    <div id="characteristics" className="mt-8">
                      <GameFeatures
                        features={null}
                        characteristics={selectedGame.characteristics}
                      />
                    </div>
                  )}

                  {/* How to Play Section */}
                  {selectedGame.howToPlayIntro && selectedGame.howToPlaySteps && selectedGame.howToPlaySteps.length > 0 && (
                    <div id="how-to-play" className="mt-8">
                      <GameplayGuide
                        intro={selectedGame.howToPlayIntro}
                        steps={selectedGame.howToPlaySteps}
                        videoUrls={selectedGame.videoUrls}
                      />
                    </div>
                  )}

                  {/* Why Play Section */}
                  {selectedGame.whyPlay?.items && selectedGame.whyPlay.items.length > 0 && (
                    <div id="why-play" className="mt-8">
                      <WhyPlayGame reasons={selectedGame.whyPlay} />
                    </div>
                  )}

                  {/* FAQ Section */}
                  {selectedGame.faq?.items && selectedGame.faq.items.length > 0 && (
                    <div id="faq" className="mt-8">
                      <FAQ faq={selectedGame.faq} />
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <h1 className="text-3xl font-bold mb-4">Welcome to Game Portal</h1>
                  <p className="text-xl text-gray-600 dark:text-gray-400">
                    Select a game from the list to start playing
                  </p>
                </div>
              )}
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
        </main>
        <Footer />
      </div>
    </div>
  )
} 