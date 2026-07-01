'use client'
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ContactModal from '../../components/ContactModal'

export default function SonyRepair() {
  const [showContact, setShowContact] = useState(false)
  const [lang, setLang] = useState('zh')
  const t = (zh, en) => lang === 'zh' ? zh : en
  return (
    <div className="min-h-screen bg-white">
      <Navbar lang={lang} setLang={setLang} setShowContact={setShowContact} />
      <section className="bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 text-white text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div className="text-6xl mb-6">🎮</div>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">{t('Sony 维修', 'Sony Repair')}</h1>
          <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
            {t('PS5 / PS4 / PS4 Pro / PSP — 手柄漂移、清灰散热、光驱维修、电源维修等', 'PS5 / PS4 / PS4 Pro / PSP — joystick drift, cleaning, disc drive, power supply')}
          </p>
          <p className="text-white/60 mb-8">
            {t('具体维修详情请微信或WhatsApp咨询，发照片即可初步判断', 'For repair details, please contact us via WeChat or WhatsApp.')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setShowContact(true)} className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 shadow-lg text-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
            <a href="https://wa.me/6596146709?text=Sony维修咨询" target="_blank" className="bg-green-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-green-600 shadow-lg text-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
          </div>
        </div>
      </section>
      <Footer lang={lang} />
      <ContactModal show={showContact} setShow={setShowContact} lang={lang} />
    </div>
  )
}
