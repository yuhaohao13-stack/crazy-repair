'use client'
import { useSite } from '../../lib/SiteContext'
import { useState } from 'react'
import { ArrowLeft, Smartphone, Battery, Droplets, Cpu, ChevronDown } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Breadcrumb from "../../components/Breadcrumb";

export default function VIVORepair() {
  const { lang, setShowContact } = useSite();
  const t = (zh, en) => lang === 'zh' ? zh : en

  const services = [
    { id: 'screen-replacement', icon:'🔧', title: t('屏幕更换', 'Screen Replacement'), desc: t('VIVO X/Y/iQOO系列屏幕更换，OLED/LCD都有。碎裂漏液触摸不灵。含密封胶恢复防水。', 'VIVO X/Y/iQOO series screen replacement. OLED & LCD. Cracked, leaking, unresponsive. Waterproof sealant.') },
    { id: 'battery-replacement', icon:'🔋', title: t('电池更换', 'Battery Service'), desc: t('VIVO电池不耐用、鼓包、充不进电。原装规格电池，支持VIVO 120W/80W闪充兼容。', 'VIVO battery drain, swelling, no charge. OEM spec, compatible with 120W/80W FlashCharge.') },
    { id: 'charging-port', icon:'🔌', title: t('充电口/尾插', 'Charging Port'), desc: t('Type-C口松动、接触不良、只能慢充、闪充不触发。尾插小板维修。', 'Loose port, bad contact, slow charge, FlashCharge not triggering. Flex board repair.') },
    { id: 'motherboard-repair', icon:'🔬', title: t('主板维修', 'Motherboard'), desc: t('不开机、重启循环、充电IC故障、无服务。VIVO/iQOO主板芯片级维修，擅长CPU重焊。', 'No power, boot loop, charging IC fault, no service. VIVO/iQOO component-level repair, CPU reballing.') },
    { id: 'camera-repair', icon:'📷', title: t('摄像头维修', 'Camera Repair'), desc: t('拍照模糊、闪退、黑屏。X系列蔡司/微云台摄像头维修。前后摄像头更换。', 'Blurry photos, crash, black screen. X series Zeiss/gimbal camera repair. Front & back camera replacement.') },
    { id: 'fingerprint', icon:'🔧', title: t('屏下指纹维修', 'Screen Fingerprint'), desc: t('屏下指纹不灵敏、无法录入、失效。超声波/光学屏下指纹传感器维修或校准。', 'Under-display fingerprint unresponsive, can\'t enroll, failed. Ultrasonic/optical sensor repair or calibration.') },
  ]

  const models = [
    t('X200 Pro / X200 / X200 Pro Mini', 'X200 Pro / X200 / X200 Pro Mini'),
    t('X100 Pro / X100s / X100 / X90 Pro+ / X90', 'X100 Pro / X100s / X100 / X90 Pro+ / X90'),
    t('iQOO 15 / 14 / 13 / 12 / Neo 10 / Neo 9', 'iQOO 15 / 14 / 13 / 12 / Neo 10 / Neo 9'),
    t('Y300 / Y200 / Y100 / Y36 / Y35', 'Y300 / Y200 / Y100 / Y36 / Y35'),
    t('V40 Pro / V40 / V30 Pro / V30', 'V40 Pro / V40 / V30 Pro / V30'),
    t('S20 / S19 / S18 / S17（自拍系列）', 'S20 / S19 / S18 / S17 (selfie series)'),
    t('X Fold 5 / X Fold 3 Pro / X Flip', 'X Fold 5 / X Fold 3 Pro / X Flip'),
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb items={[{label:"手机维修",labelEn:"Phone Repair",href:"/phone-repair"},{label:"VIVO 维修",labelEn:"VIVO Repair"}]} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-cyan-700 via-cyan-600 to-cyan-500 text-white">
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">{t('VIVO 维修', 'VIVO Repair')}</h1>
            <p className="text-xl text-cyan-200 mb-4">{t('VIVO / iQOO 全系列专业维修 | 威海', 'VIVO / iQOO All Series | Weihai')}</p>
            <p className="text-cyan-100 leading-relaxed">
              {t('VIVO X系列蔡司影像、iQOO性能旗舰、Y系列长续航——屏幕碎了、电池不耐用了、屏下指纹不灵了、120W闪充失效了，拿来给我看看。擅长VIVO/iQOO主板芯片级维修。2007年至今奋斗在维修一线。', 'VIVO X series Zeiss imaging, iQOO gaming flagships, Y series long battery — cracked screen, battery drain, under-display fingerprint issues, 120W FlashCharge failure, we fix it all. Specialized in VIVO/iQOO component-level board repair. On the job since 2007.')}
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <button onClick={() => setShowContact(true)} className="bg-white text-cyan-600 font-semibold px-6 py-3 rounded-xl hover:bg-cyan-50 transition-colors shadow-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
              <a href="https://wa.me/6596146709?text=我的VIVO手机需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-600 transition-colors shadow-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
            </div>
          </div>
        </div>
      </section>

      {/* 服务列表 */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">{t('VIVO 维修服务', 'VIVO Repair Services')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <a key={i} href={'/vivo-repair/' + s.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-all block">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600 text-lg shrink-0">{s.icon}</div>
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
                  <span className="text-cyan-500">▸</span>
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
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">{t('VIVO 维修常见问题', 'VIVO Repair FAQ')}</h2>
          <div className="space-y-4">
            {[
              { q: t('VIVO X200 Pro微云台摄像头能修吗？', 'Can you repair VIVO X200 Pro gimbal camera?'), a: t('能修。X系列微云台/蔡司镜头模组损坏可以更换或维修。如果只是镜片碎裂也可以只换镜片不用换整个模组。', 'Yes. X series gimbal/Zeiss lens module can be repaired or replaced. Cracked lens cover can be replaced without swapping the whole module.') },
              { q: t('iQOO手机屏下指纹不灵了怎么办？', 'iQOO under-display fingerprint not working?'), a: t('先试着重录指纹，如果还是不行可能是传感器或排线问题。可以送过来检测，屏下指纹传感器维修¥80起。', 'Try re-enrolling fingerprints first. If still failing, it could be sensor or flex cable issue. Bring in for diagnosis. Sensor repair from ¥80.') },
              { q: t('VIVO换屏多少钱？', 'VIVO screen replacement cost?'), a: t('Y系列¥100起，V/S系列¥130起，X系列/iQOO旗舰¥200起。具体加微信发型号查价格。', 'Y series from ¥100, V/S series from ¥130, X series/iQOO from ¥200. DM for quote.') },
              { q: t('VIVO 120W闪充不触发是怎么回事？', 'VIVO 120W FlashCharge not working?'), a: t('通常是充电IC损坏或者尾插板腐蚀。芯片级维修¥80起，比换主板便宜很多。', 'Usually charging IC damaged or flex board corroded. Component repair from ¥80, much cheaper than board replacement.') },
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
      <section className="py-16 bg-gradient-to-br from-cyan-700 via-cyan-600 to-cyan-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('需要VIVO维修？找我', 'Need VIVO Repair? Contact me')}</h2>
          <p className="text-cyan-200 mb-8">{t('免费检测，发照片就能初步判断', 'Free diagnosis, send a photo for a quick check')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setShowContact(true)} className="bg-white text-cyan-600 font-semibold px-8 py-4 rounded-xl hover:bg-cyan-50 transition-colors shadow-lg text-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
            <a href="https://wa.me/6596146709?text=我的VIVO手机需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-green-600 transition-colors shadow-lg text-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
          </div>
        </div>
      </section>

    </div>
  )
}
