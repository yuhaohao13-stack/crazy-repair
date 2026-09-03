import caseIndex from '../../data/case-articles-index'
import Navbar from '../../components/Navbar'
import Breadcrumb from '../../components/Breadcrumb'

// 按标签分组
const groups = {}
for (const c of caseIndex) {
  if (!groups[c.tag]) groups[c.tag] = []
  groups[c.tag].push(c)
}
// 自定义分组顺序（手机品牌优先）
const order = ['iPhone','iPad','MacBook','三星','华为','小米','OPPO','vivo','一加','荣耀','华硕','联想','戴尔','惠普','游戏机','相机','手表','耳机','电脑/笔记本','手机通用','其他']
const sortedTags = order.filter(t => groups[t]).concat(Object.keys(groups).filter(t => !order.includes(t)))

export default function CasesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb items={[{ label: '维修案例库', labelEn: 'Repair Cases' }]} />
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">维修案例库</h1>
          <p className="text-blue-100 leading-relaxed">
            1300+ 篇真实维修案例文章——换屏、换电池、不开机、进水、主板维修、扩容、清灰……全部来自 Crazy维修 实战记录（含图文过程）。点开看完整维修过程，你的设备有类似问题可以直接对照参考。
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            {sortedTags.map(tag => (
              <a key={tag} href={`#${tag}`} className="bg-white/15 hover:bg-white/25 backdrop-blur px-3 py-1 rounded-full text-sm transition-colors">
                {tag}（{groups[tag].length}）
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {sortedTags.map(tag => (
          <section key={tag} id={tag} className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{tag}维修案例</h2>
            <p className="text-sm text-gray-400 mb-4">共 {groups[tag].length} 篇 · 点击阅读完整维修过程</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {groups[tag].map(c => (
                <a key={c.id} href={`/cases/${c.id}`} className="group bg-gray-50 hover:bg-blue-50/60 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors px-4 py-3 flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5 shrink-0">🔧</span>
                  <div>
                    <div className="font-semibold text-gray-800 text-sm leading-snug group-hover:text-blue-700">{c.title}</div>
                    <div className="text-xs text-gray-400 mt-1 line-clamp-2">{c.excerpt}</div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
