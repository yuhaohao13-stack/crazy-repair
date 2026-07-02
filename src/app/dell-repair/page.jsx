'use client'
import { useState } from 'react'
import { ArrowLeft, Monitor, Battery, Cpu, ChevronDown } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ContactModal from '../../components/ContactModal'

export default function DellRepair() {
  const [showContact, setShowContact] = useState(false)
  const [lang, setLang] = useState('zh')
  const t = (zh, en) => lang === 'zh' ? zh : en

  const services = [
    { id: 'screen-replacement', icon: <Monitor size={28} />, title: t('屏幕更换', 'Screen Replacement'), desc: t('Dell XPS 16/14/Inspiron/Latitude/Alienware 屏幕碎裂、漏液、花屏、黑屏、线条。原装品质LCD/OLED/高刷屏，含安装调试，30分钟快修。XPS 4K OLED屏可换。', 'Dell XPS 16/14/Inspiron/Latitude/Alienware cracked screen, leaking, flickering, black screen, lines. OEM quality LCD/OLED/high-refresh screen, fully tested. XPS 4K OLED available.') },
    { id: 'battery-replacement', icon: <Battery size={28} />, title: t('电池更换', 'Battery Replacement'), desc: t('Dell电池鼓包、不耐用、不充电、续航大幅下降。原装规格大容量电池，更换后恢复续航。XPS/Inspiron/Latitude 2025全系。', 'Dell battery swelling, short life, not charging, poor runtime. OEM spec high-capacity battery. XPS/Inspiron/Latitude 2025 all series.') },
    { id: 'keyboard-repair', icon: <Monitor size={28} />, title: t('键盘维修', 'Keyboard Repair'), desc: t('按键不灵、进水后粘连、个别键失灵、Alienware AlienFX RGB不亮。Dell笔记本键盘更换，含背光/单键RGB。', 'Sticky keys, water damage, individual key failure, Alienware AlienFX RGB not working. Dell laptop keyboard replacement, backlit/per-key RGB.') },
    { id: 'motherboard-repair', icon: <Cpu size={28} />, title: t('主板/芯片级维修', 'Motherboard Repair'), desc: t('不开机、死机、充电芯片故障、进液腐蚀。芯片级维修，比换主板便宜70%以上。XPS/Alienware游戏本主板维修，经验丰富。', 'No power, crashes, charging IC fault, liquid damage. Component-level repair, 70%+ cheaper than board replacement. XPS/Alienware gaming board repair, extensive experience.') },
    { id: 'cleaning', icon: <Cpu size={28} />, title: t('清灰换硅脂', 'Cleaning & Cooling'), desc: t('风扇狂转、机身发烫、游戏降频掉帧。深度拆机清灰+换顶级导热硅脂，Dell G系列/Alienware散热改善显著，有效降温10-15°C。', 'Loud fans, overheating, game frame drops. Deep clean + premium thermal paste. Major improvement for Dell G series/Alienware gaming laptops. Effective 10-15°C temp drop.') },
    { id: 'os-upgrade', icon: <Monitor size={28} />, title: t('系统/升级', 'OS & Upgrade'), desc: t('Windows重装/升级、加装M.2 NVMe固态、内存升级到128GB、数据备份迁移。Dell XPS/Alienware最优升级方案。', 'Windows reinstall/upgrade, M.2 NVMe SSD install, RAM upgrade up to 128GB, data backup & migration. Best upgrade plan for Dell XPS/Alienware.') },
  ]

  const models = [
    t('XPS 16 (2024) / XPS 15 / XPS 14 (2024) / XPS 13', 'XPS 16 (2024) / XPS 15 / XPS 14 (2024) / XPS 13'),
    t('Inspiron 16 Plus / 16 / 15 / 14 (2025系列)', 'Inspiron 16 Plus / 16 / 15 / 14 (2025 series)'),
    t('Latitude 7650 / 7550 / 7450 / 7350 (2025)', 'Latitude 7650 / 7550 / 7450 / 7350 (2025)'),
    t('Alienware M18 R2 / M16 R2 / X16 R2 / X14', 'Alienware M18 R2 / M16 R2 / X16 R2 / X14'),
    t('G系列游戏本 G16 (2024) / G15', 'G series G16 (2024) / G15'),
    t('Precision 工作站系列', 'Precision workstation series'),
    t('Dell台式机 / 一体机', 'Dell desktop / all-in-one'),
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar lang={lang} setLang={setLang} setShowContact={setShowContact} />
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4"><a href="/computer-repair" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-medium transition-colors"><ArrowLeft size={15} /> {t('电脑品牌', 'Computer Brands')}</a></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">{t('Dell 维修', 'Dell Repair')}</h1>
            <p className="text-xl text-blue-200 mb-4">{t('Dell XPS/Inspiron/Alienware 全系列专业维修 | 威海', 'Dell XPS/Inspiron/Alienware All Series | Weihai')}</p>
            <p className="text-blue-100 leading-relaxed">
              {t('Dell XPS轻薄旗舰、Inspiron家用全能、Alienware顶级游戏本、Latitude商用本——屏幕碎了、电池鼓包了、游戏本发热降频了，拿来给我看看。Dell笔记本芯片级维修，比官方便宜。2007年至今奋斗在维修一线。XPS 16/14 (2024)、Inspiron 2025系列、Latitude 2025系列清灰换硅脂、换OLED屏、升级固态内存，一站式搞定。', 'Dell XPS flagship ultrabooks, Inspiron all-rounders, Alienware gaming beasts, Latitude business laptops — cracked screen, swollen battery, gaming throttle, we fix it all. Dell component-level board repair, cheaper than official. On the job since 2007. XPS 16/14 (2024), Inspiron 2025 series, Latitude 2025 series — cleaning, OLED screen swap, SSD/RAM upgrades, all in one place.')}
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <button onClick={() => setShowContact(true)} className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
              <a href="https://wa.me/6596146709?text=我的Dell电脑需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-600 transition-colors shadow-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
            </div>
          </div>
        </div>
      </section>
      {/* 服务列表 */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">{t('Dell 维修服务', 'Dell Repair Services')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <a key={i} href={'/dell-repair/' + s.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all group block">
                <div className="relative w-full aspect-[16/9] bg-gray-100 overflow-hidden">
                  <img src={'/images/services/dell-repair-' + s.id + '.svg'} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 text-lg shrink-0">{s.icon}</div>
                    <h3 className="font-bold text-gray-900 text-lg">{s.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                  <div className="mt-3 text-blue-600 text-xs font-medium flex items-center gap-1">{t('查看详情 →', 'View Details →')}</div>
                </div>
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
            <p className="text-xs text-gray-400 mt-4 text-center">{t('没找到你的型号？加微信问我', 'Model not listed? DM me on WeChat')}</p>
          </div>
        </div>
      </section>
      {/* 常见问题 */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">{t('常见问题', 'FAQ')}</h2>
          <div className="space-y-4">
            {[
              { q: t('Dell外星人维修贵吗？', 'Alienware repair expensive?'), a: t('外星人本子配件确实贵一些，但比戴尔官方便宜很多。清灰换硅脂¥80起，换屏¥300起。具体加微信报价。', 'Alienware parts cost more, but still way cheaper than Dell official. Cleaning from ¥80, screen from ¥300. DM for quote.') },
              { q: t('Dell XPS屏幕摄像头位置有条线怎么办？', 'Dell XPS line at camera notch?'), a: t('XPS 16/15的InfinityEdge屏幕确实有个通病——排线问题导致的竖线。可以修复排线不用换整个屏幕，¥150起。', 'XPS 16/15 InfinityEdge screens have a known flex cable issue causing lines. We can repair the flex, no need to replace the whole screen. From ¥150.') },
              { q: t('游戏本清灰换硅脂有效果吗？', 'Does cleaning gaming laptop help?'), a: t('非常有效。Dell G系列/Alienware用久了风扇会积很多灰，散热效率下降30%以上。清灰换硅脂后温度可以降10-20°C。', 'Very effective. Dell G series/Alienware fans clog with dust over time, reducing cooling by 30%+. After cleaning, temps drop 10-20°C.') },
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
      <section className="py-16 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('Dell 出问题了？找我', 'Dell issues? Contact me')}</h2>
          <p className="text-blue-200 mb-8">{t('免费检测，先报价后维修。', 'Free diagnosis, quote first.')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setShowContact(true)} className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors shadow-lg text-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
            <a href="https://wa.me/6596146709?text=我的Dell电脑需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-green-600 transition-colors shadow-lg text-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
          </div>
        </div>
      </section>
      <Footer lang={lang} />
      <ContactModal show={showContact} setShow={setShowContact} lang={lang} />
    </div>
  )
}
