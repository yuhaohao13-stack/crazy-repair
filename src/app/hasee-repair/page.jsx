'use client'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ContactModal from '../../components/ContactModal'

export default function HaseeRepair() {
  const [showContact, setShowContact] = useState(false)
  const [lang, setLang] = useState('zh')
  const t = (zh, en) => lang === 'zh' ? zh : en
  return (
    <div className="min-h-screen bg-white">
      <Navbar lang={lang} setLang={setLang} setShowContact={setShowContact} />
      <section className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-500 text-white">
                <a href="/computer-repair" className="inline-flex items-center gap-1 text-white/50 hover:text-white text-xs mb-2 transition-colors">
                  <ArrowLeft size={12} /> {t('电脑品牌', 'Computer Brands')}
                </a>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <h1 className="text-3xl sm:text-5xl font-bold mb-3">{t('Hasee 维修', 'Hasee Repair')}</h1>
          <p className="text-green-100 text-lg mb-4">{t('Hasee 全系列专业维修 | 威海', 'Hasee All Series | Weihai')}</p>
          <p className="text-green-100 max-w-2xl">{t('Hasee Find、Reno、A系列——屏幕碎了、电池不耐用了、充电口坏了，拿来给我看看。2007年至今奋斗在维修一线。', 'Hasee Find, Reno, A series — cracked screen, battery drain, charging port issues. On the job since 2007.')}</p>
          <div className="flex gap-3 mt-6">
            <button onClick={() => setShowContact(true)} className="bg-white text-indigo-600 font-semibold px-5 py-2.5 rounded-xl hover:bg-indigo-50 shadow-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
            <a href="https://wa.me/6596146709?text=Hasee手机需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-green-600 shadow-lg">{t('💬 WhatsApp', '💬 WhatsApp')}</a>
          </div>
        </div>
      </section>
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('常见维修', 'Common Repairs')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[{title:'屏幕更换',titleEn:'Screen',desc:'Hasee Find/Reno/A系列屏幕更换，OLED/LCD。碎裂漏液触摸不灵。'},
              {title:'电池更换',titleEn:'Battery',desc:'Hasee电池不耐用、鼓包、充不进电。原装规格电池。'},
              {title:'充电口维修',titleEn:'Charging Port',desc:'Type-C口松动、接触不良、只能慢充。'},
              {title:'主板维修',titleEn:'Motherboard',desc:'不开机、重启、充电IC故障、无服务。芯片级维修。'},
              {title:'后盖更换',titleEn:'Back Glass',desc:'Hasee玻璃后盖碎裂更换。'},
              {title:'刷机解锁',titleEn:'Flash/Unlock',desc:'系统卡顿、卡LOGO、忘记密码。'}].map((s,i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-gray-900 mb-1">{lang==='zh'?s.title:s.titleEn}</h3>
                <p className="text-sm text-gray-500">{lang==='zh'?s.desc:s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <button onClick={() => setShowContact(true)} className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-blue-700 shadow-md">{t('📱 联系维修', '📱 Contact for Repair')}</button>
          </div>
        </div>
      </section>
      <Footer lang={lang} />
      <ContactModal show={showContact} setShow={setShowContact} lang={lang} />
    </div>
  )
}
