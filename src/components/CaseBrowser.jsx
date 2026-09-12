'use client'
import { useEffect, useMemo, useState } from 'react'
import { Search } from 'lucide-react'

const LS_KEY = 'crazy_case_likes'
const PAGE_STEP = 60

/**
 * /cases 案例浏览器：最新 / 热帖 切换 + 全库搜索 + 每帖点赞
 * cases: [{id,title,tag,date,excerpt}]（含静态 + 站内发布）
 * initialLikes: {caseId: count}
 */
export default function CaseBrowser({ cases = [], initialLikes = {} }) {
  const [tab, setTab] = useState('latest')
  const [q, setQ] = useState('')
  const [applied, setApplied] = useState('')
  const [likes, setLikes] = useState(initialLikes || {})
  const [likedIds, setLikedIds] = useState([])
  const [busyId, setBusyId] = useState(null)
  const [visible, setVisible] = useState(PAGE_STEP)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY)
      if (raw) setLikedIds(JSON.parse(raw))
    } catch {}
  }, [])

  const list = useMemo(() => {
    const kw = applied.trim().toLowerCase()
    let arr = cases
    if (kw) {
      arr = arr.filter(c =>
        (c.title || '').toLowerCase().includes(kw) ||
        (c.excerpt || '').toLowerCase().includes(kw) ||
        (c.tag || '').toLowerCase().includes(kw)
      )
    }
    const copy = [...arr]
    if (tab === 'hot') {
      copy.sort((a, b) => (likes[b.id] || 0) - (likes[a.id] || 0) || String(b.date || '').localeCompare(String(a.date || '')))
    } else {
      copy.sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')))
    }
    return copy
  }, [cases, applied, tab, likes])

  const shown = list.slice(0, visible)

  const doSearch = () => {
    setApplied(q)
    setVisible(PAGE_STEP)
  }

  const clearSearch = () => {
    setQ('')
    setApplied('')
    setVisible(PAGE_STEP)
  }

  const like = async (id) => {
    if (busyId) return
    setBusyId(id)
    try {
      const r = await fetch('/api/cases/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      const j = await r.json()
      if (r.ok) {
        setLikes(prev => ({ ...prev, [id]: j.count }))
        setLikedIds(prev => {
          const next = Array.from(new Set([...prev, id]))
          try { localStorage.setItem(LS_KEY, JSON.stringify(next)) } catch {}
          return next
        })
      }
    } catch {} finally {
      setBusyId(null)
    }
  }

  const tabBtn = (key, label) =>
    `px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
      tab === key ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-800'
    }`

  return (
    <div>
      {/* 控制条：最新 / 热帖 + 搜索 */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <div className="flex rounded-xl bg-gray-100 p-1 shrink-0">
          <button onClick={() => { setTab('latest'); setVisible(PAGE_STEP) }} className={tabBtn('latest', '最新')}>🕒 最新</button>
          <button onClick={() => { setTab('hot'); setVisible(PAGE_STEP) }} className={tabBtn('hot', '热帖')}>🔥 热帖</button>
        </div>

        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={q}
            onChange={e => setQ(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); doSearch() } }}
            placeholder="搜索全部维修案例，如：屏幕、电池、不开机、进水、换电…"
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400"
          />
        </div>
        <button
          onClick={doSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors inline-flex items-center gap-1.5"
        >
          <Search size={14} /> 搜索
        </button>
        {(applied || q) && (
          <button onClick={clearSearch} className="text-sm text-gray-400 hover:text-gray-700 px-2">清除</button>
        )}
      </div>

      <p className="text-xs text-gray-400 mb-4">
        共 {list.length} 篇{applied ? `（搜索「${applied}」）` : ''} · {tab === 'hot' ? '按点赞数排序' : '按最新排序'}
      </p>

      {shown.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-3">🔍</div>
          <p className="font-medium text-gray-500">没有找到相关案例</p>
          <p className="text-sm mt-1">试试搜索：屏幕、电池、不开机、进水…</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {shown.map(c => {
            const liked = likedIds.includes(c.id)
            return (
              <div key={c.id} className="bg-gray-50 hover:bg-blue-50/60 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors px-4 py-3">
                <a href={`/cases/${c.id}`} className="block group">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5 shrink-0">🔧</span>
                    <div>
                      <div className="font-semibold text-gray-800 text-sm leading-snug group-hover:text-blue-700">{c.title}</div>
                      <div className="text-xs text-gray-400 mt-1 line-clamp-2">{c.excerpt}</div>
                    </div>
                  </div>
                </a>
                <div className="mt-2 flex items-center gap-2 text-xs text-gray-400 flex-wrap">
                  <span className="bg-white border border-gray-200 rounded-full px-2 py-0.5 text-gray-500">{c.tag}</span>
                  {c.date && <span>📅 {c.date}</span>}
                  <button
                    onClick={() => like(c.id)}
                    disabled={liked || busyId === c.id}
                    title={liked ? '已点赞' : '点赞'}
                    className={`ml-auto inline-flex items-center gap-1 rounded-full px-2.5 py-1 border transition-colors ${
                      liked
                        ? 'bg-blue-600 border-blue-600 text-white cursor-default'
                        : 'bg-white border-gray-200 text-gray-500 hover:border-blue-400 hover:text-blue-600'
                    } disabled:opacity-80`}
                  >
                    👍 {likes[c.id] || 0}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {visible < list.length && (
        <div className="text-center mt-6">
          <button
            onClick={() => setVisible(v => v + PAGE_STEP)}
            className="bg-white border border-gray-200 hover:border-blue-400 hover:text-blue-600 text-gray-600 text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
          >
            加载更多（还有 {list.length - visible} 篇）
          </button>
        </div>
      )}
    </div>
  )
}
