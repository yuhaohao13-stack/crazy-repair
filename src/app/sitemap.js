const BASE = 'https://www.crazy-repair.com'

const brands = [
  'phone-repair', 'computer-repair',
  'iphone-repair', 'samsung-repair', 'huawei-repair', 'xiaomi-repair',
  'oppo-repair', 'vivo-repair', 'oneplus-repair', 'honor-repair',
  'google-repair', 'realme-repair', 'macbook-repair', 'ipad-repair',
  'lenovo-repair', 'dell-repair', 'hp-repair', 'asus-repair',
  'acer-repair', 'msi-repair', 'surface-repair', 'hasee-repair',
  'console-repair', 'camera-repair', 'watch-repair', 'headphone-repair',
  'kindle-repair', 'nintendo-repair', 'sony-repair', 'tablet-repair',
  'other-repair',
]

const brandServices = {
  'iphone-repair': ['screen-replacement','battery-replacement','water-damage','motherboard-repair','camera-repair','face-id','charging-port'],
  'macbook-repair': ['screen-replacement','battery-replacement','water-damage','motherboard-repair','cleaning','keyboard-repair','charging-port'],
  'samsung-repair': ['screen-replacement','battery-replacement','motherboard-repair','charging-port','camera-repair','back-glass','water-damage'],
  'huawei-repair': ['screen-replacement','battery-replacement','motherboard-repair','charging-port','back-glass','water-damage','flash-unlock'],
  'xiaomi-repair': ['screen-replacement','battery-replacement','motherboard-repair','charging-port','back-glass','water-damage'],
  'oppo-repair': ['screen-replacement','battery-replacement','motherboard-repair','charging-port','back-glass','water-damage'],
  'vivo-repair': ['screen-replacement','battery-replacement','motherboard-repair','charging-port','back-glass','water-damage'],
  'oneplus-repair': ['screen-replacement','battery-replacement','motherboard-repair','charging-port','back-glass','water-damage'],
  'google-repair': ['screen-replacement','battery-replacement','motherboard-repair','charging-port','back-glass'],
  'honor-repair': ['screen-replacement','battery-replacement','motherboard-repair','charging-port','back-glass','water-damage'],
  'realme-repair': ['screen-replacement','battery-replacement','motherboard-repair','charging-port','back-glass'],
  'lenovo-repair': ['screen-replacement','battery-replacement','motherboard-repair','cleaning','keyboard-repair','charging-port'],
  'dell-repair': ['screen-replacement','battery-replacement','motherboard-repair','cleaning','keyboard-repair','charging-port'],
  'hp-repair': ['screen-replacement','battery-replacement','motherboard-repair','cleaning','keyboard-repair','charging-port'],
  'asus-repair': ['screen-replacement','battery-replacement','motherboard-repair','cleaning','keyboard-repair','charging-port'],
  'acer-repair': ['screen-replacement','battery-replacement','motherboard-repair','cleaning','keyboard-repair','charging-port'],
  'msi-repair': ['screen-replacement','battery-replacement','motherboard-repair','cleaning','keyboard-repair','charging-port'],
  'surface-repair': ['screen-replacement','battery-replacement','motherboard-repair','cleaning','keyboard-repair','charging-port'],
  'hasee-repair': ['screen-replacement','battery-replacement','motherboard-repair','cleaning','keyboard-repair','charging-port'],
  'ipad-repair': ['screen-replacement','battery-replacement','motherboard-repair','charging-port'],
}

const otherCategories = ['watch','samsung-watch','console','headphone','camera','mods','smart-home','other']

const otherItems = {
  watch: ['watch-screen','watch-battery','watch-water-damage','watch-sensor'],
  'samsung-watch': ['samsung-watch-screen','samsung-watch-battery','samsung-watch-strap','samsung-watch-motherboard'],
  console: ['console-joystick-drift','console-screen','console-battery','console-cleaning','console-mods'],
  headphone: ['headphone-battery','headphone-one-side-silent','headphone-charging-case','headphone-mic'],
  camera: ['camera-lens','camera-sensor-cleaning','camera-shutter','camera-data-recovery','camera-drone'],
  mods: ['mods-storage','mods-dual-sim','mods-shell-swap','mods-console'],
  'smart-home': ['smart-home-router','smart-home-wifi','smart-home-cctv','smart-home-setup'],
  other: ['other-screen','other-battery','other-charging-port','other-diagnosis'],
}

export async function GET() {
  const urls = []

  // 首页
  urls.push(`  <url><loc>${BASE}</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>`)

  // 品牌页面 & 服务详情页
  for (const brand of brands) {
    urls.push(`  <url><loc>${BASE}/${brand}</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>`)
    const services = brandServices[brand] || []
    for (const svc of services) {
      urls.push(`  <url><loc>${BASE}/${brand}/${svc}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`)
    }
  }

  // 其他维修分类页 & 项目详情页
  for (const cat of otherCategories) {
    urls.push(`  <url><loc>${BASE}/other-repair/${cat}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`)
    const items = otherItems[cat] || []
    for (const item of items) {
      urls.push(`  <url><loc>${BASE}/other-repair/${cat}/${item}</loc><changefreq>weekly</changefreq><priority>0.6</priority></url>`)
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
