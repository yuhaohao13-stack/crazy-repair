#!/usr/bin/env node

/**
 * 维修服务 SVG 插画生成器
 * 为每个品牌+服务生成对应的维修场景SVG插画
 * 展示：手机/电脑 + 维修工具 + 维修项目
 */

import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = join(__dirname, '..')
const IMG_DIR = join(PROJECT_ROOT, 'public', 'images', 'services')

// 品牌及设备类型
const brands = {
  'acer-repair':    { name: 'Acer', cn: '宏基', type: 'laptop', color: '#4ade80' },
  'asus-repair':    { name: 'ASUS', cn: '华硕', type: 'laptop', color: '#22d3ee' },
  'dell-repair':    { name: 'Dell', cn: '戴尔', type: 'laptop', color: '#60a5fa' },
  'google-repair':  { name: 'Google Pixel', cn: '谷歌', type: 'phone', color: '#a78bfa' },
  'hasee-repair':   { name: 'Hasee', cn: '神舟', type: 'laptop', color: '#818cf8' },
  'honor-repair':   { name: 'Honor', cn: '荣耀', type: 'phone', color: '#2dd4bf' },
  'hp-repair':      { name: 'HP', cn: '惠普', type: 'laptop', color: '#2dd4bf' },
  'huawei-repair':  { name: 'Huawei', cn: '华为', type: 'phone', color: '#f87171' },
  'iphone-repair':  { name: 'Apple iPhone', cn: '苹果', type: 'phone', color: '#60a5fa' },
  'lenovo-repair':  { name: 'Lenovo', cn: '联想', type: 'laptop', color: '#60a5fa' },
  'macbook-repair': { name: 'Apple MacBook', cn: '苹果', type: 'laptop', color: '#9ca3af' },
  'msi-repair':     { name: 'MSI', cn: '微星', type: 'laptop', color: '#f87171' },
  'oneplus-repair': { name: 'OnePlus', cn: '一加', type: 'phone', color: '#f87171' },
  'oppo-repair':    { name: 'OPPO', cn: 'OPPO', type: 'phone', color: '#4ade80' },
  'realme-repair':  { name: 'Realme', cn: '真我', type: 'phone', color: '#fbbf24' },
  'samsung-repair': { name: 'Samsung', cn: '三星', type: 'phone', color: '#a78bfa' },
  'surface-repair': { name: 'Microsoft Surface', cn: '微软', type: 'laptop', color: '#9ca3af' },
  'vivo-repair':    { name: 'VIVO', cn: 'vivo', type: 'phone', color: '#22d3ee' },
  'xiaomi-repair':  { name: 'Xiaomi', cn: '小米', type: 'phone', color: '#f97316' },
}

// 服务场景对应的SVG生成函数
function generateSVG(brandKey, serviceId) {
  const b = brands[brandKey]
  if (!b) return null
  
  const isPhone = b.type === 'phone'
  const brandColor = b.color
  const brandName = `${b.name} (${b.cn})`
  
  // 生成设备SVG元素
  const device = isPhone ? generatePhone(brandColor) : generateLaptop(brandColor)
  
  // 根据服务类型生成对应的维修场景覆盖层
  const overlay = generateServiceOverlay(serviceId, brandColor)
  
  return renderSVG(brandName, serviceId, brandColor, device, overlay)
}

function generatePhone(color) {
  // 简单的手机形状
  return `<g transform="translate(400,280)">
    <!-- 手机外壳 -->
    <rect x="-100" y="-180" width="200" height="360" rx="30" fill="#1f2937" stroke="${color}" stroke-width="2"/>
    <!-- 屏幕 -->
    <rect x="-85" y="-160" width="170" height="300" rx="15" fill="#111827"/>
    <!-- 屏幕内容 -->
    <rect x="-60" y="-130" width="120" height="40" rx="5" fill="#374151"/>
    <circle cx="-40" cy="-80" r="20" fill="#374151"/>
    <rect x="-10" y="-90" width="60" height="20" rx="3" fill="#374151"/>
    <circle cx="-40" cy="-30" r="15" fill="#374151"/>
    <rect x="-15" y="-40" width="50" height="15" rx="3" fill="#374151"/>
    <!-- 底部按钮 -->
    <rect x="-15" y="140" width="30" height="8" rx="4" fill="#374151"/>
    <!-- 顶部刘海/灵动岛 -->
    <rect x="-40" y="-170" width="80" height="20" rx="10" fill="#111827"/>
  </g>`
}

