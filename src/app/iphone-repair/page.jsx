'use client'
import { useSite } from '../../lib/SiteContext'
import { useState } from 'react'
import { ArrowLeft, Smartphone, Battery, Droplets, Cpu, Camera, ChevronDown } from 'lucide-react'
import Navbar from '../../components/Navbar'

export default function IphoneRepair() {
  const { lang, setShowContact } = useSite();
  const t = (zh, en) => lang === 'zh' ? zh : en
  
  const services = [
    {id:'screen-replacement', title:'屏幕更换', titleEn:'Screen Replacement', desc:'iPhone 16/15/14/13/12/11/X系列全兼容。OLED原装屏/LCD高性价比屏可选。含专业密封胶恢复防水性。30分钟快修。', descEn:'iPhone 16/15/14/13/12/11/X series. OEM OLED or LCD options. Waterproof sealant restored. 30min.'},
    {id:'battery-replacement', title:'电池更换', titleEn:'Battery Replacement', desc:'原装规格电池，容量达标不虚标。iPhone 6到16全系列电池现货。更换后检测健康度。告别一天三充。', descEn:'OEM spec batteries. iPhone 6 through 16 in stock. Health check after swap.'},
    {id:'water-damage', title:'进水维修', titleEn:'Water Damage', desc:'超声波清洗+主板烘干+腐蚀修复。进水越早送来越好，切勿插电充电！丰富的iPhone进水处理经验。', descEn:'Ultrasonic cleaning + board dry + corrosion repair. Bring ASAP, do NOT charge! Extensive water damage experience.'},
    {id:'motherboard-repair', title:'主板维修', titleEn:'Motherboard Repair', desc:'不开机、重启循环、无服务、WiFi蓝牙打不开、面容不可用。芯片级维修，CPU重焊、基带修复、硬盘扩容。', descEn:'No power, boot loop, no service, WiFi/BT dead, Face ID gone. Component-level repair.'},
    {id:'camera-repair', title:'摄像头维修', titleEn:'Camera Repair', desc:'拍照模糊、闪退、黑屏、对焦失灵。前后摄像头更换。iPhone 15/14/13/12/11/X全系。', descEn:'Blurry photos, app crash, black screen, autofocus fail. Front & back camera replacement.'},
    {id:'face-id', title:'面容/指纹修复', titleEn:'Face ID/Touch ID', desc:'面容ID点阵修复、前置摄像头排线。换屏后面容不能用也可修复。iPhone X及以上面容，SE/8及以下指纹。', descEn:'Face ID dot matrix repair. Works after screen swap. iPhone X+, SE/8 and below.'}
  ]
  
  const models = [
      t('iPhone 16 Pro Max / Pro / Plus / 16 / 16e', 'iPhone 16 Pro Max / Pro / Plus / 16 / 16e'),
      t('iPhone 15 Pro Max / Pro / Plus / 15', 'iPhone 15 Pro Max / Pro / Plus / 15'),
      t('iPhone 14 Pro Max / Pro / Plus / 14', 'iPhone 14 Pro Max / Pro / Plus / 14'),
      t('iPhone 13 Pro Max / Pro / 13 / 13 Mini', 'iPhone 13 Pro Max / Pro / 13 / 13 Mini'),
      t('iPhone 12 Pro Max / Pro / 12 / 12 Mini', 'iPhone 12 Pro Max / Pro / 12 / 12 Mini'),
      t('iPhone 11 Pro Max / Pro / 11 / SE 3/2', 'iPhone 11 Pro Max / Pro / 11 / SE 3/2'),
      t('iPhone XS Max / XS / XR / X', 'iPhone XS Max / XS / XR / X'),
      t('iPhone 8 Plus / 8 / 7 Plus / 7 / 6s / 6', 'iPhone 8 Plus / 8 / 7 Plus / 7 / 6s / 6'),
      t('iPhone SE (2022/2020)', 'iPhone SE (2022/2020)')
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 flex items-center gap-2 text-sm">
          <a href="/" className="text-white/60 hover:text-white transition-colors">{t("首页", "Home")}</a>
          <span className="text-white/30">/</span>
          <a href="/phone-repair" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-medium transition-colors">
            <ArrowLeft size={15} /> {t('手机品牌', 'Phone Brands')}
          </a>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">{t('iPhone 维修', 'iPhone Repair')}</h1>
            <p className="text-blue-200 text-xl mb-4">{t('苹果 iPhone 全系列专业维修 | 威海环翠区', 'Professional iPhone Repair for All Models | Weihai')}</p>
            <p className="text-blue-100 leading-relaxed">
              {t('iPhone换屏、换电池、修主板、修面容、处理进水——所有iPhone型号都能修。2007年至今奋斗在维修一线，经验丰富。先检测后报价，价格透明，30天质保。', 'iPhone screen replacement, battery swap, motherboard repair, Face ID fix, water damage — all models iPhone 6 through 16. Since 2007. Free diagnosis, 30-day warranty.')}
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <button onClick={() => setShowContact(true)} className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-lg">
                {t('📱 微信咨询维修', '📱 WeChat for Repair')}
              </button>
              <a href="https://wa.me/6596146709?text=我的iPhone需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-600 transition-colors shadow-lg">
                {t('💬 WhatsApp咨询', '💬 WhatsApp')}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">{t('维修服务', 'Repair Services')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <a key={i} href={'/iphone-repair/' + s.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all group block">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 text-lg shrink-0">
                      {['🔧','🔋','💧','🔬','📷','👤'][i] || '🔧'}
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg">{t(s.title, s.titleEn)}</h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{t(s.desc, s.descEn)}</p>
                  <div className="mt-4 text-blue-600 text-xs font-medium flex items-center gap-1">{t('查看详情 →', 'View Details →')}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t('支持型号', 'Supported Models')}</h2>
          <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('有问题？找我', 'Issues? Hit me up')}</h2>
          <p className="text-blue-200 mb-8">{t('免费检测，先报价后维修。添加微信发张照片就能初步判断。', 'Free diagnosis. Add WeChat, send a photo for a quick assessment.')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setShowContact(true)} className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors shadow-lg text-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
            <a href="https://wa.me/6596146709?text=需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-green-600 transition-colors shadow-lg text-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
          </div>
        </div>
      </section>
    </div>
  )
}
