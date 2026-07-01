// 维修服务配置 - 每个品牌下的服务项目
// 用于生成动态子页面

const repairServices = {
  'iphone': {
    brand: 'Apple',
    title: 'iPhone 维修',
    gradient: 'from-blue-700 via-blue-600 to-blue-500',
    services: [
      { id: 'screen-replacement', title: '屏幕更换', titleEn: 'Screen Replacement',
        description: 'iPhone 屏幕碎裂、漏液、触摸不灵、显示异常？不管是OLED还是LCD，我们都能换。',
        descriptionEn: 'Cracked iPhone screen? Leaking LCD? Unresponsive touch? We replace OLED & LCD screens for all models.',
        details: '提供原装拆机屏和国产高性价比屏两种选择。换屏前会跟你说清区别，你自己选。所有换屏含专业密封胶，恢复防水性能。换完后当面测试触摸、显示、面容功能。\n\n适用型号：iPhone 16/15/14/13/12/11/X/8/7/6 全系列。\n',
        detailsEn: 'Two options: OEM pulled screen or high-quality domestic screen. I will explain before you choose. All replacements include waterproof sealant to restore water resistance. Full testing after repair.\n\nModels: iPhone 16/15/14/13/12/11/X/8/7/6 series.\nWarranty: 30 days.',
        imageHint: 'screen' },
      { id: 'battery-replacement', title: '电池更换', titleEn: 'Battery Replacement',
        description: 'iPhone 电池不耐用、一天三充、健康度低于80%、突然关机？换电池是最划算的升级。',
        descriptionEn: 'iPhone battery draining fast? Health below 80%? Random shutdowns? Battery swap is the most cost-effective upgrade.',
        details: '原装规格电池，容量不虚标。从iPhone 6到16全系列都有现货。更换后检测健康度100%。告别续航焦虑，手机还会变流畅（降频解除）。\n质保：30天。',
        detailsEn: 'OEM spec batteries with accurate capacity. iPhone 6 through 16 in stock. Health check to 100% after swap. No more battery anxiety + phone feels snappier (throttling removed).',
        imageHint: 'battery' },
      { id: 'water-damage', title: '进水维修', titleEn: 'Water Damage Repair',
        description: 'iPhone掉水里、进洗衣机、淋雨了？第一时间关机送来，不要充电！',
        descriptionEn: 'iPhone dropped in water? In the washing machine? Caught in rain? Power off immediately and bring it in. Do NOT charge!',
        details: '进水维修流程：拆机 → 超声波清洗主板 → 烘干 → 腐蚀修复 → 功能测试。进水越早处理修复率越高。千万不要用吹风机吹或放米缸——这些做法只会让水进得更深。\n\n注意：进水后不要尝试开机或充电，这会导致短路烧主板。直接送过来，我们有丰富的iPhone进水处理经验。',
        detailsEn: 'Water damage process: Disassemble → Ultrasonic clean → Dry → Corrosion repair → Test. Quick action = high recovery rate. No hair dryer, no rice — these push water deeper.\n\nIMPORTANT: Do not try to turn on or charge a wet iPhone. This causes shorts and board damage. Bring it in as-is.',
        imageHint: 'water' },
      { id: 'motherboard-repair', title: '主板维修', titleEn: 'Motherboard Repair',
        description: '不开机、无限重启、无服务、WiFi打不开、面容不可用？可能是主板问题。',
        descriptionEn: 'Wont turn on? Boot loop? No service? WiFi dead? Face ID gone? Could be motherboard related.',
        details: 'iPhone主板芯片级维修：CPU重焊、硬盘扩容、基带修复、充电IC更换、显示IC维修。不需要换整个主板，针对性修坏掉的部分，费用只有换主板的一半甚至更低。\n\n常见故障：进水不开机、刷机报错、无基带/无串号、重启循环、WiFi灰点。\n\nCommon issues: No power after water, update error, no baseband/IMEI, boot loop, WiFi grayed out.\n\n适用型号：iPhone 15/14/13/12/11/X 全系前后摄像头。\n',
        detailsEn: 'iPhone front & rear camera replacement/repair. Blurry = dirty lens or damaged module. Black screen = loose flex or IC fault. Autofocus fail = rear camera issue.\n\nModels: iPhone 15/14/13/12/11/X front & rear.\n\niPhone X及以上面容ID修复，iPhone SE/8及以下指纹修复。\n',
        detailsEn: 'Face ID dot matrix repair, front camera flex replacement. Face ID dying after screen swap is common — usually the dot matrix flex gets damaged during disassembly. Repairable without replacing the whole phone.\n\nFace ID: iPhone X+. Touch ID: iPhone SE/8 and below.\n\n质保：30天。',
        detailsEn: 'MacBook Pro/Air all models screen replacement. Full assembly swap, backlight repair, flex fix. OEM quality, fully tested.',
        imageHint: 'screen' },
      { id: 'battery-replacement', title: '电池更换', titleEn: 'Battery Replacement',
        description: 'MacBook电池鼓包、不耐用、提示"维修"？尽快更换。',
        descriptionEn: 'MacBook battery swelling? Short life? "Service Recommended"? Replace ASAP.',
        details: 'MacBook电池更换。电池鼓包有安全隐患，发现鼓包尽快送修。原装规格电池，更换后恢复续航。\n\n注意：电池鼓包不要自行戳破或尝试拆解，有起火风险。\n',
        detailsEn: 'MacBook battery replacement. Swollen batteries are a fire hazard — replace ASAP. OEM spec, battery life restored.\n\nWARNING: Do not puncture or attempt to remove a swollen battery yourself.\n\n千万不要插电尝试开机！通电进水的主板=短路烧毁=很难修。',
        detailsEn: 'Extensive MacBook water damage experience. Power off immediately. We disassemble, ultrasonic clean, dry, repair corrosion. Early action = high recovery.\n\nNEVER plug in or try to turn on a wet MacBook! Power + water = short circuit = dead board.',
        imageHint: 'water' },
      { id: 'motherboard-repair', title: '主板/逻辑板维修', titleEn: 'Logic Board Repair',
        description: 'MacBook不开机、死机、充电没反应？逻辑板芯片级维修。',
        descriptionEn: 'MacBook no power? Freezes? No charging response? Component-level logic board repair.',
        details: 'MacBook逻辑板芯片级维修：充电IC、显示芯片、CPU供电、硬盘芯片。比换主板便宜得多。\n\n常见故障：不进系统、五国语言、花屏、充不进电、进液腐蚀。\n\nCommon: No boot, kernel panic, distorted display, no charge, liquid corrosion.\n\n\nS系列换屏费用较高但比官方便宜很多。屏幕闪烁/绿线/紫斑等通病也处理。\n',
        detailsEn: 'Samsung S/Z/A/M series screen replacement. AMOLED assembly swap with waterproof sealant.\n\nS series screens are expensive but we are much cheaper than Samsung official. Green/purple line fix available.\n\n\n适用Samsung Galaxy S/Z/A全系。\n', detailsEn: 'Blurry photos, crash, black screen, autofocus fail. Front & rear camera replacement.\n\nSamsung Galaxy S/Z/A series.\n\n\n注意：不要尝试开机或充电，直接送过来。', detailsEn: 'Power off immediately. Bring ASAP for cleaning. We have extensive Huawei water damage experience.\n\nWARNING: Do not turn on or charge. Bring it in immediately.', imageHint: 'water' },
      { id: 'back-glass', title: '后盖/边框', titleEn: 'Back Glass/Frame', description: '华为玻璃后盖碎裂、中框变形。P系列/Mate系列后盖更换。', descriptionEn: 'Huawei glass back broken, frame bent. P/Mate series back glass replacement.', details: '华为玻璃后盖更换。P系列/Mate系列/Nova系列后盖都有。换后打密封胶恢复防水。', imageHint: 'backglass' },
    ]
  },
  'lenovo': {
    brand: 'Lenovo',
    title: 'Lenovo 维修',
    gradient: 'from-blue-700 via-blue-600 to-blue-500',
    services: [
      { id: 'screen-replacement', title: '屏幕更换', titleEn: 'Screen Replacement', description: '联想屏幕碎裂', descriptionEn: 'Lenovo cracked screen', details: '联想全系列屏幕更换。', imageHint: 'screen' },
      { id: 'battery-replacement', title: '电池更换', titleEn: 'Battery Replacement', description: '电池鼓包', descriptionEn: 'Battery swelling', details: '电池更换。', imageHint: 'battery' },
      { id: 'keyboard-repair', title: '键盘维修', titleEn: 'Keyboard Repair', description: '键盘失灵', descriptionEn: 'Keyboard issues', details: '键盘更换或修复。', imageHint: 'keyboard' },
      { id: 'cleaning', title: '清灰换硅脂', titleEn: 'Cleaning & Cooling', description: '清灰换硅脂', descriptionEn: 'Deep clean', details: '风扇狂转发热降频。', imageHint: '' },
      { id: 'os-upgrade', title: '系统重装/升级', titleEn: 'OS/Upgrade', description: '重装系统升级', descriptionEn: 'OS reinstall upgrade', details: '系统重装、加固态。\n\n\n\n\n\n\n\n\n\n碎裂、漏液、花屏、闪烁、触摸不灵、黑屏都能处理。更换后当面测试显示效果。\n\nCracked, leaking, flickering, unresponsive touch, black screen. Tested after repair.', imageHint: 'screen' },
      { id: 'battery-replacement', title: '电池更换', titleEn: 'Battery Replacement', description: '联想笔记本电池鼓包不耐用充不进电。原装规格电池。', descriptionEn: 'Lenovo laptop battery swelling, short life, not charging. OEM spec.', details: '笔记本电池鼓包有安全隐患（可能起火），发现鼓包请尽快送修。电池不耐用、一天充几次、充不进电——换电池是最划算的升级。\n\n联想笔记本全系列电池现货。更换后测试健康度，恢复续航。\n\nSwollen battery = fire hazard, replace ASAP. Short battery life, not charging — battery swap is the most cost-effective upgrade.', imageHint: 'battery' },
      { id: 'keyboard-repair', title: '键盘维修', titleEn: 'Keyboard Repair', description: '联想笔记本按键不灵键盘进水个别键失灵', descriptionEn: 'Lenovo laptop sticky keys, water damage, key failure', details: '联想笔记本键盘更换或修复。\n\n键盘进水后尽快关机送修，不要继续使用。\n\nKeyboard water damage: power off immediately.', imageHint: 'keyboard' },
      { id: 'cleaning', title: '清灰换硅脂', titleEn: 'Cleaning & Cooling', description: '联想笔记本风扇狂转机身发烫性能下降。深度拆机清灰+换导热硅脂。', descriptionEn: 'Lenovo laptop loud fans, overheating, performance drop. Deep clean + thermal paste.', details: '笔记本用久了内部积灰严重，导致散热不良。风扇狂转、机身烫手、CPU降频、玩游戏卡顿。\n\n深度拆机清灰+更换导热硅脂，有效降低温度10-20°C，恢复性能。游戏本尤其需要定期清灰。\n\nDust buildup causes overheating. Loud fans, hot chassis, CPU throttling, gaming lag. Deep clean + thermal paste lowers 10-20°C. Gaming laptops especially need regular cleaning.', imageHint: '' },
      { id: 'os-upgrade', title: '系统重装/升级', titleEn: 'OS/Upgrade', description: '联想笔记本系统卡顿重装Windows加装固态硬盘提速内存升级数据备份。', descriptionEn: 'Lenovo laptop slow, Windows reinstall, SSD/RAM upgrade, data backup.', details: '电脑越来越慢？开机几分钟？打开软件转圈？可能是系统垃圾太多、硬盘太慢、内存不够。\n\n提供：Windows系统重装、换固态硬盘（HDD→SSD提速相当明显）、加装内存、系统优化、数据备份迁移。升级前会告知你所有选择。\n\n\nPC slow, slow boot? Windows reinstall, SSD upgrade (HDD to SSD = big speedup), RAM upgrade, system optimization, data backup.', imageHint: '' },
      { id: 'other-issues', title: '其他故障', titleEn: 'Other Issues', description: '联想笔记本其他问题免费检测先报价后维修加微信咨询。', descriptionEn: 'Lenovo laptop other issues free check, quote first, DM on WeChat.', details: '蓝屏死机、不进系统、WiFi打不开、USB口不认、进液腐蚀、电池不充电……任何联想笔记本问题都可以带来免费检测。\n\n检测后告诉您问题在哪、怎么修、多少钱，修不修您决定。不加钱不强制。', detailsEn: 'Lenovo laptop other issues.\n\nBSOD, crash, no boot, WiFi/USB issues, liquid damage, no charging. Any issue, free check. Diagnosis + quote, you decide. No pressure.', imageHint: '' },
    ]
  },
  'dell': {
    brand: 'Dell',
    title: 'Dell 维修',
    gradient: 'from-blue-600 via-blue-500 to-blue-400',
    services: [
      { id: 'screen-replacement', title: '屏幕更换', titleEn: 'Screen Replacement', description: '戴尔笔记本屏幕碎裂漏液花屏触摸不灵。原装品质屏幕更换。', descriptionEn: 'Dell laptop cracked screen, leaking, flickering, unresponsive touch. OEM quality replacement.', details: '戴尔笔记本全系列屏幕更换维修。\n\n碎裂、漏液、花屏、闪烁、触摸不灵、黑屏都能处理。更换后当面测试显示效果。\n\nCracked, leaking, flickering, unresponsive touch, black screen. Tested after repair.', imageHint: 'screen' },
      { id: 'battery-replacement', title: '电池更换', titleEn: 'Battery Replacement', description: '戴尔笔记本电池鼓包不耐用充不进电。原装规格电池。', descriptionEn: 'Dell laptop battery swelling, short life, not charging. OEM spec.', details: '笔记本电池鼓包有安全隐患（可能起火），发现鼓包请尽快送修。电池不耐用、一天充几次、充不进电——换电池是最划算的升级。\n\n戴尔笔记本全系列电池现货。更换后测试健康度，恢复续航。\n\nSwollen battery = fire hazard, replace ASAP. Short battery life, not charging — battery swap is the most cost-effective upgrade.', imageHint: 'battery' },
      { id: 'keyboard-repair', title: '键盘维修', titleEn: 'Keyboard Repair', description: '戴尔笔记本按键不灵键盘进水个别键失灵', descriptionEn: 'Dell laptop sticky keys, water damage, key failure', details: '戴尔笔记本键盘更换或修复。\n\n键盘进水后尽快关机送修，不要继续使用。\n\nKeyboard water damage: power off immediately.', imageHint: 'keyboard' },
      { id: 'cleaning', title: '清灰换硅脂', titleEn: 'Cleaning & Cooling', description: '戴尔笔记本风扇狂转机身发烫性能下降。深度拆机清灰+换导热硅脂。', descriptionEn: 'Dell laptop loud fans, overheating, performance drop. Deep clean + thermal paste.', details: '笔记本用久了内部积灰严重，导致散热不良。风扇狂转、机身烫手、CPU降频、玩游戏卡顿。\n\n深度拆机清灰+更换导热硅脂，有效降低温度10-20°C，恢复性能。游戏本尤其需要定期清灰。\n\nDust buildup causes overheating. Loud fans, hot chassis, CPU throttling, gaming lag. Deep clean + thermal paste lowers 10-20°C. Gaming laptops especially need regular cleaning.', imageHint: '' },
      { id: 'os-upgrade', title: '系统重装/升级', titleEn: 'OS/Upgrade', description: '戴尔笔记本系统卡顿重装Windows加装固态硬盘提速内存升级数据备份。', descriptionEn: 'Dell laptop slow, Windows reinstall, SSD/RAM upgrade, data backup.', details: '电脑越来越慢？开机几分钟？打开软件转圈？可能是系统垃圾太多、硬盘太慢、内存不够。\n\n提供：Windows系统重装、换固态硬盘（HDD→SSD提速相当明显）、加装内存、系统优化、数据备份迁移。升级前会告知你所有选择。\n\n\nPC slow, slow boot? Windows reinstall, SSD upgrade (HDD to SSD = big speedup), RAM upgrade, system optimization, data backup.', imageHint: '' },
      { id: 'other-issues', title: '其他故障', titleEn: 'Other Issues', description: '戴尔笔记本其他问题免费检测先报价后维修加微信咨询。', descriptionEn: 'Dell laptop other issues free check, quote first, DM on WeChat.', details: '蓝屏死机、不进系统、WiFi打不开、USB口不认、进液腐蚀、电池不充电……任何戴尔笔记本问题都可以带来免费检测。\n\n检测后告诉您问题在哪、怎么修、多少钱，修不修您决定。不加钱不强制。', detailsEn: 'Dell laptop other issues.\n\nBSOD, crash, no boot, WiFi/USB issues, liquid damage, no charging. Any issue, free check. Diagnosis + quote, you decide. No pressure.', imageHint: '' },
    ]
  },
  'hp': {
    brand: 'HP',
    title: 'HP 维修',
    gradient: 'from-teal-700 via-teal-600 to-teal-500',
    services: [
      { id: 'screen-replacement', title: '屏幕更换', titleEn: 'Screen Replacement', description: '惠普笔记本屏幕碎裂漏液花屏触摸不灵。原装品质屏幕更换。', descriptionEn: 'HP laptop cracked screen, leaking, flickering, unresponsive touch. OEM quality replacement.', details: '惠普笔记本全系列屏幕更换维修。\n\n碎裂、漏液、花屏、闪烁、触摸不灵、黑屏都能处理。更换后当面测试显示效果。\n\nCracked, leaking, flickering, unresponsive touch, black screen. Tested after repair.', imageHint: 'screen' },
      { id: 'battery-replacement', title: '电池更换', titleEn: 'Battery Replacement', description: '惠普笔记本电池鼓包不耐用充不进电。原装规格电池。', descriptionEn: 'HP laptop battery swelling, short life, not charging. OEM spec.', details: '笔记本电池鼓包有安全隐患（可能起火），发现鼓包请尽快送修。电池不耐用、一天充几次、充不进电——换电池是最划算的升级。\n\n惠普笔记本全系列电池现货。更换后测试健康度，恢复续航。\n\nSwollen battery = fire hazard, replace ASAP. Short battery life, not charging — battery swap is the most cost-effective upgrade.', imageHint: 'battery' },
      { id: 'keyboard-repair', title: '键盘维修', titleEn: 'Keyboard Repair', description: '惠普笔记本按键不灵键盘进水个别键失灵', descriptionEn: 'HP laptop sticky keys, water damage, key failure', details: '惠普笔记本键盘更换或修复。\n\n键盘进水后尽快关机送修，不要继续使用。\n\nKeyboard water damage: power off immediately.', imageHint: 'keyboard' },
      { id: 'cleaning', title: '清灰换硅脂', titleEn: 'Cleaning & Cooling', description: '惠普笔记本风扇狂转机身发烫性能下降。深度拆机清灰+换导热硅脂。', descriptionEn: 'HP laptop loud fans, overheating, performance drop. Deep clean + thermal paste.', details: '笔记本用久了内部积灰严重，导致散热不良。风扇狂转、机身烫手、CPU降频、玩游戏卡顿。\n\n深度拆机清灰+更换导热硅脂，有效降低温度10-20°C，恢复性能。游戏本尤其需要定期清灰。\n\nDust buildup causes overheating. Loud fans, hot chassis, CPU throttling, gaming lag. Deep clean + thermal paste lowers 10-20°C. Gaming laptops especially need regular cleaning.', imageHint: '' },
      { id: 'os-upgrade', title: '系统重装/升级', titleEn: 'OS/Upgrade', description: '惠普笔记本系统卡顿重装Windows加装固态硬盘提速内存升级数据备份。', descriptionEn: 'HP laptop slow, Windows reinstall, SSD/RAM upgrade, data backup.', details: '电脑越来越慢？开机几分钟？打开软件转圈？可能是系统垃圾太多、硬盘太慢、内存不够。\n\n提供：Windows系统重装、换固态硬盘（HDD→SSD提速相当明显）、加装内存、系统优化、数据备份迁移。升级前会告知你所有选择。\n\n\nPC slow, slow boot? Windows reinstall, SSD upgrade (HDD to SSD = big speedup), RAM upgrade, system optimization, data backup.', imageHint: '' },
      { id: 'other-issues', title: '其他故障', titleEn: 'Other Issues', description: '惠普笔记本其他问题免费检测先报价后维修加微信咨询。', descriptionEn: 'HP laptop other issues free check, quote first, DM on WeChat.', details: '蓝屏死机、不进系统、WiFi打不开、USB口不认、进液腐蚀、电池不充电……任何惠普笔记本问题都可以带来免费检测。\n\n检测后告诉您问题在哪、怎么修、多少钱，修不修您决定。不加钱不强制。', detailsEn: 'HP laptop other issues.\n\nBSOD, crash, no boot, WiFi/USB issues, liquid damage, no charging. Any issue, free check. Diagnosis + quote, you decide. No pressure.', imageHint: '' },
    ]
  },
  'asus': {
    brand: 'ASUS',
    title: 'ASUS 维修',
    gradient: 'from-cyan-700 via-cyan-600 to-cyan-500',
    services: [
      { id: 'screen-replacement', title: '屏幕更换', titleEn: 'Screen Replacement', description: '华硕笔记本屏幕碎裂漏液花屏触摸不灵。原装品质屏幕更换。', descriptionEn: 'ASUS laptop cracked screen, leaking, flickering, unresponsive touch. OEM quality replacement.', details: '华硕笔记本全系列屏幕更换维修。\n\n碎裂、漏液、花屏、闪烁、触摸不灵、黑屏都能处理。更换后当面测试显示效果。\n\nCracked, leaking, flickering, unresponsive touch, black screen. Tested after repair.', imageHint: 'screen' },
      { id: 'battery-replacement', title: '电池更换', titleEn: 'Battery Replacement', description: '华硕笔记本电池鼓包不耐用充不进电。原装规格电池。', descriptionEn: 'ASUS laptop battery swelling, short life, not charging. OEM spec.', details: '笔记本电池鼓包有安全隐患（可能起火），发现鼓包请尽快送修。电池不耐用、一天充几次、充不进电——换电池是最划算的升级。\n\n华硕笔记本全系列电池现货。更换后测试健康度，恢复续航。\n\nSwollen battery = fire hazard, replace ASAP. Short battery life, not charging — battery swap is the most cost-effective upgrade.', imageHint: 'battery' },
      { id: 'keyboard-repair', title: '键盘维修', titleEn: 'Keyboard Repair', description: '华硕笔记本按键不灵键盘进水个别键失灵', descriptionEn: 'ASUS laptop sticky keys, water damage, key failure', details: '华硕笔记本键盘更换或修复。\n\n键盘进水后尽快关机送修，不要继续使用。\n\nKeyboard water damage: power off immediately.', imageHint: 'keyboard' },
      { id: 'cleaning', title: '清灰换硅脂', titleEn: 'Cleaning & Cooling', description: '华硕笔记本风扇狂转机身发烫性能下降。深度拆机清灰+换导热硅脂。', descriptionEn: 'ASUS laptop loud fans, overheating, performance drop. Deep clean + thermal paste.', details: '笔记本用久了内部积灰严重，导致散热不良。风扇狂转、机身烫手、CPU降频、玩游戏卡顿。\n\n深度拆机清灰+更换导热硅脂，有效降低温度10-20°C，恢复性能。游戏本尤其需要定期清灰。\n\nDust buildup causes overheating. Loud fans, hot chassis, CPU throttling, gaming lag. Deep clean + thermal paste lowers 10-20°C. Gaming laptops especially need regular cleaning.', imageHint: '' },
      { id: 'os-upgrade', title: '系统重装/升级', titleEn: 'OS/Upgrade', description: '华硕笔记本系统卡顿重装Windows加装固态硬盘提速内存升级数据备份。', descriptionEn: 'ASUS laptop slow, Windows reinstall, SSD/RAM upgrade, data backup.', details: '电脑越来越慢？开机几分钟？打开软件转圈？可能是系统垃圾太多、硬盘太慢、内存不够。\n\n提供：Windows系统重装、换固态硬盘（HDD→SSD提速相当明显）、加装内存、系统优化、数据备份迁移。升级前会告知你所有选择。\n\n\nPC slow, slow boot? Windows reinstall, SSD upgrade (HDD to SSD = big speedup), RAM upgrade, system optimization, data backup.', imageHint: '' },
      { id: 'other-issues', title: '其他故障', titleEn: 'Other Issues', description: '华硕笔记本其他问题免费检测先报价后维修加微信咨询。', descriptionEn: 'ASUS laptop other issues free check, quote first, DM on WeChat.', details: '蓝屏死机、不进系统、WiFi打不开、USB口不认、进液腐蚀、电池不充电……任何华硕笔记本问题都可以带来免费检测。\n\n检测后告诉您问题在哪、怎么修、多少钱，修不修您决定。不加钱不强制。', detailsEn: 'ASUS laptop other issues.\n\nBSOD, crash, no boot, WiFi/USB issues, liquid damage, no charging. Any issue, free check. Diagnosis + quote, you decide. No pressure.', imageHint: '' },
    ]
  },
  'acer': {
    brand: 'Acer',
    title: 'Acer 维修',
    gradient: 'from-green-700 via-green-600 to-green-500',
    services: [
      { id: 'screen-replacement', title: '屏幕更换', titleEn: 'Screen Replacement', description: '宏基笔记本屏幕碎裂漏液花屏触摸不灵。原装品质屏幕更换。', descriptionEn: 'Acer laptop cracked screen, leaking, flickering, unresponsive touch. OEM quality replacement.', details: '宏基笔记本全系列屏幕更换维修。\n\n碎裂、漏液、花屏、闪烁、触摸不灵、黑屏都能处理。更换后当面测试显示效果。\n\nCracked, leaking, flickering, unresponsive touch, black screen. Tested after repair.', imageHint: 'screen' },
      { id: 'battery-replacement', title: '电池更换', titleEn: 'Battery Replacement', description: '宏基笔记本电池鼓包不耐用充不进电。原装规格电池。', descriptionEn: 'Acer laptop battery swelling, short life, not charging. OEM spec.', details: '笔记本电池鼓包有安全隐患（可能起火），发现鼓包请尽快送修。电池不耐用、一天充几次、充不进电——换电池是最划算的升级。\n\n宏基笔记本全系列电池现货。更换后测试健康度，恢复续航。\n\nSwollen battery = fire hazard, replace ASAP. Short battery life, not charging — battery swap is the most cost-effective upgrade.', imageHint: 'battery' },
      { id: 'keyboard-repair', title: '键盘维修', titleEn: 'Keyboard Repair', description: '宏基笔记本按键不灵键盘进水个别键失灵', descriptionEn: 'Acer laptop sticky keys, water damage, key failure', details: '宏基笔记本键盘更换或修复。\n\n键盘进水后尽快关机送修，不要继续使用。\n\nKeyboard water damage: power off immediately.', imageHint: 'keyboard' },
      { id: 'cleaning', title: '清灰换硅脂', titleEn: 'Cleaning & Cooling', description: '宏基笔记本风扇狂转机身发烫性能下降。深度拆机清灰+换导热硅脂。', descriptionEn: 'Acer laptop loud fans, overheating, performance drop. Deep clean + thermal paste.', details: '笔记本用久了内部积灰严重，导致散热不良。风扇狂转、机身烫手、CPU降频、玩游戏卡顿。\n\n深度拆机清灰+更换导热硅脂，有效降低温度10-20°C，恢复性能。游戏本尤其需要定期清灰。\n\nDust buildup causes overheating. Loud fans, hot chassis, CPU throttling, gaming lag. Deep clean + thermal paste lowers 10-20°C. Gaming laptops especially need regular cleaning.', imageHint: '' },
      { id: 'os-upgrade', title: '系统重装/升级', titleEn: 'OS/Upgrade', description: '宏基笔记本系统卡顿重装Windows加装固态硬盘提速内存升级数据备份。', descriptionEn: 'Acer laptop slow, Windows reinstall, SSD/RAM upgrade, data backup.', details: '电脑越来越慢？开机几分钟？打开软件转圈？可能是系统垃圾太多、硬盘太慢、内存不够。\n\n提供：Windows系统重装、换固态硬盘（HDD→SSD提速相当明显）、加装内存、系统优化、数据备份迁移。升级前会告知你所有选择。\n\n\nPC slow, slow boot? Windows reinstall, SSD upgrade (HDD to SSD = big speedup), RAM upgrade, system optimization, data backup.', imageHint: '' },
      { id: 'other-issues', title: '其他故障', titleEn: 'Other Issues', description: '宏基笔记本其他问题免费检测先报价后维修加微信咨询。', descriptionEn: 'Acer laptop other issues free check, quote first, DM on WeChat.', details: '蓝屏死机、不进系统、WiFi打不开、USB口不认、进液腐蚀、电池不充电……任何宏基笔记本问题都可以带来免费检测。\n\n检测后告诉您问题在哪、怎么修、多少钱，修不修您决定。不加钱不强制。', detailsEn: 'Acer laptop other issues.\n\nBSOD, crash, no boot, WiFi/USB issues, liquid damage, no charging. Any issue, free check. Diagnosis + quote, you decide. No pressure.', imageHint: '' },
    ]
  },
  'msi': {
    brand: 'MSI',
    title: 'MSI 维修',
    gradient: 'from-red-700 via-red-600 to-red-500',
    services: [
      { id: 'screen-replacement', title: '屏幕更换', titleEn: 'Screen Replacement', description: '微星笔记本屏幕碎裂漏液花屏触摸不灵。原装品质屏幕更换。', descriptionEn: 'MSI laptop cracked screen, leaking, flickering, unresponsive touch. OEM quality replacement.', details: '微星笔记本全系列屏幕更换维修。\n\n碎裂、漏液、花屏、闪烁、触摸不灵、黑屏都能处理。更换后当面测试显示效果。\n\nCracked, leaking, flickering, unresponsive touch, black screen. Tested after repair.', imageHint: 'screen' },
      { id: 'battery-replacement', title: '电池更换', titleEn: 'Battery Replacement', description: '微星笔记本电池鼓包不耐用充不进电。原装规格电池。', descriptionEn: 'MSI laptop battery swelling, short life, not charging. OEM spec.', details: '笔记本电池鼓包有安全隐患（可能起火），发现鼓包请尽快送修。电池不耐用、一天充几次、充不进电——换电池是最划算的升级。\n\n微星笔记本全系列电池现货。更换后测试健康度，恢复续航。\n\nSwollen battery = fire hazard, replace ASAP. Short battery life, not charging — battery swap is the most cost-effective upgrade.', imageHint: 'battery' },
      { id: 'keyboard-repair', title: '键盘维修', titleEn: 'Keyboard Repair', description: '微星笔记本按键不灵键盘进水个别键失灵', descriptionEn: 'MSI laptop sticky keys, water damage, key failure', details: '微星笔记本键盘更换或修复。\n\n键盘进水后尽快关机送修，不要继续使用。\n\nKeyboard water damage: power off immediately.', imageHint: 'keyboard' },
      { id: 'cleaning', title: '清灰换硅脂', titleEn: 'Cleaning & Cooling', description: '微星笔记本风扇狂转机身发烫性能下降。深度拆机清灰+换导热硅脂。', descriptionEn: 'MSI laptop loud fans, overheating, performance drop. Deep clean + thermal paste.', details: '笔记本用久了内部积灰严重，导致散热不良。风扇狂转、机身烫手、CPU降频、玩游戏卡顿。\n\n深度拆机清灰+更换导热硅脂，有效降低温度10-20°C，恢复性能。游戏本尤其需要定期清灰。\n\nDust buildup causes overheating. Loud fans, hot chassis, CPU throttling, gaming lag. Deep clean + thermal paste lowers 10-20°C. Gaming laptops especially need regular cleaning.', imageHint: '' },
      { id: 'os-upgrade', title: '系统重装/升级', titleEn: 'OS/Upgrade', description: '微星笔记本系统卡顿重装Windows加装固态硬盘提速内存升级数据备份。', descriptionEn: 'MSI laptop slow, Windows reinstall, SSD/RAM upgrade, data backup.', details: '电脑越来越慢？开机几分钟？打开软件转圈？可能是系统垃圾太多、硬盘太慢、内存不够。\n\n提供：Windows系统重装、换固态硬盘（HDD→SSD提速相当明显）、加装内存、系统优化、数据备份迁移。升级前会告知你所有选择。\n\n\nPC slow, slow boot? Windows reinstall, SSD upgrade (HDD to SSD = big speedup), RAM upgrade, system optimization, data backup.', imageHint: '' },
      { id: 'other-issues', title: '其他故障', titleEn: 'Other Issues', description: '微星笔记本其他问题免费检测先报价后维修加微信咨询。', descriptionEn: 'MSI laptop other issues free check, quote first, DM on WeChat.', details: '蓝屏死机、不进系统、WiFi打不开、USB口不认、进液腐蚀、电池不充电……任何微星笔记本问题都可以带来免费检测。\n\n检测后告诉您问题在哪、怎么修、多少钱，修不修您决定。不加钱不强制。', detailsEn: 'MSI laptop other issues.\n\nBSOD, crash, no boot, WiFi/USB issues, liquid damage, no charging. Any issue, free check. Diagnosis + quote, you decide. No pressure.', imageHint: '' },
    ]
  },
  'surface': {
    brand: 'Surface',
    title: 'Surface 维修',
    gradient: 'from-gray-700 via-gray-600 to-gray-500',
    services: [
      { id: 'screen-replacement', title: '屏幕更换', titleEn: 'Screen Replacement', description: '微软Surface笔记本屏幕碎裂漏液花屏触摸不灵。原装品质屏幕更换。', descriptionEn: 'Surface laptop cracked screen, leaking, flickering, unresponsive touch. OEM quality replacement.', details: '微软Surface笔记本全系列屏幕更换维修。\n\n碎裂、漏液、花屏、闪烁、触摸不灵、黑屏都能处理。更换后当面测试显示效果。\n\nCracked, leaking, flickering, unresponsive touch, black screen. Tested after repair.', imageHint: 'screen' },
      { id: 'battery-replacement', title: '电池更换', titleEn: 'Battery Replacement', description: '微软Surface笔记本电池鼓包不耐用充不进电。原装规格电池。', descriptionEn: 'Surface laptop battery swelling, short life, not charging. OEM spec.', details: '笔记本电池鼓包有安全隐患（可能起火），发现鼓包请尽快送修。电池不耐用、一天充几次、充不进电——换电池是最划算的升级。\n\n微软Surface笔记本全系列电池现货。更换后测试健康度，恢复续航。\n\nSwollen battery = fire hazard, replace ASAP. Short battery life, not charging — battery swap is the most cost-effective upgrade.', imageHint: 'battery' },
      { id: 'keyboard-repair', title: '键盘盖维修', titleEn: 'Type Cover Repair', description: 'Surface键盘盖不灵触摸板失灵', descriptionEn: 'Surface keyboard cover not working, trackpad issues', details: 'Surface键盘盖/触摸板更换或修复。键盘盖不灵、触摸板没反应、按键脱落。', imageHint: 'keyboard' },
      { id: 'cleaning', title: '清灰换硅脂', titleEn: 'Cleaning & Cooling', description: '微软Surface笔记本风扇狂转机身发烫性能下降。深度拆机清灰+换导热硅脂。', descriptionEn: 'Surface laptop loud fans, overheating, performance drop. Deep clean + thermal paste.', details: '笔记本用久了内部积灰严重，导致散热不良。风扇狂转、机身烫手、CPU降频、玩游戏卡顿。\n\n深度拆机清灰+更换导热硅脂，有效降低温度10-20°C，恢复性能。游戏本尤其需要定期清灰。\n\nDust buildup causes overheating. Loud fans, hot chassis, CPU throttling, gaming lag. Deep clean + thermal paste lowers 10-20°C. Gaming laptops especially need regular cleaning.', imageHint: '' },
      { id: 'os-upgrade', title: '系统重装/升级', titleEn: 'OS/Upgrade', description: '微软Surface笔记本系统卡顿重装Windows加装固态硬盘提速内存升级数据备份。', descriptionEn: 'Surface laptop slow, Windows reinstall, SSD/RAM upgrade, data backup.', details: '电脑越来越慢？开机几分钟？打开软件转圈？可能是系统垃圾太多、硬盘太慢、内存不够。\n\n提供：Windows系统重装、换固态硬盘（HDD→SSD提速相当明显）、加装内存、系统优化、数据备份迁移。升级前会告知你所有选择。\n\n\nPC slow, slow boot? Windows reinstall, SSD upgrade (HDD to SSD = big speedup), RAM upgrade, system optimization, data backup.', imageHint: '' },
      { id: 'other-issues', title: '其他故障', titleEn: 'Other Issues', description: '微软Surface笔记本其他问题免费检测先报价后维修加微信咨询。', descriptionEn: 'Surface laptop other issues free check, quote first, DM on WeChat.', details: '蓝屏死机、不进系统、WiFi打不开、USB口不认、进液腐蚀、电池不充电……任何微软Surface笔记本问题都可以带来免费检测。\n\n检测后告诉您问题在哪、怎么修、多少钱，修不修您决定。不加钱不强制。', detailsEn: 'Surface laptop other issues.\n\nBSOD, crash, no boot, WiFi/USB issues, liquid damage, no charging. Any issue, free check. Diagnosis + quote, you decide. No pressure.', imageHint: '' },
    ]
  },
  'hasee': {
    brand: 'Hasee',
    title: 'Hasee 维修',
    gradient: 'from-indigo-700 via-indigo-600 to-indigo-500',
    services: [
      { id: 'screen-replacement', title: '屏幕更换', titleEn: 'Screen Replacement', description: '神舟笔记本屏幕碎裂漏液花屏触摸不灵。原装品质屏幕更换。', descriptionEn: 'Hasee laptop cracked screen, leaking, flickering, unresponsive touch. OEM quality replacement.', details: '神舟笔记本全系列屏幕更换维修。\n\n碎裂、漏液、花屏、闪烁、触摸不灵、黑屏都能处理。更换后当面测试显示效果。\n\nCracked, leaking, flickering, unresponsive touch, black screen. Tested after repair.', imageHint: 'screen' },
      { id: 'battery-replacement', title: '电池更换', titleEn: 'Battery Replacement', description: '神舟笔记本电池鼓包不耐用充不进电。原装规格电池。', descriptionEn: 'Hasee laptop battery swelling, short life, not charging. OEM spec.', details: '笔记本电池鼓包有安全隐患（可能起火），发现鼓包请尽快送修。电池不耐用、一天充几次、充不进电——换电池是最划算的升级。\n\n神舟笔记本全系列电池现货。更换后测试健康度，恢复续航。\n\nSwollen battery = fire hazard, replace ASAP. Short battery life, not charging — battery swap is the most cost-effective upgrade.', imageHint: 'battery' },
      { id: 'keyboard-repair', title: '键盘维修', titleEn: 'Keyboard Repair', description: '神舟笔记本按键不灵键盘进水个别键失灵', descriptionEn: 'Hasee laptop sticky keys, water damage, key failure', details: '神舟笔记本键盘更换或修复。\n\n键盘进水后尽快关机送修，不要继续使用。\n\nKeyboard water damage: power off immediately.', imageHint: 'keyboard' },
      { id: 'cleaning', title: '清灰换硅脂', titleEn: 'Cleaning & Cooling', description: '神舟笔记本风扇狂转机身发烫性能下降。深度拆机清灰+换导热硅脂。', descriptionEn: 'Hasee laptop loud fans, overheating, performance drop. Deep clean + thermal paste.', details: '笔记本用久了内部积灰严重，导致散热不良。风扇狂转、机身烫手、CPU降频、玩游戏卡顿。\n\n深度拆机清灰+更换导热硅脂，有效降低温度10-20°C，恢复性能。游戏本尤其需要定期清灰。\n\nDust buildup causes overheating. Loud fans, hot chassis, CPU throttling, gaming lag. Deep clean + thermal paste lowers 10-20°C. Gaming laptops especially need regular cleaning.', imageHint: '' },
      { id: 'os-upgrade', title: '系统重装/升级', titleEn: 'OS/Upgrade', description: '神舟笔记本系统卡顿重装Windows加装固态硬盘提速内存升级数据备份。', descriptionEn: 'Hasee laptop slow, Windows reinstall, SSD/RAM upgrade, data backup.', details: '电脑越来越慢？开机几分钟？打开软件转圈？可能是系统垃圾太多、硬盘太慢、内存不够。\n\n提供：Windows系统重装、换固态硬盘（HDD→SSD提速相当明显）、加装内存、系统优化、数据备份迁移。升级前会告知你所有选择。\n\n\nPC slow, slow boot? Windows reinstall, SSD upgrade (HDD to SSD = big speedup), RAM upgrade, system optimization, data backup.', imageHint: '' },
      { id: 'other-issues', title: '其他故障', titleEn: 'Other Issues', description: '神舟笔记本其他问题免费检测先报价后维修加微信咨询。', descriptionEn: 'Hasee laptop other issues free check, quote first, DM on WeChat.', details: '蓝屏死机、不进系统、WiFi打不开、USB口不认、进液腐蚀、电池不充电……任何神舟笔记本问题都可以带来免费检测。\n\n检测后告诉您问题在哪、怎么修、多少钱，修不修您决定。不加钱不强制。', detailsEn: 'Hasee laptop other issues.\n\nBSOD, crash, no boot, WiFi/USB issues, liquid damage, no charging. Any issue, free check. Diagnosis + quote, you decide. No pressure.', imageHint: '' },
    ]
  },

}

export { repairServices }