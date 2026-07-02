'use client'
import { useState } from 'react'
import { ArrowLeft, Monitor, Battery, Cpu, ChevronDown } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ContactModal from '../../components/ContactModal'

export default function MSIRepair() {
  const [showContact, setShowContact] = useState(false)
  const [lang, setLang] = useState('zh')
  const t = (zh, en) => lang === 'zh' ? zh : en

  const services = [
    { id: 'screen-replacement', icon: <Monitor size={28} />, title: t('屏幕更换', 'Screen Replacement'), desc: t('MSI Raider/Stealth/Titan 屏幕碎裂、漏液、花屏。原装品质LCD/OLED/高刷屏。含安装调试，30分钟快修。', 'MSI Raider/Stealth/Titan cracked screen, leaking, flickering. OEM quality LCD/OLED/high-refresh screen. 30-min quick fix.') },
    { id: 'battery-replacement', icon: <Battery size={28} />, title: t('电池更换', 'Battery Replacement'), desc: t('MSI电池鼓包、不耐用、不充电。原装规格大容量电池。Raider/Stealth/Titan/GF全系。', 'MSI battery swelling, short life, not charging. OEM spec high-capacity battery. Raider/Stealth/Titan/GF all series.') },
    { id: 'keyboard-repair', icon: <Monitor size={28} />, title: t('键盘维修', 'Keyboard Repair'), desc: t('按键不灵、进水粘连、个别键失灵、Stealth RGB背光故障。MSI笔记本键盘更换，含SteelSeries单键RGB。', 'Sticky keys, water damage, individual key failure, Stealth RGB backlight issues. MSI keyboard replacement, SteelSeries per-key RGB.') },
    { id: 'motherboard-repair', icon: <Cpu size={28} />, title: t('主板/芯片级维修', 'Motherboard Repair'), desc: t('不开机、死机、充电芯片故障、进液腐蚀。MSI游戏本主板芯片级维修，比换主板便宜得多。Titan旗舰主板维修。', 'No power, crashes, charging IC fault, liquid damage. Component-level repair for MSI gaming boards. Much cheaper than board swap. Titan flagship board repair.') },
    { id: 'cleaning', icon: <Cpu size={28} />, title: t('清灰换硅脂', 'Cleaning & Cooling'), desc: t('风扇狂转、机身发烫、游戏降频掉帧。MSI Raider/Titan深度拆机清灰+换顶级导热硅脂，有效降温10-15°C。', 'Loud fans, overheating, game throttling. MSI Raider/Titan deep clean + premium thermal paste. Effective 10-15°C temp drop.') },
    { id: 'os-upgrade', icon: <Monitor size={28} />, title: t('系统/升级', 'OS & Upgrade'), desc: t('Windows重装、加装M.2 NVMe固态、内存升级。MSI Center设置优化。帮您选最划算的升级方案。', 'Windows reinstall, M.2 NVMe SSD install, RAM upgrade. MSI Center config. Best upgrade plan.') },
  ]

  const models = [
    t('Raider GE68 HX / GE78 HX (2024)', 'Raider GE68 HX / GE78 HX (2024)'),
    t('Stealth 18 / 16 / 14 (2025系列)', 'Stealth 18 / 16 / 14 (2025 series)'),
    t('Titan 18 HX (2025) / GT77 HX', 'Titan 18 HX (2025) / GT77 HX'),
    t('Katana 17 / 15 / GF76 / GF66', 'Katana 17 / 15 / GF76 / GF66'),
    t('Sword 17 / 15 / Cyborg 15', 'Sword 17 / 15 / Cyborg 15'),
    t('Prestige 16 / 14 创作者本', 'Prestige 16 / 14 creator laptops'),
    t('MSI台式机 / 一体机', 'MSI desktop / all-in-one'),
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar lang={lang} setLang={setLang} setShowContact={setShowContact} />
      <section className="bg-gradient-to-br from-red-700 via-red-600 to-red-500 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4"><a href="/computer-repair" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-medium transition-colors"><ArrowLeft size={15} /> {t('电脑品牌', 'Computer Brands')}</a></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">{t('MSI 微星维修', 'MSI Repair')}</h1>
            <p className="text-xl text-red-200 mb-4">{t('MSI Raider/Stealth/Titan 全系列专业维修 | 威海', 'MSI Raider/Stealth/Titan All Series | Weihai')}</p>
            <p className="text-red-100 leading-relaxed">
              {t('MSI Raider旗舰游戏本、Stealth轻薄性能本、Titan巨无霸发烧本、Katana性价比游戏本——屏幕碎了、电池鼓包了、游戏本降频掉帧、SteelSeries键盘不亮了，拿来给我看看。MSI游戏本芯片级维修，比微星官方便宜。2007年至今奋斗在维修一线。Raider/Stealth 2024-2025系列清灰换硅脂、换高刷MiniLED屏、升级到128GB内存，一站式搞定。', 'MSI Raider flagship gaming, Stealth slim performance, Titan desktop-replacement beast, Katana budget gaming — cracked screen, swollen battery, game throttling, SteelSeries keyboard dead, we fix it all. MSI gaming board repair, cheaper than official. On the job since 2007. Raider/Stealth 2024-2025 cleaning, MiniLED high-refresh screen swap, up to 128GB RAM upgrade, all in one place.')}
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <button onClick={() => setShowContact(true)} className="bg-white text-red-600 font-semibold px-6 py-3 rounded-xl hover:bg-red-50 transition-colors shadow-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
              <a href="https://wa.me/6596146709?text=我的MSI微星电脑需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-600 transition-colors shadow-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">{t('MSI 维修服务', 'MSI Repair Services')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <a key={i} href={'/msi-repair/' + s.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-all block">
                <div className="text-red-600 mb-3">{s.icon}</div>
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
              { q: t('MSI游戏本清灰换硅脂多少钱？', 'MSI gaming laptop cleaning cost?'), a: t('Stealth ¥80起，Raider/Titan ¥100起。MSI高端本散热模块复杂，费用稍高但效果显著。建议每半年清一次。', 'Stealth from ¥80, Raider/Titan from ¥100. MSI high-end cooling modules are complex but the thermal improvement is dramatic. Recommended every 6 months.') },
              { q: t('MSI屏幕能升级高刷屏吗？', 'MSI screen upgrade to high refresh?'), a: t('可以。比如Raider GE系列可以换MiniLED 4K 120Hz或2K 240Hz屏。Stealth可以换OLED屏。具体发型号问问。', 'Yes. Raider GE can upgrade to MiniLED 4K 120Hz or QHD 240Hz. Stealth can upgrade to OLED. DM your model.') },
              { q: t('MSI Titan主板修得好吗？', 'Can MSI Titan motherboard be repaired?'), a: t('可以。Titan主板虽然贵但我们能做芯片级维修。充电IC、供电模块、南桥等常见故障都能修，比换板便宜70%以上。', 'Yes. Titan boards are expensive but we do component-level repair. Charging IC, VRM, chipset — common issues we fix, 70%+ cheaper than board replacement.') },
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
      <section className="py-16 bg-gradient-to-br from-red-700 via-red-600 to-red-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('MSI 出问题了？找我', 'MSI issues? Contact me')}</h2>
          <p className="text-red-200 mb-8">{t('免费检测，先报价后维修。', 'Free diagnosis, quote first.')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setShowContact(true)} className="bg-white text-red-600 font-semibold px-8 py-4 rounded-xl hover:bg-red-50 transition-colors shadow-lg text-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
            <a href="https://wa.me/6596146709?text=我的MSI微星电脑需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-green-600 transition-colors shadow-lg text-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
          </div>
        </div>
      </section>
      <Footer lang={lang} />
      <ContactModal show={showContact} setShow={setShowContact} lang={lang} />
    </div>
  )
}
