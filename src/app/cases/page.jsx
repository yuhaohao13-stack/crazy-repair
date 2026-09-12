import { getAllCaseIndex, getLikeCounts } from '../../lib/case-store'
import { tagOrder, tagSlugMap } from '../../lib/caseTags'
import Navbar from '../../components/Navbar'
import Breadcrumb from '../../components/Breadcrumb'
import CaseBrowser from '../../components/CaseBrowser'
import CaseAdminPanel from '../../components/CaseAdminPanel'

export const revalidate = 300

const slugForTag = (tag) => tagSlugMap[tag] || tag

export default async function CasesPage() {
  const [allCases, likes] = await Promise.all([getAllCaseIndex(), getLikeCounts()])

  // 品牌标签（用于顶部入口，点击进对应分类页）
  const tagCounts = {}
  for (const c of allCases) tagCounts[c.tag] = (tagCounts[c.tag] || 0) + 1
  const sortedTags = tagOrder.filter(t => tagCounts[t]).concat(Object.keys(tagCounts).filter(t => !tagOrder.includes(t)))

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb items={[{ label: '维修案例库', labelEn: 'Repair Cases' }]} />
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl font-bold mb-3">维修案例库</h1>
              <p className="text-blue-100 leading-relaxed">
                {allCases.length}+ 篇真实维修案例文章——换屏、换电池、不开机、进水、主板维修、扩容、清灰……全部来自 Crazy维修 实战记录（含图文过程）。可按最新/热帖浏览、搜索关键词，或点品牌看分类案例。
              </p>
            </div>
            <div className="shrink-0 pt-1">
              <CaseAdminPanel />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-5">
            {sortedTags.map(tag => (
              <a key={tag} href={`/cases/tag/${slugForTag(tag)}`} className="bg-white/15 hover:bg-white/25 backdrop-blur px-3 py-1 rounded-full text-sm transition-colors">
                {tag}（{tagCounts[tag]}）
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <CaseBrowser cases={allCases} initialLikes={likes} />
      </div>
    </div>
  )
}
