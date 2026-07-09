'use client'
import { useState } from 'react'
import { X, User, MapPin, Cake, Heart, FileText, Calendar, Mail } from 'lucide-react'

export default function UserProfileModal({ userId, onClose }) {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useState(() => {
    const token = localStorage.getItem('crazy_user_token')
    if (!token) { setError('未登录'); setLoading(false); return }

    fetch(`/api/users/profile?id=${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => {
        if (r.status === 403) { setError('无权限查看'); setLoading(false); return null }
        return r.json()
      })
      .then(d => {
        if (d && d.user) setProfile(d.user)
        else if (!error) setError('用户不存在')
      })
      .catch(() => setError('加载失败'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">用户资料</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
            <X size={18} className="text-gray-400" />
          </button>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="text-center py-6 text-gray-400 text-sm">加载中...</div>
          ) : error ? (
            <div className="text-center py-6">
              <User size={36} className="mx-auto text-gray-300 mb-2" />
              <p className="text-sm text-gray-400">{error}</p>
            </div>
          ) : profile ? (
            <div className="space-y-4">
              {/* 头像+用户名 */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User size={24} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">{profile.username}</p>
                  {profile.is_admin && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">管理员</span>}
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-gray-400 shrink-0" />
                  <span className="text-gray-500">手机号：</span>
                  <span className="text-gray-800 font-mono">{profile.phone}</span>
                </div>
                {profile.birth_place && (
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-gray-400 shrink-0" />
                    <span className="text-gray-500">出生地：</span>
                    <span className="text-gray-800">{profile.birth_place}</span>
                  </div>
                )}
                {profile.birth_date && (
                  <div className="flex items-center gap-2">
                    <Cake size={14} className="text-gray-400 shrink-0" />
                    <span className="text-gray-500">出生年月：</span>
                    <span className="text-gray-800">{profile.birth_date}</span>
                  </div>
                )}
                {profile.hobbies && (
                  <div className="flex items-center gap-2">
                    <Heart size={14} className="text-gray-400 shrink-0" />
                    <span className="text-gray-500">爱好：</span>
                    <span className="text-gray-800">{profile.hobbies}</span>
                  </div>
                )}
                {profile.bio && (
                  <div className="flex items-start gap-2">
                    <FileText size={14} className="text-gray-400 shrink-0 mt-0.5" />
                    <span className="text-gray-500">简介：</span>
                    <span className="text-gray-800">{profile.bio}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-gray-400 shrink-0" />
                  <span className="text-gray-500">注册时间：</span>
                  <span className="text-gray-800">{new Date(profile.created_at).toLocaleDateString('zh-CN')}</span>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
