'use client'
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ContactModal from '../../components/ContactModal'

export default function ComputerRepair() {
  const [showContact, setShowContact] = useState(false)
  const [lang, setLang] = useState('zh')
  const t = (zh, en) => lang === 'zh' ? zh : en

  const brands = [
    { name: 'Apple MacBook', page: '/macbook-repair', gradient: 'from-gray-700 to-gray-600', icon: '💻',
      models: 'MacBook Pro/Air 全代 + iMac', desc: t('MacBook全系列芯片级维修', 'MacBook full repair') },
    { name: 'Lenovo', page: '/#services', gradient: 'from-blue-700 to-blue-600', icon: '💻',
      models: 'ThinkPad X1/T系列、小新、拯救者', desc: t('联想全系笔记本修理解決方案', 'Lenovo full laptop repair') },
    { name: 'Dell', page: '/#services', gradient: 'from-blue-600 to-blue-500', icon: '💻',
      models: 'XPS、Inspiron、Latitude', desc: t('戴尔笔记本台式机维修', 'Dell laptop & desktop repair') },
    { name: 'HP', page: '/#services', gradient: 'from-teal-600 to-teal-500', icon: '💻',
      models: 'Spectre、Pavilion、EliteBook', desc: t('惠普全系维修升级', 'HP full service') },
    { name: 'ASUS', page: '/#services', gradient: 'from-cyan-600 to-cyan-500', icon: '💻',
      models: 'ROG、天选、Vivobook', desc: t('华硕/ROG游戏本维修清灰', 'ASUS/ROG gaming laptop repair') },
    { name: 'Microsoft Surface', page: '/#services', gradient: 'from-gray-600 to-gray-500', icon: '💻',
      models: 'Surface Pro 9/8/Laptop', desc: t('Surface全系维修，电池屏幕', 'Surface repair specialist') },
    { name: 'Huawei MateBook', page: '/#services', gradient: 'from-red-600 to-red-500', icon: '💻',
      models: 'MateBook X Pro/14/D系列', desc: t('华为笔记本维修升级', 'Huawei laptop repair') },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar lang={lang} setLang={setLang} setShowContact={setShowContact} />
      <section className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold mb-3">{t('电脑维修', 'Computer Repair')}</h1>
          <p className="text-gray-300 text-lg">{t('选择您的电脑品牌，查看对应的维修服务和价格', 'Select your computer brand')}</p>
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
