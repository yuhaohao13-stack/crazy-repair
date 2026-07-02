'use client'
import { useState } from 'react'
import { ArrowLeft, Smartphone, Battery, Droplets, Cpu, Camera, ChevronDown } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ContactModal from '../../components/ContactModal'
import Image from 'next/image'

export default function IphoneRepair() {
  const [showContact, setShowContact] = useState(false)
  const [lang, setLang] = useState('zh')
  const t = (zh, en) => lang === 'zh' ? zh : en
  
  const services = [
    {id:'screen-replacement', title:'屏幕更换', titleEn:'Screen Replacement', img:'/images/iphone-repair-1.jpg', desc:'iPhone 16/15/14/13/12/11/X系列全兼容。OLED原装屏/LCD高性价比屏可选。含专业密封胶恢复防水性。30分钟快修。', descEn:'iPhone 16/15/14/13/12/11/X series. OEM OLED or LCD options. Waterproof sealant restored. 30min.'},
    {id:'battery-replacement', title:'电池更换', titleEn:'Battery Replacement', img:'/images/iphone-repair-2.jpg', desc:'原装规格电池，容量达标不虚标。iPhone 6到16全系列电池现货。更换后检测健康度。告别一天三充。', descEn:'OEM spec batteries. iPhone 6 through 16 in stock. Health check after swap.'},
    {id:'water-damage', title:'进水维修', titleEn:'Water Damage', img:'/images/iphone-repair-3.jpg', desc:'超声波清洗+主板烘干+腐蚀修复。进水越早送来越好，切勿插电充电！丰富的iPhone进水处理经验。', descEn:'Ultrasonic cleaning + board dry + corrosion repair. Bring ASAP, do NOT charge! Extensive water damage experience.'},
    {id:'motherboard-repair', title:'主板维修', titleEn:'Motherboard Repair', img:'/images/iphone-repair-4.jpg', desc:'不开机、重启循环、无服务、WiFi蓝牙打不开、面容不可用。芯片级维修，CPU重焊、基带修复、硬盘扩容。', descEn:'No power, boot loop, no service, WiFi/BT dead, Face ID gone. Component-level repair.'},
    {id:'camera-repair', title:'摄像头维修', titleEn:'Camera Repair', img:'/images/iphone-repair-5.jpg', desc:'拍照模糊、闪退、黑屏、对焦失灵。前后摄像头更换。iPhone 15/14/13/12/11/X全系。', descEn:'Blurry photos, app crash, black screen, autofocus fail. Front & back camera replacement.'},
    {id:'face-id', title:'面容/指纹修复', titleEn:'Face ID/Touch ID', img:'/images/iphone-repair-6.jpg', desc:'面容ID点阵修复、前置摄像头排线。换屏后面容不能用也可修复。iPhone X及以上面容，SE/8及以下指纹。', descEn:'Face ID dot matrix repair. Works after screen swap. iPhone X+, SE/8 and below.'}
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
      <Navbar lang={lang} setLang={setLang} setShowContact={setShowContact} />
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4">
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
              <a href="https://wa.me/6596146709?text=我的iPhone Repair需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-600 transition-colors shadow-lg">
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
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all group">
                <div className="relative h-48 bg-gray-100">
                  <Image src={s.img} alt={t(s.title, s.titleEn)} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width:768px)100vw,33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 text-blue-600 font-bold text-sm">{t(s.title, s.titleEn)}</div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-gray-500 leading-relaxed">{t(s.desc, s.descEn)}</p>
                </div>
              </div>
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
      <Footer lang={lang} />
      <ContactModal show={showContact} setShow={setShowContact} lang={lang} />
    </div>
  )
}
