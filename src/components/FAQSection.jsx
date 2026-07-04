'use client'
import { ChevronDown } from 'lucide-react'
import { useSite } from '../lib/SiteContext'

const faqs = [
  { q: { zh: '手机进水了怎么办？', en: 'My phone got wet, what do I do?' }, a: { zh: '第一时间关机！千万不要充电。马上拿来检测，我们会做超声波清洗+主板烘干+腐蚀处理。进水的手机越早送来修复率越高。不要用吹风机吹、不要放米缸——这些土方法只会加重内部腐蚀。', en: 'Power it off immediately! Do NOT plug in to charge. Bring it in ASAP for ultrasonic cleaning + board dry + corrosion repair. Do NOT use a hair dryer or put it in rice — these DIY tricks worsen internal corrosion.' } },
  { q: { zh: '维修需要多长时间？', en: 'How long does a repair take?' }, a: { zh: '常见维修如换屏幕、换电池，30分钟到2小时可取。复杂问题如主板维修需要1-2天。修好了会微信通知你。', en: 'Common repairs like screen & battery: 30min-2hrs. Complex issues like motherboard: 1-2 days. I\'ll message you on WeChat when it\'s ready.' } },
  { q: { zh: '修了之后还有保修吗？', en: 'Do you offer warranty?' }, a: { zh: '所有维修享30天质保。如果维修后同样问题出现，免费返修。配件问题也在保修范围内。', en: '30-day warranty on all repairs. Same-issue rework is free. Parts are covered too.' } },
  { q: { zh: '换的屏幕/电池是原装的吗？', en: 'Are the screens/batteries genuine?' }, a: { zh: '我们提供原装品质和国产高性价比两种选择，维修前会跟你说明白，你自己选。不会用劣质配件糊弄人，这是我们立店的底线。', en: 'We offer both OEM-quality and affordable options. I\'ll explain the difference before the repair — you decide. No cheap knockoffs, that\'s a promise.' } },
  { q: { zh: '维修会丢失数据吗？', en: 'Will I lose my data?' }, a: { zh: '正常维修（换屏幕、电池、充电口等）不影响数据。但主板维修、刷机操作存在数据丢失风险。建议无论修什么，平时养成备份的习惯。需要的话我们可以帮你备份。', en: 'Normal repairs (screen, battery, port) won\'t affect data. Board repair or flashing may risk data loss. Always back up your data regularly — I can help if needed.' } },
  { q: { zh: '可以上门维修吗？', en: 'Do you offer doorstep repair?' }, a: { zh: '目前以到店维修为主，地址：威海市环翠区西门31号。实在不方便的情况可以加微信聊聊，看能不能上门取送。', en: 'We primarily do walk-in repairs at No.31 West Gate, Huancui, Weihai. If you really can\'t make it, DM me on WeChat and we\'ll figure something out.' } },
  { q: { zh: '不修收费吗？价格贵不贵？', en: 'Is there a fee if I don\'t repair?' }, a: { zh: '完全免费检测，不修不收费。价格方面，比官方售后便宜很多（换屏能便宜一半以上），而且质量不打折。透明的，先报价你决定修不修。', en: 'Free diagnosis, no charge if you decline. Prices are way cheaper than official service (screens cost half or less). Transparent pricing — I quote, you decide.' } },
  { q: { zh: '我的手机型号比较老还能修吗？', en: 'My phone is old, can it still be repaired?' }, a: { zh: '只要配件还能买到就能修。iPhone 6/6s/7/8、Samsung S7/S8/S9、华为P10/Mate10这些老机型我们都有配件渠道。如果实在买不到配件，也会如实告诉你。', en: 'As long as parts are available. We have channels for older models: iPhone 6/7/8, Samsung S7/S8/S9, Huawei P10/Mate10 etc. If parts are truly unavailable, I\'ll tell you honestly.' } },
]

export default function FAQSection() {
  const { lang } = useSite()
  const t = (zh, en) => lang === 'zh' ? zh : en

  return (
    <section id="faq" className="py-12 sm:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('常见问题', 'FAQ')}</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <details key={i} className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none">
                <span className="font-medium text-gray-900 text-sm sm:text-base">{t(faq.q.zh, faq.q.en)}</span>
                <ChevronDown size={18} className="text-gray-400 group-open:rotate-180 transition-transform shrink-0" />
              </summary>
              <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                <p className="text-gray-500 text-sm leading-relaxed">{t(faq.a.zh, faq.a.en)}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