function generateLaptop(color) {
  // 简单的笔记本电脑形状
  return `<g transform="translate(400,280)">
    <!-- 屏幕 -->
    <rect x="-140" y="-150" width="280" height="200" rx="12" fill="#1f2937" stroke="${color}" stroke-width="2"/>
    <rect x="-125" y="-135" width="250" height="170" rx="8" fill="#111827"/>
    <!-- 屏幕内容 -->
    <rect x="-90" y="-100" width="180" height="30" rx="5" fill="#374151"/>
    <rect x="-90" y="-55" width="80" height="15" rx="3" fill="#374151"/>
    <rect x="-90" y="-30" width="120" height="15" rx="3" fill="#374151"/>
    <rect x="-90" y="-5" width="60" height="15" rx="3" fill="#374151"/>
    <!-- 旋转轴 -->
    <rect x="-130" y="50" width="260" height="12" rx="4" fill="#374151"/>
    <!-- 键盘底座 -->
    <rect x="-150" y="58" width="300" height="150" rx="10" fill="#1f2937" stroke="${color}" stroke-width="1.5"/>
    <rect x="-130" y="75" width="260" height="110" rx="6" fill="#111827"/>
    <!-- 键盘格 -->
    ${generateKeyboardKeys(5, 9, -120, 80)}
    <!-- 触摸板 -->
    <rect x="-40" y="155" width="80" height="40" rx="5" fill="#374151"/>
  </g>`
}

function generateKeyboardKeys(rows, cols, startX, startY) {
  let keys = ''
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = startX + c * 30
      const y = startY + r * 18
      keys += `<rect x="${x}" y="${y}" width="25" height="13" rx="2" fill="#374151"/>`
    }
  }
  return keys
}

function generateServiceOverlay(serviceId, color) {
  const overlays = {
    'screen-replacement': {
      icon: generateCrackedScreenIcon(color),
      label: '屏幕更换',
      labelEn: 'Screen Replacement',
    },
    'battery-replacement': {
      icon: generateBatteryIcon(color),
      label: '电池更换',
      labelEn: 'Battery Replacement',
    },
    'water-damage': {
      icon: generateWaterIcon(color),
      label: '进水维修',
      labelEn: 'Water Damage Repair',
    },
    'motherboard-repair': {
      icon: generateBoardIcon(color),
      label: '主板维修',
      labelEn: 'Motherboard Repair',
    },
    'camera-repair': {
      icon: generateCameraIcon(color),
      label: '摄像头维修',
      labelEn: 'Camera Repair',
    },
    'face-id': {
      icon: generateFaceIDIcon(color),
      label: '面容/指纹修复',
      labelEn: 'Face ID / Touch ID',
    },
    'charging-port': {
      icon: generatePortIcon(color),
      label: '充电口维修',
      labelEn: 'Charging Port',
    },
    'keyboard-repair': {
      icon: generateKeyboardIcon(color),
      label: '键盘维修',
      labelEn: 'Keyboard Repair',
    },
    'back-glass': {
      icon: generateBackGlassIcon(color),
      label: '后盖更换',
      labelEn: 'Back Glass',
    },
    'cleaning': {
      icon: generateCleaningIcon(color),
      label: '清灰换硅脂',
      labelEn: 'Cleaning & Cooling',
    },
    'flash-unlock': {
      icon: generateFlashIcon(color),
      label: '刷机/解锁',
      labelEn: 'Flash & Unlock',
    },
    'os-upgrade': {
      icon: generateOSIcon(color),
      label: '系统重装/升级',
      labelEn: 'OS & Upgrade',
    },
    'other-issues': {
      icon: generateToolIcon(color),
      label: '其他故障',
      labelEn: 'Other Issues',
    },
  }
  
  const overlay = overlays[serviceId]
  if (!overlay) return generateToolIcon(color)
  
  return overlay.icon
}

