'use client'

import { usePathname } from 'next/navigation'
import ReviewSection from './ReviewSection'
import FAQSection from './FAQSection'
import CTASection from './CTASection'

export default function LayoutBottom() {
  const pathname = usePathname()

  // 首页显示全套，品牌服务页面只显示评价
  const isHome = pathname === '/'

  return (
    <>
      {/* 首页：FAQ → 评价 → CTA */}
      {/* 品牌页：只显示评价 */}
      {isHome && <FAQSection />}
      <ReviewSection />
      {isHome && <CTASection />}
    </>
  )
}
