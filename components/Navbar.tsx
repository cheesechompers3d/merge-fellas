"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

interface NavbarProps {
  onGameSelect?: (gameName: string) => void
  onToggleTheme: () => void
  isDarkMode: boolean
  currentGameTitle?: string
}

const navItems = [
  { name: "Game", id: "game-frame" },
  { name: "Features", id: "features" },
  { name: "Characteristics", id: "characteristics" },
  { name: "How to Play", id: "how-to-play" },
  { name: "Why Play", id: "why-play" },
  { name: "FAQ", id: "faq" }
]

export default function Navbar({ onGameSelect, onToggleTheme, isDarkMode, currentGameTitle }: NavbarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [siteName, setSiteName] = useState("Loading...")

  useEffect(() => {
    // 从 API 加载配置
    fetch('/api/config')
      .then(res => res.json())
      .then(data => {
        setSiteName(data.siteName)
      })
      .catch(error => {
        console.error('Error loading site config:', error)
      })
  }, [])

  const scrollToElement = (element: HTMLElement) => {
    const navbar = document.querySelector('nav')
    const navbarHeight = navbar ? navbar.offsetHeight : 0
    const rect = element.getBoundingClientRect()
    const scrollPosition = window.pageYOffset + rect.top - navbarHeight - 20

    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    })
  }

  const handleScroll = (id: string) => {
    // 如果在 More Games 页面,先跳转到主页
    if (pathname === '/more-games') {
      router.push('/')
      return
    }
    
    // 关闭移动端菜单
    setIsMenuOpen(false)

    // 等待菜单关闭动画完成和 DOM 更新
    setTimeout(() => {
      const element = document.getElementById(id)
      if (element) {
        scrollToElement(element)
      }
    }, 300) // 增加延迟时间以确保动画完成
  }

  const handleLogoClick = () => {
    router.push('/')
  }

  return (
    <nav className="bg-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* 主导航栏 */}
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button onClick={handleLogoClick} className="flex items-center space-x-2">
            <Image
              src="/images/logo.png"
              alt="Game Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-xl md:text-2xl font-bold text-white">
              {siteName}
            </span>
          </button>

          {/* 桌面端导航 */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className="text-white hover:text-purple-400 transition-colors text-sm"
              >
                {item.name}
              </button>
            ))}
            <Link
              href="/more-games"
              className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700 text-white text-sm"
            >
              More Games
            </Link>
            <button
              onClick={onToggleTheme}
              className="bg-gray-700 p-2 rounded-lg text-white"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
            </button>
          </div>

          {/* 移动端菜单按钮 */}
          <div className="flex md:hidden">
            <button
              className="text-white p-2 w-10 h-10 flex items-center justify-center"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* 移动端下拉菜单 */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleScroll(item.id)}
                  className="text-white hover:text-purple-400 transition-colors text-sm py-2 px-4 rounded-lg hover:bg-gray-700 text-left"
                >
                  {item.name}
                </button>
              ))}
              <Link
                href="/more-games"
                className="text-white hover:text-purple-400 transition-colors text-sm py-2 px-4 rounded-lg hover:bg-gray-700 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                More Games
              </Link>
              <button
                onClick={() => {
                  onToggleTheme();
                  setIsMenuOpen(false);
                }}
                className="text-white hover:text-purple-400 transition-colors text-sm py-2 px-4 rounded-lg hover:bg-gray-700 flex items-center space-x-2 w-full text-left"
              >
                <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
                <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

