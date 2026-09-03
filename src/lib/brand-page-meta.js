/**
 * 品牌维修页面服务端 metadata（SEO 用）
 * 用法：每个品牌目录 layout.js 里 import 并导出
 * 注意：不写价格（免费检测先报价模式），关键词覆盖品牌+服务+地区
 */

const brands = {
  'iphone-repair': {
    title: '威海iPhone维修_换屏换电池主板维修',
    description: '威海iPhone维修，换屏、换电池、主板维修、进水处理、面容修复、充电口维修。iPhone 6到17全系列，免费检测先报价，30天质保，Crazy维修2007年至今。',
    keywords: '威海iPhone维修,威海苹果手机维修,iPhone换屏,威海iPhone换电池,iPhone主板维修,威海苹果维修,环翠区手机维修,威海手机维修店',
  },
  'samsung-repair': {
    title: '威海Samsung三星手机维修_换屏换电池',
    description: '威海三星手机维修，换屏、换电池、主板维修、后盖更换、进水维修。Galaxy S/Z系列全系支持，免费检测先报价，30天质保，Crazy维修2007年至今。',
    keywords: '威海三星维修,威海Samsung维修,三星换屏,威海三星换电池,Galaxy维修,威海手机维修,环翠区维修,主板维修',
  },
  'huawei-repair': {
    title: '威海华为手机维修_换屏换电池主板维修',
    description: '威海华为手机维修，换屏、换电池、主板维修、进水维修、刷机解锁、后盖更换。Mate/P/nova系列全系支持，免费检测先报价，30天质保。',
    keywords: '威海华为维修,华为换屏,威海华为换电池,华为主板维修,华为进水维修,威海手机维修,环翠区维修',
  },
  'xiaomi-repair': {
    title: '威海小米手机维修_换屏换电池解锁',
    description: '威海小米手机维修，换屏、换电池、刷机解锁、主板维修。小米/红米全系列支持，免费检测先报价，30天质保，Crazy维修2007年至今。',
    keywords: '威海小米维修,小米换屏,威海小米换电池,红米维修,小米刷机解锁,威海手机维修,环翠区维修',
  },
  'oppo-repair': {
    title: '威海OPPO手机维修_换屏换电池充电口',
    description: '威海OPPO手机维修，换屏、换电池、充电口维修、主板维修。Reno/Find系列全系支持，免费检测先报价，30天质保，Crazy维修2007年至今。',
    keywords: '威海OPPO维修,OPPO换屏,威海OPPO换电池,威海手机维修,环翠区维修,充电口维修,主板维修',
  },
  'vivo-repair': {
    title: '威海vivo手机维修_换屏换电池充电口',
    description: '威海vivo手机维修，换屏、换电池、充电口维修、主板维修。X/Y系列全系支持，免费检测先报价，30天质保，Crazy维修2007年至今。',
    keywords: '威海vivo维修,vivo换屏,威海vivo换电池,威海手机维修,环翠区维修,充电口维修,主板维修',
  },
  'oneplus-repair': {
    title: '威海OnePlus一加手机维修_换屏换电池',
    description: '威海一加手机维修，换屏、换电池、充电口维修、主板维修。OnePlus全系支持，免费检测先报价，30天质保，Crazy维修2007年至今。',
    keywords: '威海一加维修,OnePlus换屏,威海一加换电池,威海手机维修,环翠区维修,主板维修',
  },
  'google-repair': {
    title: '威海Google Pixel手机维修_换屏换电池',
    description: '威海Google Pixel手机维修，换屏、换电池、主板维修。Pixel全系支持，免费检测先报价，30天质保，Crazy维修2007年至今。',
    keywords: '威海Google维修,威海Pixel维修,Pixel换屏,威海手机维修,环翠区维修,主板维修',
  },
  'honor-repair': {
    title: '威海荣耀Honor手机维修_换屏换电池',
    description: '威海荣耀手机维修，换屏、换电池、主板维修、进水维修。Honor全系支持，免费检测先报价，30天质保，Crazy维修2007年至今。',
    keywords: '威海荣耀维修,Honor换屏,威海荣耀换电池,威海手机维修,环翠区维修,主板维修',
  },
  'realme-repair': {
    title: '威海Realme真我手机维修_换屏换电池',
    description: '威海真我手机维修，换屏、换电池、充电口维修、主板维修。Realme全系支持，免费检测先报价，30天质保，Crazy维修2007年至今。',
    keywords: '威海真我维修,Realme换屏,威海Realme换电池,威海手机维修,环翠区维修,主板维修',
  },
  'macbook-repair': {
    title: '威海MacBook维修_换屏换电池清灰',
    description: '威海MacBook维修，屏幕更换、电池更换、键盘维修、清灰换硅脂、主板维修。Air/Pro全系支持，免费检测先报价，30天质保。',
    keywords: '威海MacBook维修,MacBook换屏,威海苹果电脑维修,MacBook电池更换,笔记本维修,主板维修,清灰',
  },
  'lenovo-repair': {
    title: '威海联想笔记本维修_换屏清灰换电池',
    description: '威海联想笔记本维修，屏幕更换、电池更换、键盘维修、清灰换硅脂、系统升级、主板维修。ThinkPad/小新/Yoga全系，免费检测先报价，30天质保。',
    keywords: '威海联想维修,联想笔记本换屏,威海笔记本维修,ThinkPad维修,清灰,换电池,主板维修',
  },
  'dell-repair': {
    title: '威海戴尔笔记本维修_换屏清灰换电池',
    description: '威海戴尔笔记本维修，屏幕更换、电池更换、键盘维修、清灰换硅脂、系统升级、主板维修。XPS/Latitude/游匣全系，免费检测先报价，30天质保。',
    keywords: '威海戴尔维修,Dell笔记本换屏,威海笔记本维修,XPS维修,清灰,换电池,主板维修',
  },
  'hp-repair': {
    title: '威海惠普笔记本维修_换屏清灰换电池',
    description: '威海惠普笔记本维修，屏幕更换、电池更换、键盘维修、清灰换硅脂、系统升级、主板维修。星/暗影精灵/战系列全系，免费检测先报价，30天质保。',
    keywords: '威海惠普维修,HP笔记本换屏,威海笔记本维修,暗影精灵维修,清灰,换电池,主板维修',
  },
  'asus-repair': {
    title: '威海华硕笔记本维修_换屏清灰换电池',
    description: '威海华硕笔记本维修，屏幕更换、电池更换、键盘维修、清灰换硅脂、系统升级、主板维修。灵耀/天选/ROG全系，免费检测先报价，30天质保。',
    keywords: '威海华硕维修,ASUS笔记本换屏,威海笔记本维修,ROG维修,清灰,换电池,主板维修',
  },
  'acer-repair': {
    title: '威海宏碁笔记本维修_换屏清灰换电池',
    description: '威海宏碁笔记本维修，屏幕更换、电池更换、键盘维修、清灰换硅脂、系统升级、主板维修。暗影骑士/非凡/掠夺者全系，免费检测先报价，30天质保。',
    keywords: '威海宏碁维修,Acer笔记本换屏,威海笔记本维修,暗影骑士维修,清灰,换电池,主板维修',
  },
  'msi-repair': {
    title: '威海微星笔记本维修_换屏清灰换电池',
    description: '威海微星笔记本维修，屏幕更换、电池更换、键盘维修、清灰换硅脂、系统升级、主板维修。游戏本全系，免费检测先报价，30天质保。',
    keywords: '威海微星维修,MSI笔记本换屏,威海笔记本维修,游戏本维修,清灰,换电池,主板维修',
  },
  'surface-repair': {
    title: '威海Surface维修_换屏换电池主板维修',
    description: '威海微软Surface维修，屏幕更换、电池更换、主板维修、系统故障。Surface Pro/Go/Laptop全系，免费检测先报价，30天质保。',
    keywords: '威海Surface维修,Surface换屏,威海Surface Pro维修,平板维修,主板维修,微软维修',
  },
  'hasee-repair': {
    title: '威海神舟笔记本维修_换屏清灰换电池',
    description: '威海神舟笔记本维修，屏幕更换、电池更换、键盘维修、清灰换硅脂、主板维修。战神全系，免费检测先报价，30天质保。',
    keywords: '威海神舟维修,Hasee笔记本维修,战神笔记本维修,清灰,换电池,主板维修,威海笔记本维修',
  },
  'ipad-repair': {
    title: '威海iPad维修_换屏换电池主板维修',
    description: '威海iPad维修，屏幕更换、电池更换、主板维修、进水处理。iPad全系列支持，免费检测先报价，30天质保，Crazy维修2007年至今。',
    keywords: '威海iPad维修,iPad换屏,威海平板维修,iPad电池更换,苹果平板维修,环翠区维修,主板维修',
  },
  'tablet-repair': {
    title: '威海平板电脑维修_换屏换电池',
    description: '威海平板电脑维修，iPad、安卓平板换屏、换电池、主板维修、进水处理。全品牌平板支持，免费检测先报价，30天质保。',
    keywords: '威海平板维修,平板换屏,威海iPad维修,安卓平板维修,主板维修,进水维修',
  },
  'phone-repair': {
    title: '威海手机维修_换屏换电池主板维修',
    description: '威海手机维修，苹果、三星、华为、小米、OPPO、vivo等全品牌换屏、换电池、主板维修、进水处理。免费检测先报价，30天质保，2007年至今。',
    keywords: '威海手机维修,威海修手机,威海换屏,威海换电池,手机主板维修,威海手机维修店,环翠区维修',
  },
  'computer-repair': {
    title: '威海电脑维修_笔记本维修上门服务',
    description: '威海电脑维修，笔记本换屏、换电池、清灰、重装系统、主板维修、数据恢复。联想戴尔惠普华硕全品牌，免费检测先报价，30天质保。',
    keywords: '威海电脑维修,威海笔记本维修,电脑清灰,重装系统,威海电脑维修上门,主板维修,数据恢复',
  },
  'camera-repair': {
    title: '威海相机维修_镜头维修主板维修',
    description: '威海相机维修，镜头维修、屏幕更换、主板维修、进水处理。单反/微单/卡片机全系，免费检测先报价，30天质保。',
    keywords: '威海相机维修,镜头维修,单反维修,微单维修,相机屏幕更换,威海数码维修',
  },
  'console-repair': {
    title: '威海游戏机维修_Switch/PS/Xbox维修',
    description: '威海游戏机维修，Switch、PS5、Xbox换屏、手柄维修、主板维修、开不了机。免费检测先报价，30天质保。',
    keywords: '威海游戏机维修,Switch维修,PS5维修,Xbox维修,手柄维修,威海数码维修',
  },
  'headphone-repair': {
    title: '威海耳机维修_AirPods/蓝牙耳机维修',
    description: '威海耳机维修，AirPods换电池、蓝牙耳机维修、充电仓维修、线控耳机维修。免费检测先报价，30天质保。',
    keywords: '威海耳机维修,AirPods维修,AirPods换电池,蓝牙耳机维修,耳机充电仓维修',
  },
  'watch-repair': {
    title: '威海手表维修_智能手表换屏换电池',
    description: '威海手表维修，Apple Watch、智能手表换屏、换电池、进水处理，传统手表换电池。免费检测先报价，30天质保。',
    keywords: '威海手表维修,Apple Watch维修,智能手表换屏,手表换电池,威海数码维修',
  },
  'kindle-repair': {
    title: '威海Kindle维修_换屏换电池',
    description: '威海Kindle维修，电子书屏幕更换、电池更换、不开机维修。全系列支持，免费检测先报价，30天质保。',
    keywords: '威海Kindle维修,Kindle换屏,电子书维修,Kindle换电池,威海数码维修',
  },
  'nintendo-repair': {
    title: '威海任天堂维修_Switch换屏维修',
    description: '威海任天堂维修，Switch换屏、手柄维修、不开机维修、充电口维修。免费检测先报价，30天质保。',
    keywords: '威海任天堂维修,Switch换屏,Switch维修,任天堂手柄维修,威海游戏机维修',
  },
  'sony-repair': {
    title: '威海索尼维修_手机笔记本PS维修',
    description: '威海索尼设备维修，索尼手机、笔记本、PS游戏机、相机维修。免费检测先报价，30天质保。',
    keywords: '威海索尼维修,索尼手机维修,PS维修,索尼笔记本维修,索尼相机维修',
  },
  'other-repair': {
    title: '威海其他数码设备维修_免费检测',
    description: '威海其他数码设备维修，打印机、电子书、行车记录仪等各类数码产品。先检测后报价，能修才收钱，30天质保，2007年至今。',
    keywords: '威海数码维修,威海设备维修,打印机维修,电子书维修,免费检测,威海维修店',
  },
}

export default brands
