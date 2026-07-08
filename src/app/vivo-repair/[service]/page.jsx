'use client'
import { useSite } from '../../../lib/SiteContext'
import { useState, useMemo } from 'react'
import { ChevronDown } from 'lucide-react'
import Navbar from '../../../components/Navbar'
import Breadcrumb from "../../../components/Breadcrumb";
import { repairServices } from '../../../data/repairServices'
import modelDB from '../../../data/modelDB'
import { useParams, usePathname } from 'next/navigation'


const brandConfig = {
  'iphone-repair': { key: 'iphone', label: 'iPhone 维修', labelEn: 'iPhone Repair', gradient: 'from-blue-700 via-blue-600 to-blue-500' },
  'macbook-repair': { key: 'macbook', label: 'MacBook 维修', labelEn: 'MacBook Repair', gradient: 'from-gray-800 via-gray-700 to-gray-600' },
  'samsung-repair': { key: 'samsung', label: 'Samsung 维修', labelEn: 'Samsung Repair', gradient: 'from-purple-700 via-purple-600 to-purple-500' },
  'xiaomi-repair': { key: 'xiaomi', label: 'Xiaomi 维修', labelEn: 'Xiaomi Repair', gradient: 'from-orange-600 via-orange-500 to-yellow-500' },
  'huawei-repair': { key: 'huawei', label: 'Huawei 维修', labelEn: 'Huawei Repair', gradient: 'from-red-600 via-red-500 to-red-400' },
  'oppo-repair': { key: 'oppo', label: 'OPPO 维修', labelEn: 'OPPO Repair', gradient: 'from-green-700 via-green-600 to-green-500' },
  'vivo-repair': { key: 'vivo', label: 'VIVO 维修', labelEn: 'VIVO Repair', gradient: 'from-blue-800 via-blue-700 to-blue-600' },
  'oneplus-repair': { key: 'oneplus', label: 'OnePlus 维修', labelEn: 'OnePlus Repair', gradient: 'from-red-700 via-red-600 to-red-500' },
  'google-repair': { key: 'google', label: 'Google 维修', labelEn: 'Google Repair', gradient: 'from-blue-500 via-blue-400 to-blue-300' },
  'honor-repair': { key: 'honor', label: 'Honor 维修', labelEn: 'Honor Repair', gradient: 'from-indigo-700 via-indigo-600 to-indigo-500' },
  'realme-repair': { key: 'realme', label: 'Realme 维修', labelEn: 'Realme Repair', gradient: 'from-yellow-600 via-yellow-500 to-yellow-400' },
  'lenovo-repair': { key: 'lenovo', label: 'Lenovo 维修', labelEn: 'Lenovo Repair', gradient: 'from-blue-700 via-blue-600 to-blue-500' },
  'dell-repair': { key: 'dell', label: '戴尔 维修', labelEn: 'Dell Repair', gradient: 'from-blue-600 via-blue-500 to-blue-400' },
  'hp-repair': { key: 'hp', label: '惠普 维修', labelEn: 'HP Repair', gradient: 'from-teal-700 via-teal-600 to-teal-500' },
  'asus-repair': { key: 'asus', label: '华硕 维修', labelEn: 'ASUS Repair', gradient: 'from-cyan-700 via-cyan-600 to-cyan-500' },
  'acer-repair': { key: 'acer', label: '宏基 维修', labelEn: 'Acer Repair', gradient: 'from-green-700 via-green-600 to-green-500' },
  'msi-repair': { key: 'msi', label: '微星 维修', labelEn: 'MSI Repair', gradient: 'from-red-700 via-red-600 to-red-500' },
  'surface-repair': { key: 'surface', label: 'Surface 维修', labelEn: 'Surface Repair', gradient: 'from-gray-700 via-gray-600 to-gray-500' },
  'hasee-repair': { key: 'hasee', label: '神舟 维修', labelEn: 'Hasee Repair', gradient: 'from-indigo-700 via-indigo-600 to-indigo-500' },
  'ipad-repair': { key: 'ipad', label: 'iPad 维修', labelEn: 'iPad Repair', gradient: 'from-blue-700 via-blue-600 to-blue-500' },
}

