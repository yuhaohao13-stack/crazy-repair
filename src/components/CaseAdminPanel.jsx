'use client'
import { useEffect, useState } from 'react'
import { tagOrder } from '../lib/caseTags'

/**
 * /cases 页面的管理员发布入口
 * - 未登录：显示「管理员发布案例」按钮 → 登录框
 * - 已登录：可填 标题 / 品牌 / 文案 / 图片 / 抖音&YouTube 链接 → 发布
 * 发布后案例即时出现在 /cases（无需重新部署）
 */
export default function CaseAdminPanel() {
  const [open, setOpen] = useState(false)
  const [token, setToken] = useState('')

  // 登录
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loggingIn, setLoggingIn] = useState(false)
  const [loginError, setLoginError] = useState('')

  // 表单
  const [title, setTitle] = useState('')
  const [tag, setTag] = useState(tagOrder[0] || 'iPhone')
  const [content, setContent] = useState('')
  const [files, setFiles] = useState([])
  const [youtube, setYoutube] = useState('')
  const [douyin, setDouyin] = useState('')

  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [created, setCreated] = useState(null)
  const [list, setList] = useState([])
  const [listOpen, setListOpen] = useState(false)

  useEffect(() => {
    setToken(localStorage.getItem('crazy_admin_token') || '')
  }, [])

  const logout = () => {
    localStorage.removeItem('crazy_admin_token')
    setToken('')
    setList([])
  }

  const loadList = async (tok) => {
    if (!tok) return
    try {
      const r = await fetch('/api/cases/admin/list', { headers: { Authorization: `Bearer ${tok}` } })
      if (r.ok) {
        const j = await r.json()
        setList(j.cases || [])
      } else if (r.status === 401) {
        logout()
      }
    } catch {}
  }

  useEffect(() => {
    if (open && token) loadList(token)
  }, [open, token])

  const login = async () => {
    setLoggingIn(true)
    setLoginError('')
    try {
      const r = await fetch('/api/reviews/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const j = await r.json()
      if (!r.ok) {
        setLoginError(j.error || '登录失败')
        return
      }
      localStorage.setItem('crazy_admin_token', j.token)
      setToken(j.token)
      setPassword('')
    } catch {
      setLoginError('网络错误，请重试')
    } finally {
      setLoggingIn(false)
    }
  }

  const pickFiles = (e) => {
    const arr = Array.from(e.target.files || []).slice(0, 9)
    setFiles(arr)
  }

  const publish = async () => {
    setBusy(true)
    setError('')
    setCreated(null)
    try {
      let images = []
      if (files.length) {
        setStatus(`上传图片中（${files.length} 张）…`)
        const fd = new FormData()
        for (const f of files) fd.append('files', f)
        const r = await fetch('/api/cases/upload', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: fd,
        })
        const j = await r.json()
        if (!r.ok) {
          setError(j.error || '图片上传失败')
          return
        }
        images = j.urls || []
      }
      setStatus('发布中…')
      const r = await fetch('/api/cases/admin/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, tag, content, images, youtube_url: youtube, douyin_url: douyin }),
      })
      const j = await r.json()
      if (!r.ok) {
        setError(j.error || '发布失败')
        return
      }
      setCreated(j)
      setTitle('')
      setContent('')
      setFiles([])
      setYoutube('')
      setDouyin('')
      const input = document.getElementById('case-admin-file')
      if (input) input.value = ''
      loadList(token)
    } catch (e) {
      setError('网络错误：' + e.message)
    } finally {
      setBusy(false)
      setStatus('')
    }
  }

  const removeCase = async (id) => {
    if (!confirm('确定删除这条已发布案例？（不可恢复）')) return
    try {
      const r = await fetch('/api/cases/admin/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id }),
      })
      if (r.ok) loadList(token)
    } catch {}
  }

  const inputCls =
    'w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400'

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 backdrop-blur text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors border border-white/25"
      >
        <span>🔐</span> 管理员发布案例
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 sm:p-8">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">🔐 管理员发布维修案例</h3>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-700 text-xl leading-none">×</button>
            </div>

            <div className="p-5">
              {!token ? (
                <div className="space-y-3 max-w-sm mx-auto py-4">
                  <p className="text-sm text-gray-500">仅管理员可发布。请输入管理员账号登录。</p>
                  <input className={inputCls} type="email" placeholder="管理员邮箱" value={email} onChange={e => setEmail(e.target.value)} />
                  <input className={inputCls} type="password" placeholder="密码" value={password} onChange={e => setPassword(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') login() }} />
                  {loginError && <p className="text-sm text-red-600">{loginError}</p>}
                  <button onClick={login} disabled={loggingIn}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl">
                    {loggingIn ? '登录中…' : '登录'}
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>✅ 管理员已登录</span>
                    <div className="flex gap-3">
                      <button onClick={() => setListOpen(v => !v)} className="text-blue-600 hover:underline">
                        {listOpen ? '收起已发布' : `已发布（${list.length}）`}
                      </button>
                      <button onClick={logout} className="text-gray-400 hover:text-gray-700">退出登录</button>
                    </div>
                  </div>

                  {listOpen && (
                    <div className="border border-gray-100 rounded-xl divide-y divide-gray-50 max-h-48 overflow-y-auto">
                      {list.length === 0 && <p className="text-xs text-gray-400 p-3">还没有站内发布的案例</p>}
                      {list.map(c => (
                        <div key={c.id} className="flex items-center justify-between gap-2 px-3 py-2">
                          <a href={`/cases/${c.id}`} target="_blank" rel="noopener" className="text-xs text-gray-700 hover:text-blue-600 truncate">
                            {c.tag} · {c.title}
                          </a>
                          <button onClick={() => removeCase(c.id)} className="text-xs text-red-500 hover:text-red-700 shrink-0">删除</button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">标题 *</label>
                    <input className={inputCls} value={title} onChange={e => setTitle(e.target.value)} placeholder="如：iPhone 15 Pro 换屏维修（新加坡维修案例）" />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">品牌分类 *</label>
                    <select className={inputCls} value={tag} onChange={e => setTag(e.target.value)}>
                      {tagOrder.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">文案内容 *（支持 **加粗**、换行、- 列表）</label>
                    <textarea className={inputCls + ' min-h-[160px] font-mono'} value={content} onChange={e => setContent(e.target.value)}
                      placeholder="故障现象 / 检测过程 / 维修方法 / 结果 …" />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">图片（最多 9 张，每张 ≤5MB）</label>
                    <input id="case-admin-file" type="file" accept="image/*" multiple onChange={pickFiles}
                      className="block w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-blue-50 file:text-blue-700 file:font-semibold hover:file:bg-blue-100" />
                    {files.length > 0 && (
                      <p className="text-xs text-gray-400 mt-1">已选 {files.length} 张：{files.map(f => f.name).join('、')}</p>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">YouTube 链接（可选）</label>
                      <input className={inputCls} value={youtube} onChange={e => setYoutube(e.target.value)} placeholder="https://youtu.be/…" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">抖音链接（可选）</label>
                      <input className={inputCls} value={douyin} onChange={e => setDouyin(e.target.value)} placeholder="https://v.douyin.com/…" />
                    </div>
                  </div>

                  {error && <p className="text-sm text-red-600">{error}</p>}
                  {status && <p className="text-sm text-blue-600">{status}</p>}
                  {created && (
                    <div className="rounded-xl bg-green-50 border border-green-100 p-3 text-sm text-green-800">
                      ✅ 已发布！<a href={created.url} target="_blank" rel="noopener" className="font-semibold underline">点此查看案例</a>
                      <span className="text-green-600/80">（案例库已自动刷新）</span>
                    </div>
                  )}

                  <button onClick={publish} disabled={busy}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl">
                    {busy ? '处理中…' : '发布案例'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
