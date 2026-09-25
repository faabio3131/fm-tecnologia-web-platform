import { chromium } from 'playwright'

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
})
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('http://localhost:5183/', { waitUntil: 'networkidle' })
await page.waitForTimeout(800)

const visual = page.locator('.hero-visual')
for (let i = 0; i < 4; i++) {
  await visual.screenshot({ path: `screenshots/motion-frame-${i}.png` })
  await page.waitForTimeout(1200)
}

await browser.close()
console.log('done')
