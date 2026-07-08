'use client'
import { useSite } from '../../../lib/SiteContext'
import Navbar from '../../../components/Navbar'
import Breadcrumb from "../../../components/Breadcrumb";
import { useParams } from 'next/navigation'

// 每个品牌维修项目对应的详情页 service ID（下标匹配 repairs[] 顺序）
const brandServiceIds = {
  ipad:      ['screen-replacement', 'battery-replacement', 'charging-port', 'motherboard-repair', 'water-damage'],
  samsung:   ['screen-replacement', 'battery-replacement', 'back-glass', 'charging-port', 'motherboard-repair'],
  huawei:    ['screen-replacement', 'battery-replacement', 'charging-port', 'motherboard-repair', 'flash-unlock'],
  xiaomi:    ['screen-replacement', 'battery-replacement', 'charging-port', 'motherboard-repair'],
  oppo:      ['screen-replacement', 'battery-replacement', 'charging-port', 'motherboard-repair'],
  lenovo:    ['screen-replacement', 'battery-replacement', 'charging-port', 'motherboard-repair'],
  kindle:    [],
}

const serviceData = {
  ipad: {
    title: 'Apple iPad',
    titleEn: 'Apple iPad',
    subtitle: 'iPad Pro/Air/Mini/数字系列全代维修',
    subtitleEn: 'iPad Pro/Air/Mini/digital all gens repair',
    gradientBg: 'from-blue-700 via-blue-600 to-blue-500',
    icon: '📟',
    description: 'iPad Pro Mini-LED屏/M4 OLED屏、iPad Air、iPad mini、数字系列——屏幕碎了、电池不耐用了、充电口松了、进水了。Apple iPad全系列专业维修，2007年至今奋斗在维修一线。',
    descriptionEn: 'iPad Pro Mini-LED / M4 OLED, iPad Air, iPad mini, digital series — cracked screen, battery drain, charging port, water damage. Full iPad series repair. On the job since 2007.',
    repairs: [
      { title: '屏幕更换', titleEn: 'Screen Replacement', desc: 'iPad Pro/Air/Mini/数字系列全代屏幕更换。LCD、Mini-LED、OLED屏幕碎裂漏液触摸不灵。含密封胶恢复防水。', descEn: 'iPad Pro/Air/Mini/digital all gens. LCD, Mini-LED, OLED cracked, leaking, unresponsive. Waterproof sealant restored.' },
      { title: '电池更换', titleEn: 'Battery Service', desc: 'iPad电池不耐用、鼓包、充不进电、自动关机。原装规格电池更换，续航回到新机水平。', descEn: 'iPad battery drain, swelling, no charge, auto shutdown. OEM spec battery, like-new battery life restored.' },
      { title: '充电口/尾插', titleEn: 'Charging Port', desc: 'Lightning/USB-C口松动、接触不良、不充电、不数据传输。尾插排线维修更换。', descEn: 'Loose Lightning/USB-C port, bad contact, no charge, no data. Flex board repair.' },
      { title: '主板维修', titleEn: 'Motherboard Repair', desc: 'iPad不开机、白苹果重启循环、充电IC故障、无WiFi/蓝牙。Apple Silicon芯片级维修。', descEn: 'No power, white Apple boot loop, charging IC fault, no WiFi/BT. Apple Silicon component-level repair.' },
      { title: '进水维修', titleEn: 'Water Damage', desc: 'iPad进水后不开机、屏幕有水印、功能异常。超声波清洗+芯片级修复。', descEn: 'iPad water damaged — no power, screen watermark, functional issues. Ultrasonic clean + chip-level fix.' },
    ],
    brandPage: '/ipad-repair',
  },
  samsung: {
    title: 'Samsung Galaxy Tab',
    titleEn: 'Samsung Galaxy Tab',
    subtitle: '三星Tab S/A/Active全系列维修',
    subtitleEn: 'Samsung Tab S/A/Active series repair',
    gradientBg: 'from-purple-700 via-purple-600 to-purple-500',
    icon: '📟',
    description: '三星Galaxy Tab S系列旗舰屏、Tab A系列性价比平板——屏幕碎了、电池不耐用了、后盖碎了。三星平板AMOLED/LCD换屏专家，芯片级主板维修。',
    descriptionEn: 'Samsung Galaxy Tab S series flagship displays, Tab A series — cracked screen, battery issues, broken back glass. Samsung AMOLED/LCD screen replacement specialist. Board-level repair.',
    repairs: [
      { title: '屏幕更换', titleEn: 'Screen Replacement', desc: 'Galaxy Tab S系列AMOLED屏、Tab A系列LCD屏碎裂漏液触摸不灵。原装品质屏幕，含密封胶恢复防水。', descEn: 'Tab S AMOLED, Tab A LCD — cracked, leaking, unresponsive. OEM quality screens, waterproof sealant restored.' },
      { title: '电池更换', titleEn: 'Battery Service', desc: '三星平板电池不耐用、鼓包、充不进电。原装规格电池更换，续航恢复。', descEn: 'Samsung tablet battery drain, swelling, no charge. OEM spec battery swap, battery life restored.' },
      { title: '后盖更换', titleEn: 'Back Glass', desc: '三星平板玻璃后盖碎裂更换。部分型号可换后盖无需拆屏。', descEn: 'Samsung tablet back glass replacement. Some models can swap without removing screen.' },
      { title: '充電口維修', titleEn: 'Charging Port', desc: 'Type-C口松动、接触不良、不充电。尾插排线维修更换。', descEn: 'Loose USB-C port, bad contact, no charge. Flex board repair.' },
      { title: '主板维修', titleEn: 'Motherboard Repair', desc: '不开机、重启循环、充电IC故障。芯片级维修，比换主板便宜。', descEn: 'No power, boot loop, charging IC fault. Component-level repair, cheaper than board replacement.' },
    ],
    brandPage: '/samsung-repair',
  },
  huawei: {
    title: '华为 MatePad',
    titleEn: 'Huawei MatePad',
    subtitle: '华为MatePad Pro/Air/SE全系维修',
    subtitleEn: 'Huawei MatePad Pro/Air/SE series repair',
    gradientBg: 'from-red-600 via-red-500 to-red-400',
    icon: '📟',
    description: '华为MatePad Pro OLED旗舰、MatePad Air、MatePad SE——屏幕更换、电池维修、主板芯片级维修、鸿蒙刷机解锁。华为平板全系专业维修。',
    descriptionEn: 'Huawei MatePad Pro OLED flagship, MatePad Air, MatePad SE — screen replacement, battery repair, board-level chip repair, HarmonyOS flash/unlock. Full Huawei tablet repair.',
    repairs: [
      { title: '屏幕更换', titleEn: 'Screen Replacement', desc: 'MatePad Pro OLED/柔光屏、MatePad Air/MatePad SE LCD屏碎裂漏液触摸不灵。原装品质屏幕。', descEn: 'MatePad Pro OLED, MatePad Air/SE LCD — cracked, leaking, unresponsive. OEM quality screens.' },
      { title: '电池更换', titleEn: 'Battery Service', desc: '华为平板电池不耐用、鼓包、充不进电。原装规格电池更换。', descEn: 'Huawei tablet battery drain, swelling, no charge. OEM spec battery replacement.' },
      { title: '充电口维修', titleEn: 'Charging Port', desc: 'Type-C口松动、接触不良、只能慢充。尾插排线维修更换。', descEn: 'Loose USB-C port, bad contact, slow charging. Flex board repair.' },
      { title: '主板维修', titleEn: 'Motherboard Repair', desc: '不开机、重启、充电IC故障、WiFi蓝牙打不开。麒麟芯片级维修。', descEn: 'No power, reboot, charging IC fault, WiFi/BT dead. Kirin chip-level repair.' },
      { title: '刷机解锁', titleEn: 'Flash/Unlock', desc: '鸿蒙系统卡顿、卡LOGO、忘记密码、账户锁。刷机解锁服务。', descEn: 'HarmonyOS lag, boot loop, forgot password, account lock. Flashing and unlock service.' },
    ],
    brandPage: '/huawei-repair',
  },
  xiaomi: {
    title: '小米/Redmi Pad',
    titleEn: 'Xiaomi/Redmi Pad',
    subtitle: '小米Pad/Redmi Pad全系维修',
    subtitleEn: 'Xiaomi Pad/Redmi Pad all series repair',
    gradientBg: 'from-orange-600 via-orange-500 to-yellow-500',
    icon: '📟',
    description: '小米平板、Redmi Pad——屏幕碎了、电池不耐用了、充电口松了。小米平板性价比维修，换屏换电修主板一站式搞定。',
    descriptionEn: 'Xiaomi Pad, Redmi Pad — cracked screen, battery issues, loose charging port. Affordable Xiaomi tablet repair. One-stop for screen, battery & board repairs.',
    repairs: [
      { title: '屏幕更换', titleEn: 'Screen Replacement', desc: '小米Pad/Redmi Pad屏幕碎裂漏液触摸不灵。LCD/LCD高刷屏原装品质更换。', descEn: 'Xiaomi Pad/Redmi Pad cracked screen, leaking, unresponsive. OEM quality LCD replacement.' },
      { title: '电池更换', titleEn: 'Battery Service', desc: '小米平板电池不耐用、鼓包、充不进电。原装规格电池更换。', descEn: 'Xiaomi tablet battery drain, swelling, no charge. OEM spec battery swap.' },
      { title: '充电口维修', titleEn: 'Charging Port', desc: 'Type-C口松动、接触不良、不充电。尾插排线更换。', descEn: 'Loose USB-C port, bad contact, no charge. Flex board replacement.' },
      { title: '主板维修', titleEn: 'Motherboard Repair', desc: '不开机、重启、充电IC故障。高通/联发科芯片级维修。', descEn: 'No power, boot loop, charging IC fault. Qualcomm/MediaTek chip-level repair.' },
    ],
    brandPage: '/xiaomi-repair',
  },
  oppo: {
    title: 'OPPO Pad / OnePlus Pad',
    titleEn: 'OPPO Pad / OnePlus Pad',
    subtitle: 'OPPO Pad/OnePlus Pad维修',
    subtitleEn: 'OPPO Pad/OnePlus Pad repair',
    gradientBg: 'from-teal-700 via-teal-600 to-teal-500',
    icon: '📟',
    description: 'OPPO Pad、OnePlus Pad——屏幕碎了、电池不耐用了、充电口坏了。OPPO/一加平板专业维修。',
    descriptionEn: 'OPPO Pad, OnePlus Pad — cracked screen, battery issues, charging port problems. Professional OPPO/OnePlus tablet repair.',
    repairs: [
      { title: '屏幕更换', titleEn: 'Screen Replacement', desc: 'OPPO Pad/OnePlus Pad屏幕碎裂漏液触摸不灵。原装品质屏幕更换。', descEn: 'OPPO Pad/OnePlus Pad cracked screen, leaking, unresponsive. OEM quality screen replacement.' },
      { title: '电池更换', titleEn: 'Battery Service', desc: 'OPPO/一加平板电池不耐用、鼓包、充不进电。原装规格电池更换。', descEn: 'OPPO/OnePlus tablet battery drain, swelling, no charge. OEM spec battery replacement.' },
      { title: '充电口维修', titleEn: 'Charging Port', desc: 'Type-C口松动、接触不良、不充电。尾插排线更换。', descEn: 'Loose USB-C port, bad contact, no charge. Flex board replacement.' },
      { title: '主板维修', titleEn: 'Motherboard Repair', desc: '不开机、重启、充电IC故障。芯片级维修。', descEn: 'No power, boot loop, charging IC fault. Chip-level repair.' },
    ],
    brandPage: '/oppo-repair',
  },
  lenovo: {
    title: '联想 Tab / 荣耀平板',
    titleEn: 'Lenovo Tab / Honor Pad',
    subtitle: '联想小新Pad/荣耀平板全系维修',
    subtitleEn: 'Lenovo Pad/Honor Pad all series repair',
    gradientBg: 'from-violet-700 via-violet-600 to-violet-500',
    icon: '📟',
    description: '联想小新Pad、联想Yoga Tab、荣耀平板——屏幕更换、电池维修、充电口维修。性价比平板维修专家。',
    descriptionEn: 'Lenovo Xiaoxin Pad, Yoga Tab, Honor Pad — screen replacement, battery repair, charging port fix. Affordable tablet repair specialist.',
    repairs: [
      { title: '屏幕更换', titleEn: 'Screen Replacement', desc: '小新Pad/Yoga Tab/荣耀平板屏幕碎裂漏液触摸不灵。原装品质LCD屏幕更换。', descEn: 'Xiaoxin Pad/Yoga Tab/Honor Pad cracked screen, leaking, unresponsive. OEM quality LCD replacement.' },
      { title: '电池更换', titleEn: 'Battery Service', desc: '联想/荣耀平板电池不耐用、鼓包、充不进电。原装规格电池更换。', descEn: 'Lenovo/Honor tablet battery drain, swelling, no charge. OEM spec battery replacement.' },
      { title: '充电口维修', titleEn: 'Charging Port', desc: 'Type-C口松动、接触不良、不充电。尾插排线维修更换。', descEn: 'Loose USB-C port, bad contact, no charge. Flex board repair.' },
      { title: '主板维修', titleEn: 'Motherboard Repair', desc: '不开机、重启、充电IC故障。芯片级维修。', descEn: 'No power, boot loop, charging IC fault. Chip-level repair.' },
    ],
    brandPage: '/lenovo-repair',
  },
  kindle: {
    title: 'Kindle / 电子书',
    titleEn: 'Kindle / E-reader',
    subtitle: 'Kindle/Kobo/文石BOOX/小米多看',
    subtitleEn: 'Kindle/Kobo/BOOX/Xiaomi e-reader',
    gradientBg: 'from-amber-600 via-amber-500 to-yellow-500',
    icon: '📖',
    description: 'Amazon Kindle、Kindle Paperwhite、Kindle Oasis、Kobo、文石BOOX、小米多看——墨水屏碎裂、电池不耐用、系统卡顿死机。电子书阅读器专业维修。',
    descriptionEn: 'Amazon Kindle, Kindle Paperwhite, Kindle Oasis, Kobo, BOOX, Xiaomi e-reader — cracked e-ink screen, battery issues, system freeze. E-reader repair specialist.',
    repairs: [
      { title: '墨水屏更换', titleEn: 'E-ink Screen', desc: 'Kindle/电子书墨水屏碎裂、条纹、局部不显示。原装/兼容电子墨水屏更换，含校准。', descEn: 'Kindle/e-reader e-ink screen cracked, lines, partial display. OEM/compatible e-ink screen replacement with calibration.' },
      { title: '电池更换', titleEn: 'Battery Service', desc: '电子书电池不耐用、充不进电、续航大幅下降。原装规格电池更换。', descEn: 'E-reader battery drain, no charge, significantly reduced battery life. OEM spec battery replacement.' },
      { title: '充电口维修', titleEn: 'Charging Port', desc: 'Micro-USB/USB-C口松动、接触不良、不充电。尾插维修更换。', descEn: 'Micro-USB/USB-C port loose, bad contact, no charge. Port repair/replacement.' },
      { title: '系统刷机', titleEn: 'Flash/System', desc: 'Kindle卡大树、系统卡顿、死机。刷机恢复出厂，越狱服务。', descEn: 'Kindle stuck on tree screen, system lag, freeze. Flash restore, jailbreak service.' },
    ],
    brandPage: null,
  },
}

