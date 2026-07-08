'use client'
import { useState } from 'react'
import { ChevronRight, MessageCircle, Phone, MapPin, MessageSquare } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useSite } from '../lib/SiteContext'
import { WECHAT_ID, PHONE_CHINA, getSmsBody, smsUrl } from '../lib/contactData'

export default function ContactModal() {
  const { showContact: show, setShowContact: setShow, lang } = useSite()
  const pathname = usePathname()
  const t = (zh, en) => lang === 'zh' ? zh : en

  // 微信引导弹窗
  const [showWechatPrompt, setShowWechatPrompt] = useState(false)
  const [wechatCopied, setWechatCopied] = useState(false)
  // 保存二维码
  const [savingQr, setSavingQr] = useState(false)
  const [qrSaved, setQrSaved] = useState(false)

  // 微信：复制 + 弹窗引导
  const handleWechat = () => {
    setWechatCopied(false)
    setShowWechatPrompt(true)

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
    }).catch(() => {
      setWechatCopied(false)
    })
  }

  // 保存二维码到相册
  const saveQrToAlbum = async () => {
    setSavingQr(true)
    try {
      const res = await fetch('/images/wechat-qr.jpg')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'Crazy维修微信二维码.jpg'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      setTimeout(() => URL.revokeObjectURL(url), 5000)
      setQrSaved(true)
      setTimeout(() => setQrSaved(false), 3000)
    } catch(e) {
      setQrSaved(true)
      setTimeout(() => setQrSaved(false), 3000)
    }
    setSavingQr(false)
  }

  // 短信：直接跳转
  const handleSms = () => {
    const body = getSmsBody(pathname)
    window.location.href = smsUrl(PHONE_CHINA, body)
  }

  return (
    <>
      {/* ========== 微信引导弹窗（独立于主弹窗） ========== */}
      {showWechatPrompt && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowWechatPrompt(false)}
        >
          <div className="bg-white rounded-2xl p-4 max-w-xs w-full shadow-2xl text-center" onClick={e => e.stopPropagation()}
            style={{ animation: 'scaleIn 0.3s ease-out both' }}>
            <div className="text-3xl mb-2">💚</div>
            <h3 className="text-base font-bold text-gray-900 mb-1">{t('添加微信', 'Add WeChat')}</h3>
            <p className="text-xs text-gray-400 mb-3">
              {t('长按二维码直接添加，或在微信搜索微信号', 'Long press QR to add, or search WeChat ID')}
            </p>

            {/* 微信二维码 */}
            <div className="mb-3 flex justify-center flex-col items-center">
              <img src="/images/wechat-qr.jpg" alt="微信二维码"
                className="w-32 h-32 rounded-xl border border-gray-200 shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                onClick={saveQrToAlbum} />
              <button onClick={saveQrToAlbum}
                className="mt-1.5 text-[10px] text-blue-500 hover:text-blue-600 font-medium"
              >
                {savingQr
                  ? t('保存中...', 'Saving...')
                  : qrSaved
                    ? t('✅ 已保存到相册', '✅ Saved to album')
                    : t('📥 点击保存到相册', '📥 Save QR')
                }
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-2.5 mb-3">
              <p className="text-[9px] text-gray-400 mb-0.5">{t('或复制微信号搜索', 'Or copy WeChat ID')}</p>
              <p className="text-base font-bold text-green-600 tracking-wider select-all">{WECHAT_ID}</p>
            </div>

            <div className="space-y-1 text-left text-[11px] text-gray-400 mb-3 ml-3">
              <p>① {t('微信号已复制 ✅', 'ID copied ✅')}</p>
              <p>② {t('打开微信 → 添加朋友 → 粘贴搜索', 'WeChat → Add Friends → Paste')}</p>
              <p>③ {t('发送「咨询维修」即可', 'Send a message to start')}</p>
            </div>

            <div className="flex gap-2.5">
              <button
                onClick={() => setShowWechatPrompt(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-500 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                {t('知道了', 'Got it')}
              </button>
              <button
                onClick={() => { try { window.location.href = 'weixin://' } catch(e) {} }}
                className="flex-1 py-2.5 rounded-xl bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-colors"
              >
                {t('打开微信', 'Open WeChat')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========== 主联系弹窗（缩小版） ========== */}
      {show && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4" onClick={() => setShow(false)}>
          <div className="bg-white rounded-2xl p-4 sm:p-5 max-w-xs w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="text-center mb-3">
              <div className="text-3xl mb-2">🔧</div>
              <h3 className="text-base font-bold text-gray-900">{t('联系我们', 'Contact Us')}</h3>
              <p className="text-xs text-gray-400 mt-0.5">{t('选择您方便的方式', 'Choose your preferred way')}</p>
            </div>
            <div className="space-y-2.5">

              {/* 📱 短信咨询 */}
              <button onClick={handleSms}
                className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all text-left"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0"><MessageSquare size={18} className="text-blue-600" /></div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-gray-900">{t('📱 短信咨询', '📱 SMS')}</p>
                  <p className="text-[10px] text-gray-400 truncate">
                    {t('一键发送短信，自动填写咨询内容', 'Pre-filled message, one tap to send')}
                  </p>
                </div>
                <ChevronRight size={16} className="text-gray-300 shrink-0" />
              </button>

              {/* 💚 微信 */}
              <button onClick={handleWechat}
                className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-green-300 hover:bg-green-50 cursor-pointer transition-all text-left"
              >
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0"><MessageCircle size={18} className="text-green-600" /></div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-gray-900">{t('💚 微信', '💚 WeChat')}</p>
                  <p className="text-[10px] text-gray-400 truncate">
                    {t('复制微信号，去微信搜索添加', 'Copy ID and add on WeChat')}
                  </p>
                </div>
                <ChevronRight size={16} className="text-gray-300 shrink-0" />
              </button>

              {/* 📞 中国电话 */}
              <a href="tel:+8613573735550"
                className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0"><Phone size={18} className="text-blue-600" /></div>
                <div className="flex-1"><p className="font-semibold text-sm text-gray-900">{t('📞 中国电话', '📞 China Phone')}</p><p className="text-[10px] text-gray-400">+86 13573735550</p></div>
                <ChevronRight size={16} className="text-gray-300" />
              </a>

              {/* WhatsApp */}
              <a href="https://wa.me/6596146709?text=我想咨询手机电脑维修事宜" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-green-300 hover:bg-green-50 cursor-pointer transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0"><Phone size={18} className="text-green-600" /></div>
                <div className="flex-1"><p className="font-semibold text-sm text-gray-900">WhatsApp</p><p className="text-[10px] text-gray-400">+65 96146709</p></div>
                <ChevronRight size={16} className="text-gray-300" />
              </a>

              {/* 到店地址 */}
              <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-200">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center shrink-0"><MapPin size={18} className="text-yellow-600" /></div>
                <div className="flex-1"><p className="font-semibold text-sm text-gray-900">{t('📍 到店维修', '📍 Visit Store')}</p><p className="text-[10px] text-gray-400">{t('威海环翠区西门31号', 'No.31 West Gate, Huancui')}</p></div>
              </div>
            </div>

            <button onClick={() => setShow(false)} className="mt-4 w-full py-2.5 rounded-xl bg-gray-100 text-gray-500 text-sm font-medium hover:bg-gray-200 transition-colors">
              {t('关闭', 'Close')}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
