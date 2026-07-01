'use client'
import { useState } from 'react'
import { ChevronRight, MessageCircle, Phone, MapPin } from 'lucide-react'

export default function ContactModal({ show, setShow, lang }) {
  const [copied, setCopied] = useState(false)
  const t = (zh, en) => lang === 'zh' ? zh : en
  if (!show) return null

  const copyWechat = () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText('crazy-repair').then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 2500)
        }).catch(() => {
          fallbackCopy()
        })
      } else {
        fallbackCopy()
      }
    } catch(e) {
      fallbackCopy()
    }
  }

  const fallbackCopy = () => {
    const textarea = document.createElement('textarea')
    textarea.value = 'crazy-repair'
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    try {
      document.execCommand('copy')
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch(e) {
      alert(t('请手动复制微信号: crazy-repair', 'Please manually copy WeChat ID: crazy-repair'))
    }
    document.body.removeChild(textarea)
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShow(false)}>
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">🔧</div>
          <h3 className="text-xl font-bold text-gray-900">{t('联系我们', 'Contact Us')}</h3>
          <p className="text-sm text-gray-500 mt-1">{t('选择您方便的方式', 'Choose your preferred way')}</p>
        </div>
        <div className="space-y-4">
          {/* WeChat */}
          <button onClick={copyWechat}
            className="w-full flex items-center gap-4 p-4 rounded-2xl border border-gray-200 hover:border-green-300 hover:bg-green-50 cursor-pointer transition-all text-left"
          >
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0"><MessageCircle size={24} className="text-green-600" /></div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900">{t('微信', 'WeChat')}</p>
              <p className="text-xs text-gray-500 truncate">
                {copied
                  ? <span className="text-green-600 font-semibold">{t('✅ 已复制！去微信搜索粘贴', '✅ Copied! Open WeChat')}</span>
                  : <span>crazy-repair</span>
                }
              </p>
            </div>
            <ChevronRight size={20} className="text-gray-400 shrink-0" />
          </button>

          {/* WhatsApp */}
          <a href="https://wa.me/6596146709?text=我想咨询手机电脑维修事宜" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-2xl border border-gray-200 hover:border-green-300 hover:bg-green-50 cursor-pointer transition-all"
          >
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0"><Phone size={24} className="text-green-600" /></div>
            <div className="flex-1"><p className="font-semibold text-gray-900">WhatsApp</p><p className="text-xs text-gray-500">+65 96146709</p></div>
            <ChevronRight size={20} className="text-gray-400" />
          </a>

          {/* Address */}
          <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-200">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0"><MapPin size={24} className="text-blue-600" /></div>
            <div className="flex-1"><p className="font-semibold text-gray-900">{t('到店维修', 'Visit Store')}</p><p className="text-xs text-gray-500">{t('威海环翠区西门31号', 'No.31 West Gate, Huancui')}</p></div>
          </div>

          <p className="text-center text-xs text-gray-400">{t('点微信按钮复制微信号，然后打开微信搜索粘贴添加好友', 'Tap WeChat button, then open WeChat to search and add')}</p>
        </div>
        <button onClick={() => setShow(false)} className="mt-6 w-full py-3 rounded-xl bg-gray-100 text-gray-600 font-medium hover:bg-gray-200 transition-colors">{t('关闭', 'Close')}</button>
      </div>
    </div>
  )
}
