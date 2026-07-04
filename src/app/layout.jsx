import './globals.css'
import { SiteProvider } from '../lib/SiteContext'
import ReviewSection from '../components/ReviewSection'
import Footer from '../components/Footer'
import ContactModal from '../components/ContactModal'
import CTASection from '../components/CTASection'

export const metadata = {
  title: {
    default: 'Crazy维修 | 威海手机电脑维修 - 2007年至今',
    template: '%s — Crazy维修官网',
  },
  description: '威海手机维修、电脑维修、换屏、换电池、主板维修、数据恢复。Crazy维修2007年至今奋斗在维修一线，免费检测先报价，价格透明不套路，30天质保。环翠区西门31号。',
  keywords: '威海手机维修,威海电脑维修,威海平板维修,Crazy维修官网,威海手机换屏,威海电脑维修店,威海数码维修,Crazy维修,环翠区维修,威海维修店,威海笔记本维修,威海数据恢复,换屏维修,换电池,主板维修,Crazy Repair,Weihai repair',
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://www.crazy-repair.com',
  },
  openGraph: {
    title: 'Crazy维修 | 威海手机电脑维修 - 2007年至今 | 免费检测',
    description: '威海手机维修、电脑维修、换屏、换电池、主板维修、数据恢复。2007年至今奋斗在维修一线，免费检测，30天质保。Crazy Repair Official - Weihai pro repair since 2007.',
    url: 'https://www.crazy-repair.com',
    siteName: 'Crazy维修',
    type: 'website',
    locale: 'zh_CN',
    images: [
      {
        url: 'https://www.crazy-repair.com/favicon.svg',
        width: 512,
        height: 512,
        alt: 'Crazy维修',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crazy维修 | 威海手机电脑维修 - 2007年至今',
    description: '威海手机维修、电脑维修、换屏、电池、主板维修。2007年至今奋斗在维修一线，免费检测，30天质保。',
    images: ['https://www.crazy-repair.com/favicon.svg'],
  },
}

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Crazy维修',
    alternateName: 'Crazy Repair',
    description: '威海手机电脑维修，2007年至今奋斗在维修一线。免费检测，价格透明，30天质保。专业维修iPhone、Samsung、华为、小米、OPPO、vivo、OnePlus、联想、戴尔、惠普、华硕等全品牌手机电脑。',
    foundingDate: '2007',
    foundingLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: '威海',
        addressRegion: '山东',
        addressCountry: 'CN',
      },
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '西门31号',
      addressLocality: '环翠区',
      addressRegion: '威海',
      addressCountry: 'CN',
    },
    telephone: '+65 96146709',
    openingHours: 'Mo-Su 08:00-19:00',
    url: 'https://www.crazy-repair.com',
    image: 'https://www.crazy-repair.com/favicon.svg',
    priceRange: '¥¥',
    areaServed: [
      {
        '@type': 'City',
        name: '威海',
      },
      {
        '@type': 'AdministrativeArea',
        name: '环翠区',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: '手机电脑维修服务',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '手机屏幕更换' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '手机电池更换' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '电脑主板维修' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '数据恢复' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '进水维修' } },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      ratingCount: '500+',
    },
    sameAs: [
      'https://www.gudaoforum.com',
    ],
  }

  return (
    <html lang="zh-CN">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <meta name="apple-mobile-web-app-title" content="Crazy维修" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="baidu-site-verification" content="codeva-lWVEr795Rr" />
        <meta name="google-site-verification" content="googlef817775b448da06d" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SiteProvider>
          {children}
          <ReviewSection />
          <CTASection />
          <Footer />
          <ContactModal />
        </SiteProvider>
      </body>
    </html>
  )
}
