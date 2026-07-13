'use client'
import { useState, useEffect, useCallback } from 'react'
import { Trash2, Download, Search, LogOut, Star, ArrowLeft, Users, MessageSquare, FileText } from 'lucide-react'
import { useSite } from '../../lib/SiteContext'
import Navbar from '../../components/Navbar'
import Breadcrumb from '../../components/Breadcrumb'

export default function AdminPage() {
  const { lang } = useSite()
  const t = (zh, en) => lang === 'zh' ? zh : en
  const [token, setToken] = useState('')
  const [userToken, setUserToken] = useState('')
  const [tab, setTab] = useState('reviews')

  // Reviews state
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

  // Users state
  const [users, setUsers] = useState([])
  const [usersLoading, setUsersLoading] = useState(false)
  const [exportUsersLoading, setExportUsersLoading] = useState(false)

  // Messages state
  const [messages, setMessages] = useState([])
  const [msgPage, setMsgPage] = useState(1)
  const [msgTotalPages, setMsgTotalPages] = useState(1)
  const [messagesLoading, setMessagesLoading] = useState(false)

  const pageSize = 20

  useEffect(() => {
    const ut = localStorage.getItem('crazy_user_token')
    const at = localStorage.getItem('crazy_admin_token')

    if (at) {
      setToken(at)
      if (ut) setUserToken(ut)
      return
    }

    if (ut) {
      fetch('/api/auth/me', { headers: { Authorization: `Bearer ${ut}` } })
        .then(r => r.json())
        .then(d => {
          if (d.user && d.user.is_admin) {
            setUserToken(ut)
            const payload = JSON.stringify({
              email: 'yuhaohao13@gmail.com',
              time: Date.now(),
              sig: 'crazy_yuhaohao13@gmail.com_yhh521521',
            })
            const adminToken = btoa(payload)
            localStorage.setItem('crazy_admin_token', adminToken)
            setToken(adminToken)
          } else {
            window.location.href = '/'
          }
        })
        .catch(() => { window.location.href = '/' })
      return
    }

    window.location.href = '/'
  }, [])

  // ===== Reviews =====
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

  useEffect(() => { if (tab === 'reviews') loadReviews() }, [loadReviews, tab])

  const handleDelete = async (id) => {
    if (!confirm(t('确定要删除这条评价吗？', 'Are you sure you want to delete this review?'))) return
    setDeleting(id)
    try {
      const res = await fetch('/api/messages/admin/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id, type: 'review' }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setReviews(prev => prev.filter(r => r.id !== id))
      setTotal(prev => prev - 1)
    } catch (err) {
      alert(t('删除失败: ', 'Delete failed: ') + err.message)
    } finally {
      setDeleting(null)
    }
  }

  const handleExport = async () => {
    setExporting(true)
    try {
      const res = await fetch('/api/reviews/admin/export', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error(t('导出失败', 'Export failed'))
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

  // ===== Users =====
  const loadUsers = useCallback(async () => {
    if (!token) return
    setUsersLoading(true)
    try {
      const res = await fetch('/api/users/export', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error(t('加载用户失败', 'Failed to load users'))
      const data = await res.json()
      setUsers(data.users || [])
    } catch (err) {
      alert(err.message)
    } finally {
      setUsersLoading(false)
    }
  }, [token])

  useEffect(() => { if (tab === 'users') loadUsers() }, [loadUsers, tab])

  const handleExportUsers = () => {
    if (users.length === 0) return
    setExportUsersLoading(true)
    try {
      const headers = [t('用户名', 'Username'), t('手机号', 'Phone'), t('出生地', 'Birthplace'), t('出生年月', 'Birth Date'), t('个人简介', 'Bio'), t('爱好', 'Hobbies'), t('管理员', 'Admin'), t('注册时间', 'Registered')]
      const rows = users.map(u => [
        u.username, u.phone, u.birth_place || '', u.birth_date || '', u.bio || '', u.hobbies || '',
        u.is_admin ? (lang === 'zh' ? '是' : 'Yes') : (lang === 'zh' ? '否' : 'No'), new Date(u.created_at).toLocaleString(lang === 'zh' ? 'zh-CN' : 'en-US'),
      ])
      const csv = [headers.join(','), ...rows.map(r => r.map(c => `"${c}"`).join(','))].join('\n')
      const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `用户资料_${new Date().toISOString().slice(0, 10)}.csv`
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      alert('导出失败')
    } finally {
      setExportUsersLoading(false)
    }
  }

  // ===== Messages =====
  const loadMessages = useCallback(async () => {
    if (!token) return
    setMessagesLoading(true)
    try {
      const res = await fetch(`/api/messages?page=${msgPage}&pageSize=20`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setMessages(data.messages || [])
      setMsgTotalPages(data.totalPages || 1)
    } catch { /* ignore */ }
    setMessagesLoading(false)
  }, [token, msgPage])

  useEffect(() => { if (tab === 'messages') loadMessages() }, [loadMessages, tab])

  const handleDeleteMessage = async (id) => {
    if (!confirm(t('确定要删除这条留言吗？（包括所有回复）', 'Delete this message (including all replies)?'))) return
    try {
      const res = await fetch('/api/messages/admin/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id, type: 'message' }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setMessages(prev => prev.filter(m => m.id !== id))
    } catch (err) {
      alert(t('删除失败: ', 'Delete failed: ') + err.message)
    }
  }

  const handleTogglePin = async (id, pinned) => {
    try {
      const res = await fetch('/api/messages/admin/pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id, pinned: !pinned }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      loadMessages()
    } catch (err) {
      alert(t('操作失败: ', 'Operation failed: ') + err.message)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('crazy_admin_token')
    window.location.href = '/'
  }

  if (!token) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Breadcrumb items={[{ label: '管理后台', labelEn: 'Admin Panel' }]} />
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="text-gray-400 hover:text-blue-600 transition-colors">
              <ArrowLeft size={20} />
            </a>
            <h1 className="font-bold text-gray-900">管理后台</h1>
          </div>
          <div className="flex items-center gap-2">
            {tab === 'reviews' && (
              <button onClick={handleExport} disabled={exporting || total === 0}
                className="flex items-center gap-1.5 text-sm bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-xl transition-colors">
                <Download size={16} />{exporting ? '导出中...' : '导出评价CSV'}
              </button>
            )}
            {tab === 'users' && (
              <button onClick={handleExportUsers} disabled={exportUsersLoading || users.length === 0}
                className="flex items-center gap-1.5 text-sm bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-xl transition-colors">
                <Download size={16} />{exportUsersLoading ? '导出中...' : '导出用户CSV'}
              </button>
            )}
            <button onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-600 px-3 py-2 rounded-xl transition-colors">
              <LogOut size={16} />退出
            </button>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex gap-1">
          <button onClick={() => setTab('reviews')}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              tab === 'reviews' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}>
            <Star size={14} /> 评价管理 {total > 0 && `(${total})`}
          </button>
          <button onClick={() => setTab('users')}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              tab === 'users' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}>
            <Users size={14} /> 用户管理
          </button>
          <button onClick={() => setTab('messages')}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              tab === 'messages' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}>
            <MessageSquare size={14} /> 留言管理
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">

        {tab === 'reviews' && (
          <>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-4">
              <form onSubmit={e => { e.preventDefault(); setSearch(searchInput); setPage(1); }} className="flex gap-3">
                <div className="flex-1 relative">
                  <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" value={searchInput} onChange={e => setSearchInput(e.target.value)}
                    placeholder="搜索用户名、手机号、标题..."
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                </div>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm transition-colors">搜索</button>
                {search && <button onClick={() => { setSearch(''); setSearchInput(''); setPage(1); }} className="text-gray-400 hover:text-gray-600 text-sm px-3 py-2.5">清除</button>}
              </form>
            </div>

            {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">{error}</div>}

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
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {reviews.map(r => (
                    <div key={r.id} className="bg-white rounded-xl p-4 sm:p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{r.title}</h3>
                            <div className="flex text-amber-400 shrink-0">
                              {[1,2,3,4,5].map(s => (
                                <Star key={s} size={13} fill={s <= r.rating ? 'currentColor' : 'none'} className={s <= r.rating ? 'text-amber-400' : 'text-gray-200'} />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed mb-2 line-clamp-2">&ldquo;{r.content}&rdquo;</p>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400">
                            <span className="font-medium text-gray-500">{r.name}</span>
                            <span className="font-mono">{r.phone}</span>
                            {r.images?.length > 0 && <span className="text-blue-500">{r.images.length}张图片</span>}
                            <span>{new Date(r.created_at).toLocaleString('zh-CN')}</span>
                          </div>
                          {r.images?.length > 0 && (
                            <div className="flex gap-2 mt-2">
                              {r.images.map((img, i) => (
                                <a key={i} href={img} target="_blank" rel="noopener noreferrer">
                                  <img src={img} alt="" className="w-12 h-12 rounded-lg object-cover border border-gray-100" />
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                        <button onClick={() => handleDelete(r.id)} disabled={deleting === r.id}
                          className="shrink-0 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50" title="删除">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-6">
                    <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1}
                      className="px-4 py-2 text-sm border border-gray-200 rounded-xl disabled:opacity-50 hover:bg-gray-50">上一页</button>
                    <span className="text-sm text-gray-500 px-3">{page} / {totalPages}</span>
                    <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages}
                      className="px-4 py-2 text-sm border border-gray-200 rounded-xl disabled:opacity-50 hover:bg-gray-50">下一页</button>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {tab === 'users' && (
          <>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">共 {users.length} 个注册用户</p>
            </div>
            {usersLoading ? (
              <div className="text-center py-12 text-gray-400">加载中...</div>
            ) : users.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
                <Users size={40} className="mx-auto mb-3 text-gray-300" />
                <p className="text-gray-400 text-lg mb-2">暂无注册用户</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-left text-xs text-gray-500 uppercase tracking-wider">
                        <th className="px-4 py-3 font-medium">用户名</th>
                        <th className="px-4 py-3 font-medium">手机号</th>
                        <th className="px-4 py-3 font-medium hidden sm:table-cell">出生地</th>
                        <th className="px-4 py-3 font-medium hidden md:table-cell">出生年月</th>
                        <th className="px-4 py-3 font-medium hidden lg:table-cell">爱好</th>
                        <th className="px-4 py-3 font-medium">注册时间</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {users.map(u => (
                        <tr key={u.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium text-gray-900">
                            {u.username}
                            {u.is_admin && <span className="ml-1.5 text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">管理员</span>}
                          </td>
                          <td className="px-4 py-3 text-gray-600 font-mono">{u.phone}</td>
                          <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">{u.birth_place || '-'}</td>
                          <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{u.birth_date || '-'}</td>
                          <td className="px-4 py-3 text-gray-500 hidden lg:table-cell truncate max-w-[120px]">{u.hobbies || '-'}</td>
                          <td className="px-4 py-3 text-gray-400 text-xs">{new Date(u.created_at).toLocaleDateString('zh-CN')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        {tab === 'messages' && (
          <>
            {messagesLoading ? (
              <div className="text-center py-12 text-gray-400">加载中...</div>
            ) : messages.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
                <MessageSquare size={40} className="mx-auto mb-3 text-gray-300" />
                <p className="text-gray-400 text-lg mb-2">暂无留言</p>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map(m => (
                  <div key={m.id} className="bg-white rounded-xl p-4 sm:p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm text-gray-900">{m.user?.username || '未知'}</span>
                          {m.is_pinned && <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">置顶</span>}
                          {m.is_admin_reply && <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">官方</span>}
                          <span className="text-xs text-gray-400">{new Date(m.created_at).toLocaleString('zh-CN')}</span>
                        </div>
                        {m.title && <h4 className="font-semibold text-sm text-gray-800 mb-1">{m.title}</h4>}
                        <p className="text-sm text-gray-600 line-clamp-3">{m.content}</p>
                        {m.images?.length > 0 && (
                          <div className="flex gap-2 mt-2">
                            {m.images.map((img, i) => (
                              <img key={i} src={img} alt="" className="w-10 h-10 rounded-lg object-cover border border-gray-100" />
                            ))}
                          </div>
                        )}
                        {m.replies?.length > 0 && (
                          <p className="text-xs text-blue-500 mt-2">{m.replies.length} 条回复</p>
                        )}
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button onClick={() => handleTogglePin(m.id, m.is_pinned)}
                          className={`p-2 rounded-lg transition-colors ${m.is_pinned ? 'text-amber-500 hover:bg-amber-50' : 'text-gray-300 hover:text-amber-500 hover:bg-gray-50'}`}
                          title={m.is_pinned ? '取消置顶' : '置顶'}>
                          📌
                        </button>
                        <button onClick={() => handleDeleteMessage(m.id)}
                          className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="删除">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {msgTotalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-6">
                    <button onClick={() => setMsgPage(p => Math.max(1, p - 1))} disabled={msgPage <= 1}
                      className="px-4 py-2 text-sm border border-gray-200 rounded-xl disabled:opacity-50 hover:bg-gray-50">{t('上一页', 'Previous')}</button>
                    <span className="text-sm text-gray-500 px-3">{msgPage} / {msgTotalPages}</span>
                    <button onClick={() => setMsgPage(p => Math.min(msgTotalPages, p + 1))} disabled={msgPage >= msgTotalPages}
                      className="px-4 py-2 text-sm border border-gray-200 rounded-xl disabled:opacity-50 hover:bg-gray-50">{t('下一页', 'Next')}</button>
                  </div>
                )}
              </div>
            )}
          </>
        )}

      </div>
    </div>
  )
}
