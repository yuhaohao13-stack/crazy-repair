import repairCases from '../../data/repair-cases-index'

// 按标签分组
const groups = {}
for (const c of repairCases) {
  if (!groups[c.tag]) groups[c.tag] = []
  groups[c.tag].push(c)
}

export default function CasesPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">维修案例库</h1>
          <p className="text-blue-100 leading-relaxed">
            500+ 真实维修案例——屏幕碎了、电池不耐用、不开机、进水、主板故障……Crazy维修 2007 年至今的实战记录。看看我们是怎么修好的，你的设备有类似问题可以直接对照参考。
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            {Object.keys(groups).map(tag => (
              <a key={tag} href={`#${tag}`} className="bg-white/15 hover:bg-white/25 backdrop-blur px-3 py-1 rounded-full text-sm transition-colors">
                {tag}（{groups[tag].length}）
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {Object.entries(groups).map(([tag, cases]) => (
          <section key={tag} id={tag} className="mb-10 scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{tag}维修案例</h2>
            <p className="text-sm text-gray-400 mb-4">共 {cases.length} 例</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {cases.map(c => (
                <details key={c.id} className="group bg-gray-50 rounded-xl border border-gray-100 open:border-blue-200 transition-colors">
                  <summary className="cursor-pointer list-none px-4 py-3 flex items-start gap-2 hover:bg-blue-50/50 rounded-xl">
                    <span className="text-blue-600 mt-0.5 shrink-0">🔧</span>
                    <div>
                      <div className="font-semibold text-gray-800 text-sm leading-snug">{c.title}</div>
                      <div className="text-xs text-gray-400 mt-1 group-open:hidden">点击查看案例详情 ↓</div>
                    </div>
                  </summary>
                  <div className="px-4 pb-4 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                    <p>{c.excerpt}</p>
                    <p className="mt-2 text-blue-600 text-xs">有类似问题？📱 联系 Crazy维修 免费检测咨询</p>
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
