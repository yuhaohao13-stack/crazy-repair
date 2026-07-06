'use client'
import { useSite } from '../../lib/SiteContext'
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Breadcrumb from "../../components/Breadcrumb";

export default function KindleRepair() {
  const { lang, setShowContact } = useSite();
  const t = (zh, en) => lang === 'zh' ? zh : en

  const services = [
    {id:'screen', icon:'📖', title:'屏幕更换', titleEn:'Screen Replacement', desc:'Kindle/Kobo/BOOX电子墨水屏碎裂、显示异常、局部不显示。E-ink屏幕更换。', descEn:'Kindle/Kobo/BOOX e-ink screen cracked, display issues. E-ink screen replacement.'},
    {id:'battery', icon:'🔋', title:'电池更换', titleEn:'Battery Service', desc:'Kindle电池不耐用、充不进电、续航大幅下降。原装规格电池更换。', descEn:'Kindle battery drain, no charge, reduced battery life. OEM spec battery.'},
    {id:'charging-port', icon:'🔌', title:'充电口维修', titleEn:'Charging Port', desc:'Kindle Micro-USB/Type-C口松动、不充电。焊接维修更换。', descEn:'Kindle Micro-USB/Type-C port loose, not charging. Solder repair.'},
    {id:'system-issues', icon:'🔄', title:'系统刷机', titleEn:'System Flash', desc:'Kindle卡LOGO、死机、系统崩溃、无法开机。系统刷机修复。', descEn:'Kindle stuck on logo, frozen, crashed. System flash restore.'},
  ]

  const models = [
    'Amazon Kindle (第11代)',
    'Amazon Kindle Paperwhite',
    'Amazon Kindle Oasis',
    'Amazon Kindle Scribe',
    'Kobo Clara / Libra / Sage',
    '文石 BOOX 全系列',
    '小米多看电纸书',
    '掌阅 iReader 系列',
  ]

  const details = [
    'Amazon Kindle / Kindle Paperwhite / Kindle Oasis 全系列维修',
    'Kobo、文石BOOX、小米多看等品牌电子书维修',
    'E-ink电子墨水屏更换——碎裂、条纹、白点、局部不显示',
    '电池更换——续航不到一天、充不进电',
    '充电口Micro-USB/Type-C焊接维修',
    '系统刷机修复——卡LOGO、死机、系统崩溃',
    '威海环翠区·2007年至今',
  ]
  const detailsEn = [
    'Amazon Kindle / Paperwhite / Oasis full series repair',
    'Kobo, BOOX, Xiaomi MiaoKan e-reader repair',
    'E-ink screen replacement — cracked, lines, dead pixels, partial display',
    'Battery service — less than a day battery, won\'t charge',
    'Micro-USB/Type-C port soldering repair',
    'System flash — stuck on logo, frozen, crashed OS',
    'Weihai Huancui District · Since 2007',
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb items={[{label:"Kindle / 电子书维修",labelEn:"Kindle / E-reader Repair"}]} />
      
      <section className="bg-gradient-to-br from-amber-600 via-amber-500 to-yellow-500 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-3xl">
            <div className="text-6xl mb-4">📖</div>
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">{t('Kindle / 电子书维修', 'Kindle / E-reader Repair')}</h1>
            <p className="text-amber-200 text-xl mb-4">{t('Amazon Kindle / Kobo / 文石BOOX / 小米多看 专业维修', 'Amazon Kindle / Kobo / BOOX / Xiaomi E-reader Repair')}</p>
            <p className="text-amber-100 leading-relaxed">
              {t('电子书阅读器全系列维修——Kindle / Kindle Paperwhite / Kindle Oasis / Kindle Scribe / Kobo / 文石BOOX / 小米多看电纸书 / 掌阅iReader。E-ink屏幕碎裂更换、电池不耐用更换、充电口维修、系统刷机修复。2007年至今奋斗在维修一线。', 'Full e-reader repair — Kindle / Paperwhite / Oasis / Scribe / Kobo / BOOX / Xiaomi / iReader. E-ink screen replacement, battery service, charging port repair, system flash recovery. Serving since 2007.')}
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <button onClick={() => setShowContact(true)} className="bg-white text-amber-600 font-semibold px-6 py-3 rounded-xl hover:bg-amber-50 transition-colors shadow-lg">{t('📱 微信咨询维修', '📱 WeChat for Repair')}</button>
              <a href="https://wa.me/6596146709?text=我的Kindle需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-600 transition-colors shadow-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-8 pb-2">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-gray-200 shadow-lg">
            <img
              src="/images/services/kindle-repair.jpg"
              alt="Kindle E-reader Repair"
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<div class="flex items-center justify-center h-full text-6xl opacity-30">📖</div>' }}
            />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">{t('维修服务', 'Repair Services')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-lg shrink-0">{s.icon}</div>
                  <h3 className="font-bold text-gray-900 text-lg">{t(s.title, s.titleEn)}</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{t(s.desc, s.descEn)}</p>
                <div className="mt-4 text-amber-600 text-xs font-medium">{t('微信咨询 →', 'Contact →')}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t('服务说明', 'About Our Service')}</h2>
          <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <ul className="space-y-3">
              {(lang === 'zh' ? details : detailsEn).map((d, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="text-amber-500 mt-0.5 shrink-0">▸</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t('支持型号', 'Supported Models')}</h2>
          <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="grid grid-cols-2 gap-3">
              {models.map((m, i) => (
                <div key={i} className="flex items-center gap-2 text-sm"><span className="text-amber-500 shrink-0">▸</span><span className="text-gray-700">{m}</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-amber-600 via-amber-500 to-yellow-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('需要Kindle维修？找我', 'Need Kindle Repair? Contact me')}</h2>
          <p className="text-amber-200 mb-8">{t('免费检测，发照片就能初步判断', 'Free diagnosis, send a photo for a quick check')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setShowContact(true)} className="bg-white text-amber-600 font-semibold px-8 py-4 rounded-xl hover:bg-amber-50 transition-colors shadow-lg text-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
            <a href="https://wa.me/6596146709?text=需要Kindle维修" target="_blank" className="bg-green-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-green-600 transition-colors shadow-lg text-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
          </div>
        </div>
      </section>
    </div>
  )
}