function generateCrackedScreenIcon(color) {
  return `<g transform="translate(400,130)">
    <!-- 放大镜 -->
    <circle cx="0" cy="0" r="60" fill="none" stroke="white" stroke-width="3" opacity="0.9"/>
    <line x1="42" y1="42" x2="65" y2="65" stroke="white" stroke-width="4" stroke-linecap="round" opacity="0.9"/>
    <!-- 裂纹效果 -->
    <line x1="-20" y1="-30" x2="10" y2="10" stroke="#fbbf24" stroke-width="2" opacity="0.9"/>
    <line x1="10" y1="10" x2="-5" y2="30" stroke="#fbbf24" stroke-width="2" opacity="0.9"/>
    <line x1="10" y1="10" x2="30" y2="25" stroke="#fbbf24" stroke-width="2" opacity="0.9"/>
    <line x1="-15" y1="-15" x2="-30" y2="-5" stroke="#fbbf24" stroke-width="2" opacity="0.9"/>
    <!-- 换屏箭头 -->
    <g transform="translate(0, 100)">
      <rect x="-80" y="-15" width="160" height="30" rx="8" fill="${color}" opacity="0.9"/>
      <text text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="bold" fill="white" dy="5">🔍 屏幕更换 Screen</text>
    </g>
  </g>`
}

function generateBatteryIcon(color) {
  return `<g transform="translate(400,130)">
    <!-- 电池图标 -->
    <rect x="-30" y="-45" width="60" height="40" rx="5" fill="none" stroke="white" stroke-width="2.5"/>
    <rect x="30" y="-35" width="8" height="20" rx="3" fill="white"/>
    <!-- 电池电量填充 -->
    <rect x="-22" y="-37" width="44" height="24" rx="3" fill="${color}" opacity="0.7"/>
    <!-- 闪电符号 -->
    <polygon points="-8,-20 2,-20 -4,-8 6,-8 -2,10" fill="white" opacity="0.8"/>
    <!-- 工具 -->
    <g transform="translate(-60, 60)">
      <rect x="-20" y="-10" width="40" height="20" rx="5" fill="none" stroke="white" stroke-width="1.5"/>
      <text text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="white" dy="4">🔧</text>
    </g>
    <g transform="translate(0, 100)">
      <rect x="-80" y="-15" width="160" height="30" rx="8" fill="${color}" opacity="0.9"/>
      <text text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="bold" fill="white" dy="5">🔋 电池更换 Battery</text>
    </g>
  </g>`
}

function generateWaterIcon(color) {
  return `<g transform="translate(400,130)">
    <!-- 水滴 -->
    <path d="M0,-55 C20,-40 25,-15 0,5 C-25,-15 -20,-40 0,-55Z" fill="#60a5fa" opacity="0.8"/>
    <path d="M-40,-30 C-20,-25 -15,-5 -40,15 C-65,-5 -60,-25 -40,-30Z" fill="#60a5fa" opacity="0.5" transform="rotate(-30, -40, -10)"/>
    <path d="M40,-25 C55,-15 55,5 40,20 C25,5 25,-15 40,-25Z" fill="#60a5fa" opacity="0.5" transform="rotate(30, 40, 0)"/>
    <!-- 禁止符号 -->
    <circle cx="0" cy="-10" r="30" fill="none" stroke="#ef4444" stroke-width="3" opacity="0.8"/>
    <line x1="-20" y1="-30" x2="20" y2="10" stroke="#ef4444" stroke-width="3" opacity="0.8"/>
    <g transform="translate(0, 100)">
      <rect x="-80" y="-15" width="160" height="30" rx="8" fill="${color}" opacity="0.9"/>
      <text text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="bold" fill="white" dy="5">💧 进水维修 Water</text>
    </g>
  </g>`
}

