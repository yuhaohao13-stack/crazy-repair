'use client'
import { useState } from 'react'
import { ArrowLeft, Monitor, Battery, Cpu, ChevronDown } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ContactModal from '../../components/ContactModal'

export default function HPRepair() {
  const [showContact, setShowContact] = useState(false)
  const [lang, setLang] = useState('zh')
  const t = (zh, en) => lang === 'zh' ? zh : en

  const services = [
    { id: 'screen-replacement', icon: <Monitor size={28} />, title: t('屏幕更换', 'Screen Replacement'), desc: t('HP Spectre x360/Envy/Pavilion/暗影精灵 屏幕碎裂、漏液、花屏、黑屏。原装品质LCD/OLED/高刷屏，含安装调试，30分钟快修。Spectre 3K2K OLED屏可换。', 'HP Spectre x360/Envy/Pavilion/OMEN cracked screen, leaking, flickering, black screen. OEM quality LCD/OLED/high-refresh screen, fully tested. Spectre 3K2K OLED available.') },
    { id: 'battery-replacement', icon: <Battery size={28} />, title: t('电池更换', 'Battery Replacement'), desc: t('HP电池鼓包、不耐用、不充电、续航断崖式下降。原装规格大容量电池。Spectre/Envy/Pavilion Plus/暗影精灵全系。', 'HP battery swelling, short life, not charging, sudden battery drain. OEM spec high-capacity battery. Spectre/Envy/Pavilion Plus/OMEN all series.') },
    { id: 'keyboard-repair', icon: <Monitor size={28} />, title: t('键盘维修', 'Keyboard Repair'), desc: t('HP笔记本按键不灵、进水粘连、个别键失灵、背光不亮。HP笔记本键盘更换，含Spectre x360背光/暗影精灵4区RGB。', 'HP laptop sticky keys, water damage, individual key failure, backlight not working. HP laptop keyboard replacement, Spectre backlit/OMEN 4-zone RGB.') },
    { id: 'motherboard-repair', icon: <Cpu size={28} />, title: t('主板/芯片级维修', 'Motherboard Repair'), desc: t('不开机、死机、充电芯片故障、进液腐蚀。芯片级维修，比换主板便宜70%以上。暗影精灵/Envy游戏本主板维修经验丰富。', 'No power, crashes, charging IC fault, liquid damage. Component-level repair, 70%+ cheaper than board replacement. OMEN/Envy gaming board repair, extensive experience.') },
    { id: 'cleaning', icon: <Cpu size={28} />, title: t('清灰换硅脂', 'Cleaning & Cooling'), desc: t('风扇异响、发热降频、游戏掉帧。HP笔记本深度拆机清灰+换顶级导热硅脂，暗影精灵/Envy有效降温10-15°C。', 'Fan noise, overheating, game frame drops. HP laptop deep clean + premium thermal paste. OMEN/Envy effective 10-15°C temp drop.') },
    { id: 'os-upgrade', icon: <Monitor size={28} />, title: t('系统/升级', 'OS & Upgrade'), desc: t('Windows重装/升级、加装M.2 NVMe固态、内存升级。HP Spectre/Envy最优升级方案推荐。', 'Windows reinstall/upgrade, M.2 NVMe SSD install, RAM upgrade. Best upgrade plan for HP Spectre/Envy.') },
  ]

  const models = [
    t('Spectre x360 16 / x360 14 (2024)', 'Spectre x360 16 / x360 14 (2024)'),
    t('Envy 16 / Envy 15 / Envy x360 (2025系列)', 'Envy 16 / Envy 15 / Envy x360 (2025 series)'),
    t('Pavilion Plus 16 / 15 / Aero 13 (2025)', 'Pavilion Plus 16 / 15 / Aero 13 (2025)'),
    t('暗影精灵 OMEN 17 / 16 / Transcend 14', 'OMEN 17 / 16 / Transcend 14'),
    t('EliteBook 800/1000 商用系列', 'EliteBook 800/1000 business series'),
    t('ProBook / ZBook 工作站', 'ProBook / ZBook workstation'),
    t('HP台式机 / 一体机', 'HP desktop / all-in-one'),
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar lang={lang} setLang={setLang} setShowContact={setShowContact} />
      <section className="bg-gradient-to-br from-teal-700 via-teal-600 to-teal-500 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4"><a href="/computer-repair" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-medium transition-colors"><ArrowLeft size={15} /> {t('电脑品牌', 'Computer Brands')}</a></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">{t('HP 维修', 'HP Repair')}</h1>
            <p className="text-xl text-teal-200 mb-4">{t('HP Spectre/Envy/暗影精灵 全系列专业维修 | 威海', 'HP Spectre/Envy/OMEN All Series | Weihai')}</p>
            <p className="text-teal-100 leading-relaxed">
              {t('HP Spectre x360高端翻转本、Envy创意本、暗影精灵游戏本、Pavilion Plus家用系列——屏幕碎了、电池鼓包了、进液开不了机了，拿来给我看看。HP笔记本芯片级维修，比惠普官方便宜。2007年至今奋斗在维修一线。Spectre x360 2024、Pavilion Plus 2025、Envy 2025系列清灰换硅脂、换OLED屏、升级固态内存，一站式搞定。', 'HP Spectre x360 high-end convertibles, Envy creator laptops, OMEN gaming, Pavilion Plus home series — cracked screen, swollen battery, liquid damage, we fix it all. HP component-level board repair. On the job since 2007. Spectre x360 2024, Pavilion Plus 2025, Envy 2025 series — cleaning, OLED screen swap, SSD/RAM upgrades, all in one place.')}
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <button onClick={() => setShowContact(true)} className="bg-white text-teal-600 font-semibold px-6 py-3 rounded-xl hover:bg-teal-50 transition-colors shadow-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
              <a href="https://wa.me/6596146709?text=我的HP电脑需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-600 transition-colors shadow-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">{t('HP 维修服务', 'HP Repair Services')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <a key={i} href={'/hp-repair/' + s.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all group block">
                <div className="relative w-full aspect-[16/9] bg-gray-100 overflow-hidden">
                  <img src={'/images/services/hp-repair-' + s.id + '.svg'} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 text-lg shrink-0">{s.icon}</div>
                    <h3 className="font-bold text-gray-900 text-lg">{s.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                  <div className="mt-3 text-teal-600 text-xs font-medium flex items-center gap-1">{t('查看详情 →', 'View Details →')}</div>
                </div>
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
                  <span className="text-teal-500">▸</span>
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
              { q: t('暗影精灵清灰多少钱？', 'HP OMEN cleaning cost?'), a: t('暗影精灵/光影精灵清灰换硅脂¥80起。游戏本建议每6-12个月清一次，有效延长寿命。', 'OMEN/Victus cleaning + thermal paste from ¥80. Gaming laptops should be cleaned every 6-12 months.') },
              { q: t('HP Spectre x360屏幕能修吗？', 'HP Spectre x360 screen repair?'), a: t('能修。Spectre系列的4K OLED屏比较贵，但我们能做。Spectre x360 14/16换屏¥350起。', 'Yes. Spectre 4K OLED screens are expensive but we can handle them. x360 14/16 screen from ¥350.') },
              { q: t('HP笔记本电池鼓包能继续用吗？', 'HP laptop swollen battery still usable?'), a: t('不能！电池鼓包有起火爆炸风险。尽快送过来换掉，换之前尽量减少使用。', 'No! Swollen batteries risk fire/explosion. Bring it in ASAP for replacement. Minimize usage.') },
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
      <section className="py-16 bg-gradient-to-br from-teal-700 via-teal-600 to-teal-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('HP 出问题了？找我', 'HP issues? Contact me')}</h2>
          <p className="text-teal-200 mb-8">{t('免费检测，先报价后维修。', 'Free diagnosis, quote first.')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setShowContact(true)} className="bg-white text-teal-600 font-semibold px-8 py-4 rounded-xl hover:bg-teal-50 transition-colors shadow-lg text-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
            <a href="https://wa.me/6596146709?text=我的HP电脑需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-green-600 transition-colors shadow-lg text-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
          </div>
        </div>
      </section>
      <Footer lang={lang} />
      <ContactModal show={showContact} setShow={setShowContact} lang={lang} />
    </div>
  )
}
