/**
 * 服务页面 metadata 生成器
 * 用于每个品牌 [service] layout.js 中的 generateMetadata
 */

const brandInfo = {
  'iphone-repair': { zh: 'iPhone 维修', en: 'iPhone Repair', brand: 'Apple iPhone' },
  'macbook-repair': { zh: 'MacBook 维修', en: 'MacBook Repair', brand: 'Apple MacBook' },
  'samsung-repair': { zh: 'Samsung 维修', en: 'Samsung Repair', brand: 'Samsung' },
  'xiaomi-repair': { zh: 'Xiaomi 维修', en: 'Xiaomi Repair', brand: 'Xiaomi' },
  'huawei-repair': { zh: 'Huawei 维修', en: 'Huawei Repair', brand: 'Huawei' },
  'oppo-repair': { zh: 'OPPO 维修', en: 'OPPO Repair', brand: 'OPPO' },
  'vivo-repair': { zh: 'VIVO 维修', en: 'VIVO Repair', brand: 'VIVO' },
  'oneplus-repair': { zh: 'OnePlus 维修', en: 'OnePlus Repair', brand: 'OnePlus' },
  'google-repair': { zh: 'Google 维修', en: 'Google Repair', brand: 'Google' },
  'honor-repair': { zh: 'Honor 维修', en: 'Honor Repair', brand: 'Honor' },
  'realme-repair': { zh: 'Realme 维修', en: 'Realme Repair', brand: 'Realme' },
  'lenovo-repair': { zh: 'Lenovo 维修', en: 'Lenovo Repair', brand: 'Lenovo' },
  'dell-repair': { zh: '戴尔 维修', en: 'Dell Repair', brand: 'Dell' },
  'hp-repair': { zh: '惠普 维修', en: 'HP Repair', brand: 'HP' },
  'asus-repair': { zh: '华硕 维修', en: 'ASUS Repair', brand: 'ASUS' },
  'acer-repair': { zh: '宏基 维修', en: 'Acer Repair', brand: 'Acer' },
  'msi-repair': { zh: '微星 维修', en: 'MSI Repair', brand: 'MSI' },
  'surface-repair': { zh: 'Surface 维修', en: 'Surface Repair', brand: 'Microsoft Surface' },
  'hasee-repair': { zh: '神舟 维修', en: 'Hasee Repair', brand: 'Hasee' },
}

const serviceNames = {
  'screen-replacement': { zh: '屏幕更换', en: 'Screen Replacement', kw: '换屏,屏幕碎' },
  'battery-replacement': { zh: '电池更换', en: 'Battery Replacement', kw: '换电池,电池不耐用' },
  'water-damage': { zh: '进水维修', en: 'Water Damage Repair', kw: '进水,水损' },
  'motherboard-repair': { zh: '主板维修', en: 'Motherboard Repair', kw: '主板,不开机' },
  'camera-repair': { zh: '摄像头维修', en: 'Camera Repair', kw: '摄像头,拍照模糊' },
  'face-id': { zh: '面容/指纹修复', en: 'Face ID/Touch ID', kw: '面容,指纹' },
  'charging-port': { zh: '充电口维修', en: 'Charging Port Repair', kw: '充电口,尾插' },
  'back-glass': { zh: '后盖玻璃更换', en: 'Back Glass Replacement', kw: '后盖,玻璃' },
  'flash-unlock': { zh: '刷机解锁', en: 'Flash & Unlock', kw: '刷机,解锁,锁屏' },
  'cleaning': { zh: '清灰换硅脂', en: 'Cleaning & Thermal Paste', kw: '清灰,散热' },
  'keyboard-repair': { zh: '键盘维修', en: 'Keyboard Repair', kw: '键盘,按键' },
  'os-upgrade': { zh: '系统升级', en: 'OS Upgrade', kw: '系统,升级,固态硬盘' },
  'other-issues': { zh: '其他问题', en: 'Other Issues', kw: '其他,检测' },
}

export function generateServiceMetadata(brandDir, serviceId) {
  const brand = brandInfo[brandDir]
  const service = serviceNames[serviceId]
  if (!brand || !service) {
    return {
      title: 'Crazy维修 | 威海手机电脑维修',
      description: '威海手机维修、电脑维修、换屏、换电池、主板维修、数据恢复。免费检测，先报价后维修，30天质保。',
    }
  }

  const titleZh = `${brand.brand} ${service.zh} — Crazy维修 | 威海手机电脑维修`
  const titleEn = `${brand.brand} ${service.en} — Crazy Repair | Weihai Pro Repair`
  const descZh = `威海${brand.zh}${service.zh}服务。${service.kw}，先免费检测后报价，价格透明不套路。2007年至今奋斗在维修一线，环翠区西门31号。`
  const descEn = `Weihai ${brand.en} ${service.en.toLowerCase()}. Free diagnosis, transparent pricing. Since 2007 at Huancui, West Gate #31.`

  return {
    title: titleZh,
    description: descZh,
    openGraph: {
      title: titleZh,
      description: descZh,
    },
    twitter: {
      title: titleZh,
      description: descZh,
    },
    alternates: {
      canonical: `https://www.crazy-repair.com/${brandDir}/${serviceId}`,
    },
    keywords: `威海${brand.zh}${service.zh},${brand.zh}${service.kw},威海手机维修,威海电脑维修,Crazy维修,${service.kw}`,
  }
}

/**
 * 获取所有品牌页面的元数据标签（用于layout.js static params）
 */
export function getBrandServiceSlugs() {
  const slugs = []
  for (const [brandDir, info] of Object.entries(brandInfo)) {
    // 读取该品牌支持哪些服务
    let services = []
    // 从 sitemap 结构中读取（简化为已知数据）
    switch (brandDir) {
      case 'iphone-repair': services = ['screen-replacement','battery-replacement','water-damage','motherboard-repair','camera-repair','face-id','charging-port']; break
      case 'macbook-repair': services = ['screen-replacement','battery-replacement','water-damage','motherboard-repair','cleaning','keyboard-repair']; break
      case 'samsung-repair': services = ['screen-replacement','battery-replacement','motherboard-repair','charging-port','camera-repair','back-glass']; break
      case 'xiaomi-repair': services = ['screen-replacement','battery-replacement','flash-unlock']; break
      case 'huawei-repair': services = ['screen-replacement','battery-replacement','flash-unlock','motherboard-repair','water-damage','back-glass']; break
      case 'lenovo-repair': case 'dell-repair': case 'hp-repair': case 'asus-repair': case 'acer-repair': case 'msi-repair': case 'surface-repair': case 'hasee-repair':
        services = ['screen-replacement','battery-replacement','keyboard-repair','cleaning','os-upgrade','other-issues']; break
      case 'oppo-repair': case 'vivo-repair': case 'oneplus-repair': case 'honor-repair': case 'google-repair': case 'realme-repair':
        services = ['screen-replacement','battery-replacement','charging-port','motherboard-repair','other-issues']; break
      default: services = ['other-issues']
    }
    for (const svc of services) {
      slugs.push({ brand: brandDir, service: svc })
    }
  }
  return slugs
}
