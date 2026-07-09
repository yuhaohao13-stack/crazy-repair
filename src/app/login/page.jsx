'use client'
import { useState, useEffect, useCallback } from 'react'
import { useSite } from '../../lib/SiteContext'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, ArrowLeft, Sparkles } from 'lucide-react'
import PhoneInput from '../../components/PhoneInput'
import Navbar from '../../components/Navbar'
import Breadcrumb from '../../components/Breadcrumb'

export default function LoginPage() {
  const router = useRouter()
  const { lang } = useSite()
  const t = (zh, en) => lang === 'zh' ? zh : en

  // 登录表单
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // 忘记密码
  const [showReset, setShowReset] = useState(false)
  const [resetStep, setResetStep] = useState(1) // 1=手机号, 2=身份验证, 3=新密码
  const [resetPhone, setResetPhone] = useState('')
  const [resetPhoneCode, setResetPhoneCode] = useState('86')
  const [resetBirthPlace, setResetBirthPlace] = useState('')
  const [resetBirthDate, setResetBirthDate] = useState('')
  const [resetNewPassword, setResetNewPassword] = useState('')
  const [resetConfirmPassword, setResetConfirmPassword] = useState('')
  const [resetShowPassword, setResetShowPassword] = useState(false)
  const [resetError, setResetError] = useState('')
  const [resetSuccess, setResetSuccess] = useState(false)
  const [resetting, setResetting] = useState(false)
  const [captcha, setCaptcha] = useState({ id: '', code: '', input: '' })

  const fetchCaptcha = useCallback(async () => {
    try {
      const res = await fetch('/api/reviews/captcha')
      const data = await res.json()
      setCaptcha({ id: data.captchaId, code: data.code, input: '' })
    } catch { /* ignore */ }
  }, [])

  useEffect(() => { if (showReset) fetchCaptcha() }, [showReset, fetchCaptcha])

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

  const handleResetPhone = (e) => {
    e.preventDefault()
    if (!resetPhone.trim()) {
      setResetError(t('请输入手机号', 'Please enter your phone number'))
      return
    }
    setResetError('')
    setResetStep(2)
  }

  const handleResetVerify = (e) => {
    e.preventDefault()
    if (!resetBirthPlace.trim() || !resetBirthDate.trim()) {
      setResetError(t('请填写完整的身份信息', 'Please fill in all identity info'))
      return
    }
    setResetError('')
    setResetStep(3)
    fetchCaptcha()
  }

  const handleResetSubmit = async (e) => {
    e.preventDefault()
    setResetError('')

    if (resetNewPassword.length < 6) {
      setResetError(t('新密码至少6位', 'New password must be at least 6 characters'))
      return
    }
    if (resetNewPassword !== resetConfirmPassword) {
      setResetError(t('两次密码不一致', 'Passwords do not match'))
      return
    }
    if (!captcha.input) {
      setResetError(t('请完成验证码', 'Please complete the captcha'))
      return
    }

    setResetting(true)
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: '+' + resetPhoneCode + resetPhone.trim(),
          birth_place: resetBirthPlace.trim(),
          birth_date: resetBirthDate.trim(),
          newPassword: resetNewPassword,
          captchaId: captcha.id,
          captchaValue: captcha.input,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setResetError(data.error); fetchCaptcha(); return }
      setResetSuccess(true)
    } catch {
      setResetError(t('密码重置失败，请稍后重试', 'Reset failed, please try again'))
      fetchCaptcha()
    } finally {
      setResetting(false)
    }
  }

  const handleBackToLogin = () => {
    setShowReset(false)
    setResetStep(1)
    setResetPhone('')
    setResetPhoneCode('86')
    setResetBirthPlace('')
    setResetBirthDate('')
    setResetNewPassword('')
    setResetConfirmPassword('')
    setResetError('')
    setResetSuccess(false)
    setError('')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-8">
        {showReset ? (
          // ========== 忘记密码流程 ==========
          <div className="w-full max-w-sm">
            <button onClick={handleBackToLogin} className="flex items-center gap-1 text-gray-500 hover:text-gray-700 mb-6 text-sm">
              <ArrowLeft size={16} /> {t('返回登录', '← Back to Login')}
            </button>
            <Breadcrumb items={[{ label: '重置密码', labelEn: 'Reset Password' }]} />

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              {resetSuccess ? (
                <div className="text-center py-4">
                  <div className="text-4xl mb-3">✅</div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{t('密码重置成功', 'Password Reset')}</h2>
                  <p className="text-sm text-gray-500 mb-4">{t('请使用新密码登录', 'Please log in with your new password')}</p>
                  <button onClick={handleBackToLogin}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-xl transition-colors">
                    {t('去登录', 'Go to Login')}
                  </button>
                </div>
              ) : (
                <>
                  {/* 步骤指示器 */}
                  <div className="flex items-center gap-2 mb-6">
                    {[1, 2, 3].map(s => (
                      <div key={s} className="flex items-center gap-2 flex-1">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                          resetStep >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                        }`}>{s}</div>
                        {s < 3 && <div className={`flex-1 h-0.5 ${resetStep > s ? 'bg-blue-600' : 'bg-gray-200'}`} />}
                      </div>
                    ))}
                  </div>

                  {resetError && (
                    <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-4">{resetError}</div>
                  )}

                  {/* 第1步：手机号 */}
                  {resetStep === 1 && (
                    <form onSubmit={handleResetPhone} className="space-y-4">
                      <h2 className="text-lg font-bold text-gray-900">{t('输入手机号', 'Enter Phone Number')}</h2>
                      <p className="text-xs text-gray-500">{t('填写注册时使用的手机号', 'Enter the phone number you registered with')}</p>
                      <div>
                        <PhoneInput
                          value={{ code: resetPhoneCode, number: resetPhone }}
                          onChange={(v) => { setResetPhoneCode(v.code); setResetPhone(v.number) }}
                          label={t('手机号', 'Phone Number')}
                          required
                          lang={lang}
                        />
                      </div>
                      <button type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors">
                        {t('下一步', 'Next')}
                      </button>
                    </form>
                  )}

                  {/* 第2步：身份验证 */}
                  {resetStep === 2 && (
                    <form onSubmit={handleResetVerify} className="space-y-4">
                      <h2 className="text-lg font-bold text-gray-900">{t('验证身份', 'Verify Identity')}</h2>
                      <p className="text-xs text-gray-500">{t('填写注册时填写的出生地和出生年月', 'Enter your registered birthplace and birth date')}</p>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">{t('出生地', 'Birthplace')}</label>
                        <input type="text" value={resetBirthPlace} onChange={e => setResetBirthPlace(e.target.value)}
                          placeholder={t('如：山东威海', 'e.g. Weihai, Shandong')} required
                          className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">{t('出生年月', 'Birth Date')}</label>
                        <input type="date" value={resetBirthDate} onChange={e => setResetBirthDate(e.target.value)} required
                          className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <button type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors">
                        {t('下一步', 'Next')}
                      </button>
                      <button type="button" onClick={() => { setResetStep(1); setResetError('') }}
                        className="w-full text-sm text-gray-500 hover:text-gray-700 py-2">{t('返回修改手机号', '← Change phone number')}</button>
                    </form>
                  )}

                  {/* 第3步：重置密码 */}
                  {resetStep === 3 && (
                    <form onSubmit={handleResetSubmit} className="space-y-4">
                      <h2 className="text-lg font-bold text-gray-900">{t('设置新密码', 'Set New Password')}</h2>
                      <p className="text-xs text-gray-500">{t('设置新密码后请牢记', 'Choose a new password you can remember')}</p>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">{t('新密码', 'New Password')}</label>
                        <div className="relative">
                          <input type={resetShowPassword ? 'text' : 'password'} value={resetNewPassword}
                            onChange={e => setResetNewPassword(e.target.value)}
                            placeholder={t('至少6位', 'At least 6 characters')} required minLength={6}
                            className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10" />
                          <button type="button" onClick={() => setResetShowPassword(!resetShowPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                            {resetShowPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">{t('确认密码', 'Confirm Password')}</label>
                        <input type="password" value={resetConfirmPassword} onChange={e => setResetConfirmPassword(e.target.value)}
                          placeholder={t('再次输入新密码', 'Re-enter new password')} required minLength={6}
                          className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                      {/* 验证码 */}
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">{t('验证码 *', 'Captcha *')}</label>
                        <div className="flex items-center gap-3">
                          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl px-4 py-2 select-none">
                            <span className="text-lg font-bold tracking-[0.3em] text-blue-700 font-mono">{captcha.code || '····'}</span>
                          </div>
                          <input type="text" value={captcha.input} onChange={e => setCaptcha(prev => ({ ...prev, input: e.target.value }))}
                            placeholder={t('输入验证码', 'Enter code')} required maxLength={4}
                            className="w-24 border border-gray-200 rounded-xl px-3 py-2 text-sm text-center tracking-widest focus:ring-2 focus:ring-blue-500 outline-none" />
                          <button type="button" onClick={fetchCaptcha} className="p-2 text-gray-400 hover:text-blue-600" title={t('刷新', 'Refresh')}>
                            <Sparkles size={16} />
                          </button>
                        </div>
                      </div>
                      <button type="submit" disabled={resetting}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 rounded-xl transition-colors">
                        {resetting ? t('重置中...', 'Resetting...') : t('重置密码', 'Reset Password')}
                      </button>
                      <button type="button" onClick={() => { setResetStep(2); setResetError('') }}
                        className="w-full text-sm text-gray-500 hover:text-gray-700 py-2">{t('返回修改身份信息', '← Change identity info')}</button>
                    </form>
                  )}
                </>
              )}
            </div>
          </div>
        ) : (
          // ========== 登录表单 ==========
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

              {/* 忘记密码 */}
              <div className="text-center mt-4">
                <button onClick={() => setShowReset(true)}
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline font-medium">
                  {t('忘记密码？', 'Forgot password?')}
                </button>
              </div>

              <p className="text-center text-sm text-gray-500 mt-4">
                {t('还没有账号？', 'No account yet?')}
                <button onClick={() => router.push('/register')} className="text-blue-600 hover:text-blue-700 font-medium ml-1">{t('去注册', 'Register')}</button>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
