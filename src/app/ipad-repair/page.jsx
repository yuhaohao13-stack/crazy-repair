'use client'
import { useSite } from '../../lib/SiteContext'
import { useState } from 'react'
import { ArrowLeft, Smartphone, Battery, Droplets, Cpu, ChevronDown } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Breadcrumb from "../../components/Breadcrumb";

export default function iPadRepair() {
  const { lang, setShowContact } = useSite();
  const t = (zh, en) => lang === 'zh' ? zh : en

  const services = [
    { id: 'screen-replacement', icon:'🔧', title: t('屏幕更换', 'Screen Replacement'), desc: t('iPad Pro/Air/Mini/数字系列全代屏幕更换。LCD、Mini-LED、OLED屏幕碎裂漏液触摸不灵。含密封胶恢复防水。', 'iPad Pro/Air/Mini/digital all gens. LCD, Mini-LED, OLED cracked, leaking, unresponsive. Waterproof sealant restored.') },
    { id: 'battery-replacement', icon:'🔋', title: t('电池更换', 'Battery Service'), desc: t('iPad电池不耐用、鼓包、充不进电、自动关机。原装规格电池更换，续航回到新机水平。', 'iPad battery drain, swelling, no charge, auto shutdown. OEM spec battery, like-new battery life restored.') },
    { id: 'charging-port', icon:'🔌', title: t('充电口/尾插', 'Charging Port'), desc: t('Lightning/USB-C口松动、接触不良、不充电、不数据传输。尾插排线维修更换。', 'Loose Lightning/USB-C port, bad contact, no charge, no data. Flex board repair.') },
    { id: 'motherboard-repair', icon:'🔬', title: t('主板维修', 'Motherboard'), desc: t('iPad不开机、白苹果重启循环、充电IC故障、无WiFi/蓝牙。Apple Silicon芯片级维修。', 'No power, white Apple boot loop, charging IC fault, no WiFi/BT. Apple Silicon component-level repair.') },
    { id: 'water-damage', icon:'💧', title: t('进水维修', 'Water Damage'), desc: t('iPad进水后不开机、屏幕有水印、功能异常。超声波清洗+芯片级修复，最大限度抢救数据。', 'iPad water damaged, no power, screen watermark, functional issues. Ultrasonic clean + chip-level fix.') },
    { id: 'camera-repair', icon:'📷', title: t('摄像头维修', 'Camera Repair'), desc: t('iPad拍照模糊、黑屏、闪光灯不亮、FaceTime摄像头故障。前后摄像头更换维修。', 'Blurry photos, black screen, flash not working, FaceTime camera fault. Front & back camera replacement.') },
  ]

  const models = [
    t('iPad Pro M4 (2024) / M2 (2022) / M1 (2021)', 'iPad Pro M4 (2024) / M2 (2022) / M1 (2021)'),
    t('iPad Pro 12.9" / 11" (2018-2024)', 'iPad Pro 12.9" / 11" (2018-2024)'),
    t('iPad Air M3 / M2 / M1 / 5th / 4th', 'iPad Air M3 / M2 / M1 / 5th / 4th'),
    t('iPad 10th / 9th / 8th / 7th 数字系列', 'iPad 10th / 9th / 8th / 7th digital'),
    t('iPad mini 7 / 6 / 5 / 4', 'iPad mini 7 / 6 / 5 / 4'),
    t('iPad Pro 9.7" / 10.5" 旧款', 'iPad Pro 9.7" / 10.5" older'),
    t('iPad 老款全系列（Home键款）', 'iPad classic all series (Home button)'),
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb items={[{label:"平板维修",labelEn:"Tablet Repair",href:"/tablet-repair"},{label:"iPad 维修",labelEn:"iPad Repair"}]} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white">
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">{t('iPad 维修', 'iPad Repair')}</h1>
            <p className="text-xl text-blue-200 mb-4">{t('Apple iPad 全系列专业维修 | 威海', 'Apple iPad All Series | Weihai')}</p>
            <p className="text-blue-100 leading-relaxed">
              {t('iPad Pro Mini-LED屏/M4 OLED屏碎了、iPad Air电池不耐用了、iPad mini触摸不灵了、充电口松了、进水了——拿来给我看看，什么iPad都能修。2007年至今奋斗在维修一线。', 'iPad Pro Mini-LED / M4 OLED cracked, iPad Air battery draining, iPad mini touch unresponsive, loose charging port, water damage — bring it in, we fix any iPad. On the job since 2007.')}
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <button onClick={() => setShowContact(true)} className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
              <a href="https://wa.me/6596146709?text=我的iPad需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-600 transition-colors shadow-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
            </div>
          </div>
        </div>
      </section>

      {/* 服务列表 */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">{t('iPad 维修服务', 'iPad Repair Services')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <a key={i} href={'/ipad-repair/' + s.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-all block">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 text-lg shrink-0">{s.icon}</div>
                  <h3 className="font-bold text-gray-900 text-lg">{s.title}</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 型号支持 */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t('支持型号', 'Supported Models')}</h2>
          <div className="max-w-xl mx-auto bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="grid grid-cols-2 gap-3">
              {models.map((m, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <span className="text-blue-500">▸</span>
                  <span className="text-gray-700">{m}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-4 text-center">{t('没找到你的型号？加微信问我', 'Model not listed? DM me on WeChat')}</p>
          </div>
        </div>
      </section>

      {/* 常见问题 */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">{t('iPad 维修常见问题', 'iPad Repair FAQ')}</h2>
          <div className="space-y-4">
            {[
              { q: t('iPad换屏多少钱？', 'iPad screen replacement cost?'), a: t('数字系列（iPad 10/9代）¥150起，iPad Air¥250起，iPad Pro 11寸¥500起，12.9寸/M4 OLED款较贵需咨询。拆屏换屏手工精细，确保Touch ID和原彩显示正常。', 'Digital (10th/9th gen) from ¥150, iPad Air from ¥250, iPad Pro 11" from ¥500, 12.9"/M4 OLED more expensive, ask for quote. Precision work, Touch ID & True Tone preserved.') },
              { q: t('iPad电池能换吗？多少钱？', 'iPad battery replacement? Cost?'), a: t('能换。数字系列¥150起，Air系列¥200起，Pro系列¥250起。换完后续航恢复，iPad不像iPhone容易换，需要拆屏幕才能换电池。', 'Yes. Digital from ¥150, Air from ¥200, Pro from ¥250. Battery life restored. iPad is harder to replace than iPhone — screen needs to be removed to access battery.') },
              { q: t('iPad进水了还有救吗？', 'iPad water damage — can it be saved?'), a: t('立即关机不要充电！送过来做超声波清洗。进水程度不同，轻则清洗后正常，重则要换屏幕/电池/主板芯片。越早送过来成功率越高。维修前免费检测评估。', 'Power off immediately, don\'t charge! Bring for ultrasonic cleaning. Light water damage cleans fine, severe needs screen/battery/board chip replacement. Earlier = better chance. Free diagnosis.') },
              { q: t('iPad白苹果/刷机错误怎么办？', 'iPad white Apple/boot loop?'), a: t('先尝试DFU模式刷机。如果刷不过，可能是NAND/硬盘或CPU虚焊。硬盘底层维修、CPU补焊可以解决，很多已经丟角落吃灰的iPad能修好继续用。', 'Try DFU mode restore first. If fails, could be NAND/storage or CPU reballing issues. Board-level repair can revive many iPads left in a drawer.') },
            ].map((faq, i) => (
              <details key={i} className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none">
                  <span className="font-medium text-gray-900 text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown size={18} className="text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-4 sm:px-5 pb-4 sm:pb-5"><p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p></div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('需要iPad维修？找我', 'Need iPad Repair? Contact me')}</h2>
          <p className="text-blue-200 mb-8">{t('免费检测，发照片就能初步判断', 'Free diagnosis, send a photo for a quick check')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setShowContact(true)} className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors shadow-lg text-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
            <a href="https://wa.me/6596146709?text=我的iPad需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-green-600 transition-colors shadow-lg text-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
          </div>
        </div>
      </section>

    </div>
  )
}
