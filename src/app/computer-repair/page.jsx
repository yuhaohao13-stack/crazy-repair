'use client'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
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
    { name: 'Lenovo', page: '/lenovo-repair', gradient: 'from-blue-700 to-blue-600', icon: '💻',
      models: 'ThinkPad X1/T/P系列、小新、Yoga、拯救者', desc: t('联想全系笔记本修理解決方案', 'Lenovo full laptop repair') },
    { name: 'Dell', page: '/dell-repair', gradient: 'from-blue-600 to-blue-500', icon: '💻',
      models: 'XPS、Inspiron、Latitude、Alienware外星人', desc: t('戴尔/外星人笔记本台式机维修', 'Dell/Alienware laptop & desktop repair') },
    { name: 'HP', page: '/hp-repair', gradient: 'from-teal-600 to-teal-500', icon: '💻',
      models: 'Spectre、Pavilion、EliteBook、暗影精灵', desc: t('惠普全系维修升级', 'HP full service') },
    { name: 'ASUS', page: '/asus-repair', gradient: 'from-cyan-600 to-cyan-500', icon: '💻',
      models: 'ROG玩家国度、天选、Vivobook、ProArt', desc: t('华硕/ROG游戏本维修清灰', 'ASUS/ROG gaming laptop repair') },
    { name: 'Acer 宏基', page: '/acer-repair', gradient: 'from-green-700 to-green-600', icon: '💻',
      models: 'Predator、Nitro、Swift、Aspire', desc: t('宏基笔记本台式机全系维修', 'Acer laptop & desktop repair') },
    { name: 'MSI 微星', page: '/msi-repair', gradient: 'from-red-700 to-red-600', icon: '💻',
      models: 'Stealth、Raider、Crosshair、Prestige', desc: t('MSI游戏本/工作站维修', 'MSI gaming laptop repair') },
    { name: 'Microsoft Surface', page: '/surface-repair', gradient: 'from-gray-600 to-gray-500', icon: '💻',
      models: 'Surface Pro/Go/Laptop/Studio', desc: t('Surface全系维修，电池屏幕通病', 'Surface repair specialist') },
    { name: 'Huawei MateBook', page: '/huawei-repair', gradient: 'from-red-600 to-red-500', icon: '💻',
      models: 'MateBook X Pro/14/13/D系列', desc: t('华为笔记本维修升级', 'Huawei laptop repair') },
    { name: '小米/RedmiBook', page: '/xiaomi-repair', gradient: 'from-orange-600 to-orange-500', icon: '💻',
      models: '小米笔记本/RedmiBook全系', desc: t('小米笔记本维修', 'Xiaomi laptop repair') },
    { name: '神舟 Hasee', page: '/hasee-repair', gradient: 'from-indigo-700 to-indigo-600', icon: '💻',
      models: '战神、优雅、精盾系列', desc: t('神舟笔记本性价比维修', 'Hasee laptop repair') },
    { name: '其他品牌', page: '/#services', gradient: 'from-gray-500 to-gray-400', icon: '💻',
      models: 'Razer雷蛇、LG Gram、VAIO、富士通 等', desc: t('其他品牌电脑均可维修，加微信咨询', 'Other laptop brands, ask on WeChat') },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar lang={lang} setLang={setLang} setShowContact={setShowContact} />
      <section className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4"><a href="/" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-medium transition-colors"><ArrowLeft size={14} /> {t('首页', 'Home')}</a></div>
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
