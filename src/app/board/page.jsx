'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { MessageSquare, Pin, ArrowLeft, Send, ImagePlus, X, User, Shield, ChevronDown, ChevronUp, Search } from 'lucide-react'
import UserProfileModal from '@/components/UserProfileModal'

export default function BoardPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [pinned, setPinned] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)

  // 发帖
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [images, setImages] = useState([])
  const [captcha, setCaptcha] = useState({ id: '', code: '', input: '' })
  const [posting, setPosting] = useState(false)
  const [error, setError] = useState('')

  // 展开回复
  const [expandedReplies, setExpandedReplies] = useState({})
  const [profileUserId, setProfileUserId] = useState(null)

  // 回复表单
  const [replyTo, setReplyTo] = useState(null) // msg id
  const [replyContent, setReplyContent] = useState('')
  const [replyImages, setReplyImages] = useState([])
  const [replyCaptcha, setReplyCaptcha] = useState({ id: '', code: '', input: '' })
  const [replySubmitting, setReplySubmitting] = useState(false)
  const [replyError, setReplyError] = useState('')

  const fetchReplyCaptcha = useCallback(async () => {
    try {
      const res = await fetch('/api/reviews/captcha')
      const data = await res.json()
      setReplyCaptcha({ id: data.captchaId, code: data.code, input: '' })
    } catch { /* ignore */ }
  }, [])

  const handleReply = async () => {
    if (!user) { router.push('/login'); return }
    if (!replyContent.trim()) return
    setReplyError('')
    setReplySubmitting(true)

    try {
      const token = localStorage.getItem('crazy_user_token')
      const res = await fetch('/api/messages/reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: replyContent.trim(),
          images: replyImages,
          targetType: 'message',
          targetId: replyTo,
          captchaId: replyCaptcha.id,
          captchaValue: replyCaptcha.input,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || '回复失败')

      setReplyContent('')
      setReplyImages([])
      setReplyTo(null)
      fetchReplyCaptcha()
      loadMessages()
    } catch (err) {
      setReplyError(err.message)
      fetchReplyCaptcha()
    } finally {
      setReplySubmitting(false)
    }
  }

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

  // 图片上传（base64转url）
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files)
    const remaining = 3 - images.length
    if (remaining <= 0) return alert('最多3张图片')

    const batch = files.slice(0, remaining)
    for (const file of batch) {
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} 超过5MB`)
        continue
      }
      const reader = new FileReader()
      reader.onload = (ev) => {
        setImages(prev => [...prev, ev.target.result])
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = (idx) => {
    setImages(prev => prev.filter((_, i) => i !== idx))
  }

  const handlePost = async (e) => {
    e.preventDefault()
    if (!user) { router.push('/login'); return }
    setError('')
    setPosting(true)

    try {
      const token = localStorage.getItem('crazy_user_token')
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          images,
          captchaId: captcha.id,
          captchaValue: captcha.input,
        }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error)
        fetchCaptcha()
        return
      }

      // 重置
      setTitle('')
      setContent('')
      setImages([])
      setShowForm(false)
      fetchCaptcha()
      loadMessages()
    } catch {
      setError('发表失败')
      fetchCaptcha()
    } finally {
      setPosting(false)
    }
  }

  const toggleReplies = (msgId) => {
    setExpandedReplies(prev => ({ ...prev, [msgId]: !prev[msgId] }))
  }

  const formatDate = (d) => {
    const date = new Date(d)
    const now = new Date()
    const diff = now - date
    if (diff < 60000) return '刚刚'
    if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
  }

  const renderMessage = (msg, isPinned) => (
    <div key={msg.id} className={`bg-white rounded-2xl border ${isPinned ? 'border-amber-200 bg-amber-50/30' : 'border-gray-100'} shadow-sm p-4 sm:p-5`}>
      {/* 头部 */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
          {msg.user?.is_admin ? <Shield size={16} className="text-amber-600" /> : <User size={16} className="text-blue-600" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-medium text-sm text-gray-900 truncate">
              {msg.user?.username || '未知用户'}
              {user?.is_admin && msg.user?.id && (
                <button onClick={() => setProfileUserId(msg.user.id)}
                  className="ml-1 text-blue-500 hover:text-blue-700 inline-flex items-center"
                  title="查看用户资料">
                  <Search size={11} />
                </button>
              )}
            </span>
            {msg.user?.is_admin && <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">管理员</span>}
          </div>
          <div className="text-xs text-gray-400">{formatDate(msg.created_at)}</div>
        </div>
        {isPinned && (
          <span className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">
            <Pin size={12} /> 置顶
          </span>
        )}
        {msg.is_admin_reply && !isPinned && (
          <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-lg">官方回复</span>
        )}
      </div>

      {/* 标题 */}
      {msg.title && <h4 className="font-bold text-gray-900 text-sm mb-1">{msg.title}</h4>}

      {/* 内容 */}
      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{msg.content}</p>

      {/* 图片 - 最大宽度不超过页面1/2 */}
      {msg.images && msg.images.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {msg.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt=""
              className="rounded-xl object-cover border border-gray-100 cursor-pointer hover:opacity-90 transition-opacity"
              style={{ maxWidth: '50%', maxHeight: '200px' }}
              onClick={() => window.open(img, '_blank')}
            />
          ))}
        </div>
      )}

      {/* 操作行 */}
      <div className="flex items-center gap-2 mt-3">
        {/* 回复数 */}
        {msg.replies && msg.replies.length > 0 && (
          <button onClick={() => toggleReplies(msg.id)}
            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700">
            {expandedReplies[msg.id] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {msg.replies.length} 条回复
          </button>
        )}
        {/* 回复按钮 */}
        {user ? (
          <button onClick={() => {
            setReplyTo(replyTo === msg.id ? null : msg.id)
            if (replyTo !== msg.id) fetchReplyCaptcha()
          }}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600">
            <Send size={12} /> 回复
          </button>
        ) : (
          <button onClick={() => router.push('/login')}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-blue-600">
            <Send size={12} /> 登录回复
          </button>
        )}
      </div>

      {/* 展开的回复 */}
      {expandedReplies[msg.id] && msg.replies && msg.replies.length > 0 && (
        <div className="mt-3 ml-4 pl-3 border-l-2 border-blue-100 space-y-3">
          {[...msg.replies].sort((a, b) => (b.is_pinned ? 1 : 0) - (a.is_pinned ? 1 : 0)).map(reply => (
            <div key={reply.id} className={`p-3 rounded-xl ${reply.is_admin_reply ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="font-medium text-xs text-gray-800">{reply.user?.username}</span>
                {reply.is_pinned && <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">置顶</span>}
                {reply.is_admin_reply && !reply.is_pinned && <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">官方</span>}
                <span className="text-xs text-gray-400">{formatDate(reply.created_at)}</span>
              </div>
              <p className="text-sm text-gray-600">{reply.content}</p>
              {reply.images && reply.images.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {reply.images.map((img, i) => (
                    <img key={i} src={img} alt=""
                      className="rounded-lg object-cover border border-gray-100 cursor-pointer"
                      style={{ maxWidth: '40%', maxHeight: '150px' }}
                      onClick={() => window.open(img, '_blank')} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 回复表单 */}
      {replyTo === msg.id && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          {replyError && <div className="bg-red-50 text-red-600 text-sm p-2 rounded-xl mb-2">{replyError}</div>}
          <textarea value={replyContent} onChange={e => setReplyContent(e.target.value)}
            placeholder="写下你的回复..." rows={2} required
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none mb-2" />
          {/* 图片 */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {replyImages.map((img, i) => (
              <div key={i} className="relative">
                <img src={img} alt="" className="w-14 h-14 rounded-lg object-cover border border-gray-200" />
                <button type="button" onClick={() => setReplyImages(prev => prev.filter((_, j) => j !== i))}
                  className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5">
                  <X size={12} />
                </button>
              </div>
            ))}
            {replyImages.length < 3 && (
              <label className="w-14 h-14 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-blue-400">
                <ImagePlus size={18} className="text-gray-400" />
                <input type="file" accept="image/*" className="hidden" onChange={e => {
                  const files = Array.from(e.target.files || [])
                  if (replyImages.length + files.length > 3) return
                  for (const f of files) {
                    if (f.size > 5*1024*1024) continue
                    const reader = new FileReader()
                    reader.onload = (ev) => setReplyImages(prev => [...prev, ev.target.result])
                    reader.readAsDataURL(f)
                  }
                }} />
              </label>
            )}
          </div>
          {/* 验证码 */}
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-gray-100 px-3 py-1.5 rounded-xl font-mono text-base tracking-widest text-gray-800 select-none">
              {replyCaptcha.code || '····'}
            </div>
            <input type="text" value={replyCaptcha.input} onChange={e => setReplyCaptcha(prev => ({ ...prev, input: e.target.value }))}
              placeholder="验证码" maxLength={4}
              className="w-20 border border-gray-300 rounded-xl px-2 py-1.5 text-xs text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button type="button" onClick={fetchReplyCaptcha} className="text-xs text-blue-600 hover:text-blue-700">换一张</button>
          </div>
          <div className="flex gap-2">
            <button onClick={handleReply} disabled={replySubmitting}
              className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors">
              <Send size={12} /> {replySubmitting ? '发送中...' : '发送回复'}
            </button>
            <button onClick={() => { setReplyTo(null); setReplyContent(''); setReplyImages([]); setReplyError('') }}
              className="text-xs text-gray-500 hover:text-gray-700 px-3 py-1.5">取消</button>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <button onClick={() => router.push('/')} className="flex items-center gap-1 text-gray-500 hover:text-gray-700 mb-2 text-sm">
              <ArrowLeft size={16} /> 返回首页
            </button>
            <h1 className="text-2xl font-bold text-gray-900">留言板</h1>
            <p className="text-sm text-gray-500">发表你的想法，参与讨论</p>
          </div>
          <button onClick={() => {
            if (!user) { router.push('/login'); return }
            setShowForm(!showForm)
          }}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1">
            <MessageSquare size={16} /> {user ? '发表留言' : '登录后发表'}
          </button>
        </div>

        {/* 发帖表单 */}
        {showForm && (
          <form onSubmit={handlePost} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 mb-6">
            {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-4">{error}</div>}

            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
              placeholder="标题（选填）" maxLength={100}
              className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />

            <textarea value={content} onChange={(e) => setContent(e.target.value)}
              placeholder="写下你想说的..." rows={4} required
              className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-3" />

            {/* 图片上传 */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {images.map((img, i) => (
                <div key={i} className="relative">
                  <img src={img} alt="" className="w-16 h-16 rounded-lg object-cover border border-gray-200" />
                  <button type="button" onClick={() => removeImage(i)}
                    className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5">
                    <X size={12} />
                  </button>
                </div>
              ))}
              {images.length < 3 && (
                <label className="w-16 h-16 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
                  <ImagePlus size={20} className="text-gray-400" />
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              )}
              <span className="text-xs text-gray-400 ml-1">{images.length}/3 张</span>
            </div>

            {/* 验证码 */}
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gray-100 px-4 py-2 rounded-xl font-mono text-lg tracking-widest text-gray-800 select-none">
                {captcha.code || '····'}
              </div>
              <input type="text" value={captcha.input} onChange={(e) => setCaptcha({ ...captcha, input: e.target.value })}
                placeholder="验证码" required maxLength={4}
                className="w-24 border border-gray-300 rounded-xl px-3 py-2 text-sm text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <button type="button" onClick={fetchCaptcha} className="text-xs text-blue-600 hover:text-blue-700">换一张</button>
            </div>

            <div className="flex gap-2">
              <button type="submit" disabled={posting}
                className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors">
                <Send size={14} /> {posting ? '发表中...' : '发表'}
              </button>
              <button type="button" onClick={() => setShowForm(false)}
                className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2.5">取消</button>
            </div>
          </form>
        )}

        {/* 置顶留言 */}
        {pinned.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-1 text-xs font-medium text-amber-600 mb-3">
              <Pin size={14} /> 置顶
            </div>
            <div className="space-y-3">
              {pinned.map(msg => renderMessage(msg, true))}
            </div>
          </div>
        )}

        {/* 留言列表 */}
        {loading ? (
          <div className="text-center py-12 text-gray-400">加载中...</div>
        ) : messages.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <MessageSquare size={40} className="mx-auto mb-3 text-gray-300" />
            <p>还没有留言，来发表第一条吧</p>
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
              className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-30 hover:bg-gray-50">
              上一页
            </button>
            <span className="px-3 py-1.5 text-sm text-gray-500">{page} / {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages}
              className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-30 hover:bg-gray-50">
              下一页
            </button>
          </div>
        )}
      </div>

      {/* 用户资料弹窗（管理员可见） */}
      {profileUserId && (
        <UserProfileModal userId={profileUserId} onClose={() => setProfileUserId(null)} />
      )}
    </div>
  )
}
