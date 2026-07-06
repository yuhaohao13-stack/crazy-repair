import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.resolve(__dirname, '..', 'public', 'images', 'services')

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

const categories = [
  { id: 'other-repair-watch', seed: 180 },
  { id: 'other-repair-samsung-watch', seed: 275 },
  { id: 'other-repair-console', seed: 96 },
  { id: 'other-repair-headphone', seed: 440 },
  { id: 'other-repair-camera', seed: 152 },
  { id: 'other-repair-mods', seed: 312 },
  { id: 'other-repair-smart-home', seed: 508 },
  { id: 'other-repair-other', seed: 674 },
]

const items = [
  { id: 'other-item-watch-screen', seed: 291 },
  { id: 'other-item-watch-battery', seed: 365 },
  { id: 'other-item-watch-water-damage', seed: 521 },
  { id: 'other-item-watch-sensor', seed: 777 },
  { id: 'other-item-samsung-watch-screen', seed: 401 },
  { id: 'other-item-samsung-watch-battery', seed: 320 },
  { id: 'other-item-samsung-watch-strap', seed: 198 },
  { id: 'other-item-samsung-watch-motherboard', seed: 455 },
  { id: 'other-item-console-joystick-drift', seed: 88 },
  { id: 'other-item-console-screen', seed: 234 },
  { id: 'other-item-console-battery', seed: 567 },
  { id: 'other-item-console-cleaning', seed: 143 },
  { id: 'other-item-console-mods', seed: 689 },
  { id: 'other-item-headphone-battery', seed: 329 },
  { id: 'other-item-headphone-one-side-silent', seed: 762 },
  { id: 'other-item-headphone-charging-case', seed: 410 },
  { id: 'other-item-headphone-mic', seed: 213 },
  { id: 'other-item-camera-lens', seed: 580 },
  { id: 'other-item-camera-sensor-cleaning', seed: 146 },
  { id: 'other-item-camera-shutter', seed: 723 },
  { id: 'other-item-camera-data-recovery', seed: 394 },
  { id: 'other-item-camera-drone', seed: 665 },
  { id: 'other-item-mods-storage', seed: 102 },
  { id: 'other-item-mods-dual-sim', seed: 488 },
  { id: 'other-item-mods-shell-swap', seed: 355 },
  { id: 'other-item-mods-console', seed: 799 },
  { id: 'other-item-smart-home-router', seed: 211 },
  { id: 'other-item-smart-home-wifi', seed: 630 },
  { id: 'other-item-smart-home-cctv', seed: 450 },
  { id: 'other-item-smart-home-setup', seed: 540 },
  { id: 'other-item-other-screen', seed: 777 },
  { id: 'other-item-other-battery', seed: 333 },
  { id: 'other-item-other-charging-port', seed: 888 },
  { id: 'other-item-other-diagnosis', seed: 999 },
]

const all = [...categories, ...items]

async function download(url, dest) {
  const resp = await fetch(url)
  if (!resp.ok && resp.status !== 302) throw new Error(`HTTP ${resp.status}`)
  const buf = Buffer.from(await resp.arrayBuffer())
  fs.writeFileSync(dest, buf)
}

async function main() {
  let ok = 0, fail = 0
  for (const item of all) {
    const dest = path.join(outDir, item.id + '.jpg')
    if (fs.existsSync(dest)) {
      console.log(`  ⏭️  ${item.id}.jpg (已存在)`)
      ok++
      continue
    }
    try {
      await download(`https://picsum.photos/seed/${item.seed}/800/600`, dest)
      console.log(`  ✅ ${item.id}.jpg`)
      ok++
    } catch (e) {
      console.log(`  ❌ ${item.id}.jpg — ${e.message}`)
      fail++
    }
    await new Promise(r => setTimeout(r, 500))
  }
  console.log(`\n✅ 完成：${ok} 成功, ${fail} 失败`)
}

main()
