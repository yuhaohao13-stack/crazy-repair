'use client'
import { useState } from 'react'
import { ArrowLeft, Smartphone, Battery, Droplets, Cpu, ChevronDown } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ContactModal from '../../components/ContactModal'

export default function RealmeRepair() {
  const [showContact, setShowContact] = useState(false)
  const [lang, setLang] = useState('zh')
  const t = (zh, en) => lang === 'zh' ? zh : en

  const services = [
    { id: 'screen-replacement', icon:'🔧', title: t('屏幕更换', 'Screen Replacement'), desc: t('Realme全系列屏幕更换。GT系列OLED高端屏，数字系列/Narzo系列LCD/OLED。碎裂漏液触摸不灵。', 'Realme full series screen replacement. GT series OLED, number/Narzo series LCD/OLED. Cracked, leaking, unresponsive.') },
    { id: 'battery-replacement', icon:'🔋', title: t('电池更换', 'Battery Service'), desc: t('Realme电池不耐用、鼓包、充不进电。原装规格电池，支持Dart闪充兼容。', 'Realme battery drain, swelling, no charge. OEM spec, Dart fast charge compatible.') },
    { id: 'charging-port', icon:'🔌', title: t('充电口/尾插', 'Charging Port'), desc: t('Type-C口松动、Dart闪充不触发、接触不良、只能慢充。尾插小板维修。', 'Loose port, Dart charge not triggering, bad contact. Flex board repair.') },
    { id: 'motherboard-repair', icon:'🔬', title: t('主板维修', 'Motherboard'), desc: t('不开机、重启、充电IC故障、无服务。Realme主板芯片级维修，OPPO系兼容低价。', 'No power, boot loop, IC fault, no service. Realme component-level board repair, OPPO platform compatible.') },
    { id: 'back-glass', icon:'🔄', title: t('后盖更换', 'Back Glass'), desc: t('Realme玻璃/素皮后盖碎裂更换。GT系列传奇设计后盖可更换。', 'Broken glass/vegan leather back. GT series legendary design back available.') },
    { id: 'flash-unlock', icon:'⚡', title: t('刷机/解锁', 'Flash/Unlock'), desc: t('RealmeUI刷机、降级、解账户锁、救砖、刷国际版。', 'RealmeUI flash, downgrade, account unlock, unbrick, flash global ROM.') },
  ]

  const models = [
    t('Realme GT 8 / GT 7 Pro / GT 7', 'Realme GT 8 / GT 7 Pro / GT 7'),
    t('Realme GT 6 / GT 6T / GT 5 Pro / GT 5', 'Realme GT 6 / GT 6T / GT 5 Pro / GT 5'),
    t('Realme 14 Pro+ / 14 Pro / 14', 'Realme 14 Pro+ / 14 Pro / 14'),
    t('Realme 13 Pro+ / 13 Pro / 13 / 12 Pro+', 'Realme 13 Pro+ / 13 Pro / 13 / 12 Pro+'),
    t('Realme Narzo 80 / 70 / 70 Pro', 'Realme Narzo 80 / 70 / 70 Pro'),
    t('Realme C系列 / Q系列', 'Realme C series / Q series'),
    t('Realme Pad / Pad Mini', 'Realme Pad / Pad Mini'),
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar lang={lang} setLang={setLang} setShowContact={setShowContact} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-yellow-600 via-amber-500 to-orange-500 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 flex items-center gap-2 text-sm"><a href="/" className="text-white/60 hover:text-white transition-colors">{t("首页", "Home")}</a><span className="text-white/30">/</span><a href="/phone-repair" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-medium transition-colors"><ArrowLeft size={15} /> {t('手机品牌', 'Phone Brands')}</a></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">{t('Realme 维修', 'Realme Repair')}</h1>
            <p className="text-xl text-amber-100 mb-4">{t('真我全系列专业维修 | 威海', 'Realme All Series | Weihai')}</p>
            <p className="text-amber-100 leading-relaxed">
              {t('Realme GT性能旗舰、数字系列、Narzo系列——屏幕碎了、电池不耐用了、Dart闪充失效了，拿来给我看看。Realme性价比手机给性价比维修，比官方实惠得多。2007年至今奋斗在维修一线。', 'Realme GT performance flagships, number series, Narzo series — cracked screen, battery drain, Dart charge failure, we fix it all. Budget-friendly repairs for budget-friendly phones. On the job since 2007.')}
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <button onClick={() => setShowContact(true)} className="bg-white text-amber-600 font-semibold px-6 py-3 rounded-xl hover:bg-amber-50 transition-colors shadow-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
              <a href="https://wa.me/6596146709?text=我的Realme手机需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-600 transition-colors shadow-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
            </div>
          </div>
        </div>
      </section>

      {/* 服务列表 */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">{t('Realme 维修服务', 'Realme Repair Services')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <a key={i} href={'/realme-repair/' + s.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-all block">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center text-yellow-600 text-lg shrink-0">{s.icon}</div>
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
                  <span className="text-amber-500">▸</span>
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
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">{t('Realme 维修常见问题', 'Realme Repair FAQ')}</h2>
          <div className="space-y-4">
            {[
              { q: t('Realme换屏多少钱？', 'Realme screen replacement cost?'), a: t('Narzo/C系列¥90起，数字系列¥120起，GT系列¥180起。Realme配件性价比高，维修费也很实惠。', 'Narzo/C series from ¥90, number series from ¥120, GT series from ¥180. Realme parts are affordable, so is our labor.') },
              { q: t('Realme GT 7 Pro的微曲屏好换吗？', 'Realme GT 7 Pro micro-curved screen replacement?'), a: t('能做。微曲屏比纯直屏难换，比曲面屏好换。我们有对应工具和配件，请放心送过来。', 'Yes. Micro-curved is easier than full curved but trickier than flat. We have the right tools and parts.') },
              { q: t('Realme GT系列打游戏发热降频能改善吗？', 'Realme GT gaming throttle fix?'), a: t('可以。深度清灰+换导热硅脂+加装散热铜片，能有效降低游戏温度5-15°C，幀率更稳定。', 'Yes. Deep clean + thermal paste + copper shim mod can lower temps 5-15°C, more stable frame rates.') },
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
      <section className="py-16 bg-gradient-to-br from-yellow-600 via-amber-500 to-orange-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('Realme 出问题了？找我', 'Realme issues? Hit me up')}</h2>
          <p className="text-amber-100 mb-8">{t('免费检测，先报价后维修。添加微信发张照片就能初步判断。', 'Free diagnosis. Add WeChat, send a photo for a quick assessment.')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setShowContact(true)} className="bg-white text-amber-600 font-semibold px-8 py-4 rounded-xl hover:bg-amber-50 transition-colors shadow-lg text-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
            <a href="https://wa.me/6596146709?text=我的Realme手机需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-green-600 transition-colors shadow-lg text-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
      <ContactModal show={showContact} setShow={setShowContact} lang={lang} />
    </div>
  )
}
