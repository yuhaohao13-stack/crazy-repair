'use client'
import { useState } from 'react'
import { ArrowLeft, Smartphone, Battery, Droplets, Cpu, Camera, ChevronDown } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ContactModal from '../../components/ContactModal'

export default function SamsungRepair() {
  const [showContact, setShowContact] = useState(false)
  const [lang, setLang] = useState('zh')
  const t = (zh, en) => lang === 'zh' ? zh : en
  
  const services = [
    {id:'screen-replacement', title:'屏幕更换', titleEn:'Screen Replacement', desc:'Samsung S/Z/A系列内外屏更换。AMOLED原装屏维修。含密封胶恢复防水。折叠屏内屏外屏都能做。', descEn:'Samsung S/Z/A series inner/outer screen replacement. AMOLED OEM repair. Waterproof sealant. Foldable screen repair available.'},
    {id:'battery-replacement', title:'电池更换', titleEn:'Battery Replacement', desc:'Samsung S/Z/A/Note系列电池更换。原装规格电池，健康度恢复100%。告别一天多充。', descEn:'Samsung S/Z/A/Note series battery swap. OEM spec, health restored to 100%. No more frequent charging.'},
    {id:'motherboard-repair', title:'主板维修', titleEn:'Motherboard Repair', desc:'三星主板芯片级维修：不开机、重启、充电IC、WiFi故障。比换主板省一半以上。', descEn:'Samsung board-level repair: no power, boot loop, charging IC, WiFi. 50%+ cheaper than board replacement.'},
    {id:'charging-port', title:'充电口/尾插', titleEn:'Charging Port', desc:'Type-C充电口松动、接触不良、不充电。尾插小板更换。S23/S24/S25 Ultra系列。', descEn:'Type-C loose port, bad contact, not charging. Charging flex replacement. S23/S24/S25 Ultra series.'},
    {id:'camera-repair', title:'摄像头维修', titleEn:'Camera Repair', desc:'拍照模糊、闪退、黑屏。S Ultra系列2亿像素摄像头维修更换。', descEn:'Blurry photos, crash, black screen. S Ultra 200MP camera module repair.'},
    {id:'back-glass', title:'后盖更换', titleEn:'Back Glass', desc:'Samsung玻璃后盖碎裂更换。S系列、Note系列。含背胶重新贴合。', descEn:'Samsung glass back replacement. S series, Note series. Includes new adhesive.'}
  ]
  
  const models = [
      t('Galaxy S25 Ultra / S25 Plus / S25', 'Galaxy S25 Ultra / S25 Plus / S25'),
      t('Galaxy S24 Ultra / S24 Plus / S24 / S24 FE', 'Galaxy S24 Ultra / S24 Plus / S24 / S24 FE'),
      t('Galaxy S23 Ultra / S23 Plus / S23 / S23 FE', 'Galaxy S23 Ultra / S23 Plus / S23 / S23 FE'),
      t('Galaxy S22 Ultra / S22 Plus / S22', 'Galaxy S22 Ultra / S22 Plus / S22'),
      t('Galaxy S21 Ultra / S21 Plus / S21 / S21 FE', 'Galaxy S21 Ultra / S21 Plus / S21 / S21 FE'),
      t('Galaxy S20 Ultra / S20 Plus / S20', 'Galaxy S20 Ultra / S20 Plus / S20'),
      t('Galaxy Z Fold 7 / Fold 6 / Fold 5', 'Galaxy Z Fold 7 / Fold 6 / Fold 5'),
      t('Galaxy Z Flip 7 / Flip 6 / Flip 5', 'Galaxy Z Flip 7 / Flip 6 / Flip 5'),
      t('Galaxy A56 / A55 / A54 / A36 / A35', 'Galaxy A56 / A55 / A54 / A36 / A35'),
      t('Galaxy Note 20 Ultra / Note 20 / Note 10', 'Galaxy Note 20 Ultra / Note 20 / Note 10')
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar lang={lang} setLang={setLang} setShowContact={setShowContact} />
      <section className="bg-gradient-to-br from-purple-700 via-purple-600 to-purple-500 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4">
          <a href="/phone-repair" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-medium transition-colors">
            <ArrowLeft size={15} /> {t('手机品牌', 'Phone Brands')}
          </a>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">{t('Samsung 维修', 'Samsung Repair')}</h1>
            <p className="text-purple-200 text-xl mb-4">{t('三星手机全系列专业维修 | 威海环翠区', 'Professional Samsung Repair for All Models | Weihai')}</p>
            <p className="text-purple-100 leading-relaxed">
              {t('三星Galaxy换屏、换电池、修主板、折叠屏维修——S系列/Z系列/A系列/Note系列全都能修。2007年至今奋斗在维修一线。先检测后报价，价格透明，30天质保。', 'Samsung Galaxy screen replacement, battery swap, motherboard repair, foldable display repair — S/Z/A/Note series all covered. Since 2007. Free diagnosis, 30-day warranty.')}
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <button onClick={() => setShowContact(true)} className="bg-white text-purple-600 font-semibold px-6 py-3 rounded-xl hover:bg-purple-50 transition-colors shadow-lg">
                {t('📱 微信咨询维修', '📱 WeChat for Repair')}
              </button>
              <a href="https://wa.me/6596146709?text=我的Samsung需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-600 transition-colors shadow-lg">
                {t('💬 WhatsApp咨询', '💬 WhatsApp')}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">{t('维修服务', 'Repair Services')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <a key={i} href={'/samsung-repair/' + s.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all group block">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 text-lg shrink-0">
                      {['🔧','🔋','🔬','🔌','📷','🔄'][i] || '🔧'}
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg">{t(s.title, s.titleEn)}</h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{t(s.desc, s.descEn)}</p>
                  <div className="mt-4 text-purple-600 text-xs font-medium flex items-center gap-1">{t('查看详情 →', 'View Details →')}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t('支持型号', 'Supported Models')}</h2>
          <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="grid grid-cols-2 gap-3">
              {models.map((m, i) => (
                <div key={i} className="flex items-center gap-2 text-sm"><span className="text-purple-500 shrink-0">▸</span><span className="text-gray-700">{m}</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-purple-700 via-purple-600 to-purple-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('有问题？找我', 'Issues? Hit me up')}</h2>
          <p className="text-purple-200 mb-8">{t('免费检测，先报价后维修。添加微信发张照片就能初步判断。', 'Free diagnosis. Add WeChat, send a photo for a quick assessment.')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setShowContact(true)} className="bg-white text-purple-600 font-semibold px-8 py-4 rounded-xl hover:bg-purple-50 transition-colors shadow-lg text-lg">{t('📱 微信咨询', '📱 WeChat')}</button>
            <a href="https://wa.me/6596146709?text=需要维修" target="_blank" className="bg-green-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-green-600 transition-colors shadow-lg text-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
          </div>
        </div>
      </section>
      <Footer lang={lang} />
      <ContactModal show={showContact} setShow={setShowContact} lang={lang} />
    </div>
  )
}
