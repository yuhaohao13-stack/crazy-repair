'use client'
import { useSite } from '../../lib/SiteContext'
import { useState } from 'react'
import Navbar from '../../components/Navbar'

export default function KindleRepair() {
  const { lang, setShowContact } = useSite();
  const t = (zh, en) => lang === 'zh' ? zh : en
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="bg-gradient-to-br from-amber-600 via-amber-500 to-yellow-500 text-white text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div className="text-6xl mb-6">📖</div>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">{t('Kindle / 电子书维修', 'Kindle / E-reader Repair')}</h1>
          <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
            {t('Amazon Kindle / Kindle Paperwhite / Kindle Oasis / Kobo / 文石BOOX / 小米多看 — 屏幕碎裂、电池不耐用、系统卡死', 'Kindle / Paperwhite / Oasis / Kobo / BOOX — cracked screen, battery issues, system freeze')}
          </p>
          <p className="text-white/60 mb-8">
            {t('具体维修详情请微信或WhatsApp咨询，发照片即可初步判断', 'For repair details, please contact us via WeChat or WhatsApp.')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setShowContact(true)} className="bg-white text-amber-600 font-semibold px-8 py-4 rounded-xl hover:bg-amber-50 shadow-lg text-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
            <a href="https://wa.me/6596146709?text=Kindle维修咨询" target="_blank" className="bg-green-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-green-600 shadow-lg text-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
          </div>
        </div>
      </section>
    </div>
  )
}
