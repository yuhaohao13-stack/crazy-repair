'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Send, ImagePlus, X, User, Shield, Star, Sparkles } from 'lucide-react'
import UserProfileModal from '@/components/UserProfileModal'

export default function ReviewDetailPage() {
  const router = useRouter()
  const params = useParams()
  const reviewId = params.id

  const [user, setUser] = useState(null)
  const [review, setReview] = useState(null)
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

  const loadReview = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/reviews/list?reviewId=${reviewId}`)
      const data = await res.json()
      if (data.error) { setError(data.error); return }
      setReview(data.review)
      setReplies(data.replies || [])
    } catch { setError('加载失败') }
    setLoading(false)
  }, [reviewId])

  useEffect(() => { loadReview(); fetchCaptcha() }, [loadReview, fetchCaptcha])

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
          targetType: 'review', targetId: parseInt(reviewId),
          captchaId: captcha.id, captchaValue: captcha.input,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || '回复失败')
      setReplyContent(''); setReplyImages([])
      fetchCaptcha(); loadReview()
    } catch (err) { setError(err.message); fetchCaptcha() }
    finally { setSubmitting(false) }
  }

  const formatDate = (d) => {
    const date = new Date(d)
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-gray-400">加载中...</div></div>
  }

  if (error || !review) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">{error || '评价不存在'}</p>
          <button onClick={() => router.push('/')} className="text-blue-600 text-sm">← 返回首页</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <button onClick={() => router.push('/')}
          className="flex items-center gap-1 text-gray-500 hover:text-gray-700 mb-4 text-sm">
          <ArrowLeft size={16} /> 返回首页
        </button>

        {/* 评价主体 */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 mb-6">
          {/* 评分 */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex text-amber-400">
              {[1,2,3,4,5].map(s => (
                <Star key={s} size={18} fill={s <= review.rating ? 'currentColor' : 'none'}
                  className={s <= review.rating ? 'text-amber-400' : 'text-gray-200'} />
              ))}
            </div>
            <span className="text-sm text-gray-400">{review.rating}.0</span>
          </div>

          {/* 用户信息 */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
              {review.user_id ? <User size={18} /> : review.name?.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-sm text-gray-900">{review.name}</span>
                {user?.is_admin && review.user_id && (
                  <button onClick={() => setProfileUserId(review.user_id)}
                    className="ml-0.5 text-blue-500 hover:text-blue-700 text-xs">🔍</button>
                )}
              </div>
              <div className="text-xs text-gray-400">{review.phone} · {formatDate(review.created_at)}</div>
            </div>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-2">{review.title}</h2>
          <p className="text-gray-700 leading-relaxed">&ldquo;{review.content}&rdquo;</p>

          {review.images?.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {review.images.map((img, i) => (
                <a key={i} href={img} target="_blank" rel="noopener noreferrer"
                  className="block rounded-xl overflow-hidden border border-gray-200 hover:opacity-95 transition-opacity"
                  style={{ maxWidth: '50%' }}>
                  <img src={img} alt="" className="w-full h-auto max-h-80 object-contain bg-gray-50" loading="lazy" />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* 回复列表 */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-1.5">
            💬 回复 ({replies.length})
          </h3>

          {replies.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-gray-200">
              <p className="text-gray-400 text-sm">暂无回复</p>
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
                    {reply.is_pinned && <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">置顶</span>}
                    {reply.is_admin_reply && !reply.is_pinned && <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">官方</span>}
                    <span className="text-xs text-gray-400">{new Date(reply.created_at).toLocaleDateString('zh-CN')}</span>
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
          <h4 className="text-sm font-bold text-gray-700 mb-3">发表回复</h4>
          {!user ? (
            <div className="text-center py-4">
              <p className="text-sm text-gray-500 mb-2">请先登录后再回复</p>
              <button onClick={() => router.push('/login')}
                className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-xl">去登录</button>
            </div>
          ) : (
            <form onSubmit={handleReply} className="space-y-3">
              {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl">{error}</div>}
              <textarea value={replyContent} onChange={e => setReplyContent(e.target.value)}
                placeholder="写下你的回复..." rows={3} required
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none" />
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
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl px-4 py-2 select-none">
                  <span className="text-lg font-bold tracking-[0.3em] text-blue-700 font-mono">{captcha.code || '····'}</span>
                </div>
                <input type="text" value={captcha.input} onChange={e => setCaptcha(prev => ({ ...prev, input: e.target.value }))}
                  placeholder="验证码" required maxLength={4}
                  className="w-24 border border-gray-200 rounded-xl px-3 py-2 text-sm text-center tracking-widest focus:ring-2 focus:ring-blue-500 outline-none" />
                <button type="button" onClick={fetchCaptcha} className="p-2 text-gray-400 hover:text-blue-600" title="刷新">
                  <Sparkles size={16} />
                </button>
              </div>
              <button type="submit" disabled={submitting}
                className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors">
                <Send size={14} /> {submitting ? '发送中...' : '发送回复'}
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
