'use client'
import { useState } from 'react'
import { Smartphone, Battery, Cpu, ChevronDown } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ContactModal from '../../components/ContactModal'

export default function SamsungRepair() {
  const [showContact, setShowContact] = useState(false)
  const [lang, setLang] = useState('zh')
  const t = (zh, en) => lang === 'zh' ? zh : en

  const services = [
    { id: 'screen-replacement', title: t('屏幕更换', 'Screen Replacement'), desc: t('Samsung AMOLED屏幕更换。S系列/Z折叠屏/A系列都做。碎裂、漏液、花屏、触摸不灵。', 'Samsung AMOLED screen repair. S/Z fold/A series. Cracked, leaking, flickering, unresponsive touch.') },
    { id: 'battery-replacement', title: t('电池更换', 'Battery Service'), desc: t('Samsung电池不耐用、鼓包、充不进电。原装规格电池，含检测调试。', 'Samsung battery drain, swelling, not charging. OEM spec batteries with testing.') },
    { id: 'motherboard-repair', title: t('主板维修', 'Motherboard'), desc: t('不开机、重启、充电IC故障、无服务、WiFi打不开。三星主板芯片级维修。', 'No power, boot loop, charging IC, no service, WiFi dead. Component-level Samsung board repair.') },
    { id: 'charging-port', title: t('充电口/尾插', 'Charging Port'), desc: t('充电口松动、接触不良、Type-C不识别、只能一个方向充。', 'Loose port, bad contact, Type-C not recognized, one-way charging only.') },
    { id: 'camera-repair', title: t('摄像头维修', 'Camera'), desc: t('拍照模糊、闪退、黑屏、对焦失灵。Samsung Galaxy全系前后摄像头更换。', 'Blurry photos, crash, black screen, autofocus fail. Samsung Galaxy front/back camera.') },
    { id: 'back-glass', title: t('后盖/边框更换', 'Back Glass/Frame'), desc: t('Samsung玻璃后盖碎裂、中框变形。更换后恢复防水胶。', 'Broken glass back, bent frame. Waterproof sealant restored after replacement.') },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar lang={lang} setLang={setLang} setShowContact={setShowContact} />
      <section className="bg-gradient-to-br from-purple-700 via-purple-600 to-purple-500 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">{t('Samsung 维修', 'Samsung Repair')}</h1>
            <p className="text-xl text-purple-200 mb-4">{t('三星 Galaxy 全系列专业维修 | 威海', 'Samsung Galaxy All Series | Weihai')}</p>
            <p className="text-purple-100 leading-relaxed">
              {t('Samsung Galaxy S系列/Z折叠屏/A系列/M系列——屏幕、电池、主板、摄像头，我们都能修。三星AMOLED屏幕更换是我们的强项。2007年至今奋斗在维修一线。', 'Samsung Galaxy S/Z/A/M series — screens, batteries, motherboards, cameras, we do it all. AMOLED screen replacement is our specialty. On the job since 2007.')}
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <button onClick={() => setShowContact(true)} className="bg-white text-purple-600 font-semibold px-6 py-3 rounded-xl hover:bg-purple-50 transition-colors shadow-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
              <a href="https://wa.me/6596146709?text=我的Samsung手机需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-600 transition-colors shadow-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">{t('Samsung 维修服务', 'Samsung Repair Services')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <a key={i} href={'/samsung-repair/' + s.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-all block">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900">{s.title}</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('常见故障', 'Common Issues')}</h2>
          <div className="grid sm:grid-cols-3 gap-6 text-left max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-purple-600 mb-2">{t('📱 屏幕故障', '📱 Screen Issues')}</h3>
              <p className="text-sm text-gray-500">{t('Samsung AMOLED屏幕是手机里最贵的部件之一。Galaxy S系列换屏费用较高但比官方便宜很多。屏幕闪烁/绿线/紫斑等通病我们也处理。', 'Samsung AMOLED screens are expensive. Galaxy S series screen repair is cheaper than official. Green/purple line fix available.')}</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-purple-600 mb-2">{t('🔋 电池问题', '🔋 Battery Issues')}</h3>
              <p className="text-sm text-gray-500">{t('Samsung电池用久了自然衰减。快充导致电池损耗加快也是常见问题。鼓包电池必须立即更换，有安全隐患。', 'Samsung batteries degrade over time. Fast charging speeds up wear. Swollen batteries = immediate replacement needed.')}</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-purple-600 mb-2">{t('💧 进水/主板', '💧 Water/Board')}</h3>
              <p className="text-sm text-gray-500">{t('Samsung旗舰机有IP68防水但进水案例不少。尾插腐蚀、充电IC烧毁、不开机是常见进水后遗症。', 'Samsung flagships have IP68 but water damage still happens. Corroded ports, dead charging IC, no power are common after water exposure.')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">{t('常见问题', 'FAQ')}</h2>
          <div className="space-y-4">
            {[
              { q: t('Samsung换屏多少钱？', 'Samsung screen replacement cost?'), a: t('S系列¥200起，A系列¥150起，Z折叠系列会贵一些。具体加微信发型号查询。', 'S series from ¥200, A series from ¥150, Z fold series more. DM for exact quote.') },
              { q: t('折叠屏能修吗？', 'Can you fix foldable screens?'), a: t('能修。Samsung Z Flip/Z Fold系列的内屏和外屏我们都能换。折叠屏维修需要更高精度，我们经验足够。', 'Yes. Z Flip/Z Fold inner & outer screens. Foldable repair needs precision work — we have the experience.') },
              { q: t('三星电池鼓包危险吗？', 'Is swollen Samsung battery dangerous?'), a: t('非常危险。鼓包电池可能起火。不要继续用，尽快送过来换。不要尝试自己戳破或拆解。', 'Very dangerous. Fire risk. Stop using immediately, bring it in. Do not try to puncture or remove yourself.') },
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

      <section className="py-16 bg-gradient-to-br from-purple-700 via-purple-600 to-purple-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('Samsung 出问题了？找我', 'Samsung issues? Contact me')}</h2>
          <p className="text-purple-200 mb-8">{t('免费检测，先报价后维修。', 'Free diagnosis, quote first.')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setShowContact(true)} className="bg-white text-purple-600 font-semibold px-8 py-4 rounded-xl hover:bg-purple-50 transition-colors shadow-lg text-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
            <a href="https://wa.me/6596146709?text=我的Samsung手机需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-green-600 transition-colors shadow-lg text-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
      <ContactModal show={showContact} setShow={setShowContact} lang={lang} />
    </div>
  )
}