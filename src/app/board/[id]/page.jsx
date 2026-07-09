'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Send, ImagePlus, X, User, Shield, Pin, MessageSquare, Sparkles } from 'lucide-react'
import UserProfileModal from '@/components/UserProfileModal'
import Navbar from '../../../components/Navbar'
import Breadcrumb from '../../../components/Breadcrumb'
import { useSite } from '../../../lib/SiteContext'

export default function MessageDetailPage() {
  const { lang } = useSite()
  const t = (zh, en) => lang === 'zh' ? zh : en
  const router = useRouter()
  const params = useParams()
  const messageId = params.id

  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [replies, setReplies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [profileUserId, setProfileUserId] = useState(null)

  // 回复表单
  const [replyContent, setReplyContent] = useState('')
  const [replyImages, setReplyImages] = useState([])
  const [captcha, setCaptcha] = useState({ id: '', code: '', input: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('crazy_user_token')
    if (token) {
      fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
        .then(r => r.json()).then(d => { if (d.user) setUser(d.user) })
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

  const loadMessage = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/messages?messageId=${messageId}`)
      const data = await res.json()
      if (data.error) { setError(data.error); return }
      setMessage(data.message)
      setReplies(data.replies || [])
    } catch { setError(t('加载失败', 'Failed to load')) }
    setLoading(false)
  }, [messageId])

  useEffect(() => { loadMessage(); fetchCaptcha() }, [loadMessage, fetchCaptcha])

  const handleReply = async (e) => {
    e.preventDefault()
    if (!replyContent.trim()) return
    if (!user) { router.push('/login'); return }
    setSubmitting(true)
    try {
      const token = localStorage.getItem('crazy_user_token')
      const res = await fetch('/api/messages/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          content: replyContent.trim(), images: replyImages,
          targetType: 'message', targetId: parseInt(messageId),
          captchaId: captcha.id, captchaValue: captcha.input,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || t('回复失败', 'Reply failed'))
      setReplyContent(''); setReplyImages([])
      fetchCaptcha(); loadMessage()
    } catch (err) { setError(err.message); fetchCaptcha() }
    finally { setSubmitting(false) }
  }

  const formatDate = (d) => {
    const date = new Date(d)
    const now = new Date()
    const diff = now - date
    if (diff < 60000) return t('刚刚', 'Just now')
    if (diff < 3600000) return `${Math.floor(diff / 60000)}${t('分钟前', 'm ago')}`
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}${t('小时前', 'h ago')}`
    return date.toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', { month: 'short', day: 'numeric' })
  }

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-gray-400">{t('加载中...', 'Loading...')}</div></div>
  }

  if (error || !message) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">{error || t('留言不存在', 'Message not found')}</p>
          <button onClick={() => router.push('/board')} className="text-blue-600 text-sm">{t('← 返回维修求助', '← Back')}</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Breadcrumb items={[
        { label: '维修求助', labelEn: 'Repair Help', href: '/board' },
        { label: '求助详情', labelEn: 'Request Detail' }
      ]} />
      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* 留言主体 */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              {message.user?.is_admin ? <Shield size={20} className="text-amber-600" /> : <User size={20} className="text-blue-600" />}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                {user?.is_admin && message.user?.id ? (
                  <button onClick={() => setProfileUserId(message.user.id)}
                    className="font-semibold text-sm text-blue-600 hover:text-blue-800">{message.user.username}</button>
                ) : (
                  <span className="font-semibold text-sm text-gray-900">{message.user?.username || t('未知用户', 'Unknown')}</span>
                )}
                {message.user?.is_admin && <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">{t('管理员', 'Admin')}</span>}
              </div>
              <div className="text-xs text-gray-400">{formatDate(message.created_at)}</div>
            </div>
          </div>

          {message.title && <h2 className="text-xl font-bold text-gray-900 mb-2">{message.title}</h2>}
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{message.content}</p>

          {message.images?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {message.images.map((img, i) => (
                <img key={i} src={img} alt=""
                  className="rounded-xl object-cover border border-gray-100 cursor-pointer hover:opacity-90"
                  style={{ maxWidth: '50%', maxHeight: '250px' }}
                  onClick={() => window.open(img, '_blank')} />
              ))}
            </div>
          )}
        </div>

        {/* 回复列表 */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-1.5">
            <MessageSquare size={14} /> {t('全部回复', 'All Replies')} ({replies.length})
          </h3>

          {replies.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-gray-200">
              <p className="text-gray-400 text-sm">{t('暂无回复，来发表第一条回复吧', 'No replies yet. Be the first to reply!')}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {replies.map(reply => (
                <div key={reply.id} className={`bg-white rounded-xl p-4 border ${reply.is_admin_reply ? 'border-blue-100 bg-blue-50/30' : 'border-gray-100'} shadow-sm`}>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      {reply.is_admin_reply ? <Shield size={12} className="text-amber-600" /> : <User size={12} className="text-blue-600" />}
                    </div>
                    <span className="font-medium text-sm text-gray-800">{reply.user?.username}</span>
                    {reply.is_pinned && <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">{t('置顶', 'Pinned')}</span>}
                    {reply.is_admin_reply && !reply.is_pinned && <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">{t('官方', 'Official')}</span>}
                    <span className="text-xs text-gray-400">{formatDate(reply.created_at)}</span>
                  </div>
                  <p className="text-sm text-gray-700 ml-7 leading-relaxed">{reply.content}</p>
                  {reply.images?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2 ml-7">
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
        </div>

        {/* 回复表单 */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
          <h4 className="text-sm font-bold text-gray-700 mb-3">{t('发表回复', 'Reply')}</h4>
          {!user ? (
            <div className="text-center py-4">
              <p className="text-sm text-gray-500 mb-2">{t('请先登录后再回复', 'Please log in to reply')}</p>
              <button onClick={() => router.push('/login')}
                className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-xl">{t('去登录', 'Log In')}</button>
            </div>
          ) : (
            <form onSubmit={handleReply} className="space-y-3">
              {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl">{error}</div>}
              <textarea value={replyContent} onChange={e => setReplyContent(e.target.value)}
                placeholder={t('写下你的回复...', 'Write your reply...')} rows={3} required
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none" />
              {/* 图片 */}
              <div className="flex flex-wrap items-center gap-2">
                {replyImages.map((img, i) => (
                  <div key={i} className="relative">
                    <img src={img} alt="" className="w-16 h-16 rounded-lg object-cover border border-gray-200" />
                    <button type="button" onClick={() => setReplyImages(prev => prev.filter((_, j) => j !== i))}
                      className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5"><X size={12} /></button>
                  </div>
                ))}
                {replyImages.length < 3 && (
                  <label className="w-16 h-16 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-blue-400">
                    <ImagePlus size={20} className="text-gray-400" />
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
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl px-4 py-2 select-none">
                  <span className="text-lg font-bold tracking-[0.3em] text-blue-700 font-mono">{captcha.code || '····'}</span>
                </div>
                <input type="text" value={captcha.input} onChange={e => setCaptcha(prev => ({ ...prev, input: e.target.value }))}
                  placeholder={t('验证码', 'Captcha')} required maxLength={4}
                  className="w-24 border border-gray-200 rounded-xl px-3 py-2 text-sm text-center tracking-widest focus:ring-2 focus:ring-blue-500 outline-none" />
                <button type="button" onClick={fetchCaptcha} className="p-2 text-gray-400 hover:text-blue-600" title={t('刷新', 'Refresh')}>
                  <Sparkles size={16} />
                </button>
              </div>
              <button type="submit" disabled={submitting}
                className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors">
                <Send size={14} /> {submitting ? t('发送中...', 'Sending...') : t('发送回复', 'Send Reply')}
              </button>
            </form>
          )}
        </div>
      </div>

      {profileUserId && (
        <UserProfileModal userId={profileUserId} onClose={() => setProfileUserId(null)} />
      )}
    </div>
  )
}
