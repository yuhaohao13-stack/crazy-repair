'use client'
import { useState, useRef, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import modelDB from '../data/modelDB'

export default function Navbar({ lang, setLang, setShowContact }) {
  const [query, setQuery] = useState('')
  const [showResults, setShowResults] = useState(false)
  const inputRef = useRef(null)
  const resultsRef = useRef(null)
  const t = (zh, en) => lang === 'zh' ? zh : en

  const results = (() => {
    if (!query || query.length < 1) return []
    const q = query.toLowerCase()
    return modelDB
      .filter(item =>
        item.model.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q) ||
        item.issues.some(i => i.toLowerCase().includes(q))
      )
      .slice(0, 8)
  })()

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

  // Group by brand
  const grouped = {}
  results.forEach(item => {
    const key = item.brand
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(item)
  })

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
      {/* Search bar row */}
      <div className="bg-blue-600">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex items-center gap-2">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setShowResults(true) }}
              onFocus={() => setShowResults(true)}
              placeholder={t('搜索品牌、型号或故障…', 'Search brand, model or issue...')}
              className="w-full pl-9 pr-8 py-1.5 rounded-lg bg-blue-500 text-white placeholder-blue-200 text-sm border-0 focus:outline-none focus:ring-2 focus:ring-white/40"
            />
            {query && (
              <button onClick={() => { setQuery(''); setShowResults(false) }} className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-300 hover:text-white">
                <X size={14} />
              </button>
            )}
          </div>
          <button onClick={() => { if (query && showResults) setShowResults(false); else inputRef.current?.focus() }}
            className="bg-blue-500 hover:bg-blue-400 text-white text-xs px-3 py-1.5 rounded-lg transition-colors shrink-0"
          >{t('搜索', 'Search')}</button>
        </div>

        {/* Search results */}
        {showResults && query && results.length > 0 && (
          <div ref={resultsRef} className="absolute left-4 sm:left-auto right-4 sm:right-auto top-full mt-1 max-w-md bg-white rounded-xl border border-gray-200 shadow-xl z-[60] max-h-80 overflow-y-auto" style={{width: 'calc(100% - 32px)', maxWidth: '448px'}}>
            {Object.entries(grouped).map(([brand, items], gi) => (
              <div key={gi}>
                <div className="px-3 py-1.5 bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider sticky top-0">{brand}</div>
                {items.map((item, i) => (
                  <a key={i} href={item.page}
                    className="flex items-center justify-between px-3 py-2 hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-0"
                    onClick={() => setShowResults(false)}
                  >
                    <div>
                      <span className="font-medium text-gray-800 text-sm">{item.model}</span>
                      <div className="flex flex-wrap gap-1 mt-0.5">
                        {item.issues.slice(0, 3).map((issue, j) => (
                          <span key={j} className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{issue}</span>
                        ))}
                      </div>
                    </div>
                    <span className="text-blue-600 text-xs shrink-0 ml-2">{t('查看 →', 'Go →')}</span>
                  </a>
                ))}
              </div>
            ))}
          </div>
        )}
        {showResults && query && results.length === 0 && (
          <div className="absolute left-4 sm:left-auto right-4 sm:right-auto top-full mt-1 max-w-md bg-white rounded-xl border border-gray-200 shadow-xl z-[60] p-4 text-center">
            <p className="text-gray-500 text-xs">{t('没找到？加微信直接问我', 'Not found? DM me on WeChat')}</p>
            <button onClick={() => { setShowContact(true); setShowResults(false) }} className="mt-2 bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-blue-700">{t('📱 微信咨询', '📱 WeChat')}</button>
          </div>
        )}
      </div>

      {/* Nav links row */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-12">
          <a href="/" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity shrink-0">
            <span className="text-lg">🔧</span>
            <span className="font-bold text-sm text-gray-900">Crazy维修</span>
          </a>
          <div className="hidden md:flex items-center gap-3 text-xs text-gray-600 overflow-x-auto">
            <a href="/#brands" className="hover:text-blue-600 whitespace-nowrap">{t('品牌', 'Brands')}</a>
            <a href="/#services" className="hover:text-blue-600 whitespace-nowrap">{t('服务', 'Services')}</a>
            <a href="/#models" className="hover:text-blue-600 whitespace-nowrap">{t('型号', 'Models')}</a>
            <a href="/iphone-repair" className="hover:text-blue-600 whitespace-nowrap">iPhone</a>
            <a href="/macbook-repair" className="hover:text-blue-600 whitespace-nowrap">MacBook</a>
            <a href="/samsung-repair" className="hover:text-blue-600 whitespace-nowrap">Samsung</a>
            <a href="/xiaomi-repair" className="hover:text-blue-600 whitespace-nowrap">Xiaomi</a>
            <a href="/huawei-repair" className="hover:text-blue-600 whitespace-nowrap">Huawei</a>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
              className="text-xs px-2 py-1 rounded border border-gray-300 text-gray-500 hover:text-gray-800"
            >{lang === 'zh' ? 'EN' : '中文'}</button>
            <button onClick={() => setShowContact(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors shadow-sm"
            >{t('微信/WhatsApp', 'Contact')}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
