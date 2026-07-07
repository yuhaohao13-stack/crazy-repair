'use client'
import { useState } from 'react'
import { MessageCircle, Phone, Heart, X } from 'lucide-react'
import { useSite } from '../lib/SiteContext'

export default function FloatingContact() {
  const { lang } = useSite()
  const [expanded, setExpanded] = useState(false)
  const [showDonate, setShowDonate] = useState(false)
  const [showWechatQR, setShowWechatQR] = useState(false)
  const [showPayNowQR, setShowPayNowQR] = useState(false)
  const [copied, setCopied] = useState(false)
  const t = (zh, en) => lang === 'zh' ? zh : en

  const copyWechat = (val) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(val).then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 2500)
        }).catch(() => fallbackCopy(val))
      } else {
        fallbackCopy(val)
      }
    } catch(e) {
      fallbackCopy(val)
    }
  }

  const fallbackCopy = (val) => {
    const ta = document.createElement('textarea')
    ta.value = val
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    try { document.execCommand('copy'); setCopied(true); setTimeout(() => setCopied(false), 2500) } catch(e) {}
    document.body.removeChild(ta)
  }

  const [showPhones, setShowPhones] = useState(false)

  const openDonateWechat = () => {
    setShowDonate(false)
    setTimeout(() => setShowWechatQR(true), 200)
  }

  const openDonatePayNow = () => {
    setShowDonate(false)
    setTimeout(() => setShowPayNowQR(true), 200)
  }

  return (
    <>
      {/* 打赏弹窗 */}
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

      {/* 微信二维码 */}
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
            <img src="/images/wechat-qr.jpg" alt="WeChat Pay QR"
              className="w-full max-w-[15rem] mx-auto rounded-xl border border-gray-200 shadow-sm" />
            <p className="text-[10px] text-gray-300 mt-3">{t('截图保存到相册，在微信中扫码', 'Save and scan in WeChat')}</p>
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

      {/* 右下角悬浮按钮组 */}
      <div className="fixed bottom-6 right-4 z-40 flex flex-col items-end gap-2">
        {/* 联系展开菜单 */}
        {expanded && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-3 w-64 animate-in slide-in-from-bottom-2 duration-200">
            <div className="text-center mb-2">
              <p className="text-xs font-bold text-gray-900">{t('联系我们', 'Contact Us')}</p>
              <p className="text-[10px] text-gray-400">{t('选择联系方式', 'Choose a way')}</p>
            </div>
            <div className="space-y-1.5">
              <button onClick={() => copyWechat('crazy-repair')}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-green-50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <MessageCircle size={16} className="text-green-600" />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900">{t('微信', 'WeChat')}</p>
                  <p className="text-[10px] text-gray-400 truncate">
                    {copied ? <span className="text-green-600 font-semibold">{t('✅ 已复制', '✅ Copied')}</span> : 'crazy-repair'}
                  </p>
                </div>
              </button>

              <div>
                <button onClick={() => setShowPhones(!showPhones)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-blue-50 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Phone size={16} className="text-blue-600" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-xs font-medium text-gray-900">{t('电话', 'Phone')}</p>
                    <p className="text-[10px] text-gray-400">{t('选择号码', 'Choose number')}</p>
                  </div>
                </button>
                {showPhones && (
                  <div className="ml-10 mt-1 space-y-1 border-l-2 border-blue-100 pl-3">
                    <a href="tel:+8613573735550"
                      className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-blue-50 transition-colors text-xs">
                      <span className="text-blue-600 font-medium">{t('中国', 'China')}</span>
                      <span className="text-gray-500">+86 13573735550</span>
                    </a>
                    <a href="tel:+6596146709"
                      className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-blue-50 transition-colors text-xs">
                      <span className="text-blue-600 font-medium">{t('新加坡', 'Singapore')}</span>
                      <span className="text-gray-500">+65 96146709</span>
                    </a>
                  </div>
                )}
              </div>

              <a href="https://wa.me/6596146709?text=我想咨询维修事宜" target="_blank" rel="noopener noreferrer"
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-green-50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-green-600" />
                </div>
                <div className="text-left flex-1">
                  <p className="text-xs font-medium text-gray-900">WhatsApp</p>
                  <p className="text-[10px] text-gray-400">+65 96146709</p>
                </div>
              </a>
            </div>
            <button onClick={() => setExpanded(false)}
              className="w-full mt-1 py-2 text-[10px] text-gray-400 hover:text-gray-600 transition-colors">
              {t('收起', 'Close')}
            </button>
          </div>
        )}

        {/* 打赏按钮（红色，在联系按钮上面） */}
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

        {/* 提示文字 */}
        {!expanded && (
          <div className="flex flex-col items-end gap-1">
            <span className="bg-white text-xs text-gray-500 px-2 py-1 rounded-full shadow border border-gray-100 animate-in slide-in-from-bottom-2">
              ☕ {t('打赏', 'Donate')}
            </span>
            <span className="bg-white text-xs text-gray-500 px-2 py-1 rounded-full shadow border border-gray-100">
              {t('联系我', 'Contact')}
            </span>
          </div>
        )}
      </div>
    </>
  )
}
