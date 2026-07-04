'use client'
import { useSite } from '../../lib/SiteContext'
import { useState } from 'react'
import { ArrowLeft, Monitor, Battery, Cpu, ChevronDown } from 'lucide-react'
import Navbar from '../../components/Navbar'

export default function LenovoRepair() {
  const { lang, setShowContact } = useSite();
  const t = (zh, en) => lang === 'zh' ? zh : en

  const services = [
    { id: 'screen-replacement', icon: <Monitor size={28} />, title: t('屏幕更换', 'Screen Replacement'), desc: t('联想ThinkPad/Yoga Pro/小新/拯救者 屏幕碎裂、漏液、花屏、黑屏。原装品质LCD/OLED/高刷屏，含安装调试，30分钟快修。Yoga 4K OLED屏可换。', 'Lenovo ThinkPad/Yoga Pro/Xiaoxin/Legion cracked screen, leaking, flickering, black screen. OEM quality LCD/OLED/high-refresh screen, fully tested. Yoga 4K OLED available.') },
    { id: 'battery-replacement', icon: <Battery size={28} />, title: t('电池更换', 'Battery Replacement'), desc: t('联想电池鼓包、不耐用、不充电、续航断崖式下降。原装规格大容量电池。ThinkPad X1/T/P系列、小新、Yoga Pro、拯救者全系。', 'Lenovo battery swelling, short life, not charging, sudden battery drain. OEM spec high-capacity battery. ThinkPad X1/T/P, Xiaoxin, Yoga Pro, Legion all series.') },
    { id: 'keyboard-repair', icon: <Monitor size={28} />, title: t('键盘维修', 'Keyboard Repair'), desc: t('ThinkPad经典键盘按键不灵、小红点(TrackPoint)失效、背光不亮。拯救者 Legion TrueStrike RGB键盘更换。', 'ThinkPad classic keyboard sticky keys, TrackPoint not working, backlight not working. Legion TrueStrike RGB keyboard replacement.') },
    { id: 'motherboard-repair', icon: <Cpu size={28} />, title: t('主板/芯片级维修', 'Motherboard Repair'), desc: t('不开机、死机、充电芯片故障、进液腐蚀。芯片级维修，比换主板便宜70%以上。ThinkPad/拯救者主板维修经验丰富。', 'No power, crashes, charging IC fault, liquid damage. Component-level repair, 70%+ cheaper than board replacement. Extensive ThinkPad/Legion board repair experience.') },
    { id: 'cleaning', icon: <Cpu size={28} />, title: t('清灰换硅脂', 'Cleaning & Cooling'), desc: t('风扇异响、发热降频、游戏掉帧。拯救者/Yoga Pro深度拆机清灰+换顶级导热硅脂，有效降温10-15°C。', 'Fan noise, overheating, game frame drops. Legion/Yoga Pro deep clean + premium thermal paste. Effective 10-15°C temp drop.') },
    { id: 'os-upgrade', icon: <Monitor size={28} />, title: t('系统/升级', 'OS & Upgrade'), desc: t('Windows重装/升级、加装M.2 NVMe固态、内存升级到64GB。ThinkPad BIOS升级/设置。帮您选最划算的升级方案。', 'Windows reinstall/upgrade, M.2 NVMe SSD install, RAM upgrade up to 64GB. ThinkPad BIOS update/config. Best upgrade plan for your budget.') },
    { id: 'other-issues', icon: '🔍', title: t('其他故障', 'Other Issues'), desc: t('免费检测，不修不收费。', 'Free check, no charge if no repair.') },
  ]

  const models = [
    t('ThinkPad X1 Carbon Gen 13 (2025) / Gen 12 / Gen 11', 'ThinkPad X1 Carbon Gen 13 (2025) / Gen 12 / Gen 11'),
    t('ThinkPad T16 Gen 4 / T14s Gen 6 / T14 Gen 5', 'ThinkPad T16 Gen 4 / T14s Gen 6 / T14 Gen 5'),
    t('Yoga Pro 9i (2025) / Yoga 9i / Yoga Slim 7i', 'Yoga Pro 9i (2025) / Yoga 9i / Yoga Slim 7i'),
    t('拯救者 Legion 9i (2025) / Pro 7i / 5i / Slim 5', 'Legion 9i (2025) / Pro 7i / 5i / Slim 5'),
    t('小新 Pro 16 / Pro 14 / Air 15 / Air 14', 'Xiaoxin Pro 16 / Pro 14 / Air 15 / Air 14'),
    t('ThinkBook 16p Gen 5 / 14+ / 16+', 'ThinkBook 16p Gen 5 / 14+ / 16+'),
    t('联想台式机 / 一体机', 'Lenovo desktop / all-in-one'),
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 flex items-center gap-2 text-sm"><a href="/" className="text-white/60 hover:text-white transition-colors">{t("首页", "Home")}</a><span className="text-white/30">/</span><a href="/computer-repair" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-medium transition-colors"><ArrowLeft size={15} /> {t('电脑品牌', 'Computer Brands')}</a></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">{t('Lenovo 维修', 'Lenovo Repair')}</h1>
            <p className="text-xl text-blue-200 mb-4">{t('联想 ThinkPad/拯救者/Yoga/小新 全系列专业维修 | 威海', 'Lenovo ThinkPad/Legion/Yoga/Xiaoxin All Series | Weihai')}</p>
            <p className="text-blue-100 leading-relaxed">
              {t('联想ThinkPad商用本、拯救者/小新电竞&全能本、Yoga高端轻薄本——屏幕碎了、电池鼓包了、ThinkPad小红点不灵了、拯救者降频了，拿来给我看看。联想笔记本芯片级维修，比联想起官方便宜。2007年至今奋斗在维修一线。ThinkPad X1 Carbon Gen 13 (2025)、Yoga Pro 9i 2025、Legion 9i 2025系列清灰换硅脂、换OLED屏、升级固态内存，一站式搞定。', 'Lenovo ThinkPad business, Legion gaming, Xiaoxin all-rounders, Yoga premium ultrabooks — cracked screen, swollen battery, TrackPoint issues, Legion throttling, we fix it all. Lenovo component-level board repair. On the job since 2007. ThinkPad X1 Carbon Gen 13 (2025), Yoga Pro 9i 2025, Legion 9i 2025 — cleaning, OLED screen swap, SSD/RAM upgrades, all in one place.')}
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <button onClick={() => setShowContact(true)} className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
              <a href="https://wa.me/6596146709?text=我的Lenovo电脑需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-600 transition-colors shadow-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">{t('Lenovo 维修服务', 'Lenovo Repair Services')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <a key={i} href={'/lenovo-repair/' + s.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-all block">
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
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">{t('常见问题', 'FAQ')}</h2>
          <div className="space-y-4">
            {[
              { q: t('ThinkPad换屏多少钱？', 'ThinkPad screen replacement cost?'), a: t('X1 Carbon系列¥300起，T系列¥250起，小新/拯救者¥200起。ThinkPad屏幕规格多具体加微信发型号查。', 'X1 Carbon from ¥300, T series from ¥250, Xiaoxin/Legion from ¥200. Many screen configs, DM for exact quote.') },
              { q: t('拯救者清灰换硅脂多少钱？', 'Legion cleaning + thermal paste cost?'), a: t('拯救者系列清灰换硅脂¥80起。建议每年清一次，游戏本积灰严重会影响性能和寿命。', 'Legion cleaning from ¥80. Gaming laptops should be cleaned yearly. Dust buildup kills performance and lifespan.') },
              { q: t('ThinkPad小红点不灵了能修吗？', 'ThinkPad TrackPoint not working?'), a: t('能修。小红点不灵通常是键盘模块问题，可以修复或更换键盘。ThinkPad键盘模块好换，¥100起。', 'Yes. TrackPoint issues are usually keyboard module related. Can repair or replace keyboard. ThinkPad keyboard modules are easy to swap. From ¥100.') },
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
      <section className="py-16 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('Lenovo 出问题了？找我', 'Lenovo issues? Contact me')}</h2>
          <p className="text-blue-200 mb-8">{t('免费检测，先报价后维修。', 'Free diagnosis, quote first.')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setShowContact(true)} className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors shadow-lg text-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
            <a href="https://wa.me/6596146709?text=我的Lenovo电脑需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-green-600 transition-colors shadow-lg text-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
          </div>
        </div>
      </section>
    </div>
  )
}
