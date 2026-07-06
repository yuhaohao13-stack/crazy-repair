'use client'
import { useSite } from '../../lib/SiteContext'
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Breadcrumb from "../../components/Breadcrumb";

export default function NintendoRepair() {
  const { lang, setShowContact } = useSite();
  const t = (zh, en) => lang === 'zh' ? zh : en

  const services = [
    {id:'console-joystick-drift', icon:'🎮', title:'手柄漂移维修', titleEn:'Joystick Drift', desc:'Switch Joy-Con左右手柄漂移、不回中。霍尔效应摇杆改装升级，永不漂移。', descEn:'Switch Joy-Con drift, not centering. Hall effect joystick mod — never drift again.'},
    {id:'console-screen', icon:'📱', title:'屏幕更换', titleEn:'Screen Replacement', desc:'Switch OLED/Switch/Lite屏幕碎裂漏液。OLED/LCD屏幕更换，含触摸校准。', descEn:'Switch OLED/Switch/Lite cracked screen. OLED/LCD replacement with touch calibration.'},
    {id:'console-battery', icon:'🔋', title:'电池更换', titleEn:'Battery Service', desc:'Switch主机/手柄电池不耐用、鼓包、充不进电。原装规格电池。', descEn:'Switch console/controller battery drain, swelling. OEM spec battery.'},
    {id:'console-cleaning', icon:'🧹', title:'清灰散热', titleEn:'Cleaning & Cooling', desc:'Switch发热严重、风扇异响。深度拆机清灰+换导热硅脂。', descEn:'Switch overheating, fan noise. Deep clean + thermal paste.'},
    {id:'console-mods', icon:'⚡', title:'破解改装', titleEn:'Console Mods', desc:'Switch OLED/Switch芯片破解系统安装、外壳DIY改色。', descEn:'Switch OLED/Switch mod chip install, DIY shell color change.'},
  ]

  const models = [
    'Nintendo Switch OLED',
    'Nintendo Switch (续航版)',
    'Nintendo Switch (初版)',
    'Nintendo Switch Lite',
    'New 3DS LL / 3DS LL',
    'New 2DS LL / 2DS',
    'Joy-Con L/R 手柄',
    'Switch Pro 手柄',
  ]

  const details = [
    'Nintendo Switch OLED / Switch / Switch Lite 全系列维修',
    'Joy-Con手柄漂移霍尔效应改装 — 物理无接触，永不漂移',
    '屏幕OLED/LCD更换，含触摸校准',
    '主机/手柄电池更换，原装规格',
    '深度拆机清灰散热，有效降温',
    '芯片破解系统安装，含备份NAND',
    '威海环翠区·2007年至今',
  ]
  const detailsEn = [
    'Nintendo Switch OLED / Switch / Switch Lite full series repair',
    'Hall effect joystick mod — no physical contact, never drifts again',
    'OLED/LCD screen replacement with touch calibration',
    'Console/controller battery replacement, OEM spec',
    'Deep cleaning and cooling, effective temperature reduction',
    'Mod chip system install, includes NAND backup',
    'Weihai Huancui District · Since 2007',
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb items={[{label:"任天堂维修",labelEn:"Nintendo Repair"}]} />
      
      <section className="bg-gradient-to-br from-red-600 via-red-500 to-red-400 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-3xl">
            <div className="text-6xl mb-4">🎮</div>
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">{t('Nintendo 维修', 'Nintendo Repair')}</h1>
            <p className="text-red-200 text-xl mb-4">{t('任天堂 Switch / Switch OLED / Switch Lite 专业维修 | 威海环翠区', 'Nintendo Switch / Switch OLED / Switch Lite Professional Repair | Weihai')}</p>
            <p className="text-red-100 leading-relaxed">
              {t('任天堂全系列维修——Switch OLED/Switch/Switch Lite屏幕更换、Joy-Con手柄漂移霍尔效应改装、电池更换、充电口维修、清灰散热、芯片破解。2007年至今奋斗在维修一线。', 'Full Nintendo console repair — Switch OLED/Switch/Lite screen replacement, Joy-Con hall effect joystick mod, battery service, charging port repair, deep cleaning, mod chip install. Serving since 2007.')}
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <button onClick={() => setShowContact(true)} className="bg-white text-red-600 font-semibold px-6 py-3 rounded-xl hover:bg-red-50 transition-colors shadow-lg">{t('📱 微信咨询维修', '📱 WeChat for Repair')}</button>
              <a href="https://wa.me/6596146709?text=我的Nintendo需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-600 transition-colors shadow-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-8 pb-2">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-gray-200 shadow-lg">
            <img
              src="/images/services/nintendo-repair.jpg"
              alt="Nintendo Repair"
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<div class="flex items-center justify-center h-full text-6xl opacity-30">🎮</div>' }}
            />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">{t('维修服务', 'Repair Services')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <a key={i} href={'/other-repair/console/' + s.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all group block">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-lg shrink-0">{s.icon}</div>
                    <h3 className="font-bold text-gray-900 text-lg">{t(s.title, s.titleEn)}</h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{t(s.desc, s.descEn)}</p>
                  <div className="mt-4 text-red-600 text-xs font-medium flex items-center gap-1">{t('查看详情 →', 'View Details →')}</div>
                </div>
              </a>
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
                  <span className="text-red-500 mt-0.5 shrink-0">▸</span>
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
                <div key={i} className="flex items-center gap-2 text-sm"><span className="text-red-500 shrink-0">▸</span><span className="text-gray-700">{m}</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-red-600 via-red-500 to-red-400 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('需要Nintendo维修？找我', 'Need Nintendo Repair? Contact me')}</h2>
          <p className="text-red-200 mb-8">{t('免费检测，发照片就能初步判断', 'Free diagnosis, send a photo for a quick check')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setShowContact(true)} className="bg-white text-red-600 font-semibold px-8 py-4 rounded-xl hover:bg-red-50 transition-colors shadow-lg text-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
            <a href="https://wa.me/6596146709?text=需要Nintendo维修" target="_blank" className="bg-green-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-green-600 transition-colors shadow-lg text-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
          </div>
        </div>
      </section>
    </div>
  )
}
