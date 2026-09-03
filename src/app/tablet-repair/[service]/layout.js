// tablet-repair/[service] 品牌子页 metadata（此前漏配，canonical 错误指父页）
const BRAND_TITLES = {
  ipad: 'iPad平板维修', samsung: '三星Galaxy Tab平板维修', huawei: '华为MatePad平板维修',
  xiaomi: '小米Redmi Pad平板维修', oppo: 'OPPO/OnePlus平板维修', lenovo: '联想/荣耀平板维修',
  kindle: 'Kindle电子书维修',
}

export async function generateMetadata({ params }) {
  const { service } = await params
  const brand = BRAND_TITLES[service]
  if (!brand) {
    return { title: { absolute: '平板维修 - Crazy维修威海' } }
  }
  return {
    title: { absolute: `威海${brand} - 换屏换电池 | Crazy维修` },
    description: `威海${brand}：屏幕更换、电池更换、充电口维修、主板维修、进水处理。免费检测先报价，30天质保，Crazy维修2007年至今。`,
    alternates: { canonical: `https://www.crazy-repair.com/tablet-repair/${service}` },
  }
}

export default function TabletBrandLayout({ children }) {
  return children
}
