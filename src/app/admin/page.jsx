'use client'
import { useState, useEffect, useCallback } from 'react'
import { Trash2, Download, Search, LogOut, Star, ArrowLeft } from 'lucide-react'

export default function AdminPage() {
  const [token, setToken] = useState('')
  const [reviews, setReviews] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)
  const [error, setError] = useState('')
  const [exporting, setExporting] = useState(false)

  const pageSize = 20

  useEffect(() => {
    const t = localStorage.getItem('crazy_admin_token')
    if (!t) {
      window.location.href = '/'
      return
    }
    setToken(t)
  }, [])

  const loadReviews = useCallback(async () => {
    if (!token) return
    setLoading(true)
    setError('')
    try {
      const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) })
      if (search) params.set('search', search)
      const res = await fetch(`/api/reviews/admin/list?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.status === 401) {
        localStorage.removeItem('crazy_admin_token')
        window.location.href = '/'
        return
      }
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setReviews(data.reviews)
      setTotal(data.total)
      setTotalPages(data.totalPages)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [token, page, search])

  useEffect(() => { loadReviews() }, [loadReviews, token])

  // 删除
  const handleDelete = async (id) => {
    if (!confirm('确定要删除这条评价吗？')) return
    setDeleting(id)
    try {
      const res = await fetch('/api/reviews/admin/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setReviews(prev => prev.filter(r => r.id !== id))
      setTotal(prev => prev - 1)
    } catch (err) {
      alert('删除失败: ' + err.message)
    } finally {
      setDeleting(null)
    }
  }

  // 导出
  const handleExport = async () => {
    setExporting(true)
    try {
      const res = await fetch('/api/reviews/admin/export', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error('导出失败')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `客户评价_${new Date().toISOString().slice(0, 10)}.csv`
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      alert(err.message)
    } finally {
      setExporting(false)
    }
  }

  // 退出
  const handleLogout = () => {
    localStorage.removeItem('crazy_admin_token')
    window.location.href = '/'
  }

  if (!token) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="text-gray-400 hover:text-blue-600 transition-colors">
              <ArrowLeft size={20} />
            </a>
            <h1 className="font-bold text-gray-900">客户评价管理</h1>
            <span className="text-sm text-gray-400">共 {total} 条</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExport}
              disabled={exporting || total === 0}
              className="flex items-center gap-1.5 text-sm bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-xl transition-colors"
            >
              <Download size={16} />
              {exporting ? '导出中...' : '导出CSV'}
            </button>
            <button onClick={handleLogout} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-600 px-3 py-2 rounded-xl transition-colors">
              <LogOut size={16} />
              退出
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {/* 搜索 */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-4">
          <form onSubmit={e => { e.preventDefault(); setSearch(searchInput); setPage(1); }} className="flex gap-3">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                placeholder="搜索用户名、手机号、标题..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm transition-colors">搜索</button>
            {search && (
              <button onClick={() => { setSearch(''); setSearchInput(''); setPage(1); }} className="text-gray-400 hover:text-gray-600 text-sm px-3 py-2.5">清除</button>
            )}
          </form>
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">{error}</div>
        )}

        {/* 评价列表 */}
        {loading ? (
          <div className="space-y-3">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="bg-white rounded-xl p-5 border border-gray-100 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />
                <div className="h-3 bg-gray-200 rounded w-2/3 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/4" />
              </div>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-400 text-lg mb-2">暂无评价</p>
            <p className="text-gray-400 text-sm">还没有客户提交评价</p>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {reviews.map(r => (
                <div key={r.id} className="bg-white rounded-xl p-4 sm:p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      {/* 标题 + 评分 */}
                      <div className="flex items-center gap-2 mb-1.5">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{r.title}</h3>
                        <div className="flex text-amber-400 shrink-0">
                          {[1,2,3,4,5].map(s => (
                            <Star key={s} size={13} fill={s <= r.rating ? 'currentColor' : 'none'} className={s <= r.rating ? 'text-amber-400' : 'text-gray-200'} />
                          ))}
                        </div>
                      </div>
                      {/* 内容 */}
                      <p className="text-gray-600 text-sm leading-relaxed mb-2 line-clamp-2">&ldquo;{r.content}&rdquo;</p>
                      {/* 用户信息 */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400">
                        <span className="font-medium text-gray-500">{r.name}</span>
                        <span className="font-mono">{r.phone}</span>
                        {r.images?.length > 0 && (
                          <span className="text-blue-500">{r.images.length}张图片</span>
                        )}
                        <span>{new Date(r.created_at).toLocaleString('zh-CN')}</span>
                      </div>
                      {/* 图片预览 */}
                      {r.images?.length > 0 && (
                        <div className="flex gap-2 mt-2">
                          {r.images.map((img, i) => (
                            <a key={i} href={img} target="_blank" rel="noopener noreferrer">
                              <img src={img} alt="" className="w-12 h-12 rounded-lg object-cover border border-gray-100 hover:opacity-80 transition-opacity" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* 删除按钮 */}
                    <button
                      onClick={() => handleDelete(r.id)}
                      disabled={deleting === r.id}
                      className="shrink-0 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      title="删除"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* 分页 */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="px-4 py-2 text-sm border border-gray-200 rounded-xl disabled:opacity-50 hover:bg-gray-50 transition-colors"
                >
                  上一页
                </button>
                <span className="text-sm text-gray-500 px-3">
                  {page} / {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="px-4 py-2 text-sm border border-gray-200 rounded-xl disabled:opacity-50 hover:bg-gray-50 transition-colors"
                >
                  下一页
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
