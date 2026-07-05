'use client'
import { useSite } from '../lib/SiteContext'

/**
 * 面包屑导航组件
 * items: [{ label?, labelEn?, href? }] — 最后一项无href即为当前页
 */
export default function Breadcrumb({ items }) {
  const { lang } = useSite()
  const t = (zh, en) => lang === 'zh' ? zh : en

  return (
    <nav className="bg-gray-50 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 text-xs text-gray-500 flex gap-1.5 flex-wrap items-center">
        <a href="/" className="hover:text-blue-600 transition-colors">{t('首页', 'Home')}</a>
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <span className="text-gray-300">/</span>
            {item.href ? (
              <a href={item.href} className="hover:text-blue-600 transition-colors">
                {item.labelEn ? t(item.label, item.labelEn) : item.label}
              </a>
            ) : (
              <span className="text-gray-800 font-medium">
                {item.labelEn ? t(item.label, item.labelEn) : item.label}
              </span>
            )}
          </span>
        ))}
      </div>
    </nav>
  )
}
