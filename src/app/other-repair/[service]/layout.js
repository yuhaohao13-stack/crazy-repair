// other-repair/[service] 设备子页 metadata（此前漏配，canonical 错误指父页）
const DEVICE_TITLES = {
  watch: 'Apple Watch智能手表维修', 'samsung-watch': '三星Galaxy Watch手表维修',
  console: '游戏机维修', headphone: '耳机维修', camera: '相机/无人机维修',
  mods: '改装配件', other: '其他数码设备维修', 'smart-home': '智能家居设备维修',
}

export async function generateMetadata({ params }) {
  const { service } = await params
  const device = DEVICE_TITLES[service]
  if (!device) {
    return { title: { absolute: '其他数码设备维修 - Crazy维修威海' } }
  }
  return {
    title: { absolute: `威海${device} - 免费检测 | Crazy维修` },
    description: `威海${device}：专业维修，免费检测先报价，30天质保。Crazy维修2007年至今，环翠区西门31号。`,
    alternates: { canonical: `https://www.crazy-repair.com/other-repair/${service}` },
  }
}

export default function OtherDeviceLayout({ children }) {
  return children
}
