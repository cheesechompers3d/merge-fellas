interface AdvertisementProps {
  position: 'sidebar' | 'content'
}

export default function Advertisement({ position }: AdvertisementProps) {
  return (
    <div className={`ad-container ${position === 'sidebar' ? 'h-[600px]' : 'h-[250px]'} bg-gray-100 rounded-lg flex items-center justify-center`}>
      <span className="text-gray-500">广告位</span>
    </div>
  )
} 