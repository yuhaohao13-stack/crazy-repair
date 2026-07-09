'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { Star, ImagePlus, X, ShieldCheck, Sparkles, Send, User, Shield, ChevronDown, ChevronUp, Search } from 'lucide-react'
import UserProfileModal from './UserProfileModal'

// ========== 评价详情弹窗（含回复） ==========
function ReviewDetailModal({ review, onClose, isAdmin, user, adminUser }) {
  const [replies, setReplies] = useState([])
  const [replyContent, setReplyContent] = useState('')
  const [replyImages, setReplyImages] = useState([])
  const [captcha, setCaptcha] = useState({ id: null, code: '' })
  const [captchaInput, setCaptchaInput] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [profileUserId, setProfileUserId] = useState(null)
  const fileInputRef = useRef(null)

  if (!review) return null

  const loadCaptcha = useCallback(async () => {
    try {
      const res = await fetch('/api/reviews/captcha')
      const data = await res.json()
      setCaptcha({ id: data.captchaId, code: data.code })
    } catch { /* ignore */ }
  }, [])

  // 加载回复
  const loadReplies = useCallback(async () => {
    try {
      const res = await fetch(`/api/messages/reply?targetType=review&targetId=${review.id}`)
      const data = await res.json()
      setReplies(data.replies || [])
    } catch { /* ignore */ }
  }, [review.id])

  useEffect(() => {
    loadReplies()
    loadCaptcha()
  }, [loadReplies, loadCaptcha])

  const handleReplyImage = (e) => {
    const files = Array.from(e.target.files || [])
    if (replyImages.length + files.length > 3) {
      setError('最多3张图片')
      return
    }
    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        setError(`${file.name} 超过5MB`)
        continue
      }
      const reader = new FileReader()
      reader.onload = (ev) => setReplyImages(prev => [...prev, ev.target.result])
      reader.readAsDataURL(file)
    }
  }

  const handleReply = async (e) => {
    e.preventDefault()
    if (!replyContent.trim()) return
    setError('')
    setSubmitting(true)

    try {
      const token = localStorage.getItem('crazy_user_token')
      if (!token) {
        setError('请先登录')
        setSubmitting(false)
        return
      }

      const res = await fetch('/api/messages/reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: replyContent,
          images: replyImages,
          targetType: 'review',
          targetId: review.id,
          captchaId: captcha.id,
          captchaValue: captchaInput,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      setReplyContent('')
      setReplyImages([])
      setCaptchaInput('')
      loadCaptcha()
      loadReplies()
    } catch (err) {
      setError(err.message)
      loadCaptcha()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        {/* 头部 */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <div className="flex items-center gap-2">
            <div className="flex text-amber-400">
              {[1,2,3,4,5].map(s => (
                <Star key={s} size={16} fill={s <= review.rating ? 'currentColor' : 'none'}
                  className={s <= review.rating ? 'text-amber-400' : 'text-gray-200'} />
              ))}
            </div>
            <span className="text-sm text-gray-400">{review.rating}.0</span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* 标题 */}
          <h3 className="text-xl font-bold text-gray-900">{review.title}</h3>

          {/* 评价内容 */}
          <p className="text-gray-700 leading-relaxed text-base">&ldquo;{review.content}&rdquo;</p>

          {/* 图片 - 最大宽度不超过页面1/2 */}
          {review.images?.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-500 mb-3">图片 ({review.images.length})</p>
              <div className="flex flex-wrap gap-3">
                {review.images.map((img, i) => (
                  <a key={i} href={img} target="_blank" rel="noopener noreferrer"
                    className="block rounded-xl overflow-hidden border border-gray-200 hover:opacity-95 transition-opacity"
                    style={{ maxWidth: '50%' }}>
                    <img src={img} alt="" className="w-full h-auto max-h-80 object-contain bg-gray-50" loading="lazy" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* 用户信息 */}
          <div className="border-t border-gray-100 pt-4 flex items-center justify-between text-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                {review.user_id ? <User size={18} /> : review.name?.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {review.name}
                  {adminUser?.is_admin && review.user_id && (
                    <button onClick={() => setProfileUserId(review.user_id)}
                      className="ml-1.5 text-blue-500 hover:text-blue-700 inline-flex items-center gap-0.5 text-xs"
                      title="查看用户资料">
                      <Search size={12} />
                    </button>
                  )}
                </p>
                <p className="text-gray-400 text-xs">{review.phone}</p>
              </div>
            </div>
            <div className="text-xs text-gray-400">
              {new Date(review.created_at).toLocaleDateString('zh-CN')}
            </div>
          </div>

          {/* 回复列表 */}
          {replies.length > 0 && (
            <div className="border-t border-gray-100 pt-4">
              <h4 className="text-sm font-bold text-gray-700 mb-3">
                回复 ({replies.length})
              </h4>
              <div className="space-y-3">
                {[...replies].sort((a, b) => (b.is_pinned ? 1 : 0) - (a.is_pinned ? 1 : 0)).map(reply => (
                  <div key={reply.id} className={`p-3 rounded-xl ${reply.is_admin_reply ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-1.5 mb-1">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                        {reply.is_admin_reply ? <Shield size={12} className="text-amber-600" /> : <User size={12} className="text-blue-600" />}
                      </div>
                      <span className="font-medium text-xs text-gray-800">{reply.user?.username || '用户'}</span>
                      {reply.is_pinned && <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">置顶</span>}
                      {reply.is_admin_reply && !reply.is_pinned && <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">官方回复</span>}
                      <span className="text-xs text-gray-400">{new Date(reply.created_at).toLocaleDateString('zh-CN')}</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-7">{reply.content}</p>
                    {reply.images && reply.images.length > 0 && (
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
            </div>
          )}

          {/* 回复表单 */}
          <div className="border-t border-gray-100 pt-4">
            <h4 className="text-sm font-bold text-gray-700 mb-3">发表回复</h4>
            {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-3">{error}</div>}
            <form onSubmit={handleReply} className="space-y-3">
              <textarea value={replyContent} onChange={e => setReplyContent(e.target.value)}
                placeholder={user ? "写下你的回复..." : "请先登录后再回复"}
                rows={3} required
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none" />

              {/* 图片 */}
              <div className="flex flex-wrap items-center gap-2">
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
                    <input type="file" accept="image/*" className="hidden" onChange={handleReplyImage} />
                  </label>
                )}
              </div>

              {/* 验证码 */}
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl px-4 py-2 select-none">
                  <span className="text-lg font-bold tracking-[0.3em] text-blue-700 font-mono">{captcha.code || '····'}</span>
                </div>
                <input type="text" value={captchaInput} onChange={e => setCaptchaInput(e.target.value)}
                  placeholder="验证码" required maxLength={4}
                  className="w-24 border border-gray-200 rounded-xl px-3 py-2 text-sm text-center tracking-widest focus:ring-2 focus:ring-blue-500 outline-none" />
                <button type="button" onClick={loadCaptcha} className="p-2 text-gray-400 hover:text-blue-600" title="刷新">
                  <Sparkles size={16} />
                </button>
              </div>

              <button type="submit" disabled={submitting || !user}
                className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors">
                <Send size={14} /> {submitting ? '发送中...' : '发送回复'}
              </button>
              {!user && <p className="text-xs text-gray-400"><a href="/login" className="text-blue-600">登录</a>后即可回复</p>}
            </form>
          </div>
        </div>

        {/* 用户资料弹窗（管理员可见） */}
        {adminUser?.is_admin && profileUserId && (
          <UserProfileModal userId={profileUserId} onClose={() => setProfileUserId(null)} />
        )}
      </div>
    </div>
  )
}

// ========== 评价卡片 ==========
function ReviewCard({ review, onClick }) {
  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm h-full flex flex-col cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all" onClick={() => onClick?.(review)}>
      <div className="flex text-amber-400 mb-2">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            size={16}
            fill={s <= review.rating ? 'currentColor' : 'none'}
            className={s <= review.rating ? 'text-amber-400' : 'text-gray-200'}
          />
        ))}
      </div>
      {/* 标题 */}
      <h4 className="font-semibold text-gray-900 text-sm mb-1.5 line-clamp-1">{review.title}</h4>
      {/* 内容 */}
      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 flex-1 line-clamp-4">
        &ldquo;{review.content}&rdquo;
      </p>
      {/* 图片 - 不超过50%宽度 */}
      {review.images?.length > 0 && (
        <div className="flex gap-2 mb-3 flex-wrap">
          {review.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="评价图片"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover border border-gray-100"
              style={{ maxWidth: '50%' }}
              loading="lazy"
            />
          ))}
        </div>
      )}
      {/* 用户信息 */}
      <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-50 pt-3 mt-auto">
        <span className="font-medium">{review.name}</span>
        <span>{review.phone}</span>
      </div>
    </div>
  )
}

// ========== 评价紧凑列表 ==========
function ReviewList({ reviews, onCardClick }) {
  if (!reviews.length) return null
  const featured = reviews.slice(0, 3)
  const rest = reviews.slice(3)

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        {featured.map(r => (
          <ReviewCard key={r.id} review={r} onClick={onCardClick} />
        ))}
      </div>
      {rest.length > 0 && (
        <div className="space-y-2">
          {rest.map(r => (
            <div key={r.id}
              onClick={() => onCardClick(r)}
              className="bg-white rounded-xl px-4 py-3 border border-gray-100 cursor-pointer hover:bg-gray-50 hover:border-gray-200 transition-all flex items-center gap-3"
            >
              <div className="flex text-amber-400 shrink-0">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={13} fill={s <= r.rating ? 'currentColor' : 'none'}
                    className={s <= r.rating ? 'text-amber-400' : 'text-gray-200'} />
                ))}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium text-gray-900 line-clamp-1">{r.title}</span>
                <span className="text-xs text-gray-400 ml-2 line-clamp-1">&ldquo;{r.content}&rdquo;</span>
              </div>
              <span className="text-xs text-gray-400 shrink-0">{r.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ========== 评价表单 ==========
function ReviewForm({ onClose, onSubmitted, user }) {
  const [step, setStep] = useState('form')
  const [form, setForm] = useState({
    name: user?.username || '',
    phone: user?.phone || '',
    title: '', content: '', rating: 5,
  })
  const [images, setImages] = useState([])
  const [captcha, setCaptcha] = useState({ id: null, code: '' })
  const [captchaInput, setCaptchaInput] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  useEffect(() => {
    // 自动从用户信息填表
    if (user) {
      setForm(f => ({ ...f, name: user.username, phone: user.phone }))
    }
  }, [user])

  const loadCaptcha = useCallback(async () => {
    try {
      const res = await fetch('/api/reviews/captcha')
      const data = await res.json()
      setCaptcha({ id: data.captchaId, code: data.code })
    } catch {
      setError('加载验证码失败')
    }
  }, [])

  useEffect(() => { loadCaptcha() }, [loadCaptcha])

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files || [])
    if (images.length + files.length > 3) {
      setError('最多上传3张图片')
      return
    }
    const newImages = files.map(f => ({
      file: f,
      preview: URL.createObjectURL(f),
    }))
    setImages(prev => [...prev, ...newImages])
    setError('')
  }

  const removeImage = (idx) => {
    setImages(prev => {
      URL.revokeObjectURL(prev[idx].preview)
      return prev.filter((_, i) => i !== idx)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      let imageUrls = []
      if (images.length > 0) {
        const formData = new FormData()
        images.forEach(img => formData.append('files', img.file))
        const uploadRes = await fetch('/api/reviews/upload', { method: 'POST', body: formData })
        const uploadData = await uploadRes.json()
        if (!uploadRes.ok) throw new Error(uploadData.error)
        imageUrls = uploadData.urls
      }

      const headers = { 'Content-Type': 'application/json' }
      if (user) {
        const token = localStorage.getItem('crazy_user_token')
        if (token) headers['Authorization'] = `Bearer ${token}`
      }

      const res = await fetch('/api/reviews/submit', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          title: form.title,
          content: form.content,
          rating: form.rating,
          images: imageUrls,
          captchaId: captcha.id,
          captchaValue: captchaInput,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      setStep('success')
      setTimeout(() => {
        onSubmitted?.()
        onClose?.()
        setStep('form')
        setForm({ name: user?.username || '', phone: user?.phone || '', title: '', content: '', rating: 5 })
        setImages([])
        setCaptchaInput('')
      }, 2000)
    } catch (err) {
      setError(err.message)
      loadCaptcha()
      setCaptchaInput('')
    } finally {
      setSubmitting(false)
    }
  }

  if (step === 'success') {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShieldCheck size={32} className="text-green-600" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">评价提交成功！</h3>
        <p className="text-gray-500 text-sm">感谢您的反馈 🙏</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 font-medium">评分：</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <button key={s} type="button" onClick={() => setForm(f => ({ ...f, rating: s }))}>
              <Star
                size={24}
                fill={s <= form.rating ? 'currentColor' : 'none'}
                className={s <= form.rating ? 'text-amber-400' : 'text-gray-200 hover:text-amber-300 transition-colors'}
              />
            </button>
          ))}
        </div>
      </div>

      {!user && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">用户名 *</label>
            <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="请输入称呼" required maxLength={30}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">手机号 *</label>
            <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              placeholder="请输入手机号" required maxLength={15}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
          </div>
        </>
      )}
      {user && (
        <div className="bg-blue-50 rounded-xl p-3 text-sm text-blue-700">
          ✅ 已登录为 <strong>{user.username}</strong>（{user.phone}），无需重复填写
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">标题 *</label>
        <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
          placeholder="给这次维修一个评价标题" required maxLength={100}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">评价内容 *</label>
        <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
          placeholder="分享一下您的维修体验..." required rows={4} maxLength={1000}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          图片（最多3张，可选）<span className="text-gray-400 font-normal ml-1">支持 JPG/PNG/WebP/GIF，单张不超5MB</span>
        </label>
        <div className="flex gap-2 flex-wrap">
          {images.map((img, i) => (
            <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200">
              <img src={img.preview} alt="预览" className="w-full h-full object-cover" />
              <button type="button" onClick={() => removeImage(i)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5">
                <X size={14} />
              </button>
            </div>
          ))}
          {images.length < 3 && (
            <button type="button" onClick={() => fileInputRef.current?.click()}
              className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-colors">
              <ImagePlus size={24} />
              <span className="text-xs mt-1">添加</span>
            </button>
          )}
        </div>
        <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple onChange={handleImageSelect} className="hidden" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">验证码 *</label>
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl px-5 py-3 select-none">
            <span className="text-xl font-bold tracking-[0.4em] text-blue-700 font-mono">{captcha.code}</span>
          </div>
          <input type="text" value={captchaInput} onChange={e => setCaptchaInput(e.target.value)}
            placeholder="输入上方数字" required maxLength={4}
            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-center font-mono tracking-widest focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
          <button type="button" onClick={loadCaptcha} className="p-2.5 text-gray-400 hover:text-blue-600" title="刷新">
            <Sparkles size={20} />
          </button>
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">{error}</div>}

      <button type="submit" disabled={submitting}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
        {submitting ? (
          <><span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />提交中...</>
        ) : '提交评价'}
      </button>

      <p className="text-xs text-gray-400 text-center">提交即表示您同意我们展示您的评价内容</p>
    </form>
  )
}

// ========== 主组件 ==========
export default function ReviewSection({ showAdminButton = true }) {
  const [reviews, setReviews] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [adminEmail, setAdminEmail] = useState('')
  const [selectedReview, setSelectedReview] = useState(null)
  const [user, setUser] = useState(null)
  const [adminPassword, setAdminPassword] = useState('')
  const [adminToken, setAdminToken] = useState('')
  const [adminError, setAdminError] = useState('')

  // 检查登录状态
  useEffect(() => {
    const token = localStorage.getItem('crazy_user_token')
    if (token) {
      fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
        .then(r => r.json())
        .then(d => { if (d.user) setUser(d.user) })
        .catch(() => {})
    }
  }, [])

  const loadReviews = useCallback(async () => {
    try {
      const res = await fetch('/api/reviews/list?pageSize=50')
      const data = await res.json()
      setReviews(data.reviews || [])
      setTotal(data.total || 0)
    } catch (err) {
      console.error('Load reviews error:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadReviews() }, [loadReviews])

  useEffect(() => {
    const token = localStorage.getItem('crazy_admin_token')
    if (token) setAdminToken(token)
  }, [])

  const handleAdminLogin = async (e) => {
    e.preventDefault()
    setAdminError('')
    try {
      const res = await fetch('/api/reviews/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: adminEmail, password: adminPassword }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      localStorage.setItem('crazy_admin_token', data.token)
      setAdminToken(data.token)
      setShowAdminLogin(false)
      setAdminEmail('')
      setAdminPassword('')
      window.open('/admin', '_blank')
    } catch (err) {
      setAdminError(err.message)
    }
  }

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0'

  return (
    <section id="reviews" className="py-12 sm:py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">客户评价</h2>
            {total > 0 && (
              <p className="text-gray-500 text-sm mt-1">共 {total} 条评价 · 平均评分 {avgRating} ⭐</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => {
              if (!user) { window.location.href = '/login'; return }
              setShowForm(true)
            }}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors shadow-sm">
              写评价 ✍️
            </button>
            {showAdminButton && (
              <button onClick={() => setShowAdminLogin(true)}
                className="text-gray-400 hover:text-blue-600 text-xs font-medium px-3 py-2 rounded-lg transition-colors" title="管理员">
                🔧
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="h-3 bg-gray-200 rounded w-full mb-2" />
                <div className="h-3 bg-gray-200 rounded w-2/3 mb-4" />
                <div className="h-3 bg-gray-200 rounded w-1/4" />
              </div>
            ))}
          </div>
        ) : reviews.length > 0 ? (
          <ReviewList reviews={reviews} onCardClick={setSelectedReview} />
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-400 mb-3">暂无评价</p>
            <button onClick={() => {
              if (!user) { window.location.href = '/login'; return }
              setShowForm(true)
            }}
              className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
              成为第一个评价的人 →
            </button>
          </div>
        )}

        {/* 评价表单 Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setShowForm(false)}>
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
                <h3 className="text-lg font-bold text-gray-900">写评价</h3>
                <button onClick={() => setShowForm(false)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
              <div className="p-6">
                <ReviewForm onClose={() => setShowForm(false)} onSubmitted={loadReviews} user={user} />
              </div>
            </div>
          </div>
        )}

        {/* Admin 登录 Modal */}
        {showAdminLogin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setShowAdminLogin(false)}>
            <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl p-6" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">管理员登录</h3>
                <button onClick={() => setShowAdminLogin(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
                  <input type="email" value={adminEmail} onChange={e => setAdminEmail(e.target.value)}
                    placeholder="管理员邮箱" required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">密码</label>
                  <input type="password" value={adminPassword} onChange={e => setAdminPassword(e.target.value)}
                    placeholder="管理员密码" required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                </div>
                {adminError && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">{adminError}</div>}
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors">
                  登录管理后台
                </button>
              </form>
            </div>
          </div>
        )}

        {/* 评价详情弹窗（含回复） */}
        {selectedReview && (
          <ReviewDetailModal review={selectedReview} onClose={() => setSelectedReview(null)} user={user} adminUser={user} />
        )}
      </div>
    </section>
  )
}
