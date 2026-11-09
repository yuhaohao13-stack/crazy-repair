// 动态 sitemap（2026-10-25）：每次构建/部署自动读案例库，新案例当天进 sitemap
// 取代 public/sitemap.xml 那个 9-14 的静态文件

import caseArticles from '../data/repair-case-articles'
import { slugTagMap } from '../lib/caseTags'

const BASE = 'https://www.crazy-repair.com'

// 主要静态页 + 品牌页（与 src/app 下的目录保持一致）
const STATIC_PATHS = [
  '',
  '/cases',
  '/services',
  '/reviews',
  '/board',
  '/lcd',
  '/phone-repair',
  '/computer-repair',
  '/tablet-repair',
  '/watch-repair',
  '/console-repair',
  '/camera-repair',
  '/headphone-repair',
  '/iphone-repair',
  '/ipad-repair',
  '/macbook-repair',
  '/samsung-repair',
  '/huawei-repair',
  '/xiaomi-repair',
  '/oppo-repair',
  '/vivo-repair',
  '/oneplus-repair',
  '/honor-repair',
  '/realme-repair',
  '/google-repair',
  '/sony-repair',
  '/lenovo-repair',
  '/dell-repair',
  '/hp-repair',
  '/asus-repair',
  '/acer-repair',
  '/msi-repair',
  '/surface-repair',
  '/nintendo-repair',
  '/kindle-repair',
  '/hasee-repair',
  '/other-repair',
]

function safeDate(d) {
  const t = d ? new Date(d) : new Date()
  return isNaN(t.getTime()) ? new Date() : t
}

export default function sitemap() {
  const now = new Date()

  const staticEntries = STATIC_PATHS.map((p) => ({
    url: `${BASE}${p}`,
    lastModified: now,
    changeFrequency: p === '' || p === '/cases' ? 'daily' : 'weekly',
    priority: p === '' ? 1.0 : p === '/cases' ? 0.9 : 0.7,
  }))

  // 2026-11-09 SEO 调整：只提交近 36 个月的案例（约 487 条），其余靠内链被发现。
  // 原因：1,388 条同构案例全量提交 → Search Console 显示 906/1516 未收录，
  //       Google 判定「已抓取 - 尚未编入索引」402 条，属于模板重复度过高。
  const CUTOFF_MONTHS = 36
  const cutoff = new Date()
  cutoff.setMonth(cutoff.getMonth() - CUTOFF_MONTHS)

  const caseEntries = (caseArticles || [])
    .filter((c) => safeDate(c.date) >= cutoff)
    .map((c) => ({
      url: `${BASE}/cases/${c.id}`,
      lastModified: safeDate(c.date),
      changeFrequency: 'monthly',
      priority: 0.8,
    }))

  const tagEntries = Object.keys(slugTagMap || {}).map((slug) => ({
    url: `${BASE}/cases/tag/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  return [...staticEntries, ...caseEntries, ...tagEntries]
}
