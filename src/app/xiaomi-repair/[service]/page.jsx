'use client'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import ContactModal from '../../../components/ContactModal'
import { repairServices } from '../../../data/repairServices'
import { useParams, usePathname } from 'next/navigation'

const imageMap = {
  screen: ['img_1.jpg','img_3.jpg','img_7.jpg','img_47.jpg','img_60.jpg','img_73.jpg','img_75.jpg','img_78.jpg','img_80.jpg','img_81.jpg','img_82.jpg','img_83.jpg','img_84.jpg','img_85.jpg','img_86.jpg','img_87.jpg'],
  battery: ['img_4.jpg','img_10.jpg','img_14.jpg','img_19.jpg','img_24.jpg','img_25.jpg','img_30.jpg','img_36.jpg','img_38.jpg','img_39.jpg','img_41.jpg','img_44.jpg','img_45.jpg','img_50.jpg','img_53.jpg'],
  water: ['img_5.jpg','img_12.jpg','img_15.jpg','img_18.jpg','img_21.jpg','img_27.jpg','img_28.jpg','img_32.jpg','img_33.jpg'],
  board: ['img_2.png','img_6.png','img_13.jpg','img_48.png','img_52.png','img_57.jpg','img_62.jpg','img_63.jpg','img_64.jpg','img_67.jpg'],
  camera: ['img_79.png','img_91.jpg','img_92.jpg','img_93.jpg','img_94.jpg','img_95.jpg','img_96.jpg','img_97.jpg'],
  faceid: ['img_69.jpg','img_70.jpg','img_71.webp'],
  port: ['img_76.jpg','img_77.jpg'],
}

const brandConfig = {
  'iphone-repair': { key: 'iphone', label: 'iPhone 维修', labelEn: 'iPhone Repair', gradient: 'from-blue-700 via-blue-600 to-blue-500' },
  'macbook-repair': { key: 'macbook', label: 'MacBook 维修', labelEn: 'MacBook Repair', gradient: 'from-gray-800 via-gray-700 to-gray-600' },
  'samsung-repair': { key: 'samsung', label: 'Samsung 维修', labelEn: 'Samsung Repair', gradient: 'from-purple-700 via-purple-600 to-purple-500' },
  'xiaomi-repair': { key: 'xiaomi', label: 'Xiaomi 维修', labelEn: 'Xiaomi Repair', gradient: 'from-orange-600 via-orange-500 to-yellow-500' },
  'huawei-repair': { key: 'huawei', label: 'Huawei 维修', labelEn: 'Huawei Repair', gradient: 'from-red-600 via-red-500 to-red-400' },
}

export default function ServiceDetail() {
  const [showContact, setShowContact] = useState(false)
  const [lang, setLang] = useState('zh')
  const params = useParams()
  const pathname = usePathname()
  const t = (zh, en) => lang === 'zh' ? zh : en

  const serviceId = params?.service || ''
  let brandDir = 'iphone-repair'
  for (const dir of Object.keys(brandConfig)) {
    if (pathname?.startsWith('/' + dir)) { brandDir = dir; break }
  }
  const info = brandConfig[brandDir]
  const brand = repairServices[info.key]
  const service = brand?.services.find(s => s.id === serviceId)

  if (!brand || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">{t('服务未找到', 'Not Found')}</h1>
          <a href={'/' + brandDir} className="text-blue-600 mt-4 inline-block">{t('← 返回', '← Back')}</a>
        </div>
      </div>
    )
  }

  const images = (imageMap[service.imageHint] || []).slice(0, 6)

  return (
    <div className="min-h-screen bg-white">
      <Navbar lang={lang} setLang={setLang} setShowContact={setShowContact} />
      
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 text-xs text-gray-500 flex gap-1.5 flex-wrap">
          <a href="/" className="hover:text-blue-600">{t('首页', 'Home')}</a>
          <span>/</span>
          <a href={'/' + brandDir} className="hover:text-blue-600">{lang === 'zh' ? info.label : info.labelEn}</a>
          <span>/</span>
          <span className="text-gray-800">{lang === 'zh' ? service.title : service.titleEn}</span>
        </div>
      </div>

      <section className={'bg-gradient-to-br ' + info.gradient + ' text-white'}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <a href={'/' + brandDir} className="inline-flex items-center gap-1 text-white/70 hover:text-white text-xs mb-3">
            <ArrowLeft size={12} /> {t('← 返回' + info.label, '← Back to ' + info.labelEn)}
          </a>
          <h1 className="text-2xl sm:text-4xl font-bold mb-2">{lang === 'zh' ? service.title : service.titleEn}</h1>
          <p className="text-base sm:text-lg text-white/90 max-w-2xl">{lang === 'zh' ? service.description : service.descriptionEn}</p>
          <div className="mt-4 flex gap-3">
            <span className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full">{service.prices}</span>
            <span className="text-xs text-white/70">{t('免费检测 · 先报价后维修', 'Free check · Quote first')}</span>
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            <button onClick={() => setShowContact(true)} className="bg-white text-blue-600 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-blue-50 shadow-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
            <a href={'https://wa.me/6596146709?text=' + encodeURIComponent('咨询' + info.label + ' ' + service.title)} target="_blank" className="bg-green-500 text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-green-600 shadow-lg">{t('💬 WhatsApp', '💬 WhatsApp')}</a>
          </div>
        </div>
      </section>

      {images.length > 0 && (
        <section className="py-6 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="font-bold text-gray-900 mb-3 text-sm">{t('维修案例图片', 'Repair Examples')}</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
              {images.map((img, i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden bg-white border border-gray-200 shadow-sm">
                  <img src={'/images/' + img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform" loading="lazy" onError={(e) => { e.target.style.display = 'none' }} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{t('服务详情', 'Details')}</h2>
          <p className="text-xs text-gray-400 mb-5">{t('参考价格', 'Price')}: <span className="font-semibold text-green-600">{service.prices}</span></p>
          <div className="bg-gray-50 rounded-2xl p-5 sm:p-8 border border-gray-100">
            {(lang === 'zh' ? service.details : service.detailsEn).split('\n').filter(Boolean).map((p, i) => (
              <p key={i} className="text-gray-600 text-sm leading-relaxed mb-3 last:mb-0">{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">{t('其他' + info.label + '服务', 'Other ' + info.labelEn + ' Services')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {brand.services.filter(s => s.id !== serviceId).map((s, i) => (
              <a key={i} href={'/' + brandDir + '/' + s.id} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 block transition-all">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900 text-sm">{lang === 'zh' ? s.title : s.titleEn}</h3>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded shrink-0">{s.prices}</span>
                </div>
                <p className="text-xs text-gray-500 line-clamp-2">{lang === 'zh' ? s.description : s.descriptionEn}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-3">{t('需要' + service.title + '？找我', 'Need ' + service.titleEn + '? Contact me')}</h2>
          <p className="text-blue-200 text-sm mb-6">{t('免费检测，发照片就能初步判断', 'Free diagnosis')}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={() => setShowContact(true)} className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 shadow-md">{t('📱 微信咨询', '📱 WeChat')}</button>
            <a href={'https://wa.me/6596146709?text=' + encodeURIComponent('咨询' + service.title)} target="_blank" className="bg-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-600 shadow-md">{t('💬 WhatsApp', '💬 WhatsApp')}</a>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
      <ContactModal show={showContact} setShow={setShowContact} lang={lang} />
    </div>
  )
}
