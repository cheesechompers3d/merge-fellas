"use client"

interface NumberBadgeProps {
  number: number
  variant?: 'purple' | 'indigo' | 'violet'
  size?: 'sm' | 'md' | 'lg'
}

const variants = {
  purple: 'bg-gradient-to-br from-purple-500 to-purple-600',
  indigo: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
  violet: 'bg-gradient-to-br from-violet-500 to-violet-600'
}

const sizes = {
  sm: 'w-8 h-8 text-base',
  md: 'w-10 h-10 text-lg',
  lg: 'w-12 h-12 text-xl'
}

export default function NumberBadge({ 
  number, 
  variant = 'purple',
  size = 'md'
}: NumberBadgeProps) {
  return (
    <div 
      className={`
        ${variants[variant]}
        ${sizes[size]}
        rounded-full 
        flex 
        items-center 
        justify-center 
        text-white 
        font-bold 
        shadow-lg
        ring-2
        ring-opacity-50
        ${variant === 'purple' ? 'ring-purple-400' : ''}
        ${variant === 'indigo' ? 'ring-indigo-400' : ''}
        ${variant === 'violet' ? 'ring-violet-400' : ''}
        transform
        transition-transform
        duration-200
        hover:scale-110
      `}
    >
      {number}
    </div>
  )
} 