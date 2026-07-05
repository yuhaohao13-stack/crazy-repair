'use client'
import { useSite } from '../../lib/SiteContext'
import { useState } from 'react'
import Navbar from '../../components/Navbar'

export default function OtherRepair() {
  const { lang, setShowContact } = useSite();
  const t = (zh, en) => lang === 'zh' ? zh : en

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
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
              <p className="text-sm text-white/80 mb-2">{t('Ultra/Ultra 2/Series 9/8/7/SE/6 全系列', 'Ultra/Ultra 2/Series 9-1/SE')}</p>
              <p className="text-xs text-white/60">{t('屏幕碎裂换玻璃/OLED、电池不耐用、进水、表带', 'Screen, battery, water, strap')}</p>
              <a href="/watch-repair" className="inline-block mt-3 text-xs bg-white/20 px-3 py-1 rounded-full hover:bg-white/30">{t('查看服务 →', 'Services →')}</a>
            </div>
            <div className="bg-gradient-to-br from-gray-600 to-gray-500 text-white rounded-2xl p-5 shadow-md">
              <div className="text-3xl mb-2">⌚</div>
              <h3 className="font-bold text-lg mb-1">{t('Samsung Galaxy Watch', 'Samsung Galaxy Watch')}</h3>
              <p className="text-sm text-white/80 mb-2">{t('Galaxy Watch 6/5/4/Classic/Ultra', 'Galaxy Watch 6/5/4/Classic/Ultra')}</p>
              <p className="text-xs text-white/60">{t('屏幕、电池、表带、进水', 'Screen, battery, strap, water')}</p>
              <a href="/watch-repair" className="inline-block mt-3 text-xs bg-white/20 px-3 py-1 rounded-full hover:bg-white/30">{t('查看服务 →', 'Services →')}</a>
            </div>
            <div className="bg-gradient-to-br from-red-600 to-red-500 text-white rounded-2xl p-5 shadow-md">
              <div className="text-3xl mb-2">🎮</div>
              <h3 className="font-bold text-lg mb-1">{t('游戏机', 'Game Console')}</h3>
              <p className="text-sm text-white/80 mb-2">{t('Switch OLED/Switch/PS5/PS4/Xbox Series X/PSP', 'Switch OLED/Switch/PS5/PS4/Xbox/PSP')}</p>
              <p className="text-xs text-white/60">{t('手柄漂移、屏幕碎、不充电、清灰散热、改装', 'Joystick drift, screen, no power, clean, mods')}</p>
              <a href="/console-repair" className="inline-block mt-3 text-xs bg-white/20 px-3 py-1 rounded-full hover:bg-white/30">{t('查看服务 →', 'Services →')}</a>
            </div>
            <div className="bg-gradient-to-br from-green-600 to-green-500 text-white rounded-2xl p-5 shadow-md">
              <div className="text-3xl mb-2">🎧</div>
              <h3 className="font-bold text-lg mb-1">{t('耳机', 'Earphones')}</h3>
              <p className="text-sm text-white/80 mb-2">{t('AirPods Pro 2/AirPods 3/全系TWS耳机', 'AirPods Pro 2/AirPods 3/TWS all')}</p>
              <p className="text-xs text-white/60">{t('电池不耐用、一只不响、充电仓故障、麦克风不灵', 'Battery drain, one side silent, case fault, mic')}</p>
              <a href="/headphone-repair" className="inline-block mt-3 text-xs bg-white/20 px-3 py-1 rounded-full hover:bg-white/30">{t('查看服务 →', 'Services →')}</a>
            </div>
            <div className="bg-gradient-to-br from-purple-600 to-purple-500 text-white rounded-2xl p-5 shadow-md">
              <div className="text-3xl mb-2">📷</div>
              <h3 className="font-bold text-lg mb-1">{t('相机/无人机', 'Camera/Drone')}</h3>
              <p className="text-sm text-white/80 mb-2">{t('数码相机/单反/DJI无人机', 'Digital/DSLR/DJI drone')}</p>
              <p className="text-xs text-white/60">{t('镜头维修、传感器清洁、快门、存储卡数据恢复', 'Lens, sensor clean, shutter, SD recovery')}</p>
              <a href="/camera-repair" className="inline-block mt-3 text-xs bg-white/20 px-3 py-1 rounded-full hover:bg-white/30">{t('查看服务 →', 'Services →')}</a>
            </div>
            <div className="bg-gradient-to-br from-gray-700 to-gray-600 text-white rounded-2xl p-5 shadow-md">
              <div className="text-3xl mb-2">🔧</div>
              <h3 className="font-bold text-lg mb-1">{t('改装配件', 'Custom Mods')}</h3>
              <p className="text-sm text-white/80 mb-2">{t('手机改双卡、扩容、换壳、游戏机改装', 'Dual SIM, storage, shell swap, console mods')}</p>
              <p className="text-xs text-white/60">{t('想做啥说来聊，按项目报价', 'DM us your idea, quote based')}</p>
              <button onClick={() => setShowContact(true)} className="inline-block mt-3 text-xs bg-white/20 px-3 py-1 rounded-full hover:bg-white/30">{t('📱 微信咨询 →', 'WeChat →')}</button>
            </div>
            <div className="bg-gradient-to-br from-amber-600 to-amber-500 text-white rounded-2xl p-5 shadow-md">
              <div className="text-3xl mb-2">🔌</div>
              <h3 className="font-bold text-lg mb-1">{t('智能家居/路由/监控', 'Smart Home/Router/Camera')}</h3>
              <p className="text-sm text-white/80 mb-2">{t('路由器设置、监控安装、智能家居调试', 'Router setup, CCTV, smart home config')}</p>
              <p className="text-xs text-white/60">{t('网络故障排查、WiFi覆盖优化、监控维修', 'Network troubleshooting, WiFi, CCTV repair')}</p>
              <button onClick={() => setShowContact(true)} className="inline-block mt-3 text-xs bg-white/20 px-3 py-1 rounded-full hover:bg-white/30">{t('📱 微信咨询 →', 'WeChat →')}</button>
            </div>
            <div className="bg-gradient-to-br from-gray-600 to-gray-500 text-white rounded-2xl p-5 shadow-md">
              <div className="text-3xl mb-2">❓</div>
              <h3 className="font-bold text-lg mb-1">{t('其他数码产品', 'Other Devices')}</h3>
              <p className="text-sm text-white/80 mb-2">{t('电子词典、学习机、GPS导航、翻译笔', 'E-dict, learning pad, GPS, pen')}</p>
              <p className="text-xs text-white/60">{t('任何数码产品问题拿来免费检测', 'Any device issue, free check')}</p>
              <button onClick={() => setShowContact(true)} className="inline-block mt-3 text-xs bg-white/20 px-3 py-1 rounded-full hover:bg-white/30">{t('📱 微信咨询 →', 'WeChat →')}</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
