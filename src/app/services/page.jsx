'use client'
import { useSite } from '../../lib/SiteContext'
import Navbar from '../../components/Navbar'
import Seo from '../../components/Seo'

const GROUPS = [
  {
    icon: '📱',
    zh: '手机服务', en: 'Phone Services',
    descZh: '苹果 / 三星 / 华为 / 小米 / OPPO / vivo / 一加 / 荣耀 / 谷歌 / 真我 全品牌',
    descEn: 'Apple / Samsung / Huawei / Xiaomi / OPPO / vivo / OnePlus / Honor / Google / Realme',
    more: '/phone-repair', moreZh: '查看全部手机维修 →', moreEn: 'All Phone Repair →',
    brands: [
      { n: 'Apple', cn: '苹果 iPhone', l: '/iphone-repair' },
      { n: 'Samsung', cn: '三星', l: '/samsung-repair' },
      { n: 'Huawei', cn: '华为', l: '/huawei-repair' },
      { n: 'Xiaomi', cn: '小米', l: '/xiaomi-repair' },
      { n: 'OPPO', cn: 'OPPO', l: '/oppo-repair' },
      { n: 'vivo', cn: 'vivo', l: '/vivo-repair' },
      { n: 'OnePlus', cn: '一加', l: '/oneplus-repair' },
      { n: 'Honor', cn: '荣耀', l: '/honor-repair' },
      { n: 'Google', cn: '谷歌 Pixel', l: '/google-repair' },
      { n: 'Realme', cn: '真我', l: '/realme-repair' },
    ],
  },
  {
    icon: '💻',
    zh: '电脑服务', en: 'Computer Services',
    descZh: '苹果 MacBook / 联想 / 戴尔 / 惠普 / 华硕 / 宏基 / 微星 / 微软 Surface / 华为 MateBook',
    descEn: 'Apple MacBook / Lenovo / Dell / HP / ASUS / Acer / MSI / Surface / Huawei MateBook',
    more: '/computer-repair', moreZh: '查看全部电脑维修 →', moreEn: 'All Computer Repair →',
    brands: [
      { n: 'Apple Mac', cn: '苹果 MacBook', l: '/macbook-repair' },
      { n: 'Lenovo', cn: '联想 ThinkPad/小新', l: '/lenovo-repair' },
      { n: 'Dell', cn: '戴尔', l: '/dell-repair' },
      { n: 'HP', cn: '惠普', l: '/hp-repair' },
      { n: 'ASUS', cn: '华硕 ROG', l: '/asus-repair' },
      { n: 'Acer', cn: '宏基', l: '/acer-repair' },
      { n: 'MSI', cn: '微星', l: '/msi-repair' },
      { n: 'Surface', cn: '微软 Surface', l: '/surface-repair' },
      { n: 'Huawei', cn: '华为 MateBook', l: '/huawei-repair' },
      { n: 'Hasee', cn: '神舟', l: '/hasee-repair' },
    ],
  },
  {
    icon: '🎮',
    zh: '其他服务', en: 'Other Services',
    descZh: '平板 / 手表 / 耳机 / 相机 / 游戏机 / 电子书等数码设备',
    descEn: 'Tablets / Watches / Earphones / Cameras / Consoles / E-readers',
    more: '/other-repair', moreZh: '查看全部其他维修 →', moreEn: 'All Other Repair →',
    brands: [
      { n: 'Apple iPad', cn: 'iPad 平板', l: '/ipad-repair' },
      { n: 'Tablet', cn: '安卓平板', l: '/tablet-repair' },
      { n: 'Watch', cn: '智能手表', l: '/watch-repair' },
      { n: 'Headphone', cn: '耳机 / AirPods', l: '/headphone-repair' },
      { n: 'Camera', cn: '相机', l: '/camera-repair' },
      { n: 'Console', cn: '游戏机 PS5', l: '/console-repair' },
      { n: 'Nintendo', cn: '任天堂 Switch', l: '/nintendo-repair' },
      { n: 'Sony', cn: '索尼', l: '/sony-repair' },
      { n: 'Kindle', cn: '亚马逊 Kindle', l: '/kindle-repair' },
    ],
  },
]

export default function ServicesPage() {
  const { lang } = useSite()
  const t = (zh, en) => lang === 'zh' ? zh : en

  return (
    <>
      <Seo
        title="威海手机电脑维修服务项目_Crazy维修_全品牌维修"
        description="Crazy维修服务项目：手机服务（iPhone/三星/华为/小米/OPPO/vivo等）、电脑服务（MacBook/联想/戴尔/惠普/华硕等）、其他数码服务（iPad/手表/耳机/相机/游戏机）。威海环翠区西门31号，免费检测先报价，30天质保。"
        keywords="威海手机维修,威海电脑维修,手机维修服务项目,电脑维修服务项目,威海iPhone维修,MacBook维修,威海平板维修,威海手表维修,环翠区维修"
      />
      <div className="min-h-screen bg-white">
        <Navbar />

        <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 text-center">
            <h1 className="text-3xl sm:text-5xl font-bold mb-3">{t('服务项目', 'Our Services')}</h1>
            <p className="text-blue-100 text-lg">{t('手机 · 电脑 · 其他数码设备维修', 'Phone · Computer · Other Device Repair')}</p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-14">
          {GROUPS.map((g, gi) => (
            <section key={gi}>
              <div className="flex items-end justify-between mb-5 border-b border-gray-100 pb-3">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <span>{g.icon}</span> {t(g.zh, g.en)}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{t(g.descZh, g.descEn)}</p>
                </div>
                <a href={g.more} className="text-sm text-blue-600 hover:text-blue-700 whitespace-nowrap font-medium">
                  {t(g.moreZh, g.moreEn)}
                </a>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                {g.brands.map((b, i) => (
                  <a key={i} href={b.l}
                     className="text-center px-3 py-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-300 hover:-translate-y-0.5 transition-all">
                    <div className="text-sm sm:text-base font-bold text-gray-800">{b.n}</div>
                    <div className="text-xs text-gray-400 mt-1">{b.cn}</div>
                    <div className="text-[11px] text-blue-500 mt-2">{t('查看服务 →', 'View →')}</div>
                  </a>
                ))}
              </div>
            </section>
          ))}

          <section className="bg-gray-50 rounded-2xl p-6 text-center">
            <h3 className="font-bold text-gray-800 mb-1">{t('没找到你的设备？', "Don't see your device?")}</h3>
            <p className="text-sm text-gray-500 mb-3">{t('免费检测，先报价后维修；其他品牌/机型也接。', 'Free diagnosis, quote first. Other brands/models welcome.')}</p>
            <a href="/cases" className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors">
              {t('看看维修案例 →', 'See Repair Cases →')}
            </a>
          </section>
        </div>
      </div>
    </>
  )
}
