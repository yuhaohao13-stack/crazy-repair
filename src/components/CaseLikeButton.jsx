'use client'
import { useEffect, useState } from 'react'

const LS_KEY = 'crazy_case_likes'

/** 案例详情页底部点赞按钮（同一浏览器防重复点赞） */
export default function CaseLikeButton({ id, initialCount = 0, className = '' }) {
  const [count, setCount] = useState(initialCount || 0)
  const [liked, setLiked] = useState(false)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY)
      if (raw) setLiked(JSON.parse(raw).includes(id))
    } catch {}
  }, [id])

  const like = async () => {
    if (liked || busy) return
    setBusy(true)
    try {
      const r = await fetch('/api/cases/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      const j = await r.json()
      if (r.ok) {
        setCount(j.count)
        setLiked(true)
        try {
          const raw = localStorage.getItem(LS_KEY)
          const arr = raw ? JSON.parse(raw) : []
          localStorage.setItem(LS_KEY, JSON.stringify(Array.from(new Set([...arr, id]))))
        } catch {}
      }
    } catch {} finally {
      setBusy(false)
    }
  }

  return (
    <button
      onClick={like}
      disabled={liked || busy}
      title={liked ? '已点赞' : '给这个案例点个赞'}
      className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-default disabled:opacity-70 ${className}`}
    >
      👍 {liked ? '已点赞' : '点赞'} <span className="font-bold">{count}</span>
    </button>
  )
}
