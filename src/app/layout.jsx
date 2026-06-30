import './globals.css'

export const metadata = {
  title: 'Crazy维修 | 威海手机电脑维修 - 专业快速',
  description: 'Crazy维修(Crazy-repair) - 威海环翠区专业手机维修、电脑维修、平板维修服务。快速诊断，诚信报价，质保售后。',
  keywords: '威海手机维修,威海电脑维修,威海平板维修,威海维修店,Crazy维修,环翠区维修',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
