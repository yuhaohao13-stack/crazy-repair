import { readFileSync, writeFileSync, readdirSync, existsSync, copyFileSync, mkdirSync } from 'fs';
import { join, basename } from 'path';

const ROOT = '/Users/hy/.openclaw/workspace/crazy-repair';
const APP = join(ROOT, 'src/app');
const IMG = join(ROOT, 'public/images');
const SCR_IMG = join(ROOT, 'scraped/images');
const SCR_DATA = join(ROOT, 'scraped/all_images.json');

let scraped = {};
try { scraped = JSON.parse(readFileSync(SCR_DATA,'utf8')); } catch(e) {}

// Map scraped pages to brands
const PAGE_MAP = {
  'asus-rog-phone-repair': 'asus-repair',
  'google-pixel-phone-repair': 'google-repair',
  'honor-repair': 'honor-repair',
  'huawei-phone-repair': 'huawei-repair',
  'iphone-repair': 'iphone-repair',
  'oneplus-phone-repair': 'oneplus-repair',
  'oppo-repair': 'oppo-repair',
  'realme-repair': 'realme-repair',
  'samsung-phone-repair': 'samsung-repair',
  'vivo-repair': 'vivo-repair',
  'xiaomi-repair': 'xiaomi-repair',
  'macbook-repair': 'macbook-repair',
  'surface-pro-laptop-repair': 'surface-repair',
  'ipad-repair': 'tablet-repair',
  'watch-repair': 'watch-repair',
  'best-nothing-repair': 'google-repair',
};

function getScrapedImages(brandDir) {
  const urls = Object.entries(PAGE_MAP).filter(([,v]) => v === brandDir).map(([k]) => k);
  const files = new Set();
  for (const [,img] of Object.entries(scraped)) {
    const p = (img.page || '').replace(/^https:\/\/singapuramobilerepair\.com/, '');
    if (urls.some(u => p.includes(u))) files.add(img.file);
  }
  return [...files];
}

// Copy images
for (const d of readdirSync(APP)) {
  if (!d.endsWith('-repair')) continue;
  const files = getScrapedImages(d);
  if (!files.length) continue;
  let n = 0;
  for (const f of files) {
    const src = join(SCR_IMG, f);
    if (!existsSync(src)) continue;
    const ext = f.split('.').pop();
    const dst = join(IMG, `${d}-${++n}.${ext}`);
    copyFileSync(src, dst);
    process.stdout.write(` ${d}:${n}`);
    if (n >= 6) break; // max 6 per brand
  }
}
process.stdout.write('\nImages done\n');

