import caseArticles from '../../../data/repair-case-articles'
import { notFound } from 'next/navigation'
import Navbar from '../../../components/Navbar'
import Breadcrumb from '../../../components/Breadcrumb'

// 轻量 markdown 渲染：处理 **加粗**、行内链接、- 列表、数字列表、标题、分隔线
// 先转义 HTML 再处理 markdown，防止 XSS
function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function renderInline(text) {
  // 先转义
  let html = esc(text)
  // **加粗**
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  // 行内链接 [text](url)
  html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener" class="text-blue-600 underline">$1</a>')
  // 裸 youtube 链接变可点
  html = html.replace(/(https?:\/\/\S+)/g, (m) => {
    if (m.startsWith('<a ')) return m
    return `<a href="${m}" target="_blank" rel="noopener" class="text-blue-600 underline break-all">${m}</a>`
  })
  return html
}

function renderContent(content) {
  const lines = (content || '').split('\n')
  const blocks = []
  let list = []
  const flushList = () => {
    if (list.length) {
      blocks.push(<ul key={`ul-${blocks.length}`} className="list-disc pl-5 space-y-1 my-2 text-gray-700">{list}</ul>)
      list = []
    }
  }
  for (const raw of lines) {
    const line = raw.trimEnd()
    if (!line.trim()) { flushList(); continue }
    // 分隔线 ━━━
    if (/^━{3,}$/.test(line.trim())) { flushList(); blocks.push(<hr key={`hr-${blocks.length}`} className="my-4 border-gray-200" />); continue }
    // 标题 ## / ###
    const h = line.match(/^(#{1,4})\s+(.*)$/)
    if (h) {
      flushList()
      const level = h[1].length
      const cls = level === 1 ? 'text-2xl font-bold mt-6 mb-2' : level === 2 ? 'text-xl font-bold mt-5 mb-2' : 'text-lg font-semibold mt-4 mb-2'
      const Tag = level <= 2 ? 'h2' : level === 3 ? 'h3' : 'h4'
      blocks.push(<Tag key={`h-${blocks.length}`} className={cls + ' text-gray-900'} dangerouslySetInnerHTML={{ __html: renderInline(h[2].trim()) }} />)
      continue
    }
    // 列表项 - 或 •
    if (/^[-•]\s+/.test(line.trim())) {
      list.push(<li key={`li-${list.length}`} dangerouslySetInnerHTML={{ __html: renderInline(line.trim().replace(/^[-•]\s+/, '')) }} />)
      continue
    }
    // 数字列表 1️⃣ 或 1.
    if (/^\d+[.)]\s+/.test(line.trim()) || /^[①-⑳]/.test(line.trim())) {
      list.push(<li key={`li-${list.length}`} dangerouslySetInnerHTML={{ __html: renderInline(line.trim().replace(/^\d+[.)]\s+/, '').replace(/^[①-⑳]/, '')) }} />)
      continue
    }
    flushList()
    blocks.push(<p key={`p-${blocks.length}`} className="my-2 text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: renderInline(line.trim()) }} />)
  }
  flushList()
  return blocks
}

export function generateStaticParams() {
  // 1301 篇全量预渲染会拖慢构建；走服务端动态渲染（HTML 含完整正文，爬虫可收录）
  return []
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const { id } = await params
  const article = caseArticles.find(a => a.id === id)
  if (!article) return { title: '案例不存在' }
  const plain = (article.content || '').replace(/[#*`>\-━]/g, ' ').replace(/\s+/g, ' ').trim()
  return {
    title: article.title.slice(0, 60),
    description: (plain.slice(0, 150) || article.title) + ' | Crazy维修 威海手机电脑维修',
    alternates: { canonical: `https://www.crazy-repair.com/cases/${id}` },
  }
}

export default async function CaseDetailPage({ params }) {
  const { id } = await params
  const article = caseArticles.find(a => a.id === id)
  if (!article) notFound()

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb items={[{ label: '维修案例库', labelEn: 'Repair Cases', href: '/cases' }, { label: article.title.slice(0, 20), labelEn: 'Case Detail' }]} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <nav className="text-sm text-gray-400 mb-4">
          <a href="/cases" className="hover:text-blue-600">← 返回维修案例库</a>
        </nav>
        <article>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{article.title}</h1>
          {article.date && <p className="text-sm text-gray-400 mb-6">📅 {article.date} · Crazy维修真实案例</p>}
          <div className="prose prose-gray max-w-none">
            {renderContent(article.content)}
          </div>
          {article.images && article.images.length > 0 && (
            <div className="mt-6 grid gap-4">
              {article.images.map((img, i) => (
                <figure key={i}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`${article.title} 维修过程图 ${i + 1}`} loading="lazy" className="rounded-xl border border-gray-100 w-full" />
                </figure>
              ))}
            </div>
          )}
        </article>
        <div className="mt-10 bg-blue-50 rounded-2xl p-6 text-center">
          <p className="font-semibold text-gray-800 mb-2">你的设备也有类似问题？</p>
          <p className="text-sm text-gray-500 mb-4">免费检测，先报价后维修，修好才收费。30天质保。</p>
          <a href="/#contact" className="inline-block bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-blue-700">📱 立即咨询</a>
        </div>
      </div>
    </div>
  )
}
