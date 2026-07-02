'use client'
import { useState } from 'react'
import { ArrowLeft, Smartphone, Battery, Droplets, Cpu, ChevronDown } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ContactModal from '../../components/ContactModal'

export default function OPPORepair() {
  const [showContact, setShowContact] = useState(false)
  const [lang, setLang] = useState('zh')
  const t = (zh, en) => lang === 'zh' ? zh : en

  const services = [
    { id: 'screen-replacement', icon:'🔧', title: t('屏幕更换', 'Screen Replacement'), desc: t('OPPO Find/Reno/A系列屏幕更换，OLED/LCD都有。碎裂漏液触摸不灵。含专业密封胶恢复防水性能。', 'OPPO Find/Reno/A series screen replacement. OLED & LCD. Cracked, leaking, unresponsive. Waterproof sealant restored.') },
    { id: 'battery-replacement', icon:'🔋', title: t('电池更换', 'Battery Service'), desc: t('OPPO电池不耐用、鼓包、充不进电。原装规格电池，更换后检测健康度。支持OPPO 80W/100W超级闪充兼容。', 'OPPO battery drain, swelling, no charge. OEM spec batteries, health check after swap. Compatible with 80W/100W SuperVOOC.') },
    { id: 'charging-port', icon:'🔌', title: t('充电口/尾插', 'Charging Port'), desc: t('Type-C口松动、接触不良、只能慢充。尾插小板/VOOC闪充不触发维修。', 'Loose port, bad contact, slow charge only. Flex replacement, VOOC fast charge not triggering.') },
    { id: 'motherboard-repair', icon:'🔬', title: t('主板维修', 'Motherboard'), desc: t('不开机、重启循环、充电IC故障、无服务、WiFi打不开。OPPO主板芯片级维修，比换主板便宜得多。', 'No power, boot loop, charging IC fault, no service, WiFi dead. Component-level OPPO board repair.') },
    { id: 'camera-repair', icon:'📷', title: t('摄像头维修', 'Camera Repair'), desc: t('拍照模糊、闪退、黑屏、对焦失灵。Find系列潜望长焦镜头维修。前后摄像头更换全系列。', 'Blurry photos, crash, black screen, autofocus fail. Find series periscope lens repair. Front & back camera replacement.') },
    { id: 'back-glass', icon:'🔄', title: t('后盖/边框', 'Back Glass/Frame'), desc: t('OPPO玻璃后盖碎裂、中框变形。更换后恢复防水胶。Reno系列星环设计后盖可换。', 'Broken glass back, bent frame. Waterproof sealant restored. Reno series star ring design back available.') },
  ]

  const models = [
    t('Find N5 / N4 / N3 Flip / N2 Flip', 'Find N5 / N4 / N3 Flip / N2 Flip'),
    t('Find X8 Pro / X8 / X7 Ultra / X7 / X6', 'Find X8 Pro / X8 / X7 Ultra / X7 / X6'),
    t('Reno 14 / 14 Pro / 13 / 13 Pro / 12 / 12 Pro', 'Reno 14 / 14 Pro / 13 / 13 Pro / 12 / 12 Pro'),
    t('Reno 11 / 11 Pro / 10 / 10 Pro+', 'Reno 11 / 11 Pro / 10 / 10 Pro+'),
    t('A系列 A60 / A58 / A57 / A56 / A55', 'A series A60 / A58 / A57 / A56 / A55'),
    t('OPPO Pad / Pad 3 / Pad Air / Pad 2', 'OPPO Pad / Pad 3 / Pad Air / Pad 2'),
    t('一加手机（OPPO系兼容维修）', 'OnePlus phones (OPPO platform compatible)'),
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar lang={lang} setLang={setLang} setShowContact={setShowContact} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-600 via-green-500 to-green-400 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4"><a href="/phone-repair" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-medium transition-colors"><ArrowLeft size={15} /> {t('手机品牌', 'Phone Brands')}</a></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">{t('OPPO 维修', 'OPPO Repair')}</h1>
            <p className="text-xl text-green-100 mb-4">{t('OPPO Find / Reno / A 全系列专业维修 | 威海', 'OPPO Find / Reno / A All Series | Weihai')}</p>
            <p className="text-green-100 leading-relaxed">
              {t('OPPO Find折叠屏、Reno人像旗舰、A系列性价比之选——屏幕碎了、电池不耐用、VOOC闪充失效、进水损坏，统统拿来给我看看。支持OPPO 100W超级闪充配件更换。2007年至今奋斗在维修一线，OPPO全系列主板芯片级维修经验丰富。', 'OPPO Find foldables, Reno portrait flagships, A series — cracked screen, battery drain, VOOC fast charge failure, water damage, we handle it all. Support for 100W SuperVOOC parts replacement. On the job since 2007.')}
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <button onClick={() => setShowContact(true)} className="bg-white text-green-600 font-semibold px-6 py-3 rounded-xl hover:bg-green-50 transition-colors shadow-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
              <a href="https://wa.me/6596146709?text=我的OPPO手机需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-600 transition-colors shadow-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
            </div>
          </div>
        </div>
      </section>

      {/* 服务列表 */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">{t('OPPO 维修服务', 'OPPO Repair Services')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <a key={i} href={'/oppo-repair/' + s.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all group block">
                <div className="relative w-full aspect-[16/9] bg-gray-100 overflow-hidden">
                  <img src={'/images/services/oppo-repair-' + s.id + '.svg'} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600 text-lg shrink-0">{s.icon}</div>
                    <h3 className="font-bold text-gray-900 text-lg">{s.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                  <div className="mt-3 text-green-600 text-xs font-medium flex items-center gap-1">{t('查看详情 →', 'View Details →')}</div>
                </div>
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
                  <span className="text-green-500">▸</span>
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
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">{t('OPPO 维修常见问题', 'OPPO Repair FAQ')}</h2>
          <div className="space-y-4">
            {[
              { q: t('OPPO Find N5折叠屏能修吗？', 'Can you repair OPPO Find N5 foldable?'), a: t('能修。OPPO Find N5/N4/N3 Flip折叠屏内外屏更换、铰链维修、排线更换都可以做。折叠屏维修需要更高精度，我们经验充足。', 'Yes. Find N5/N4/N3 Flip inner & outer screen replacement, hinge repair, flex cable replacement. We have foldable repair experience.') },
              { q: t('OPPO换屏多少钱？', 'OPPO screen replacement cost?'), a: t('A系列¥100起，Reno系列¥150起，Find系列¥250起。具体加微信发型号查价格。', 'A series from ¥100, Reno from ¥150, Find from ¥250. DM for exact quote.') },
              { q: t('OPPO闪充坏了能修吗？', 'OPPO VOOC fast charge not working?'), a: t('能修。VOOC/SuperVOOC闪充不触发通常是充电IC或者尾插小板问题，芯片级维修¥80起。', 'Yes. VOOC/SuperVOOC not triggering is usually charging IC or flex board issue. Component repair from ¥80.') },
              { q: t('OPPO Reno星环后盖碎了能换吗？', 'Reno star ring back glass broken?'), a: t('能换。Reno系列的星环/视界窗设计后盖我们可以更换。换了之后恢复防水胶。', 'Yes. Reno series star ring/vision window design back glass can be replaced. Waterproof sealant restored.') },
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
      <section className="py-16 bg-gradient-to-br from-green-600 via-green-500 to-green-400 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('OPPO 出问题了？找我', 'OPPO issues? Hit me up')}</h2>
          <p className="text-green-200 mb-8">{t('免费检测，先报价后维修。添加微信发张照片就能初步判断。', 'Free diagnosis. Add WeChat, send a photo for a quick assessment.')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setShowContact(true)} className="bg-white text-green-600 font-semibold px-8 py-4 rounded-xl hover:bg-green-50 transition-colors shadow-lg text-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
            <a href="https://wa.me/6596146709?text=我的OPPO手机需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-green-600 transition-colors shadow-lg text-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
      <ContactModal show={showContact} setShow={setShowContact} lang={lang} />
    </div>
  )
}
