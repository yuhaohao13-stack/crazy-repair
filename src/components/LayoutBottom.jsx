'use client'

import { usePathname } from 'next/navigation'
import ReviewSection from './ReviewSection'
import FAQSection from './FAQSection'
import CTASection from './CTASection'

export default function LayoutBottom() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <>
      {/* 所有页面：评价 → CTA → Footer */}
      {/* 首页额外加 FAQ */}
      {isHome && <FAQSection />}
      <ReviewSection />
      <CTASection />
    </>
  )
}
