'use client'
import { useSite } from '../../lib/SiteContext'
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Breadcrumb from "../../components/Breadcrumb";

export default function SonyRepair() {
  const { lang, setShowContact } = useSite();
  const t = (zh, en) => lang === 'zh' ? zh : en

  const services = [
    {id:'joystick-drift', icon:'🎮', title:'手柄漂移维修', titleEn:'Joystick Drift', desc:'PS5 DualSense/PS4手柄摇杆漂移、不回中。霍尔效应摇杆改装。', descEn:'PS5 DualSense/PS4 controller stick drift. Hall effect joystick mod.'},
    {id:'cleaning', icon:'🧹', title:'清灰散热', titleEn:'Cleaning & Cooling', desc:'PS5/PS4发热严重、风扇异响、自动关机。深度清灰+换导热硅脂。', descEn:'PS5/PS4 overheating, fan noise, auto shutdown. Deep clean + thermal paste.'},
    {id:'disc-drive', icon:'💿', title:'光驱维修', titleEn:'Disc Drive Repair', desc:'PS5/PS4光驱不读盘、卡盘、异响。光驱组件维修更换。', descEn:'PS5/PS4 disc drive not reading, stuck, noisy. Drive assembly repair.'},
    {id:'power-supply', icon:'🔌', title:'电源维修', titleEn:'Power Supply', desc:'PS5/PS4不开机、自动断电、电源灯不亮。电源板芯片级维修。', descEn:'PS5/PS4 no power, auto shutdown. Power board component repair.'},
    {id:'hdmi-port', icon:'📺', title:'HDMI口维修', titleEn:'HDMI Port', desc:'PS5/PS4 HDMI口松动、不显示、花屏。HDMI接口焊接更换。', descEn:'PS5/PS4 HDMI port loose, no display. Port soldering replacement.'},
    {id:'psp-repair', icon:'🎮', title:'PSP/PSV维修', titleEn:'PSP/PSV Repair', desc:'PSP/PSV屏幕更换、电池更换、充电口维修、按键失灵。', descEn:'PSP/PSV screen, battery, charging port, button repair.'},
  ]

  const models = [
    'PlayStation 5 / PS5 Pro',
    'PlayStation 5 Slim',
    'PlayStation 4 Pro',
    'PlayStation 4 Slim',
    'PlayStation 4 (初版)',
    'PSP 3000 / 2000 / 1000',
    'PS Vita / PS Vita Slim',
    'DualSense / DualShock 4 手柄',
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb items={[{label:"索尼维修",labelEn:"Sony Repair"}]} />
      
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-3xl">
            <div className="text-6xl mb-4">🎮</div>
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">{t('Sony / PlayStation 维修', 'Sony / PlayStation Repair')}</h1>
            <p className="text-blue-200 text-xl mb-4">{t('PS5 / PS4 / PSP / PS Vita 专业维修 | 威海环翠区', 'PS5 / PS4 / PSP / PS Vita Professional Repair | Weihai')}</p>
            <p className="text-blue-100 leading-relaxed">
              {t('Sony PlayStation全系列维修——PS5/PS4手柄漂移霍尔效应改装、深度清灰散热、光驱维修、电源板芯片级维修、HDMI口更换、PSP/PSV屏幕电池更换。2007年至今奋斗在维修一线。', 'Full Sony PlayStation repair — PS5/PS4 hall effect joystick mod, deep cleaning, disc drive repair, PSU chip-level repair, HDMI port replacement, PSP/PSV screen and battery service. Serving since 2007.')}
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <button onClick={() => setShowContact(true)} className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-lg">{t('📱 微信咨询维修', '📱 WeChat for Repair')}</button>
              <a href="https://wa.me/6596146709?text=我的PlayStation需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-600 transition-colors shadow-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-8 pb-2">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-gray-200 shadow-lg">
            <img
              src="/images/services/sony-repair.jpg"
              alt="Sony PlayStation Repair"
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
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-lg shrink-0">{s.icon}</div>
                  <h3 className="font-bold text-gray-900 text-lg">{t(s.title, s.titleEn)}</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{t(s.desc, s.descEn)}</p>
                <div className="mt-4 text-blue-600 text-xs font-medium">{t('微信咨询 →', 'Contact →')}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t('支持型号', 'Supported Models')}</h2>
          <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="grid grid-cols-2 gap-3">
              {models.map((m, i) => (
                <div key={i} className="flex items-center gap-2 text-sm"><span className="text-blue-500 shrink-0">▸</span><span className="text-gray-700">{m}</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('需要Sony维修？找我', 'Need Sony Repair? Contact me')}</h2>
          <p className="text-blue-200 mb-8">{t('免费检测，发照片就能初步判断', 'Free diagnosis, send a photo for a quick check')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setShowContact(true)} className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors shadow-lg text-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
            <a href="https://wa.me/6596146709?text=需要PlayStation维修" target="_blank" className="bg-green-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-green-600 transition-colors shadow-lg text-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
          </div>
        </div>
      </section>
    </div>
  )
}
