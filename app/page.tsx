import { Metadata } from 'next'
import Home from '@/components/Home'
import { getGameBySlug } from '@/lib/games'

interface PageProps {
  params: { slug?: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: 'Merge Fellas',
    description: 'Play Merge Fellas - The Ultimate Merging Game Experience'
  }
}

export default async function Page({ params, searchParams }: PageProps) {
  const defaultGame = await getGameBySlug('merge-fellas')
  return <Home defaultGame={defaultGame} />
}

