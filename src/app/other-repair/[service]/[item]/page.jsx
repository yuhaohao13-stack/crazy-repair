'use client'
import { useSite } from '../../../../lib/SiteContext'
import Navbar from '../../../../components/Navbar'
import Breadcrumb from "../../../../components/Breadcrumb";
import { useParams } from 'next/navigation'

const itemDetails = {
  'watch-screen': {
    title: '屏幕更换',
    titleEn: 'Screen Replacement',
    icon: '📱',
    description: 'Apple Watch屏幕碎裂、漏液、触摸不灵。OLED屏幕更换，含防水密封胶。Ultra/SE/全系列。',
    descriptionEn: 'Apple Watch cracked screen, leaking, unresponsive. OLED screen replacement with waterproof sealant. Ultra/SE/all series.',
    details: [
      'Apple Watch Ultra/Ultra 2/Series 10/9/8/7/SE/6 全系列屏幕更换',
      'OLED屏幕碎裂换玻璃、漏液更换、触摸失灵修复',
      '更换后含专业防水密封胶恢复生活防水',
      '含触摸校准，确保操作流畅',
      '30分钟快修，立等可取',
    ],
    detailsEn: [
      'Apple Watch Ultra/Ultra 2/Series 10/9/8/7/SE/6 full series screen replacement',
      'Cracked OLED glass replacement, leaking screen fix, touch unresponsive repair',
      'Professional waterproof sealant applied after replacement',
      'Touch calibration included for smooth operation',
      '30-minute quick repair, wait while you wait',
    ],
  },
  'watch-battery': {
    title: '电池更换',
    titleEn: 'Battery Service',
    icon: '🔋',
    description: 'Apple Watch电池不耐用、充不进电、续航不到半天。原装规格电池更换。',
    descriptionEn: 'Apple Watch battery drain, no charge, less than half-day battery. OEM spec battery replacement.',
    details: [
      'Apple Watch全系列电池更换（Ultra/SE/全系）',
      '电池不耐用、充不进电、续航大幅下降',
      '原装规格电池，容量达标不虚标',
      '更换后检测电池健康度',
      '续航恢复如新',
    ],
    detailsEn: [
      'Full Apple Watch battery replacement (Ultra/SE/all series)',
      'Battery drain, no charge, significantly reduced battery life',
      'OEM spec battery with accurate capacity',
      'Battery health check after replacement',
      'Battery life restored like new',
    ],
  },
  'watch-water-damage': {
    title: '进水维修',
    titleEn: 'Water Damage',
    icon: '💧',
    description: 'Apple Watch进水后触摸失灵、屏幕有水雾、功能异常。超声波清洗+芯片级修复。',
    descriptionEn: 'Apple Watch water damaged — touch not working, screen fog, functional issues. Ultrasonic clean + chip-level fix.',
    details: [
      'Apple Watch进水/受潮处理',
      '超声波清洗主板去除腐蚀',
      '进水后触摸失灵、屏幕水雾修复',
      '切勿在进水后插电充电！',
      '进水越早送来修复率越高',
    ],
    detailsEn: [
      'Apple Watch water damage/submersion treatment',
      'Ultrasonic cleaning to remove corrosion',
      'Touch not working, screen fog repair',
      'DO NOT charge after water damage!',
      'Earlier diagnosis = higher success rate',
    ],
  },
  'watch-sensor': {
    title: '传感器维修',
    titleEn: 'Sensor Repair',
    icon: '📡',
    description: '心率传感器不准、血氧不工作、ECG心电图无法测量。传感器模块维修更换。',
    descriptionEn: 'Heart rate sensor inaccurate, SpO2 not working, ECG unavailable. Sensor module repair.',
    details: [
      'Apple Watch心率传感器不准/不工作',
      '血氧饱和度(SpO2)无法测量',
      'ECG心电图功能异常',
      '传感器模块芯片级维修',
      '包含传感器模块更换服务',
    ],
    detailsEn: [
      'Apple Watch heart rate sensor inaccurate/not working',
      'Blood oxygen (SpO2) measurement failure',
      'ECG function abnormal',
      'Sensor module chip-level repair',
      'Sensor module replacement available',
    ],
  },
  'samsung-watch-screen': {
    title: '屏幕更换',
    titleEn: 'Screen Replacement',
    icon: '📱',
    description: 'Galaxy Watch AMOLED屏幕碎裂漏液触摸不灵。原装品质屏幕更换，含防水密封。',
    descriptionEn: 'Galaxy Watch AMOLED cracked, leaking, unresponsive. OEM quality screen replacement with waterproof seal.',
    details: [
      'Samsung Galaxy Watch 6/5/4/Classic/Ultra 全系列屏幕更换',
      'AMOLED屏幕碎裂、漏液、触摸不灵维修',
      '原装品质屏幕更换',
      '含专业防水密封胶',
      '触摸校准恢复流畅操作',
    ],
    detailsEn: [
      'Samsung Galaxy Watch 6/5/4/Classic/Ultra full series screen replacement',
      'AMOLED cracked, leaking, touch not working repair',
      'OEM quality screen replacement',
      'Professional waterproof sealant included',
      'Touch calibration for smooth operation',
    ],
  },
  'samsung-watch-battery': {
    title: '电池更换',
    titleEn: 'Battery Service',
    icon: '🔋',
    description: '三星手表电池不耐用、充不进电、续航大幅下降。原装规格电池更换。',
    descriptionEn: 'Samsung watch battery drain, no charge, significantly reduced battery life. OEM spec battery replacement.',
    details: [
      'Samsung Galaxy Watch全系列电池更换',
      '电池不耐用、充不进电、续航大幅下降',
      '原装规格电池，容量达标',
      '更换后检测电池工作状态',
      '续航恢复，告别一天一充',
    ],
    detailsEn: [
      'Full Samsung Galaxy Watch battery replacement',
      'Battery drain, no charge, significantly reduced battery life',
      'OEM spec battery with accurate capacity',
      'Battery status check after replacement',
      'Full day battery life restored',
    ],
  },
  'samsung-watch-strap': {
    title: '表带/表扣',
    titleEn: 'Strap/Buckle',
    icon: '🔗',
    description: 'Galaxy Watch原装/兼容表带更换、表扣断裂维修。多种材质可选。',
    descriptionEn: 'Galaxy Watch OEM/compatible strap replacement, buckle repair. Multiple material options.',
    details: [
      'Galaxy Watch原装/兼容表带更换',
      '表扣断裂焊接修复',
      '多种材质可选（硅胶/皮革/金属）',
      '适配 Galaxy Watch 6/5/4/Classic/Ultra',
      '多种颜色可选',
    ],
    detailsEn: [
      'Galaxy Watch OEM/compatible strap replacement',
      'Buckle breakage repair/welding',
      'Multiple material options (silicone/leather/metal)',
      'Compatible with Galaxy Watch 6/5/4/Classic/Ultra',
      'Multiple color options available',
    ],
  },
  'samsung-watch-motherboard': {
    title: '主板维修',
    titleEn: 'Motherboard',
    icon: '🔬',
    description: '不开机、重启、充电IC故障、GPS不定位。芯片级维修。',
    descriptionEn: 'No power, reboot, charging IC fault, GPS not working. Chip-level repair.',
    details: [
      '不开机、反复重启循环',
      '充电IC芯片故障、不充电',
      'GPS无法定位、蓝牙连接异常',
      '芯片级主板维修，精准定位故障点',
      '含主板检测，先报价后维修',
    ],
    detailsEn: [
      'No power, boot loop',
      'Charging IC chip fault, not charging',
      'GPS not locating, Bluetooth connection issues',
      'Chip-level motherboard repair, precise fault diagnosis',
      'Includes motherboard diagnosis, quote before repair',
    ],
  },
  'console-joystick-drift': {
    title: '手柄漂移维修',
    titleEn: 'Joystick Drift',
    icon: '🎮',
    description: 'Switch Joy-Con漂移、PS5手柄漂移、Xbox手柄摇杆不归位。霍尔效应摇杆改装升级，永不漂移。',
    descriptionEn: 'Switch Joy-Con drift, PS5 controller drift, Xbox stick not centering. Hall effect joystick upgrade — never drift again.',
    details: [
      'Nintendo Switch Joy-Con左右手柄漂移维修',
      'PS5 DualSense/PS4手柄摇杆漂移、不回中',
      'Xbox Series X/S/One手柄摇杆漂移',
      '霍尔效应摇杆改装升级——采用电磁感应原理，物理无接触，永不漂移',
      '原装摇杆更换复位，含校准检测',
      '改装霍尔摇杆推荐：一步到位解决漂移烦恼',
    ],
    detailsEn: [
      'Nintendo Switch Joy-Con L/R drift repair',
      'PS5 DualSense/PS4 controller stick drift, not centering',
      'Xbox Series X/S/One controller stick drift',
      'Hall effect joystick upgrade — electromagnetic sensing, no physical contact, never drift again',
      'OEM stick replacement with calibration',
      'Hall effect mod recommended: permanent solution',
    ],
  },
  'console-screen': {
    title: '屏幕更换',
    titleEn: 'Screen Replacement',
    icon: '📱',
    description: 'Switch OLED/Switch/Lite屏幕碎裂漏液。OLED/LCD屏幕更换，含触摸校准。',
    descriptionEn: 'Switch OLED/Switch/Lite cracked screen, leaking. OLED/LCD screen replacement with touch calibration.',
    details: [
      'Nintendo Switch OLED 全贴合屏幕更换',
      'Nintendo Switch/Switch Lite LCD屏幕更换',
      'PSP/PSV屏幕碎裂漏液更换',
      '原装品质屏幕，含触摸校准',
      '更换后功能检测，确保触控灵敏',
    ],
    detailsEn: [
      'Nintendo Switch OLED full-lamination screen replacement',
      'Nintendo Switch/Switch Lite LCD screen replacement',
      'PSP/PSV cracked screen replacement',
      'OEM quality screen with touch calibration',
      'Full function test after replacement',
    ],
  },
  'console-battery': {
    title: '电池更换',
    titleEn: 'Battery Service',
    icon: '🔋',
    description: 'Switch/PS5手柄/Xbox手柄电池不耐用、鼓包、充不进电。原装规格电池更换。',
    descriptionEn: 'Switch/PS5 controller/Xbox controller battery drain, swelling, no charge. OEM spec battery.',
    details: [
      'Nintendo Switch 主机/手柄电池更换',
      'PS5 DualSense 手柄电池不耐用',
      'Xbox 手柄电池更换（含可充电电池组）',
      '原装规格电池，容量达标',
      '电池鼓包检测，安全隐患排查',
    ],
    detailsEn: [
      'Nintendo Switch console/controller battery replacement',
      'PS5 DualSense controller battery service',
      'Xbox controller battery replacement (rechargeable pack)',
      'OEM spec battery with accurate capacity',
      'Battery swelling check, safety inspection',
    ],
  },
  'console-cleaning': {
    title: '清灰散热',
    titleEn: 'Cleaning & Cooling',
    icon: '🧹',
    description: '游戏机发热严重、风扇异响、自动关机。深度拆机清灰+换导热硅脂。',
    descriptionEn: 'Console overheating, fan noise, auto shutdown. Deep clean + thermal paste replacement.',
    details: [
      'Nintendo Switch/PS5/PS4/Xbox 深度拆机清灰',
      '风扇异响清洗润滑',
      '更换高品质导热硅脂',
      '散热模组清洁，恢复散热效率',
      '游戏机发热严重、自动关机问题解决',
      '建议每年清灰一次，延长主机寿命',
    ],
    detailsEn: [
      'Nintendo Switch/PS5/PS4/Xbox deep disassembly cleaning',
      'Fan noise cleaning and lubrication',
      'High-quality thermal paste replacement',
      'Heat sink cleaning, restore cooling efficiency',
      'Overheating, auto shutdown issues resolved',
      'Recommended yearly cleaning to extend console life',
    ],
  },
  'console-mods': {
    title: '改装升级',
    titleEn: 'Console Mods',
    icon: '⚡',
    description: 'Switch芯片破解、PS5扩容SSD、Xbox换内置硬盘、外壳更换。各类改装升级。',
    descriptionEn: 'Switch mod chip, PS5 SSD upgrade, Xbox internal drive swap, shell replacement. Various mods.',
    details: [
      'Nintendo Switch OLED/Switch 芯片破解系统安装（请确认合规使用）',
      'PS5 内置M.2 SSD扩容升级',
      'Xbox Series X/S 内置硬盘更换升级',
      'Switch/PS5/Xbox 外壳DIY改色更换',
      '各类型游戏机改装、DIY创意改装',
      '按项目报价，想做啥说来聊',
    ],
    detailsEn: [
      'Nintendo Switch OLED/Switch mod chip system install (please confirm compliant use)',
      'PS5 internal M.2 SSD upgrade',
      'Xbox Series X/S internal drive swap',
      'Switch/PS5/Xbox DIY shell replacement/color change',
      'Various console mods and DIY customizations',
      'Quote based on project — DM us your idea',
    ],
  },
  'headphone-battery': {
    title: '电池更换',
    titleEn: 'Battery Service',
    icon: '🔋',
    description: 'AirPods/蓝牙耳机电池不耐用、续航不到半小时、一只掉电快。电池更换续航恢复。',
    descriptionEn: 'AirPods/TWS earbuds battery drain, less than 30 min battery, one side drains fast. Battery replacement restores life.',
    details: [
      'AirPods Pro 2/Pro/AirPods 3/4 全系电池更换',
      'AirPods Max 头戴耳机电池更换',
      '各类TWS蓝牙耳机电池更换',
      '一只耳机掉电快、续航不到半小时',
      '电池更换后续航恢复2-4小时',
      '含耳机壳无损拆装，更换后功能检测',
    ],
    detailsEn: [
      'AirPods Pro 2/Pro/AirPods 3/4 full series battery replacement',
      'AirPods Max over-ear battery replacement',
      'All TWS earbuds battery service',
      'One side battery drain fast, less than 30 min battery life',
      'Battery life restored to 2-4 hours after replacement',
      'Non-destructive shell opening, full function test',
    ],
  },
  'headphone-one-side-silent': {
    title: '一只不响维修',
    titleEn: 'One Side Silent',
    icon: '🎵',
    description: 'AirPods一只不响、声音小、有杂音。喇叭单元更换/排线修复。',
    descriptionEn: 'AirPods one side silent, low volume, static noise. Speaker unit replacement/flex repair.',
    details: [
      'AirPods 左/右一只耳机不响维修',
      '声音小、破音、有杂音',
      '喇叭单元更换',
      '内部排线断裂/接触不良修复',
      '维修后左右声道平衡测试',
    ],
    detailsEn: [
      'AirPods L/R one side not working repair',
      'Low volume, distorted sound, static noise',
      'Speaker unit replacement',
      'Internal flex cable break/contact issue repair',
      'L/R channel balance test after repair',
    ],
  },
  'headphone-charging-case': {
    title: '充电仓维修',
    titleEn: 'Charging Case',
    icon: '📦',
    description: 'AirPods充电仓不充电、不识别耳机、指示灯不亮。充电仓维修更换。',
    descriptionEn: 'AirPods case not charging, not recognizing earbuds, LED not working. Case repair/replacement.',
    details: [
      '充电仓不充电、充不进电',
      '充电仓不识别放入的耳机',
      '指示灯不亮、闪烁异常',
      '充电仓电池更换（支持无线充电版）',
      '充电仓主板维修',
      '可单买充电仓替换',
    ],
    detailsEn: [
      'Charging case not charging',
      'Case not recognizing earbuds',
      'LED not working, abnormal blinking',
      'Charging case battery replacement (wireless charging models)',
      'Charging case motherboard repair',
      'Replacement case available for purchase',
    ],
  },
  'headphone-mic': {
    title: '麦克风/降噪',
    titleEn: 'Mic/Noise Cancelling',
    icon: '🎤',
    description: '通话麦克风不灵、降噪失效、通透模式异常。麦克风模块维修更换。',
    descriptionEn: 'Call mic not working, ANC failed, transparency mode abnormal. Mic module repair.',
    details: [
      'AirPods 通话麦克风不灵敏、无声',
      '主动降噪(ANC)失效、减弱',
      '通透模式异常、声音失真',
      '麦克风模块芯片级维修',
      '降噪麦克风网罩清洁/更换',
      '修复后降噪效果测试',
    ],
    detailsEn: [
      'AirPods call mic not working, no sound',
      'Active Noise Cancellation (ANC) failed, reduced effectiveness',
      'Transparency mode abnormal, distorted sound',
      'Mic module chip-level repair',
      'ANC mesh cleaning/replacement',
      'Noise cancellation test after repair',
    ],
  },
  'camera-lens': {
    title: '镜头维修',
    titleEn: 'Lens Repair',
    icon: '🔭',
    description: '相机镜头对焦不准、光圈故障、镜片霉斑、变焦卡顿。镜头拆修清洁。',
    descriptionEn: 'Camera lens focus issue, aperture fault, lens fungus, zoom stuck. Lens disassembly repair & cleaning.',
    details: [
      '自动对焦不准、手动对焦环卡顿',
      '光圈叶片故障——报错ERR、曝光异常',
      '镜片内部霉斑、灰尘清洁',
      '变焦环卡顿、伸缩不畅',
      '镜头排线断裂/接触不良修复',
      '含镜头清洁+功能测试',
    ],
    detailsEn: [
      'Auto focus inaccurate, manual focus ring stuck',
      'Aperture blade fault — error code, exposure issues',
      'Internal lens fungus/dust cleaning',
      'Zoom ring stuck, telescoping issues',
      'Lens flex cable break/contact issue repair',
      'Includes lens cleaning + function test',
    ],
  },
  'camera-sensor-cleaning': {
    title: '传感器清洁',
    titleEn: 'Sensor Cleaning',
    icon: '🧼',
    description: '照片有固定黑点/污点、传感器进灰。专业传感器清洁，含CMOS表面清洁。',
    descriptionEn: 'Photos with fixed dark spots/dust spots, sensor dirt. Professional sensor cleaning including CMOS surface.',
    details: [
      '照片固定位置出现黑点/污点、灰尘',
      'CMOS/CCD传感器表面灰尘清洁',
      '单反/微单反光板/低通滤镜清洁',
      '专业传感器清洁工具+无水乙醇',
      '清洁前后可对比照片检测',
    ],
    detailsEn: [
      'Fixed dark spots/dust spots on photos',
      'CMOS/CCD sensor surface dust cleaning',
      'DSLR/mirrorless mirror/LPF cleaning',
      'Professional sensor cleaning tools + anhydrous ethanol',
      'Before/after comparison photos available',
    ],
  },
  'camera-shutter': {
    title: '快门维修',
    titleEn: 'Shutter Repair',
    icon: '📸',
    description: '快门按不下去、快门帘幕故障、快门报错、快门计数过多。快门组件更换维修。',
    descriptionEn: 'Shutter won\'t press, curtain fault, shutter error, high shutter count. Shutter assembly replacement.',
    details: [
      '快门按钮按不下去/无反应',
      '快门帘幕卡住、无法完全打开/关闭',
      '快门报错（ERR代码）',
      '快门寿命耗尽（快门计数过多）',
      '快门组件整体更换',
      '更换后快门精度测试',
    ],
    detailsEn: [
      'Shutter button not responding',
      'Shutter curtain stuck, not fully opening/closing',
      'Shutter error code',
      'Shutter life exhausted (high shutter count)',
      'Shutter assembly complete replacement',
      'Shutter accuracy test after replacement',
    ],
  },
  'camera-data-recovery': {
    title: '数据恢复',
    titleEn: 'Data Recovery',
    icon: '💾',
    description: 'SD卡/CF卡/TF卡不识别、照片丢失、误删、格式化恢复。存储卡数据恢复服务。',
    descriptionEn: 'SD/CF/TF card not recognized, photos lost, accidentally deleted, formatted recovery. Memory card data recovery.',
    details: [
      'SD/CF/TF/MicroSD卡不识别/损坏',
      '误删照片/视频恢复',
      '意外格式化后的数据恢复',
      '存储卡物理损坏（断片/进水等）数据抢救',
      '相机内存储卡报错——需要格式化',
      '先从卡里抢救数据，再处理存储卡问题',
    ],
    detailsEn: [
      'SD/CF/TF/MicroSD card not recognized/damaged',
      'Accidentally deleted photos/videos recovery',
      'Formatted card data recovery',
      'Physical card damage (broken/water) data rescue',
      'Camera card error — needs formatting',
      'Data rescue first, then card problem solving',
    ],
  },
  'camera-drone': {
    title: '无人机维修',
    titleEn: 'Drone Repair',
    icon: '🚁',
    description: 'DJI无人机炸机修复、云台维修、电机更换、桨叶更换、图传故障。',
    descriptionEn: 'DJI drone crash repair, gimbal repair, motor replacement, propeller replacement, transmission fault.',
    details: [
      'DJI无人机炸机/摔机修复',
      '云台相机维修——画面抖动、无法回中',
      '电机更换——不转、异响、卡死',
      '桨叶/机臂/外壳更换',
      '图传信号故障——画面卡顿/断开',
      '含无人机全面检测+试飞测试',
    ],
    detailsEn: [
      'DJI drone crash repair',
      'Gimbal camera repair — shaky footage, won\'t center',
      'Motor replacement — not spinning, noise, seized',
      'Propeller/arm/shell replacement',
      'Transmission signal fault — laggy/disconnected feed',
      'Full drone inspection + flight test',
    ],
  },
  'mods-storage': {
    title: '扩容升级',
    titleEn: 'Storage Upgrade',
    icon: '💾',
    description: 'iPhone/iPad/MacBook硬盘扩容，从64G扩到256G/512G/1TB。硬盘底层维修+扩容。',
    descriptionEn: 'iPhone/iPad/MacBook storage upgrade, from 64GB to 256GB/512GB/1TB. NAND-level upgrade.',
    details: [
      'iPhone硬盘扩容：64G→128G/256G/512G/1TB',
      'iPad/iPad Pro硬盘扩容升级',
      'MacBook SSD硬盘更换扩容',
      '硬盘底层(NAND)维修+扩容',
      '扩容后系统刷写，数据迁移',
      '含扩容后全面功能检测',
    ],
    detailsEn: [
      'iPhone storage upgrade: 64GB→128GB/256GB/512GB/1TB',
      'iPad/iPad Pro storage upgrade',
      'MacBook SSD replacement/upgrade',
      'NAND-level repair + upgrade',
      'System flashing and data migration after upgrade',
      'Full function test after upgrade',
    ],
  },
  'mods-dual-sim': {
    title: '改双卡',
    titleEn: 'Dual SIM Mod',
    icon: '📞',
    description: 'iPhone 国行/港版/美版改双卡双待。双卡排线焊接改装，支持双4G/5G。',
    descriptionEn: 'iPhone China/HK/US version dual SIM mod. Dual SIM flex soldering, dual 4G/5G support.',
    details: [
      'iPhone 国行/港版/美版改双卡双待',
      '单卡改双卡排线焊接',
      '支持双4G/5G网络',
      '适配机型：iPhone XR/XS Max/11/12/13/14/15/16/17系列',
      '物理双卡 + eSIM 组合方案可选',
    ],
    detailsEn: [
      'iPhone China/HK/US version dual SIM mod',
      'Single to dual SIM flex cable soldering',
      'Dual 4G/5G network support',
      'Compatible: iPhone XR/XS Max/11/12/13/14/15/16/17 series',
      'Physical dual SIM + eSIM combo options available',
    ],
  },
  'mods-shell-swap': {
    title: '换壳改色',
    titleEn: 'Shell Swap',
    icon: '🎨',
    description: '手机外壳更换改色、中框更换。透明后盖、碳纤维、定制颜色可选。',
    descriptionEn: 'Phone shell swap, color change, mid-frame replacement. Clear back, carbon fiber, custom colors available.',
    details: [
      'iPhone/Android手机外壳更换改色',
      '中框（边框）更换',
      '透明后盖、碳纤维纹理、磨砂半透',
      '定制颜色、图案可聊',
      '含中框/按键等全套移植',
    ],
    detailsEn: [
      'iPhone/Android shell replacement/color change',
      'Mid-frame (bezel) replacement',
      'Clear back, carbon fiber texture, frosted semi-transparent',
      'Custom colors and patterns — DM to discuss',
      'Full transplant including mid-frame/buttons',
    ],
  },
  'mods-console': {
    title: '游戏机改装',
    titleEn: 'Console Mods',
    icon: '🔧',
    description: 'Switch OLED/Switch芯片破解系统、PS5加装M.2 SSD、Xbox换内置硬盘、外壳DIY。',
    descriptionEn: 'Switch OLED/Switch mod chip install, PS5 M.2 SSD upgrade, Xbox internal drive swap, DIY shells.',
    details: [
      'Nintendo Switch OLED/Switch 芯片破解系统安装',
      'PS5 内置M.2 SSD扩容升级',
      'Xbox Series X/S 内置硬盘更换升级',
      'Switch/PS5/Xbox 外壳DIY改色',
      '各类型游戏机改装项目',
      '按项目报价，先沟通后施工',
    ],
    detailsEn: [
      'Nintendo Switch OLED/Switch mod chip system install',
      'PS5 internal M.2 SSD upgrade',
      'Xbox Series X/S internal drive swap',
      'Switch/PS5/Xbox DIY shell color change',
      'Various console mod projects',
      'Quote based on project — discuss before work',
    ],
  },
  'smart-home-router': {
    title: '路由器设置',
    titleEn: 'Router Setup',
    icon: '📡',
    description: '路由器初始设置、WiFi密码修改、桥接/中继模式、家长控制。各类品牌路由器（TP-Link/小米/华硕/网件）。',
    descriptionEn: 'Router initial setup, WiFi password change, bridge/repeater mode, parental controls. All brands (TP-Link/Xiaomi/ASUS/Netgear).',
    details: [
      '路由器首次安装初始化设置',
      'WiFi名称/密码修改',
      '桥接/中继模式/AP模式设置',
      '家长控制/网址过滤/限速设置',
      '支持品牌：TP-Link、小米、华硕、网件、华为等',
      '远程指导/上门调试（威海市区）',
    ],
    detailsEn: [
      'Router first-time setup and initialization',
      'WiFi name/password change',
      'Bridge/repeater/AP mode setup',
      'Parental controls/URL filtering/bandwidth limit',
      'Supported brands: TP-Link, Xiaomi, ASUS, Netgear, Huawei, etc.',
      'Remote guidance/on-site setup (Weihai city area)',
    ],
  },
  'smart-home-wifi': {
    title: 'WiFi覆盖优化',
    titleEn: 'WiFi Optimization',
    icon: '📶',
    description: '家里WiFi信号差、死角多、网速慢。Mesh组网方案设计+实施，信号满格。',
    descriptionEn: 'Weak WiFi signal, dead zones, slow internet. Mesh network design + implementation, full signal coverage.',
    details: [
      '全屋WiFi信号检测和覆盖评估',
      'WiFi死角排查',
      'Mesh组网方案设计（有线/无线回程）',
      'Mesh路由器安装调试',
      'AC+AP方案部署（适合大户型/别墅）',
      '网速优化，信道调整，减少干扰',
    ],
    detailsEn: [
      'Whole-home WiFi signal survey and coverage assessment',
      'WiFi dead zone detection',
      'Mesh network design (wired/wireless backhaul)',
      'Mesh router installation and setup',
      'AC+AP deployment (for large homes/villas)',
      'Speed optimization, channel adjustment, interference reduction',
    ],
  },
  'smart-home-cctv': {
    title: '监控安装',
    titleEn: 'CCTV Installation',
    icon: '📹',
    description: '家用/商用监控摄像头安装调试。PoE有线/WiFi无线监控、手机远程查看、录像回放设置。',
    descriptionEn: 'Home/commercial CCTV camera installation & setup. PoE wired/wireless, mobile remote viewing, recording setup.',
    details: [
      '家用/商用监控摄像头安装',
      'PoE有线供电监控系统部署',
      'WiFi无线摄像头安装（含内存卡/NVR）',
      '手机APP远程实时查看设置',
      '录像回放、移动侦测告警配置',
      '支持品牌：海康、大华、小米、TP-Link等',
    ],
    detailsEn: [
      'Home/commercial CCTV camera installation',
      'PoE wired surveillance system deployment',
      'WiFi wireless camera setup (with SD card/NVR)',
      'Mobile app remote live viewing setup',
      'Recording playback, motion detection alert config',
      'Supported brands: Hikvision, Dahua, Xiaomi, TP-Link, etc.',
    ],
  },
  'smart-home-setup': {
    title: '智能家居调试',
    titleEn: 'Smart Home Setup',
    icon: '🏠',
    description: '米家智能设备接入、HomeKit家庭中枢设置、智能音箱配置、自动化场景搭建。',
    descriptionEn: 'Xiaomi smart device integration, HomeKit hub setup, smart speaker config, automation scenes.',
    details: [
      '米家智能家居设备接入和设置',
      'Apple HomeKit家庭中枢搭建',
      '智能音箱设置（小爱同学/天猫精灵/HomePod）',
      '自动化场景搭建——离家模式/回家模式/起床模式等',
      '智能灯/窗帘/传感器/门锁联动调试',
      '远程故障排查协助',
    ],
    detailsEn: [
      'Xiaomi smart home device integration and setup',
      'Apple HomeKit hub setup',
      'Smart speaker setup (XiaoAi/Tmall Genie/HomePod)',
      'Automation scenes — away mode/welcome mode/morning routine',
      'Smart light/curtain/sensor/lock integration and testing',
      'Remote troubleshooting support',
    ],
  },
  'other-screen': {
    title: '屏幕更换',
    titleEn: 'Screen Replacement',
    icon: '📱',
    description: '各类数码产品屏幕碎裂、漏液、触摸不灵。能修就修，配件难找的提供替代方案建议。',
    descriptionEn: 'Any device cracked screen, leaking, unresponsive. We fix what we can, suggest alternatives for rare parts.',
    details: [
      '各类数码产品屏幕碎裂、漏液维修',
      '触摸不灵、显示异常',
      '电子词典/学习机/GPS导航/翻译笔等',
      '配件好找的直接更换',
      '配件难找的提供替代方案/设备建议',
    ],
    detailsEn: [
      'Any device cracked screen, leaking repair',
      'Touch not working, display issues',
      'E-dictionary/learning pad/GPS navigator/translation pen, etc.',
      'Direct replacement if parts available',
      'Alternative solutions/device suggestions for rare parts',
    ],
  },
  'other-battery': {
    title: '电池更换',
    titleEn: 'Battery Service',
    icon: '🔋',
    description: '各类设备电池不耐用、鼓包、充不进电。能找到配件就换，找不到给建议。',
    descriptionEn: 'Any device battery drain, swelling, no charge. Replace if parts available, advise if not.',
    details: [
      '各类数码产品电池不耐用/鼓包',
      '充不进电、续航大幅下降',
      '配件好找的直接更换',
      '配件难找的提供购买建议或替代方案',
      '含电池鼓包安全检测',
    ],
    detailsEn: [
      'Any device battery drain/swelling',
      'Won\'t charge, significantly reduced battery life',
      'Direct replacement if parts available',
      'Purchase suggestions or alternatives for rare parts',
      'Includes battery swelling safety check',
    ],
  },
  'other-charging-port': {
    title: '充电口维修',
    titleEn: 'Charging Port',
    icon: '🔌',
    description: 'Micro-USB/Type-C/Lightning口松动、不充电。焊接维修更换。',
    descriptionEn: 'Micro-USB/Type-C/Lightning port loose, no charge. Solder repair/replacement.',
    details: [
      'Type-C/Micro-USB/Lightning充电口松动',
      '数据线插不紧、接触不良',
      '充电口不充电、仅特定角度可充',
      '排线焊接维修或尾插小板更换',
      '含焊接后充电测试',
    ],
    detailsEn: [
      'Type-C/Micro-USB/Lightning port loose',
      'Cable loose connection, poor contact',
      'Port not charging, only charges at specific angle',
      'Flex cable soldering repair or charging port board replacement',
      'Charging test after repair',
    ],
  },
  'other-diagnosis': {
    title: '免费检测',
    titleEn: 'Free Diagnosis',
    icon: '🔍',
    description: '任何数码产品问题，拿来免费检测评估，能修再报价。不修不收费。',
    descriptionEn: 'Any device issue, free diagnosis and assessment. Quote before repair. No charge if no repair.',
    details: [
      '任何数码产品——免费检测评估',
      '检测后出具维修方案和报价',
      '客户确认同意后再维修',
      '不修不收费',
      '小问题当场给建议，自己也能处理',
    ],
    detailsEn: [
      'Any device — free diagnosis and assessment',
      'Repair plan and quote after diagnosis',
      'Only proceed after customer approval',
      'No charge if no repair',
      'Minor issues — free advice, you can DIY',
    ],
  },
}

