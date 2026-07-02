#!/usr/bin/env node

/**
 * 品牌服务图片下载脚本
 * 
 * 策略：
 * 1. 用 picsum.photos 获取免费真实图片（不需要API key）
 * 2. 按品牌+服务命名存储
 * 3. 全失败则生成好看的自定义SVG占位图
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, statSync } from 'fs'
import https from 'https'
import http from 'http'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = join(__dirname, '..')
const IMG_DIR = join(PROJECT_ROOT, 'public', 'images', 'services')

const brandDirs = [
  'acer-repair', 'asus-repair', 'dell-repair', 'google-repair',
  'hasee-repair', 'honor-repair', 'hp-repair', 'huawei-repair',
  'iphone-repair', 'lenovo-repair', 'macbook-repair', 'msi-repair',
  'oneplus-repair', 'oppo-repair', 'realme-repair', 'samsung-repair',
  'surface-repair', 'vivo-repair', 'xiaomi-repair'
]

// 品牌的显示名称和中英文描述
const brandNames = {
  'acer-repair': ['Acer 宏基', 'laptop'],
  'asus-repair': ['ASUS 华硕', 'laptop'],
  'dell-repair': ['Dell 戴尔', 'laptop'],
  'google-repair': ['Google Pixel', 'phone'],
  'hasee-repair': ['Hasee 神舟', 'laptop'],
  'honor-repair': ['Honor 荣耀', 'phone'],
  'hp-repair': ['HP 惠普', 'laptop'],
  'huawei-repair': ['Huawei 华为', 'phone'],
  'iphone-repair': ['iPhone 苹果', 'phone'],
  'lenovo-repair': ['Lenovo 联想', 'laptop'],
  'macbook-repair': ['MacBook 苹果', 'laptop'],
  'msi-repair': ['MSI 微星', 'laptop'],
  'oneplus-repair': ['OnePlus 一加', 'phone'],
  'oppo-repair': ['OPPO', 'phone'],
  'realme-repair': ['Realme 真我', 'phone'],
  'samsung-repair': ['Samsung 三星', 'phone'],
  'surface-repair': ['Microsoft Surface', 'laptop'],
  'vivo-repair': ['VIVO', 'phone'],
  'xiaomi-repair': ['Xiaomi 小米', 'phone'],
}

const serviceNames = {
  'screen-replacement': '屏幕更换',
  'battery-replacement': '电池更换',
  'water-damage': '进水维修',
  'motherboard-repair': '主板维修',
  'camera-repair': '摄像头维修',
  'face-id': '面容/指纹修复',
  'charging-port': '充电口维修',
  'keyboard-repair': '键盘维修',
  'back-glass': '后盖更换',
  'cleaning': '清灰换硅脂',
  'flash-unlock': '刷机/解锁',
  'os-upgrade': '系统重装/升级',
  'other-issues': '其他故障',
}

/**
 * 获取固定随机种子，让同一个品牌+服务每次都得到相同的图片
 */
function getSeed(brandDir, serviceId) {
  let hash = 0
  const str = brandDir + '-' + serviceId
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash) % 1000
}

/**
 * 下载图片 - 使用picsum.photos（免费真实图片，不需要API key）
 */
function downloadFromPicsum(seed, filepath) {
  return new Promise((resolve, reject) => {
    const url = `https://picsum.photos/seed/${seed}/800/600`
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      },
      timeout: 20000,
    }

    https.get(url, options, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // 重定向到真实图片
        const redirectUrl = res.headers.location
        https.get(redirectUrl, options, (res2) => {
          if (res2.statusCode !== 200) {
            reject(new Error(`HTTP ${res2.statusCode}`))
            return
          }
          const chunks = []
          res2.on('data', chunk => chunks.push(chunk))
          res2.on('end', () => {
            const buffer = Buffer.concat(chunks)
            if (buffer.length < 1000 || buffer[0] === 0x3c) {
              reject(new Error('非图片响应'))
              return
            }
            writeFileSync(filepath, buffer)
            resolve(filepath)
          })
        }).on('error', reject).on('timeout', function() { this.destroy(); reject(new Error('timeout')) })
        return
      }
      
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`))
        return
      }
      
      const chunks = []
      res.on('data', chunk => chunks.push(chunk))
      res.on('end', () => {
        const buffer = Buffer.concat(chunks)
        if (buffer.length < 1000 || buffer[0] === 0x3c) {
          reject(new Error('非图片响应'))
          return
        }
        writeFileSync(filepath, buffer)
        resolve(filepath)
      })
    }).on('error', reject).on('timeout', function() { this.destroy(); reject(new Error('timeout')) })
  })
}

/**
 * 下载图片 - 从iPad wallpapers这类免费图源
 */
function downloadFromPlacekitten(filepath) {
  return new Promise((resolve, reject) => {
    const url = `https://picsum.photos/800/600?_=${Date.now()}`
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      },
      timeout: 20000,
    }
    https.get(url, options, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const redirectUrl = res.headers.location
        https.get(redirectUrl, options, (res2) => {
          if (res2.statusCode !== 200) { reject(new Error(`HTTP ${res2.statusCode}`)); return }
          const chunks = []
          res2.on('data', chunk => chunks.push(chunk))
          res2.on('end', () => {
            const buffer = Buffer.concat(chunks)
            if (buffer.length < 1000 || buffer[0] === 0x3c) { reject(new Error('非图片')); return }
            writeFileSync(filepath, buffer)
            resolve(filepath)
          })
        }).on('error', reject).on('timeout', function() { this.destroy(); reject(new Error('timeout')) })
        return
      }
      reject(new Error(`HTTP ${res.statusCode}`))
    }).on('error', reject).on('timeout', function() { this.destroy(); reject(new Error('timeout')) })
  })
}

