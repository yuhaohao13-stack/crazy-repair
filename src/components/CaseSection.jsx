'use client'
import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'

/**
 * 分类区块：标题旁带搜索框，输入实时过滤本区块文章
 */
export default function CaseSection({ tag, count, articles, slug }) {
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
    <section id={tag} className="mb-12 scroll-mt-24">
      <div className="flex flex-wrap items-center gap-3 mb-1">
        <h2 className="text-2xl font-bold text-gray-900">{tag}维修案例</h2>
        <a
          href={`/cases/tag/${slug}`}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1"
        >
          查看全部 {count} 篇 →
        </a>
      </div>
      <p className="text-sm text-gray-400 mb-3">点击阅读完整维修过程</p>

      {/* 区块内搜索框 */}
      <div className="flex gap-2 mb-4 max-w-md">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder={`搜索${tag}案例，如：屏幕、电池、不开机…`}
            className="w-full pl-8 pr-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400"
          />
        </div>
        <button
          onClick={() => {}}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors flex items-center gap-1"
        >
          <Search size={13} /> 搜索
        </button>
      </div>
      {q.trim() && (
        <p className="text-xs text-gray-400 mb-3">
          找到 {filtered.length} 篇与「{q.trim()}」相关{q.trim() && filtered.length === 0 ? '，没有匹配的案例' : ''}
        </p>
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-10 text-gray-400 bg-gray-50 rounded-xl">
          <p className="text-sm">没有找到相关案例，试试其他关键词</p>
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
    </section>
  )
}
