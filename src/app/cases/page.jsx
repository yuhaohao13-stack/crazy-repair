import caseIndex from '../../data/case-articles-index'
import Navbar from '../../components/Navbar'
import Breadcrumb from '../../components/Breadcrumb'
import CaseSection from '../../components/CaseSection'
import { tagSlugMap, tagOrder } from '../../lib/caseTags'

// 按标签分组
const groups = {}
for (const c of caseIndex) {
  if (!groups[c.tag]) groups[c.tag] = []
  groups[c.tag].push(c)
}
const sortedTags = tagOrder.filter(t => groups[t]).concat(Object.keys(groups).filter(t => !tagOrder.includes(t)))

export default function CasesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb items={[{ label: '维修案例库', labelEn: 'Repair Cases' }]} />
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">维修案例库</h1>
          <p className="text-blue-100 leading-relaxed">
            1300+ 篇真实维修案例文章——换屏、换电池、不开机、进水、主板维修、扩容、清灰……全部来自 Crazy维修 实战记录（含图文过程）。点击分类或搜索关键词，找到你设备对应的维修案例。
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            {sortedTags.map(tag => (
              <a key={tag} href={`/cases/tag/${tagSlugMap[tag] || tag}`} className="bg-white/15 hover:bg-white/25 backdrop-blur px-3 py-1 rounded-full text-sm transition-colors">
                {tag}（{groups[tag].length}）
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {sortedTags.map(tag => (
          <CaseSection
            key={tag}
            tag={tag}
            count={groups[tag].length}
            articles={groups[tag]}
            slug={tagSlugMap[tag] || tag}
          />
        ))}
      </div>
    </div>
  )
}
