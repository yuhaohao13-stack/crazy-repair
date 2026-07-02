'use client'
import { useState } from 'react'
import { ArrowLeft, Smartphone, Battery, Droplets, Cpu, ChevronDown, Camera } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ContactModal from '../../components/ContactModal'

export default function GoogleRepair() {
  const [showContact, setShowContact] = useState(false)
  const [lang, setLang] = useState('zh')
  const t = (zh, en) => lang === 'zh' ? zh : en

  const services = [
    { id: 'screen-replacement', icon:'🔧', title: t('屏幕更换', 'Screen Replacement'), desc: t('Google Pixel全系列OLED屏幕更换。碎裂漏液触摸不灵。含密封胶恢复防水。', 'Google Pixel all series OLED screen. Cracked, leaking, unresponsive. Waterproof sealant restored.') },
    { id: 'battery-replacement', icon:'🔋', title: t('电池更换', 'Battery Service'), desc: t('Pixel电池不耐用、鼓包、充不进电。原装规格电池。Pixel 6/7/8/9/10全系支持。', 'Pixel battery drain, swelling, no charge. OEM spec. Pixel 6/7/8/9/10 all series.') },
    { id: 'charging-port', icon:'🔌', title: t('充电口/尾插', 'Charging Port'), desc: t('Type-C口松动、接触不良、只能慢充。无线充电不工作也可以检测维修。', 'Loose port, bad contact, slow charge only. Wireless charging not working — we can diagnose that too.') },
    { id: 'camera-repair', icon:'📷', title: t('摄像头维修', 'Camera Repair'), desc: t('Pixel系列相机模糊、闪退、黑屏。Google计算摄影模组维修。前后摄像头更换。', 'Pixel camera blurry, crash, black screen. Google computational photography module repair. Front & back camera.') },
    { id: 'motherboard-repair', icon:'🔬', title: t('主板维修', 'Motherboard'), desc: t('不开机、重启、充电IC故障、无服务。Google Tensor芯片主板芯片级维修。', 'No power, boot loop, IC fault, no service. Google Tensor SoC board component-level repair.') },
    { id: 'software-issues', icon:'🔧', title: t('系统/刷机', 'Software/Flash'), desc: t('Pixel系统卡顿、卡LOGO、OTA更新失败、救砖、解FRP锁。刷回原厂系统。', 'Pixel lag, boot loop, OTA fail, unbrick, FRP unlock. Flash back to stock.') },
  ]

  const models = [
    t('Pixel 11 / 11 Pro / 11 Pro XL', 'Pixel 11 / 11 Pro / 11 Pro XL'),
    t('Pixel 10 / 10 Pro / 10 Pro XL', 'Pixel 10 / 10 Pro / 10 Pro XL'),
    t('Pixel 9a / 9 Pro / 9 Pro XL / 9', 'Pixel 9a / 9 Pro / 9 Pro XL / 9'),
    t('Pixel 8a / 8 Pro / 8', 'Pixel 8a / 8 Pro / 8'),
    t('Pixel 7a / 7 Pro / 7', 'Pixel 7a / 7 Pro / 7'),
    t('Pixel 6a / 6 Pro / 6', 'Pixel 6a / 6 Pro / 6'),
    t('Pixel Fold / Fold 9 / Tablet', 'Pixel Fold / Fold 9 / Tablet'),
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar lang={lang} setLang={setLang} setShowContact={setShowContact} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-700 via-gray-600 to-gray-500 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 flex items-center gap-2 text-sm"><a href="/" className="text-white/60 hover:text-white transition-colors">{t("首页", "Home")}</a><span className="text-white/30">/</span><a href="/phone-repair" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-medium transition-colors"><ArrowLeft size={15} /> {t('手机品牌', 'Phone Brands')}</a></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">{t('Google Pixel 维修', 'Google Pixel Repair')}</h1>
            <p className="text-xl text-gray-300 mb-4">{t('Google Pixel 全系列专业维修 | 威海', 'Google Pixel All Series | Weihai')}</p>
            <p className="text-gray-300 leading-relaxed">
              {t('Google Pixel 纯净Android体验——屏幕碎了、Tensor芯片发热、电池不耐用、相机计算摄影出问题、刷机卡LOGO了，拿来给我看看。虽然在威海找Pixel配件不容易，但我们有渠道。2007年至今奋斗在维修一线。', 'Google Pixel pure Android experience — cracked screen, Tensor chip overheating, battery drain, camera issues, boot loop from flashing gone wrong, we handle it all. Pixel parts are harder to source in Weihai but we have channels. On the job since 2007.')}
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <button onClick={() => setShowContact(true)} className="bg-white text-gray-600 font-semibold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors shadow-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
              <a href="https://wa.me/6596146709?text=我的Google Pixel手机需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-600 transition-colors shadow-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
            </div>
          </div>
        </div>
      </section>

      {/* 服务列表 */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">{t('Google 维修服务', 'Google Repair Services')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <a key={i} href={'/google-repair/' + s.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-all block">
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
                  <span className="text-gray-500">▸</span>
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
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">{t('Pixel 维修常见问题', 'Pixel Repair FAQ')}</h2>
          <div className="space-y-4">
            {[
              { q: t('Pixel配件好找吗？', 'Are Pixel parts easy to find?'), a: t('Pixel在威海比较小众，配件确实不如iPhone/Samsung好找。但我们有稳定的供货渠道，主流型号的屏幕和电池都能拿到。建议先加微信问一下。', 'Pixel is niche in Weihai, parts are harder to find than iPhone/Samsung. But we have reliable channels for mainstream models. DM me first to check.') },
              { q: t('Pixel换屏多少钱？', 'Pixel screen replacement cost?'), a: t('Pixel 6a/7a约¥250起，Pixel 8/9系列¥350起，高端型号会贵一些。具体加微信发型号查。', 'Pixel 6a/7a from ¥250, Pixel 8/9 from ¥350. Higher-end models cost more. DM for quote.') },
              { q: t('Tensor芯片发热厉害怎么办？', 'Tensor chip overheating fix?'), a: t('Pixel的Tensor芯片本身发热较大，但可以通过换硅脂+加散热贴片改善。加装散热改造可以有效降低日常温度。', 'Tensor chips run hot by design. We can improve with thermal paste replacement + heat sink mod. Helps lower daily temps.') },
              { q: t('Pixel能刷机吗？', 'Can you flash Pixel?'), a: t('当然能。Pixel是最容易刷机的手机之一，刷回原厂系统、救砖、解FRP都可以。¥60起。', 'Absolutely. Pixel is one of the easiest phones to flash. Stock restore, unbrick, FRP unlock. From ¥60.') },
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
      <section className="py-16 bg-gradient-to-br from-gray-700 via-gray-600 to-gray-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('Pixel 出问题了？找我', 'Pixel issues? Hit me up')}</h2>
          <p className="text-gray-300 mb-8">{t('免费检测，先报价后维修。添加微信发张照片就能初步判断。', 'Free diagnosis. Add WeChat, send a photo for a quick assessment.')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setShowContact(true)} className="bg-white text-gray-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors shadow-lg text-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
            <a href="https://wa.me/6596146709?text=我的Google手机需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-green-600 transition-colors shadow-lg text-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
      <ContactModal show={showContact} setShow={setShowContact} lang={lang} />
    </div>
  )
}