export default function TabletServiceDetail() {
  const { lang, setShowContact } = useSite();
  const params = useParams()
  const t = (zh, en) => lang === 'zh' ? zh : en

  const serviceId = params?.service || 'ipad'
  const info = serviceData[serviceId]
  const serviceIds = brandServiceIds[serviceId] || []

  if (!info) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">{t('服务未找到', 'Not Found')}</h1>
          <a href="/tablet-repair" className="text-blue-600 mt-4 inline-block">{t('← 返回平板维修', '← Back to Tablet Repair')}</a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb items={[
        { label: '平板维修', labelEn: 'Tablet Repair', href: '/tablet-repair' },
        { label: info.title, labelEn: info.titleEn },
      ]} />

      <section className={'bg-gradient-to-br ' + info.gradientBg + ' text-white'}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <div className="flex items-center gap-4 mb-2">
            <div className="text-4xl">{info.icon}</div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold">{lang === 'zh' ? info.title : info.titleEn}</h1>
              <p className="text-sm text-white/80">{lang === 'zh' ? info.subtitle : info.subtitleEn}</p>
            </div>
          </div>
          <p className="text-white/90 mt-4 max-w-2xl text-sm leading-relaxed">{lang === 'zh' ? info.description : info.descriptionEn}</p>
          <div className="flex flex-wrap gap-3 mt-6">
            <button onClick={() => setShowContact(true)} className="bg-white text-blue-600 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-blue-50 shadow-lg">
                {t("@数立即咨询", "@数Contact Now")}
              </button>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">{t('常见维修项目', 'Common Repairs')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {info.repairs.map((r, i) => {
              const href = info.brandPage && serviceIds[i] ? info.brandPage + '/' + serviceIds[i] : null
              const Component = href ? 'a' : 'div'
              const linkProps = href ? { href, className: 'bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all block' } : { className: 'bg-white rounded-2xl border border-gray-100 shadow-sm p-5' }
              return (
                <Component key={i} {...linkProps}>
                  <h3 className="font-bold text-gray-900 mb-1 text-sm">{lang === 'zh' ? r.title : r.titleEn}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{lang === 'zh' ? r.desc : r.descEn}</p>
                </Component>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-center text-gray-400 text-sm mb-4">{t('没找到你的型号？加微信问我，没列出来不代表不能修', 'Model not listed? DM me — not listed does not mean we cannot fix it')}</p>
          <div className="flex justify-center gap-3">
            <button onClick={() => setShowContact(true)} className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 shadow-md">
                {t("@数立即咨询", "@数Contact Now")}
              </button>
          </div>
        </div>
      </section>

    </div>
  )
}
