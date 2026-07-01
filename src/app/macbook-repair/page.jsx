'use client'
import { useState } from 'react'
import { Monitor, Battery, Droplets, Cpu, ChevronDown } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ContactModal from '../../components/ContactModal'

export default function MacBookRepair() {
  const [showContact, setShowContact] = useState(false)
  const [lang, setLang] = useState('zh')
  const t = (zh, en) => lang === 'zh' ? zh : en

  const services = [
    { icon: <Monitor size={28} />, title: t('屏幕更换', 'Screen Replacement'), price: t('¥300起', 'from $40'), desc: t('MacBook Pro/Air 屏幕碎裂、闪烁、黑屏、线条。原装品质屏幕，含安装调试。', 'MacBook Pro/Air cracked screen, flickering, black screen, lines. OEM quality, fully tested.') },
    { icon: <Battery size={28} />, title: t('电池更换', 'Battery Replacement'), price: t('¥200起', 'from $28'), desc: t('MacBook电池鼓包、不耐用、不充电、提示"维修"。原装规格电池，更换后恢复续航。', 'MacBook battery swelling, short life, not charging, "Service Recommended". OEM spec replacement.') },
    { icon: <Cpu size={28} />, title: t('主板/逻辑板维修', 'Logic Board Repair'), price: t('¥200起', 'from $28'), desc: t('不开机、死机、充电芯片故障、进液腐蚀。芯片级维修，比换主板便宜得多。', 'No power, crashes, charging IC fault, liquid damage. Component-level repair, much cheaper than board swap.') },
    { icon: <Droplets size={28} />, title: t('进水维修', 'Water Damage'), price: t('视情况', 'Depends'), desc: t('MacBook进水后立刻关机送修，修复率很高。千万不要开机尝试！我们处理过大量MacBook进水案例。', 'Power off immediately and bring it in. High recovery rate if caught early. Do NOT try turning it on!') },
    { icon: <Monitor size={28} />, title: t('键盘/触控板', 'Keyboard/Trackpad'), price: t('¥150起', 'from $20'), desc: t('键盘按键不灵、粘滞、触控板无反馈。MacBook蝶式键盘通病可修复。', 'Sticky keys, unresponsive, trackpad not working. MacBook butterfly keyboard issues fixed.') },
    { icon: <Cpu size={28} />, title: t('清灰换硅脂/散热', 'Cleaning & Cooling'), price: t('¥100起', 'from $14'), desc: t('风扇狂转、机身发烫、性能下降。深度清灰+换导热硅脂，有效降温10-20°C。', 'Loud fans, overheating, performance drop. Deep clean + thermal paste, lowers temps 10-20°C.') },
  ]

  const models = ['MacBook Pro 16" M3/M4', 'MacBook Pro 14" M3/M4', 'MacBook Pro 13" A1706/A1989/A2338', 'MacBook Pro 15" A1398/A1707/A1990', 'MacBook Pro 17" A1297', 'MacBook Air 15" M3/M4', 'MacBook Air 13" A1466/A1932/A2337', 'MacBook Air 11" A1370/A1465', 'iMac 21.5/27 全代', 'Mac Mini / Mac Pro']

  return (
    <div className="min-h-screen bg-white">
      <Navbar lang={lang} setLang={setLang} setShowContact={setShowContact} />
      <section className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">{t('MacBook 维修', 'MacBook Repair')}</h1>
            <p className="text-xl text-gray-300 mb-4">{t('MacBook Pro / Air 全型号专业维修 | 威海', 'MacBook Pro / Air All Models | Weihai')}</p>
            <p className="text-gray-300 leading-relaxed">
              {t('MacBook屏幕碎了？电池鼓包了？进液开不了机？我们修。从2007年奋斗在维修一线，MacBook主板芯片级维修经验丰富。比官方便宜，质量不打折。', 'Cracked MacBook screen? Swollen battery? Liquid damage? We fix it. On the repair frontline since 2007. Cheap vs official, same quality.')}
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <button onClick={() => setShowContact(true)} className="bg-white text-gray-800 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors shadow-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
              <a href="https://wa.me/6596146709?text=我的MacBook需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-600 transition-colors shadow-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">{t('MacBook 维修服务', 'MacBook Repair Services')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <a key={i} href={'/macbook-repair/' + s.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-all block">
                <div className="text-gray-600 mb-3">{s.icon}</div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900">{s.title}</h3>
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded">{s.price}</span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t('支持型号', 'Supported Models')}</h2>
          <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="grid grid-cols-2 gap-3">
              {models.map((m, i) => <div key={i} className="flex items-center gap-2 text-sm"><span className="text-blue-500">▸</span><span className="text-gray-700">{m}</span></div>)}
            </div>
            <p className="text-xs text-gray-400 mt-4 text-center">{t('没找到你的型号？加微信问我', 'Model not listed? DM me on WeChat')}</p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">{t('MacBook 常见问题', 'MacBook FAQ')}</h2>
          <div className="space-y-4">
            {[
              { q: t('MacBook维修比官方便宜多少？', 'How much cheaper vs official Apple?'), a: t('便宜很多。换屏幕官方可能要¥2000-4000，我们¥300起。换电池官方¥1000+，我们¥200起。而且质量和手艺不比官方差。', 'Way cheaper. Official screen: ¥2000-4000. Us: from ¥300. Official battery: ¥1000+. Us: from ¥200. Same quality work.') },
              { q: t('MacBook进水了怎么办？', 'MacBook got wet, what to do?'), a: t('立刻拔掉电源、关机！不要开机检查！拿吹风机冷风远距离吹干表面，马上送过来。越早处理，修复率越高。开机通电会导致短路烧主板。', 'Unplug, power off NOW! Do not try to turn it on! Pat dry, bring it ASAP. Powering on wet = short circuit = dead board.') },
              { q: t('电池鼓包还能用吗？', 'Swollen battery still usable?'), a: t('绝对不要！电池鼓包有安全隐患，可能起火或爆炸。尽快送过来换掉，换之前尽量减少使用。', 'No! Swollen batteries are a fire/explosion hazard. Bring it in ASAP for replacement. Minimize usage until then.') },
              { q: t('修MacBook一般多久？', 'How long does MacBook repair take?'), a: t('换屏幕/电池通常当天可取。主板维修1-3天。进水和复杂问题需要检测后才能给时间。', 'Screen/battery: same day. Logic board: 1-3 days. Water damage: depends on diagnosis.') },
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

      <section className="py-16 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('MacBook 出问题了？找我', 'MacBook issues? Hit me up')}</h2>
          <p className="text-gray-300 mb-8">{t('免费检测，先报价后维修。', 'Free diagnosis, quote first.')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setShowContact(true)} className="bg-white text-gray-800 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-lg text-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
            <a href="https://wa.me/6596146709?text=我的MacBook需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-green-600 transition-colors shadow-lg text-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
      <ContactModal show={showContact} setShow={setShowContact} lang={lang} />
    </div>
  )
}