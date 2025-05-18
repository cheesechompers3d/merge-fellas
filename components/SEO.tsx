import { siteConfig } from "@/config/site"

interface SEOProps {
  title?: string
  description?: string
  path?: string
  noindex?: boolean
}

export function SEO({ 
  title, 
  description = siteConfig.description,
  path = "",
  noindex = false 
}: SEOProps) {
  const canonicalUrl = `${siteConfig.baseUrl}${path}`
  
  return (
    <>
      {title && (
        <title>{`${title} - ${siteConfig.name}`}</title>
      )}
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noindex && (
        <meta name="robots" content="noindex" />
      )}
    </>
  )
} 