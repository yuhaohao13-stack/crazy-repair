'use client'
import { useState } from 'react'
import { useSite } from '../../lib/SiteContext'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Breadcrumb from '../../components/Breadcrumb'

export default function LoginPage() {
  const router = useRouter()
  const { lang } = useSite()
  const t = (zh, en) => lang === 'zh' ? zh : en
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login: login.trim(), password }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error)
        return
      }

      localStorage.setItem('crazy_user_token', data.token)
      router.push('/')
      router.refresh()
    } catch {
      setError(t('登录失败，请稍后重试', 'Login failed, please try again'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <Navbar />
      <div className="w-full max-w-sm">
        <Breadcrumb items={[{ label: '登录', labelEn: 'Log In' }]} />
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{t('登录', 'Log In')}</h1>
          <p className="text-sm text-gray-500 mb-6">{t('用用户名或手机号登录', 'Login with username or phone')}</p>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-4">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">{t('用户名或手机号', 'Username or Phone')}</label>
              <input type="text" value={login} onChange={(e) => setLogin(e.target.value)}
                placeholder={t('输入用户名或手机号', 'Enter username or phone')} required
                className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">{t('密码', 'Password')}</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('输入密码', 'Enter password')} required
                  className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 rounded-xl transition-colors">
              {loading ? t('登录中...', 'Logging in...') : t('登录', 'Log In')}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            {t('还没有账号？', 'No account yet?')}
            <button onClick={() => router.push('/register')} className="text-blue-600 hover:text-blue-700 font-medium ml-1">{t('去注册', 'Register')}</button>
          </p>
        </div>
      </div>
    </div>
  )
}