/**
 * 生成自定义品牌SVG占位图
 */
function generateServicePlaceholder(brandName, serviceName, filepath, deviceType) {
  const gradients = {
    'phone': ['#6366f1', '#8b5cf6', '#a78bfa'],
    'laptop': ['#2563eb', '#3b82f6', '#60a5fa'],
    'default': ['#1e40af', '#3b82f6', '#93c5fd'],
  }
  const g = gradients[deviceType] || gradients.default
  
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${g[0]};stop-opacity:1" />
      <stop offset="50%" style="stop-color:${g[1]};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${g[2]};stop-opacity:1" />
    </linearGradient>
    <linearGradient id="card" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:rgba(255,255,255,0.12)" />
      <stop offset="100%" style="stop-color:rgba(255,255,255,0.05)" />
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#bg)"/>
  <rect x="100" y="100" width="600" height="400" rx="20" fill="url(#card)" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
  <g transform="translate(400,260)">
    <text text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="18" fill="rgba(255,255,255,0.6)">${escapeXml(brandName)}</text>
    <text text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="42" font-weight="bold" fill="white" y="50">${escapeXml(serviceName)}</text>
    <text text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="16" fill="rgba(255,255,255,0.65)" y="100">专业维修 · 免费检测 · 先报价后维修</text>
    <text text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="rgba(255,255,255,0.4)" y="130">Crazy维修 · 2007年至今</text>
  </g>
  <g transform="translate(400,440)">
    <rect x="-100" y="-15" width="200" height="30" rx="15" fill="rgba(255,255,255,0.1)"/>
    <text text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="white" dy="5">30天质保 · 透明报价</text>
  </g>
</svg>`
  writeFileSync(filepath, svg)
  return filepath
}

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
}

async function main() {
  console.log('')
  console.log('═══════════════════════════════════════')
  console.log('   品牌服务图片下载工具')
  console.log('═══════════════════════════════════════')
  console.log('')
  
  mkdirSync(IMG_DIR, { recursive: true })
  
  let total = 0, success = 0, placeholder = 0
  
  // 第一步：尝试从picsum下载真实图片
  for (const brandDir of brandDirs) {
    // 获取该品牌的所有服务
    const brandKey = brandDir.replace('-repair', '')
    
    // 从brandDirs推断服务列表（从brandDirs定义的服务列表反向查找）
    // 实际上我们要从repairServices.js读取
    
    // 尝试动态导入repairServices.js
    let services = []
    try {
      const servicesModule = await import(join(PROJECT_ROOT, 'src', 'data', 'repairServices.js'))
      const brandData = servicesModule.repairServices[brandKey]
      if (brandData && brandData.services) {
        services = brandData.services.map(s => ({ id: s.id, title: s.title }))
      }
    } catch (err) {
      console.error(`无法导入 ${brandKey} 的服务数据:`, err.message)
    }
    
    if (services.length === 0) {
      console.log(`⏭️ ${brandDir} 无服务数据，跳过`)
      continue
    }
    
    const brandInfo = brandNames[brandDir] || [brandDir, 'default']
    const brandName = brandInfo[0]
    const deviceType = brandInfo[1]
    
    console.log(`\n📱 ${brandDir} (${brandName})`)
    
    for (const service of services) {
      const svgFilename = `${brandDir}-${service.id}.svg`
      const jpgFilename = `${brandDir}-${service.id}.jpg`
      const svgFilepath = join(IMG_DIR, svgFilename)
      const jpgFilepath = join(IMG_DIR, jpgFilename)
      total++
      
      const serviceName = serviceNames[service.id] || service.title
      
      // 如果已有图片则跳过
      if (existsSync(jpgFilepath) && statSync(jpgFilepath).size > 5000) {
        console.log(`  ✅ 已有JPG: ${serviceName}`)
        continue
      }
      if (existsSync(svgFilepath)) {
        console.log(`  ✅ 已有SVG: ${serviceName}`)
        continue
      }
      
      // 尝试下载真实图片
      const seed = getSeed(brandDir, service.id)
      console.log(`  📥 ${serviceName} (seed=${seed})`)
      
      try {
        await downloadFromPicsum(seed, jpgFilepath)
        const stats = statSync(jpgFilepath)
        if (stats.size > 5000) {
          success++
          console.log(`    ✅ 下载成功 (${(stats.size/1024).toFixed(0)}KB)`)
        }
      } catch (err) {
        console.log(`    ⚠️ 下载失败: ${err.message}`)
        
        // 尝试其他来源
        try {
          await downloadFromPlacekitten(jpgFilepath)
          const stats = statSync(jpgFilepath)
          if (stats.size > 5000) {
            success++
            console.log(`    ✅ 备选源成功 (${(stats.size/1024).toFixed(0)}KB)`)
            continue
          }
        } catch (err2) {
          console.log(`    ⚠️ 备选也失败`)
        }
        
        // 生成SVG占位图
        console.log(`    🎨 生成SVG占位图`)
        generateServicePlaceholder(brandName, serviceName, svgFilepath, deviceType)
        placeholder++
      }
      
      // 避免请求过快
      await new Promise(r => setTimeout(r, 300))
    }
  }
  
  console.log('\n═══════════════════════════════════════')
  console.log(`📊 统计`)
  console.log(`   总共需要: ${total} 张`)
  console.log(`   ✅ 真实图片: ${success} 张`)
  console.log(`   🎨 SVG占位: ${placeholder} 张`)
  console.log(`   目录: ${IMG_DIR}`)
  console.log('═══════════════════════════════════════\n')
}

main().catch(err => {
  console.error('❌ 运行出错:', err)
  process.exit(1)
})
