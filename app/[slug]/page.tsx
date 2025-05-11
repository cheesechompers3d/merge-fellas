"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Home from "@/components/Home"
import { getGameBySlug } from "@/lib/games"

interface GamePageProps {
  params: {
    slug: string
  }
}

export default async function GamePage({ params }: GamePageProps) {
  const defaultGame = await getGameBySlug(params.slug)
  return <Home defaultGame={defaultGame} />
} 