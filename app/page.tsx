import type { Metadata } from "next"
import { defaultConfig } from "@/lib/config"
import ClientPage from "@/components/ClientPage"

export const metadata: Metadata = {
  title: defaultConfig.siteName,
  description: `Play ${defaultConfig.siteName} - The Ultimate Gaming Experience`
}

export default function Page() {
  return <ClientPage />
}