const serviceData = {
  watch: { title: 'Apple Watch', titleEn: 'Apple Watch', gradient: 'from-blue-600 to-blue-500', gradientBg: 'from-blue-600 via-blue-500 to-blue-400', icon: '⌚' },
  'samsung-watch': { title: 'Samsung Galaxy Watch', titleEn: 'Samsung Galaxy Watch', gradient: 'from-gray-600 to-gray-500', gradientBg: 'from-gray-600 via-gray-500 to-gray-400', icon: '⌚' },
  console: { title: '游戏机', titleEn: 'Game Console', gradient: 'from-red-600 to-red-500', gradientBg: 'from-red-600 via-red-500 to-red-400', icon: '🎮' },
  headphone: { title: '耳机', titleEn: 'Earphones', gradient: 'from-green-600 to-green-500', gradientBg: 'from-green-600 via-green-500 to-green-400', icon: '🎧' },
  camera: { title: '相机/无人机', titleEn: 'Camera/Drone', gradient: 'from-purple-600 to-purple-500', gradientBg: 'from-purple-600 via-purple-500 to-purple-400', icon: '📷' },
  mods: { title: '改装配件', titleEn: 'Custom Mods', gradient: 'from-gray-700 to-gray-600', gradientBg: 'from-gray-700 via-gray-600 to-gray-500', icon: '🔧' },
  'smart-home': { title: '智能家居/路由/监控', titleEn: 'Smart Home/Router/Camera', gradient: 'from-amber-600 to-amber-500', gradientBg: 'from-amber-600 via-amber-500 to-yellow-500', icon: '🔌' },
  other: { title: '其他数码产品', titleEn: 'Other Devices', gradient: 'from-gray-600 to-gray-500', gradientBg: 'from-gray-600 via-gray-500 to-gray-400', icon: '❓' },
}

