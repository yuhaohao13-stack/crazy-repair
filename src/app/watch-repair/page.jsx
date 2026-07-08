'use client'
import { useSite } from '../../lib/SiteContext'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Breadcrumb from "../../components/Breadcrumb";

export default function SmartwatchRepair() {
  const { lang, setShowContact } = useSite();
  const t = (zh, en) => lang === 'zh' ? zh : en
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb items={[{label:"手表维修",labelEn:"Watch Repair"}]} />
      <section className="bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 text-white">
        
                  <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <h1 className="text-3xl sm:text-5xl font-bold mb-3">{t('Smartwatch 维修', 'Smartwatch Repair')}</h1>
          <p className="text-green-100 text-lg mb-4">{t('Smartwatch 全系列专业维修 | 威海', 'Smartwatch All Series | Weihai')}</p>
          <p className="text-green-100 max-w-2xl">{t('Smartwatch Find、Reno、A系列——屏幕碎了、电池不耐用了、充电口坏了，拿来给我看看。2007年至今奋斗在维修一线。', 'Smartwatch Find, Reno, A series — cracked screen, battery drain, charging port issues. On the job since 2007.')}</p>
          <div className="flex gap-3 mt-6">
            <button onClick={() => setShowContact(true)} className="bg-white text-blue-600 font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-50 shadow-lg">
                {t('📱 立即咨询', '📱 Contact Now')}
              </button>
          </div>
        </div>
      </section>
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('常见维修', 'Common Repairs')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[{title:'智能手表维修',titleEn:'Screen',desc:'Smartwatch Find/Reno/A系列智能手表维修，OLED/LCD。碎裂漏液触摸不灵。'},
              {title:'电池更换',titleEn:'Battery',desc:'Smartwatch电池不耐用、鼓包、充不进电。原装规格电池。'},
              {title:'充电口维修',titleEn:'Charging Port',desc:'Type-C口松动、接触不良、只能慢充。'},
              {title:'主板维修',titleEn:'Motherboard',desc:'不开机、重启、充电IC故障、无服务。芯片级维修。'},
              {title:'后盖更换',titleEn:'Back Glass',desc:'Smartwatch玻璃后盖碎裂更换。'},
              {title:'刷机解锁',titleEn:'Flash/Unlock',desc:'系统卡顿、卡LOGO、忘记密码。'}].map((s,i) => (
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
  )
}
