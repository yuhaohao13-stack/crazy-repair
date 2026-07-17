'use client'
import { useState, useRef, useEffect } from 'react'
import { MessageCircle, Heart, X, Copy } from 'lucide-react'
import { useSite } from '../lib/SiteContext'
import { WECHAT_ID, EMAIL_QQ, EMAIL_GMAIL } from '../lib/contactData'

export default function FloatingContact() {
  const { lang } = useSite()
  const [expanded, setExpanded] = useState(false)
  const [showDonate, setShowDonate] = useState(false)
  const [showWechatQR, setShowWechatQR] = useState(false)
  const [showAlipayQR, setShowAlipayQR] = useState(false)
  const [showPayNowQR, setShowPayNowQR] = useState(false)

  // 微信弹窗
  const [showWechatPrompt, setShowWechatPrompt] = useState(false)
  const [copied, setCopied] = useState('')
  const [wechatCopied, setWechatCopied] = useState(false)

  const t = (zh, en) => lang === 'zh' ? zh : en

  const menuRef = useRef(null)

  // 点击外部自动收起
  useEffect(() => {
    if (!expanded) return
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setExpanded(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [expanded])

  // 微信：复制微信号 + 弹窗引导
  const handleWechat = () => {
    setWechatCopied(false)
    setShowWechatPrompt(true)
    setExpanded(false)

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
  const [savingQr, setSavingQr] = useState(false)
  const [qrSaved, setQrSaved] = useState(false)
  // 点击微信号：复制 + 显示已复制（同步版）
  const copyWechatId = () => {
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
      setTimeout(() => setWechatCopied(false), 3000)
    }).catch(() => {})
  }

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
      // 如果自动保存不支持，引导长按
      setQrSaved(true)
      setTimeout(() => setQrSaved(false), 3000)
    }
    setSavingQr(false)
  }

  const openDonateWechat = () => {
    setShowDonate(false)
    setTimeout(() => setShowWechatQR(true), 200)
  }

  const openDonateAlipay = () => {
    setShowDonate(false)
    setTimeout(() => setShowAlipayQR(true), 200)
  }

  const openDonatePayNow = () => {
    setShowDonate(false)
    setTimeout(() => setShowPayNowQR(true), 200)
  }

  return (
    <>
      {/* ========== 微信引导弹窗 ========== */}
      {showWechatPrompt && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(4px)' }}
          onClick={() => setShowWechatPrompt(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center"
            style={{ animation: 'scaleIn 0.3s ease-out both' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="text-4xl mb-3">💚</div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{t('添加微信', 'Add WeChat')}</h3>
            <p className="text-xs text-gray-500 mb-4">
              {t('长按二维码直接添加，或在微信搜索微信号', 'Long press QR to add, or search WeChat ID')}
            </p>

            {/* 微信二维码 — 在微信内长按可直接识别 */}
            <div className="mb-4 flex justify-center flex-col items-center">
              <img src="/images/wechat-qr.jpg" alt="微信二维码"
                className="w-40 h-40 rounded-xl border border-gray-200 shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                onClick={saveQrToAlbum} />
              <button onClick={saveQrToAlbum}
                className="mt-2 text-xs text-blue-500 hover:text-blue-600 font-medium"
              >
                {savingQr
                  ? t('保存中...', 'Saving...')
                  : qrSaved
                    ? t('✅ 已保存到相册', '✅ Saved to album')
                    : t('📥 点击保存二维码到相册', '📥 Save QR to album')
                }
              </button>
            </div>

            <div className="bg-gray-50 rounded-xl p-3 mb-3 cursor-pointer hover:bg-gray-100 transition-colors" onClick={copyWechatId}>
              <p className="text-[10px] text-gray-400 mb-1">{t('点击复制微信号', 'Tap to copy WeChat ID')}</p>
              <p className="text-lg font-bold text-green-600 tracking-wider select-all">
                {wechatCopied ? (
                  <span className="text-green-500">{t('✅ 已复制，请到微信粘贴搜索', '✅ Copied! Open WeChat & paste')}</span>
                ) : (
                  WECHAT_ID
                )}
              </p>
            </div>

            <div className="space-y-1.5 text-left text-xs text-gray-400 mb-4">
              <p>① {t('微信号已复制到剪贴板 ✅', 'ID copied ✅')}</p>
              <p>② {t('打开微信 → 添加朋友 → 粘贴搜索', 'Open WeChat → Add Friends → Paste')}</p>
              <p>③ {t('发送「咨询维修」即可', 'Send a message to start')}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowWechatPrompt(false)}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                {t('知道了', 'Got it')}
              </button>
              <button
                onClick={() => { try { window.location.href = 'weixin://' } catch(e) {} }}
                className="flex-1 py-3 rounded-xl bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-colors"
              >
                {t('打开微信', 'Open WeChat')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========== 打赏弹窗 ========== */}
      {showDonate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(4px)' }}
          onClick={() => { setShowDonate(false); setShowWechatQR(false); setShowPayNowQR(false) }}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6"
            style={{ animation: 'scaleIn 0.3s ease-out both' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="text-center mb-5">
              <div className="text-3xl mb-3">☕</div>
              <h3 className="text-lg font-bold font-serif text-gray-900">{t('请我喝杯咖啡', 'Buy me a coffee')}</h3>
              <p className="text-xs text-gray-400 mt-1">{t('如果觉得有用，欢迎打赏支持', 'Support if you find this helpful')}</p>
            </div>
            <div className="flex flex-col gap-3">
              <button onClick={openDonateWechat}
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all w-full text-left">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0 text-xl">💚</div>
                <div className="flex-1">
                  <div className="font-semibold text-sm text-gray-900">{t('微信', 'WeChat')}</div>
                  <div className="text-xs text-gray-400">{t('扫描二维码支付', 'Scan QR code to pay')}</div>
                </div>
                <span className="text-green-600 text-sm">→</span>
              </button>
              <button onClick={openDonateAlipay}
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all w-full text-left">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-xl">💰</div>
                <div className="flex-1">
                  <div className="font-semibold text-sm text-gray-900">{t('支付宝', 'Alipay')}</div>
                  <div className="text-xs text-gray-400">{t('扫描二维码支付', 'Scan QR code to pay')}</div>
                </div>
                <span className="text-blue-600 text-sm">→</span>
              </button>
              <button onClick={openDonatePayNow}
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all w-full text-left">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0 text-xl">🇸🇬</div>
                <div className="flex-1">
                  <div className="font-semibold text-sm text-gray-900">PayNow</div>
                  <div className="text-xs text-gray-400">{t('扫描二维码支付', 'Scan QR code to pay')}</div>
                </div>
                <span className="text-green-600 text-sm">→</span>
              </button>
            </div>
            <p className="text-[10px] text-gray-300 text-center mt-4">{t('所有打赏将用于维持论坛运营', 'All tips support forum operation')}</p>
          </div>
        </div>
      )}

      {/* 微信打赏二维码 */}
      {showWechatQR && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(4px)' }}
          onClick={() => setShowWechatQR(false)}
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-xs w-full p-6 text-center" onClick={e => e.stopPropagation()}
            style={{ animation: 'scaleIn 0.3s ease-out both' }}>
            <div className="text-lg font-bold font-serif text-gray-900 mb-1">💚 {t('微信', 'WeChat')}</div>
            <p className="text-xs text-gray-400 mb-4">{t('打开微信扫描二维码支付', 'Open WeChat and scan')}</p>
            <img src="/images/wechat-pay-qr.jpg" alt="WeChat Pay QR"
              className="w-full max-w-[15rem] mx-auto rounded-xl border border-gray-200 shadow-sm" />
            <p className="text-[10px] text-gray-300 mt-3">{t('截图保存到相册，在微信中扫码', 'Save and scan in WeChat')}</p>
          </div>
        </div>
      )}

      {/* 支付宝二维码 */}
      {showAlipayQR && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(4px)' }}
          onClick={() => setShowAlipayQR(false)}
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-xs w-full p-6 text-center" onClick={e => e.stopPropagation()}
            style={{ animation: 'scaleIn 0.3s ease-out both' }}>
            <div className="text-lg font-bold font-serif text-gray-900 mb-1">💰 {t('支付宝', 'Alipay')}</div>
            <p className="text-xs text-gray-400 mb-4">{t('打开支付宝扫描二维码支付', 'Open Alipay and scan')}</p>
            <img src="/images/alipay.jpg" alt="Alipay QR"
              className="w-full max-w-[15rem] mx-auto rounded-xl border border-gray-200 shadow-sm" />
            <p className="text-[10px] text-gray-300 mt-3">{t('截图保存到相册，在支付宝中扫码', 'Save and scan in Alipay')}</p>
          </div>
        </div>
      )}

      {/* PayNow 二维码 */}
      {showPayNowQR && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(4px)' }}
          onClick={() => setShowPayNowQR(false)}
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-xs w-full p-6 text-center" onClick={e => e.stopPropagation()}
            style={{ animation: 'scaleIn 0.3s ease-out both' }}>
            <div className="text-lg font-bold font-serif text-gray-900 mb-1">🇸🇬 PayNow</div>
            <p className="text-xs text-gray-400 mb-4">{t('打开银行App扫描二维码', 'Open banking app and scan')}</p>
            <img src="/images/paynow-qr.jpg" alt="PayNow QR"
              className="w-full max-w-[15rem] mx-auto rounded-xl border border-gray-200 shadow-sm" />
            <p className="text-[10px] text-gray-300 mt-3">{t('截图保存到相册，在银行App中扫码', 'Save and scan in banking app')}</p>
          </div>
        </div>
      )}

      {/* ========== 右下角悬浮按钮组 ========== */}
      <div className="fixed bottom-28 right-4 z-40 flex flex-col items-end gap-2">
        {/* 联系展开菜单 */}
        {expanded && (
          <div ref={menuRef} className="bg-white rounded-xl shadow-xl border border-gray-200 p-2.5 w-64 animate-in slide-in-from-bottom-2 duration-200">
            <div className="text-center mb-1.5">
              <p className="text-[11px] font-bold text-gray-900">{t('联系我们', 'Contact Us')}</p>
              <p className="text-[9px] text-gray-400">{t('选择联系方式', 'Choose a way')}</p>
            </div>
            <div className="space-y-1">
              {/* 💚 微信 */}
              <button onClick={handleWechat}
                className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-green-50 transition-colors">
                <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <MessageCircle size={13} className="text-green-600" />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="text-[11px] font-medium text-gray-900">{t('💚 微信', '💚 WeChat')}</p>
                  <p className="text-[9px] text-gray-400 truncate">{t('复制微信号，去微信添加好友', 'Copy ID & open WeChat')}</p>
                </div>
              </button>

              {/* 📧 QQ邮箱 */}
              <button onClick={() => {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                  navigator.clipboard.writeText(EMAIL_QQ).then(() => {
                    setWechatCopied(false);
                    setCopied('qq');
                    setTimeout(() => setCopied(''), 2500)
                  }).catch(() => {})
                }
              }}
                className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <Copy size={13} className="text-blue-600" />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="text-[11px] font-medium text-gray-900">{t('📧 QQ邮箱', '📧 QQ Email')}</p>
                  <p className="text-[9px] text-gray-400 truncate">{copied === 'qq' ? '✅ 已复制' : EMAIL_QQ}</p>
                </div>
              </button>

              {/* 📧 谷歌邮箱 */}
              <button onClick={() => {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                  navigator.clipboard.writeText(EMAIL_GMAIL).then(() => {
                    setWechatCopied(false);
                    setCopied('gmail');
                    setTimeout(() => setCopied(''), 2500)
                  }).catch(() => {})
                }
              }}
                className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-red-50 transition-colors">
                <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                  <Copy size={13} className="text-red-600" />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="text-[11px] font-medium text-gray-900">{t('📧 谷歌邮箱', '📧 Gmail')}</p>
                  <p className="text-[9px] text-gray-400 truncate">{copied === 'gmail' ? '✅ 已复制' : EMAIL_GMAIL}</p>
                </div>
              </button>

              {/* 抖音 */}
              <a href="https://v.douyin.com/NvUr5C82ZDM/" target="_blank" rel="noopener noreferrer"
                className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-pink-50 transition-colors">
                <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                  style={{background: 'linear-gradient(135deg, #00f2fe, #fe2c55)'}}>
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="#fff">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.88 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.35 0 .69.06 1.01.18V8.48a6.34 6.34 0 0 0-1.01-.08C5.9 8.4 3 11.3 3 14.86c0 3.56 2.9 6.46 6.46 6.46 3.56 0 6.46-2.9 6.46-6.46V9.33a8.28 8.28 0 0 0 4.67 1.4v-3.4a4.84 4.84 0 0 1-1-.64z"/>
                  </svg>
                </div>
                <div className="text-left flex-1">
                  <p className="text-[11px] font-medium text-gray-900">{t('抖音', 'TikTok')}</p>
                  <p className="text-[9px] text-gray-400">{t('@Crazy维修 浩哥维修实录', '@Crazy Repair')}</p>
                </div>
              </a>

              {/* 到店地址 */}
              <div className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg">
                <div className="w-7 h-7 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                  <span className="text-sm">📍</span>
                </div>
                <div className="text-left flex-1">
                  <p className="text-[11px] font-medium text-gray-900">{t('到店维修', 'Visit Store')}</p>
                  <p className="text-[9px] text-gray-400">{t('威海环翠区西门31号', 'No.31 West Gate, Huancui')}</p>
                </div>
              </div>
            </div>
            <button onClick={() => setExpanded(false)}
              className="w-full mt-1 py-1.5 text-[9px] text-gray-400 hover:text-gray-600 transition-colors">
              {t('收起', 'Close')}
            </button>
          </div>
        )}

        {/* 打赏按钮 */}
        <button onClick={() => setShowDonate(true)}
          className="w-12 h-12 rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 hover:scale-110 transition-all active:scale-95 flex items-center justify-center"
          title={t('打赏支持', 'Support us')}>
          <Heart size={20} fill="currentColor" />
        </button>

        {/* 联系按钮 */}
        <button onClick={() => setExpanded(!expanded)}
          className="w-12 h-12 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center">
          {expanded ? <X size={20} /> : <MessageCircle size={20} />}
        </button>
      </div>
    </>
  )
}
