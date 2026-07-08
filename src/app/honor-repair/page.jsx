'use client'
import { useSite } from '../../lib/SiteContext'
import { useState } from 'react'
import { ArrowLeft, Smartphone, Battery, Droplets, Cpu, ChevronDown } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Breadcrumb from "../../components/Breadcrumb";

export default function HonorRepair() {
  const { lang, setShowContact } = useSite();
  const t = (zh, en) => lang === 'zh' ? zh : en

  const services = [
    { id: 'screen-replacement', icon:'🔧', title: t('屏幕更换', 'Screen Replacement'), desc: t('荣耀全系列屏幕更换。Magic系列四曲屏/折叠屏，数字系列OLED，X系列LCD。碎裂漏液触摸不灵。含密封胶恢复防水。', 'Honor full series screen. Magic quad-curved/foldable, number series OLED, X series LCD. Cracked, leaking, unresponsive. Waterproof sealant.') },
    { id: 'battery-replacement', icon:'🔋', title: t('电池更换', 'Battery Service'), desc: t('荣耀电池不耐用、鼓包、充不进电。原装规格电池，支持100W有线+无线充电兼容。', 'Honor battery drain, swelling, no charge. OEM spec, 100W wired + wireless charge compatible.') },
    { id: 'charging-port', icon:'🔌', title: t('充电口/尾插', 'Charging Port'), desc: t('Type-C口松动、荣耀100W超级快充不触发、接触不良。尾插小板维修。', 'Loose port, 100W SuperCharge not triggering, bad contact. Flex board repair.') },
    { id: 'motherboard-repair', icon:'🔬', title: t('主板维修', 'Motherboard'), desc: t('不开机、重启循环、充电IC故障、无服务。荣耀主板芯片级维修，华为系维修经验通用。', 'No power, boot loop, charging IC fault, no service. Honor component-level board repair, Huawei platform experience applies.') },
    { id: 'camera-repair', icon:'📷', title: t('摄像头维修', 'Camera Repair'), desc: t('拍照模糊、闪退、黑屏。Magic系列鹰眼相机/潜望长焦维修。前后摄像头更换。', 'Blurry photos, crash, black screen. Magic series Eagle Eye camera/periscope zoom repair. Front & back camera.') },
    { id: 'back-glass', icon:'🔄', title: t('后盖/边框', 'Back Glass/Frame'), desc: t('荣耀玻璃后盖碎裂、中框变形。Magic系列星环设计后盖更换。', 'Broken glass back, bent frame. Magic series star ring design back replacement.') },
  ]

  const models = [
    t('Magic 7 Pro / Magic 7 / Magic 7 Lite', 'Magic 7 Pro / Magic 7 / Magic 7 Lite'),
    t('Magic V4 / V3 / V2 / Vs / Vs2 (折叠屏)', 'Magic V4 / V3 / V2 / Vs / Vs2 (foldables)'),
    t('Honor 300 Ultra / 300 Pro / 300 / 200 Pro / 200', 'Honor 300 Ultra / 300 Pro / 300 / 200 Pro / 200'),
    t('Honor X70 / X60 Pro / X60 / X50 Pro / X50', 'Honor X70 / X60 Pro / X60 / X50 Pro / X50'),
    t('Honor 90 GT / 80 GT / 100 / 90 / 80', 'Honor 90 GT / 80 GT / 100 / 90 / 80'),
    t('Honor Pad 9 / Pad X9 / Pad 8', 'Honor Pad 9 / Pad X9 / Pad 8'),
    t('Honor View / Play系列', 'Honor View / Play series'),
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb items={[{label:"手机维修",labelEn:"Phone Repair",href:"/phone-repair"},{label:"Honor 维修",labelEn:"Honor Repair"}]} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-700 via-teal-600 to-teal-500 text-white">
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">{t('Honor 维修', 'Honor Repair')}</h1>
            <p className="text-xl text-teal-200 mb-4">{t('荣耀全系列专业维修 | 威海', 'Honor All Series | Weihai')}</p>
            <p className="text-teal-100 leading-relaxed">
              {t('荣耀Magic旗舰折叠屏、数字系列时尚影像、X系列长续航——屏幕碎了、电池不耐用了、100W快充失效了、鹰眼相机出问题了，拿来给我看看。荣耀虽然独立了但维修方法和华为通用，我们经验丰富。2007年至今奋斗在维修一线。', 'Honor Magic flagship foldables, number series stylish imaging, X series long battery — cracked screen, battery drain, 100W SuperCharge failure, Eagle Eye camera issues, we fix it all. Honor is independent now but shares repair methods with Huawei. On the job since 2007.')}
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <button onClick={() => setShowContact(true)} className="bg-white text-teal-600 font-semibold px-6 py-3 rounded-xl hover:bg-teal-50 transition-colors shadow-lg">
                {t('📱 立即咨询', '📱 Contact Now')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 服务列表 */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">{t('Honor 维修服务', 'Honor Repair Services')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <a key={i} href={'/honor-repair/' + s.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-all block">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 text-lg shrink-0">{s.icon}</div>
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
                  <span className="text-teal-500">▸</span>
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
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">{t('Honor 维修常见问题', 'Honor Repair FAQ')}</h2>
          <div className="space-y-4">
            {[
              { q: t('荣耀和华为维修通用吗？', 'Are Honor and Huawei repair methods compatible?'), a: t('荣耀独立后虽然系统和配件有差异，但主板架构、屏幕接口、电池规格和华为通用率很高。我们的华为维修经验可以直接用在荣耀上。', 'After Honor split, systems and parts differ slightly but board architecture, screen connectors, battery specs are still largely compatible with Huawei. Our Huawei experience applies directly.') },
              { q: t('Honor换屏多少钱？', 'Honor screen replacement cost?'), a: t('X系列¥110起，数字系列¥150起，Magic系列¥250起。Magic V折叠屏较贵需咨询。', 'X series from ¥110, number series from ¥150, Magic from ¥250. Magic V foldable more expensive, ask for quote.') },
              { q: t('荣耀Magic V折叠屏能修吗？', 'Honor Magic V foldable repair?'), a: t('能修。Magic V/V2/V3/V4内外屏更换、铰链维修都可以。折叠屏修了之后恢复密封胶减少进灰。', 'Yes. Magic V/V2/V3/V4 inner & outer screen replacement, hinge repair. Sealant restored after repair to reduce dust ingress.') },
              { q: t('荣耀100W快充不触发怎么办？', 'Honor 100W SuperCharge not triggering?'), a: t('先换原装线和充电头试试。如果还不行，可能是充电IC或尾插板问题。送过来检测¥50起。', 'Try original cable & charger first. If still failing, could be charging IC or flex board. Bring in for diagnosis from ¥50.') },
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
      <section className="py-16 bg-gradient-to-br from-teal-700 via-teal-600 to-teal-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('需要Honor维修？找我', 'Need Honor Repair? Contact me')}</h2>
          <p className="text-teal-200 mb-8">{t('免费检测，发照片就能初步判断', 'Free diagnosis, send a photo for a quick check')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setShowContact(true)} className="bg-white text-teal-600 font-semibold px-8 py-4 rounded-xl hover:bg-teal-50 transition-colors shadow-lg text-lg">
                {t('📱 立即咨询', '📱 Contact Now')}
              </button>
          </div>
        </div>
      </section>

    </div>
  )
}