function generateBoardIcon(color) {
  return `<g transform="translate(400,130)">
    <!-- 电路板 -->
    <rect x="-50" y="-40" width="100" height="80" rx="5" fill="#1f2937" stroke="${color}" stroke-width="2"/>
    <circle cx="-25" cy="-15" r="8" fill="${color}" opacity="0.7"/>
    <circle cx="20" cy="-20" r="5" fill="#fbbf24"/>
    <circle cx="30" cy="10" r="6" fill="#4ade80"/>
    <rect x="-40" y="10" width="15" height="8" rx="2" fill="#f87171"/>
    <rect x="10" y="25" width="20" height="10" rx="2" fill="#60a5fa"/>
    <!-- 线路 -->
    <line x1="-25" y1="-5" x2="-25" y2="15" stroke="white" stroke-width="1" opacity="0.5"/>
    <line x1="-25" y1="15" x2="10" y2="15" stroke="white" stroke-width="1" opacity="0.5"/>
    <!-- 焊接烙铁 -->
    <g transform="translate(-70, -50)">
      <line x1="0" y1="0" x2="20" y2="40" stroke="white" stroke-width="3" stroke-linecap="round"/>
      <rect x="15" y="30" width="10" height="15" rx="3" fill="#fbbf24"/>
    </g>
    <g transform="translate(0, 100)">
      <rect x="-80" y="-15" width="160" height="30" rx="8" fill="${color}" opacity="0.9"/>
      <text text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="bold" fill="white" dy="5">🔬 主板维修 Board</text>
    </g>
  </g>`
}

function generateCameraIcon(color) {
  return `<g transform="translate(400,130)">
    <!-- 摄像头模块 -->
    <circle cx="0" cy="-15" r="35" fill="none" stroke="white" stroke-width="2.5"/>
    <circle cx="0" cy="-15" r="20" fill="none" stroke="white" stroke-width="2"/>
    <circle cx="0" cy="-15" r="8" fill="#60a5fa" opacity="0.6"/>
    <circle cx="0" cy="-15" r="3" fill="white"/>
    <!-- 镜头 -->
    <rect x="-40" y="30" width="80" height="50" rx="8" fill="#374151" stroke="${color}" stroke-width="1.5"/>
    <circle cx="0" cy="55" r="15" fill="none" stroke="white" stroke-width="1.5"/>
    <circle cx="0" cy="55" r="5" fill="#4ade80" opacity="0.5"/>
    <g transform="translate(0, 110)">
      <rect x="-80" y="-15" width="160" height="30" rx="8" fill="${color}" opacity="0.9"/>
      <text text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="bold" fill="white" dy="5">📷 摄像头 Camera</text>
    </g>
  </g>`
}

function generateFaceIDIcon(color) {
  return `<g transform="translate(400,130)">
    <!-- 人脸轮廓 -->
    <circle cx="0" cy="-15" r="40" fill="none" stroke="white" stroke-width="2.5"/>
    <!-- 眼睛 -->
    <circle cx="-15" cy="-25" r="5" fill="white"/>
    <circle cx="15" cy="-25" r="5" fill="white"/>
    <!-- 嘴巴 -->
    <path d="M-15,-5 Q0,10 15,-5" fill="none" stroke="white" stroke-width="2"/>
    <!-- 扫描线 -->
    <line x1="-55" y1="-15" x2="-35" y2="-15" stroke="${color}" stroke-width="3" opacity="0.8"/>
    <line x1="35" y1="-15" x2="55" y2="-15" stroke="${color}" stroke-width="3" opacity="0.8"/>
    <line x1="-45" y1="-35" x2="-35" y2="-35" stroke="${color}" stroke-width="3" opacity="0.8"/>
    <line x1="35" y1="-35" x2="45" y2="-35" stroke="${color}" stroke-width="3" opacity="0.8"/>
    <!-- 指纹 -->
    <g transform="translate(0, 50)">
      <path d="M-15,0 Q0,-10 15,0 Q20,10 10,15" fill="none" stroke="white" stroke-width="1.5"/>
      <path d="M-20,5 Q0,-15 20,5 Q25,20 5,25" fill="none" stroke="white" stroke-width="1.5"/>
    </g>
    <g transform="translate(0, 110)">
      <rect x="-80" y="-15" width="160" height="30" rx="8" fill="${color}" opacity="0.9"/>
      <text text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" font-weight="bold" fill="white" dy="5">👤 面容/指纹 Face ID</text>
    </g>
  </g>`
}

