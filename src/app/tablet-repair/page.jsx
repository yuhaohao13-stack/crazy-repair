'use client'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ContactModal from '../../components/ContactModal'

export default function TabletRepair() {
  const [showContact, setShowContact] = useState(false)
  const [lang, setLang] = useState('zh')
  const t = (zh, en) => lang === 'zh' ? zh : en

  return (
    <div className="min-h-screen bg-white">
      <Navbar lang={lang} setLang={setLang} setShowContact={setShowContact} />
      <section className="bg-gradient-to-br from-teal-600 via-teal-500 to-teal-400 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4"><a href="/" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-medium transition-colors"><ArrowLeft size={14} /> {t('首页', 'Home')}</a></div>
                  <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold mb-3">{t('平板维修', 'Tablet Repair')}</h1>
          <p className="text-teal-200 text-lg">{t('iPad、安卓平板、电子书维修', 'iPad, Android tablet & e-reader repair')}</p>
        </div>
      </section>
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-2xl p-5 shadow-md">
              <div className="text-3xl mb-2">📟</div>
              <h3 className="font-bold text-lg mb-1">{t('Apple iPad', 'Apple iPad')}</h3>
              <p className="text-sm text-white/80 mb-2">{t('iPad Pro/Air/Mini/数字系列全代维修', 'iPad Pro/Air/Mini/digital all gens')}</p>
              <p className="text-xs text-white/60">{t('屏幕更换、电池、充电口、进水', 'Screen, battery, port, water')}</p>
              <a href="/iphone-repair" className="inline-block mt-3 text-xs bg-white/20 px-3 py-1 rounded-full hover:bg-white/30">{t('查看服务 →', 'Services →')}</a>
            </div>
            <div className="bg-gradient-to-br from-purple-600 to-purple-500 text-white rounded-2xl p-5 shadow-md">
              <div className="text-3xl mb-2">📟</div>
              <h3 className="font-bold text-lg mb-1">{t('Samsung Galaxy Tab', 'Samsung Galaxy Tab')}</h3>
              <p className="text-sm text-white/80 mb-2">{t('三星Tab S/A/Active全系列维修', 'Samsung Tab S/A/Active series')}</p>
              <p className="text-xs text-white/60">{t('换屏、电池、主板、后盖', 'Screen, battery, board, back')}</p>
              <a href="/samsung-repair" className="inline-block mt-3 text-xs bg-white/20 px-3 py-1 rounded-full hover:bg-white/30">{t('查看服务 →', 'Services →')}</a>
            </div>
            <div className="bg-gradient-to-br from-red-600 to-red-500 text-white rounded-2xl p-5 shadow-md">
              <div className="text-3xl mb-2">📟</div>
              <h3 className="font-bold text-lg mb-1">{t('华为 MatePad', 'Huawei MatePad')}</h3>
              <p className="text-sm text-white/80 mb-2">{t('华为MatePad Pro/Air/SE全系维修', 'Huawei MatePad Pro/Air/SE')}</p>
              <p className="text-xs text-white/60">{t('换屏、电池、主板、刷机', 'Screen, battery, board, flash')}</p>
              <a href="/huawei-repair" className="inline-block mt-3 text-xs bg-white/20 px-3 py-1 rounded-full hover:bg-white/30">{t('查看服务 →', 'Services →')}</a>
            </div>
            <div className="bg-gradient-to-br from-orange-600 to-yellow-500 text-white rounded-2xl p-5 shadow-md">
              <div className="text-3xl mb-2">📟</div>
              <h3 className="font-bold text-lg mb-1">{t('小米/Redmi Pad', 'Xiaomi/Redmi Pad')}</h3>
              <p className="text-sm text-white/80 mb-2">{t('小米Pad/Redmi Pad全系维修', 'Xiaomi Pad/Redmi Pad all')}</p>
              <p className="text-xs text-white/60">{t('换屏、电池、充电口', 'Screen, battery, port')}</p>
              <a href="/xiaomi-repair" className="inline-block mt-3 text-xs bg-white/20 px-3 py-1 rounded-full hover:bg-white/30">{t('查看服务 →', 'Services →')}</a>
            </div>
            <div className="bg-gradient-to-br from-teal-600 to-teal-500 text-white rounded-2xl p-5 shadow-md">
              <div className="text-3xl mb-2">📟</div>
              <h3 className="font-bold text-lg mb-1">{t('OPPO Pad / OnePlus Pad', 'OPPO Pad / OnePlus Pad')}</h3>
              <p className="text-sm text-white/80 mb-2">{t('OPPO Pad/OnePlus Pad维修', 'OPPO Pad/OnePlus Pad repair')}</p>
              <p className="text-xs text-white/60">{t('屏幕、电池、充电口', 'Screen, battery, port')}</p>
              <a href="/oppo-repair" className="inline-block mt-3 text-xs bg-white/20 px-3 py-1 rounded-full hover:bg-white/30">{t('查看服务 →', 'Services →')}</a>
            </div>
            <div className="bg-gradient-to-br from-violet-600 to-violet-500 text-white rounded-2xl p-5 shadow-md">
              <div className="text-3xl mb-2">📟</div>
              <h3 className="font-bold text-lg mb-1">{t('联想 Tab / 荣耀平板', 'Lenovo Tab / Honor Pad')}</h3>
              <p className="text-sm text-white/80 mb-2">{t('联想小新Pad/荣耀平板全系', 'Lenovo Pad/Honor Pad all')}</p>
              <p className="text-xs text-white/60">{t('换屏、电池、充电口', 'Screen, battery, port')}</p>
              <a href="/lenovo-repair" className="inline-block mt-3 text-xs bg-white/20 px-3 py-1 rounded-full hover:bg-white/30">{t('查看服务 →', 'Services →')}</a>
            </div>
            <div className="bg-gradient-to-br from-amber-600 to-amber-500 text-white rounded-2xl p-5 shadow-md">
              <div className="text-3xl mb-2">📖</div>
              <h3 className="font-bold text-lg mb-1">{t('Kindle / 电子书', 'Kindle / E-reader')}</h3>
              <p className="text-sm text-white/80 mb-2">{t('Kindle/Kobo/文石BOOX/小米多看', 'Kindle/Kobo/BOOX/Xiaomi')}</p>
              <p className="text-xs text-white/60">{t('屏幕碎裂、电池不耐用、系统卡死', 'Cracked screen, battery, freeze')}</p>
              <button onClick={() => setShowContact(true)} className="inline-block mt-3 text-xs bg-white/20 px-3 py-1 rounded-full hover:bg-white/30">{t('📱 微信咨询 →', 'WeChat →')}</button>
            </div>
          </div>
          <p className="text-center text-gray-400 text-sm mt-6">{t('没找到你的平板型号？加微信问我，没列出来不代表不能修', 'Model not listed? DM me on WeChat — not listed does not mean we cannot fix it')}</p>
        </div>
      </section>
      <Footer lang={lang} />
      <ContactModal show={showContact} setShow={setShowContact} lang={lang} />
    </div>
  )
}
