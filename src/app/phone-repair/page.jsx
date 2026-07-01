'use client'
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ContactModal from '../../components/ContactModal'

export default function PhoneRepair() {
  const [showContact, setShowContact] = useState(false)
  const [lang, setLang] = useState('zh')
  const t = (zh, en) => lang === 'zh' ? zh : en

  const brands = [
    { name: 'Apple iPhone', page: '/iphone-repair', gradient: 'from-blue-600 to-blue-500', icon: '📱',
      models: 'iPhone 16/15/14/13/12/11/X/8', desc: t('iPhone全系列专业维修，换屏换电进水主板', 'Full iPhone repair service') },
    { name: 'Samsung', page: '/samsung-repair', gradient: 'from-purple-600 to-purple-500', icon: '📱',
      models: 'S24/S23/S22/Z Fold/Flip/A系列', desc: t('三星AMOLED换屏、电池、主板芯片级维修', 'Samsung AMOLED repair specialist') },
    { name: 'Huawei', page: '/huawei-repair', gradient: 'from-red-600 to-red-500', icon: '📱',
      models: 'Mate 60/Mate 50/P60/P50/P40/Nova', desc: t('华为Mate/P/Nova全系维修，鸿蒙刷机', 'Huawei Mate/P/Nova repair') },
    { name: 'Xiaomi', page: '/xiaomi-repair', gradient: 'from-orange-600 to-yellow-500', icon: '📱',
      models: '小米14/13/12/Redmi Note/K系列', desc: t('小米/Redmi/Poco全系，性价比维修', 'Xiaomi/Redmi/Poco repair') },
    { name: 'OPPO', page: '/oppo-repair', gradient: 'from-green-600 to-green-500', icon: '📱',
      models: 'Find X7/X6/Reno 12/11/A系列', desc: t('OPPO全系维修，屏碎、电池、充電口', 'OPPO series repair') },
    { name: 'vivo', page: '/vivo-repair', gradient: 'from-cyan-600 to-cyan-500', icon: '📱',
      models: 'X100/X90/V30/V29/iQOO 12', desc: t('vivo/iQOO全系维修，屏下指纹修复', 'vivo/iQOO repair specialist') },
    { name: 'OnePlus', page: '/oneplus-repair', gradient: 'from-red-600 to-red-500', icon: '📱',
      models: 'OnePlus 12/11/Open/Nord', desc: t('一加全系维修，性价比之选', 'OnePlus full repair service') },
    { name: 'Honor', page: '/honor-repair', gradient: 'from-teal-600 to-teal-500', icon: '📱',
      models: 'Magic 6/Magic V3/200/X9b/X9a', desc: t('荣耀全系维修，屏幕电池主板', 'Honor full repair service') },
    { name: 'Google Pixel', page: '/google-repair', gradient: 'from-gray-600 to-gray-500', icon: '📱',
      models: 'Pixel 9/8/7/6系列', desc: t('Google Pixel全系维修', 'Google Pixel repair') },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar lang={lang} setLang={setLang} setShowContact={setShowContact} />

      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold mb-3">{t('手机维修', 'Phone Repair')}</h1>
          <p className="text-blue-200 text-lg">{t('选择您的手机品牌，查看对应的维修服务和价格', 'Select your phone brand to see repair services')}</p>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {brands.map((b, i) => (
              <a key={i} href={b.page}
                className={`bg-gradient-to-br ${b.gradient} text-white rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all shadow-md`}>
                <div className="text-3xl mb-2">{b.icon}</div>
                <h3 className="font-bold text-lg mb-1">{b.name}</h3>
                <p className="text-sm text-white/80 mb-2">{b.desc}</p>
                <p className="text-xs text-white/60">{b.models}</p>
                <span className="inline-block mt-3 text-xs bg-white/20 px-3 py-1 rounded-full">{t('查看服务 →', 'Services →')}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer lang={lang} />
      <ContactModal show={showContact} setShow={setShowContact} lang={lang} />
    </div>
  )
}
