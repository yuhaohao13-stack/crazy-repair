'use client'
import { useState } from 'react'
import { MessageCircle, Phone, X, ChevronDown } from 'lucide-react'
import { useSite } from '../lib/SiteContext'

export default function FloatingContact() {
  const { lang } = useSite()
  const [expanded, setExpanded] = useState(false)
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

  return (
    <div className="fixed bottom-1/4 right-4 z-40 flex flex-col items-end gap-2">
      {/* 展开菜单 */}
      {expanded && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-3 w-64 animate-in slide-in-from-bottom-2 duration-200">
          <div className="text-center mb-2">
            <p className="text-xs font-bold text-gray-900">{t('联系我们', 'Contact Us')}</p>
            <p className="text-[10px] text-gray-400">{t('选择联系方式', 'Choose a way')}</p>
          </div>
          <div className="space-y-1.5">
            {/* 微信 */}
            <button
              onClick={() => copyWechat('crazy-repair')}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-green-50 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <MessageCircle size={16} className="text-green-600" />
              </div>
              <div className="text-left flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-900">{t('微信', 'WeChat')}</p>
                <p className="text-[10px] text-gray-400 truncate">
                  {copied
                    ? <span className="text-green-600 font-semibold">{t('✅ 已复制', '✅ Copied')}</span>
                    : 'crazy-repair'
                  }
                </p>
              </div>
            </button>

            {/* 电话（展开两级号码） */}
            <div>
              <button
                onClick={() => setShowPhones(!showPhones)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-blue-50 transition-colors"
              >
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
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-blue-50 transition-colors text-xs"
                  >
                    <span className="text-blue-600 font-medium">{t('中国', 'China')}</span>
                    <span className="text-gray-500">+86 13573735550</span>
                  </a>
                  <a href="tel:+6596146709"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-blue-50 transition-colors text-xs"
                  >
                    <span className="text-blue-600 font-medium">{t('新加坡', 'Singapore')}</span>
                    <span className="text-gray-500">+65 96146709</span>
                  </a>
                </div>
              )}
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/6596146709?text=我想咨询维修事宜"
              target="_blank" rel="noopener noreferrer"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-green-50 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <Phone size={16} className="text-green-600" />
              </div>
              <div className="text-left flex-1">
                <p className="text-xs font-medium text-gray-900">WhatsApp</p>
                <p className="text-[10px] text-gray-400">+65 96146709</p>
              </div>
            </a>
          </div>
          <button
            onClick={() => setExpanded(false)}
            className="w-full mt-1 py-2 text-[10px] text-gray-400 hover:text-gray-600 transition-colors"
          >
            {t('收起', 'Close')}
          </button>
        </div>
      )}

      {/* 主按钮 */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-12 h-12 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center"
      >
        {expanded ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

      {/* 提示文字（未展开时） */}
      {!expanded && (
        <span className="bg-white text-xs text-gray-500 px-2 py-1 rounded-full shadow border border-gray-100">
          {t('联系我', 'Contact')}
        </span>
      )}
    </div>
  )
}
