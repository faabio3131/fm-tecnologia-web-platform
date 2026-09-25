import { chromium } from 'playwright'

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
})
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('http://localhost:5183/', { waitUntil: 'networkidle' })
await page.waitForTimeout(500)

for (let i = 0; i < 5; i++) {
  await page.locator('.hero-visual').screenshot({ path: `screenshots/slide-${i}.png` })
  await page.waitForTimeout(3600)
}

await browser.close()
console.log('done')
