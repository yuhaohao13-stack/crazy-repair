'use client'
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ContactModal from '../../components/ContactModal'

export default function OtherRepair() {
  const [showContact, setShowContact] = useState(false)
  const [lang, setLang] = useState('zh')
  const t = (zh, en) => lang === 'zh' ? zh : en

  return (
    <div className="min-h-screen bg-white">
      <Navbar lang={lang} setLang={setLang} setShowContact={setShowContact} />
      <section className="bg-gradient-to-br from-amber-600 via-amber-500 to-yellow-500 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold mb-3">{t('其他数码维修', 'Other Device Repair')}</h1>
          <p className="text-amber-100 text-lg">{t('手表、游戏机、耳机、相机、改装', 'Watch, console, earphone, camera, mods')}</p>
        </div>
      </section>
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-2xl p-5 shadow-md">
              <div className="text-3xl mb-2">⌚</div>
              <h3 className="font-bold text-lg mb-1">{t('Apple Watch', 'Apple Watch')}</h3>
              <p className="text-sm text-white/80 mb-2">{t('Ultra/S9/8/7/SE/6 全系列', 'Ultra/Series 9-1/SE')}</p>
              <p className="text-xs text-white/60">{t('屏幕、电池、进水、表带', 'Screen, battery, water')}</p>
              <button onClick={() => setShowContact(true)} className="inline-block mt-3 text-xs bg-white/20 px-3 py-1 rounded-full hover:bg-white/30">{t('📱 微信咨询 →', 'WeChat →')}</button>
            </div>
            <div className="bg-gradient-to-br from-red-600 to-red-500 text-white rounded-2xl p-5 shadow-md">
              <div className="text-3xl mb-2">🎮</div>
              <h3 className="font-bold text-lg mb-1">{t('游戏机', 'Game Console')}</h3>
              <p className="text-sm text-white/80 mb-2">{t('Switch/PS5/PS4/Xbox', 'Switch/PS5/PS4/Xbox')}</p>
              <p className="text-xs text-white/60">{t('手柄漂移、清灰、散热改造', 'Joystick drift, clean, cooling')}</p>
              <button onClick={() => setShowContact(true)} className="inline-block mt-3 text-xs bg-white/20 px-3 py-1 rounded-full hover:bg-white/30">{t('📱 微信咨询 →', 'WeChat →')}</button>
            </div>
            <div className="bg-gradient-to-br from-green-600 to-green-500 text-white rounded-2xl p-5 shadow-md">
              <div className="text-3xl mb-2">🎧</div>
              <h3 className="font-bold text-lg mb-1">{t('耳机', 'Earphones')}</h3>
              <p className="text-sm text-white/80 mb-2">{t('AirPods/TWS全系', 'AirPods/TWS')}</p>
              <p className="text-xs text-white/60">{t('电池不耐用、一只不响', 'Battery, one side silent')}</p>
              <button onClick={() => setShowContact(true)} className="inline-block mt-3 text-xs bg-white/20 px-3 py-1 rounded-full hover:bg-white/30">{t('📱 微信咨询 →', 'WeChat →')}</button>
            </div>
            <div className="bg-gradient-to-br from-purple-600 to-purple-500 text-white rounded-2xl p-5 shadow-md">
              <div className="text-3xl mb-2">📷</div>
              <h3 className="font-bold text-lg mb-1">{t('相机', 'Camera')}</h3>
              <p className="text-sm text-white/80 mb-2">{t('数码相机/单反', 'Digital/DSLR')}</p>
              <p className="text-xs text-white/60">{t('镜头、传感器清洁、快门', 'Lens, sensor clean, shutter')}</p>
              <button onClick={() => setShowContact(true)} className="inline-block mt-3 text-xs bg-white/20 px-3 py-1 rounded-full hover:bg-white/30">{t('📱 微信咨询 →', 'WeChat →')}</button>
            </div>
            <div className="bg-gradient-to-br from-gray-700 to-gray-600 text-white rounded-2xl p-5 shadow-md">
              <div className="text-3xl mb-2">🔧</div>
              <h3 className="font-bold text-lg mb-1">{t('改装配件', 'Custom Mods')}</h3>
              <p className="text-sm text-white/80 mb-2">{t('手机改双卡、扩容、换壳', 'Dual SIM, storage, shell swap')}</p>
              <p className="text-xs text-white/60">{t('想做啥说来聊', 'DM us your idea')}</p>
              <button onClick={() => setShowContact(true)} className="inline-block mt-3 text-xs bg-white/20 px-3 py-1 rounded-full hover:bg-white/30">{t('📱 微信咨询 →', 'WeChat →')}</button>
            </div>
            <div className="bg-gradient-to-br from-gray-600 to-gray-500 text-white rounded-2xl p-5 shadow-md">
              <div className="text-3xl mb-2">❓</div>
              <h3 className="font-bold text-lg mb-1">{t('其他数码产品', 'Other Devices')}</h3>
              <p className="text-sm text-white/80 mb-2">{t('电子词典、学习机、GPS、路由器', 'E-dictionary, GPS, router')}</p>
              <p className="text-xs text-white/60">{t('任何数码问题拿来免费检测', 'Any device, free check')}</p>
              <button onClick={() => setShowContact(true)} className="inline-block mt-3 text-xs bg-white/20 px-3 py-1 rounded-full hover:bg-white/30">{t('📱 微信咨询 →', 'WeChat →')}</button>
            </div>
          </div>
        </div>
      </section>
      <Footer lang={lang} />
      <ContactModal show={showContact} setShow={setShowContact} lang={lang} />
    </div>
  )
}
