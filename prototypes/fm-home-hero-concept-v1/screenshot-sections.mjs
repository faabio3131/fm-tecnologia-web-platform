import { chromium } from 'playwright'

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
})

const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('http://localhost:5184/', { waitUntil: 'networkidle' })
await page.waitForTimeout(500)

await page.locator('.assistant').screenshot({ path: 'screenshots/core-assistant.png' })
await page.locator('.products').screenshot({ path: 'screenshots/products.png' })

await browser.close()
console.log('done')
