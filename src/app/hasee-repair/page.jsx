'use client'
import { useSite } from '../../lib/SiteContext'
import { useState } from 'react'
import { ArrowLeft, Monitor, Battery, Cpu, ChevronDown } from 'lucide-react'
import Navbar from '../../components/Navbar'

export default function HaseeRepair() {
  const { lang, setShowContact } = useSite();
  const t = (zh, en) => lang === 'zh' ? zh : en

  const services = [
    { id: 'screen-replacement', icon: <Monitor size={28} />, title: t('屏幕更换', 'Screen Replacement'), desc: t('神舟战神/精盾 屏幕碎裂、漏液、花屏、黑屏。原装品质LCD/高刷屏。含安装调试，30分钟快修。', 'Hasee战神/Jingdun cracked screen, leaking, flickering, black screen. OEM quality LCD/high-refresh screen. 30-min quick fix.') },
    { id: 'battery-replacement', icon: <Battery size={28} />, title: t('电池更换', 'Battery Replacement'), desc: t('神舟电池鼓包、不耐用、不充电、续航断崖式下跌。原装规格电池。战神/精盾/优雅全系。', 'Hasee battery swelling, short life, not charging, sudden battery drain. OEM spec battery. 战神/Jingdun/优雅 all series.') },
    { id: 'keyboard-repair', icon: <Monitor size={28} />, title: t('键盘维修', 'Keyboard Repair'), desc: t('按键不灵、进水后粘连、个别键失灵、背光不亮。神舟笔记本键盘更换，含多彩RGB背光。', 'Sticky keys, water damage, individual key failure, backlight not working. Hasee laptop keyboard replacement, RGB backlit.') },
    { id: 'motherboard-repair', icon: <Cpu size={28} />, title: t('主板/芯片级维修', 'Motherboard Repair'), desc: t('不开机、死机、充电芯片故障、进液腐蚀。战神游戏本主板芯片级维修，比换主板便宜得多。', 'No power, crashes, charging IC fault, liquid damage. Component-level repair for 战神 gaming boards. Much cheaper than board swap.') },
    { id: 'cleaning', icon: <Cpu size={28} />, title: t('清灰换硅脂', 'Cleaning & Cooling'), desc: t('风扇异响、发热降频、游戏掉帧。战神游戏本深度拆机清灰+换导热硅脂，有效降温10-15°C。', 'Fan noise, overheating, game throttling. 战神 gaming laptop deep clean + thermal paste. Effective 10-15°C temp drop.') },
    { id: 'os-upgrade', icon: <Monitor size={28} />, title: t('系统/升级', 'OS & Upgrade'), desc: t('Windows重装、加装M.2/NVMe固态、内存升级。神舟笔记本性价比升级方案推荐。', 'Windows reinstall, M.2/NVMe SSD install, RAM upgrade. Best value upgrades for Hasee laptops.') },
    { id: 'other-issues', icon: '🔍', title: t('其他故障', 'Other Issues'), desc: t('免费检测，不修不收费。', 'Free check, no charge if no repair.') },
  ]

  const models = [
    t('战神 Z8 / Z7 / Z9 2025系列', '战神 Z8 / Z7 / Z9 2025 series'),
    t('战神 T8 / T7 / TX8 / TX9', '战神 T8 / T7 / TX8 / TX9'),
    t('精盾 U80 / U65 / U45', 'Jingdun U80 / U65 / U45'),
    t('优雅 X5 / X4 / X3 系列', '优雅 X5 / X4 / X3 series'),
    t('神舟 台式机 / 游戏主机', 'Hasee desktop / gaming PC'),
    t('Hasee 全系列笔记本', 'Hasee all series laptops'),
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-500 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 flex items-center gap-2 text-sm"><a href="/" className="text-white/60 hover:text-white transition-colors">{t("首页", "Home")}</a><span className="text-white/30">/</span><a href="/computer-repair" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-medium transition-colors"><ArrowLeft size={15} /> {t('电脑品牌', 'Computer Brands')}</a></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">{t('Hasee 神舟维修', 'Hasee Repair')}</h1>
            <p className="text-xl text-indigo-200 mb-4">{t('神舟战神/精盾 全系列专业维修 | 威海', 'Hasee 战神/Jingdun All Series | Weihai')}</p>
            <p className="text-indigo-100 leading-relaxed">
              {t('神舟战神游戏本性价比之王、精盾商务本、优雅轻薄本——屏幕碎了、电池鼓包了、游戏本降频掉帧了，拿来给我看看。神舟笔记本配件便宜，维修费更实惠。2007年至今奋斗在维修一线。战神2025系列清灰换硅脂、换高刷屏、升级固态内存，一站式搞定。', 'Hasee 战神 gaming — the king of value, Jingdun business, 优雅 ultrabooks — cracked screen, swollen battery, game frame drops, we fix it all. Hasee parts are affordable, so are our repairs. On the job since 2007. 战神 2025 cleaning, high-refresh screen swap, SSD/RAM upgrades, all in one place.')}
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <button onClick={() => setShowContact(true)} className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors shadow-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
              <a href="https://wa.me/6596146709?text=我的Hasee神舟电脑需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-600 transition-colors shadow-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">{t('神舟维修服务', 'Hasee Repair Services')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <a key={i} href={'/hasee-repair/' + s.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-all block">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 text-lg shrink-0">{s.icon}</div>
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
                  <span className="text-indigo-500">▸</span>
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
              { q: t('神舟战神清灰换硅脂多少钱？', 'Hasee 战神 cleaning cost?'), a: t('战神系列清灰换硅脂¥60起。神舟笔记本拆机相对简单，费用也便宜。建议每6-12个月清一次。', '战神 cleaning + thermal paste from ¥60. Hasee laptops are easier to disassemble, cheaper service. Recommended every 6-12 months.') },
              { q: t('神舟笔记本换屏贵吗？', 'Hasee laptop screen replacement cost?'), a: t('战神游戏本高刷屏¥200起，精盾/优雅¥150起。神舟屏幕配件便宜，整机性价比高维修费也实在。', '战神 gaming high-refresh screens from ¥200, Jingdun/优雅 from ¥150. Hasee screen parts are affordable.') },
              { q: t('神舟电脑能升级哪些硬件？', 'Hasee laptop upgrade options?'), a: t('大部分神舟游戏本有2个M.2插槽和2个内存槽，可以加固态和升级内存到64GB。性价比最高的升级方案。', 'Most Hasee gaming laptops have 2 M.2 slots and 2 RAM slots. Can add SSD and upgrade to 64GB. Best value upgrades.') },
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
      <section className="py-16 bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('需要Hasee维修？找我', 'Need Hasee Repair? Contact me')}</h2>
          <p className="text-indigo-200 mb-8">{t('免费检测，先报价后维修。', 'Free diagnosis, quote first.')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setShowContact(true)} className="bg-white text-indigo-600 font-semibold px-8 py-4 rounded-xl hover:bg-indigo-50 transition-colors shadow-lg text-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
            <a href="https://wa.me/6596146709?text=我的Hasee神舟电脑需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-green-600 transition-colors shadow-lg text-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
          </div>
        </div>
      </section>
    </div>
  )
}