const repairGroups = {
  watch: ['watch-screen', 'watch-battery', 'watch-water-damage', 'watch-sensor'],
  'samsung-watch': ['samsung-watch-screen', 'samsung-watch-battery', 'samsung-watch-strap', 'samsung-watch-motherboard'],
  console: ['console-joystick-drift', 'console-screen', 'console-battery', 'console-cleaning', 'console-mods'],
  headphone: ['headphone-battery', 'headphone-one-side-silent', 'headphone-charging-case', 'headphone-mic'],
  camera: ['camera-lens', 'camera-sensor-cleaning', 'camera-shutter', 'camera-data-recovery', 'camera-drone'],
  mods: ['mods-storage', 'mods-dual-sim', 'mods-shell-swap', 'mods-console'],
  'smart-home': ['smart-home-router', 'smart-home-wifi', 'smart-home-cctv', 'smart-home-setup'],
  other: ['other-screen', 'other-battery', 'other-charging-port', 'other-diagnosis'],
}

export default function OtherRepairItemDetail() {
  const { lang, setShowContact } = useSite();
  const params = useParams()
  const t = (zh, en) => lang === 'zh' ? zh : en

  const serviceId = params?.service || ''
  const itemId = params?.item || ''
  const info = serviceData[serviceId]
  const item = itemDetails[itemId]

  if (!info || !item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">{t('服务未找到', 'Not Found')}</h1>
          <a href="/other-repair" className="text-blue-600 mt-4 inline-block">{t('← 返回其他维修', '← Back to Other Repair')}</a>
        </div>
      </div>
    )
  }

  const otherItems = (repairGroups[serviceId] || []).filter(id => id !== itemId)
  const imageUrl = '/images/services/other-item-' + itemId + '.jpg'

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <Breadcrumb items={[
        { label: '其他数码维修', labelEn: 'Other Device Repair', href: '/other-repair' },
        { label: info.title, labelEn: info.titleEn, href: '/other-repair/' + serviceId },
        { label: item.title, labelEn: item.titleEn },
      ]} />

      <section className={'bg-gradient-to-br ' + info.gradientBg + ' text-white'}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-4xl">{item.icon}</div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold">{lang === 'zh' ? item.title : item.titleEn}</h1>
              <p className="text-sm text-white/80">
                {info.icon} {lang === 'zh' ? info.title : info.titleEn}
              </p>
            </div>
          </div>
          <p className="text-white/90 mt-4 max-w-2xl text-sm leading-relaxed">
            {lang === 'zh' ? item.description : item.descriptionEn}
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <button onClick={() => setShowContact(true)} className="bg-white text-blue-600 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-blue-50 shadow-lg">{t('📱 微信咨询维修', '📱 WeChat for Repair')}</button>
            <a href={'https://wa.me/6596146709?text=' + encodeURIComponent('咨询' + info.title + ' ' + item.title)} target="_blank" className="bg-green-500 text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-green-600 shadow-lg">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
          </div>
        </div>
      </section>

      {/* 配图 */}
      <section className="pt-8 pb-2">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-gray-200 shadow-lg">
            <img
              src={imageUrl}
              alt={lang === 'zh' ? item.title : item.titleEn}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.parentElement.innerHTML = '<div class="flex items-center justify-center h-full text-6xl opacity-30">' + item.icon + '</div>'
              }}
            />
          </div>
        </div>
      </section>

      {/* 服务详情列表 */}
      <section className="py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{t('服务详情', 'Service Details')}</h2>
          <div className="bg-gray-50 rounded-2xl p-5 sm:p-8 border border-gray-100">
            <ul className="space-y-3">
              {(lang === 'zh' ? item.details : item.detailsEn).map((d, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                  <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 其他维修项目 */}
      {otherItems.length > 0 && (
        <section className="py-10 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">{t('其他' + info.title + '服务', 'Other ' + info.titleEn + ' Services')}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {otherItems.map((oid) => {
                const other = itemDetails[oid]
                if (!other) return null
                return (
                  <a key={oid} href={'/other-repair/' + serviceId + '/' + oid} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 block transition-all">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{other.icon}</span>
                      <h3 className="font-semibold text-gray-900 text-sm">{lang === 'zh' ? other.title : other.titleEn}</h3>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-2">{lang === 'zh' ? other.description : other.descriptionEn}</p>
                  </a>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <section className={'py-12 bg-gradient-to-br ' + info.gradientBg + ' text-white text-center'}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-3">{t('需要' + item.title + '？找我', 'Need ' + item.titleEn + '? Contact me')}</h2>
          <p className="text-white/80 text-sm mb-6">{t('免费检测，发照片就能初步判断', 'Free diagnosis — send a photo for a quick check')}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={() => setShowContact(true)} className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 shadow-md">{t('📱 微信咨询', '📱 WeChat')}</button>
            <a href={'https://wa.me/6596146709?text=' + encodeURIComponent('咨询' + info.title + ' ' + item.title)} target="_blank" className="bg-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-600 shadow-md">{t('💬 WhatsApp咨询', '💬 WhatsApp')}</a>
          </div>
        </div>
      </section>

    </div>
  )
}
