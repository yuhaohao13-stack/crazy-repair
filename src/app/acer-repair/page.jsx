'use client'
import { useState } from 'react'
import { ArrowLeft, Monitor, Battery, Cpu, ChevronDown } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ContactModal from '../../components/ContactModal'

export default function AcerRepair() {
  const [showContact, setShowContact] = useState(false)
  const [lang, setLang] = useState('zh')
  const t = (zh, en) => lang === 'zh' ? zh : en

  const services = [
    { id: 'screen-replacement', icon: <Monitor size={28} />, title: t('屏幕更换', 'Screen Replacement'), desc: t('Acer Predator/Nitro/Swift/Aspire 屏幕碎裂、漏液、花屏。原装品质LCD/OLED。含安装调试。', 'Acer Predator/Nitro/Swift/Aspire cracked screen, leaking, flickering. OEM quality LCD/OLED, fully tested.') },
    { id: 'battery-replacement', icon: <Battery size={28} />, title: t('电池更换', 'Battery Replacement'), desc: t('Acer电池鼓包、不耐用、不充电。原装规格电池。Predator/Nitro/Swift/Aspire全系。', 'Acer battery swelling, short life, not charging. OEM spec. Predator/Nitro/Swift/Aspire all series.') },
    { id: 'keyboard-repair', icon: <Monitor size={28} />, title: t('键盘维修', 'Keyboard Repair'), desc: t('按键不灵、进水粘连、个别键失灵。Acer笔记本键盘更换，含背光/多彩RGB。', 'Sticky keys, water damage, individual key failure. Acer laptop keyboard replacement, backlit/RGB.') },
    { id: 'motherboard-repair', icon: <Cpu size={28} />, title: t('主板/芯片级维修', 'Motherboard Repair'), desc: t('不开机、死机、充电芯片故障、进液腐蚀。芯片级维修，比换主板便宜得多。', 'No power, crashes, charging IC fault, liquid damage. Component-level repair.') },
    { id: 'cleaning', icon: <Cpu size={28} />, title: t('清灰换硅脂', 'Cleaning & Cooling'), desc: t('风扇异响、发热降频。Predator/Nitro游戏本深度拆机清灰+换导热硅脂，有效降温10-15°C。', 'Fan noise, overheating, throttling. Predator/Nitro deep clean + thermal paste. Effective 10-15°C temp drop.') },
    { id: 'os-upgrade', icon: <Monitor size={28} />, title: t('系统/升级', 'OS & Upgrade'), desc: t('Windows重装、加装M.2固态、内存升级。帮您选最划算的升级方案。', 'Windows reinstall, M.2 SSD install, RAM upgrade. Best upgrade plan.') },
  ]

  const models = [
    t('Predator Helios 18 / Helios 16 / Neo 16', 'Predator Helios 18 / Helios 16 / Neo 16'),
    t('Nitro V 16 / V 15 / 17 / 16', 'Nitro V 16 / V 15 / 17 / 16'),
    t('Swift Go 14 / Swift Go 16 / Swift 14', 'Swift Go 14 / Swift Go 16 / Swift 14'),
    t('Aspire Vero 16 / Aspire 3 / 5 / 7', 'Aspire Vero 16 / Aspire 3 / 5 / 7'),
    t('TravelMate / Spin 5 / Spin 3', 'TravelMate / Spin 5 / Spin 3'),
    t('ConceptD 创作者系列', 'ConceptD creator series'),
    t('Acer台式机 / 一体机', 'Acer desktop / all-in-one'),
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar lang={lang} setLang={setLang} setShowContact={setShowContact} />
      <section className="bg-gradient-to-br from-green-700 via-green-600 to-green-500 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4"><a href="/computer-repair" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-medium transition-colors"><ArrowLeft size={15} /> {t('电脑品牌', 'Computer Brands')}</a></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">{t('Acer 维修', 'Acer Repair')}</h1>
            <p className="text-xl text-green-200 mb-4">{t('宏碁 Predator/Nitro/Swift 全系列专业维修 | 威海', 'Acer Predator/Nitro/Swift All Series | Weihai')}</p>
            <p className="text-green-100 leading-relaxed">
              {t('Acer Predator顶级游戏本、Nitro性价比游戏本、Swift轻薄本、Aspire家用本——屏幕碎了、电池鼓包了、游戏本降频了，拿来给我看看。Acer笔记本价格亲民，维修费也更实惠。2007年至今奋斗在维修一线。', 'Acer Predator flagship gaming, Nitro budget gaming, Swift ultrabooks, Aspire home laptops — cracked screen, swollen battery, game throttling, we fix it all. Acer laptops are budget-friendly, so are our repairs. On the job since 2007.')}
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <button onClick={() => setShowContact(true)} className="bg-white text-green-600 font-semibold px-6 py-3 rounded-xl hover:bg-green-50 transition-colors shadow-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
              <a href="https://wa.me/6596146709?text=我的Acer电脑需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-600 transition-colors shadow-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">{t('Acer 维修服务', 'Acer Repair Services')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <a key={i} href={'/acer-repair/' + s.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-all block">
                <div className="text-green-600 mb-3">{s.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
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
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">{t('常见问题', 'FAQ')}</h2>
          <div className="space-y-4">
            {[
              { q: t('Acer修游戏本贵不贵？', 'Acer gaming laptop repair cost?'), a: t('Acer游戏本配件比外星人便宜很多。清灰¥80起，换屏¥200起，主板维修看故障程度。整体维修费很亲民。', 'Acer gaming laptop parts are much cheaper than Alienware. Cleaning from ¥80, screen from ¥200. Very affordable overall.') },
              { q: t('Acer Swift轻薄本能升级内存吗？', 'Can Acer Swift upgrade RAM?'), a: t('新款Swift大部分是板载内存焊死的，无法升级。老款有内存槽的可以加。如果有M.2固态位可以加硬盘。具体发型号问问。', 'Newer Swift models have soldered RAM. Older ones have slots. M.2 SSD upgrades are usually possible. DM your model.') },
              { q: t('Acer电脑清灰多少钱？', 'Acer cleaning cost?'), a: t('Swift轻薄本¥60起，Nitro/Predator游戏本¥80起。建议每6-12个月清一次。', 'Swift ultrabooks from ¥60, Nitro/Predator from ¥80. Recommended every 6-12 months.') },
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
      <section className="py-16 bg-gradient-to-br from-green-700 via-green-600 to-green-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('Acer 出问题了？找我', 'Acer issues? Contact me')}</h2>
          <p className="text-green-200 mb-8">{t('免费检测，先报价后维修。', 'Free diagnosis, quote first.')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setShowContact(true)} className="bg-white text-green-600 font-semibold px-8 py-4 rounded-xl hover:bg-green-50 transition-colors shadow-lg text-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
            <a href="https://wa.me/6596146709?text=我的Acer电脑需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-green-600 transition-colors shadow-lg text-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
          </div>
        </div>
      </section>
      <Footer lang={lang} />
      <ContactModal show={showContact} setShow={setShowContact} lang={lang} />
    </div>
  )
}
