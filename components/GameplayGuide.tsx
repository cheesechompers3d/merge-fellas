"use client"

import { HowToPlayStep } from "@/lib/types"

interface GameplayGuideProps {
  intro?: string
  steps?: HowToPlayStep[]
  videoUrls?: string[]
}

export default function GameplayGuide({ intro, steps, videoUrls }: GameplayGuideProps) {
  if (!intro && (!steps || steps.length === 0) && (!videoUrls || videoUrls.length === 0)) {
    return null
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-white">How to Play</h2>
      
      {videoUrls && videoUrls.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {videoUrls.map((url, index) => (
            <div key={index} className="aspect-video w-full">
              <iframe
                src={`${url}?autoplay=0&rel=0&showinfo=0&modestbranding=1`}
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                title="Game Tutorial Video"
              />
            </div>
          ))}
        </div>
      )}
      
      {intro && (
        <p className="text-gray-300 mb-8 leading-relaxed">
          {intro}
        </p>
      )}
      
      {steps && steps.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg p-6 flex flex-col gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-lg">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
