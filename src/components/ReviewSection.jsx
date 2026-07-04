'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { Star, ChevronLeft, ChevronRight, ImagePlus, X, ShieldCheck, Sparkles, ExternalLink, MapPin, Calendar } from 'lucide-react'

// ========== 评价详情弹窗 ==========
function ReviewDetailModal({ review, onClose, isAdmin }) {
  if (!review) return null
  
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
          
          {/* 图片 */}
          {review.images?.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-500 mb-3">图片 ({review.images.length})</p>
              <div className="grid gap-3" style={{
                gridTemplateColumns: review.images.length === 1 ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))'
              }}>
                {review.images.map((img, i) => (
                  <a key={i} href={img} target="_blank" rel="noopener noreferrer"
                    className="block rounded-xl overflow-hidden border border-gray-200 hover:opacity-95 transition-opacity">
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
                {review.name?.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-gray-900">{review.name}</p>
                <p className="text-gray-400 text-xs">{review.phone}</p>
              </div>
            </div>
            <div className="text-xs text-gray-400">
              {new Date(review.created_at).toLocaleDateString('zh-CN')}
            </div>
          </div>
        </div>
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
      {/* 图片 */}
      {review.images?.length > 0 && (
        <div className="flex gap-2 mb-3 flex-wrap">
          {review.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="评价图片"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover border border-gray-100"
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

// ========== 轮播 ==========
function ReviewCarousel({ reviews, onShowForm, onCardClick }) {
  const [current, setCurrent] = useState(0)
  const max = Math.max(0, reviews.length - 1)

  const next = useCallback(() => setCurrent(c => Math.min(c + 1, max)), [max])
  const prev = useCallback(() => setCurrent(c => Math.max(c - 1, 0)), [])

  // 自动轮播
  useEffect(() => {
    if (reviews.length <= 1) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next, reviews.length])

  if (!reviews.length) return null

  const visibleDesktop = reviews.slice(current, current + 3)
  const hasMore = current + 3 < reviews.length

  return (
    <div className="relative">
      {/* 左右箭头 */}
      {current > 0 && (
        <button onClick={prev} className="absolute -left-3 sm:-left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md border border-gray-100 hover:bg-gray-50 transition-colors">
          <ChevronLeft size={20} className="text-gray-600" />
        </button>
      )}
      {hasMore && (
        <button onClick={next} className="absolute -right-3 sm:-right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md border border-gray-100 hover:bg-gray-50 transition-colors">
          <ChevronRight size={20} className="text-gray-600" />
        </button>
      )}

      {/* 评价卡片展示 */}
      <div className="hidden sm:grid sm:grid-cols-3 gap-4">
        {visibleDesktop.map((r) => (
          <ReviewCard key={r.id} review={r} onClick={onCardClick} />
        ))}
        {Array.from({ length: Math.max(0, 3 - visibleDesktop.length) }).map((_, i) => (
          <div key={`empty-${i}`} className="bg-gray-50 rounded-2xl border border-dashed border-gray-200 flex items-center justify-center min-h-[200px]">
            <p className="text-gray-400 text-sm">更多评价加载中...</p>
          </div>
        ))}
      </div>

      {/* 手机端：单卡片滑动 */}
      <div className="sm:hidden">
        <ReviewCard review={reviews[current]} onClick={onCardClick} />
      </div>

      {/* 圆点指示器 */}
      {reviews.length > 3 && (
        <div className="flex justify-center gap-1.5 mt-4">
          {Array.from({ length: Math.min(reviews.length - 2, 5) }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === Math.min(current, reviews.length - 3)
                  ? 'bg-blue-600 w-5'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ========== 评价表单 ==========
function ReviewForm({ onClose, onSubmitted }) {
  const [step, setStep] = useState('form') // form | success
  const [form, setForm] = useState({ name: '', phone: '', title: '', content: '', rating: 5 })
  const [images, setImages] = useState([])
  const [captcha, setCaptcha] = useState({ id: null, code: '' })
  const [captchaInput, setCaptchaInput] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  // 加载验证码
  const loadCaptcha = useCallback(async () => {
    try {
      const res = await fetch('/api/reviews/captcha')
      const data = await res.json()
      setCaptcha({ id: data.captchaId, code: data.code })
    } catch {
      setError('加载验证码失败，请刷新重试')
    }
  }, [])

  useEffect(() => { loadCaptcha() }, [loadCaptcha])

  // 图片选择
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files || [])
    if (images.length + files.length > 3) {
      setError('最多上传3张图片')
      return
    }
    const newImages = files.map(f => ({
      file: f,
      preview: URL.createObjectURL(f),
      uploading: false,
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

  // 提交
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      // 1. 先上传图片
      let imageUrls = []
      if (images.length > 0) {
        const formData = new FormData()
        images.forEach(img => formData.append('files', img.file))
        const uploadRes = await fetch('/api/reviews/upload', { method: 'POST', body: formData })
        const uploadData = await uploadRes.json()
        if (!uploadRes.ok) throw new Error(uploadData.error)
        imageUrls = uploadData.urls
      }

      // 2. 提交评价
      const res = await fetch('/api/reviews/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        setForm({ name: '', phone: '', title: '', content: '', rating: 5 })
        setImages([])
        setCaptchaInput('')
      }, 2000)
    } catch (err) {
      setError(err.message)
      loadCaptcha() // 刷新验证码
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
      {/* 评分 */}
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

      {/* 用户名 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">用户名 *</label>
        <input
          type="text"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          placeholder="请输入您的称呼"
          required
          maxLength={30}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
        />
      </div>

      {/* 手机号 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">手机号 *</label>
        <input
          type="tel"
          value={form.phone}
          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
          placeholder="请输入手机号"
          required
          maxLength={15}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
        />
      </div>

      {/* 标题 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">标题 *</label>
        <input
          type="text"
          value={form.title}
          onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
          placeholder="给这次维修一个评价标题"
          required
          maxLength={100}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
        />
      </div>

      {/* 内容 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">评价内容 *</label>
        <textarea
          value={form.content}
          onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
          placeholder="分享一下您的维修体验..."
          required
          rows={4}
          maxLength={1000}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow resize-none"
        />
      </div>

      {/* 图片上传 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          图片（最多3张，可选）
          <span className="text-gray-400 font-normal ml-1">支持 JPG/PNG/WebP/GIF，单张不超5MB</span>
        </label>
        <div className="flex gap-2 flex-wrap">
          {images.map((img, i) => (
            <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200">
              <img src={img.preview} alt="预览" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5"
              >
                <X size={14} />
              </button>
            </div>
          ))}
          {images.length < 3 && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-colors"
            >
              <ImagePlus size={24} />
              <span className="text-xs mt-1">添加</span>
            </button>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          onChange={handleImageSelect}
          className="hidden"
        />
      </div>

      {/* 验证码 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">验证码 *</label>
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl px-5 py-3 select-none">
            <span className="text-xl font-bold tracking-[0.4em] text-blue-700 font-mono">
              {captcha.code}
            </span>
          </div>
          <input
            type="text"
            value={captchaInput}
            onChange={e => setCaptchaInput(e.target.value)}
            placeholder="输入上方数字"
            required
            maxLength={4}
            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-center font-mono tracking-widest focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
          />
          <button
            type="button"
            onClick={loadCaptcha}
            className="p-2.5 text-gray-400 hover:text-blue-600 transition-colors"
            title="刷新验证码"
          >
            <Sparkles size={20} />
          </button>
        </div>
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      {/* 提交按钮 */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
      >
        {submitting ? (
          <>
            <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            提交中...
          </>
        ) : (
          '提交评价'
        )}
      </button>

      <p className="text-xs text-gray-400 text-center">
        提交即表示您同意我们展示您的评价内容
      </p>
    </form>
  )
}

// ========== 主组件 ==========
export default function ReviewSection({ showAdminButton = true }) {
  const [reviews, setReviews] = useState([])
  const [carouselReviews, setCarouselReviews] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [adminEmail, setAdminEmail] = useState('')
  const [selectedReview, setSelectedReview] = useState(null)
  
  const onCardClick = useCallback((review) => {
    setSelectedReview(review)
  }, [])
  const [adminPassword, setAdminPassword] = useState('')
  const [adminToken, setAdminToken] = useState('')
  const [adminError, setAdminError] = useState('')

  // 加载评价
  const loadReviews = useCallback(async () => {
    try {
      const res = await fetch('/api/reviews/list?pageSize=50')
      const data = await res.json()
      setReviews(data.reviews || [])
      setCarouselReviews(data.carousel || [])
      setTotal(data.total || 0)
    } catch (err) {
      console.error('Load reviews error:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadReviews() }, [loadReviews])

  // 检查是否有admin token
  useEffect(() => {
    const token = localStorage.getItem('crazy_admin_token')
    if (token) setAdminToken(token)
  }, [])

  // Admin登录
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

  // 计算平均分
  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0'

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* 标题行 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              客户评价
            </h2>
            {total > 0 && (
              <p className="text-gray-500 text-sm mt-1">
                共 {total} 条评价 · 平均评分 {avgRating} ⭐
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors shadow-sm"
            >
              写评价 ✍️
            </button>
            {showAdminButton && (
              <button
                onClick={() => setShowAdminLogin(true)}
                className="text-gray-400 hover:text-blue-600 text-xs font-medium px-3 py-2 rounded-lg transition-colors"
                title="管理员"
              >
                🔧
              </button>
            )}
          </div>
        </div>

        {/* 轮播区域 */}
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
        ) : carouselReviews.length > 0 ? (
          <ReviewCarousel reviews={carouselReviews} onShowForm={() => setShowForm(true)} onCardClick={onCardClick} />
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-400 mb-3">暂无评价</p>
            <button
              onClick={() => setShowForm(true)}
              className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
            >
              成为第一个评价的人 →
            </button>
          </div>
        )}

        {/* 评价列表（最新10条） */}
        {!loading && reviews.length > 0 && (
          <div className="mt-8">
            <h3 className="text-base font-semibold text-gray-900 mb-4">最新评价</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {reviews.slice(0, 6).map(r => (
                <div key={r.id} className="bg-white rounded-xl p-4 border border-gray-100 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all" onClick={() => onCardClick(r)}>
                  <div className="flex text-amber-400 mb-1.5">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} size={14} fill={s <= r.rating ? 'currentColor' : 'none'} className={s <= r.rating ? 'text-amber-400' : 'text-gray-200'} />
                    ))}
                  </div>
                  <h4 className="font-medium text-gray-900 text-sm mb-1 line-clamp-1">{r.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">&ldquo;{r.content}&rdquo;</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                    <span>{r.name}</span>
                    <span>·</span>
                    <span>{r.phone}</span>
                  </div>
                </div>
              ))}
            </div>
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
                <ReviewForm
                  onClose={() => setShowForm(false)}
                  onSubmitted={loadReviews}
                />
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
                  <input
                    type="email"
                    value={adminEmail}
                    onChange={e => setAdminEmail(e.target.value)}
                    placeholder="管理员邮箱"
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">密码</label>
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={e => setAdminPassword(e.target.value)}
                    placeholder="管理员密码"
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                {adminError && (
                  <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">{adminError}</div>
                )}
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors">
                  登录管理后台
                </button>
              </form>
            </div>
          </div>
        )}

        {/* 评价详情弹窗 */}
        {selectedReview && (
          <ReviewDetailModal
            review={selectedReview}
            onClose={() => setSelectedReview(null)}
          />
        )}
      </div>
    </section>
  )
}
