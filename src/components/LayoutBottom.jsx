'use client'

import { usePathname } from 'next/navigation'
import ReviewSection from './ReviewSection'
import FAQSection from './FAQSection'
import Footer from './Footer'
import ContactModal from './ContactModal'
import FloatingContact from './FloatingContact'

export default function LayoutBottom() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const hideReviews = pathname === '/board'

  return (
    <>
      {/* 首页额外显示FAQ */}
      {isHome && <FAQSection />}
      {/* 所有页面：评价 → 黑色Footer（/board 不显示） */}
      {!hideReviews && <ReviewSection />}
      <Footer />
      <ContactModal />
      <FloatingContact />
    </>
  )
}
