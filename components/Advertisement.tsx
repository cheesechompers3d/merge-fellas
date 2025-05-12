"use client"

import { useEffect } from 'react'

interface AdvertisementProps {
  position: 'sidebar' | 'content'
  index?: number // 让 index 变成可选属性
}

// 为 window 对象添加 atOptions 类型定义
declare global {
  interface Window {
    atOptions: {
      key: string;
      format: string;
      height: number;
      width: number;
      params: Record<string, unknown>;
    };
  }
}

export default function Advertisement({ position, index = 0 }: AdvertisementProps) {
  useEffect(() => {
    // 确保容器存在
    const container = document.getElementById(`container-7286a191663e326556b5be5408f8b07a-${index}`)
    if (!container) return

    // 创建并执行第一个脚本（atOptions）
    const script1 = document.createElement('script')
    script1.type = 'text/javascript'
    script1.text = `
      window.atOptions = {
        'key' : '7286a191663e326556b5be5408f8b07a',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
        'params' : {}
      };
    `
    container.appendChild(script1)

    // 创建并执行第二个脚本（invoke.js）
    const script2 = document.createElement('script')
    script2.type = 'text/javascript'
    script2.src = '//www.highperformanceformat.com/7286a191663e326556b5be5408f8b07a/invoke.js'
    script2.async = true
    container.appendChild(script2)

    // 清理函数
    return () => {
      if (script1.parentNode) {
        script1.parentNode.removeChild(script1)
      }
      if (script2.parentNode) {
        script2.parentNode.removeChild(script2)
      }
    }
  }, [index])

  return (
    <div className={`ad-container ${position === 'sidebar' ? 'h-[600px]' : 'h-[250px]'} flex items-center justify-center`}>
      <div 
        id={`container-7286a191663e326556b5be5408f8b07a-${index}`}
        className="w-[300px] h-[250px] bg-gray-100 rounded-lg"
      />
    </div>
  )
}