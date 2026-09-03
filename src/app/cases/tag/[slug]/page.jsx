import caseIndex from '../../../../data/case-articles-index'
import Navbar from '../../../../components/Navbar'
import Breadcrumb from '../../../../components/Breadcrumb'
import CaseSearchBox from '../../../../components/CaseSearchBox'
import { slugTagMap } from '../../../../lib/caseTags'
import { notFound } from 'next/navigation'

// 该分类下所有文章（供搜索）
function getTagArticles(tag) {
  return caseIndex.filter(c => c.tag === tag)
}

export function generateStaticParams() {
  return Object.keys(slugTagMap).map(slug => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const tag = slugTagMap[slug]
  if (!tag) return { title: '分类不存在' }
  const count = getTagArticles(tag).length
  return {
    title: `${tag}维修案例_${count}篇真实维修记录`,
    description: `Crazy维修${tag}维修案例${count}篇（含图文）：换屏、换电池、主板维修、进水处理等真实维修过程。威海手机电脑维修2007年至今，免费检测先报价，30天质保。`,
    alternates: { canonical: `https://www.crazy-repair.com/cases/tag/${slug}` },
  }
}

export default async function CaseTagPage({ params }) {
  const { slug } = await params
  const tag = slugTagMap[slug]
  if (!tag) notFound()
  const articles = getTagArticles(tag)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb items={[{ label: '维修案例库', labelEn: 'Repair Cases', href: '/cases' }, { label: `${tag}维修案例`, labelEn: `${tag} Cases` }]} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{tag}维修案例</h1>
          <p className="text-sm text-gray-400 mt-1">共 {articles.length} 篇 · 点击阅读完整维修过程</p>
        </div>
        <CaseSearchBox articles={articles} />
      </div>
    </div>
  )
}
