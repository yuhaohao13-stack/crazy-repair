import brands from '../../lib/brand-page-meta'

const meta = brands['huawei-repair']

export const metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: {
    canonical: 'https://www.crazy-repair.com/huawei-repair',
  },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: 'https://www.crazy-repair.com/huawei-repair',
    siteName: 'Crazy维修',
    type: 'website',
  },
}

export default function BrandLayout({children}) {
  return children
}
