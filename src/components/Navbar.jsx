'use client'
import { useState, useRef, useEffect } from 'react'
import { Search as SearchIcon, X, User, LogOut, MessageSquare, Star, ChevronDown } from 'lucide-react'
import modelDB from '../data/modelDB'
import { useSite } from '../lib/SiteContext'

export default function Navbar() {
  const { lang, setLang, setShowContact } = useSite()
  const [query, setQuery] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [user, setUser] = useState(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const inputRef = useRef(null)
  const resultsRef = useRef(null)
  const userMenuRef = useRef(null)

  const t = (zh, en) => lang === 'zh' ? zh : en

  // 检查登录状态
  useEffect(() => {
    const token = localStorage.getItem('crazy_user_token')
    if (token) {
      fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
        .then(r => r.json())
        .then(d => { if (d.user) setUser(d.user) })
        .catch(() => localStorage.removeItem('crazy_user_token'))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('crazy_user_token')
    setUser(null)
    setShowUserMenu(false)
  }

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

  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const grouped = {}
  results.forEach(item => {
    const key = item.brand
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(item)
  })

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-12">
          {/* 左侧：Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <a href="/" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity shrink-0">
              <span className="text-lg">🔧</span>
              <span className="font-bold text-sm text-gray-900">Crazy维修</span>
            </a>
          </div>

          {/* 中间：导航链接 */}
          <div className="hidden md:flex items-center gap-2 text-xs text-gray-600">
            <a href="/#brands" className="hover:text-blue-600 whitespace-nowrap">{t('品牌', 'Brands')}</a>
            <a href="/#services" className="hover:text-blue-600 whitespace-nowrap">{t('服务', 'Services')}</a>
            
            {/* 维修品牌下拉 */}
            <div className="relative group">
              <a href="/#brands" className="hover:text-blue-600 whitespace-nowrap flex items-center gap-0.5">
                维修品牌 <ChevronDown size={10} />
              </a>
              <div className="absolute top-full left-0 mt-1 bg-white rounded-xl border border-gray-200 shadow-lg z-[60] py-1.5 min-w-[160px] hidden group-hover:block">
                <div className="px-3 py-1 text-xs font-bold text-gray-400">📱 手机</div>
                <a href="/iphone-repair" className="block px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50">iPhone 维修</a>
                <a href="/samsung-repair" className="block px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50">Samsung 维修</a>
                <a href="/huawei-repair" className="block px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50">Huawei 维修</a>
                <a href="/xiaomi-repair" className="block px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50">Xiaomi 维修</a>
                <a href="/oppo-repair" className="block px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50">OPPO 维修</a>
                <a href="/vivo-repair" className="block px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50">vivo 维修</a>
                <hr className="my-1 border-gray-50" />
                <div className="px-3 py-1 text-xs font-bold text-gray-400">💻 电脑</div>
                <a href="/macbook-repair" className="block px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50">MacBook 维修</a>
                <a href="/lenovo-repair" className="block px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50">Lenovo 维修</a>
                <a href="/dell-repair" className="block px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50">Dell 维修</a>
                <hr className="my-1 border-gray-50" />
                <a href="/#brands" className="block px-3 py-1.5 text-xs text-blue-600 hover:bg-gray-50">查看全部品牌 →</a>
              </div>
            </div>

            {/* 客户评价 */}
            <a href="/#reviews" className="hover:text-blue-600 whitespace-nowrap flex items-center gap-0.5">
              <Star size={10} /> 客户评价
            </a>

            {/* 留言板 */}
            <a href="/board" className="hover:text-blue-600 whitespace-nowrap flex items-center gap-0.5">
              <MessageSquare size={10} /> 留言板
            </a>

            <span className="text-gray-300 mx-1">|</span>
            <a href="https://www.gudaoforum.com" target="_blank" rel="noopener" className="hover:text-blue-600 whitespace-nowrap font-medium">古道维修论坛</a>
            <span className="text-gray-300 mx-1">|</span>

            {/* 搜索 */}
            <div className="relative flex items-center">
              {showSearch ? (
                <div className="flex items-center gap-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setShowResults(true) }}
                    onFocus={() => setShowResults(true)}
                    placeholder={t('搜索型号', 'Search model')}
                    className="w-36 border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-400"
                    autoFocus
                  />
                  <button onClick={() => { setShowSearch(false); setQuery(''); setShowResults(false) }}
                    className="text-gray-400 hover:text-gray-600"><X size={14} /></button>
                </div>
              ) : (
                <button onClick={() => setShowSearch(true)}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-700 whitespace-nowrap font-medium">
                  <SearchIcon size={14} /> {t('搜索', 'Search')}
                </button>
              )}
            </div>

            {/* 搜索结果 */}
            {showResults && query && results.length > 0 && (
              <div ref={resultsRef} className="absolute top-full mt-1 right-0 bg-white rounded-xl border border-gray-200 shadow-xl z-[60] max-h-80 overflow-y-auto" style={{width: '380px'}}>
                {Object.entries(grouped).map(([brand, items], gi) => (
                  <div key={gi}>
                    <div className="px-3 py-1.5 bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider sticky top-0">{brand}</div>
                    {items.map((item, i) => (
                      <a key={i} href={item.page}
                        className="flex items-center justify-between px-3 py-2 hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-0"
                        onClick={() => { setShowResults(false); setShowSearch(false) }}
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
              <div className="absolute top-full mt-1 right-0 bg-white rounded-xl border border-gray-200 shadow-xl z-[60] p-3 text-center" style={{width: '280px'}}>
                <p className="text-gray-500 text-xs">{t('没找到？加微信问我', 'Not found? DM me')}</p>
                <button onClick={() => { setShowContact(true); setShowResults(false) }} className="mt-1 bg-blue-600 text-white text-xs px-3 py-1 rounded-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
              </div>
            )}
          </div>

          {/* 右侧：操作按钮 */}
          <div className="flex items-center gap-2">
            <a href="https://www.gudaoforum.com" target="_blank" rel="noopener" className="text-xs text-gray-500 hover:text-blue-600 mr-1 md:hidden">古道维修论坛</a>
            <a href="https://v.douyin.com/NvUr5C82ZDM/" target="_blank" rel="noopener"
              className="flex items-center gap-1 bg-gradient-to-r from-[#00f2fe] to-[#fe2c55] text-white hover:opacity-90 text-xs font-bold px-2.5 py-1.5 rounded-lg transition-all shadow-sm shrink-0"
              title="浩哥维修实录 @Crazy维修 抖音">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" className="shrink-0">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.88 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.35 0 .69.06 1.01.18V8.48a6.34 6.34 0 0 0-1.01-.08C5.9 8.4 3 11.3 3 14.86c0 3.56 2.9 6.46 6.46 6.46 3.56 0 6.46-2.9 6.46-6.46V9.33a8.28 8.28 0 0 0 4.67 1.4v-3.4a4.84 4.84 0 0 1-1-.64z"/>
              </svg>
              <span className="hidden sm:inline">浩哥维修实录 → 抖音</span>
            </a>

            {/* 手机端搜索 */}
            <button onClick={() => setShowSearch(!showSearch)} className="md:hidden text-gray-500 hover:text-gray-700">
              <SearchIcon size={16} />
            </button>

            {/* 语言切换 */}
            <button onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
              className="text-xs px-2 py-1 rounded border border-gray-300 text-gray-500 hover:text-gray-800"
            >{lang === 'zh' ? 'EN' : '中文'}</button>

            {/* 用户菜单（已登录） */}
            {user && (
              <div className="relative" ref={userMenuRef}>
                <button onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 px-2 py-1 rounded-lg transition-colors">
                  <User size={12} />
                  <span className="max-w-[60px] truncate">{user.username}</span>
                  <ChevronDown size={10} />
                </button>
                {showUserMenu && (
                  <div className="absolute top-full right-0 mt-1 bg-white rounded-xl border border-gray-200 shadow-lg z-[60] py-1 min-w-[120px]">
                    <a href="/profile" className="block px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-1.5">
                      <User size={12} /> 个人中心
                    </a>
                    <a href="/board" className="block px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-1.5">
                      <MessageSquare size={12} /> 留言板
                    </a>
                    {user.is_admin && (
                      <a href="/admin" className="block px-3 py-2 text-xs text-amber-600 hover:bg-gray-50 flex items-center gap-1.5">
                        <Star size={12} /> 管理后台
                      </a>
                    )}
                    <hr className="my-1 border-gray-100" />
                    <button onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-xs text-red-500 hover:bg-gray-50 flex items-center gap-1.5">
                      <LogOut size={12} /> 退出登录
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* 登录按钮（未登录） */}
            {!user && (
              <a href="/login"
                className="text-xs border border-blue-300 text-blue-600 hover:bg-blue-50 font-medium px-3 py-1.5 rounded-lg transition-colors">
                登录
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
