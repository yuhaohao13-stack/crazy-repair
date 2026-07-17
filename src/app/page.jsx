'use client'
import { useState, useMemo } from 'react'
import { Smartphone, Monitor, Tablet, Wrench, ShieldCheck, Clock, ChevronDown, Award, MapPin, MessageCircle, Search } from 'lucide-react'

function SearchCheck(props) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width={props.size||24} height={props.size||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="m9 11 2 2 4-4"/></svg>)
}

import Navbar from '../components/Navbar'
// Search moved to Navbar

import { useSite } from '../lib/SiteContext'

export default function Home() {
  const { lang, setShowContact } = useSite()
  const [expanded, setExpanded] = useState(null)

  const t = (zh, en) => lang === 'zh' ? zh : en

  const services = [
    {
      icon: <Smartphone size={36} />,
      id: 'phone',
      link: '/phone-repair',
      title: t('手机维修', 'Phone Repair'),
      summary: t('苹果/三星/华为/小米/OPPO/vivo/OnePlus/荣耀/Google Pixel 等全品牌', 'Apple/Samsung/Huawei/Xiaomi/OPPO/vivo/OnePlus/Honor/Google Pixel & more'),
      brands: t('覆盖 iPhone 17/16/15/14/13 全系，三星 S/Z/A 系列，华为 Mate/P 系列，小米 Redmi 全系，OPPO Find/Reno，vivo X/iQOO，OnePlus，荣耀 Magic/数字/X 系列，Google Pixel 全系列', 'iPhone 17/16/15/14/13 all series, Samsung S/Z/A series, Huawei Mate/P series, Xiaomi/Redmi all models, OPPO Find/Reno, vivo X/iQOO, OnePlus, Honor Magic/Number/X series, Google Pixel all series'),
      details: [
        { name: t('屏幕更换', 'Screen Replacement'), desc: t('内外屏总成更换，原装品质/国产高性价比可选。含专业密封胶恢复防水性。iPhone OLED/三星AMOLED/各种屏幕都做。', 'Full assembly replacement. OEM quality or affordable options. Includes waterproof sealant. iPhone OLED, Samsung AMOLED, all screen types handled.') },
        { name: t('电池更换', 'Battery Replacement'), desc: t('原装品质电池，容量达标不虚标。更换后自动检测健康度，告别续航焦虑。iPhone/安卓全系列电池现货。', 'Quality batteries with accurate capacity. Health check after replacement. iPhone & Android batteries in stock.') },
        { name: t('进水维修', 'Water Damage Repair'), desc: t('超声波清洗+主板烘干+腐蚀修复。进水越早送来修复率越高，切勿自行充电！iPhone/安卓进水处理经验丰富。', 'Ultrasonic cleaning + board drying + corrosion repair. Bring ASAP, do not charge! Extensive water damage experience on all brands.') },
        { name: t('主板维修', 'Motherboard Repair'), desc: t('CPU重焊、硬盘扩容、基带维修、不开机、重启循环等疑难故障。苹果/三星/华为主板的芯片级维修。', 'CPU reballing, storage upgrade, baseband repair, no power, boot loop. Component-level board repair for Apple/Samsung/Huawei.') },
        { name: t('面容/指纹修复', 'Face ID/Touch ID'), desc: t('面容ID点阵修复、指纹排线更换。更换屏幕后面容不能用也可修复。三星超声波指纹、vivo屏下指纹也修。', 'Face ID dot matrix repair, fingerprint flex replacement. Works after screen swap. Samsung ultrasonic & vivo in-display fingerprint too.') },
        { name: t('摄像头维修', 'Camera Repair'), desc: t('拍照模糊、闪退、黑屏、对焦失灵。iPhone/Samsung/华为等摄像头更换修复。单反镜头清灰也可。', 'Blurry photos, app crash, black screen, autofocus fail. Camera replacement for iPhone/Samsung/Huawei & more.') },
        { name: t('其他问题', 'Other Issues'), desc: t('充电口松动、听筒无声、摄像头模糊、感应器失灵、按键不灵、信号差、WiFi连不上、刷机解锁、改双卡……任何问题拿来免费检测。', 'Charging port loose, earpiece silent, blurry camera, sensor fail, button stuck, weak signal, WiFi issue, unlock, dual SIM mod — free check for any issue.') },
      ]
    },
    {
      icon: <Monitor size={36} />,
      id: 'pc',
      link: '/computer-repair',
      title: t('电脑维修', 'Computer Repair'),
      summary: t('台式机、笔记本、MacBook、iMac 各类故障', 'Desktop, laptop, MacBook & iMac repair'),
      brands: t('联想/Lenovo/Dell/HP/华硕/ASUS/Apple MacBook(Pro/Air)/iMac/华为 MateBook 全系列 + Surface/小米笔记本', 'Lenovo/Dell/HP/ASUS/Apple MacBook (Pro/Air)/iMac/Huawei MateBook all series + Surface/Xiaomi laptops'),
      details: [
        { name: t('MacBook 维修', 'MacBook Repair'), desc: t('MacBook Pro/Air 全型号（A1278/A1466/A1706/A1989/A2141/A2337等）。屏幕、键盘、电池、进水、键盘粘滞、不充电通病。', 'MacBook Pro/Air all models (A1278/A1466/A1706/A1989/A2141/A2337 etc). Screen, keyboard, battery, water damage, sticky keys, no charging.') },
        { name: t('系统安装', 'OS Installation'), desc: t('Windows/Mac 系统重装、双系统安装、系统崩溃恢复、驱动安装、换固态硬盘后系统迁移。', 'Windows/Mac reinstall, dual boot, crash recovery, driver setup, SSD migration.') },
        { name: t('硬件升级', 'Hardware Upgrade'), desc: t('加装固态硬盘提速、内存升级、CPU/显卡更换，免费优化调试。MacBook 扩容升级也做。', 'SSD upgrade, RAM upgrade, CPU/GPU swap, free optimization. MacBook storage upgrades too.') },
        { name: t('清灰换硅脂', 'Cleaning & Paste'), desc: t('深度拆机清灰、更换导热硅脂，有效降低温度10-20°C，告别风扇狂转。笔记本台式机都做。', 'Deep clean, thermal paste replacement, lowers temp 10-20°C. Laptop & desktop.') },
        { name: t('蓝屏/死机检修', 'Blue Screen Fix'), desc: t('蓝屏代码分析、内存/硬盘检测、系统修复、病毒查杀。微软 Surface 系列疑难故障也做。', 'BSOD analysis, RAM/HDD test, system repair, virus removal. Microsoft Surface issues too.') },
        { name: t('数据恢复', 'Data Recovery'), desc: t('硬盘损坏、误删文件、格式化恢复、U盘/SD卡/固态硬盘数据找回。', 'HDD failure, deleted files, formatted drive, USB/SD card/SSD recovery.') },
        { name: t('其他问题', 'Other Issues'), desc: t('键盘失灵、屏幕碎裂、电池不充电、WiFi搜不到、风扇异响、进液腐蚀、苹果笔记本键盘/屏幕通病……免费检测。', 'Keyboard fail, broken screen, battery not charging, no WiFi, fan noise, liquid spill, MacBook issues — free check.') },
      ]
    },
    {
      icon: <Tablet size={36} />,
      id: 'tablet',
      link: '/tablet-repair',
      title: t('平板维修', 'Tablet Repair'),
      summary: t('iPad/安卓平板/电子书全系列', 'iPad/Android tablet/e-reader all series'),
      brands: t('iPad Pro/Air/Mini 全代 + 三星Tab/华为MatePad/小米Pad/荣耀平板 + Kindle电子书', 'iPad Pro/Air/Mini all gens + Samsung Tab/Huawei MatePad/Xiaomi Pad/Honor Pad + Kindle e-reader'),
      details: [
        { name: t('iPad 屏幕更换', 'iPad Screen Repair'), desc: t('iPad Pro 12.9/11寸、iPad Air、iPad Mini、iPad 数字系列。内外屏更换，支持原彩显示。碎裂/漏液/触摸不灵。', 'iPad Pro 12.9/11", iPad Air, iPad Mini, iPad digital series. Screen repair with True Tone support. Cracked/leaking/unresponsive.') },
        { name: t('平板电池更换', 'Tablet Battery'), desc: t('iPad/安卓平板电池不耐用、鼓包、充不进电。原装规格电池，更换后续航恢复。iPad拆机换电池需要专业工具和手艺。', 'iPad/Android tablet battery swelling, not charging, short life. OEM spec replacements. iPad battery swap requires skill & proper tools.') },
        { name: t('充电口维修', 'Charging Port Fix'), desc: t('平板充电口松动、接触不良、尾插小板/排线更换。', 'Tablet loose port, bad contact, charging flex replacement.') },
        { name: t('平板进水/主板维修', 'Water/Motherboard'), desc: t('iPad/平板进水清洗、主板芯片级维修、不充电、不开机、重启。', 'iPad/tablet water damage cleaning, component-level board repair, no power, boot loop.') },
        { name: t('电子书维修', 'E-reader Repair'), desc: t('Kindle/Kobo等电子书屏幕碎裂、电池不耐用、系统卡死。墨水屏更换。', 'Kindle/Kobo e-reader cracked screen, battery issues, system freeze. E-ink screen replacement.') },
        { name: t('其他问题', 'Other Issues'), desc: t('Home键不灵、摄像头故障、麦克风无声、扬声器杂音、蓝牙/WiFi打不开、外壳变形……免费检测。', 'Home button, camera fail, no mic, speaker noise, Bluetooth/WiFi won\'t turn on, bent frame — free check.') },
      ]
    },
    {
      icon: <Wrench size={36} />,
      id: 'other',
      link: '/other-repair',
      title: t('其他数码维修', 'Other Device Repair'),
      summary: t('游戏机/手表/耳机/相机/智能家居等', 'Console/Watch/Earphone/Camera/Smart Home'),
      brands: t('Switch/PS5/Apple Watch(Ultra/S8-1)/Samsung Watch/AirPods/相机/Kindle', 'Switch/PS5/Apple Watch(Ultra/S8-1)/Samsung Watch/AirPods/Camera/Kindle'),
      details: [
        { name: t('Apple Watch 维修', 'Apple Watch Repair'), desc: t('Apple Watch Ultra/S8/S7/SE/S6 全系列。屏幕碎裂换玻璃/OLED、电池不耐用、进水故障、表带更换。', 'Apple Watch Ultra/S8/S7/SE/S6 all series. Screen glass/OLED replacement, battery service, water damage, strap swap.') },
        { name: t('游戏机维修', 'Console Repair'), desc: t('Switch/PS4/PS5/Xbox — 手柄漂移、屏幕碎裂、不充电、不开机、散热改造。', 'Switch/PS4/PS5/Xbox — joystick drift, screen repair, no power, cooling mod.') },
        { name: t('智能手表维修', 'Smartwatch Repair'), desc: t('Samsung Watch/Galaxy Watch — 屏幕碎裂、电池不耐用、表带更换、进水故障。', 'Samsung Watch/Galaxy Watch — cracked screen, battery service, band swap, water damage.') },
        { name: t('耳机维修', 'Earphone Repair'), desc: t('AirPods全系/各类TWS耳机 — 电池不耐用、一只不响、充电仓故障、麦克风不灵。', 'AirPods/TWS earphones — battery drain, one side silent, case not charging, mic issue.') },
        { name: t('相机维修', 'Camera Repair'), desc: t('数码相机/单反 — 镜头故障、CCD/CMOS清洁、快门维修、存储卡数据恢复。', 'Digital camera/DSLR — lens fault, sensor cleaning, shutter repair, SD recovery.') },
        { name: t('改装配件', 'Custom Mods'), desc: t('手机改双卡、扩容、换色外壳、游戏机改装、散热改造。想做啥尽管说来聊。', 'Dual SIM mod, storage upgrade, shell swap, console mod, cooling upgrade. DM us your idea!') },
        { name: t('其他问题', 'Other Issues'), desc: t('电子词典、学习机、电子书、GPS导航仪、监控设备、路由器设置……任何数码产品问题都可以带来看看。', 'E-dictionary, learning pad, e-reader, GPS, monitor, router setup — any digital device, bring it in for a free check.') },
      ]
    }
  ]


  const yearsActive = new Date().getFullYear() - 2007
  const features = [
    { icon: <SearchCheck size={28} />, title: t('免费检测', 'Free Diagnosis'), desc: t('不修不收费，先检测后报价', 'No charge if you decline') },
    { icon: <ShieldCheck size={28} />, title: t('30天质保', '30-Day Warranty'), desc: t('所有维修享30天质保', 'Warranty on all repairs') },
    { icon: <Clock size={28} />, title: t('快速维修', 'Quick Service'), desc: t('大部分30分钟-2小时取机', 'Most done in 30min-2hrs') },
    { icon: <Award size={28} />, title: t(`${yearsActive}年维修生涯`, `${yearsActive} Years Experience`), desc: t('2007年至今奋斗在维修一线', 'On the repair frontline since 2007') },
  ]


  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ===== Hero ===== */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="grid sm:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <h1 className="text-3xl sm:text-5xl font-bold leading-tight">{t('Crazy维修', 'Crazy Repair')}</h1>
              <p className="text-xl sm:text-2xl font-semibold text-blue-200">{t('威海专业手机电脑维修', 'Weihai Pro Phone & PC Repair')}</p>
              <p className="text-blue-200/70 text-sm sm:text-base font-medium">{t('累计服务超过10万+位客户', '100000+ Satisfied Customers')}</p>
              <p className="text-blue-100 leading-relaxed text-sm sm:text-base max-w-lg">
                {t('Crazy维修专注手机、电脑、平板等第三方维修服务，位于威海环翠区西门31号。2007年至今奋斗在维修一线，免费检测，先报价后维修，30天质保。手机碎屏、电池更换、电脑维修、数据恢复，价格透明，诚信经营。', 'Crazy Repair specializes in third-party phone, computer and tablet repair services. Located at West Gate #31, Huancui District, Weihai. On the repair frontline since 2007. Free diagnosis, quote first, 30-day warranty. Screen repair, battery replacement, computer repair, data recovery — transparent pricing, honest service.')}
              </p>
              <div className="flex flex-wrap gap-3 pt-4">
                <button onClick={() => setShowContact(true)}
                  className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
                >{t('📱 立即咨询', '📱 Contact Now')}</button>
                <a href="#brands"
                  className="border border-white/40 text-white font-medium px-6 py-3 rounded-xl hover:bg-white/10 transition-colors"
                >{t('选择品牌 →', 'Choose Brand →')}</a>
              </div>
              <div className="flex items-center gap-4 text-sm text-blue-200 pt-2">
                <span className="flex items-center gap-1"><MapPin size={14} />{t('环翠区西门31号', 'Huancui Dist, West Gate #31')}</span>
                <span className="flex items-center gap-1"><MessageCircle size={14} />WeChat: crazy-repair</span>
              </div>
            </div>
            <div className="hidden sm:flex justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 text-center">
                <div className="text-7xl mb-4">🔧</div>
                <p className="text-xl font-semibold">{t('专业维修', 'Pro Repair')}</p>
                <p className="text-blue-200 text-sm mt-1">{t('手机 · 电脑 · 平板 · 数码', 'Phone · PC · Tablet · Gadgets')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="brands" className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h3 className="text-sm font-semibold text-gray-500 mb-8 text-center uppercase tracking-wider">{t('支持品牌（部分）', 'Brands We Support (partial)')}</h3>
          
          {/* 手机品牌 */}
          <div className="mb-8">
            <h4 className="text-xs font-bold text-gray-400 mb-4 text-center uppercase tracking-widest">{t('📱 手机品牌', '📱 Phone Brands')}</h4>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
              {[
                {n:'Apple', cn:'苹果', l:'/iphone-repair'},
                {n:'Samsung', cn:'三星', l:'/samsung-repair'},
                {n:'Huawei', cn:'华为', l:'/huawei-repair'},
                {n:'Xiaomi', cn:'小米', l:'/xiaomi-repair'},
                {n:'OPPO', cn:'OPPO', l:'/oppo-repair'},
                {n:'vivo', cn:'vivo', l:'/vivo-repair'},
                {n:'OnePlus', cn:'一加', l:'/oneplus-repair'},
                {n:'Honor', cn:'荣耀', l:'/honor-repair'},
                {n:'Google', cn:'谷歌', l:'/google-repair'},
                {n:'Realme', cn:'真我', l:'/realme-repair'},
              ].map((b, i) => (
                <a key={i} href={b.l} className="text-center px-3 py-2 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 hover:-translate-y-0.5 transition-all">
                  <div className="text-sm sm:text-base font-bold text-gray-800">{b.n}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{b.cn}</div>
                </a>
              ))}
            </div>
          </div>

          {/* 电脑品牌 */}
          <div className="mb-8">
            <h4 className="text-xs font-bold text-gray-400 mb-4 text-center uppercase tracking-widest">{t('💻 电脑品牌', '💻 Computer Brands')}</h4>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
              {[
                {n:'Apple Mac', cn:'苹果', l:'/macbook-repair'},
                {n:'Lenovo', cn:'联想', l:'/lenovo-repair'},
                {n:'Dell', cn:'戴尔', l:'/dell-repair'},
                {n:'HP', cn:'惠普', l:'/hp-repair'},
                {n:'ASUS', cn:'华硕', l:'/asus-repair'},
                {n:'Acer', cn:'宏基', l:'/acer-repair'},
                {n:'MSI', cn:'微星', l:'/msi-repair'},
                {n:'Surface', cn:'微软', l:'/surface-repair'},
                {n:'Huawei', cn:'华为', l:'/huawei-repair'},
              ].map((b, i) => (
                <a key={i} href={b.l} className="text-center px-3 py-2 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 hover:-translate-y-0.5 transition-all">
                  <div className="text-sm sm:text-base font-bold text-gray-800">{b.n}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{b.cn}</div>
                </a>
              ))}
            </div>
          </div>

          {/* 其他品牌 */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 mb-4 text-center uppercase tracking-widest">{t('🎮 其他', '🎮 Other')}</h4>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
              {[
                {n:'Nintendo', cn:'任天堂', l:'/nintendo-repair'},
                {n:'Sony', cn:'索尼', l:'/sony-repair'},
                {n:'Amazon Kindle', cn:'亚马逊', l:'/kindle-repair'},
              ].map((b, i) => (
                <a key={i} href={b.l} className="text-center px-3 py-2 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 hover:-translate-y-0.5 transition-all">
                  <div className="text-sm sm:text-base font-bold text-gray-800">{b.n}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{b.cn}</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 服务项目（可展开） ===== */}
      <section id="services" className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('服务项目', 'Our Services')}</h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              {t('全面的数码设备维修服务，先免费检测，给出方案和报价后再决定修不修。', 'Full range of device repairs. Free diagnosis, transparent pricing, no hidden fees.')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {services.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md group">
                {/* 卡片头 */}
                <a href={s.link} className="p-5 sm:p-6 block hover:bg-gray-50 transition-colors">
                  <div className="text-blue-600 mb-3">{s.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{s.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{s.summary}</p>
                  <p className="text-xs text-gray-400 mb-3">{s.brands}</p>
                  <span className="inline-flex items-center gap-1 text-blue-600 text-xs font-medium">{t('查看服务详情 →', 'View Details →')} <ChevronDown size={14} className="-rotate-90" /></span>
                </a>
                {/* 展开详情 */}
                {expanded === s.id && (
                  <div className="border-t border-gray-100 px-5 sm:px-6 py-4 bg-gray-50/50 space-y-3">
                    {s.details.map((d, j) => (
                      <div key={j} className={`pb-3 ${j < s.details.length - 1 ? 'border-b border-gray-100' : ''}`}>
                        <div className="mb-1">
                          <h4 className={`font-medium text-sm ${d.name === t('其他问题', 'Other Issues') ? 'text-blue-600' : 'text-gray-900'}`}>{d.name}</h4>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">{d.desc}</p>
                      </div>
                    ))}
                    <button onClick={() => setShowContact(true)}
                      className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
                    >{t('💬 咨询此服务', '💬 Inquire')}</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 型号支持 ===== */}
      <section className="py-12 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{t('部分型号一览', 'Supported Models (Partial)')}</h2>
          <p className="text-gray-500 mb-8 max-w-2xl mx-auto">{t('以下仅为部分常见型号，更多机型欢迎微信咨询。没列出来不代表不能修。', 'Listed below are just common models. Not listed doesn\'t mean we can\'t fix it — just ask!')}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {/* iPhone */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-blue-600 mb-3 text-sm uppercase tracking-wider">{t('📱 iPhone 全系列', '📱 iPhone Series')}</h3>
              <ul className="space-y-1.5 text-sm text-gray-600">
                {[t('iPhone 17 Pro Max / Pro / 17 / 17 Air / 16e', 'iPhone 17 Pro Max / Pro / 17 / 17 Air / 16e'),
                  t('iPhone 16 Pro Max / Pro / Plus / 16', 'iPhone 16 Pro Max / Pro / Plus / 16'),
                  t('iPhone 15 Pro Max / Pro / Plus / 15', 'iPhone 15 Pro Max / Pro / Plus / 15'),
                  t('iPhone 14 Pro Max / Pro / Plus / 14', 'iPhone 14 Pro Max / Pro / Plus / 14'),
                  t('iPhone 13 Pro Max / Pro / 13 / 13 Mini', 'iPhone 13 Pro Max / Pro / 13 / 13 Mini'),
                  t('iPhone 12 Pro Max / Pro / 12 / 12 Mini', 'iPhone 12 Pro Max / Pro / 12 / 12 Mini'),
                  t('iPhone 11 Pro Max / Pro / 11 / SE (2/3)', 'iPhone 11 Pro Max / Pro / 11 / SE (2/3)'),
                  t('iPhone XS Max / XS / XR / X', 'iPhone XS Max / XS / XR / X'),
                  t('iPhone 8 Plus / 8 / 7 Plus / 7 / 6s / 6', 'iPhone 8 Plus / 8 / 7 Plus / 7 / 6s / 6')].map((m, i) => <li key={i} className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">▸</span><a href="/iphone-repair" className="hover:text-blue-600 transition-colors">{m}</a></li>)}
              </ul>
            </div>
            {/* iPad */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-blue-600 mb-3 text-sm uppercase tracking-wider">{t('📟 iPad 全系列', '📟 iPad Series')}</h3>
              <ul className="space-y-1.5 text-sm text-gray-600">
                <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">▸</span><a href="/iphone-repair" className="hover:text-blue-600 transition-colors">{t('iPad Pro 12.9 (1-7代) / Pro 11 (1-5代)', 'iPad Pro 12.9 (1st-7th) / Pro 11 (1st-5th)')}</a></li>
                <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">▸</span><a href="/iphone-repair" className="hover:text-blue-600 transition-colors">{t('iPad 数字系列 (5-11代)', 'iPad digital (5th-11th)')}</a></li>
                <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">▸</span><a href="/iphone-repair" className="hover:text-blue-600 transition-colors">{t('iPad Air / iPad Mini 全系', 'iPad Air / iPad Mini all')}</a></li>
                <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">▸</span><a href="/samsung-repair" className="hover:text-blue-600 transition-colors">{t('三星 Galaxy Tab 全系', 'Samsung Galaxy Tab')}</a></li>
                <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">▸</span><a href="/huawei-repair" className="hover:text-blue-600 transition-colors">{t('华为 MatePad', 'Huawei MatePad')}</a></li>
                <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">▸</span><a href="/xiaomi-repair" className="hover:text-blue-600 transition-colors">{t('小米 Pad', 'Xiaomi Pad')}</a></li>
                <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">▸</span><a href="/other-repair" className="hover:text-blue-600 transition-colors">{t('Amazon Kindle / Kobo 电子书', 'Amazon Kindle / Kobo')}</a></li>
              </ul>
            </div>
            {/* Watch */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-blue-600 mb-3 text-sm uppercase tracking-wider">{t('⌚ Apple Watch 系列', '⌚ Apple Watch Series')}</h3>
              <ul className="space-y-1.5 text-sm text-gray-600">
                <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">▸</span><a href="/other-repair/watch" className="hover:text-blue-600 transition-colors">{t('Apple Watch Ultra 2 / Ultra (49mm)', 'Apple Watch Ultra 2 / Ultra (49mm)')}</a></li>
                <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">▸</span><a href="/other-repair/watch" className="hover:text-blue-600 transition-colors">{t('Apple Watch Series 9/8/7', 'Apple Watch Series 9/8/7')}</a></li>
                <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">▸</span><a href="/other-repair/watch" className="hover:text-blue-600 transition-colors">{t('Apple Watch SE/6/5/4', 'Apple Watch SE/6/5/4')}</a></li>
                <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">▸</span><a href="/other-repair/watch" className="hover:text-blue-600 transition-colors">{t('Apple Watch Series 3/2/1', 'Apple Watch Series 3/2/1')}</a></li>
                <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">▸</span><a href="/other-repair/samsung-watch" className="hover:text-blue-600 transition-colors">{t('Samsung Galaxy Watch 全系', 'Samsung Galaxy Watch')}</a></li>
              </ul>
            </div>
            {/* Mac */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-blue-600 mb-3 text-sm uppercase tracking-wider">{t('💻 Mac / PC 系列', '💻 Mac / PC Series')}</h3>
              <ul className="space-y-1.5 text-sm text-gray-600">
                <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">▸</span><a href="/macbook-repair" className="hover:text-blue-600 transition-colors">{t('MacBook Pro 13/14/16 (全代)', 'MacBook Pro 13/14/16 (all gens)')}</a></li>
                <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">▸</span><a href="/macbook-repair" className="hover:text-blue-600 transition-colors">{t('MacBook Air 全代', 'MacBook Air all gens')}</a></li>
                <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">▸</span><a href="/macbook-repair" className="hover:text-blue-600 transition-colors">{t('iMac / Mac Mini / Mac Pro', 'iMac / Mac Mini / Mac Pro')}</a></li>
                <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">▸</span><a href="/lenovo-repair" className="hover:text-blue-600 transition-colors">{t('联想/Lenovo ThinkPad 全系', 'Lenovo ThinkPad all series')}</a></li>
                <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">▸</span><a href="/dell-repair" className="hover:text-blue-600 transition-colors">{t('Dell XPS / Inspiron / Latitude', 'Dell XPS / Inspiron / Latitude')}</a></li>
                <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">▸</span><a href="/hp-repair" className="hover:text-blue-600 transition-colors">{t('HP Spectre / Pavilion / EliteBook', 'HP Spectre / Pavilion / EliteBook')}</a></li>
                <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">▸</span><a href="/asus-repair" className="hover:text-blue-600 transition-colors">{t('华硕 ASUS 全系', 'ASUS all series')}</a></li>
                <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">▸</span><a href="/surface-repair" className="hover:text-blue-600 transition-colors">{t('微软 Surface 全系', 'Microsoft Surface all series')}</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>


      {/* ===== 特色 ===== */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 sm:p-6 text-center shadow-sm border border-gray-100 transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="text-blue-600 mx-auto mb-3 flex justify-center">{f.icon}</div>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{f.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 关于我们 ===== */}
      <section id="about" className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">{t('关于 Crazy维修', 'About Crazy Repair')}</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
                <p>{t('Crazy维修（Crazy-repair）成立于威海环翠区，是一家专注于手机、电脑、平板及各类数码产品维修的专业工作室。2007年至今奋斗在维修一线，累计服务超过10万+位客户。', 'Crazy Repair is a professional repair studio in Huancui, Weihai. On the repair frontline since 2007 with 100000+ satisfied customers.')}</p>
                <p>{t('我们修的设备覆盖你能想到的大部分品牌——Apple、Samsung、华为、小米、OPPO、vivo、OnePlus、荣耀、Google Pixel、Realme……不管是iPhone屏幕碎了、三星电池不耐用了、华为MatePad摔了、还是MacBook进水了，拿来给我看看。', 'We repair most brands you can think of — Apple, Samsung, Huawei, Xiaomi, OPPO, vivo, OnePlus, Honor, Google Pixel, Realme… Cracked iPhone screen, dying Samsung battery, dropped Huawei MatePad, water-damaged MacBook — bring it in.')}</p>
                <p>{t('我们的理念：先查问题，告诉客户真实情况，给出合理报价，修不修客户决定。绝不诱导消费，绝不隐瞒问题。不做那种"小病大修"的套路。', 'Our philosophy: diagnose first, be honest, give a fair quote. No pressure, no hidden issues. No "upsell" tricks.')}</p>
                <p>{t('所有维修当面完成（特殊主板问题除外），修之前跟你说清楚问题在哪、怎么修、多少钱，你觉得合适再修。修完之后当面测试，确保功能正常再拿走。简单直接，不整虚的。', 'All repairs done on-site (except complex board work). I\'ll explain the issue, the fix, and the cost before starting. You approve first. After repair, we test everything together before you leave. Simple and transparent.')}</p>
                <div className="flex items-center gap-4 pt-4 text-sm">
                  <div className="bg-blue-50 rounded-xl px-4 py-3 text-center">
                    <div className="text-xs font-bold text-blue-600">{t('2007年至今', 'Since 2007')}</div>
                    <div className="text-xs text-gray-500">{t('维修生涯', 'On the job')}</div>
                  </div>
                  <div className="bg-blue-50 rounded-xl px-4 py-3 text-center">
                    <div className="text-2xl font-bold text-blue-600">10万+</div>
                    <div className="text-xs text-gray-500">{t('服务客户', 'Clients')}</div>
                  </div>
                  <div className="bg-blue-50 rounded-xl px-4 py-3 text-center">
                    <div className="text-2xl font-bold text-blue-600">98%</div>
                    <div className="text-xs text-gray-500">{t('好评率', 'Satisfaction')}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">{t('联系方式', 'Contact Info')}</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3"><MapPin size={20} className="text-blue-600 shrink-0 mt-0.5" /><div><p className="font-medium text-gray-900">{t('地址', 'Address')}</p><p className="text-sm text-gray-500">{t('威海市环翠区西门31号', 'No.31 West Gate, Huancui, Weihai')}</p></div></div>
                <div className="flex items-start gap-3"><MessageCircle size={20} className="text-green-500 shrink-0 mt-0.5" /><div><p className="font-medium text-gray-900">{t('微信', 'WeChat')}</p><p className="text-sm text-gray-500">crazy-repair</p></div></div>
                <div className="flex items-start gap-3"><Clock size={20} className="text-gray-400 shrink-0 mt-0.5" /><div><p className="font-medium text-gray-900">{t('营业时间', 'Hours')}</p><p className="text-sm text-gray-500">{t('周一至周日 8:00-19:00', 'Mon-Sun 8:00-19:00')}</p></div></div>
              </div>
              <button onClick={() => setShowContact(true)} className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors">{t('💬 联系我咨询', '💬 Contact for Help')}</button>
            </div>
          </div>
        </div>
      </section>



          </div>
  )
}

