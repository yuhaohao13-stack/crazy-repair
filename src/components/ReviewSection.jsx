'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useSite } from '../lib/SiteContext'
import { useRouter } from 'next/navigation'
import { Star, ImagePlus, X, ShieldCheck, Sparkles, Send, User, Shield, Search } from 'lucide-react'

// ========== 评价卡片（含回复预览） ==========
function ReviewCard({ review, router }) {
  const { lang } = useSite()
  const t = (zh, en) => lang === 'zh' ? zh : en
  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm h-full flex flex-col cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all"
      onClick={() => router.push(`/reviews/${review.id}`)}
    >
      <div className="flex text-amber-400 mb-2">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star key={s} size={16} fill={s <= review.rating ? 'currentColor' : 'none'}
            className={s <= review.rating ? 'text-amber-400' : 'text-gray-200'} />
        ))}
      </div>
      <h4 className="font-semibold text-gray-900 text-sm mb-1.5 line-clamp-1">{review.title}</h4>
      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 flex-1 line-clamp-4">
        &ldquo;{review.content}&rdquo;
      </p>
      {/* 图片 - 不超过50%宽度 */}
      {review.images?.length > 0 && (
        <div className="flex gap-2 mb-3 flex-wrap">
          {review.images.map((img, i) => (
            <img key={i} src={img} alt={t('评价图片', 'Review image')}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover border border-gray-100"
              style={{ maxWidth: '50%' }} loading="lazy" />
          ))}
        </div>
      )}

      {/* 回复预览（最多2条） */}
      {review.replies && review.replies.length > 0 && (
        <div className="mb-3 space-y-1.5">
          {review.replies.map(reply => (
            <div key={reply.id} className={`p-2 rounded-lg ${reply.is_admin_reply ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-1 mb-0.5">
                <span className="font-medium text-xs text-gray-700">{reply.user?.username}</span>
                {reply.is_pinned && <span className="text-xs bg-amber-100 text-amber-700 px-1 rounded">{t('置顶', 'Pinned')}</span>}
                {reply.is_admin_reply && !reply.is_pinned && <span className="text-xs bg-blue-100 text-blue-600 px-1 rounded">{t('官方', 'Official')}</span>}
              </div>
              <p className="text-xs text-gray-500 line-clamp-2">{reply.content}</p>
            </div>
          ))}
        </div>
      )}

      {/* 底部：用户信息 + 回复数 */}
      <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-50 pt-3 mt-auto">
        <span className="font-medium">{review.name}</span>
        <div className="flex items-center gap-2">
          {review.replyCount > 0 && <span>{review.replyCount} {t('条回复', 'replies')}</span>}
          <span>{review.phone}</span>
        </div>
      </div>
    </div>
  )
}

// ========== 评价紧凑列表（含回复预览） ==========
function ReviewList({ reviews, router }) {
  const { lang } = useSite()
  const t = (zh, en) => lang === 'zh' ? zh : en
  if (!reviews.length) return null
  const featured = reviews.slice(0, 3)
  const rest = reviews.slice(3)

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        {featured.map(r => (
          <ReviewCard key={r.id} review={r} router={router} />
        ))}
      </div>
      {rest.length > 0 && (
        <div className="space-y-2">
          {rest.map(r => (
            <div key={r.id}
              onClick={() => router.push(`/reviews/${r.id}`)}
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
              <div className="flex items-center gap-2 shrink-0 text-xs text-gray-400">
                {r.replyCount > 0 && <span>{r.replyCount}{t('条回复', 'replies')}</span>}
                <span>{r.name}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ========== 评价表单 ==========
function ReviewForm({ onClose, onSubmitted, user, router }) {
  const { lang } = useSite()
  const t = (zh, en) => lang === 'zh' ? zh : en
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
    if (user) setForm(f => ({ ...f, name: user.username, phone: user.phone }))
  }, [user])

  const loadCaptcha = useCallback(async () => {
    try {
      const res = await fetch('/api/reviews/captcha')
      const data = await res.json()
      setCaptcha({ id: data.captchaId, code: data.code })
    } catch { setError(t('加载验证码失败', 'Failed to load captcha')) }
  }, [])

  useEffect(() => { loadCaptcha() }, [loadCaptcha])

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files || [])
    if (images.length + files.length > 3) { setError(t('最多上传3张图片', 'Max 3 images')); return }
    const newImages = files.map(f => ({ file: f, preview: URL.createObjectURL(f) }))
    setImages(prev => [...prev, ...newImages])
    setError('')
  }

  const removeImage = (idx) => {
    setImages(prev => { URL.revokeObjectURL(prev[idx].preview); return prev.filter((_, i) => i !== idx) })
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
          name: form.name, phone: form.phone, title: form.title,
          content: form.content, rating: form.rating, images: imageUrls,
          captchaId: captcha.id, captchaValue: captchaInput,
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
    } finally { setSubmitting(false) }
  }

  if (step === 'success') {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShieldCheck size={32} className="text-green-600" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{t('评价提交成功！', 'Review submitted!')}</h3>
        <p className="text-gray-500 text-sm">{t('感谢您的反馈 🙏', 'Thanks for your feedback 🙏')}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 font-medium">{t('评分：', 'Rating:')}</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <button key={s} type="button" onClick={() => setForm(f => ({ ...f, rating: s }))}>
              <Star size={24} fill={s <= form.rating ? 'currentColor' : 'none'}
                className={s <= form.rating ? 'text-amber-400' : 'text-gray-200 hover:text-amber-300 transition-colors'} />
            </button>
          ))}
        </div>
      </div>

      {!user && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('用户名 *', 'Name *')}</label>
            <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder={t('请输入称呼', 'Enter your name')} required maxLength={30}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('手机号 *', 'Phone *')}</label>
            <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              placeholder={t('请输入手机号', 'Enter phone number')} required maxLength={15}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
        </>
      )}
      {user && (
        <div className="bg-blue-50 rounded-xl p-3 text-sm text-blue-700">
          {t('✅ 已登录为 ', '✅ Logged in as ')}<strong>{user.username}</strong>{t('（', ' (')}{user.phone}{t('），无需重复填写', '), no need to re-enter')}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('标题 *', 'Title *')}</label>
        <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
          placeholder={t('给这次维修一个评价标题', 'Give your repair a review title')} required maxLength={100}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('评价内容 *', 'Review *')}</label>
        <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
          placeholder={t('分享一下您的维修体验...', 'Share your repair experience...')} required rows={4} maxLength={1000}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('图片（最多3张，可选）', 'Images (max 3, optional)')}<span className="text-gray-400 font-normal ml-1">{t('支持 JPG/PNG/WebP/GIF，单张不超5MB', 'JPG/PNG/WebP/GIF, ≤5MB each')}</span>
        </label>
        <div className="flex gap-2 flex-wrap">
          {images.map((img, i) => (
            <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200">
              <img src={img.preview} alt={t('预览', 'Preview')} className="w-full h-full object-cover" />
              <button type="button" onClick={() => removeImage(i)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5"><X size={14} /></button>
            </div>
          ))}
          {images.length < 3 && (
            <button type="button" onClick={() => fileInputRef.current?.click()}
              className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-colors">
              <ImagePlus size={24} /><span className="text-xs mt-1">{t('添加', 'Add')}</span>
            </button>
          )}
        </div>
        <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple onChange={handleImageSelect} className="hidden" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('验证码 *', 'Captcha *')}</label>
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl px-5 py-3 select-none">
            <span className="text-xl font-bold tracking-[0.4em] text-blue-700 font-mono">{captcha.code}</span>
          </div>
          <input type="text" value={captchaInput} onChange={e => setCaptchaInput(e.target.value)}
            placeholder={t('输入上方数字', 'Enter code above')} required maxLength={4}
            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-center font-mono tracking-widest focus:ring-2 focus:ring-blue-500 outline-none" />
          <button type="button" onClick={loadCaptcha} className="p-2.5 text-gray-400 hover:text-blue-600" title={t('刷新', 'Refresh')}>
            <Sparkles size={20} />
          </button>
        </div>
      </div>
      {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">{error}</div>}
      <button type="submit" disabled={submitting}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
        {submitting ? (
          <><span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />{t('提交中...', 'Sending...')}</>
        ) : t('提交评价', 'Submit')}
      </button>
      <p className="text-xs text-gray-400 text-center">{t('提交即表示您同意我们展示您的评价内容', 'By submitting you agree to display your review')}</p>
    </form>
  )
}

// ========== 主组件 ==========
export default function ReviewSection({ showAdminButton = true }) {
  const { lang } = useSite()
  const t = (zh, en) => lang === 'zh' ? zh : en
  const router = useRouter()
  const [reviews, setReviews] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [user, setUser] = useState(null)
  const [adminEmail, setAdminEmail] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [adminToken, setAdminToken] = useState('')
  const [adminError, setAdminError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('crazy_user_token')
    if (token) {
      fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
        .then(r => r.json()).then(d => { if (d.user) setUser(d.user) })
        .catch(() => {})
    }
  }, [])

  const loadReviews = useCallback(async () => {
    try {
      const res = await fetch('/api/reviews/list?pageSize=50')
      const data = await res.json()
      setReviews(data.reviews || [])
      setTotal(data.total || 0)
    } catch (err) { console.error('Load reviews error:', err) }
    finally { setLoading(false) }
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
    } catch (err) { setAdminError(err.message) }
  }

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0'

  return (
    <section id="reviews" className="py-12 sm:py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('客户评价', 'Customer Reviews')}</h2>
            {total > 0 && (
              <p className="text-gray-500 text-sm mt-1">{t('共 ', 'Total ')}{total}{t(' 条评价 · 平均评分 ', ' reviews · Avg ')}{avgRating}{t(' ⭐', ' ⭐')}</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => {
              if (!user) { router.push('/login'); return }
              setShowForm(true)
            }}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors shadow-sm">
              {t('写评价 ✍️', 'Write Review ✍️')}
            </button>
            {showAdminButton && (
              <button onClick={() => setShowAdminLogin(true)}
                className="text-gray-400 hover:text-blue-600 text-xs font-medium px-3 py-2 rounded-lg transition-colors" title={t('管理员', 'Admin')}>
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
          <ReviewList reviews={reviews} router={router} />
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-400 mb-3">{t('暂无评价', 'No reviews yet')}</p>
            <button onClick={() => {
              if (!user) { router.push('/login'); return }
              setShowForm(true)
            }}
              className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
              {t('成为第一个评价的人 →', 'Be the first to review →')}
            </button>
          </div>
        )}

        {/* 评价表单 Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setShowForm(false)}>
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
                <h3 className="text-lg font-bold text-gray-900">{t('写评价', 'Write a Review')}</h3>
                <button onClick={() => setShowForm(false)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
              <div className="p-6">
                <ReviewForm onClose={() => setShowForm(false)} onSubmitted={loadReviews} user={user} router={router} />
              </div>
            </div>
          </div>
        )}

        {/* Admin 登录 Modal */}
        {showAdminLogin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setShowAdminLogin(false)}>
            <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl p-6" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">{t('管理员登录', 'Admin Login')}</h3>
                <button onClick={() => setShowAdminLogin(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('邮箱', 'Email')}</label>
                  <input type="email" value={adminEmail} onChange={e => setAdminEmail(e.target.value)}
                    placeholder={t('管理员邮箱', 'Admin email')} required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('密码', 'Password')}</label>
                  <input type="password" value={adminPassword} onChange={e => setAdminPassword(e.target.value)}
                    placeholder={t('管理员密码', 'Admin password')} required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                {adminError && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">{adminError}</div>}
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors">
                  {t('登录管理后台', 'Login to Admin Panel')}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
