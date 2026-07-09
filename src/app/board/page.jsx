'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '../../components/Navbar'
import Breadcrumb from '../../components/Breadcrumb'
import { MessageSquare, Pin, ArrowLeft, Send, ImagePlus, X, User, Shield, Search } from 'lucide-react'
import UserProfileModal from '@/components/UserProfileModal'
import { useSite } from '../../lib/SiteContext'

export default function BoardPage() {
  const router = useRouter()
  const { lang } = useSite()
  const t = (zh, en) => lang === 'zh' ? zh : en
  const [user, setUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [pinned, setPinned] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [profileUserId, setProfileUserId] = useState(null)

  // 发帖
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [images, setImages] = useState([])
  const [captcha, setCaptcha] = useState({ id: '', code: '', input: '' })
  const [posting, setPosting] = useState(false)
  const [error, setError] = useState('')

  // 获取当前用户
  useEffect(() => {
    const token = localStorage.getItem('crazy_user_token')
    if (token) {
      fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
        .then(r => r.json())
        .then(d => { if (d.user) setUser(d.user) })
        .catch(() => {})
    }
  }, [])

  const fetchCaptcha = useCallback(async () => {
    try {
      const res = await fetch('/api/reviews/captcha')
      const data = await res.json()
      setCaptcha({ id: data.captchaId, code: data.code, input: '' })
    } catch { /* ignore */ }
  }, [])

  useEffect(() => { fetchCaptcha() }, [fetchCaptcha])

  const loadMessages = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/messages?page=${page}&pageSize=20`)
      const data = await res.json()
      if (data.messages) setMessages(data.messages)
      if (data.pinned) setPinned(data.pinned)
      if (data.totalPages) setTotalPages(data.totalPages)
    } catch { /* ignore */ }
    setLoading(false)
  }, [page])

  useEffect(() => { loadMessages() }, [loadMessages])

  // 图片上传
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const remaining = 3 - images.length
    if (remaining <= 0) return
    const batch = files.slice(0, remaining)
    for (const file of batch) {
      if (file.size > 5 * 1024 * 1024) continue
      const reader = new FileReader()
      reader.onload = (ev) => setImages(prev => [...prev, ev.target.result])
      reader.readAsDataURL(file)
    }
  }

  const removeImage = (idx) => setImages(prev => prev.filter((_, i) => i !== idx))

  const handlePost = async (e) => {
    e.preventDefault()
    setError('')
    setPosting(true)
    try {
      const token = localStorage.getItem('crazy_user_token')
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          title: title.trim(), content: content.trim(), images,
          captchaId: captcha.id, captchaValue: captcha.input,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error); fetchCaptcha(); return }
      setTitle(''); setContent(''); setImages([]); setShowForm(false)
      fetchCaptcha(); loadMessages()
    } catch { setError(t('发表失败', 'Post failed')); fetchCaptcha() }
    finally { setPosting(false) }
  }

  const formatDate = (d) => {
    const date = new Date(d)
    const now = new Date()
    const diff = now - date
    if (diff < 60000) return t('刚刚', 'Just now')
    if (diff < 3600000) return lang === 'zh' ? `${Math.floor(diff / 60000)}分钟前` : `${Math.floor(diff / 60000)}m ago`
    if (diff < 86400000) return lang === 'zh' ? `${Math.floor(diff / 3600000)}小时前` : `${Math.floor(diff / 3600000)}h ago`
    return date.toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', { month: 'short', day: 'numeric' })
  }

  const renderMessage = (msg, isPinned) => (
    <div key={msg.id} onClick={() => router.push(`/board/${msg.id}`)}
      className={`bg-white rounded-2xl border cursor-pointer ${isPinned ? 'border-amber-200 bg-amber-50/30' : 'border-gray-100'} shadow-sm p-4 sm:p-5`}>
      {/* 头部 */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
          {msg.user?.is_admin ? <Shield size={16} className="text-amber-600" /> : <User size={16} className="text-blue-600" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            {user?.is_admin && msg.user?.id ? (
              <button onClick={e => { e.stopPropagation(); setProfileUserId(msg.user.id) }}
                className="font-medium text-sm text-blue-600 hover:text-blue-800 truncate" title="查看用户资料">
                {msg.user.username}
              </button>
            ) : (
              <span className="font-medium text-sm text-gray-900 truncate">{msg.user?.username || t('未知用户', 'Unknown user')}</span>
            )}
            {msg.user?.is_admin && <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">{t('管理员', 'Admin')}</span>}
          </div>
          <div className="text-xs text-gray-400">{formatDate(msg.created_at)}</div>
        </div>
        {isPinned && (
          <span className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">
            <Pin size={12} /> {t('置顶', 'Pinned')}
          </span>
        )}
      </div>

      {/* 标题 */}
      {msg.title && <h4 className="font-bold text-gray-900 text-sm mb-1">{msg.title}</h4>}

      {/* 内容 */}
      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{msg.content}</p>

      {/* 图片：有URL图展示缩略图，只有base64旧图展示图标标记 */}
      {msg.imageCount > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {msg.images.map((img, i) => (
            <img key={i} src={img} alt=""
              className="rounded-xl object-cover border border-gray-100 cursor-pointer hover:opacity-90 transition-opacity"
              style={{ maxWidth: '50%', maxHeight: '200px' }}
              onClick={e => { e.stopPropagation(); window.open(img, '_blank') }} loading="lazy" />
          ))}
          {/* 有base64旧图但没URL → 显示图图标 */}
          {msg.images.length < msg.imageCount && (
            <div className="flex items-center gap-1 text-xs text-gray-400 bg-gray-50 rounded-xl px-3 py-2 border border-gray-100">
              🖼️ {msg.imageCount}张图
            </div>
          )}
        </div>
      )}

      {/* 回复预览（最多2条） */}
      {msg.replies && msg.replies.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
          {msg.replies.map(reply => (
            <div key={reply.id} className={`p-2.5 rounded-xl ${reply.is_admin_reply ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-1 mb-0.5">
                <span className="font-medium text-xs text-gray-700">{reply.user?.username}</span>
                {reply.is_pinned && <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">{t('置顶', 'Pinned')}</span>}
                {reply.is_admin_reply && !reply.is_pinned && <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">官方</span>}
              </div>
              <p className="text-xs text-gray-600 line-clamp-2">{reply.content}</p>
            </div>
          ))}
        </div>
      )}

      {/* 操作行 */}
      <div className="flex items-center gap-3 mt-3 pt-2 border-t border-gray-50">
        {/* 查看全部回复 */}
        {(msg.replyCount || 0) > 2 ? (
          <button onClick={e => { e.stopPropagation(); router.push(`/board/${msg.id}`) }}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium">
            {t(`查看全部 ${msg.replyCount} 条回复 →`, `View all ${msg.replyCount} replies →`)}
          </button>
        ) : msg.replies?.length > 0 ? (
          <button onClick={e => { e.stopPropagation(); router.push(`/board/${msg.id}`) }}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium">
            {t('查看回复详情 →', 'View reply details →')}
          </button>
        ) : null}

        {/* 回复按钮 */}
        <button onClick={e => { e.stopPropagation(); router.push(`/board/${msg.id}`) }}
          className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600">
          <Send size={12} /> {t('回复', 'Reply')}
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Breadcrumb items={[{ label: '维修求助', labelEn: 'Repair Help' }]} />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t('维修求助', 'Repair Help')}</h1>
            <p className="text-sm text-gray-500">{t('免费咨询，在线支招——威海本地维修，随时来问', 'Free advice, online help — Weihai local repair, ask anytime')}</p>
          </div>
          <button onClick={() => {
            if (!user) { router.push('/login'); return }
            setShowForm(!showForm)
            if (!showForm && !captcha.id) fetchCaptcha()
          }}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1">
            <MessageSquare size={16} /> {user ? t('发布求助', 'Post Request') : t('登录后求助', 'Login to Ask')}
          </button>
        </div>

        {/* 发帖表单 */}
        {showForm && (
          <form onSubmit={handlePost} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 mb-6">
            {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-4">{error}</div>}
            <input type="text" value={title} onChange={e => setTitle(e.target.value)}
              placeholder={t('标题（选填）', 'Title (optional)')} maxLength={100}
              className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <textarea value={content} onChange={e => setContent(e.target.value)}
              placeholder={t('写下你想说的...', "Write what's on your mind...")} rows={4} required
              className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-3" />
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {images.map((img, i) => (
                <div key={i} className="relative">
                  <img src={img} alt="" className="w-16 h-16 rounded-lg object-cover border border-gray-200" />
                  <button type="button" onClick={() => removeImage(i)}
                    className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5"><X size={12} /></button>
                </div>
              ))}
              {images.length < 3 && (
                <label className="w-16 h-16 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
                  <ImagePlus size={20} className="text-gray-400" />
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              )}
              <span className="text-xs text-gray-400 ml-1">{t(`${images.length}/3 张`, `${images.length}/3 images`)}</span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gray-100 px-4 py-2 rounded-xl font-mono text-lg tracking-widest text-gray-800 select-none">
                {captcha.code || '····'}
              </div>
              <input type="text" value={captcha.input} onChange={e => setCaptcha({ ...captcha, input: e.target.value })}
                placeholder={t('验证码', 'Captcha')} required maxLength={4}
                className="w-24 border border-gray-300 rounded-xl px-3 py-2 text-sm text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <button type="button" onClick={fetchCaptcha} className="text-xs text-blue-600 hover:text-blue-700">{t('换一张', 'Refresh')}</button>
            </div>
            <div className="flex gap-2">
              <button type="submit" disabled={posting}
                className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors">
                <Send size={14} /> {posting ? t('发表中...', 'Posting...') : t('发表', 'Post')}
              </button>
              <button type="button" onClick={() => setShowForm(false)}
                className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2.5">{t('取消', 'Cancel')}</button>
            </div>
          </form>
        )}

        {/* 置顶留言 */}
        {pinned.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-1 text-xs font-medium text-amber-600 mb-3">
              <Pin size={14} /> {t('置顶', 'Pinned')}
            </div>
            <div className="space-y-3">
              {pinned.map(msg => renderMessage(msg, true))}
            </div>
          </div>
        )}

        {/* 留言列表 */}
        {loading ? (
          <div className="text-center py-12 text-gray-400">{t('加载中...', 'Loading...')}</div>
        ) : messages.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <MessageSquare size={40} className="mx-auto mb-3 text-gray-300" />
            <p>{t('还没有求助，来发布第一条吧', 'No requests yet. Be the first to ask!')}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map(msg => renderMessage(msg, false))}
          </div>
        )}

        {/* 分页 */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1}
              className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-30 hover:bg-gray-50">{t('上一页', 'Previous')}</button>
            <span className="px-3 py-1.5 text-sm text-gray-500">{page} / {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages}
              className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-30 hover:bg-gray-50">{t('下一页', 'Next')}</button>
          </div>
        )}
      </div>

      {profileUserId && (
        <UserProfileModal userId={profileUserId} onClose={() => setProfileUserId(null)} />
      )}
    </div>
  )
}
