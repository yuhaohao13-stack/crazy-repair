'use client'
import { useState } from 'react'
import { ArrowLeft, Smartphone, Battery, Droplets, Cpu, Camera, ChevronDown, Star } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ContactModal from '../../components/ContactModal'

export default function iPhoneRepair() {
  const [showContact, setShowContact] = useState(false)
  const [lang, setLang] = useState('zh')
  const t = (zh, en) => lang === 'zh' ? zh : en

  const services = [
    { id: 'screen-replacement', icon: <Smartphone size={28} />, title: t('屏幕更换', 'Screen Replacement'),
      desc: t('iPhone 16/15/14/13/12/11/X系列全兼容。OLED原装/LCD高性价比可选。含专业密封胶恢复防水性。30分钟快修。', 'iPhone 16/15/14/13/12/11/X series. OLED OEM or LCD quality options. Waterproof sealant restored. 30min service.') },
    { id: 'battery-replacement', icon: <Battery size={28} />, title: t('电池更换', 'Battery Replacement'),
      desc: t('原装规格电池，容量达标不虚标。iPhone 6到16全系列电池现货。更换后检测健康度。告别一天三充。', 'OEM spec batteries, accurate capacity. iPhone 6 through 16 in stock. Health check after swap. Say goodbye to battery anxiety.') },
    { id: 'water-damage', icon: <Droplets size={28} />, title: t('进水维修', 'Water Damage'),
      desc: t('超声波清洗+主板烘干+腐蚀修复。iPhone进水越早送来越好，切勿插电充电！我们有丰富的iPhone进水处理经验。', 'Ultrasonic cleaning + board dry + corrosion repair. Bring ASAP, do NOT charge! Extensive iPhone water damage experience.') },
    { id: 'motherboard-repair', icon: <Cpu size={28} />, title: t('主板维修', 'Motherboard'),
      desc: t('不开机、重启循环、无服务、WiFi蓝牙打不开、面容不可用。芯片级维修，CPU重焊、基带修复、硬盘扩容。', 'No power, boot loop, no service, WiFi/BT dead, Face ID gone. Component-level: CPU reball, baseband fix, storage upgrade.') },
    { id: 'camera-repair', icon: <Camera size={28} />, title: t('摄像头维修', 'Camera Repair'),
      desc: t('拍照模糊、闪退、黑屏、对焦失灵。前后摄像头更换。iPhone 15/14/13/12/11/x全系。', 'Blurry photos, app crash, black screen, autofocus fail. Front & back camera replacement. iPhone 15/14/13/12/11/X.') },
    { id: 'face-id', icon: <Smartphone size={28} />, title: t('面容/指纹修复', 'Face ID/Touch ID'),
      desc: t('面容ID点阵修复、前置摄像头排线。换屏后面容不能用也可修复。iPhone X及以上面容，SE/8及以下指纹。', 'Face ID dot matrix repair, front camera flex. Works after screen swap. Face ID for iPhone X+, Touch ID for SE/8 and below.') },
  ]

  const models = [
    t('iPhone 16 Pro Max / Pro / Plus / 16', 'iPhone 16 Pro Max / Pro / Plus / 16'),
    t('iPhone 15 Pro Max / Pro / Plus / 15', 'iPhone 15 Pro Max / Pro / Plus / 15'),
    t('iPhone 14 Pro Max / Pro / Plus / 14', 'iPhone 14 Pro Max / Pro / Plus / 14'),
    t('iPhone 13 Pro Max / Pro / 13 / 13 Mini', 'iPhone 13 Pro Max / Pro / 13 / 13 Mini'),
    t('iPhone 12 Pro Max / Pro / 12 / 12 Mini', 'iPhone 12 Pro Max / Pro / 12 / 12 Mini'),
    t('iPhone 11 Pro Max / Pro / 11 / SE 3/2', 'iPhone 11 Pro Max / Pro / 11 / SE 3/2'),
    t('iPhone XS Max / XS / XR / X', 'iPhone XS Max / XS / XR / X'),
    t('iPhone 8 Plus / 8 / 7 Plus / 7 / 6s / 6', 'iPhone 8 Plus / 8 / 7 Plus / 7 / 6s / 6'),
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar lang={lang} setLang={setLang} setShowContact={setShowContact} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4"><a href="/phone-repair" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-medium transition-colors"><ArrowLeft size={15} /> {t('手机品牌', 'Phone Brands')}</a></div>
                  <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">{t('iPhone 维修', 'iPhone Repair')}</h1>
            <p className="text-xl text-blue-200 mb-4">{t('苹果 iPhone 全系列专业维修 | 威海环翠区', 'Professional iPhone Repair for All Models | Weihai Huancui')}</p>
            <p className="text-blue-100 leading-relaxed">
              {t('iPhone换屏、换电池、修主板、修面容、处理进水——所有iPhone型号都能修。2007年至今奋斗在维修一线，经验丰富。先检测后报价，价格透明，30天质保。', 'iPhone screen replacement, battery swap, motherboard repair, Face ID fix, water damage — all models since iPhone 6 to 16. On the repair frontline since 2007. Free diagnosis, transparent pricing, 30-day warranty.')}
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <button onClick={() => setShowContact(true)} className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-lg">
                {t('📱 微信咨询维修', '📱 WeChat for Repair')}
              </button>
              <a href="https://wa.me/6596146709?text=我的iPhone需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-600 transition-colors shadow-lg">
                {t('💬 WhatsApp咨询', '💬 WhatsApp')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 服务列表 */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">{t('iPhone 维修服务', 'iPhone Repair Services')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <a key={i} href={'/iphone-repair/' + s.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-all block">
                <div className="text-blue-600 mb-3">{s.icon}</div>
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
                  <span className="text-blue-500">▸</span>
                  <span className="text-gray-700">{m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 常见问题 */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">{t('iPhone 维修常见问题', 'iPhone Repair FAQ')}</h2>
          <div className="space-y-4">
            {[
              { q: t('换iPhone屏幕多少钱？', 'How much for iPhone screen replacement?'), a: t('价格因型号而异，iPhone 6/7/8系列最便宜，¥100起；iPhone 15/16 Pro Max OLED屏会贵一些。具体加微信发型号，我告诉你价格。', 'Price varies by model. iPhone 6/7/8 from ¥100. iPhone 15/16 Pro Max OLED is more expensive. DM me your model on WeChat for a quote.') },
              { q: t('换的屏幕是原装的吗？', 'Is the screen genuine Apple?'), a: t('我们提供两种选择：原装拆机屏（跟原厂一样）和国产高性价比屏（显示效果不错，价格实惠）。换之前跟你说清楚，你自己选。', 'Two options: OEM pulled screen (original quality) or high-quality domestic screen (good display, affordable). I will explain before you choose.') },
              { q: t('换了屏幕后面容还能用吗？', 'Will Face ID work after screen replacement?'), a: t('正常操作下不影响面容。但如果换的是非原装屏，面容可能失效。这种情况我们可以修复，费用¥120起。', 'Normally Face ID works fine. With non-OEM screens it sometimes stops working. We can fix that - from ¥120.') },
              { q: t('iPhone电池健康度80%需要换吗？', 'iPhone battery at 80%, need replacement?'), a: t('如果觉得续航明显不够用就可以换了。低健康度还可能引起降频、卡顿。换完电池不仅续航恢复，手机也会流畅很多。', 'If battery life bothers you, yes. Low health also causes throttling and lag. New battery = better battery life + snappier performance.') },
              { q: t('iPhone进水了怎么办？', 'iPhone got wet, what should I do?'), a: t('立刻关机！不要插电。尽快送来处理。iPhone进水如果处理及时，修复率很高。不要用吹风机吹或放米缸——这会让水进得更深。', 'Power off immediately! Do not charge. Bring it ASAP. Quick action = high recovery rate. No hair dryer, no rice — those make it worse.') },
              { q: t('修iPhone需要多长时间？', 'How long does iPhone repair take?'), a: t('换屏幕、电池一般30分钟到1小时。主板维修通常1-2天。修好了微信通知你。', 'Screen & battery: 30min-1hr. Motherboard: 1-2 days. I will message you when it\'s ready.') },
            ].map((faq, i) => (
              <details key={i} className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none">
                  <span className="font-medium text-gray-900 text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown size={18} className="text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                  <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('iPhone 有问题？找我', 'iPhone issues? Hit me up')}</h2>
          <p className="text-blue-200 mb-8">{t('免费检测，先报价后维修。添加微信发张照片就能初步判断。', 'Free diagnosis. Add WeChat, send a photo for a quick assessment.')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setShowContact(true)} className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors shadow-lg text-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
            <a href="https://wa.me/6596146709?text=我的iPhone需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-green-600 transition-colors shadow-lg text-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
      <ContactModal show={showContact} setShow={setShowContact} lang={lang} />
    </div>
  )
}