function generatePortIcon(color) {
  return `<g transform="translate(400,130)">
    <!-- 充电口 -->
    <rect x="-20" y="-15" width="40" height="30" rx="3" fill="none" stroke="white" stroke-width="2"/>
    <rect x="-12" y="-5" width="24" height="10" rx="2" fill="white" opacity="0.3"/>
    <!-- USB插头 -->
    <g transform="translate(0, 30)">
      <rect x="-12" y="-5" width="24" height="15" rx="3" fill="${color}" opacity="0.8"/>
    </g>
    <!-- 插头连接线 -->
    <line x1="0" y1="40" x2="0" y2="60" stroke="white" stroke-width="2"/>
    <!-- 闪电 -->
    <polygon points="-5,-25 5,-25 2,-15 8,-15 -5,0 -2,-10 -8,-10" fill="#fbbf24" opacity="0.9"/>
    <g transform="translate(0, 95)">
      <rect x="-80" y="-15" width="160" height="30" rx="8" fill="${color}" opacity="0.9"/>
      <text text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="bold" fill="white" dy="5">🔌 充电口 Port</text>
    </g>
  </g>`
}

function generateKeyboardIcon(color) {
  return `<g transform="translate(400,130)">
    <!-- 键盘 -->
    <rect x="-60" y="-40" width="120" height="80" rx="6" fill="#374151" stroke="${color}" stroke-width="1.5"/>
    ${(() => {
      let keys = ''
      const rows = 4, cols = 7, kx = -52, ky = -32, kw = 14, kh = 12, gap = 3
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          keys += `<rect x="${kx + c*(kw+gap)}" y="${ky + r*(kh+gap)}" width="${kw}" height="${kh}" rx="2" fill="#4b5563"/>`
        }
      }
      return keys
    })()}
    <!-- 工具 -->
    <g transform="translate(-70, 60)">
      <line x1="0" y1="0" x2="15" y2="-20" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
      <rect x="11" y="-25" width="8" height="10" rx="2" fill="#9ca3af"/>
    </g>
    <g transform="translate(0, 100)">
      <rect x="-80" y="-15" width="160" height="30" rx="8" fill="${color}" opacity="0.9"/>
      <text text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="bold" fill="white" dy="5">⌨️ 键盘维修 Keyboard</text>
    </g>
  </g>`
}

function generateBackGlassIcon(color) {
  return `<g transform="translate(400,130)">
    <!-- 手机背面 -->
    <rect x="-50" y="-70" width="100" height="140" rx="20" fill="none" stroke="white" stroke-width="2.5"/>
    <!-- 裂纹 -->
    <line x1="-35" y1="-40" x2="-5" y2="-5" stroke="#fbbf24" stroke-width="2"/>
    <line x1="-5" y1="-5" x2="-20" y2="25" stroke="#fbbf24" stroke-width="2"/>
    <line x1="-5" y1="-5" x2="15" y2="15" stroke="#fbbf24" stroke-width="2"/>
    <!-- 后置摄像头 -->
    <circle cx="0" cy="-30" r="12" fill="none" stroke="white" stroke-width="1.5"/>
    <circle cx="0" cy="-30" r="5" fill="#374151"/>
    <!-- 换背光箭头 -->
    <path d="M40,0 Q70,0 70,-30" fill="none" stroke="${color}" stroke-width="2.5" stroke-dasharray="4,3"/>
    <polygon points="70,-35 75,-25 65,-25" fill="${color}"/>
    <g transform="translate(0, 100)">
      <rect x="-80" y="-15" width="160" height="30" rx="8" fill="${color}" opacity="0.9"/>
      <text text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="bold" fill="white" dy="5">🔄 后盖 Back Glass</text>
    </g>
  </g>`
}

