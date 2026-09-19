'use client'
import { useState } from 'react'

/**
 * 分享按钮：手机调系统分享面板；电脑/不支持时复制链接
 * 分享出去的永远是干净链接（去掉查询参数）
 */
export default function ShareButton({ title = '', label = '分享', className = '' }) {
  const [done, setDone] = useState(false)

  const onShare = async () => {
    const url = typeof window !== 'undefined'
      ? window.location.origin + window.location.pathname
      : ''
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({ title, url })
        return
      }
    } catch (e) {
      if (e && e.name === 'AbortError') return
    }
    try {
      await navigator.clipboard.writeText(url)
      setDone(true)
      setTimeout(() => setDone(false), 2000)
    } catch {}
  }

  return (
    <button
      onClick={onShare}
      title="分享这个案例"
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 border border-gray-200 bg-white text-xs text-gray-500 transition-colors hover:bg-gray-50 ${className}`}
    >
      <span>🔗</span>
      <span>{done ? '已复制 ✅' : label}</span>
    </button>
  )
}
