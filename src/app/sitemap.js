/** @type {import('next').NextConfig} */

const BASE = 'https://www.crazy-repair.com'

// 品牌目录及服务列表
const brandServices = {
  'iphone-repair': ['screen-replacement', 'battery-replacement', 'water-damage', 'motherboard-repair', 'camera-repair', 'face-id', 'charging-port'],
  'macbook-repair': ['screen-replacement', 'battery-replacement', 'water-damage', 'motherboard-repair', 'cleaning', 'keyboard-repair'],
  'samsung-repair': ['screen-replacement', 'battery-replacement', 'motherboard-repair', 'charging-port', 'camera-repair', 'back-glass'],
  'xiaomi-repair': ['screen-replacement', 'battery-replacement', 'flash-unlock'],
  'huawei-repair': ['screen-replacement', 'battery-replacement', 'flash-unlock', 'motherboard-repair', 'water-damage', 'back-glass'],
  'lenovo-repair': ['screen-replacement', 'battery-replacement', 'keyboard-repair', 'cleaning', 'os-upgrade', 'other-issues'],
  'dell-repair': ['screen-replacement', 'battery-replacement', 'keyboard-repair', 'cleaning', 'os-upgrade', 'other-issues'],
  'hp-repair': ['screen-replacement', 'battery-replacement', 'keyboard-repair', 'cleaning', 'os-upgrade', 'other-issues'],
  'asus-repair': ['screen-replacement', 'battery-replacement', 'cleaning', 'keyboard-repair', 'os-upgrade', 'other-issues'],
  'acer-repair': ['screen-replacement', 'battery-replacement', 'keyboard-repair', 'cleaning', 'os-upgrade', 'other-issues'],
  'msi-repair': ['screen-replacement', 'battery-replacement', 'cleaning', 'keyboard-repair', 'os-upgrade', 'other-issues'],
  'surface-repair': ['screen-replacement', 'battery-replacement', 'keyboard-repair', 'cleaning', 'os-upgrade', 'other-issues'],
  'hasee-repair': ['screen-replacement', 'battery-replacement', 'cleaning', 'keyboard-repair', 'os-upgrade', 'other-issues'],
  'oppo-repair': ['screen-replacement', 'battery-replacement', 'charging-port', 'motherboard-repair', 'other-issues'],
  'vivo-repair': ['screen-replacement', 'battery-replacement', 'charging-port', 'motherboard-repair', 'other-issues'],
  'oneplus-repair': ['screen-replacement', 'battery-replacement', 'charging-port', 'motherboard-repair', 'other-issues'],
  'honor-repair': ['screen-replacement', 'battery-replacement', 'charging-port', 'motherboard-repair', 'other-issues'],
  'google-repair': ['screen-replacement', 'battery-replacement', 'charging-port', 'motherboard-repair', 'other-issues'],
  'realme-repair': ['screen-replacement', 'battery-replacement', 'charging-port', 'motherboard-repair', 'other-issues'],
  'phone-repair': [],
  'computer-repair': [],
  'tablet-repair': [],
  'watch-repair': [],
  'console-repair': [],
  'camera-repair': [],
  'headphone-repair': [],
  'kindle-repair': [],
  'nintendo-repair': [],
  'sony-repair': [],
  'other-repair': [],
  'tablet-repair': [],
}

export default function sitemap() {
  const staticPages = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE}/phone-repair`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/computer-repair`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/tablet-repair`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/watch-repair`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/console-repair`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/camera-repair`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/headphone-repair`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/kindle-repair`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/nintendo-repair`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/sony-repair`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/other-repair`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  // 平板维修子页面
  const tabletServices = ['ipad', 'samsung', 'huawei', 'xiaomi', 'oppo', 'lenovo', 'kindle']
  const tabletServicePages = tabletServices.map(id => ({
    url: `${BASE}/tablet-repair/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  // 其他数码维修子页面
  const otherServices = ['watch', 'samsung-watch', 'console', 'headphone', 'camera', 'mods', 'smart-home', 'other']
  const otherServicePages = otherServices.map(id => ({
    url: `${BASE}/other-repair/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  // 品牌概览页面
  const brandPages = Object.keys(brandServices).map(dir => ({
    url: `${BASE}/${dir}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }))

  // 服务详情页面
  const servicePages = []
  for (const [dir, services] of Object.entries(brandServices)) {
    for (const serviceId of services) {
      servicePages.push({
        url: `${BASE}/${dir}/${serviceId}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    }
  }

  return [...staticPages, ...brandPages, ...servicePages, ...tabletServicePages, ...otherServicePages]
}
