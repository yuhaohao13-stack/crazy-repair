'use client'
import { useSite } from '../../../lib/SiteContext'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import Navbar from '../../../components/Navbar'
import Breadcrumb from "../../../components/Breadcrumb";
import { useParams } from 'next/navigation'

const serviceData = {
  watch: {
    title: 'Apple Watch',
    titleEn: 'Apple Watch',
    subtitle: 'Ultra/Ultra 2/Series 9/8/7/SE/6 全系列',
    subtitleEn: 'Ultra/Ultra 2/Series 9-1/SE/all series',
    gradient: 'from-blue-600 to-blue-500',
    gradientBg: 'from-blue-600 via-blue-500 to-blue-400',
    icon: '⌚',
    description: 'Apple Watch Ultra/Ultra 2/Series 10/9/8/7/SE/6——屏幕碎裂换玻璃/OLED、电池不耐用、进水、表带更换。Apple Watch全系列专业维修。',
    descriptionEn: 'Apple Watch Ultra/Ultra 2/Series 10/9/8/7/SE/6 — cracked glass/OLED, battery issues, water damage, strap replacement. Full Apple Watch repair.',
    repairs: [
      { title: '屏幕更换', titleEn: 'Screen Replacement', desc: 'Apple Watch屏幕碎裂、漏液、触摸不灵。OLED屏幕更换，含防水密封胶。Ultra/SE/全系列。', descEn: 'Apple Watch cracked screen, leaking, unresponsive. OLED screen replacement with waterproof sealant. Ultra/SE/all series.' },
      { title: '电池更换', titleEn: 'Battery Service', desc: 'Apple Watch电池不耐用、充不进电、续航不到半天。原装规格电池更换。', descEn: 'Apple Watch battery drain, no charge, less than half-day battery. OEM spec battery replacement.' },
      { title: '进水维修', titleEn: 'Water Damage', desc: 'Apple Watch进水后触摸失灵、屏幕有水雾、功能异常。超声波清洗+芯片级修复。', descEn: 'Apple Watch water damaged — touch not working, screen fog, functional issues. Ultrasonic clean + chip-level fix.' },
      { title: '传感器维修', titleEn: 'Sensor Repair', desc: '心率传感器不准、血氧不工作、ECG心电图无法测量。传感器模块维修更换。', descEn: 'Heart rate sensor inaccurate, SpO2 not working, ECG unavailable. Sensor module repair.' },
    ],
    brandPage: '/watch-repair',
  },
  'samsung-watch': {
    title: 'Samsung Galaxy Watch',
    titleEn: 'Samsung Galaxy Watch',
    subtitle: 'Galaxy Watch 6/5/4/Classic/Ultra',
    subtitleEn: 'Galaxy Watch 6/5/4/Classic/Ultra',
    gradient: 'from-gray-600 to-gray-500',
    gradientBg: 'from-gray-600 via-gray-500 to-gray-400',
    icon: '⌚',
    description: 'Samsung Galaxy Watch 6/5/4/Classic/Ultra——屏幕碎了、电池不耐用了、表带断了、进水了。三星智能手表专业维修。',
    descriptionEn: 'Samsung Galaxy Watch 6/5/4/Classic/Ultra — cracked screen, battery issues, broken strap, water damage. Samsung smartwatch repair specialist.',
    repairs: [
      { title: '屏幕更换', titleEn: 'Screen Replacement', desc: 'Galaxy Watch AMOLED屏幕碎裂漏液触摸不灵。原装品质屏幕更换，含防水密封。', descEn: 'Galaxy Watch AMOLED cracked, leaking, unresponsive. OEM quality screen replacement with waterproof seal.' },
      { title: '电池更换', titleEn: 'Battery Service', desc: '三星手表电池不耐用、充不进电、续航大幅下降。原装规格电池更换。', descEn: 'Samsung watch battery drain, no charge, significantly reduced battery life. OEM spec battery replacement.' },
      { title: '表带/表扣', titleEn: 'Strap/Buckle', desc: 'Galaxy Watch原装/兼容表带更换、表扣断裂维修。多种材质可选。', descEn: 'Galaxy Watch OEM/compatible strap replacement, buckle repair. Multiple material options.' },
      { title: '主板维修', titleEn: 'Motherboard', desc: '不开机、重启、充电IC故障、GPS不定位。芯片级维修。', descEn: 'No power, reboot, charging IC fault, GPS not working. Chip-level repair.' },
    ],
    brandPage: '/watch-repair',
  },
  console: {
    title: '游戏机',
    titleEn: 'Game Console',
    subtitle: 'Switch OLED/Switch/PS5/PS4/Xbox Series X/PSP',
    subtitleEn: 'Switch OLED/Switch/PS5/PS4/Xbox Series X/PSP',
    gradient: 'from-red-600 to-red-500',
    gradientBg: 'from-red-600 via-red-500 to-red-400',
    icon: '🎮',
    description: 'Nintendo Switch OLED/Switch/Switch Lite、PS5/PS4 Pro/PS4 Slim、Xbox Series X/S、PSP/PSV——手柄漂移、屏幕更换、不充电、清灰散热、改装升级。游戏机全系专业维修。',
    descriptionEn: 'Nintendo Switch OLED/Switch/Lite, PS5/PS4 Pro/Slim, Xbox Series X/S, PSP/PSV — joystick drift, screen repair, no charge, cleaning, mods. Full console repair.',
    repairs: [
      { title: '手柄漂移维修', titleEn: 'Joystick Drift', desc: 'Switch Joy-Con漂移、PS5手柄漂移、Xbox手柄摇杆不归位。霍尔效应摇杆改装升级，永不漂移。', descEn: 'Switch Joy-Con drift, PS5 controller drift, Xbox stick not centering. Hall effect joystick upgrade — never drift again.' },
      { title: '屏幕更换', titleEn: 'Screen Replacement', desc: 'Switch OLED/Switch/Lite屏幕碎裂漏液。OLED/LCD屏幕更换，含触摸校准。', descEn: 'Switch OLED/Switch/Lite cracked screen, leaking. OLED/LCD screen replacement with touch calibration.' },
      { title: '电池更换', titleEn: 'Battery Service', desc: 'Switch/PS5手柄/Xbox手柄电池不耐用、鼓包、充不进电。原装规格电池更换。', descEn: 'Switch/PS5 controller/Xbox controller battery drain, swelling, no charge. OEM spec battery.' },
      { title: '清灰散热', titleEn: 'Cleaning & Cooling', desc: '游戏机发热严重、风扇异响、自动关机。深度拆机清灰+换导热硅脂。', descEn: 'Console overheating, fan noise, auto shutdown. Deep clean + thermal paste replacement.' },
      { title: '改装升级', titleEn: 'Console Mods', desc: 'Switch芯片破解、PS5扩容SSD、Xbox换内置硬盘、外壳更换。各类改装升级。', descEn: 'Switch mod chip, PS5 SSD upgrade, Xbox internal drive swap, shell replacement. Various mods.' },
    ],
    brandPage: '/console-repair',
  },
  headphone: {
    title: '耳机',
    titleEn: 'Earphones',
    subtitle: 'AirPods Pro 2/AirPods 3/全系TWS耳机',
    subtitleEn: 'AirPods Pro 2/AirPods 3/TWS all',
    gradient: 'from-green-600 to-green-500',
    gradientBg: 'from-green-600 via-green-500 to-green-400',
    icon: '🎧',
    description: 'AirPods Pro 2/AirPods 3/AirPods 4、AirPods Max、各类TWS蓝牙耳机——电池不耐用、一只不响、充电仓故障、麦克风不灵。耳机专业维修。',
    descriptionEn: 'AirPods Pro 2/AirPods 3/AirPods 4, AirPods Max, TWS earbuds — battery drain, one side silent, charging case fault, mic issues. Earphone repair specialist.',
    repairs: [
      { title: '电池更换', titleEn: 'Battery Service', desc: 'AirPods/蓝牙耳机电池不耐用、续航不到半小时、一只掉电快。电池更换续航恢复。', descEn: 'AirPods/TWS earbuds battery drain, less than 30 min battery, one side drains fast. Battery replacement restores life.' },
      { title: '一只不响维修', titleEn: 'One Side Silent', desc: 'AirPods一只不响、声音小、有杂音。喇叭单元更换/排线修复。', descEn: 'AirPods one side silent, low volume, static noise. Speaker unit replacement/flex repair.' },
      { title: '充电仓维修', titleEn: 'Charging Case', desc: 'AirPods充电仓不充电、不识别耳机、指示灯不亮。充电仓维修更换。', descEn: 'AirPods case not charging, not recognizing earbuds, LED not working. Case repair/replacement.' },
      { title: '麦克风/降噪', titleEn: 'Mic/Noise Cancelling', desc: '通话麦克风不灵、降噪失效、通透模式异常。麦克风模块维修更换。', descEn: 'Call mic not working, ANC failed, transparency mode abnormal. Mic module repair.' },
    ],
    brandPage: '/headphone-repair',
  },
  camera: {
    title: '相机/无人机',
    titleEn: 'Camera/Drone',
    subtitle: '数码相机/单反/DJI无人机',
    subtitleEn: 'Digital/DSLR/DJI drone',
    gradient: 'from-purple-600 to-purple-500',
    gradientBg: 'from-purple-600 via-purple-500 to-purple-400',
    icon: '📷',
    description: '数码相机、单反相机、微单、DJI无人机——镜头维修、传感器清洁、快门故障、存储卡数据恢复、无人机云台维修。',
    descriptionEn: 'Digital camera, DSLR, mirrorless, DJI drone — lens repair, sensor cleaning, shutter fault, SD card recovery, gimbal repair.',
    repairs: [
      { title: '镜头维修', titleEn: 'Lens Repair', desc: '相机镜头对焦不准、光圈故障、镜片霉斑、变焦卡顿。镜头拆修清洁。', descEn: 'Camera lens focus issue, aperture fault, lens fungus, zoom stuck. Lens disassembly repair & cleaning.' },
      { title: '传感器清洁', titleEn: 'Sensor Cleaning', desc: '照片有固定黑点/污点、传感器进灰。专业传感器清洁，含CMOS表面清洁。', descEn: 'Photos with fixed dark spots/dust spots, sensor dirt. Professional sensor cleaning including CMOS surface.' },
      { title: '快门维修', titleEn: 'Shutter Repair', desc: '快门按不下去、快门帘幕故障、快门报错、快门计数过多。快门组件更换维修。', descEn: 'Shutter won\'t press, curtain fault, shutter error, high shutter count. Shutter assembly replacement.' },
      { title: '数据恢复', titleEn: 'Data Recovery', desc: 'SD卡/CF卡/TF卡不识别、照片丢失、误删、格式化恢复。存储卡数据恢复服务。', descEn: 'SD/CF/TF card not recognized, photos lost, accidentally deleted, formatted recovery. Memory card data recovery.' },
      { title: '无人机维修', titleEn: 'Drone Repair', desc: 'DJI无人机炸机修复、云台维修、电机更换、桨叶更换、图传故障。', descEn: 'DJI drone crash repair, gimbal repair, motor replacement, propeller replacement, transmission fault.' },
    ],
    brandPage: '/camera-repair',
  },
  mods: {
    title: '改装配件',
    titleEn: 'Custom Mods',
    subtitle: '手机改双卡、扩容、换壳、游戏机改装',
    subtitleEn: 'Dual SIM, storage, shell swap, console mods',
    gradient: 'from-gray-700 to-gray-600',
    gradientBg: 'from-gray-700 via-gray-600 to-gray-500',
    icon: '🔧',
    description: '手机改双卡双待、硬盘扩容升级、外壳更换改色、游戏机芯片破解改装。想做啥说来聊，按项目报价。',
    descriptionEn: 'Dual SIM mod, storage upgrade, shell swap, console mod chip. Tell me what you want — quote based on project.',
    repairs: [
      { title: '扩容升级', titleEn: 'Storage Upgrade', desc: 'iPhone/iPad/MacBook硬盘扩容，从64G扩到256G/512G/1TB。硬盘底层维修+扩容。', descEn: 'iPhone/iPad/MacBook storage upgrade, from 64GB to 256GB/512GB/1TB. NAND-level upgrade.' },
      { title: '改双卡', titleEn: 'Dual SIM Mod', desc: 'iPhone 国行/港版/美版改双卡双待。双卡排线焊接改装，支持双4G/5G。', descEn: 'iPhone China/HK/US version dual SIM mod. Dual SIM flex soldering, dual 4G/5G support.' },
      { title: '换壳改色', titleEn: 'Shell Swap', desc: '手机外壳更换改色、中框更换。透明后盖、碳纤维、定制颜色可选。', descEn: 'Phone shell swap, color change, mid-frame replacement. Clear back, carbon fiber, custom colors available.' },
      { title: '游戏机改装', titleEn: 'Console Mods', desc: 'Switch OLED/Switch芯片破解系统、PS5加装M.2 SSD、Xbox换内置硬盘、外壳DIY。', descEn: 'Switch OLED/Switch mod chip install, PS5 M.2 SSD upgrade, Xbox internal drive swap, DIY shells.' },
    ],
    brandPage: null,
  },
  'smart-home': {
    title: '智能家居/路由/监控',
    titleEn: 'Smart Home/Router/Camera',
    subtitle: '路由器设置、监控安装、智能家居调试',
    subtitleEn: 'Router setup, CCTV, smart home config',
    gradient: 'from-amber-600 to-amber-500',
    gradientBg: 'from-amber-600 via-amber-500 to-yellow-500',
    icon: '🔌',
    description: '路由器设置、WiFi覆盖优化、PoE/无线监控安装、智能家居调试（米家/HomeKit/智能音箱）。网络故障排查、全屋WiFi组网方案。',
    descriptionEn: 'Router setup, WiFi coverage optimization, PoE/wireless CCTV installation, smart home config (Xiaomi/HomeKit/speakers). Network troubleshooting, whole-home mesh WiFi.',
    repairs: [
      { title: '路由器设置', titleEn: 'Router Setup', desc: '路由器初始设置、WiFi密码修改、桥接/中继模式、家长控制。各类品牌路由器（TP-Link/小米/华硕/网件）。', descEn: 'Router initial setup, WiFi password change, bridge/repeater mode, parental controls. All brands (TP-Link/Xiaomi/ASUS/Netgear).' },
      { title: 'WiFi覆盖优化', titleEn: 'WiFi Optimization', desc: '家里WiFi信号差、死角多、网速慢。Mesh组网方案设计+实施，信号满格。', descEn: 'Weak WiFi signal, dead zones, slow internet. Mesh network design + implementation, full signal coverage.' },
      { title: '监控安装', titleEn: 'CCTV Installation', desc: '家用/商用监控摄像头安装调试。PoE有线/WiFi无线监控、手机远程查看、录像回放设置。', descEn: 'Home/commercial CCTV camera installation & setup. PoE wired/wireless, mobile remote viewing, recording setup.' },
      { title: '智能家居调试', titleEn: 'Smart Home Setup', desc: '米家智能设备接入、HomeKit家庭中枢设置、智能音箱配置、自动化场景搭建。', descEn: 'Xiaomi smart device integration, HomeKit hub setup, smart speaker config, automation scenes.' },
    ],
    brandPage: null,
  },
  other: {
    title: '其他数码产品',
    titleEn: 'Other Devices',
    subtitle: '电子词典、学习机、GPS导航、翻译笔',
    subtitleEn: 'E-dict, learning pad, GPS, pen',
    gradient: 'from-gray-600 to-gray-500',
    gradientBg: 'from-gray-600 via-gray-500 to-gray-400',
    icon: '❓',
    description: '电子词典、学习机、GPS导航仪、翻译笔、老人机、POS机等各类数码产品——没列出来不代表不能修，拿来免费检测，不修不收费。',
    descriptionEn: 'E-dictionary, learning pad, GPS navigator, translation pen, senior phone, POS terminal, etc. Not listed? Bring it in for free diagnosis. No charge if no repair.',
    repairs: [
      { title: '屏幕更换', titleEn: 'Screen Replacement', desc: '各类数码产品屏幕碎裂、漏液、触摸不灵。能修就修，配件难找的提供替代方案建议。', descEn: 'Any device cracked screen, leaking, unresponsive. We fix what we can, suggest alternatives for rare parts.' },
      { title: '电池更换', titleEn: 'Battery Service', desc: '各类设备电池不耐用、鼓包、充不进电。能找到配件就换，找不到给建议。', descEn: 'Any device battery drain, swelling, no charge. Replace if parts available, advise if not.' },
      { title: '充电口维修', titleEn: 'Charging Port', desc: 'Micro-USB/Type-C/Lightning口松动、不充电。焊接维修更换。', descEn: 'Micro-USB/Type-C/Lightning port loose, no charge. Solder repair/replacement.' },
      { title: '免费检测', titleEn: 'Free Diagnosis', desc: '任何数码产品问题，拿来免费检测评估，能修再报价。不修不收费。', descEn: 'Any device issue, free diagnosis and assessment. Quote before repair. No charge if no repair.' },
    ],
    brandPage: null,
  },
}

