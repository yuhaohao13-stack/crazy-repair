import { repairServices } from '../../../data/repairServices'

// ipad-repair/[service] 服务页 metadata（与其他品牌同构，但此前漏配 layout.js）
const SERVICE_FALLBACK = {
  'screen-replacement': '屏幕更换', 'battery-replacement': '电池更换', 'charging-port': '充电口维修',
  'motherboard-repair': '主板维修', 'water-damage': '进水维修', 'camera-repair': '摄像头维修',
  'back-glass': '后盖玻璃更换', 'face-id': '面容修复', 'flash-unlock': '刷机解锁', 'other-issues': '其他问题',
}

export async function generateMetadata({ params }) {
  const { service } = await params
  let svcTitle = ''
  try {
    const ipad = repairServices['ipad']
    const svc = ipad?.services?.find(s => s.id === service)
    svcTitle = svc?.title || SERVICE_FALLBACK[service] || service || ''
  } catch {
    svcTitle = SERVICE_FALLBACK[service] || service || ''
  }
  const title = `威海iPad ${svcTitle} - 平板维修 | Crazy维修`
  const desc = `威海iPad${svcTitle}服务。iPad Pro/Air/Mini/数字系列，免费检测先报价，30天质保。Crazy维修2007年至今。`
  return {
    title: { absolute: title },
    description: desc,
    alternates: { canonical: `https://www.crazy-repair.com/ipad-repair/${service}` },
  }
}

export default function IpadServiceLayout({ children }) {
  return children
}
