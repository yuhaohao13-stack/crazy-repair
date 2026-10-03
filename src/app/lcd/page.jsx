'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Monitor, Lock, Loader2, Cpu, CheckCircle2 } from 'lucide-react'
import { search, brandOf, groupKey, groupMachines } from '@/lib/lcd'
import db from '@/data/lcd-panels.json'

const SERIES = db.series || {}

function groupByBrand(list) {
  const g = {}
  for (const k of list) {
    const b = brandOf(k)
    if (!g[b]) g[b] = []
    g[b].push(k)
  }
  return Object.entries(g).sort((a, b) => b[1].length - a[1].length)
}

export default function LcdQueryPage() {
  const [user, setUser] = useState(null)
  const [checking, setChecking] = useState(true)
  const [q, setQ] = useState('')
  const [res, setRes] = useState(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('crazy_user_token')
    if (!token) { setChecking(false); return }
    fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (d?.user) setUser(d.user) })
      .catch(() => {})
      .finally(() => setChecking(false))
  }, [])

  const run = (e) => {
    e?.preventDefault()
    if (!q.trim()) return
    setBusy(true)
    setTimeout(() => { setRes(search(q)); setBusy(false) }, 120)
  }

  const samples = ['NV156FHM-N4V', 'LP140WH2', 'N156HCE-EAB', 'Inspiron 15 5510', '联想小新 15']

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm mb-2">
          <Monitor size={16} /> LCD Panel Cross-Reference
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">电脑液晶通用查询</h1>
        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
          输入<b>液晶编号</b>（如 NV156FHM-N4V）或<b>电脑型号</b>（如 Inspiron 15 5510），
          <br className="hidden sm:block" />
          查出可用液晶型号 + 对应电脑品牌机型。
        </p>
      </div>

      {checking ? (
        <div className="text-center text-gray-400 py-10"><Loader2 size={20} className="animate-spin inline" /></div>
      ) : !user ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3"><Lock size={22} /></div>
          <h2 className="font-bold text-gray-900">会员专享查询</h2>
          <p className="text-sm text-gray-500 mt-2 mb-5">液晶通用型号库开放给注册会员使用，注册即可免费查询。</p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl">免费注册</Link>
            <Link href="/login" className="border border-gray-300 hover:border-gray-400 text-gray-700 text-sm px-5 py-2.5 rounded-xl">登录</Link>
          </div>
        </div>
      ) : (
        <>
          <form onSubmit={run} className="bg-white border border-gray-200 rounded-2xl p-3 flex gap-2 shadow-sm">
            <input value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="输入液晶编号或电脑型号…"
              className="flex-1 px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400" />
            <button type="submit" disabled={busy}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 rounded-xl flex items-center gap-1.5 disabled:opacity-60">
              {busy ? <Loader2 size={15} className="animate-spin" /> : <Search size={15} />} 查询
            </button>
          </form>

          <div className="flex flex-wrap gap-2 mt-3 justify-center">
            {samples.map((s) => (
              <button key={s} onClick={() => { setQ(s); setRes(search(s)) }}
                className="text-[11px] text-gray-500 bg-gray-100 hover:bg-blue-50 hover:text-blue-600 px-2.5 py-1 rounded-full">{s}</button>
            ))}
          </div>

          {res && <Result res={res} />}
        </>
      )}
    </div>
  )
}

function Result({ res }) {
  if (res.kind === 'none') {
    return (
      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-800">
        库里暂时没有 <b>{res.query}</b> 的记录 —— 把实物丝印照片发给客服，我们补进库并回复你。
      </div>
    )
  }

  if (res.kind === 'panel') {
    const p = res.panel
    const groups = groupByBrand(res.compat)
    return (
      <div className="mt-6 space-y-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 text-green-600 text-xs font-semibold mb-1"><CheckCircle2 size={14} /> 已收录</div>
          <div className="text-xl font-bold text-gray-900">{p.code}</div>
          <div className="text-sm text-gray-500 mt-0.5">{p.brand}</div>
          <div className="flex flex-wrap gap-2 mt-3">
            {[p.group, `厚度 ≈${p.thick || '?'}mm`, p.touch ? '触摸屏' : '非触摸'].map((x, i) => (
              <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">{x}</span>
            ))}
          </div>
          {p.note && <div className="text-xs text-gray-500 mt-3">{p.note}</div>}
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div className="font-bold text-gray-900 text-sm mb-1">同规格可通用液晶（{res.compat.length} 个）</div>
          <div className="text-[11px] text-gray-400 mb-3">判据：尺寸 + 分辨率 + 接口 + 针脚数；装机前仍需核对出线朝向 / 耳位 / 厚度</div>
          <div className="space-y-3">
            {groups.map(([b, list]) => (
              <div key={b}>
                <div className="text-xs font-semibold text-gray-500 mb-1">{b}（{list.length}）</div>
                <div className="flex flex-wrap gap-1.5">
                  {list.map((k) => <span key={k} className="text-xs font-mono bg-gray-100 text-gray-700 px-2 py-0.5 rounded">{k}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div className="font-bold text-gray-900 text-sm mb-1">适用电脑品牌 / 机型</div>
          <div className="text-[11px] text-gray-400 mb-3">同规格机型均可使用（系列级参考，装机前核对实物）</div>
          <ul className="space-y-1.5">
            {groupMachines(p.group).map((m, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-700"><span className="text-blue-500">▪</span><span>{m}</span></li>
            ))}
          </ul>
          {groupMachines(p.group).length === 0 && <div className="text-sm text-gray-400">机型数据补充中，可把电脑型号发客服反查。</div>}
        </div>
      </div>
    )
  }

  // kind === 'machine'
  return (
    <div className="mt-6 space-y-4">
      {res.machines.map((m, i) => {
        const spec = { size: m.size, res: m.res, iface: m.iface, pins: m.pins, touch: m.touch }
        const g = groupKey(spec)
        const compat = Object.keys(SERIES).filter((k) => groupKey(SERIES[k]) === g)
        return (
          <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 text-blue-600 text-xs font-semibold mb-1"><Cpu size={14} /> 电脑机型</div>
            <div className="font-bold text-gray-900">{m.name}</div>
            <div className="flex flex-wrap gap-2 mt-3">
              {[g, m.touch ? '触摸屏' : '非触摸'].map((x, j) => (
                <span key={j} className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">{x}</span>
              ))}
            </div>
            {m.note && <div className="text-xs text-gray-500 mt-2">{m.note}</div>}
            {m.dellepart && <div className="text-xs text-gray-500 mt-1">原厂备件号：{m.dellepart}</div>}
            <div className="text-xs font-semibold text-gray-500 mt-4 mb-1">可用液晶（{compat.length} 个）</div>
            <div className="flex flex-wrap gap-1.5">
              {compat.map((k) => <span key={k} className="text-xs font-mono bg-gray-100 text-gray-700 px-2 py-0.5 rounded">{k}</span>)}
            </div>
          </div>
        )
      })}
    </div>
  )
}
