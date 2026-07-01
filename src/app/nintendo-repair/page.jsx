'use client'
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ContactModal from '../../components/ContactModal'

export default function NintendoRepair() {
  const [showContact, setShowContact] = useState(false)
  const [lang, setLang] = useState('zh')
  const t = (zh, en) => lang === 'zh' ? zh : en
  return (
    <div className="min-h-screen bg-white">
      <Navbar lang={lang} setLang={setLang} setShowContact={setShowContact} />
      <section className="bg-gradient-to-br from-red-600 via-red-500 to-red-400 text-white text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div className="text-6xl mb-6">🎮</div>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">{t('Nintendo 维修', 'Nintendo Repair')}</h1>
          <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
            {t('Nintendo Switch / Switch OLED / Switch Lite — 屏幕更换、手柄漂移、电池维修、充电口维修等', 'Nintendo Switch / Switch OLED / Switch Lite — screen repair, joystick drift, battery, charging port')}
          </p>
          <p className="text-white/60 mb-8">
            {t('具体维修详情请微信或WhatsApp咨询，发照片即可初步判断', 'For repair details, please contact us via WeChat or WhatsApp. Send a photo for quick assessment.')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setShowContact(true)} className="bg-white text-red-600 font-semibold px-8 py-4 rounded-xl hover:bg-red-50 shadow-lg text-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
            <a href="https://wa.me/6596146709?text=Nintendo维修咨询" target="_blank" className="bg-green-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-green-600 shadow-lg text-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
          </div>
        </div>
      </section>
      <Footer lang={lang} />
      <ContactModal show={showContact} setShow={setShowContact} lang={lang} />
    </div>
  )
}
