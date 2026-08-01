'use client'
import Seo from '@/components/Seo'
import { useSite } from '../../lib/SiteContext'
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Breadcrumb from "../../components/Breadcrumb";

export default function PhoneRepair() {
  const { lang, setShowContact } = useSite();
  const t = (zh, en) => lang === 'zh' ? zh : en

  const brands = [
    { name: 'Apple iPhone', page: '/iphone-repair', gradient: 'from-blue-600 to-blue-500', icon: '📱',
      models: 'iPhone 17/16/15/14/13/12/11/X/8', desc: t('iPhone全系列专业维修，换屏换电进水主板', 'Full iPhone repair service') },
    { name: 'Samsung', page: '/samsung-repair', gradient: 'from-purple-600 to-purple-500', icon: '📱',
      models: 'S25/S24/S23/Z Fold 8/Flip 8/A系列', desc: t('三星AMOLED换屏、电池、主板芯片级维修', 'Samsung AMOLED repair specialist') },
    { name: 'Huawei', page: '/huawei-repair', gradient: 'from-red-600 to-red-500', icon: '📱',
      models: 'Mate 70/Mate 60/Pura 70/P60/Nova', desc: t('华为Mate/P/Nova全系维修，鸿蒙刷机', 'Huawei Mate/P/Nova repair') },
    { name: 'Xiaomi', page: '/xiaomi-repair', gradient: 'from-orange-600 to-yellow-500', icon: '📱',
      models: '小米16/15/14/Redmi Note 17/K系列', desc: t('小米/Redmi/Poco全系，性价比维修', 'Xiaomi/Redmi/Poco repair') },
    { name: 'OPPO', page: '/oppo-repair', gradient: 'from-green-600 to-green-500', icon: '📱',
      models: 'Find X8/X7/Reno 16/14/13/A系列', desc: t('OPPO全系维修，屏碎、电池、充電口', 'OPPO series repair') },
    { name: 'vivo', page: '/vivo-repair', gradient: 'from-cyan-600 to-cyan-500', icon: '📱',
      models: 'X200/X100/X90/X Fold6/V40/iQOO 15/Z11', desc: t('vivo/iQOO全系维修，屏下指纹修复', 'vivo/iQOO repair specialist') },
    { name: 'OnePlus', page: '/oneplus-repair', gradient: 'from-red-600 to-red-500', icon: '📱',
      models: 'OnePlus 13/13R/12/Open 2/Nord/Ace', desc: t('一加全系维修，性价比之选', 'OnePlus full repair service') },
    { name: 'Honor', page: '/honor-repair', gradient: 'from-teal-600 to-teal-500', icon: '📱',
      models: 'Magic 7/600/300/200/X70', desc: t('荣耀全系维修，屏幕电池主板', 'Honor full repair service') },
    { name: 'Google Pixel', page: '/google-repair', gradient: 'from-gray-600 to-gray-500', icon: '📱',
      models: 'Pixel 10/9/8/7系列', desc: t('Google Pixel全系维修', 'Google Pixel repair') },
    { name: 'Realme', page: '/realme-repair', gradient: 'from-yellow-600 to-amber-500', icon: '📱',
      models: 'GT 8/GT 7/真我 14/13/Note 80/Q系列', desc: t('Realme全系性价比维修', 'Realme affordable repair') },
    { name: 'SHARP', page: '/phone-repair', gradient: 'from-sky-700 to-sky-600', icon: '📱',
      models: 'AQUOS R11/R10/R9', desc: t('夏普日系手机维修', 'Sharp (Japan) phone repair') },
    { name: 'Motorola', page: '/#services', gradient: 'from-indigo-600 to-indigo-500', icon: '📱',
      models: 'Moto g37/Edge 50/Razr 50/Moto G系列', desc: t('摩托罗拉全系维修', 'Motorola full repair') },
    { name: 'ROG Phone (ASUS)', page: '/#services', gradient: 'from-rose-700 to-rose-600', icon: '🎮',
      models: 'ROG Phone 9/8/7/6', desc: t('华硕ROG游戏手机维修', 'ASUS ROG gaming phone repair') },
    { name: 'RedMagic', page: '/#services', gradient: 'from-red-800 to-red-700', icon: '🎮',
      models: 'RedMagic 10/9/8/7', desc: t('努比亚红魔游戏手机维修', 'RedMagic gaming phone repair') },
  ]

  return (
      <Seo title="手机维修 - 换屏换电池主板维修 | Crazy维修威海" description="威海手机维修，Crazy维修2007年至今。专业维修手机，免费检测、价格透明、30天质保。环翠区西门31号。" />
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb items={[{label:"手机维修",labelEn:"Phone Repair"}]} />

      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white">
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold mb-3">{t('手机维修', 'Phone Repair')}</h1>
          <p className="text-blue-200 text-lg">{t('选择您的手机品牌，查看对应的维修服务和价格', 'Select your phone brand to see repair services')}</p>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {brands.map((b, i) => (
              <a key={i} href={b.page}
                className={`bg-gradient-to-br ${b.gradient} text-white rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all shadow-md`}>
                <div className="text-3xl mb-2">{b.icon}</div>
                <h3 className="font-bold text-lg mb-1">{b.name}</h3>
                <p className="text-sm text-white/80 mb-2">{b.desc}</p>
                <p className="text-xs text-white/60">{b.models}</p>
                <span className="inline-block mt-3 text-xs bg-white/20 px-3 py-1 rounded-full">{t('查看服务 →', 'Services →')}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
