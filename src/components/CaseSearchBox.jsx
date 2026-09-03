'use client'
import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'

/**
 * 分类内搜索框：按标题/摘要过滤文章列表
 */
export default function CaseSearchBox({ articles }) {
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    const kw = q.trim().toLowerCase()
    if (!kw) return articles
    return articles.filter(a =>
      (a.title || '').toLowerCase().includes(kw) ||
      (a.excerpt || '').toLowerCase().includes(kw)
    )
  }, [q, articles])

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={q}
            onChange={e => setQ(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') e.preventDefault() }}
            placeholder="搜索本类维修案例，如：屏幕、电池、不开机、进水…"
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400"
          />
        </div>
        <button
          onClick={() => { /* 输入即实时过滤，按钮保留交互反馈 */ }}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors flex items-center gap-1.5"
        >
          <Search size={14} /> 搜索
        </button>
      </div>

      {q.trim() ? (
        <p className="text-xs text-gray-400 mb-3">
          找到 {filtered.length} 篇与「{q.trim()}」相关的案例
          {filtered.length === 0 && '，换个关键词试试'}
        </p>
      ) : null}

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-3">🔍</div>
          <p className="font-medium text-gray-500">没有找到相关案例</p>
          <p className="text-sm mt-1">试试搜索：屏幕、电池、不开机、进水、清灰…</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {filtered.map(c => (
            <a key={c.id} href={`/cases/${c.id}`} className="group bg-gray-50 hover:bg-blue-50/60 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors px-4 py-3 flex items-start gap-2">
              <span className="text-blue-600 mt-0.5 shrink-0">🔧</span>
              <div>
                <div className="font-semibold text-gray-800 text-sm leading-snug group-hover:text-blue-700">{c.title}</div>
                <div className="text-xs text-gray-400 mt-1 line-clamp-2">{c.excerpt}</div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
