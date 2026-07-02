'use client'
import { useState } from 'react'
import { ArrowLeft, ChevronDown } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ContactModal from '../../components/ContactModal'

export default function HuaweiRepair() {
  const [showContact, setShowContact] = useState(false)
  const [lang, setLang] = useState('zh')
  const t = (zh, en) => lang === 'zh' ? zh : en

  const services = [
    { id: 'screen-replacement', icon:'🔧', title: t('屏幕更换', 'Screen Replacement'), desc: t('华为Mate/P/Nova系列屏幕。OLED/LCD都有。碎裂漏液触摸不灵。含密封胶恢复防水。', 'Huawei Mate/P/Nova series. OLED & LCD. Cracked, leaking, unresponsive. Waterproof sealant restored.') },
    { id: 'battery-replacement', icon:'🔋', title: t('电池更换', 'Battery Service'), desc: t('华为电池不耐用、鼓包、充不进电。原装规格电池，续航恢复。', 'Huawei battery drain, swelling, no charge. OEM spec. Battery life restored.') },
    { id: 'motherboard-repair', icon:'🔬', title: t('主板维修', 'Motherboard'), desc: t('华为不开机、重启、充电IC、无服务、WiFi打不开。芯片级维修。', 'Huawei no power, boot loop, IC fault. Component-level board repair.') },
    { id: 'water-damage', icon:'💧', title: t('进水维修', 'Water Damage'), desc: t('华为IP68防水机型也会进水。超声波清洗+主板烘干+腐蚀修复。', 'Huawei IP68 phones can still get wet. Ultrasonic clean + dry + corrosion fix.') },
    { id: 'back-glass', icon:'🔄', title: t('后盖/边框', 'Back Glass/Frame'), desc: t('华为玻璃后盖碎裂、中框变形。P系列/Mate系列后盖更换。', 'Huawei glass back broken, frame bent. P/Mate series back glass replacement.') },
    { id: 'flash-unlock', icon:'⚡', title: t('刷机/解锁', 'Flash/Unlock'), desc: t('鸿蒙/HarmonyOS刷机、降级回Android、解屏幕锁、救砖、解华为账号锁。Pura/Mate/nova全系列。', 'HarmonyOS flash, downgrade to Android, screen unlock, unbrick, Huawei account unlock. Pura/Mate/nova full series.') },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar lang={lang} setLang={setLang} setShowContact={setShowContact} />
      <section className="bg-gradient-to-br from-red-600 via-red-500 to-red-400 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 flex items-center gap-2 text-sm"><a href="/" className="text-white/60 hover:text-white transition-colors">{t("首页", "Home")}</a><span className="text-white/30">/</span><a href="/phone-repair" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-medium transition-colors"><ArrowLeft size={15} /> {t('手机品牌', 'Phone Brands')}</a></div>
                  <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">{t('Huawei 维修', 'Huawei Repair')}</h1>
            <p className="text-xl text-red-100 mb-4">{t('华为 Mate/P/Nova 全系列专业维修 | 威海', 'Huawei Mate/P/Nova All Series | Weihai')}</p>
            <p className="text-red-100 leading-relaxed">
              {t('华为Pura 80/Mate 70/nova 14 全系列维修。屏幕坏了、电池不耐用了、进水了、鸿蒙刷机卡LOGO了——都能搞定。擅长华为主板芯片级维修。2007年至今奋斗在维修一线。', 'Huawei Pura 80/Mate 70/nova 14 all series repair. Cracked screen, battery drain, water damage, HarmonyOS boot loop — we handle it all. Specialized in Huawei component-level board repair. On the job since 2007.')}
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <button onClick={() => setShowContact(true)} className="bg-white text-red-600 font-semibold px-6 py-3 rounded-xl hover:bg-red-50 transition-colors shadow-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
              <a href="https://wa.me/6596146709?text=我的Huawei手机需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-600 transition-colors shadow-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">{t('Huawei 维修服务', 'Huawei Repair Services')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <a key={i} href={'/huawei-repair/' + s.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-all block">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600 text-lg shrink-0">{s.icon}</div>
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
              {[
                t('Pura 80 Ultra / Pro / 80', 'Pura 80 Ultra / Pro / 80'),
                t('Mate 70 Pro+ / Pro / 70 / XT', 'Mate 70 Pro+ / Pro / 70 / XT'),
                t('Pura 70 Ultra / Pro / 70', 'Pura 70 Ultra / Pro / 70'),
                t('nova 14 Ultra / Pro / 14', 'nova 14 Ultra / Pro / 14'),
                t('Mate 60 Pro+ / Pro / 60 / X5 (折叠)', 'Mate 60 Pro+ / Pro / 60 / X5 (foldable)'),
                t('P60 Pro / P60 / P50 Pro / P50', 'P60 Pro / P60 / P50 Pro / P50'),
                t('nova 13 / 12 / 11 / 12 Ultra', 'nova 13 / 12 / 11 / 12 Ultra'),
                t('MatePad Pro / Air / SE 全系', 'MatePad Pro / Air / SE series'),
              ].map((m, i) => (
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

      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">{t('常见问题', 'FAQ')}</h2>
          <div className="space-y-4">
            {[
              { q: t('华为换屏多少钱？', 'Huawei screen replacement cost?'), a: t('Nova系列¥120起，P系列¥150起，Mate系列¥200起。曲面屏会比直屏贵一些。加微信发型号查。', 'Nova from ¥120, P series from ¥150, Mate series from ¥200. Curved screens cost more. DM for quote.') },
              { q: t('华为还能修吗？被制裁后配件好找吗？', 'Parts available for Huawei after sanctions?'), a: t('没问题。虽然官方配件比以前难搞，但我们有稳定的配件渠道，Mate/P系列的主流配件都能拿到。', 'Yes. Official parts are harder but we have reliable channels for Mate/P series mainstream parts.') },
              { q: t('鸿蒙系统刷机能做吗？', 'Can you flash HarmonyOS?'), a: t('能做。鸿蒙刷机、降级回Android、救砖、解账户锁，¥60起。', 'Yes. HarmonyOS flash, downgrade to Android, unbrick, account unlock. From ¥60.') },
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

      <section className="py-16 bg-gradient-to-br from-red-600 via-red-500 to-red-400 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('Huawei 出问题了？找我', 'Huawei issues? Contact me')}</h2>
          <p className="text-red-100 mb-8">{t('免费检测，先报价后维修。', 'Free diagnosis, quote first.')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setShowContact(true)} className="bg-white text-red-600 font-semibold px-8 py-4 rounded-xl hover:bg-red-50 transition-colors shadow-lg text-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
            <a href="https://wa.me/6596146709?text=我的Huawei手机需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-green-600 transition-colors shadow-lg text-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
      <ContactModal show={showContact} setShow={setShowContact} lang={lang} />
    </div>
  )
}
