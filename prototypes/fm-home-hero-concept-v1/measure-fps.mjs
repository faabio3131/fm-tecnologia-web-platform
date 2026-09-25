import { chromium } from 'playwright'

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
})
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('http://localhost:5183/', { waitUntil: 'networkidle' })
await page.waitForTimeout(1500) // deixa a cena estabilizar (lazy chunk + primeiro frame)

const fps = await page.evaluate(() => {
  return new Promise((resolve) => {
    let frames = 0
    const start = performance.now()
    function tick() {
      frames++
      const elapsed = performance.now() - start
      if (elapsed < 3000) {
        requestAnimationFrame(tick)
      } else {
        resolve(Math.round((frames / elapsed) * 1000))
      }
    }
    requestAnimationFrame(tick)
  })
})

console.log(`FPS aproximado (3s, viewport 1440x900, headless chromium/software rendering): ${fps}`)

await browser.close()
