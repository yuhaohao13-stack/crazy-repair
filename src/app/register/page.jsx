'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    username: '', phone: '', password: '', confirmPassword: '',
    birth_place: '', birth_date: '', bio: '', hobbies: '',
  })
  const [captcha, setCaptcha] = useState({ id: '', code: '', input: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
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
      setError('两次密码不一致')
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
      setError('注册失败，请稍后重试')
      fetchCaptcha()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <button onClick={() => router.push('/')} className="flex items-center gap-1 text-gray-500 hover:text-gray-700 mb-6 text-sm">
          <ArrowLeft size={16} /> 返回首页
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">注册账号</h1>
          <p className="text-sm text-gray-500 mb-6">注册后可发表评价和留言</p>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-4">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 必填区 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">用户名 *</label>
                <input type="text" name="username" value={form.username} onChange={handleChange}
                  placeholder="2-20位中英文或数字" required maxLength={20}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">手机号 *</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                  placeholder="11位手机号" required maxLength={15}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">密码 *</label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange}
                    placeholder="至少6位" required minLength={6}
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">确认密码 *</label>
                <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange}
                  placeholder="再次输入密码" required minLength={6}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            {/* 选填区 */}
            <div className="border-t border-gray-100 pt-4">
              <p className="text-xs text-gray-400 mb-3">选填信息</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">出生地</label>
                  <input type="text" name="birth_place" value={form.birth_place} onChange={handleChange}
                    placeholder="如：山东威海"
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">出生年月</label>
                  <input type="date" name="birth_date" value={form.birth_date} onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-xs font-medium text-gray-700 mb-1">个人简介</label>
                <textarea name="bio" value={form.bio} onChange={handleChange}
                  placeholder="简单介绍一下自己..." rows={2}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              </div>
              <div className="mt-4">
                <label className="block text-xs font-medium text-gray-700 mb-1">个人爱好</label>
                <input type="text" name="hobbies" value={form.hobbies} onChange={handleChange}
                  placeholder="如：数码、摄影、游戏"
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            {/* 验证码 */}
            <div className="border-t border-gray-100 pt-4">
              <label className="block text-xs font-medium text-gray-700 mb-1">验证码 *</label>
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 px-4 py-2 rounded-xl font-mono text-lg tracking-widest text-gray-800 select-none">
                  {captcha.code || '····'}
                </div>
                <input type="text" value={captcha.input} onChange={(e) => setCaptcha({ ...captcha, input: e.target.value })}
                  placeholder="输入验证码" required maxLength={4}
                  className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button type="button" onClick={fetchCaptcha}
                  className="text-xs text-blue-600 hover:text-blue-700 whitespace-nowrap">换一张</button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 rounded-xl transition-colors mt-2">
              {loading ? '注册中...' : '注册'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            已有账号？
            <button onClick={() => router.push('/login')} className="text-blue-600 hover:text-blue-700 font-medium ml-1">去登录</button>
          </p>
        </div>
      </div>
    </div>
  )
}
