'use client'
import { useState } from 'react'
import { ArrowLeft, Smartphone, Battery, Droplets, Cpu, ChevronDown } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ContactModal from '../../components/ContactModal'

export default function OnePlusRepair() {
  const [showContact, setShowContact] = useState(false)
  const [lang, setLang] = useState('zh')
  const t = (zh, en) => lang === 'zh' ? zh : en

  const services = [
    { id: 'screen-replacement', icon:'🔧', title: t('屏幕更换', 'Screen Replacement'), desc: t('OnePlus全系列OLED屏幕更换。碎裂漏液触摸不灵。含密封胶恢复防水。一加标志性的三段式按键保留。', 'OnePlus full series OLED screen. Cracked, leaking, unresponsive. Waterproof sealant restored. Alert slider preserved.') },
    { id: 'battery-replacement', icon:'🔋', title: t('电池更换', 'Battery Service'), desc: t('OnePlus电池不耐用、鼓包、充不进电。原装规格电池，支持100W SUPERVOOC闪充。', 'OnePlus battery drain, swelling, no charge. OEM spec, compatible with 100W SUPERVOOC.') },
    { id: 'charging-port', icon:'🔌', title: t('充电口/尾插', 'Charging Port'), desc: t('Type-C口松动、SUPERVOOC闪充不触发、接触不良。尾插小板维修或更换。', 'Loose port, SUPERVOOC not triggering, bad contact. Flex board repair or replacement.') },
    { id: 'motherboard-repair', icon:'🔬', title: t('主板维修', 'Motherboard'), desc: t('不开机、重启循环、充电IC故障、无服务。OnePlus主板芯片级维修，OPPO系兼容。', 'No power, boot loop, charging IC fault, no service. OnePlus component-level board repair, OPPO platform compatible.') },
    { id: 'camera-repair', icon:'📷', title: t('摄像头维修', 'Camera Repair'), desc: t('拍照模糊、闪退、黑屏。哈苏一加影像系统维修。前后摄像头更换。', 'Blurry photos, crash, black screen. Hasselblad OnePlus imaging system repair. Front & back camera replacement.') },
    { id: 'back-glass', icon:'🔄', title: t('后盖更换', 'Back Glass'), desc: t('一加玻璃后盖碎裂、陶瓷/素皮后盖修复。更换后恢复防水胶。', 'Broken glass back, ceramic/vegan leather back repair. Waterproof sealant restored.') },
  ]

  const models = [
    t('OnePlus Open 2 / Open (折叠屏)', 'OnePlus Open 2 / Open (foldable)'),
    t('OnePlus 13 / 13R / 12 / 12R', 'OnePlus 13 / 13R / 12 / 12R'),
    t('OnePlus 11 / 11R / 10 Pro / 10T', 'OnePlus 11 / 11R / 10 Pro / 10T'),
    t('OnePlus 9 Pro / 9 / 9R / 8T / 8 Pro', 'OnePlus 9 Pro / 9 / 9R / 8T / 8 Pro'),
    t('OnePlus Nord 4 / Nord 3 / Nord CE', 'OnePlus Nord 4 / Nord 3 / Nord CE'),
    t('OnePlus Ace 5 / Ace 3 / Ace 2 Pro', 'OnePlus Ace 5 / Ace 3 / Ace 2 Pro'),
    t('OnePlus Pad / Pad 2', 'OnePlus Pad / Pad 2'),
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar lang={lang} setLang={setLang} setShowContact={setShowContact} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-red-700 via-red-600 to-red-500 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4"><a href="/phone-repair" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-medium transition-colors"><ArrowLeft size={15} /> {t('手机品牌', 'Phone Brands')}</a></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">{t('OnePlus 维修', 'OnePlus Repair')}</h1>
            <p className="text-xl text-red-200 mb-4">{t('一加全系列专业维修 | 威海', 'OnePlus All Series | Weihai')}</p>
            <p className="text-red-100 leading-relaxed">
              {t('一加旗舰、Ace性能系列、Nord中端——屏幕碎了、电池不耐用了、SUPERVOOC闪充失效了、哈苏相机出问题了，拿来给我看看。一加/OPPO系主板通用维修，经验丰富。2007年至今奋斗在维修一线。', 'OnePlus flagships, Ace performance series, Nord mid-range — cracked screen, battery drain, SUPERVOOC failure, Hasselblad camera issues, we fix it all. OnePlus/OPPO platform compatible board repair. On the job since 2007.')}
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <button onClick={() => setShowContact(true)} className="bg-white text-red-600 font-semibold px-6 py-3 rounded-xl hover:bg-red-50 transition-colors shadow-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
              <a href="https://wa.me/6596146709?text=我的OnePlus手机需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-600 transition-colors shadow-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
            </div>
          </div>
        </div>
      </section>

      {/* 服务列表 */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">{t('OnePlus 维修服务', 'OnePlus Repair Services')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <a key={i} href={'/oneplus-repair/' + s.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-all block">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900">{s.title}</h3>
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
                  <span className="text-red-500">▸</span>
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
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">{t('OnePlus 维修常见问题', 'OnePlus Repair FAQ')}</h2>
          <div className="space-y-4">
            {[
              { q: t('OnePlus换屏多少钱？', 'OnePlus screen replacement cost?'), a: t('Nord系列¥130起，Ace系列¥180起，数字旗舰¥250起。一加采用三星/京东方高端OLED，价格比官方便宜一半以上。', 'Nord from ¥130, Ace from ¥180, flagships from ¥250. OnePlus uses Samsung/BOE high-end OLED, much cheaper than official.') },
              { q: t('OnePlus的三段式按键坏了能修吗？', 'OnePlus alert slider broken?'), a: t('能修。三段式按键不灵或断裂可以更换排线或整个按键组件。这是OnePlus标志性设计，建议修好保留。', 'Yes. Alert slider unresponsive or broken can be fixed by replacing flex cable or full switch assembly. It\'s an iconic OnePlus feature.') },
              { q: t('OnePlus Open折叠屏能修吗？', 'OnePlus Open foldable repair?'), a: t('能修。OnePlus Open内外屏更换、铰链维修、排线更换都可以。折叠屏拆装精度要求高，我们经验充足。', 'Yes. OnePlus Open inner & outer screen, hinge repair, flex cable replacement. Precision work, we have the experience.') },
              { q: t('充电头SUPERVOOC不触发怎么办？', 'SUPERVOOC not triggering?'), a: t('检查是不是用了一加原装充电器和线。如果原装配件还不触发，可能是充电IC或尾插问题。送过来检测¥50起。', 'Check if using OnePlus original charger & cable. If still not working, could be charging IC or port issue. Bring in for diagnosis from ¥50.') },
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
      <section className="py-16 bg-gradient-to-br from-red-700 via-red-600 to-red-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('OnePlus 出问题了？找我', 'OnePlus issues? Hit me up')}</h2>
          <p className="text-red-200 mb-8">{t('免费检测，先报价后维修。添加微信发张照片就能初步判断。', 'Free diagnosis. Add WeChat, send a photo for a quick assessment.')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setShowContact(true)} className="bg-white text-red-600 font-semibold px-8 py-4 rounded-xl hover:bg-red-50 transition-colors shadow-lg text-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
            <a href="https://wa.me/6596146709?text=我的OnePlus手机需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-green-600 transition-colors shadow-lg text-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
      <ContactModal show={showContact} setShow={setShowContact} lang={lang} />
    </div>
  )
}
