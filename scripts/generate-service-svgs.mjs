#!/usr/bin/env node

import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = join(__dirname, '..')
const IMG_DIR = join(PROJECT_ROOT, 'public', 'images', 'services')

const brands = {
  'acer-repair': { name: 'Acer', cn: '宏基', type: 'laptop', color: '#4ade80' },
  'asus-repair': { name: 'ASUS', cn: '华硕', type: 'laptop', color: '#22d3ee' },
  'dell-repair': { name: 'Dell', cn: '戴尔', type: 'laptop', color: '#60a5fa' },
  'google-repair': { name: 'Google Pixel', cn: '谷歌', type: 'phone', color: '#a78bfa' },
  'hasee-repair': { name: 'Hasee', cn: '神舟', type: 'laptop', color: '#818cf8' },
  'honor-repair': { name: 'Honor', cn: '荣耀', type: 'phone', color: '#2dd4bf' },
  'hp-repair': { name: 'HP', cn: '惠普', type: 'laptop', color: '#2dd4bf' },
  'huawei-repair': { name: 'Huawei', cn: '华为', type: 'phone', color: '#f87171' },
  'iphone-repair': { name: 'Apple iPhone', cn: '苹果', type: 'phone', color: '#60a5fa' },
  'lenovo-repair': { name: 'Lenovo', cn: '联想', type: 'laptop', color: '#60a5fa' },
  'macbook-repair': { name: 'Apple MacBook', cn: '苹果', type: 'laptop', color: '#9ca3af' },
  'msi-repair': { name: 'MSI', cn: '微星', type: 'laptop', color: '#f87171' },
  'oneplus-repair': { name: 'OnePlus', cn: '一加', type: 'phone', color: '#f87171' },
  'oppo-repair': { name: 'OPPO', cn: 'OPPO', type: 'phone', color: '#4ade80' },
  'realme-repair': { name: 'Realme', cn: '真我', type: 'phone', color: '#fbbf24' },
  'samsung-repair': { name: 'Samsung', cn: '三星', type: 'phone', color: '#a78bfa' },
  'surface-repair': { name: 'Microsoft Surface', cn: '微软', type: 'laptop', color: '#9ca3af' },
  'vivo-repair': { name: 'VIVO', cn: 'vivo', type: 'phone', color: '#22d3ee' },
  'xiaomi-repair': { name: 'Xiaomi', cn: '小米', type: 'phone', color: '#f97316' },
}

function genPhone(color) {
  return `<g transform="translate(400,280)">
    <rect x="-100" y="-180" width="200" height="360" rx="30" fill="#1f2937" stroke="${color}" stroke-width="2"/>
    <rect x="-85" y="-160" width="170" height="300" rx="15" fill="#111827"/>
    <rect x="-60" y="-130" width="120" height="40" rx="5" fill="#374151"/>
    <circle cx="-40" cy="-80" r="20" fill="#374151"/>
    <rect x="-10" y="-90" width="60" height="20" rx="3" fill="#374151"/>
    <circle cx="-40" cy="-30" r="15" fill="#374151"/>
    <rect x="-15" y="-40" width="50" height="15" rx="3" fill="#374151"/>
    <rect x="-15" y="140" width="30" height="8" rx="4" fill="#374151"/>
    <rect x="-40" y="-170" width="80" height="20" rx="10" fill="#111827"/>
  </g>`
}

function genLaptop(color) {
  return `<g transform="translate(400,280)">
    <rect x="-140" y="-150" width="280" height="200" rx="12" fill="#1f2937" stroke="${color}" stroke-width="2"/>
    <rect x="-125" y="-135" width="250" height="170" rx="8" fill="#111827"/>
    <rect x="-90" y="-100" width="180" height="30" rx="5" fill="#374151"/>
    <rect x="-90" y="-55" width="80" height="15" rx="3" fill="#374151"/>
    <rect x="-90" y="-30" width="120" height="15" rx="3" fill="#374151"/>
    <rect x="-90" y="-5" width="60" height="15" rx="3" fill="#374151"/>
    <rect x="-130" y="50" width="260" height="12" rx="4" fill="#374151"/>
    <rect x="-150" y="58" width="300" height="150" rx="10" fill="#1f2937" stroke="${color}" stroke-width="1.5"/>
    <rect x="-130" y="75" width="260" height="110" rx="6" fill="#111827"/>
    ${(() => { let k='';for(let r=0;r<4;r++)for(let c=0;c<7;c++)k+=`<rect x="${-120+c*30}" y="${80+r*18}" width="25" height="13" rx="2" fill="#374151"/>`;return k})()}
    <rect x="-40" y="155" width="80" height="40" rx="5" fill="#374151"/>
  </g>`
}

