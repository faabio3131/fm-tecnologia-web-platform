import { chromium } from 'playwright'

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
})
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('http://localhost:5183/', { waitUntil: 'networkidle' })

// espera passar perto da metade do flip (troca ocorre a cada 3.6s)
await page.waitForTimeout(3600 + 350)
await page.locator('.hero-visual').screenshot({ path: 'screenshots/flip-midtransition.png' })

await page.waitForTimeout(3600)
await page.locator('.hero-visual').screenshot({ path: 'screenshots/flip-slide-3.png' })

await browser.close()
console.log('done')
