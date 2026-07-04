'use client'
import { useSite } from '../lib/SiteContext'

export default function CTASection() {
  const { lang, setShowContact } = useSite()
  const t = (zh, en) => lang === 'zh' ? zh : en

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          {t('设备出问题了？别着急', 'Device issues? Don\'t worry')}
        </h2>
        <p className="text-blue-200 mb-6 max-w-xl mx-auto text-sm sm:text-base">
          {t('免费检测，先报价后维修。添加微信或WhatsApp，发照片就能初步判断。', 'Free diagnosis. Add us on WeChat or WhatsApp, send a photo for initial assessment.')}
        </p>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          <button
            onClick={() => setShowContact(true)}
            className="bg-white text-blue-600 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-blue-50 transition-colors shadow-lg text-base sm:text-lg"
          >
            {t('📱 微信咨询', '📱 WeChat')}
          </button>
          <button
            onClick={() => window.open('https://wa.me/6596146709?text=我想咨询手机电脑维修事宜', '_blank')}
            className="bg-green-500 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-green-600 transition-colors shadow-lg text-base sm:text-lg"
          >
            {t('💬 WhatsApp咨询', '💬 WhatsApp')}
          </button>
        </div>
      </div>
    </section>
  )
}
