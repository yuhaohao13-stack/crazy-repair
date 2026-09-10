// 维修案例数据层
// 静态案例：src/data/case-articles-index.js（索引）+ src/data/repair-case-articles.js（正文，git 内）
// 动态案例：管理员在 /cases 页面站内发布的案例，存 Supabase Storage（bucket: case-articles）
//   index.json         → [{id,title,tag,date,excerpt}]
//   cases/<id>.json    → {id,title,tag,date,excerpt,content,images[],youtube_url,douyin_url,created_at}
import { supabase } from './supabase-server'
import staticIndex from '../data/case-articles-index'

const BUCKET = 'case-articles'
const INDEX_PATH = 'index.json'

// 读取 storage 里的 JSON（失败返回 null，不抛错）
export async function readStoreJson(path) {
  try {
    const { data, error } = await supabase.storage.from(BUCKET).download(path)
    if (error || !data) return null
    let text
    if (typeof data.text === 'function') text = await data.text()
    else text = Buffer.from(await data.arrayBuffer()).toString('utf8')
    return JSON.parse(text)
  } catch {
    return null
  }
}

// 管理员站内发布的案例索引（新的在前）
export async function getDynamicIndex() {
  const arr = await readStoreJson(INDEX_PATH)
  return Array.isArray(arr) ? arr.filter(x => x && x.id) : []
}

// 全部案例索引 = 动态（新） + 静态
export async function getAllCaseIndex() {
  const dyn = await getDynamicIndex()
  return [...dyn, ...staticIndex]
}

// 取单个动态案例正文（静态案例由调用方读 repair-case-articles）
export async function getDynamicArticle(id) {
  if (!id || !/^[a-z0-9]{4,16}$/i.test(id)) return null
  return readStoreJson(`cases/${id}.json`)
}

export { staticIndex }