// 品牌目录 → modelDB 品牌名&页面映射
const brandDirModelFilter = {
  'iphone-repair': { brand: 'Apple', page: '/iphone-repair' },
  'macbook-repair': { brand: 'Apple', page: '/macbook-repair' },
  'samsung-repair': { brand: 'Samsung', page: '/samsung-repair' },
  'xiaomi-repair': { brand: 'Xiaomi', page: '/xiaomi-repair' },
  'huawei-repair': { brand: 'Huawei', page: '/huawei-repair' },
  'oppo-repair': { brand: 'OPPO', page: '/oppo-repair' },
  'vivo-repair': { brand: 'VIVO', page: '/vivo-repair' },
  'oneplus-repair': { brand: 'OnePlus', page: '/oneplus-repair' },
  'google-repair': { brand: 'Google', page: '/google-repair' },
  'honor-repair': { brand: 'Honor', page: '/honor-repair' },
  'realme-repair': { brand: 'Realme', page: '/realme-repair' },
  'lenovo-repair': { brand: 'Lenovo', page: '/lenovo-repair' },
  'dell-repair': { brand: 'Dell', page: '/dell-repair' },
  'hp-repair': { brand: 'HP', page: '/hp-repair' },
  'asus-repair': { brand: 'ASUS', page: '/asus-repair' },
  'acer-repair': { brand: 'Acer', page: '/acer-repair' },
  'msi-repair': { brand: 'MSI', page: '/msi-repair' },
  'surface-repair': { brand: 'Microsoft', page: '/surface-repair' },
  'hasee-repair': { brand: 'Hasee', page: '/hasee-repair' },
  'ipad-repair': { brand: 'Apple', page: '/ipad-repair' },
}

export default function ServiceDetail() {
  const { lang, setShowContact } = useSite();
  const [showModels, setShowModels] = useState(false)
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

  // 获取该品牌的支持机型列表
  const filterInfo = brandDirModelFilter[brandDir]
  const brandModels = useMemo(() => {
    if (!filterInfo) return []
    return modelDB.filter(m => m.brand === filterInfo.brand && m.page === filterInfo.page)
  }, [filterInfo])

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


  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <Breadcrumb items={[
        { label: info.label, labelEn: info.labelEn, href: "/" + brandDir },
        { label: service.title, labelEn: service.titleEn },
      ]} />

      <section className={'bg-gradient-to-br ' + info.gradient + ' text-white'}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <h1 className="text-2xl sm:text-4xl font-bold mb-2">{lang === 'zh' ? service.title : service.titleEn}</h1>
          <p className="text-base sm:text-lg text-white/90 max-w-2xl">{lang === 'zh' ? service.description : service.descriptionEn}</p>
          <div className="mt-4 flex gap-3">
            <span className="text-xs text-white/70">{t('免费检测 · 先报价后维修', 'Free check · Quote first')}</span>
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            <button onClick={() => setShowContact(true)} className="bg-white text-blue-600 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-blue-50 shadow-lg">
                {t("@数立即咨询", "@数Contact Now")}
              </button>
          </div>
        </div>
      </section>

      {/* 品牌服务对应配图 */}
      <section className="pt-8 pb-2">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-gray-900 shadow-lg">
            <img
              src={'/images/services/' + brandDir + '-' + serviceId + '.svg'}
              alt={lang === 'zh' ? (brand.brand + ' ' + service.title) : (brand.brand + ' ' + service.titleEn)}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{t('服务详情', 'Details')}</h2>
          
          <div className="bg-gray-50 rounded-2xl p-5 sm:p-8 border border-gray-100">
            {(lang === 'zh' ? service.details : service.detailsEn).split('\n').filter(Boolean).map((p, i) => (
              <p key={i} className="text-gray-600 text-sm leading-relaxed mb-3 last:mb-0">{p}</p>
            ))}
          </div>

          {/* 支持型号区域 */}
          {brandModels.length > 0 && (
            <div className="mt-8">
              <div
                className="flex items-center justify-between cursor-pointer select-none"
                onClick={() => setShowModels(!showModels)}
              >
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {t('支持机型 (' + brandModels.length + '款等)', 'Compatible Models (' + brandModels.length + '+ more)')}
                </h2>
                <ChevronDown
                  size={20}
                  className={'text-gray-400 transition-transform duration-200 ' + (showModels ? 'rotate-180' : '')}
                />
              </div>
              {showModels && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {brandModels.map((m, i) => (
                    <a
                      key={i}
                      href={m.page}
                      className="bg-white border border-gray-200 rounded-xl p-3 hover:shadow-md hover:-translate-y-0.5 transition-all block"
                    >
                      <div className="text-sm font-semibold text-gray-900 truncate">{m.model}</div>
                      <div className="text-xs text-gray-400 mt-1 truncate">{m.issues?.slice(0, 2).join(' · ') || m.issues?.[0]}</div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
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
            <button onClick={() => setShowContact(true)} className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 shadow-md">
                {t("@数立即咨询", "@数Contact Now")}
              </button>
          </div>
        </div>
      </section>

    </div>
  )
}
