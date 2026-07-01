'use client'
import { useState, useMemo, useRef, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import modelDB from '../data/modelDB'

export default function ModelSearch({ lang, setShowContact }) {
  const [query, setQuery] = useState('')
  const [showResults, setShowResults] = useState(false)
  const inputRef = useRef(null)
  const resultsRef = useRef(null)
  const t = (zh, en) => lang === 'zh' ? zh : en

  // Filter results
  const results = useMemo(() => {
    if (!query || query.length < 1) return []
    const q = query.toLowerCase()
    return modelDB
      .filter(item =>
        item.model.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q) ||
        item.issues.some(i => i.toLowerCase().includes(q))
      )
      .slice(0, 12)
  }, [query])

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (resultsRef.current && !resultsRef.current.contains(e.target) &&
          inputRef.current && !inputRef.current.contains(e.target)) {
        setShowResults(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Group results by brand
  const grouped = useMemo(() => {
    const groups = {}
    results.forEach(item => {
      const key = item.brand
      if (!groups[key]) groups[key] = []
      groups[key].push(item)
    })
    return groups
  }, [results])

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setShowResults(true) }}
          onFocus={() => setShowResults(true)}
          placeholder={t('搜索品牌、型号或故障…例如：iPhone 15、Samsung S24、换屏、进水', 'Search brand, model or issue… e.g. iPhone 15, Samsung S24, screen repair, water damage')}
          className="w-full pl-11 pr-10 py-3.5 rounded-2xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-800 placeholder-gray-400"
        />
        {query && (
          <button onClick={() => { setQuery(''); setShowResults(false) }} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <X size={16} />
          </button>
        )}
      </div>

      {/* Results dropdown */}
      {showResults && query && results.length > 0 && (
        <div ref={resultsRef} className="absolute top-full mt-2 left-0 right-0 bg-white rounded-2xl border border-gray-200 shadow-xl z-[60] max-h-96 overflow-y-auto">
          {Object.entries(grouped).map(([brand, items]) => (
            <div key={brand}>
              <div className="px-4 py-2 bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider sticky top-0">{brand}</div>
              {items.map((item, i) => (
                <a
                  key={i}
                  href={item.page}
                  className="flex items-center justify-between px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-0"
                  onClick={() => setShowResults(false)}
                >
                  <div>
                    <span className="font-medium text-gray-900 text-sm">{item.model}</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.issues.map((issue, j) => (
                        <span key={j} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{issue}</span>
                      ))}
                    </div>
                  </div>
                  <span className="text-blue-600 text-xs shrink-0 ml-2">{t('查看维修 →', 'Repair →')}</span>
                </a>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* No results */}
      {showResults && query && results.length === 0 && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-2xl border border-gray-200 shadow-xl z-[60] p-6 text-center">
          <p className="text-gray-500 text-sm">{t('没找到这个型号？加微信直接问我，没列出来不代表不能修 😊', 'Model not found? DM me on WeChat — not listed does not mean we cannot fix it 😊')}</p>
          <button onClick={() => { setShowContact(true); setShowResults(false) }} className="mt-3 bg-blue-600 text-white text-sm px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors">
            {t('📱 微信咨询', '📱 WeChat咨询')}
          </button>
        </div>
      )}
    </div>
  )
}
