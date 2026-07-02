'use client'
import { useState } from 'react'
import { ArrowLeft, Smartphone, Battery, Droplets, Cpu, Camera, ChevronDown } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ContactModal from '../../components/ContactModal'
import Image from 'next/image'

export default function SamsungRepair() {
  const [showContact, setShowContact] = useState(false)
  const [lang, setLang] = useState('zh')
  const t = (zh, en) => lang === 'zh' ? zh : en
  
  const services = [
    {id:'screen-replacement', title:'屏幕更换', titleEn:'Screen Replacement', img:'/images/samsung-repair-1.jpg', desc:'Samsung全系列屏幕更换。S系列OLED原装屏，折叠屏Z Fold6/Flip6/5/4/3内屏外屏均可修复。30分钟快修。', descEn:'Samsung full series screen. S series OLED. Foldable Z Fold6/Flip6/5/4/3 inner & outer.'},
    {id:'battery-replacement', title:'电池更换', titleEn:'Battery Replacement', img:'/images/samsung-repair-2.jpg', desc:'Samsung原装规格电池，S25到S21全系列电池现货。A系列、Note系列、Z系列电池均有货。', descEn:'Samsung OEM batteries. S25 through S21, A series, Note, Z Fold/Flip series in stock.'},
    {id:'water-damage', title:'进水维修', titleEn:'Water Damage', img:'/images/samsung-repair-3.jpg', desc:'超声波清洗+主板烘干+腐蚀修复。Samsung进水处理，IP68防水机型进水后仍需及时处理。', descEn:'Ultrasonic cleaning + board dry + corrosion repair. IP68 water resistance degrades over time.'},
    {id:'motherboard-repair', title:'主板维修', titleEn:'Motherboard Repair', img:'/images/samsung-repair-4.jpg', desc:'不开机、重启循环、WiFi/蓝牙打不开。芯片级维修，Samsung全系列主板。', descEn:'No power, boot loop, WiFi/BT dead. Component-level repair for all Samsung models.'},
    {id:'camera-repair', title:'摄像头维修', titleEn:'Camera Repair', img:'/images/samsung-repair-5.jpg', desc:'拍照模糊、黑屏、闪烁。S系列高像素摄像头更换维修，前置/后置均可。', descEn:'Blurry photos, black screen. S series high-res camera, front & back repair.'},
    {id:'charging-port', title:'充电口维修', titleEn:'Charging Port', img:'/images/samsung-repair-6.jpg', desc:'充不进电、充电慢、Type-C接口松动。Samsung全系列Type-C充电口更换。', descEn:'Wont charge, slow charging, loose USB-C port. Full series charging port repair.'}
  ]
  
  const models = [
      t('Galaxy S25 Ultra / S25+ / S25', 'Galaxy S25 Ultra / S25+ / S25'),
      t('Galaxy S24 FE / S24 Ultra / S24+ / S24', 'Galaxy S24 FE / S24 Ultra / S24+ / S24'),
      t('Galaxy S23 Ultra / S23+ / S23 / S23 FE', 'Galaxy S23 Ultra / S23+ / S23 / S23 FE'),
      t('Galaxy S22 Ultra / S22+ / S22', 'Galaxy S22 Ultra / S22+ / S22'),
      t('Galaxy S21 Ultra / S21+ / S21 / S21 FE', 'Galaxy S21 Ultra / S21+ / S21 / S21 FE'),
      t('Galaxy Z Fold6 / Z Fold5 / Z Fold4 / Z Fold3', 'Galaxy Z Fold6 / Z Fold5 / Z Fold4 / Z Fold3'),
      t('Galaxy Z Flip6 / Z Flip5 / Z Flip4 / Z Flip3', 'Galaxy Z Flip6 / Z Flip5 / Z Flip4 / Z Flip3'),
      t('Galaxy A56 / A55 / A36 / A35 / A26 / A25 / A16', 'Galaxy A56 / A55 / A36 / A35 / A26 / A25 / A16'),
      t('Galaxy Note20 Ultra / Note20', 'Galaxy Note20 Ultra / Note20')
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
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">{t('Samsung 维修', 'Samsung Repair')}</h1>
            <p className="text-blue-200 text-xl mb-4">{t('三星 Galaxy 全系列专业维修 | 威海环翠区', 'Samsung Galaxy Repair for All Models | Weihai')}</p>
            <p className="text-blue-100 leading-relaxed">
              {t('三星手机换屏、换电池、修主板、折叠屏修复。Galaxy S25到S21全系列，Z Fold/Flip折叠屏内外屏均可修。2007年至今奋斗在维修一线。', 'Samsung screen replacement, battery, motherboard, foldable display repair. S25 through S21 series, Z Fold/Flip. Since 2007.')}
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <button onClick={() => setShowContact(true)} className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-lg">
                {t('📱 微信咨询维修', '📱 WeChat for Repair')}
              </button>
              <a href="https://wa.me/6596146709?text=我的Samsung Repair需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-600 transition-colors shadow-lg">
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
