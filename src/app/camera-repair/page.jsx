'use client'
import { useSite } from '../../lib/SiteContext'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Breadcrumb from "../../components/Breadcrumb";

export default function CameraRepair() {
  const { lang, setShowContact } = useSite();
  const t = (zh, en) => lang === 'zh' ? zh : en
  return (
    <>
      
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb items={[{label:"相机维修",labelEn:"Camera Repair"}]} />
      <section className="bg-gradient-to-br from-purple-600 via-purple-500 to-purple-400 text-white">
        
                  <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <h1 className="text-3xl sm:text-5xl font-bold mb-3">{t('Camera 维修', 'Camera Repair')}</h1>
          <p className="text-green-100 text-lg mb-4">{t('Camera 全系列专业维修 | 威海', 'Camera All Series | Weihai')}</p>
          <p className="text-green-100 max-w-2xl">{t('相机屏幕碎了、镜头摔了、按键失灵、电池不耐用？单反/微单/卡片机都能修。2007年至今奋斗在维修一线，先检测后报价。', 'Cracked camera screen, broken lens, dead buttons, weak battery? DSLR / mirrorless / compact all repairable. On the job since 2007.')}</p>
          <div className="flex gap-3 mt-6">
            <button onClick={() => setShowContact(true)} className="bg-white text-purple-600 font-semibold px-5 py-2.5 rounded-xl hover:bg-purple-50 shadow-lg">
                {t('📱 立即咨询', '📱 Contact Now')}
              </button>
          </div>
        </div>
      </section>
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('常见维修', 'Common Repairs')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[{title:'相机屏幕更换',titleEn:'Screen',desc:'单反/微单/卡片机屏幕碎裂、漏液、显示异常，OLED/LCD均可换。'},
              {title:'镜头维修',titleEn:'Lens',desc:'镜头进灰、对焦失灵、镜片发霉、防抖故障。'},
              {title:'电池更换',titleEn:'Battery',desc:'相机电池不耐用、鼓包、充不进电。原装规格电池。'},
              {title:'主板维修',titleEn:'Motherboard',desc:'不开机、按键失灵、充电IC故障。芯片级维修。'},
              {title:'卡槽/接口维修',titleEn:'Card Slot',desc:'SD卡槽损坏、USB/HDMI接口松动更换。'},
              {title:'进水处理',titleEn:'Water Damage',desc:'相机进水、镜头起雾，超声波清洗烘干。'}].map((s,i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-gray-900 mb-1">{lang==='zh'?s.title:s.titleEn}</h3>
                <p className="text-sm text-gray-500">{lang==='zh'?s.desc:s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <button onClick={() => setShowContact(true)} className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-blue-700 shadow-md">{t('📱 联系维修', '📱 Contact for Repair')}</button>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}
