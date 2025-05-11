"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

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

  const handleScroll = (id: string) => {
    // 如果在 More Games 页面,先跳转到主页
    if (pathname === '/more-games') {
      router.push('/')
      return
    }
    
    const element = document.getElementById(id)
    if (element) {
      const offset = element.offsetTop - 80 // Account for navbar height
      window.scrollTo({
        top: offset,
        behavior: "smooth"
      })
    }
    setIsMenuOpen(false)
  }

  const handleLogoClick = () => {
    router.push('/')
  }

  return (
    <nav className="bg-gray-800 p-4 sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <button onClick={handleLogoClick} className="flex items-center space-x-2">
            <Image
              src="/images/logo.png"
              alt="Game Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-2xl font-bold text-white">
              {siteName}
            </span>
          </button>

          {/* Right side navigation and buttons */}
          <div className="flex items-center space-x-6">
            {/* Navigation links */}
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
            </div>

            {/* More Games button */}
            <Link
              href="/more-games"
              className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700 text-white text-sm"
            >
              More Games
            </Link>

            {/* Theme toggle button */}
            <button
              onClick={onToggleTheme}
              className="bg-gray-700 p-2 rounded-lg text-white"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
            </button>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden fixed top-4 right-4"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Mobile dropdown menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 right-4 bg-gray-800 rounded-lg shadow-lg p-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700 rounded"
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

