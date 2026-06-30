'use client'
import { useState } from 'react'
import { Smartphone, Monitor, Tablet, Wrench, ShieldCheck, Clock, MessageCircle, Phone, MapPin, ChevronRight, Star, Sun, SmartphoneCharging, HardDrive, Cpu, Users, Award, Facebook, Instagram } from 'lucide-react'

export default function Home() {
  const [showContact, setShowContact] = useState(false)
  const [lang, setLang] = useState('zh')

  const t = (zh, en) => lang === 'zh' ? zh : en

  const services = [
    {
      icon: <Smartphone size={36} />,
      title: t('手机维修', 'Phone Repair'),
      desc: t('屏幕碎裂、电池亏电、进水短路、主板故障、面容/指纹失灵，各类品牌手机专业维修。', 'Screen replacement, battery issues, water damage, motherboard repair for all major brands.'),
      items: [t('屏幕更换', 'Screen Replacement'), t('电池更换', 'Battery Replacement'), t('进水维修', 'Water Damage Repair'), t('主板维修', 'Motherboard Repair'), t('面容/指纹', 'Face ID/Touch ID')]
    },
    {
      icon: <Monitor size={36} />,
      title: t('电脑维修', 'Computer Repair'),
      desc: t('台式机、笔记本、MacBook 各类故障检修，系统安装，硬件升级，数据恢复。', 'Desktop, laptop & MacBook repair, system installation, hardware upgrade, data recovery.'),
      items: [t('系统重装', 'OS Installation'), t('硬件升级', 'Hardware Upgrade'), t('清灰换硅脂', 'Cleaning & Thermal Paste'), t('数据恢复', 'Data Recovery'), t('蓝屏死机检修', 'Blue Screen Fix')]
    },
    {
      icon: <Tablet size={36} />,
      title: t('平板维修', 'Tablet Repair'),
      desc: t('iPad、安卓平板屏幕更换、电池更换、充电口维修、背光故障等。', 'iPad & Android tablet screen replacement, battery replacement, charging port repair.'),
      items: [t('屏幕更换', 'Screen Repair'), t('电池更换', 'Battery Service'), t('充电口维修', 'Charging Port Fix'), t('系统故障', 'System Issues'), t('外屏修复', 'Glass Only Repair')]
    },
    {
      icon: <Wrench size={36} />,
      title: t('其他数码维修', 'Other Device Repair'),
      desc: t('游戏机、智能手表、耳机、相机等各类数码产品维修。', 'Console, smartwatch, earphones, camera and other digital device repair.'),
      items: [t('游戏机维修', 'Console Repair'), t('智能手表', 'Smartwatch Repair'), t('耳机维修', 'Earphone Repair'), t('数据恢复', 'Data Recovery'), t('改装配件', 'Custom Mods')]
    }
  ]

  const features = [
    { icon: <SearchCheck size={28} />, title: t('免费检测', 'Free Diagnosis'), desc: t('不修不收费，先检测后报价', 'No charge if you decline repair') },
    { icon: <ShieldCheck size={28} />, title: t('质保无忧', 'Warranty'), desc: t('所有维修享30天质保', '30-day warranty on all repairs') },
    { icon: <Clock size={28} />, title: t('快速维修', 'Quick Service'), desc: t('大部分维修30分钟-2小时取机', 'Most repairs done in 30min-2hrs') },
    { icon: <Award size={28} />, title: t('专业技师', 'Expert Techs'), desc: t('10年以上维修经验', '10+ years repair experience') },
  ]

  const reviews = [
    { name: '张***', text: t('换了iPhone屏幕，价格比官方便宜一大半，而且质量很好，推荐！', 'iPhone screen replacement, much cheaper than Apple, great quality!'), stars: 5 },
    { name: '李***', text: t('电脑卡顿好久了，老板帮我加了固态硬盘，开机10秒，太牛了', 'My slow laptop got an SSD upgrade, boots in 10 seconds now!'), stars: 5 },
    { name: '王***', text: t('iPad屏幕摔碎了，修好跟新的一样，还帮我贴了膜，服务态度超好', 'Fixed my broken iPad screen like new, also applied a screen protector.'), stars: 5 },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* ===== 导航栏 ===== */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔧</span>
              <span className="font-bold text-lg text-gray-900">Crazy维修</span>
            </div>
            <div className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
              <a href="#services" className="hover:text-brand transition-colors">{t('服务项目', 'Services')}</a>
              <a href="#about" className="hover:text-brand transition-colors">{t('关于我们', 'About')}</a>
              <a href="#reviews" className="hover:text-brand transition-colors">{t('客户评价', 'Reviews')}</a>
              <a href="#contact" className="hover:text-brand transition-colors">{t('联系我们', 'Contact')}</a>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
                className="text-xs px-2.5 py-1 rounded border border-gray-300 text-gray-500 hover:text-gray-800 transition-colors"
              >{lang === 'zh' ? 'English' : '中文'}</button>
              <button onClick={() => setShowContact(true)}
                className="bg-brand hover:bg-brand-dark text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
              >{t('立即咨询', 'Contact Now')}</button>
            </div>
          </div>
        </div>
      </nav>

      {/* ===== Hero ===== */}
      <section className="hero-gradient text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="grid sm:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
                {t('Crazy维修', 'Crazy Repair')}
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-blue-200">
                {t('威海专业手机电脑维修', 'Weihai Pro Phone & PC Repair')}
              </p>
              <p className="text-blue-100 leading-relaxed text-sm sm:text-base max-w-lg">
                {t(
                  '10年维修经验，诚信经营。手机碎屏、电池亏电、电脑卡顿、数据恢复——先检测后报价，不修不收费。威海环翠区实体店，欢迎到店咨询。',
                  '10+ years of repair experience. Phone screen, battery, computer issues, data recovery — free diagnosis first, pay only if you approve. Walk-ins welcome.'
                )}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button onClick={() => setShowContact(true)}
                  className="bg-white text-brand font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-lg shadow-blue-900/20"
                >
                  {t('📱 立即咨询', '📱 Contact Now')}
                </button>
                <a href="#services"
                  className="border border-white/40 text-white font-medium px-6 py-3 rounded-xl hover:bg-white/10 transition-colors"
                >
                  {t('查看服务 →', 'Our Services →')}
                </a>
              </div>
              <div className="flex items-center gap-4 text-sm text-blue-200 pt-2">
                <span className="flex items-center gap-1"><MapPin size={14} />{t('环翠区西门31号', 'Huancui Dist, West Gate #31')}</span>
                <span className="flex items-center gap-1"><Phone size={14} />{t('加微信咨询', 'WeChat: crazy-repair')}</span>
              </div>
            </div>
            <div className="hidden sm:flex justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 text-center">
                <div className="text-7xl mb-4">🔧</div>
                <p className="text-xl font-semibold">{t('专业维修', 'Pro Repair')}</p>
                <p className="text-blue-200 text-sm mt-1">{t('手机 · 电脑 · 平板', 'Phone · PC · Tablet')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 特色 ===== */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 sm:p-6 text-center shadow-sm border border-gray-100 service-card transition-all">
                <div className="text-brand mx-auto mb-3 flex justify-center">{f.icon}</div>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{f.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 服务项目 ===== */}
      <section id="services" className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('服务项目', 'Our Services')}</h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              {t(
                '我们提供全面的数码设备维修服务。无论是什么品牌、什么问题，先带来免费检测，给出方案和报价后再决定修不修。',
                'Full range of digital device repair services. Free diagnosis for all issues, transparent pricing, no hidden fees.'
              )}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm service-card transition-all">
                <div className="text-brand mb-4">{s.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">{s.desc}</p>
                <ul className="space-y-2">
                  {s.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                      <ChevronRight size={14} className="text-brand shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 维修品牌 ===== */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h3 className="text-lg font-semibold text-gray-500 mb-6">{t('支持品牌', 'Brands We Support')}</h3>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-gray-400">
            <span className="text-2xl font-bold text-gray-800">Apple</span>
            <span className="text-2xl font-bold text-gray-800">Samsung</span>
            <span className="text-2xl font-bold text-gray-800">Huawei</span>
            <span className="text-2xl font-bold text-gray-800">Xiaomi</span>
            <span className="text-2xl font-bold text-gray-800">OPPO</span>
            <span className="text-2xl font-bold text-gray-800">vivo</span>
            <span className="text-2xl font-bold text-gray-800">Dell</span>
            <span className="text-2xl font-bold text-gray-800">Lenovo</span>
            <span className="text-2xl font-bold text-gray-800">HP</span>
            <span className="text-2xl font-bold text-gray-800">ASUS</span>
          </div>
        </div>
      </section>

      {/* ===== 关于我们 ===== */}
      <section id="about" className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                {t('关于 Crazy维修', 'About Crazy Repair')}
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
                <p>
                  {t(
                    'Crazy维修（Crazy-repair）成立于威海环翠区，是一家专注于手机、电脑、平板及各类数码产品维修的专业工作室。我们拥有10年以上的维修经验，累计服务超过5000位客户。',
                    'Crazy Repair (Crazy-repair) is a professional repair studio based in Huancui District, Weihai. We specialize in phone, computer, tablet and digital device repairs with 10+ years of experience.'
                  )}
                </p>
                <p>
                  {t(
                    '我们的理念很简单：先检查问题，告诉客户真实情况，给出合理报价，修不修客户决定。绝不诱导消费，绝不隐瞒问题。每一个维修都用心对待，让客户花最少的钱解决最实际的问题。',
                    'Our philosophy is simple: diagnose first, be honest about the issue, give a fair quote, and let the customer decide. Every repair is done with care and integrity.'
                  )}
                </p>
                <div className="flex items-center gap-4 pt-4 text-sm">
                  <div className="bg-brand-light rounded-xl px-4 py-3 text-center">
                    <div className="text-2xl font-bold text-brand">10+</div>
                    <div className="text-xs text-gray-500">{t('年经验', 'Years')}</div>
                  </div>
                  <div className="bg-brand-light rounded-xl px-4 py-3 text-center">
                    <div className="text-2xl font-bold text-brand">5000+</div>
                    <div className="text-xs text-gray-500">{t('服务客户', 'Clients')}</div>
                  </div>
                  <div className="bg-brand-light rounded-xl px-4 py-3 text-center">
                    <div className="text-2xl font-bold text-brand">98%</div>
                    <div className="text-xs text-gray-500">{t('好评率', 'Satisfaction')}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">{t('联系我们', 'Contact Us')}</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-brand shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">{t('店铺地址', 'Address')}</p>
                    <p className="text-sm text-gray-500">{t('威海市环翠区西门31号', 'No.31 West Gate, Huancui Dist, Weihai')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageCircle size={20} className="text-green-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">{t('微信', 'WeChat')}</p>
                    <p className="text-sm text-gray-500">crazy-repair</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={20} className="text-brand shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">WhatsApp</p>
                    <p className="text-sm text-gray-500">+65 96146709</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={20} className="text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">{t('营业时间', 'Business Hours')}</p>
                    <p className="text-sm text-gray-500">{t('周一至周日 9:00-20:00', 'Mon-Sun 9:00-20:00')}</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setShowContact(true)}
                className="mt-6 w-full bg-brand hover:bg-brand-dark text-white font-medium py-3 rounded-xl transition-colors"
              >
                {t('💬 联系我咨询', '💬 Contact for Help')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 客户评价 ===== */}
      <section id="reviews" className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('客户评价', 'Customer Reviews')}</h2>
            <p className="text-gray-500 mt-2">{t('来自真实客户的反馈', 'What our customers say')}</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex text-amber-400 mb-3">
                  {[...Array(r.stars)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{r.text}"</p>
                <p className="text-gray-400 text-xs font-medium">{r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 联系 CTA ===== */}
      <section id="contact" className="py-16 sm:py-20 hero-gradient text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('设备出了问题？别着急', 'Device issues? No worries')}</h2>
          <p className="text-blue-200 mb-8 max-w-xl mx-auto">
            {t(
              '免费检测，先报价后维修。添加微信或WhatsApp，发照片就能初步判断问题。',
              'Free diagnosis. Add us on WeChat or WhatsApp, send a photo and we can give an initial assessment.'
            )}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => {
              setShowContact(true)
            }} className="bg-white text-brand font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors shadow-lg text-lg">
              {t('📱 微信咨询', '📱 WeChat')}
            </button>
            <button onClick={() => {
              window.open('https://wa.me/6596146709?text=我想咨询手机电脑维修事宜', '_blank')
            }} className="bg-green-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-green-600 transition-colors shadow-lg text-lg">
              {t('💬 WhatsApp咨询', '💬 WhatsApp')}
            </button>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🔧</span>
                <span className="font-bold text-white text-lg">Crazy维修</span>
              </div>
              <p className="text-sm leading-relaxed">
                {t('威海环翠区专业数码维修，诚信经营，先检测后维修。', 'Weihai professional digital device repair. Honest service, diagnose first.')}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">{t('快速链接', 'Quick Links')}</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#services" className="hover:text-white transition-colors">{t('服务项目', 'Services')}</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">{t('关于我们', 'About')}</a></li>
                <li><a href="#reviews" className="hover:text-white transition-colors">{t('客户评价', 'Reviews')}</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">{t('联系我们', 'Contact')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">{t('联系方式', 'Contact')}</h4>
              <ul className="space-y-2 text-sm">
                <li>{t('微信', 'WeChat')}: crazy-repair</li>
                <li>WhatsApp: +65 96146709</li>
                <li>{t('地址', 'Address')}: {t('威海环翠区西门31号', 'Huancui Dist, West Gate #31')}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-xs">
            <p>© 2026 Crazy维修 (Crazy-repair). {t('All rights reserved.', '保留所有权利。')}</p>
          </div>
        </div>
      </footer>

      {/* ===== 联系弹窗 ===== */}
      {showContact && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowContact(false)}>
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">🔧</div>
              <h3 className="text-xl font-bold text-gray-900">{t('联系我们', 'Contact Us')}</h3>
              <p className="text-sm text-gray-500 mt-1">{t('选择您方便的方式', 'Choose your preferred way')}</p>
            </div>

            <div className="space-y-4">
              {/* 微信 */}
              <a
                href="weixin://dl/chat?crazy-repair"
                onClick={(e) => {
                  e.preventDefault()
                  window.open('https://weixin.qq.com/', '_blank')
                  // Try WeChat scheme, fallback to copy
                  navigator.clipboard?.writeText('crazy-repair')
                }}
                className="contact-option flex items-center gap-4 p-4 rounded-2xl border border-gray-200 hover:border-green-300 hover:bg-green-50 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <MessageCircle size={24} className="text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{t('微信', 'WeChat')}</p>
                  <p className="text-xs text-gray-500">crazy-repair</p>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/6596146709?text=我想咨询手机电脑维修事宜"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-option flex items-center gap-4 p-4 rounded-2xl border border-gray-200 hover:border-green-300 hover:bg-green-50 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <Phone size={24} className="text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">WhatsApp</p>
                  <p className="text-xs text-gray-500">+65 96146709</p>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </a>

              {/* 到店 */}
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-200">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <MapPin size={24} className="text-brand" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{t('到店维修', 'Visit Store')}</p>
                  <p className="text-xs text-gray-500">{t('威海环翠区西门31号', 'No.31 West Gate, Huancui')}</p>
                </div>
              </div>

              {/* 复制微信号提示 */}
              <div className="text-center">
                <p className="text-xs text-gray-400">
                  {t('点击微信选项会自动复制微信号，打开微信粘贴添加即可', 'Click WeChat to copy ID, then paste in WeChat to add friend')}
                </p>
              </div>
            </div>

            <button onClick={() => setShowContact(false)}
              className="mt-6 w-full py-3 rounded-xl bg-gray-100 text-gray-600 font-medium hover:bg-gray-200 transition-colors"
            >
              {t('关闭', 'Close')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Need import SearchCheck from lucide-react
function SearchCheck(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
      <path d="m9 11 2 2 4-4" />
    </svg>
  )
}
