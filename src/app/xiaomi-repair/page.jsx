'use client'
import { useState } from 'react'
import { ArrowLeft, ChevronDown } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ContactModal from '../../components/ContactModal'

export default function XiaomiRepair() {
  const [showContact, setShowContact] = useState(false)
  const [lang, setLang] = useState('zh')
  const t = (zh, en) => lang === 'zh' ? zh : en

  const services = [
    { id: 'screen-replacement', title: t('屏幕更换', 'Screen Replacement'), desc: t('小米/Redmi 全系列屏幕，OLED/LCD都有。碎裂、漏液、触摸不灵。', 'Xiaomi/Redmi all series, OLED & LCD. Cracked, leaking, unresponsive touch.') },
    { id: 'battery-replacement', title: t('电池更换', 'Battery Service'), desc: t('小米电池不耐用、鼓包、充不进电。原装规格电池，性价比高。', 'Xiaomi battery issues: drain, swelling, no charge. OEM spec, great value.') },
    { id: 'motherboard-repair', title: t('主板维修', 'Motherboard'), desc: t('不开机、重启、充电IC、无服务。小米主板芯片级维修，性价比之选。', 'No power, boot loop, IC fault. Cost-effective component-level repair.') },
    { id: 'charging-port', title: t('充电口维修', 'Charging Port'), desc: t('Type-C口松动、接触不良、只能慢充。尾插小板更换。', 'Type-C loose, bad contact, slow charge only. Flex replacement.') },
    { id: 'back-glass', title: t('后盖/边框', 'Back Glass/Frame'), desc: t('小米玻璃后盖碎裂、中框变形。换后盖恢复防水胶。', 'Broken glass back, bent frame. Waterproof sealant restored.') },
    { id: 'flash-unlock', title: t('刷机/解锁', 'Flash/Unlock'), desc: t('MIUI系统卡顿、卡LOGO、忘记账号、解BL锁、刷国际版。', 'MIUI lag, boot loop, account lock, BL unlock, flash global ROM.') },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar lang={lang} setLang={setLang} setShowContact={setShowContact} />
      <section className="bg-gradient-to-br from-orange-600 via-orange-500 to-yellow-500 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4"><a href="/phone-repair" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-medium transition-colors"><ArrowLeft size={15} /> {t('手机品牌', 'Phone Brands')}</a></div>
                  <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">{t('Xiaomi 维修', 'Xiaomi Repair')}</h1>
            <p className="text-xl text-orange-100 mb-4">{t('小米/Redmi 全系列专业维修 | 威海', 'Xiaomi/Redmi All Series | Weihai')}</p>
            <p className="text-orange-100 leading-relaxed">
              {t('小米16/15 Ultra、Redmi Note 14、Poco全系列——屏幕、电池、主板、刷机解锁，统统搞定。比小米官方售后便宜，质量同样可靠。擅长小米主板芯片级维修和红米性价比维修。2007年至今奋斗在维修一线。', 'Xiaomi 16/15 Ultra, Redmi Note 14, Poco series — screens, batteries, boards, flashing, all covered. Cheaper than Xiaomi official, same quality. Specialized in Xiaomi motherboard repair and Redmi value repairs. On the job since 2007.')}
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <button onClick={() => setShowContact(true)} className="bg-white text-orange-600 font-semibold px-6 py-3 rounded-xl hover:bg-orange-50 transition-colors shadow-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
              <a href="https://wa.me/6596146709?text=我的Xiaomi手机需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-600 transition-colors shadow-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">{t('Xiaomi 维修服务', 'Xiaomi Repair Services')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <a key={i} href={'/xiaomi-repair/' + s.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-all block">
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
              {[
                t('小米 16 / 15 Ultra / 15 Pro / 15', 'Xiaomi 16 / 15 Ultra / 15 Pro / 15'),
                t('小米 14 Ultra / 14 Pro / 14 / 14T', 'Xiaomi 14 Ultra / 14 Pro / 14 / 14T'),
                t('Redmi Note 14 Pro+ / Pro / 14', 'Redmi Note 14 Pro+ / Pro / 14'),
                t('Redmi K80 Pro / K80 / K70 Ultra / K70', 'Redmi K80 Pro / K80 / K70 Ultra / K70'),
                t('Redmi Turbo 4 / Turbo 3 / Note 13 Pro', 'Redmi Turbo 4 / Turbo 3 / Note 13 Pro'),
                t('Poco F7 Pro / F7 / X7 Pro / M7 Pro', 'Poco F7 Pro / F7 / X7 Pro / M7 Pro'),
                t('小米 Mix Flip / Fold 4 / Pad 7 Pro', 'Xiaomi Mix Flip / Fold 4 / Pad 7 Pro'),
                t('Redmi Pad Pro / SE', 'Redmi Pad Pro / SE'),
              ].map((m, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <span className="text-orange-500">▸</span>
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
              { q: t('小米换屏多少钱？', 'Xiaomi screen replacement cost?'), a: t('Redmi系列¥100起，小米数字系列¥150起，旗舰机型会贵一些。具体发型号微信问。', 'Redmi from ¥100, Xiaomi number series from ¥150. DM for exact quote.') },
              { q: t('小米刷机/解BL锁能做吗？', 'Can you flash/unlock Xiaomi devices?'), a: t('能做。MIUI刷机、降级、救砖、解BL锁、刷国际版，¥50起。刷机前会帮你备份数据。', 'Yes. MIUI flash, downgrade, unbrick, BL unlock, global ROM. From ¥50. Data backup before flashing.') },
              { q: t('小米手机维修贵不贵？', 'Is Xiaomi repair expensive?'), a: t('不贵。小米配件本身就比较便宜，我们的维修费也实惠。比买新手机划算太多了。', 'Not expensive. Xiaomi parts are affordable, and our labor is reasonable. Much cheaper than buying a new phone.') },
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

      <section className="py-16 bg-gradient-to-br from-orange-600 via-orange-500 to-yellow-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('Xiaomi 有问题？找我', 'Xiaomi issues? Contact me')}</h2>
          <p className="text-orange-100 mb-8">{t('免费检测，先报价后维修。', 'Free diagnosis, quote first.')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setShowContact(true)} className="bg-white text-orange-600 font-semibold px-8 py-4 rounded-xl hover:bg-orange-50 transition-colors shadow-lg text-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
            <a href="https://wa.me/6596146709?text=我的Xiaomi手机需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-green-600 transition-colors shadow-lg text-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
      <ContactModal show={showContact} setShow={setShowContact} lang={lang} />
    </div>
  )
