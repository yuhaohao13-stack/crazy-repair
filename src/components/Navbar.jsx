'use client'
import { useState } from 'react'

export default function Navbar({ lang, setLang, setShowContact }) {
  const t = (zh, en) => lang === 'zh' ? zh : en

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-2xl">🔧</span>
            <span className="font-bold text-lg text-gray-900">Crazy维修</span>
          </a>
          <div className="hidden md:flex items-center gap-4 text-sm text-gray-600">
            <a href="/#services" className="hover:text-blue-600 transition-colors">{t('服务项目', 'Services')}</a>
            <a href="/#about" className="hover:text-blue-600 transition-colors">{t('关于我们', 'About')}</a>
            <a href="/#reviews" className="hover:text-blue-600 transition-colors">{t('客户评价', 'Reviews')}</a>
            <a href="/#faq" className="hover:text-blue-600 transition-colors">{t('常见问题', 'FAQ')}</a>
            <a href="/#contact" className="hover:text-blue-600 transition-colors">{t('联系我们', 'Contact')}</a>
            <span className="text-gray-300">|</span>
            <a href="/iphone-repair" className="hover:text-blue-600 transition-colors">iPhone</a>
            <a href="/macbook-repair" className="hover:text-blue-600 transition-colors">MacBook</a>
            <a href="/samsung-repair" className="hover:text-blue-600 transition-colors">Samsung</a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
              className="text-xs px-2.5 py-1 rounded border border-gray-300 text-gray-500 hover:text-gray-800 transition-colors"
            >{lang === 'zh' ? 'English' : '中文'}</button>
            <button onClick={() => setShowContact(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
            >{t('立即咨询', 'Contact Now')}</button>
          </div>
        </div>
      </div>
    </nav>
  )
}
