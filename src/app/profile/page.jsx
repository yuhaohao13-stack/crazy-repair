'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '../../components/Navbar'
import Breadcrumb from '../../components/Breadcrumb'
import { Save, User, Mail, MapPin, Cake, Heart, FileText } from 'lucide-react'
import { useSite } from '../../lib/SiteContext'

export default function ProfilePage() {
  const { lang } = useSite()
  const t = (zh, en) => lang === 'zh' ? zh : en
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [form, setForm] = useState({
    birth_place: '',
    birth_year: '',
    birth_month: '',
    birth_day: '',
    bio: '',
    hobbies: '',
    gender: 'male'
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1949 }, (_, i) => (currentYear - i).toString())
  const months = Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1).padStart(2, '0'),
    label: t(`${i + 1}月`, `${i + 1}`)
  }))
  const days = Array.from({ length: 31 }, (_, i) => ({
    value: String(i + 1).padStart(2, '0'),
    label: t(`${i + 1}日`, `${i + 1}`)
  }))

  useEffect(() => {
    const token = localStorage.getItem('crazy_user_token')
    if (!token) {
      router.push('/login')
      return
    }
    fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (res.status === 401) {
          localStorage.removeItem('crazy_user_token')
          router.push('/login')
          return null
        }
        return res.json()
      })
      .then(data => {
        if (data && data.user) {
          setUser(data.user)
          let birthYear = '', birthMonth = '', birthDay = ''
          if (data.user.birth_date) {
            const parts = data.user.birth_date.split('-')
            birthYear = parts[0] || ''
            birthMonth = parts[1] || ''
            birthDay = parts[2] || ''
          }
          setForm({
            birth_place: data.user.birth_place || '',
            birth_year: birthYear,
            birth_month: birthMonth,
            birth_day: birthDay,
            bio: data.user.bio || '',
            hobbies: data.user.hobbies || '',
            gender: data.user.gender || 'male',
          })
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [router])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage({ type: '', text: '' })

    try {
      const token = localStorage.getItem('crazy_user_token')
      let birthDate = ''
      if (form.birth_year) {
        birthDate = form.birth_year
        if (form.birth_month) {
          birthDate += '-' + form.birth_month
          if (form.birth_day) {
            birthDate += '-' + form.birth_day
          }
        }
      }

      const res = await fetch('/api/users/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          birth_place: form.birth_place,
          birth_date: birthDate,
          bio: form.bio,
          hobbies: form.hobbies,
          gender: form.gender,
        }),
      })
      const data = await res.json()

      if (!res.ok) {
        setMessage({ type: 'error', text: data.error || t('修改失败', 'Save failed') })
        return
      }

      setMessage({ type: 'success', text: t('保存成功', 'Saved') })
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    } catch (err) {
      setMessage({ type: 'error', text: t('修改失败，请稍后重试', 'Save failed, try again') })
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('crazy_user_token')
    router.push('/')
    router.refresh()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-400">{t('加载中...', 'Loading...')}</div>
      </div>
    )
  }

  if (!user) return null

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <Breadcrumb items={[{ label: '个人中心', labelEn: 'Profile' }]} />

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
              <User size={28} className="text-blue-600" />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900">{user.username}</h1>
              <p className="text-sm text-gray-500">
                {user.phone ? user.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') : ''}
                {user.is_admin && <span className="ml-2 bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full">{t('管理员', 'Admin')}</span>}
              </p>
            </div>
            <button onClick={handleLogout} className="text-xs text-red-500 hover:text-red-600 border border-red-200 px-3 py-1.5 rounded-lg">
              {t('退出登录', 'Log Out')}
            </button>
          </div>

          {message.text && (
            <div className={`text-sm p-3 rounded-xl mb-4 ${
              message.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
            }`}>
              {message.text}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
                <User size={12} /> {t('用户名', 'Username')}
              </div>
              <div className="text-sm font-medium text-gray-800">{user.username}</div>
              <div className="text-xs text-gray-400 mt-0.5">{t('不可修改', 'Cannot be changed')}</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
                <Mail size={12} /> {t('手机号', 'Phone')}
              </div>
              <div className="text-sm font-medium text-gray-800">{user.phone}</div>
              <div className="text-xs text-gray-400 mt-0.5">{t('不可修改', 'Cannot be changed')}</div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-1 text-xs font-medium text-gray-700 mb-1">
                  <MapPin size={12} /> {t('出生地', 'Birthplace')}
                </label>
                <input type="text" name="birth_place" value={form.birth_place} onChange={handleChange}
                  placeholder={t('如：山东威海', 'e.g. Weihai')}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="flex items-center gap-1 text-xs font-medium text-gray-700 mb-1">{t('性别', 'Gender')}</label>
                <div className="flex gap-2">
                  <label className={`flex-1 flex items-center justify-center p-2.5 rounded-xl border cursor-pointer text-sm font-medium ${
                    form.gender === 'male' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 text-gray-500'
                  }`}>
                    <input type="radio" name="gender" value="male"
                      checked={form.gender === 'male'}
                      onChange={e => setForm({...form, gender: e.target.value})}
                      className="hidden" />
                    ♂ {t('男', 'Male')}
                  </label>
                  <label className={`flex-1 flex items-center justify-center p-2.5 rounded-xl border cursor-pointer text-sm font-medium ${
                    form.gender === 'female' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 text-gray-500'
                  }`}>
                    <input type="radio" name="gender" value="female"
                      checked={form.gender === 'female'}
                      onChange={e => setForm({...form, gender: e.target.value})}
                      className="hidden" />
                    ♀ {t('女', 'Female')}
                  </label>
                </div>
              </div>
            </div>

            {/* 出生年月日：年 + 月 + 日 三个下拉框 */}
            <div>
              <label className="flex items-center gap-1 text-xs font-medium text-gray-700 mb-1.5">
                <Cake size={12} /> {t('出生年月日', 'Birth Date')}
              </label>
              <div className="flex gap-2">
                <select name="birth_year" value={form.birth_year} onChange={handleChange}
                  className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  <option value="">{t('年', 'Y')}</option>
                  {years.map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
                <select name="birth_month" value={form.birth_month} onChange={handleChange}
                  className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  <option value="">{t('月', 'M')}</option>
                  {months.map(m => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
                <select name="birth_day" value={form.birth_day} onChange={handleChange}
                  className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  <option value="">{t('日', 'D')}</option>
                  {days.map(d => (
                    <option key={d.value} value={d.value}>{d.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-1 text-xs font-medium text-gray-700 mb-1">
                <FileText size={12} /> {t('个人简介', 'Bio')}
              </label>
              <textarea name="bio" value={form.bio} onChange={handleChange}
                placeholder={t('介绍一下自己...', 'Tell us about yourself...')} rows={3}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
            </div>

            <div>
              <label className="flex items-center gap-1 text-xs font-medium text-gray-700 mb-1">
                <Heart size={12} /> {t('个人爱好', 'Hobbies')}
              </label>
              <input type="text" name="hobbies" value={form.hobbies} onChange={handleChange}
                placeholder={t('如：数码、摄影', 'e.g. tech, photography')}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <button type="submit" disabled={saving}
              className="flex items-center justify-center gap-1 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 rounded-xl transition-colors">
              <Save size={16} />
              {saving ? t('保存中...', 'Saving...') : t('保存修改', 'Save Changes')}
            </button>
          </form>

          <p className="text-xs text-gray-400 text-center mt-6">
            {t('注册时间：', 'Registered: ')}{user.created_at ? new Date(user.created_at).toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US') : t('未知', 'Unknown')}
          </p>
        </div>
      </div>
    </div>
    </>
  )
}
