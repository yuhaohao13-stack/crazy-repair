// 联系数据统一配置

// 微信号
export const WECHAT_ID = 'crazy-repair'

// 电话号码
export const PHONE_CHINA = '+8613573735550'
export const PHONE_SG = '+6596146709'

// 根据页面路径生成对应的短信咨询内容
export function getSmsBody(pathname) {
  const p = pathname || ''
  
  // 首页
  if (p === '/') {
    return '你好，我有手机电脑维修业务想咨询'
  }

  // 品牌详情页：/iphone-repair/screen-replacement
  const brandMatch = p.match(/^\/(.+?)-repair\/(.+)/)
  if (brandMatch) {
    const brand = brandName(brandMatch[1])
    const service = serviceName(brandMatch[2])
    const body = service
      ? `你好，我想咨询${brand}${service}，请问怎么收费？`
      : `你好，我想咨询${brand}维修`
    // 限制长度
    return body.length > 70 ? body.slice(0, 70) + '...' : body
  }

  // 品牌首页：/iphone-repair
  const brandPageMatch = p.match(/^\/(.+?)-repair\/?$/)
  if (brandPageMatch) {
    return `你好，我想咨询${brandName(brandPageMatch[1])}维修`
  }

  // 品类页：/phone-repair, /computer-repair
  if (p.includes('phone-repair') || p.includes('phone-repair/')) {
    return '你好，我想咨询手机维修'
  }
  if (p.includes('computer-repair')) {
    return '你好，我想咨询电脑维修'
  }
  if (p.includes('tablet-repair')) {
    return '你好，我想咨询平板维修'
  }
  if (p.includes('watch-repair')) {
    return '你好，我想咨询手表维修'
  }
  if (p.includes('camera-repair')) {
    return '你好，我想咨询相机维修'
  }
  if (p.includes('console-repair')) {
    return '你好，我想咨询游戏机维修'
  }
  if (p.includes('headphone-repair')) {
    return '你好，我想咨询耳机维修'
  }
  if (p.includes('kindle-repair')) {
    return '你好，我想咨询Kindle维修'
  }
  if (p.includes('nintendo-repair')) {
    return '你好，我想咨询任天堂维修'
  }
  if (p.includes('other-repair')) {
    return '你好，我想咨询其他数码产品维修'
  }
  if (p.includes('sony-repair')) {
    return '你好，我想咨询索尼设备维修'
  }

  return '你好，我有手机电脑维修业务想咨询'
}

// 品牌中文名映射
function brandName(key) {
  const map = {
    'iphone': 'iPhone',
    'iphone': 'iPhone',
    'samsung': '三星',
    'huawei': '华为',
    'xiaomi': '小米',
    'oppo': 'OPPO',
    'vivo': 'vivo',
    'oneplus': 'OnePlus',
    'realme': 'Realme',
    'honor': '荣耀',
    'google': 'Google Pixel',
    'macbook': 'MacBook',
    'acer': 'Acer',
    'asus': '华硕',
    'dell': '戴尔',
    'hp': '惠普',
    'lenovo': '联想',
    'msi': '微星',
    'surface': 'Surface',
    'hasee': '神舟',
  }
  return map[key] || key.charAt(0).toUpperCase() + key.slice(1)
}

// 服务中文名映射
function serviceName(key) {
  const map = {
    'screen-replacement': '换屏幕',
    'battery-replacement': '换电池',
    'water-damage': '进水维修',
    'motherboard-repair': '主板维修',
    'camera-repair': '摄像头维修',
    'face-id': '面容/指纹维修',
    'charging-port': '充电口维修',
    'speaker-repair': '扬声器维修',
    'microphone-repair': '麦克风维修',
    'button-repair': '按键维修',
    'back-glass': '后盖玻璃更换',
    'screen-repair': '屏幕维修',
    'data-recovery': '数据恢复',
    'software-issue': '软件问题',
    'logic-board': '逻辑板维修',
    'keyboard-repair': '键盘维修',
    'trackpad-repair': '触摸板维修',
    'fan-replacement': '风扇更换',
    'thermal-paste': '换硅脂清灰',
    'upgrade-ram': '内存升级',
    'upgrade-ssd': '固态硬盘升级',
    'display-replacement': '屏幕更换',
    'hinge-repair': '转轴维修',
    'power-jack': '电源口维修',
    'gpu-repair': '显卡维修',
    'lcd-replacement': '液晶屏更换',
    'touch-repair': '触摸屏维修',
    'mainboard-repair': '主板维修',
    'headphone-jack': '耳机口维修',
    'pixel-repair': '坏点/亮点修复',
    'backlight-repair': '背光维修',
  }
  return map[key] || key.replace(/-/g, ' ')
}

// 短信 URL
export function smsUrl(phone, body) {
  return `sms:${phone}?body=${encodeURIComponent(body)}`
}

// 微信复制 + 跳转
export function copyAndOpenWechat(callback) {
  const val = WECHAT_ID
  // 复制到剪贴板
  const doCopy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(val)
    }
    // fallback
    return new Promise((resolve, reject) => {
      try {
        const ta = document.createElement('textarea')
        ta.value = val
        ta.style.position = 'fixed'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
        resolve()
      } catch(e) {
        reject(e)
      }
    })
  }

  doCopy().then(() => {
    callback && callback(true)
    // 尝试跳转微信
    try {
      window.location.href = 'weixin://'
    } catch(e) {}
  }).catch(() => {
    callback && callback(false)
  })
}
