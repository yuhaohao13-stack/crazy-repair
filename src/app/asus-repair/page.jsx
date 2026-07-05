'use client'
import { useSite } from '../../lib/SiteContext'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Breadcrumb from "../../components/Breadcrumb";

export default function ASUSRepair() {
  const { lang, setShowContact } = useSite();
  const t = (zh, en) => lang === 'zh' ? zh : en
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb items={[{label:"电脑维修",labelEn:"Computer Repair",href:"/computer-repair"},{label:"华硕 维修",labelEn:"ASUS Repair"}]} />
      <section className="bg-gradient-to-br from-cyan-700 via-cyan-600 to-cyan-500 text-white">
        
                  <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <h1 className="text-3xl sm:text-5xl font-bold mb-3">{t('ASUS 维修', 'ASUS Repair')}</h1>
          <p className="text-green-100 text-lg mb-4">{t('ASUS 全系列专业维修 | 威海', 'ASUS All Series | Weihai')}</p>
          <p className="text-green-100 max-w-2xl">{t('ASUS Find、Reno、A系列——屏幕碎了、电池不耐用了、充电口坏了，拿来给我看看。2007年至今奋斗在维修一线。', 'ASUS Find, Reno, A series — cracked screen, battery drain, charging port issues. On the job since 2007.')}</p>
          <div className="flex gap-3 mt-6">
            <button onClick={() => setShowContact(true)} className="bg-white text-cyan-600 font-semibold px-5 py-2.5 rounded-xl hover:bg-cyan-50 shadow-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
            <a href="https://wa.me/6596146709?text=ASUS手机需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-green-600 shadow-lg">{t('💬 WhatsApp', '💬 WhatsApp')}</a>
          </div>
        </div>
      </section>
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('常见维修', 'Common Repairs')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[{id:'screen-replacement', title:'屏幕更换', titleEn:'Screen Replacement', desc:'屏幕碎裂、漏液、花屏。原装品质屏幕更换。'},
              {id:'battery-replacement', title:'电池更换', titleEn:'Battery Replacement', desc:'电池鼓包、不耐用、充不进电。原装规格电池。'},
              {id:'keyboard-repair', title:'键盘维修', titleEn:'Keyboard Repair', desc:'按键不灵、键盘进水、个别键失灵。'},
              {id:'cleaning', title:'清灰换硅脂', titleEn:'Cleaning & Cooling', desc:'深度拆机清灰+换导热硅脂。游戏本必做。'},
              {id:'os-upgrade', title:'系统重装/升级', titleEn:'OS/Upgrade', desc:'Windows重装、加装固态、内存升级、数据备份。'},
              {id:'other-issues', title:'其他故障', titleEn:'Other Issues', desc:'其他问题免费检测，加微信咨询。'}].map((s,i) => (
              <a key={i} href={`/asus-repair/${s.id}`} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all block">
                <h3 className="font-bold text-gray-900 mb-1">{lang==='zh'?s.title:s.titleEn}</h3>
                <p className="text-sm text-gray-500">{lang==='zh'?s.desc:s.desc}</p>
              </a>
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