function genOverlay(serviceId, color) {
  const m = {
    'screen-replacement': ['🔍 屏幕更换', `M0,-55 C20,-40 25,-15 0,5 C-25,-15 -20,-40 0,-55Z`, true],
    'battery-replacement': ['🔋 电池更换', `M-30,-45 h60 v40 h-60z`, true],
    'water-damage': ['💧 进水维修', `M0,-55 C20,-40 25,-15 0,5 C-25,-15 -20,-40 0,-55Z`, true],
    'motherboard-repair': ['🔬 主板维修', `M-50,-40 h100 v80 h-100z`, true],
    'camera-repair': ['📷 摄像头', `M0,-50 c-27,0 -50,23 -50,50 c0,27 23,50 50,50`, true],
    'face-id': ['👤 面容/指纹', `M0,-50 c-27,0 -50,23 -50,50 c0,27 23,50 50,50`, true],
    'charging-port': ['🔌 充电口', `M-20,-15 h40 v30 h-40z`, true],
    'keyboard-repair': ['⌨️ 键盘', `M-60,-40 h120 v80 h-120z`, true],
    'back-glass': ['🔄 后盖', `M-50,-70 h100 v140 h-100z`, true],
    'cleaning': ['🧹 清灰', `M0,-45 c-24,0 -45,21 -45,45`, true],
    'flash-unlock': ['⚡ 刷机', `M-35,-55 h70 v110 h-70z`, true],
    'os-upgrade': ['💿 系统重装', `M-55,-50 h110 v75 h-110z`, true],
    'other-issues': ['🔧 检测', `M-45,-30 h90 v60 h-90z`, true],
  }
  const info = m[serviceId]
  if (!info) return `<text x="400" y="130" text-anchor="middle" fill="white" font-size="20" font-family="system-ui,sans-serif">${serviceId}</text>`
  
  const [label] = info
  return `<g transform="translate(400,90)">
    <circle cx="0" cy="0" r="55" fill="none" stroke="white" stroke-width="2.5" opacity="0.3"/>
    <circle cx="0" cy="0" r="45" fill="none" stroke="${color}" stroke-width="1.5" stroke-dasharray="4,4" opacity="0.5"/>
    <text text-anchor="middle" font-family="system-ui,sans-serif" font-size="28" fill="white" dy="10">${label.slice(0,2)}</text>
    <g transform="translate(0, 80)">
      <rect x="-85" y="-16" width="170" height="32" rx="16" fill="${color}" opacity="0.85"/>
      <text text-anchor="middle" font-family="system-ui,sans-serif" font-size="14" font-weight="bold" fill="white" dy="6">${label}</text>
    </g>
  </g>`
}

function escapeXml(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') }

function renderSVG(brandName, serviceId, color, deviceSvg, overlaySvg) {
  const sl = {'screen-replacement':'屏幕更换','battery-replacement':'电池更换','water-damage':'进水维修','motherboard-repair':'主板维修','camera-repair':'摄像头维修','face-id':'面容/指纹','charging-port':'充电口','keyboard-repair':'键盘','back-glass':'后盖','cleaning':'清灰换硅脂','flash-unlock':'刷机/解锁','os-upgrade':'系统重装','other-issues':'其他故障'}[serviceId]||serviceId
  
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#bg)"/>
  <circle cx="100" cy="100" r="80" fill="${color}" opacity="0.05"/>
  <circle cx="680" cy="500" r="100" fill="${color}" opacity="0.05"/>
  <g transform="translate(400,30)">
    <rect x="-100" y="-16" width="200" height="32" rx="16" fill="${color}" opacity="0.15"/>
    <text text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="bold" fill="${color}" dy="5">${escapeXml(brandName)}</text>
  </g>
  ${deviceSvg}
  ${overlaySvg}
  <g transform="translate(400,565)">
    <text text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#475569">${escapeXml(sl)} · Crazy维修 · 免费检测 · 30天质保</text>
  </g>
</svg>`
}

async function main() {
  console.log('生成维修服务SVG插画...\n')
  mkdirSync(IMG_DIR, { recursive: true })
  
  const mod = await import(join(PROJECT_ROOT, 'src', 'data', 'repairServices.js'))
  const rs = mod.repairServices
  let total = 0
  
  for (const [brandKey, data] of Object.entries(rs)) {
    const brandDir = brandKey + '-repair'
    const bi = brands[brandDir]
    if (!bi) { console.log('skip ' + brandDir); continue }
    
    const svcs = data.services || []
    const deviceSvg = bi.type === 'phone' ? genPhone(bi.color) : genLaptop(bi.color)
    
    for (const svc of svcs) {
      const osvg = genOverlay(svc.id, bi.color)
      const svg = renderSVG(bi.name + ' (' + bi.cn + ')', svc.id, bi.color, deviceSvg, osvg)
      const fp = join(IMG_DIR, brandDir + '-' + svc.id + '.svg')
      writeFileSync(fp, svg)
      total++
      process.stdout.write('.')
    }
  }
  
  console.log('\n\n完成: ' + total + ' 张SVG\n')
}

main().catch(e => { console.error(e); process.exit(1) })
