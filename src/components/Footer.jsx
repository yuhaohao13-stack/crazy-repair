export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🔧</span>
              <span className="font-bold text-white text-lg">Crazy维修</span>
            </div>
            <p className="text-sm leading-relaxed">威海环翠区专业数码维修，诚信经营，先检测后维修。</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">品牌维修</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/iphone-repair" className="hover:text-white transition-colors">iPhone 维修</a></li>
              <li><a href="/macbook-repair" className="hover:text-white transition-colors">MacBook 维修</a></li>
              <li><a href="/samsung-repair" className="hover:text-white transition-colors">Samsung 维修</a></li>
              <li><a href="/xiaomi-repair" className="hover:text-white transition-colors">Xiaomi 维修</a></li>
              <li><a href="/huawei-repair" className="hover:text-white transition-colors">Huawei 维修</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">快速链接</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white transition-colors">首页</a></li>
              <li><a href="/#services" className="hover:text-white transition-colors">服务项目</a></li>
              <li><a href="/#about" className="hover:text-white transition-colors">关于我们</a></li>
              <li><a href="/#reviews" className="hover:text-white transition-colors">客户评价</a></li>
              <li><a href="/board" className="hover:text-white transition-colors">留言板</a></li>
              <li><a href="/#faq" className="hover:text-white transition-colors">常见问题</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">联系方式</h4>
            <ul className="space-y-2 text-sm">
              <li>微信: crazy-repair</li>
              <li>手机: <a href="tel:+8613573735550" className="hover:text-white transition-colors">+86 13573735550</a></li>
              <li>WhatsApp: +65 96146709</li>
              <li>地址: 威海环翠区西门31号</li>
              <li>营业时间: 周一至周日 8:00-19:00</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-xs">
          <p>© 2026 Crazy维修 (Crazy-repair). 保留所有权利。</p>
        </div>
      </div>
    </footer>
  )
}
