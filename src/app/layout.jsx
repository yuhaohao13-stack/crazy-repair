import './globals.css'

export const metadata = {
  title: {
    default: 'Crazy维修 | 威海手机电脑维修 - 2007年至今维修一线 | 免费检测',
    template: '%s — Crazy维修',
  },
  description: 'Crazy维修 | 2007年至今奋斗在维修一线。威海环翠区西门31号专业手机电脑维修，免费检测先报价，30天质保。换屏、换电池、主板维修、数据恢复，价格透明不套路。',
  keywords: '威海手机维修,威海电脑维修,威海平板维修,威海手机换屏,威海电脑修电脑,威海数码维修,Crazy维修,环翠区维修,威海维修店,威海笔记本维修,威海数据恢复',
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://www.crazy-repair.com',
  },
  openGraph: {
    title: 'Crazy维修 | 威海手机电脑维修 - 2007年至今维修一线',
    description: '2007年至今奋斗在维修一线的Crazy维修，位于威海环翠区西门31号。手机电脑平板维修，免费检测，30天质保，价格透明。',
    url: 'https://www.crazy-repair.com',
    siteName: 'Crazy维修',
    type: 'website',
    locale: 'zh_CN',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔧</text></svg>" />
        <meta name="baidu-site-verification" content="codeva-lWVEr795Rr" />
        <meta name="google-site-verification" content="googlef817775b448da06d" />
      </head>
      <body>{children}</body>
    </html>
  )
}
