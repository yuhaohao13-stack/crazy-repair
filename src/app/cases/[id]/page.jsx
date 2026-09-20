import caseArticles from '../../../data/repair-case-articles'
import { getDynamicArticle, getLikeCounts } from '../../../lib/case-store'
import { notFound } from 'next/navigation'
import Navbar from '../../../components/Navbar'
import Breadcrumb from '../../../components/Breadcrumb'
import CaseLikeButton from '../../../components/CaseLikeButton'
import ShareButton from '../../../components/ShareButton'

// 静态案例优先，其次管理员站内发布的动态案例
async function findArticle(id) {
  return caseArticles.find(a => a.id === id) || await getDynamicArticle(id)
}

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

// ─── SEO：每篇案例自己的中英文关键词 / 描述 / alt ───
// 品牌 中→英
const TAG_EN = {
  'iPhone': 'iPhone', 'iPad': 'iPad', 'MacBook': 'MacBook', '三星': 'Samsung', '华为': 'Huawei',
  '小米': 'Xiaomi', 'OPPO': 'OPPO', 'vivo': 'vivo', '一加': 'OnePlus', '荣耀': 'Honor',
  '摩托罗拉': 'Motorola', '华硕': 'ASUS', '联想': 'Lenovo', '戴尔': 'Dell', '惠普': 'HP',
  '游戏机': 'game console', '相机': 'camera', '手表': 'smartwatch', '耳机': 'headphones',
  'Kobo电子书': 'Kobo eReader', 'Sharp': 'Sharp', '电脑/笔记本': 'laptop', '手机通用': 'phone', '其他': 'device',
}

// 故障/维修动作 中→英（命中就加英文关键词）
const FAULT_EN = [
  [/换屏|屏幕更换|换屏幕|屏碎/, 'screen replacement'],
  [/换电池|电池更换|电池不耐用/, 'battery replacement'],
  [/不开机|无法开机|开不了机/, 'no power won\'t boot'],
  [/反复重启|重启循环|自动重启/, 'restart loop fix'],
  [/进水|进液/, 'water damage repair'],
  [/主板|芯片级|飞线|短接/, 'motherboard repair board level'],
  [/触摸|断触|触控/, 'touch not working'],
  [/不充电|充电口|尾插/, 'charging port repair'],
  [/摄像头|相机/, 'camera repair'],
  [/无服务|没信号|无信号/, 'no service fix'],
  [/清灰|析热|磰脂/, 'cleaning thermal paste'],
  [/扩容|升级内存|加装/, 'storage upgrade'],
  [/面容|指纹/, 'face id fingerprint repair'],
  [/数据恢复|保资料/, 'data recovery'],
  [/烧毁|烧糊|短路/, 'burnt board short circuit'],
  [/花屏|黑屏|白屏|线条/, 'display issue fix'],
]

function extractWords(text) {
  return (text || '')
    .replace(/[｜|·【】\[\]（）()，。,.!！?？:：、#\-—_/]/g, ' ')
    .split(/\s+/)
    .map(w => w.trim())
    .filter(w => w.length >= 2)
}

// 关键词 = 中文（标题型号/故障词 + 品牌 + 地域服务词） + 英文（型号 + repair/fix + 故障英文 + Singapore 服务词）
function buildKeywords(article) {
  const title = article.title || ''
  const body = (article.content || '').slice(0, 400)
  const tag = article.tag || ''

  const cn = [...extractWords(title).slice(0, 8)]
  if (tag) cn.push(tag, `${tag}维修`, `${tag}维修案例`)
  cn.push('新加坡手机维修', '新加坡电脑维修', '手机维修案例', 'Crazy维修')

  const tagEn = TAG_EN[tag]
  const latin = (title.match(/[A-Za-z][A-Za-z0-9 .+\-]{1,20}/g) || []).map(s => s.trim()).filter(s => s.length >= 2)
  const model = latin.slice(0, 2).join(' ').trim()

  const en = []
  if (tagEn) en.push(tagEn, `${tagEn} repair`, `${tagEn} repair Singapore`)
  if (model) en.push(`${model} repair`, `${model} fix`)
  for (const [re, word] of FAULT_EN) {
    if (re.test(title) || re.test(body)) en.push(word)
  }
  en.push('phone repair Singapore', 'laptop repair Singapore', 'board level repair', 'Crazy Repair')

  return [...new Set([...cn, ...en])].slice(0, 26).join(',')
}

// 描述：机型+故障标题 + 正文摘要（100 字）+ 服务词（手写式，非机器截断）
function buildDescription(article) {
  const plain = (article.content || '').replace(/[#*`>\-━◆]/g, ' ').replace(/\s+/g, ' ').trim()
  const head = (article.title || '').replace(/（维修案例）|\(维修案例\)/g, '').trim()
  const digest = plain.slice(0, 100)
  return `${head}。${digest}${plain.length > 100 ? '…' : ''}｜Crazy维修 新加坡/威海手机电脑维修，免费检测先报价，修好才收费，30天质保。`
}

export async function generateMetadata({ params }) {
  const { id } = await params
  const article = await findArticle(id)
  if (!article) return { title: '案例不存在' }
  const desc = buildDescription(article)
  return {
    title: article.title.slice(0, 60),
    description: desc.slice(0, 300),
    keywords: buildKeywords(article),
    alternates: { canonical: `https://www.crazy-repair.com/cases/${id}` },
    openGraph: {
      title: article.title.slice(0, 60),
      description: desc.slice(0, 150),
      type: 'article',
      url: `https://www.crazy-repair.com/cases/${id}`,
    },
  }
}

export default async function CaseDetailPage({ params }) {
  const { id } = await params
  const article = await findArticle(id)
  if (!article) notFound()
  const likes = await getLikeCounts()

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
          {article.date && (
            <div className="text-sm text-gray-400 mb-6 flex items-center gap-4">
              <span>📅 {article.date} · Crazy维修真实案例</span>
              <ShareButton title={article.title} />
            </div>
          )}
          <div className="prose prose-gray max-w-none">
            {renderContent(article.content)}
          </div>
          {article.images && article.images.length > 0 && (
            <div className="mt-6 grid gap-4">
              {article.images.map((img, i) => (
                <figure key={i}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`${article.tag} ${article.title.slice(0, 40)} - 维修过程图 ${i + 1}`} loading="lazy" className="rounded-xl border border-gray-100 w-full" />
                </figure>
              ))}
            </div>
          )}

          {(article.youtube_url || article.douyin_url) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {article.youtube_url && (
                <a href={article.youtube_url} target="_blank" rel="noopener"
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl">
                  ▶ 观看 YouTube 维修视频
                </a>
              )}
              {article.douyin_url && (
                <a href={article.douyin_url} target="_blank" rel="noopener"
                  className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl">
                  ♪ 观看抖音维修视频
                </a>
              )}
            </div>
          )}
        </article>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <CaseLikeButton id={article.id} initialCount={likes[article.id] || 0} />
          <ShareButton title={article.title} />
        </div>
        <div className="mt-8 bg-blue-50 rounded-2xl p-6 text-center">
          <p className="font-semibold text-gray-800 mb-2">你的设备也有类似问题？</p>
          <p className="text-sm text-gray-500 mb-4">免费检测，先报价后维修，修好才收费。30天质保。</p>
          <a href="/#contact" className="inline-block bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-blue-700">📱 立即咨询</a>
        </div>
      </div>
    </div>
  )
}