// Brand content
const CONTENT = {
  'iphone-repair': {
    title: 'iPhone 维修', titleEn: 'iPhone Repair',
    tagline: '苹果 iPhone 全系列专业维修 | 威海环翠区', taglineEn: 'Professional iPhone Repair for All Models | Weihai',
    desc: 'iPhone换屏、换电池、修主板、修面容、处理进水——所有iPhone型号都能修。2007年至今奋斗在维修一线，经验丰富。先检测后报价，价格透明，30天质保。',
    descEn: 'iPhone screen replacement, battery swap, motherboard repair, Face ID fix, water damage — all models iPhone 6 through 16. Since 2007. Free diagnosis, 30-day warranty.',
    services: [
      { id:'screen-replacement', title:'屏幕更换', titleEn:'Screen Replacement', img:`/images/iphone-repair-1.jpg`,
        desc:'iPhone 16/15/14/13/12/11/X系列全兼容。OLED原装屏/LCD高性价比屏可选。含专业密封胶恢复防水性。30分钟快修。',
        descEn:'iPhone 16/15/14/13/12/11/X series. OEM OLED or LCD options. Waterproof sealant restored. 30min.' },
      { id:'battery-replacement', title:'电池更换', titleEn:'Battery Replacement', img:`/images/iphone-repair-2.jpg`,
        desc:'原装规格电池，容量达标不虚标。iPhone 6到16全系列电池现货。更换后检测健康度。告别一天三充。',
        descEn:'OEM spec batteries. iPhone 6 through 16 in stock. Health check after swap.' },
      { id:'water-damage', title:'进水维修', titleEn:'Water Damage', img:`/images/iphone-repair-3.jpg`,
        desc:'超声波清洗+主板烘干+腐蚀修复。进水越早送来越好，切勿插电充电！丰富的iPhone进水处理经验。',
        descEn:'Ultrasonic cleaning + board dry + corrosion repair. Bring ASAP, do NOT charge! Extensive water damage experience.' },
      { id:'motherboard-repair', title:'主板维修', titleEn:'Motherboard Repair', img:`/images/iphone-repair-4.jpg`,
        desc:'不开机、重启循环、无服务、WiFi蓝牙打不开、面容不可用。芯片级维修，CPU重焊、基带修复、硬盘扩容。',
        descEn:'No power, boot loop, no service, WiFi/BT dead, Face ID gone. Component-level repair.' },
      { id:'camera-repair', title:'摄像头维修', titleEn:'Camera Repair', img:`/images/iphone-repair-5.jpg`,
        desc:'拍照模糊、闪退、黑屏、对焦失灵。前后摄像头更换。iPhone 15/14/13/12/11/X全系。',
        descEn:'Blurry photos, app crash, black screen, autofocus fail. Front & back camera replacement.' },
      { id:'face-id', title:'面容/指纹修复', titleEn:'Face ID/Touch ID', img:`/images/iphone-repair-6.jpg`,
        desc:'面容ID点阵修复、前置摄像头排线。换屏后面容不能用也可修复。iPhone X及以上面容，SE/8及以下指纹。',
        descEn:'Face ID dot matrix repair. Works after screen swap. iPhone X+, SE/8 and below.' },
    ],
    models: ['iPhone 16 Pro Max / Pro / Plus / 16 / 16e','iPhone 15 Pro Max / Pro / Plus / 15','iPhone 14 Pro Max / Pro / Plus / 14','iPhone 13 Pro Max / Pro / 13 / 13 Mini','iPhone 12 Pro Max / Pro / 12 / 12 Mini','iPhone 11 Pro Max / Pro / 11 / SE 3/2','iPhone XS Max / XS / XR / X','iPhone 8 Plus / 8 / 7 Plus / 7 / 6s / 6','iPhone SE (2022/2020)'],
  },
  'samsung-repair': {
    title: 'Samsung 维修', titleEn: 'Samsung Repair',
    tagline: '三星 Galaxy 全系列专业维修 | 威海环翠区', taglineEn: 'Samsung Galaxy Repair for All Models | Weihai',
    desc: '三星手机换屏、换电池、修主板、折叠屏修复。Galaxy S25到S21全系列，Z Fold/Flip折叠屏内外屏均可修。2007年至今奋斗在维修一线。',
    descEn: 'Samsung screen replacement, battery, motherboard, foldable display repair. S25 through S21 series, Z Fold/Flip. Since 2007.',
    services: [
      { id:'screen-replacement', title:'屏幕更换', titleEn:'Screen Replacement', img:`/images/samsung-repair-1.jpg`,
        desc:'Samsung全系列屏幕更换。S系列OLED原装屏，折叠屏Z Fold6/Flip6/5/4/3内屏外屏均可修复。30分钟快修。',
        descEn:'Samsung full series screen. S series OLED. Foldable Z Fold6/Flip6/5/4/3 inner & outer.' },
      { id:'battery-replacement', title:'电池更换', titleEn:'Battery Replacement', img:`/images/samsung-repair-2.jpg`,
        desc:'Samsung原装规格电池，S25到S21全系列电池现货。A系列、Note系列、Z系列电池均有货。',
        descEn:'Samsung OEM batteries. S25 through S21, A series, Note, Z Fold/Flip series in stock.' },
      { id:'water-damage', title:'进水维修', titleEn:'Water Damage', img:`/images/samsung-repair-3.jpg`,
        desc:'超声波清洗+主板烘干+腐蚀修复。Samsung进水处理，IP68防水机型进水后仍需及时处理。',
        descEn:'Ultrasonic cleaning + board dry + corrosion repair. IP68 water resistance degrades over time.' },
      { id:'motherboard-repair', title:'主板维修', titleEn:'Motherboard Repair', img:`/images/samsung-repair-4.jpg`,
        desc:'不开机、重启循环、WiFi/蓝牙打不开。芯片级维修，Samsung全系列主板。',
        descEn:'No power, boot loop, WiFi/BT dead. Component-level repair for all Samsung models.' },
      { id:'camera-repair', title:'摄像头维修', titleEn:'Camera Repair', img:`/images/samsung-repair-5.jpg`,
        desc:'拍照模糊、黑屏、闪烁。S系列高像素摄像头更换维修，前置/后置均可。',
        descEn:'Blurry photos, black screen. S series high-res camera, front & back repair.' },
      { id:'charging-port', title:'充电口维修', titleEn:'Charging Port', img:`/images/samsung-repair-6.jpg`,
        desc:'充不进电、充电慢、Type-C接口松动。Samsung全系列Type-C充电口更换。',
        descEn:'Wont charge, slow charging, loose USB-C port. Full series charging port repair.' },
    ],
    models: ['Galaxy S25 Ultra / S25+ / S25','Galaxy S24 FE / S24 Ultra / S24+ / S24','Galaxy S23 Ultra / S23+ / S23 / S23 FE','Galaxy S22 Ultra / S22+ / S22','Galaxy S21 Ultra / S21+ / S21 / S21 FE','Galaxy Z Fold6 / Z Fold5 / Z Fold4 / Z Fold3','Galaxy Z Flip6 / Z Flip5 / Z Flip4 / Z Flip3','Galaxy A56 / A55 / A36 / A35 / A26 / A25 / A16','Galaxy Note20 Ultra / Note20'],
  },
};