export default function OtherServiceDetail() {
  const { lang, setShowContact } = useSite();
  const params = useParams()
  const t = (zh, en) => lang === 'zh' ? zh : en

  const serviceId = params?.service || 'watch'
  const info = serviceData[serviceId]
  if (!info) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">{t('服务未找到', 'Not Found')}</h1>
          <a href="/other-repair" className="text-blue-600 mt-4 inline-block">{t('← 返回其他维修', '← Back to Other Repair')}</a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb items={[
        { label: '其他数码维修', labelEn: 'Other Device Repair', href: '/other-repair' },
        { label: info.title, labelEn: info.titleEn },
      ]} />

      <section className={'bg-gradient-to-br ' + info.gradientBg + ' text-white'}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <a href="/other-repair" className="inline-flex items-center gap-1 text-white/70 hover:text-white text-xs mb-3">
            <ArrowLeft size={12} /> {t('← 返回其他维修', '← Back to Other Repair')}
          </a>
          <div className="flex items-center gap-4 mb-2">
            <div className="text-4xl">{info.icon}</div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold">{lang === 'zh' ? info.title : info.titleEn}</h1>
              <p className="text-sm text-white/80">{lang === 'zh' ? info.subtitle : info.subtitleEn}</p>
            </div>
          </div>
          <p className="text-white/90 mt-4 max-w-2xl text-sm leading-relaxed">{lang === 'zh' ? info.description : info.descriptionEn}</p>
          <div className="flex flex-wrap gap-3 mt-6">
            <button onClick={() => setShowContact(true)} className="bg-white text-blue-600 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-blue-50 shadow-lg">{t('📱 微信咨询维修', '📱 WeChat for Repair')}</button>
            <a href={'https://wa.me/6596146709?text=' + encodeURIComponent('咨询' + info.title + '维修')} target="_blank" className="bg-green-500 text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-green-600 shadow-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">{t('常见维修项目', 'Common Repairs')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {info.repairs.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-gray-900 mb-1 text-sm">{lang === 'zh' ? r.title : r.titleEn}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{lang === 'zh' ? r.desc : r.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-center text-gray-400 text-sm mb-4">{t('没找到你的设备？加微信问我，没列出来不代表不能修', 'Device not listed? DM me — not listed does not mean we cannot fix it')}</p>
          <div className="flex justify-center gap-3">
            <button onClick={() => setShowContact(true)} className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 shadow-md">{t('📱 微信咨询', '📱 WeChat')}</button>
            {info.brandPage && (
              <a href={info.brandPage} className="bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-300 shadow-md">{t('查看全部服务 →', 'View All Services →')}</a>
            )}
          </div>
        </div>
      </section>

      <section className={'bg-gradient-to-br ' + info.gradientBg + ' text-white text-center py-12'}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-3">{t('需要' + info.title + '维修？找我', 'Need ' + info.titleEn + ' Repair? Contact me')}</h2>
          <p className="text-white/80 text-sm mb-6">{t('免费检测，发照片就能初步判断', 'Free diagnosis — send a photo for a quick check')}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={() => setShowContact(true)} className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 shadow-md">{t('📱 微信咨询', '📱 WeChat')}</button>
            <a href={'https://wa.me/6596146709?text=' + encodeURIComponent('咨询' + info.title + '维修')} target="_blank" className="bg-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-600 shadow-md">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
          </div>
        </div>
      </section>

    </div>
  )
}
