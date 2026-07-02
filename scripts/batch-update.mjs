/**
 * Batch update: add images + enrich content for all brand repair pages
 * Run: node scripts/batch-update.mjs
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, copyFileSync, mkdirSync } from 'fs';
import { join, basename } from 'path';

const APP = '/Users/hy/.openclaw/workspace/crazy-repair/src/app';
const PUBLIC_IMG = '/Users/hy/.openclaw/workspace/crazy-repair/public/images';
const SCRAPED_IMG = '/Users/hy/.openclaw/workspace/crazy-repair/scraped/images';
const SCRAPED_DATA = '/Users/hy/.openclaw/workspace/crazy-repair/scraped/all_images.json';

// Load scraped image mapping
let scrapedMap = {};
try {
  const raw = readFileSync(SCRAPED_DATA, 'utf8');
  scrapedMap = JSON.parse(raw);
} catch(e) {
  console.error('Cannot load scraped image data:', e.message);
}

// Brand → scraped page URL mapping (based on scraped data)
const BRAND_SCRAPE_MAP = {
  'iphone-repair': ['/iphone-repair/', '/iphone-screen-glass-repair-replacement/', '/iphone-lcd-display-repair-replacement/', '/iphone-battery-replacement-repair-replacement/', '/iphone-charging-port-repair-replacement/', '/iphone-cant-on-motherboard-repair-replacement/', '/iphone-camera-lens-repair-replacement/', '/iphone-water-damage-repair-replacement/'],
  'samsung-repair': ['/samsung-phone-repair/', '/best-samsung-repair-singapore/'],
  'xiaomi-repair': ['/best-xiaomi-repair-singapore/'],
  'oppo-repair': ['/best-oppo-repair-singapore/'],
  'vivo-repair': ['/best-vivo-repair-singapore/'],
  'huawei-repair': ['/huawei-phone-repair/'],
  'oneplus-repair': ['/oneplus-phone-repair/'],
  'realme-repair': ['/realme-phone-repair/'],
  'google-repair': ['/google-pixel-phone-repair/'],
  'honor-repair': ['/best-honor-repair-singapore/'],
  'asus-repair': ['/asus-rog-phone-repair/'],
  'macbook-repair': ['/macbook-repair/', '/best-macbook-repair-singapore/'],
  'surface-repair': ['/microsoft-surface-pro-laptop-repair/'],
  'tablet-repair': ['/apple-ipad-repair-singapore/'],
  'watch-repair': ['/apple-watch-repair-singapore/'],
  'phone-repair': ['/phone-repair/', '/a-z-phone-repair-directory/'],
};

// Get scraped images for a brand
function getScrapedImagesForBrand(brand) {
  const urls = BRAND_SCRAPE_MAP[brand] || [];
  const images = new Set();
  for (const [id, img] of Object.entries(scrapedMap)) {
    const page = img.page || '';
    if (urls.some(u => page === u)) {
      images.add(img.file);
    }
  }
  return [...images];
}

// Copy scraped images to public with brand prefix
function copyImagesToPublic(brand, images) {
  const copied = [];
  for (const imgFile of images) {
    const src = join(SCRAPED_IMG, imgFile);
    if (!existsSync(src)) continue;
    const ext = imgFile.split('.').pop();
    const dstName = `${brand}-${copied.length + 1}.${ext}`;
    const dst = join(PUBLIC_IMG, dstName);
    try {
      copyFileSync(src, dst);
      copied.push(dstName);
    } catch(e) {
      // skip
    }
  }
  return copied;
}

// Brand-specific enriched content and models
const BRAND_CONTENT = {
  'iphone-repair': {
    heroDesc: {
      zh: 'iPhone换屏、换电池、修主板、修面容、处理进水——所有iPhone型号都能修。2007年至今奋斗在维修一线，经验丰富。先检测后报价，价格透明，30天质保。支持iPhone 16系列、15系列、14系列、13系列、12系列、11系列、X系列及更早机型。',
      en: 'iPhone screen replacement, battery swap, motherboard repair, Face ID fix, water damage treatment — all models iPhone 6 through iPhone 16 series supported. On the repair frontline since 2007. Free diagnosis, transparent pricing, 30-day warranty.'
    },
    services: [
      { id: 'screen-replacement', title: '屏幕更换', titleEn: 'Screen Replacement', 
        desc: 'iPhone 16/15/14/13/12/11/X系列全兼容。OLED原装/LCD高性价比可选。含专业密封胶恢复防水性。30分钟快修。支持iPhone 16 Pro Max/Pro/Plus/16，iPhone 15 Pro Max/Pro/Plus/15，iPhone 14/13/12全系列，iPhone 11/XS/XR/X，及iPhone 8/7/6s/6/SE系列。',
        descEn: 'iPhone 16/15/14/13/12/11/X series compatible. OEM OLED or high-quality LCD options. Waterproof sealant restored. 30-min service. Supports iPhone 16 Pro Max/Pro/Plus/16 through iPhone SE 3/2.' },
      { id: 'battery-replacement', title: '电池更换', titleEn: 'Battery Replacement',
        desc: '原装规格电池，容量达标不虚标。iPhone 6到16全系列电池现货。更换后检测健康度。告别一天三充。支持iPhone 16/15/14/13/12/11/X/8/7/6s全系列电池更换。',
        descEn: 'OEM spec batteries, accurate capacity. iPhone 6 through 16 full series in stock. Health check after swap. Say goodbye to battery anxiety.' },
      { id: 'water-damage', title: '进水维修', titleEn: 'Water Damage Repair',
        desc: '超声波清洗+主板烘干+腐蚀修复。iPhone进水越早送来越好，切勿插电充电！丰富的iPhone进水处理经验。所有iPhone型号进水均可处理。',
        descEn: 'Ultrasonic cleaning + board dry + corrosion repair. Bring ASAP, do NOT charge! Extensive iPhone water damage experience for all models.' },
      { id: 'motherboard-repair', title: '主板维修', titleEn: 'Motherboard Repair',
        desc: '不开机、重启循环、无服务、WiFi蓝牙打不开、面容不可用。芯片级维修，CPU重焊、基带修复、硬盘扩容。支持iPhone 16到6全系主板维修。',
        descEn: 'No power, boot loop, no service, WiFi/BT dead, Face ID gone. Component-level: CPU reball, baseband fix, storage upgrade.' },
      { id: 'camera-repair', title: '摄像头维修', titleEn: 'Camera Repair',
        desc: '拍照模糊、闪退、黑屏、对焦失灵。前后摄像头更换。iPhone 16/15/14/13/12/11/X全系摄像头维修。',
        descEn: 'Blurry photos, app crash, black screen, autofocus fail. Front & back camera replacement. iPhone 16/15/14/13/12/11/X series.' },
      { id: 'face-id', title: '面容/指纹修复', titleEn: 'Face ID/Touch ID',
        desc: '面容ID点阵修复、前置摄像头排线。换屏后面容不能用也可修复。iPhone X及以上面容，SE/8及以下指纹。',
        descEn: 'Face ID dot matrix repair, front camera flex. Works after screen swap. Face ID for iPhone X+, Touch ID for SE/8 and below.' },
    ],
    models: [
      'iPhone 16 Pro Max / Pro / Plus / 16 / 16e',
      'iPhone 15 Pro Max / Pro / Plus / 15',
      'iPhone 14 Pro Max / Pro / Plus / 14',
      'iPhone 13 Pro Max / Pro / 13 / 13 Mini',
      'iPhone 12 Pro Max / Pro / 12 / 12 Mini',
      'iPhone 11 Pro Max / Pro / 11 / SE 3/2',
      'iPhone XS Max / XS / XR / X',
      'iPhone 8 Plus / 8 / 7 Plus / 7 / 6s / 6',
      'iPhone SE (2022/2020/2016)'
    ],
    faq: [
      { q: '换iPhone屏幕多少钱？', a: '价格因型号而异，iPhone 6/7/8系列从¥100起；iPhone 15/16 Pro Max OLED屏会贵一些。具体加微信发型号报价。',
        qEn: 'How much for iPhone screen replacement?', aEn: 'Price varies by model. iPhone 6/7/8 from ¥100. iPhone 15/16 Pro Max OLED is more expensive. DM me your model on WeChat.' },
      { q: 'iPhone电池健康度多少需要换？', a: '低于80%建议更换，如果觉得续航明显不够用也可以换。低健康度还会引起降频卡顿。',
        qEn: 'When to replace iPhone battery?', aEn: 'Below 80% health recommended. Low health also causes throttling and lag.' },
    ]
  },
  'samsung-repair': {
    heroDesc: {
      zh: '三星Galaxy手机全系列专业维修，S25/S24/S23/S22/S21系列、Z Fold6/Flip6折叠屏、A系列。屏幕更换、电池更换、主板维修、进水处理。2007年至今奋斗在维修一线。免费检测，先报价后维修。',
      en: 'Samsung Galaxy full series professional repair. S25/S24/S23/S22/S21 series, Z Fold6/Flip6 foldables, A series. Screen replacement, battery, motherboard, water damage. Free diagnosis since 2007.'
    },
    services: [
      { id: 'screen-replacement', title: '屏幕更换', titleEn: 'Screen Replacement',
        desc: 'Samsung全系列屏幕更换。S系列OLED原装屏，A系列LCD高性价比。折叠屏Z Fold6/Flip6/5/4/3内屏外屏均可修复。30分钟快修。',
        descEn: 'Samsung full series screen replacement. S series OLED, A series LCD, Foldable screens Z Fold6/5/4/3, Flip6/5/4/3 inner & outer.' },
      { id: 'battery-replacement', title: '电池更换', titleEn: 'Battery Replacement',
        desc: 'Samsung原装规格电池，S25到S21全系列电池现货。A系列、Note系列、Z系列电池均有货。更换后检测健康度。',
        descEn: 'OEM spec Samsung batteries. S25 through S21, A series, Note series, Z Fold/Flip series in stock.' },
      { id: 'water-damage', title: '进水维修', titleEn: 'Water Damage',
        desc: '超声波清洗+主板烘干+腐蚀修复。Samsung进水处理经验丰富。IP68防水机型进水后仍需及时处理。',
        descEn: 'Ultrasonic cleaning + board dry + corrosion repair. Extensive Samsung water damage experience.' },
      { id: 'motherboard-repair', title: '主板维修', titleEn: 'Motherboard Repair',
        desc: '不开机、重启、WiFi蓝牙打不开。芯片级维修。Samsung全系列主板维修。',
        descEn: 'No power, boot loop, WiFi/BT dead. Component-level repair for all Samsung models.' },
      { id: 'camera-repair', title: '摄像头维修', titleEn: 'Camera Repair',
        desc: '拍照模糊、黑屏、闪烁。S系列高像素摄像头、A系列摄像头更换维修。',
        descEn: 'Blurry photos, black screen, flickering. S series high-res camera, A series camera repair.' },
      { id: 'charging-port', title: '充电口维修', titleEn: 'Charging Port',
        desc: '充不进电、充电慢、Type-C接口松动。Samsung全系列Type-C充电口更换。',
        descEn: 'Wont charge, slow charging, loose Type-C port. Samsung full series USB-C port repair.' },
    ],
    models: [
      'Samsung Galaxy S25 Ultra / S25+ / S25',
      'Samsung Galaxy S24 FE / S24 Ultra / S24+ / S24',
      'Samsung Galaxy S23 Ultra / S23+ / S23 / S23 FE',
      'Samsung Galaxy S22 Ultra / S22+ / S22',
      'Samsung Galaxy S21 Ultra / S21+ / S21 / S21 FE',
      'Samsung Galaxy Z Fold6 / Z Fold5 / Z Fold4 / Z Fold3',
      'Samsung Galaxy Z Flip6 / Z Flip5 / Z Flip4 / Z Flip3',
      'Samsung Galaxy A56 / A55 / A36 / A35 / A26 / A25 / A16',
      'Samsung Galaxy Note20 Ultra / Note20'
    ],
  },
};

// Brand color gradients (matching existing pattern)
const BRAND_COLORS = {
  'acer-repair': { bg: 'from-green-700 via-green-600 to-green-500', accent: 'green' },
  'asus-repair': { bg: 'from-purple-700 via-purple-600 to-purple-500', accent: 'purple' },
  'dell-repair': { bg: 'from-blue-800 via-blue-700 to-blue-600', accent: 'blue' },
  'google-repair': { bg: 'from-indigo-700 via-indigo-600 to-indigo-500', accent: 'indigo' },
  'hasee-repair': { bg: 'from-red-700 via-red-600 to-red-500', accent: 'red' },
  'honor-repair': { bg: 'from-cyan-700 via-cyan-600 to-cyan-500', accent: 'cyan' },
  'hp-repair': { bg: 'from-sky-700 via-sky-600 to-sky-500', accent: 'sky' },
  'huawei-repair': { bg: 'from-red-700 via-red-600 to-red-500', accent: 'red' },
  'iphone-repair': { bg: 'from-blue-700 via-blue-600 to-blue-500', accent: 'blue' },
  'lenovo-repair': { bg: 'from-orange-700 via-orange-600 to-orange-500', accent: 'orange' },
  'macbook-repair': { bg: 'from-gray-800 via-gray-700 to-gray-600', accent: 'gray' },
  'msi-repair': { bg: 'from-red-800 via-red-700 to-red-600', accent: 'red' },
  'oneplus-repair': { bg: 'from-red-700 via-red-600 to-red-500', accent: 'red' },
  'oppo-repair': { bg: 'from-green-700 via-green-600 to-green-500', accent: 'green' },
  'realme-repair': { bg: 'from-yellow-700 via-yellow-600 to-yellow-500', accent: 'yellow' },
  'samsung-repair': { bg: 'from-blue-800 via-blue-700 to-blue-600', accent: 'blue' },
  'surface-repair': { bg: 'from-gray-700 via-gray-600 to-gray-500', accent: 'gray' },
  'vivo-repair': { bg: 'from-blue-700 via-blue-600 to-blue-500', accent: 'blue' },
  'xiaomi-repair': { bg: 'from-orange-700 via-orange-600 to-orange-500', accent: 'orange' },
  'camera-repair': { bg: 'from-gray-700 via-gray-600 to-gray-500', accent: 'gray' },
  'watch-repair': { bg: 'from-gray-800 via-gray-700 to-gray-600', accent: 'gray' },
  'headphone-repair': { bg: 'from-indigo-700 via-indigo-600 to-indigo-500', accent: 'indigo' },
  'tablet-repair': { bg: 'from-blue-700 via-blue-600 to-blue-500', accent: 'blue' },
  'console-repair': { bg: 'from-green-800 via-green-700 to-green-600', accent: 'green' },
  'nintendo-repair': { bg: 'from-red-700 via-red-600 to-red-500', accent: 'red' },
  'sony-repair': { bg: 'from-blue-700 via-blue-600 to-blue-500', accent: 'blue' },
  'kindle-repair': { bg: 'from-gray-700 via-gray-600 to-gray-500', accent: 'gray' },
  'other-repair': { bg: 'from-gray-700 via-gray-600 to-gray-500', accent: 'gray' },
  'phone-repair': { bg: 'from-blue-700 via-blue-600 to-blue-500', accent: 'blue' },
  'computer-repair': { bg: 'from-gray-800 via-gray-700 to-gray-600', accent: 'gray' },
};

// Generate a brand page with images
function generateBrandPage(brand, content) {
  const colors = BRAND_COLORS[brand] || { bg: 'from-blue-700 via-blue-600 to-blue-500', accent: 'blue' };
  const brandName = brand.replace('-repair', '');
  const brandTitle = brandName.charAt(0).toUpperCase() + brandName.slice(1);
  
  let serviceCards = '';
  const services = content.services || [];
  const models = content.models || [];
  const faq = content.faq || [];
  
  // Generate service cards with images
  for (const s of services) {
    const imgFile = `${brand}-${s.id}.jpg`;
    const imgPath = `/images/${imgFile}`;
    serviceCards += `            {id:'${s.id}', title:'${s.title}', titleEn:'${s.titleEn}', 
              desc:'${s.desc}', descEn:'${s.descEn}', img:'${imgPath}'},\n`;
  }

  // Generate models list
  let modelsCode = '';
  for (const m of models) {
    modelsCode += `    t('${m}', '${m}'),\n`;
  }

  // Generate FAQ
  let faqCode = '';
  for (const f of faq) {
    faqCode += `{ q: t('${f.q}', '${f.qEn || f.q}'), a: t('${f.a}', '${f.aEn || f.a}') },\n`;
  }

  return `'use client'
import { useState } from 'react'
import { ArrowLeft, Smartphone, Battery, Droplets, Cpu, Camera, ChevronDown, Star } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ContactModal from '../../components/ContactModal'
import Image from 'next/image'

export default function ${brandTitle.replace(/[^a-zA-Z0-9]/g, '')}Repair() {
  const [showContact, setShowContact] = useState(false)
  const [lang, setLang] = useState('zh')
  const t = (zh, en) => lang === 'zh' ? zh : en

  const services = [
${serviceCards}  ]

  const models = [
${modelsCode}  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar lang={lang} setLang={setLang} setShowContact={setShowContact} />

      {/* Hero */}
      <section className="bg-gradient-to-br ${colors.bg} text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4">
          <a href="/${brand.includes('phone') || brand.includes('computer') ? '' : brand.includes('iphone') || brand.includes('samsung') || brand.includes('huawei') || brand.includes('xiaomi') || brand.includes('oppo') || brand.includes('vivo') || brand.includes('oneplus') || brand.includes('realme') || brand.includes('google') || brand.includes('honor') ? '/phone-repair' : brand.includes('macbook') || brand.includes('dell') || brand.includes('hp') || brand.includes('lenovo') || brand.includes('acer') || brand.includes('asus') || brand.includes('msi') || brand.includes('hasee') || brand.includes('surface') ? '/computer-repair' : '/'}" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-medium transition-colors">
            <ArrowLeft size={15} /> {t('返回', 'Back')}
          </a>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">{t('${brandTitle} 维修', '${brandTitle} Repair')}</h1>
            <p className="text-${colors.accent}-200 text-xl mb-4">{t('${brandTitle} 全系列专业维修 | 威海', 'Professional ${brandTitle} Repair | Weihai')}</p>
            <p className="text-${colors.accent}-100 leading-relaxed">
              {t('${(content.heroDesc && content.heroDesc.zh) || brandTitle + '全系列专业维修，屏幕更换、电池更换、主板维修、进水处理。2007年至今奋斗在维修一线。免费检测，先报价后维修。'}', '${(content.heroDesc && content.heroDesc.en) || brandTitle + ' full series professional repair. On the repair frontline since 2007. Free diagnosis, transparent pricing.'}')}
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <button onClick={() => setShowContact(true)} className="bg-white text-${colors.accent}-600 font-semibold px-6 py-3 rounded-xl hover:bg-${colors.accent}-50 transition-colors shadow-lg">
                {t('📱 微信咨询维修', '📱 WeChat for Repair')}
              </button>
              <a href="https://wa.me/6596146709?text=我的${brandTitle}需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-600 transition-colors shadow-lg">
                {t('💬 WhatsApp咨询', '💬 WhatsApp')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 服务列表 */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">{t('${brandTitle} 维修服务', '${brandTitle} Repair Services')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <a key={i} href={'/${brand}/' + s.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all block group">
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <Image 
                    src={s.img} 
                    alt={lang === 'zh' ? s.title : s.titleEn}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-2">{t(s.title, s.titleEn)}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{t(s.desc, s.descEn)}</p>
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
          <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {models.map((m, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <span className="text-${colors.accent}-500 shrink-0">▸</span>
                  <span className="text-gray-700">{m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

${faq.length > 0 ? `      {/* 常见问题 */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">{t('${brandTitle} 维修常见问题', '${brandTitle} Repair FAQ')}</h2>
          <div className="space-y-4">
            {[
${faqCode}            ].map((faqItem, i) => (
              <details key={i} className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none">
                  <span className="font-medium text-gray-900 text-sm sm:text-base">{faqItem.q}</span>
                  <ChevronDown size={18} className="text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                  <p className="text-gray-500 text-sm leading-relaxed">{faqItem.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>` : ''}

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br ${colors.bg} text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('${brandTitle} 有问题？找我', '${brandTitle} issues? Hit me up')}</h2>
          <p className="text-${colors.accent}-200 mb-8">{t('免费检测，先报价后维修。添加微信发张照片就能初步判断。', 'Free diagnosis. Add WeChat, send a photo for a quick assessment.')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setShowContact(true)} className="bg-white text-${colors.accent}-600 font-semibold px-8 py-4 rounded-xl hover:bg-${colors.accent}-50 transition-colors shadow-lg text-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
            <a href="https://wa.me/6596146709?text=我的${brandTitle}需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-green-600 transition-colors shadow-lg text-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
      <ContactModal show={showContact} setShow={setShowContact} lang={lang} />
    </div>
  )
}
`;
}

// Main
console.log('Starting batch update...');
console.log(`Existing public images: ${readdirSync(PUBLIC_IMG).length}`);
console.log(`Scraped images: ${readdirSync(SCRAPED_IMG).length}`);

// Get list of all brand page directories
const pages = readdirSync(APP).filter(d => d.endsWith('-repair') && existsSync(join(APP, d, 'page.jsx')));
console.log(`\nFound ${pages.length} brand pages to process`);

// Copy images first
let totalImagesCopied = 0;
for (const brand of pages) {
  const scrapedImages = getScrapedImagesForBrand(brand);
  if (scrapedImages.length > 0) {
    const copied = copyImagesToPublic(brand, scrapedImages);
    totalImagesCopied += copied.length;
    console.log(`  ${brand}: ${copied.length} images mapped from scraped data`);
  }
}
console.log(`\nTotal images copied: ${totalImagesCopied}`);

// Generate pages with content
let updatedPages = 0;
for (const brand of pages) {
  const content = BRAND_CONTENT[brand];
  if (!content) {
    console.log(`  ${brand}: no enriched content defined, skipping`);
    continue;
  }
  
  const pageCode = generateBrandPage(brand, content);
  const filePath = join(APP, brand, 'page.jsx');
  writeFileSync(filePath, pageCode);
  updatedPages++;
  console.log(`  ${brand}: page generated (${pageCode.length} bytes)`);
}

console.log(`\nDone! Updated ${updatedPages} brand pages.`);
console.log(`Next: generate placeholder images for missing brands or use existing images.`);
