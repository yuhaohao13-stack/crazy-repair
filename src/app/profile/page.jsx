'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, User, Mail, MapPin, Cake, Heart, FileText } from 'lucide-react'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [form, setForm] = useState({ birth_place: '', birth_date: '', bio: '', hobbies: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

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
          setForm({
            birth_place: data.user.birth_place || '',
            birth_date: data.user.birth_date || '',
            bio: data.user.bio || '',
            hobbies: data.user.hobbies || '',
          })
        }
      })
      .catch(() => { /* ignore */ })
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
      const res = await fetch('/api/users/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) {
        setMessage({ type: 'error', text: data.error })
        return
      }

      setMessage({ type: 'success', text: '保存成功' })
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    } catch {
      setMessage({ type: 'error', text: '保存失败' })
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
        <div className="text-gray-400">加载中...</div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <button onClick={() => router.push('/')} className="flex items-center gap-1 text-gray-500 hover:text-gray-700 mb-6 text-sm">
          <ArrowLeft size={16} /> 返回首页
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          {/* 用户信息头 */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
              <User size={28} className="text-blue-600" />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900">{user.username}</h1>
              <p className="text-sm text-gray-500">
                {user.phone ? user.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') : ''}
                {user.is_admin && <span className="ml-2 bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full">管理员</span>}
              </p>
            </div>
            <button onClick={handleLogout} className="text-xs text-red-500 hover:text-red-600 border border-red-200 px-3 py-1.5 rounded-lg">
              退出登录
            </button>
          </div>

          {message.text && (
            <div className={`text-sm p-3 rounded-xl mb-4 ${
              message.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
            }`}>
              {message.text}
            </div>
          )}

          {/* 只读信息 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
                <User size={12} /> 用户名
              </div>
              <div className="text-sm font-medium text-gray-800">{user.username}</div>
              <div className="text-xs text-gray-400 mt-0.5">不可修改</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
                <Mail size={12} /> 手机号
              </div>
              <div className="text-sm font-medium text-gray-800">{user.phone}</div>
              <div className="text-xs text-gray-400 mt-0.5">不可修改</div>
            </div>
          </div>

          {/* 可修改表单 */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-1 text-xs font-medium text-gray-700 mb-1">
                  <MapPin size={12} /> 出生地
                </label>
                <input type="text" name="birth_place" value={form.birth_place} onChange={handleChange}
                  placeholder="如：山东威海"
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="flex items-center gap-1 text-xs font-medium text-gray-700 mb-1">
                  <Cake size={12} /> 出生年月
                </label>
                <input type="date" name="birth_date" value={form.birth_date} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-1 text-xs font-medium text-gray-700 mb-1">
                <FileText size={12} /> 个人简介
              </label>
              <textarea name="bio" value={form.bio} onChange={handleChange}
                placeholder="介绍一下自己..." rows={3}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
            </div>

            <div>
              <label className="flex items-center gap-1 text-xs font-medium text-gray-700 mb-1">
                <Heart size={12} /> 个人爱好
              </label>
              <input type="text" name="hobbies" value={form.hobbies} onChange={handleChange}
                placeholder="如：数码、摄影、游戏"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <button type="submit" disabled={saving}
              className="flex items-center justify-center gap-1 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 rounded-xl transition-colors">
              <Save size={16} />
              {saving ? '保存中...' : '保存修改'}
            </button>
          </form>

          {/* 注册时间 */}
          <p className="text-xs text-gray-400 text-center mt-6">
            注册时间：{user.created_at ? new Date(user.created_at).toLocaleDateString('zh-CN') : '未知'}
          </p>
        </div>
      </div>
    </div>
  )
}
