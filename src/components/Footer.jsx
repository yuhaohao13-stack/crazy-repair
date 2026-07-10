'use client'

import { useSite } from '../lib/SiteContext'

export default function Footer() {
  const { lang } = useSite()
  const t = (zh, en) => lang === 'zh' ? zh : en
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🔧</span>
              <span className="font-bold text-white text-lg">{t('Crazy维修', 'Crazy Repair')}</span>
            </div>
            <p className="text-sm leading-relaxed">{t('威海环翠区专业数码维修，诚信经营，先检测后维修。', 'Professional digital device repair in Huancui, Weihai — honest service, test before repair.')}</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">{t('品牌维修', 'Brand Repairs')}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/iphone-repair" className="hover:text-white transition-colors">{t('iPhone 维修', 'iPhone Repair')}</a></li>
              <li><a href="/macbook-repair" className="hover:text-white transition-colors">{t('MacBook 维修', 'MacBook Repair')}</a></li>
              <li><a href="/samsung-repair" className="hover:text-white transition-colors">{t('Samsung 维修', 'Samsung Repair')}</a></li>
              <li><a href="/xiaomi-repair" className="hover:text-white transition-colors">{t('Xiaomi 维修', 'Xiaomi Repair')}</a></li>
              <li><a href="/huawei-repair" className="hover:text-white transition-colors">{t('Huawei 维修', 'Huawei Repair')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">{t('快速链接', 'Quick Links')}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white transition-colors">{t('首页', 'Home')}</a></li>
              <li><a href="/#services" className="hover:text-white transition-colors">{t('服务项目', 'Services')}</a></li>
              <li><a href="/#about" className="hover:text-white transition-colors">{t('关于我们', 'About Us')}</a></li>
              <li><a href="/#reviews" className="hover:text-white transition-colors">{t('客户评价', 'Reviews')}</a></li>
              <li><a href="/board" className="hover:text-white transition-colors">{t('维修求助', 'Repair Help')}</a></li>
              <li><a href="/#faq" className="hover:text-white transition-colors">{t('常见问题', 'FAQ')}</a></li>
              <li><a href="https://www.gudaoforum.com/games" target="_blank" rel="noopener" className="hover:text-white transition-colors">{t('休闲娱乐-小游戏', 'Mini Games')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">{t('联系方式', 'Contact')}</h4>
            <ul className="space-y-2 text-sm">
              <li>{t('微信: crazy-repair', 'WeChat: crazy-repair')}</li>
              <li>{t('手机: ', 'Phone: ')}<a href="tel:+8613573735550" className="hover:text-white transition-colors">{t('+86 13573735550', '+86 13573735550')}</a></li>
              <li>{t('WhatsApp: +65 96146709', 'WhatsApp: +65 96146709')}</li>
              <li>{t('地址: 威海环翠区西门31号', 'Address: No.31 Ximen, Huancui Dist., Weihai')}</li>
              <li>{t('营业时间: 周一至周日 8:00-19:00', 'Hours: Mon-Sun 8:00-19:00')}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-xs">
          <p>{t('© 2026 Crazy维修 (Crazy-repair). 保留所有权利。', '© 2026 Crazy Repair (Crazy-repair). All rights reserved.')}</p>
        </div>
      </div>
    </footer>
  )
}
