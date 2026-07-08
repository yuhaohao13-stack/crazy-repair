'use client'
import { useState } from 'react'
import { ChevronRight, MessageCircle, Phone, MapPin, MessageSquare } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useSite } from '../lib/SiteContext'
import { WECHAT_ID, PHONE_CHINA, PHONE_SG, getSmsBody, smsUrl } from '../lib/contactData'

export default function ContactModal() {
  const { showContact: show, setShowContact: setShow, lang } = useSite()
  const pathname = usePathname()
  const [copied, setCopied] = useState(false)
  // 微信引导弹窗
  const [showWechatPrompt, setShowWechatPrompt] = useState(false)
  const [wechatCopied, setWechatCopied] = useState(false)
  const t = (zh, en) => lang === 'zh' ? zh : en

  if (!show) return null

  // 微信：复制 + 弹窗引导
  const handleWechat = () => {
    setWechatCopied(false)
    setShowWechatPrompt(true)
    setShow(false) // 关掉主弹窗

    const val = WECHAT_ID
    const doCopy = () => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(val)
      }
      return new Promise((resolve, reject) => {
        try {
          const ta = document.createElement('textarea')
          ta.value = val
          ta.style.position = 'fixed'
          ta.style.opacity = '0'
          document.body.appendChild(ta)
          ta.select()
          document.execCommand('copy')
          document.body.removeChild(ta)
          resolve()
        } catch(e) { reject(e) }
      })
    }

    doCopy().then(() => {
      setWechatCopied(true)
      try { window.location.href = 'weixin://' } catch(e) {}
    }).catch(() => {
      setWechatCopied(false)
    })
  }

  // 短信：直接跳转
  const handleSms = () => {
    const body = getSmsBody(pathname)
    window.location.href = smsUrl(PHONE_CHINA, body)
    setShow(false)
  }

  return (
    <>
      {/* 微信引导弹窗 */}
      {showWechatPrompt && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowWechatPrompt(false)}
        >
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center" onClick={e => e.stopPropagation()}
            style={{ animation: 'scaleIn 0.3s ease-out both' }}>
            <div className="text-5xl mb-4">💚</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t('添加微信', 'Add WeChat')}</h3>
            <p className="text-sm text-gray-500 mb-4">
              {t('微信号已复制，去微信添加好友吧', 'WeChat ID copied! Add me on WeChat')}
            </p>

            <div className="bg-gray-50 rounded-xl p-3 mb-4">
              <p className="text-[10px] text-gray-400 mb-1">{t('我的微信号', 'My WeChat ID')}</p>
              <p className="text-lg font-bold text-green-600 tracking-wider select-all">{WECHAT_ID}</p>
            </div>

            <div className="space-y-2 text-left text-sm text-gray-500 mb-5 ml-4">
              <p>① {t('微信号已复制 ✅', 'ID copied ✅')}</p>
              <p>② {t('打开微信App', 'Open WeChat app')}</p>
              <p>③ {t('点击「添加朋友」→ 粘贴 → 搜索', 'Tap "Add Friends" → Paste → Search')}</p>
              <p>④ {t('发送「咨询维修」，我会回复你', 'Send a message and I\'ll reply')}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowWechatPrompt(false)}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
              >
                {t('知道了', 'Got it')}
              </button>
              <button
                onClick={() => { try { window.location.href = 'weixin://' } catch(e) {} }}
                className="flex-1 py-3 rounded-xl bg-green-500 text-white font-medium hover:bg-green-600 transition-colors"
              >
                {t('打开微信', 'Open WeChat')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 主联系弹窗 */}
      <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4" onClick={() => setShow(false)}>
        <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
          <div className="text-center mb-6">
            <div className="text-4xl mb-3">🔧</div>
            <h3 className="text-xl font-bold text-gray-900">{t('联系我们', 'Contact Us')}</h3>
            <p className="text-sm text-gray-500 mt-1">{t('选择您方便的方式', 'Choose your preferred way')}</p>
          </div>
          <div className="space-y-4">

            {/* 📱 短信咨询 — 新增 */}
            <button onClick={handleSms}
              className="w-full flex items-center gap-4 p-4 rounded-2xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all text-left"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0"><MessageSquare size={24} className="text-blue-600" /></div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900">{t('📱 短信咨询', '📱 SMS')}</p>
                <p className="text-xs text-gray-500 truncate">
                  {t('一键发送短信，自动填写咨询内容', 'Pre-filled message, one tap to send')}
                </p>
              </div>
              <ChevronRight size={20} className="text-gray-400 shrink-0" />
            </button>

            {/* 💚 微信 — 改为复制+跳转 */}
            <button onClick={handleWechat}
              className="w-full flex items-center gap-4 p-4 rounded-2xl border border-gray-200 hover:border-green-300 hover:bg-green-50 cursor-pointer transition-all text-left"
            >
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0"><MessageCircle size={24} className="text-green-600" /></div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900">{t('💚 微信', '💚 WeChat')}</p>
                <p className="text-xs text-gray-500 truncate">
                  {t('复制微信号，去微信搜索添加', 'Copy ID and add on WeChat')}
                </p>
              </div>
              <ChevronRight size={20} className="text-gray-400 shrink-0" />
            </button>

            {/* 📞 中国电话 */}
            <a href="tel:+8613573735550"
              className="flex items-center gap-4 p-4 rounded-2xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0"><Phone size={24} className="text-blue-600" /></div>
              <div className="flex-1"><p className="font-semibold text-gray-900">{t('📞 中国电话', '📞 China Phone')}</p><p className="text-xs text-gray-500">+86 13573735550</p></div>
              <ChevronRight size={20} className="text-gray-400" />
            </a>

            {/* WhatsApp */}
            <a href="https://wa.me/6596146709?text=我想咨询手机电脑维修事宜" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-2xl border border-gray-200 hover:border-green-300 hover:bg-green-50 cursor-pointer transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0"><Phone size={24} className="text-green-600" /></div>
              <div className="flex-1"><p className="font-semibold text-gray-900">WhatsApp / {t('新加坡', 'Singapore')}</p><p className="text-xs text-gray-500">+65 96146709</p></div>
              <ChevronRight size={20} className="text-gray-400" />
            </a>

            {/* 到店地址 */}
            <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-200">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center shrink-0"><MapPin size={24} className="text-yellow-600" /></div>
              <div className="flex-1"><p className="font-semibold text-gray-900">{t('📍 到店维修', '📍 Visit Store')}</p><p className="text-xs text-gray-500">{t('威海环翠区西门31号', 'No.31 West Gate, Huancui')}</p></div>
            </div>
          </div>

          <button onClick={() => setShow(false)} className="mt-6 w-full py-3 rounded-xl bg-gray-100 text-gray-600 font-medium hover:bg-gray-200 transition-colors">
            {t('关闭', 'Close')}
          </button>
        </div>
      </div>
    </>
  )
}