function generateCleaningIcon(color) {
  return `<g transform="translate(400,130)">
    <!-- 风扇 -->
    <circle cx="0" cy="-15" r="30" fill="none" stroke="white" stroke-width="2.5"/>
    <path d="M0,-15 L-15,-35 L0,-30 L15,-35Z" fill="${color}" opacity="0.7"/>
    <path d="M0,-15 L20,5 L15,-10 L35,-5Z" fill="${color}" opacity="0.7"/>
    <path d="M0,-15 L-20,5 L-15,-10 L-35,-5Z" fill="${color}" opacity="0.7"/>
    <circle cx="0" cy="-15" r="5" fill="white"/>
    <!-- 散热 -->
    <g transform="translate(-40, 25)">
      <rect x="-15" y="-10" width="30" height="20" rx="4" fill="none" stroke="white" stroke-width="1.5"/>
    </g>
    <!-- 温度计 -->
    <g transform="translate(40, 25)">
      <rect x="-3" y="-15" width="6" height="30" rx="3" fill="none" stroke="white" stroke-width="1.5"/>
      <rect x="-3" y="-5" width="6" height="15" rx="2" fill="#f87171"/>
      <circle cx="0" cy="18" r="5" fill="#f87171"/>
    </g>
    <g transform="translate(0, 100)">
      <rect x="-80" y="-15" width="160" height="30" rx="8" fill="${color}" opacity="0.9"/>
      <text text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="bold" fill="white" dy="5">🧹 清灰换硅脂 Clean</text>
    </g>
  </g>`
}

function generateFlashIcon(color) {
  return `<g transform="translate(400,130)">
    <!-- 手机+刷机 -->
    <rect x="-35" y="-55" width="70" height="110" rx="12" fill="#1f2937" stroke="${color}" stroke-width="2"/>
    <rect x="-28" y="-45" width="56" height="85" rx="6" fill="#111827"/>
    <!-- 屏幕内容-进度条 -->
    <rect x="-20" y="-30" width="40" height="8" rx="4" fill="#374151"/>
    <rect x="-20" y="-30" width="25" height="8" rx="4" fill="${color}" opacity="0.8"/>
    <text x="0" y="-12" font-family="system-ui,sans-serif" font-size="7" fill="white" text-anchor="middle">系统更新</text>
    <!-- 闪电 -->
    <polygon points="-25,10 -15,10 -20,25 -10,25 -20,45" fill="#fbbf24" opacity="0.9"/>
    <g transform="translate(0, 100)">
      <rect x="-80" y="-15" width="160" height="30" rx="8" fill="${color}" opacity="0.9"/>
      <text text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="bold" fill="white" dy="5">⚡ 刷机/解锁 Flash</text>
    </g>
  </g>`
}

function generateOSIcon(color) {
  return `<g transform="translate(400,130)">
    <!-- 电脑+系统重装 -->
    <rect x="-55" y="-50" width="110" height="75" rx="8" fill="#1f2937" stroke="${color}" stroke-width="2"/>
    <rect x="-45" y="-40" width="90" height="55" rx="4" fill="#111827"/>
    <!-- Windows/Mac图标 -->
    <rect x="-15" y="-25" width="30" height="25" rx="4" fill="${color}" opacity="0.7"/>
    <text x="0" y="-8" font-family="system-ui,sans-serif" font-size="10" fill="white" text-anchor="middle">OS</text>
    <!-- 安装光盘图标 -->
    <circle cx="0" cy="20" r="15" fill="none" stroke="white" stroke-width="1.5"/>
    <circle cx="0" cy="20" r="5" fill="white" opacity="0.3"/>
    <g transform="translate(0, 100)">
      <rect x="-80" y="-15" width="160" height="30" rx="8" fill="${color}" opacity="0.9"/>
      <text text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="bold" fill="white" dy="5">💿 系统重装 OS</text>
    </g>
  </g>`
}

function generateToolIcon(color) {
  return `<g transform="translate(400,130)">
    <!-- 工具箱 -->
    <rect x="-45" y="-30" width="90" height="60" rx="5" fill="#374151" stroke="${color}" stroke-width="2"/>
    <rect x="-30" y="-10" width="60" height="25" rx="3" fill="#4b5563"/>
    <!-- 工具 -->
    <line x1="-15" y1="15" x2="-5" y2="-15" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
    <rect x="-8" y="-20" width="6" height="12" rx="2" fill="#9ca3af"/>
    <line x1="10" y1="15" x2="15" y2="-10" stroke="white" stroke-width="2" stroke-linecap="round"/>
    <circle cx="16" cy="-13" r="5" fill="none" stroke="white" stroke-width="1.5"/>
    <!-- 放大镜 -->
    <circle cx="30" cy="-20" r="12" fill="none" stroke="${color}" stroke-width="2.5"/>
    <line x1="38" y1="-12" x2="48" y2="-2" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
    <g transform="translate(0, 100)">
      <rect x="-80" y="-15" width="160" height="30" rx="8" fill="${color}" opacity="0.9"/>
      <text text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="bold" fill="white" dy="5">🔧 检测维修 Check</text>
    </g>
  </g>`
}

