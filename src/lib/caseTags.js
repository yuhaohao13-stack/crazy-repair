// 维修案例分类：中文 tag → URL slug 映射
// 用于 /cases 总览锚点跳转分类页 /cases/tag/{slug}
const tagSlugMap = {
  'iPhone': 'iphone',
  'iPad': 'ipad',
  'MacBook': 'macbook',
  '三星': 'samsung',
  '华为': 'huawei',
  '小米': 'xiaomi',
  'OPPO': 'oppo',
  'vivo': 'vivo',
  '一加': 'oneplus',
  '荣耀': 'honor',
  '华硕': 'asus',
  '联想': 'lenovo',
  '戴尔': 'dell',
  '惠普': 'hp',
  '游戏机': 'console',
  '相机': 'camera',
  '手表': 'watch',
  '耳机': 'headphone',
  '电脑/笔记本': 'computer',
  '手机通用': 'phone',
  '其他': 'other',
}

const slugTagMap = Object.fromEntries(Object.entries(tagSlugMap).map(([k, v]) => [v, k]))

// 分类展示顺序（手机品牌优先）
const tagOrder = ['iPhone','iPad','MacBook','三星','华为','小米','OPPO','vivo','一加','荣耀','华硕','联想','戴尔','惠普','游戏机','相机','手表','耳机','电脑/笔记本','手机通用','其他']

export { tagSlugMap, slugTagMap, tagOrder }
