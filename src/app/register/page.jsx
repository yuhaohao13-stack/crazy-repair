'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Breadcrumb from '../../components/Breadcrumb'
import { useSite } from '../../lib/SiteContext'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    username: '', phone: '', password: '', confirmPassword: '',
    birth_place: '', birth_date: '', bio: '', hobbies: '',
  })
  const [captcha, setCaptcha] = useState({ id: '', code: '', input: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const { lang } = useSite()
  const t = (zh, en) => lang === 'zh' ? zh : en

  const [loading, setLoading] = useState(false)

  const fetchCaptcha = async () => {
    try {
      const res = await fetch('/api/reviews/captcha')
      const data = await res.json()
      setCaptcha({ id: data.captchaId, code: data.code, input: '' })
    } catch { /* ignore */ }
  }

  useEffect(() => { fetchCaptcha() }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirmPassword) {
      setError(t('两次密码不一致', 'Passwords do not match'))
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
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

      // 保存token并跳转
      localStorage.setItem('crazy_user_token', data.token)
      router.push('/')
      router.refresh()
    } catch {
      setError(t('注册失败，请稍后重试', 'Registration failed, please try again'))
      fetchCaptcha()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <Navbar />
      <div className="w-full max-w-md">
        <Breadcrumb items={[{ label: '注册', labelEn: 'Register' }]} />

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{t('注册账号', 'Register')}</h1>
          <p className="text-sm text-gray-500 mb-6">{t('注册后可发表评价和留言', 'Register to leave reviews & messages')}</p>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-4">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 必填区 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">{t('用户名 *', 'Username *')}</label>
                <input type="text" name="username" value={form.username} onChange={handleChange}
                  placeholder={t('2-20位中英文或数字', '2-20 chars, letters/numbers')} required maxLength={20}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">{t('手机号 *', 'Phone *')}</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                  placeholder={t('11位手机号', '11-digit phone number')} required maxLength={15}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">{t('密码 *', 'Password *')}</label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange}
                    placeholder={t('至少6位', 'At least 6 chars')} required minLength={6}
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">{t('确认密码 *', 'Confirm Password *')}</label>
                <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange}
                  placeholder={t('再次输入密码', 'Re-enter password')} required minLength={6}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            {/* 选填区 */}
            <div className="border-t border-gray-100 pt-4">
              <p className="text-xs text-gray-400 mb-3">{t('选填信息', 'Optional Info')}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">{t('出生地', 'Birthplace')}</label>
                  <input type="text" name="birth_place" value={form.birth_place} onChange={handleChange}
                    placeholder={t('如：山东威海', 'e.g. Weihai, Shandong')}
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">{t('出生年月', 'Birth Date')}</label>
                  <input type="date" name="birth_date" value={form.birth_date} onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-xs font-medium text-gray-700 mb-1">{t('个人简介', 'Bio')}</label>
                <textarea name="bio" value={form.bio} onChange={handleChange}
                  placeholder={t('简单介绍一下自己...', 'Tell us about yourself...')} rows={2}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              </div>
              <div className="mt-4">
                <label className="block text-xs font-medium text-gray-700 mb-1">{t('个人爱好', 'Hobbies')}</label>
                <input type="text" name="hobbies" value={form.hobbies} onChange={handleChange}
                  placeholder={t('如：数码、摄影、游戏', 'e.g. tech, photography, gaming')}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            {/* 验证码 */}
            <div className="border-t border-gray-100 pt-4">
              <label className="block text-xs font-medium text-gray-700 mb-1">{t('验证码 *', 'Captcha *')}</label>
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 px-4 py-2 rounded-xl font-mono text-lg tracking-widest text-gray-800 select-none">
                  {captcha.code || '····'}
                </div>
                <input type="text" value={captcha.input} onChange={(e) => setCaptcha({ ...captcha, input: e.target.value })}
                  placeholder={t('输入验证码', 'Enter code')} required maxLength={4}
                  className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button type="button" onClick={fetchCaptcha}
                  className="text-xs text-blue-600 hover:text-blue-700 whitespace-nowrap">{t('换一张', 'Refresh')}</button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 rounded-xl transition-colors mt-2">
              {loading ? t('注册中...', 'Registering...') : t('注册', 'Register')}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            {t('已有账号？', 'Already have an account?')}
            <button onClick={() => router.push('/login')} className="text-blue-600 hover:text-blue-700 font-medium ml-1">{t('去登录', 'Log in')}</button>
          </p>
        </div>
      </div>
    </div>
  )
}