function renderSVG(brandName, serviceId, color, deviceSvg, overlaySvg) {
  const serviceLabel = {
    'screen-replacement': '屏幕更换 · Screen Replacement',
    'battery-replacement': '电池更换 · Battery Replacement',
    'water-damage': '进水维修 · Water Damage Repair',
    'motherboard-repair': '主板维修 · Motherboard Repair',
    'camera-repair': '摄像头维修 · Camera Repair',
    'face-id': '面容/指纹修复 · Face ID Repair',
    'charging-port': '充电口维修 · Charging Port Repair',
    'keyboard-repair': '键盘维修 · Keyboard Repair',
    'back-glass': '后盖更换 · Back Glass Replacement',
    'cleaning': '清灰换硅脂 · Cleaning & Cooling',
    'flash-unlock': '刷机/解锁 · Flash & Unlock',
    'os-upgrade': '系统重装/升级 · OS & Upgrade',
    'other-issues': '其他故障 · Other Issues',
  }[serviceId] || '维修服务 · Repair Service'

  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e293b;stop-opacity:1" />
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="800" height="600" fill="url(#bg)"/>
  
  <!-- 装饰圆点 -->
  <circle cx="100" cy="100" r="80" fill="${color}" opacity="0.05"/>
  <circle cx="650" cy="500" r="120" fill="${color}" opacity="0.05"/>
  <circle cx="700" cy="100" r="50" fill="${color}" opacity="0.08"/>
  
  <!-- 品牌标识 -->
  <g transform="translate(400, 35)">
    <rect x="-100" y="-18" width="200" height="36" rx="18" fill="${color}" opacity="0.2"/>
    <text text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="bold" fill="${color}" dy="4">${escapeXml(brandName)}</text>
  </g>
  
  <!-- 设备主体 -->
  ${deviceSvg}
  
  <!-- 维修覆盖层 -->
  ${overlaySvg}
  
  <!-- 底部信息 -->
  <g transform="translate(400, 565)">
    <text text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#64748b">${escapeXml(serviceLabel)}</text>
    <text text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="9" fill="#475569" y="16">Crazy维修 · 免费检测 · 30天质保 · 2007年至今</text>
  </g>
</svg>`
}

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
}

async function main() {
  console.log('')
  console.log('═══════════════════════════════════════')
  console.log('   维修服务SVG插画生成')
  console.log('═══════════════════════════════════════')
  console.log('')
  
  mkdirSync(IMG_DIR, { recursive: true })
  
  // 从repairServices.js获取所有服务
  const repairServicesPath = join(PROJECT_ROOT, 'src', 'data', 'repairServices.js')
  const servicesModule = await import(repairServicesPath)
  const repairServices = servicesModule.repairServices
  
  let total = 0
  
  for (const [brandKey, data] of Object.entries(repairServices)) {
    const brandDir = brandKey + '-repair'
    const brandInfo = brands[brandDir]
    if (!brandInfo) {
      console.log(`⏭️ 跳过 ${brandDir}: 未配置品牌信息`)
      continue
    }
    
    const services = data.services || []
    console.log(`\n📱 ${brandInfo.name} (${brandInfo.cn}) - ${services.length} 个服务`)
    
    for (const service of services) {
      const svgContent = generateSVG(brandDir, service.id)
      if (!svgContent) {
        console.log(`  ⚠️ 无法生成: ${service.title}`)
        continue
      }
      
      const filename = `${brandDir}-${service.id}.svg`
      const filepath = join(IMG_DIR, filename)
      writeFileSync(filepath, svgContent)
      total++
      console.log(`  ✅ ${service.title}`)
    }
  }
  
  console.log(`\n═══════════════════════════════════════`)
  console.log(`📊 完成: ${total} 张SVG插画`)
  console.log(`   目录: ${IMG_DIR}`)
  console.log('═══════════════════════════════════════\n')
}

main().catch(err => {
  console.error('❌ 运行出错:', err)
  process.exit(1)
})
