'use client'
import { useState } from 'react'
import { Smartphone, Monitor, Tablet, Wrench, ShieldCheck, Clock, MessageCircle, Phone, MapPin, ChevronRight, ChevronDown, Star, Users, Award } from 'lucide-react'

export default function Home() {
  const [showContact, setShowContact] = useState(false)
  const [expanded, setExpanded] = useState(null)
  const [lang, setLang] = useState('zh')

  const t = (zh, en) => lang === 'zh' ? zh : en

  const services = [
    {
      icon: <Smartphone size={36} />,
      id: 'phone',
      title: t('手机维修', 'Phone Repair'),
      summary: t('屏幕碎裂、电池亏电、主板故障、进水短路、面容/指纹失灵', 'Screen crack, battery dead, motherboard fault, water damage, Face ID/Touch ID'),
      brands: t('苹果/三星/华为/小米/OPPO/vivo 全系列', 'Apple/Samsung/Huawei/Xiaomi/OPPO/vivo all models'),
      details: [
        { name: t('屏幕更换', 'Screen Replacement'), price: t('100元起', 'from $15'), desc: t('内外屏总成更换，原装品质/国产高性价比可选。含专业密封胶恢复防水性。', 'Full assembly replacement. OEM quality or affordable options. Includes waterproof sealant.') },
        { name: t('电池更换', 'Battery Replacement'), price: t('80元起', 'from $10'), desc: t('原装品质电池，容量达标不虚标。更换后自动检测健康度，告别续航焦虑。', 'Quality batteries with accurate capacity. Health check after replacement.') },
        { name: t('进水维修', 'Water Damage Repair'), price: t('视情况定价', 'Depends'), desc: t('超声波清洗+主板烘干+腐蚀修复。进水越早送来修复率越高，切勿自行充电！', 'Ultrasonic cleaning + board drying + corrosion repair. Bring ASAP, do not charge!') },
        { name: t('主板维修', 'Motherboard Repair'), price: t('150元起', 'from $20'), desc: t('CPU重焊、硬盘扩容、基带维修、不开机、重启循环等疑难故障。', 'CPU reballing, storage upgrade, baseband repair, no power, boot loop.') },
        { name: t('面容/指纹修复', 'Face ID/Touch ID'), price: t('120元起', 'from $16'), desc: t('面容ID点阵修复、指纹排线更换。更换屏幕后面容不能用也可修复。', 'Dot matrix repair, fingerprint flex replacement. Works after screen swap.') },
        { name: t('其他问题', 'Other Issues'), price: t('免费检测', 'Free Check'), desc: t('充电口松动、听筒无声、摄像头模糊、感应器失灵、按键不灵、信号差、WiFi连不上、刷机解锁、改双卡……任何问题拿来免费检测。', 'Charging port loose, earpiece silent, blurry camera, sensor fail, button stuck, weak signal, WiFi issue, unlock, dual SIM mod — free check for any issue.') },
      ]
    },
    {
      icon: <Monitor size={36} />,
      id: 'pc',
      title: t('电脑维修', 'Computer Repair'),
      summary: t('台式机、笔记本、MacBook 各类故障', 'Desktop, laptop & MacBook repair'),
      brands: t('联想/Dell/HP/华硕/Apple/华为 全系列', 'Lenovo/Dell/HP/ASUS/Apple/Huawei all series'),
      details: [
        { name: t('系统安装', 'OS Installation'), price: t('50元起', 'from $7'), desc: t('Windows/Mac 系统重装、双系统安装、系统崩溃恢复、驱动安装。', 'Windows/Mac reinstall, dual boot, crash recovery, driver setup.') },
        { name: t('硬件升级', 'Hardware Upgrade'), price: t('30元起（不含配件）', 'from $4'), desc: t('加装固态硬盘提速、内存升级、CPU/显卡更换，免费优化调试。', 'SSD upgrade, RAM upgrade, CPU/GPU swap, free optimization.') },
        { name: t('清灰换硅脂', 'Cleaning & Paste'), price: t('80元起', 'from $10'), desc: t('深度拆机清灰、更换导热硅脂，有效降低温度10-20°C，告别风扇狂转。', 'Deep clean, thermal paste replacement, lowers temp 10-20°C.') },
        { name: t('蓝屏/死机检修', 'Blue Screen Fix'), price: t('60元起', 'from $8'), desc: t('蓝屏代码分析、内存/硬盘检测、系统修复、病毒查杀。', 'BSOD analysis, RAM/HDD test, system repair, virus removal.') },
        { name: t('数据恢复', 'Data Recovery'), price: t('100元起', 'from $15'), desc: t('硬盘损坏、误删文件、格式化恢复、U盘/SD卡数据找回。', 'HDD failure, deleted files, formatted drive, USB/SD card recovery.') },
        { name: t('其他问题', 'Other Issues'), price: t('免费检测', 'Free Check'), desc: t('键盘失灵、屏幕碎裂、电池不充电、WiFi搜不到、风扇异响、进液腐蚀、苹果笔记本键盘/屏幕通病……免费检测。', 'Keyboard fail, broken screen, battery not charging, no WiFi, fan noise, liquid spill, MacBook keyboard/screen issues — free check.') },
      ]
    },
    {
      icon: <Tablet size={36} />,
      id: 'tablet',
      title: t('平板维修', 'Tablet Repair'),
      summary: t('iPad/安卓平板全系列', 'iPad & Android tablet all series'),
      brands: t('苹果iPad/三星Tab/华为MatePad/小米Pad', 'iPad/Samsung Tab/Huawei MatePad/Xiaomi Pad'),
      details: [
        { name: t('屏幕更换', 'Screen Replacement'), price: t('150元起', 'from $20'), desc: t('iPad/平板内外屏更换，支持原彩显示。碎裂、漏液、触摸不灵统统解决。', 'iPad/tablet screen replacement, True Tone support. Cracked, leaking, unresponsive fixed.') },
        { name: t('电池更换', 'Battery Service'), price: t('120元起', 'from $16'), desc: t('平板电池不耐用、鼓包、充不进电。原装规格电池，更换后恢复续航。', 'Tablet battery swelling, not charging, short battery life. OEM spec replacements.') },
        { name: t('充电口维修', 'Charging Port Fix'), price: t('80元起', 'from $10'), desc: t('充电口松动、接触不良、只能一个方向充电、尾插小板更换。', 'Loose port, bad contact, one-way charging, flex replacement.') },
        { name: t('背光/显示故障', 'Display Issues'), price: t('100元起', 'from $15'), desc: t('屏幕暗/闪烁、有线条、花屏、触摸失灵但外屏完好。', 'Dim screen, flickering, lines, distorted display, unresponsive touch.') },
        { name: t('系统刷机', 'System Flash'), price: t('60元起', 'from $8'), desc: t('平板卡LOGO、忘记密码、系统崩溃、升级变砖，救砖刷机。', 'Tablet stuck on logo, forgot password, system crash, bricked.') },
        { name: t('其他问题', 'Other Issues'), price: t('免费检测', 'Free Check'), desc: t('Home键不灵、摄像头故障、麦克风无声、扬声器杂音、蓝牙/WiFi打不开、外壳变形……免费检测。', 'Home button, camera fail, no mic, speaker noise, Bluetooth/WiFi won\'t turn on, bent frame — free check.') },
      ]
    },
    {
      icon: <Wrench size={36} />,
      id: 'other',
      title: t('其他数码维修', 'Other Device Repair'),
      summary: t('游戏机/手表/耳机/相机等', 'Console/Watch/Earphone/Camera etc.'),
      brands: t('Switch/PS5/Apple Watch/AirPods/相机', 'Switch/PS5/Apple Watch/AirPods/Camera'),
      details: [
        { name: t('游戏机维修', 'Console Repair'), price: t('100元起', 'from $15'), desc: t('Switch/PS4/PS5/Xbox — 手柄漂移、屏幕碎裂、不充电、不开机、散热改造。', 'Switch/PS4/PS5/Xbox — joystick drift, screen repair, no power, cooling mod.') },
        { name: t('智能手表维修', 'Smartwatch Repair'), price: t('80元起', 'from $10'), desc: t('Apple Watch/Samsung Watch — 屏幕碎裂、电池不耐用、表带更换、进水故障。', 'Apple Watch/Samsung Watch — cracked screen, battery service, band swap, water damage.') },
        { name: t('耳机维修', 'Earphone Repair'), price: t('60元起', 'from $8'), desc: t('AirPods/耳机 — 电池不耐用、一只不响、充电仓故障、麦克风不灵。', 'AirPods/earphones — battery drain, one side silent, case not charging, mic issue.') },
        { name: t('相机维修', 'Camera Repair'), price: t('150元起', 'from $20'), desc: t('数码相机/单反 — 镜头故障、CCD/CMOS清洁、快门维修、存储卡数据恢复。', 'Digital camera/DSLR — lens fault, sensor cleaning, shutter repair, SD recovery.') },
        { name: t('改装配件', 'Custom Mods'), price: t('按项目报价', 'Quote based'), desc: t('手机改双卡、扩容、换色外壳、游戏机改装、散热改造。', 'Dual SIM mod, storage upgrade, shell swap, console mod, cooling upgrade.') },
        { name: t('其他问题', 'Other Issues'), price: t('免费检测', 'Free Check'), desc: t('电子词典、学习机、电子书、GPS导航仪、监控设备、路由器设置……任何数码产品问题都可以带来看看。', 'E-dictionary, learning pad, e-reader, GPS, monitor, router setup — any digital device, bring it in for a free check.') },
      ]
    }
  ]

  const features = [
    { icon: <SearchCheck size={28} />, title: t('免费检测', 'Free Diagnosis'), desc: t('不修不收费，先检测后报价', 'No charge if you decline') },
    { icon: <ShieldCheck size={28} />, title: t('30天质保', '30-Day Warranty'), desc: t('所有维修享30天质保', 'Warranty on all repairs') },
    { icon: <Clock size={28} />, title: t('快速维修', 'Quick Service'), desc: t('大部分30分钟-2小时取机', 'Most done in 30min-2hrs') },
    { icon: <Award size={28} />, title: t('10年经验', '10+ Years Exp'), desc: t('专业技术，诚信经营', 'Expert techs, honest service') },
  ]

  const reviews = [
    { name: '张先生', text: t('换了iPhone屏幕，价格比官方便宜太多，质量很好，推荐！', 'iPhone screen replacement, way cheaper than official, great quality!'), stars: 5 },
    { name: '李女士', text: t('电脑卡顿好久了，加了固态硬盘开机10秒，太牛了', 'Slow laptop got SSD, boots in 10 seconds!'), stars: 5 },
    { name: '王先生', text: t('iPad屏幕摔碎了，修好跟新的一样，还贴了膜，服务态度超好', 'iPad screen fixed like new, also got a screen protector. Great service!'), stars: 5 },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* ===== 导航栏 ===== */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔧</span>
              <span className="font-bold text-lg text-gray-900">Crazy维修</span>
            </div>
            <div className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
              <a href="#services" className="hover:text-blue-600 transition-colors">{t('服务项目', 'Services')}</a>
              <a href="#about" className="hover:text-blue-600 transition-colors">{t('关于我们', 'About')}</a>
              <a href="#reviews" className="hover:text-blue-600 transition-colors">{t('客户评价', 'Reviews')}</a>
              <a href="#faq" className="hover:text-blue-600 transition-colors">{t('常见问题', 'FAQ')}</a>
              <a href="#contact" className="hover:text-blue-600 transition-colors">{t('联系我们', 'Contact')}</a>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
                className="text-xs px-2.5 py-1 rounded border border-gray-300 text-gray-500 hover:text-gray-800 transition-colors"
              >{lang === 'zh' ? 'English' : '中文'}</button>
              <button onClick={() => setShowContact(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
              >{t('立即咨询', 'Contact Now')}</button>
            </div>
          </div>
        </div>
      </nav>

      {/* ===== Hero ===== */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="grid sm:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <h1 className="text-3xl sm:text-5xl font-bold leading-tight">{t('Crazy维修', 'Crazy Repair')}</h1>
              <p className="text-xl sm:text-2xl font-semibold text-blue-200">{t('威海专业手机电脑维修', 'Weihai Pro Phone & PC Repair')}</p>
              <p className="text-blue-100 leading-relaxed text-sm sm:text-base max-w-lg">
                {t('10年维修经验，诚信经营。手机碎屏、电池亏电、电脑卡顿、数据恢复——先免费检测后报价，不修不收费。威海环翠区实体店，欢迎到店咨询。', '10+ years experience. Phone screen, battery, PC repair, data recovery — free diagnosis first, pay only if approved. Walk-ins welcome.')}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button onClick={() => setShowContact(true)}
                  className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
                >{t('📱 立即咨询', '📱 Contact Now')}</button>
                <a href="#services"
                  className="border border-white/40 text-white font-medium px-6 py-3 rounded-xl hover:bg-white/10 transition-colors"
                >{t('查看服务 →', 'Our Services →')}</a>
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
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md">
                {/* 卡片头 */}
                <div className="p-5 sm:p-6 cursor-pointer" onClick={() => setExpanded(expanded === s.id ? null : s.id)}>
                  <div className="text-blue-600 mb-3">{s.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{s.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{s.summary}</p>
                  <p className="text-xs text-gray-400 mb-3">{s.brands}</p>
                  <div className="flex items-center gap-1 text-blue-600 text-xs font-medium">
                    {expanded === s.id ? (
                      <>{t('收起详情', 'Collapse')} <ChevronDown size={14} /></>
                    ) : (
                      <>{t('查看详情及价格', 'View Details')} <ChevronDown size={14} /></>
                    )}
                  </div>
                </div>
                {/* 展开详情 */}
                {expanded === s.id && (
                  <div className="border-t border-gray-100 px-5 sm:px-6 py-4 bg-gray-50/50 space-y-3">
                    {s.details.map((d, j) => (
                      <div key={j} className={`pb-3 ${j < s.details.length - 1 ? 'border-b border-gray-100' : ''}`}>
                        <div className="flex items-center justify-between mb-1">
                          <h4 className={`font-medium text-sm ${d.name === t('其他问题', 'Other Issues') ? 'text-blue-600' : 'text-gray-900'}`}>{d.name}</h4>
                          <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded">{d.price}</span>
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

      {/* ===== 维修品牌 ===== */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h3 className="text-sm font-semibold text-gray-500 mb-6 uppercase tracking-wider">{t('支持品牌', 'Brands We Support')}</h3>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-gray-400">
            {['Apple','Samsung','Huawei','Xiaomi','OPPO','vivo','Dell','Lenovo','HP','ASUS'].map((b, i) => (
              <span key={i} className="text-xl sm:text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">{b}</span>
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
                <p>{t('Crazy维修（Crazy-repair）成立于威海环翠区，是一家专注于手机、电脑、平板及各类数码产品维修的专业工作室。10年维修经验，累计服务超过5000位客户。', 'Crazy Repair is a professional repair studio in Huancui, Weihai. 10+ years experience, 5000+ satisfied customers.')}</p>
                <p>{t('我们的理念：先查问题，告诉客户真实情况，给出合理报价，修不修客户决定。绝不诱导消费，绝不隐瞒问题。', 'Our philosophy: diagnose first, be honest, give a fair quote. No pressure, no hidden issues.')}</p>
                <div className="flex items-center gap-4 pt-4 text-sm">
                  <div className="bg-blue-50 rounded-xl px-4 py-3 text-center">
                    <div className="text-2xl font-bold text-blue-600">10+</div>
                    <div className="text-xs text-gray-500">{t('年经验', 'Years')}</div>
                  </div>
                  <div className="bg-blue-50 rounded-xl px-4 py-3 text-center">
                    <div className="text-2xl font-bold text-blue-600">5000+</div>
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
                <div className="flex items-start gap-3"><Phone size={20} className="text-green-500 shrink-0 mt-0.5" /><div><p className="font-medium text-gray-900">WhatsApp</p><p className="text-sm text-gray-500">+65 96146709</p></div></div>
                <div className="flex items-start gap-3"><Clock size={20} className="text-gray-400 shrink-0 mt-0.5" /><div><p className="font-medium text-gray-900">{t('营业时间', 'Hours')}</p><p className="text-sm text-gray-500">{t('周一至周日 9:00-20:00', 'Mon-Sun 9:00-20:00')}</p></div></div>
              </div>
              <button onClick={() => setShowContact(true)} className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors">{t('💬 联系我咨询', '💬 Contact for Help')}</button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 客户评价 ===== */}
      <section id="reviews" className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('客户评价', 'Customer Reviews')}</h2>
            <p className="text-gray-500 mt-2">{t('来自真实客户的好评', 'What our customers say')}</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex text-amber-400 mb-3">{[...Array(r.stars)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}</div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{r.text}"</p>
                <p className="text-gray-400 text-xs font-medium">{r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('常见问题', 'FAQ')}</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: t('维修需要多长时间？', 'How long does a repair take?'), a: t('大部分常见维修（换屏幕、换电池）30分钟到2小时可取。复杂问题如主板维修通常1-2天。', 'Most common repairs (screen, battery) take 30min-2hrs. Complex issues like motherboard repair take 1-2 days.') },
              { q: t('修了之后还有保修吗？', 'Do you offer warranty?'), a: t('所有维修享30天质保。如果维修后出现问题，免费返修。', '30-day warranty on all repairs. Free rework if issues arise.') },
              { q: t('维修会丢失数据吗？', 'Will I lose my data?'), a: t('正常维修（换屏幕、电池等）不会影响数据。主板维修或刷机有数据丢失风险，建议提前备份。', 'Normal repairs won\'t affect data. Board repair or flashing may risk data loss, please back up.') },
              { q: t('可以上门维修吗？', 'Do you offer doorstep repair?'), a: t('目前以到店维修为主，地址：威海环翠区西门31号。特殊情况下可上门取送。', 'We primarily do walk-in repairs at our store. Special pickup/delivery available on request.') },
              { q: t('不修收费吗？', 'Is there a fee if I don\'t repair?'), a: t('完全免费检测，不修不收费。', 'Free diagnosis, no charge if you decline.') },
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

      {/* ===== CTA ===== */}
      <section id="contact" className="py-16 sm:py-20 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('设备出问题了？别着急', 'Device issues? Don\'t worry')}</h2>
          <p className="text-blue-200 mb-8 max-w-xl mx-auto">
            {t('免费检测，先报价后维修。添加微信或WhatsApp，发照片就能初步判断。', 'Free diagnosis. Add us on WeChat or WhatsApp, send a photo for initial assessment.')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setShowContact(true)} className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors shadow-lg text-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
            <button onClick={() => window.open('https://wa.me/6596146709?text=我想咨询手机电脑维修事宜', '_blank')} className="bg-green-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-green-600 transition-colors shadow-lg text-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</button>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3"><span className="text-xl">🔧</span><span className="font-bold text-white text-lg">Crazy维修</span></div>
              <p className="text-sm leading-relaxed">{t('威海环翠区专业数码维修，诚信经营，先检测后维修。', 'Weihai pro digital repair. Honest service, diagnose first.')}</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">{t('快速链接', 'Quick Links')}</h4>
              <ul className="space-y-2 text-sm">
                {[['services','服务项目','Services'],['about','关于我们','About'],['reviews','客户评价','Reviews'],['faq','常见问题','FAQ'],['contact','联系我们','Contact']].map(([id,zh,en],i) => (
                  <li key={i}><a href={`#${id}`} className="hover:text-white transition-colors">{lang === 'zh' ? zh : en}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">{t('联系方式', 'Contact')}</h4>
              <ul className="space-y-2 text-sm">
                <li>{t('微信', 'WeChat')}: crazy-repair</li>
                <li>WhatsApp: +65 96146709</li>
                <li>{t('地址', 'Address')}: {t('威海环翠区西门31号', 'Huancui Dist, West Gate #31')}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-xs">
            <p>© 2026 Crazy维修 (Crazy-repair). {t('保留所有权利。', 'All rights reserved.')}</p>
          </div>
        </div>
      </footer>

      {/* ===== 联系弹窗 ===== */}
      {showContact && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowContact(false)}>
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">🔧</div>
              <h3 className="text-xl font-bold text-gray-900">{t('联系我们', 'Contact Us')}</h3>
              <p className="text-sm text-gray-500 mt-1">{t('选择您方便的方式', 'Choose your preferred way')}</p>
            </div>
            <div className="space-y-4">
              <a onClick={(e) => { e.preventDefault(); navigator.clipboard?.writeText('crazy-repair'); window.open('weixin://', '_blank'); }}
                className="flex items-center gap-4 p-4 rounded-2xl border border-gray-200 hover:border-green-300 hover:bg-green-50 cursor-pointer transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0"><MessageCircle size={24} className="text-green-600" /></div>
                <div className="flex-1"><p className="font-semibold text-gray-900">{t('微信', 'WeChat')}</p><p className="text-xs text-gray-500">crazy-repair（{t('已复制', 'copied')}）</p></div>
                <ChevronRight size={20} className="text-gray-400" />
              </a>
              <a href="https://wa.me/6596146709?text=我想咨询手机电脑维修事宜" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl border border-gray-200 hover:border-green-300 hover:bg-green-50 cursor-pointer transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0"><Phone size={24} className="text-green-600" /></div>
                <div className="flex-1"><p className="font-semibold text-gray-900">WhatsApp</p><p className="text-xs text-gray-500">+65 96146709</p></div>
                <ChevronRight size={20} className="text-gray-400" />
              </a>
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-200">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0"><MapPin size={24} className="text-blue-600" /></div>
                <div className="flex-1"><p className="font-semibold text-gray-900">{t('到店维修', 'Visit Store')}</p><p className="text-xs text-gray-500">{t('威海环翠区西门31号', 'No.31 West Gate, Huancui')}</p></div>
              </div>
              <p className="text-center text-xs text-gray-400">{t('点击微信会自动复制微信号，打开微信粘贴添加即可', 'Click WeChat to copy ID, paste in WeChat to add friend')}</p>
            </div>
            <button onClick={() => setShowContact(false)} className="mt-6 w-full py-3 rounded-xl bg-gray-100 text-gray-600 font-medium hover:bg-gray-200 transition-colors">{t('关闭', 'Close')}</button>
          </div>
        </div>
      )}
    </div>
  )
}

function SearchCheck(props) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width={props.size||24} height={props.size||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="m9 11 2 2 4-4"/></svg>)
}