// Generate page content
function t(tag, zh, en) {
  if (tag === 'zh') return zh;
  return en;
}

const FILES = {};

for (const [brand, data] of Object.entries(CONTENT)) {
  const services = data.services.map(s => 
    `    {id:'${s.id}', title:'${s.title}', titleEn:'${s.titleEn}', img:'${s.img}', desc:'${s.desc}', descEn:'${s.descEn}'}`
  ).join(',\n');
  
  const models = data.models.map(m => `      t('${m}', '${m}')`).join(',\n');
  
  FILES[brand] = `'use client'
import { useState } from 'react'
import { ArrowLeft, Smartphone, Battery, Droplets, Cpu, Camera, ChevronDown } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ContactModal from '../../components/ContactModal'
import Image from 'next/image'

export default function ${brand.replace('-repair','').replace(/^[a-z]/,c=>c.toUpperCase())}Repair() {
  const [showContact, setShowContact] = useState(false)
  const [lang, setLang] = useState('zh')
  const t = (zh, en) => lang === 'zh' ? zh : en
  
  const services = [
${services}
  ]
  
  const models = [
${models}
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar lang={lang} setLang={setLang} setShowContact={setShowContact} />
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4">
          <a href="/phone-repair" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-medium transition-colors">
            <ArrowLeft size={15} /> {t('手机品牌', 'Phone Brands')}
          </a>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">{t('${data.title}', '${data.titleEn}')}</h1>
            <p className="text-blue-200 text-xl mb-4">{t('${data.tagline}', '${data.taglineEn}')}</p>
            <p className="text-blue-100 leading-relaxed">
              {t('${data.desc}', '${data.descEn}')}
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <button onClick={() => setShowContact(true)} className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-lg">
                {t('📱 微信咨询维修', '📱 WeChat for Repair')}
              </button>
              <a href="https://wa.me/6596146709?text=我的${data.titleEn.replace(/[^a-zA-Z0-9 ]/g,'')}需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-600 transition-colors shadow-lg">
                {t('💬 WhatsApp咨询', '💬 WhatsApp')}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">{t('维修服务', 'Repair Services')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all group">
                <div className="relative h-48 bg-gray-100">
                  <Image src={s.img} alt={t(s.title, s.titleEn)} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width:768px)100vw,33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 text-blue-600 font-bold text-sm">{t(s.title, s.titleEn)}</div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-gray-500 leading-relaxed">{t(s.desc, s.descEn)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t('支持型号', 'Supported Models')}</h2>
          <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="grid grid-cols-2 gap-3">
              {models.map((m, i) => (
                <div key={i} className="flex items-center gap-2 text-sm"><span className="text-blue-500 shrink-0">▸</span><span className="text-gray-700">{m}</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('有问题？找我', 'Issues? Hit me up')}</h2>
          <p className="text-blue-200 mb-8">{t('免费检测，先报价后维修。添加微信发张照片就能初步判断。', 'Free diagnosis. Add WeChat, send a photo for a quick assessment.')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setShowContact(true)} className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors shadow-lg text-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
            <a href="https://wa.me/6596146709?text=需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-green-600 transition-colors shadow-lg text-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
          </div>
        </div>
      </section>
      <Footer lang={lang} />
      <ContactModal show={showContact} setShow={setShowContact} lang={lang} />
    </div>
  )
}
`;
  writeFileSync(join(APP, brand, 'page.jsx'), FILES[brand]);
  process.stdout.write(` ${brand}`);
}
process.stdout.write('\nPages done\n');

// Git push
process.stdout.write('Pushing to GitHub...\n');
