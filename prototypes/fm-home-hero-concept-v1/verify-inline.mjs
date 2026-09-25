import { chromium } from 'playwright'

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
})
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const errors = []
page.on('pageerror', (e) => errors.push(e.message))
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()) })
await page.goto('http://localhost:5184/', { waitUntil: 'networkidle' })
await page.waitForTimeout(1000)
const mode = await page.locator('.hero-visual').getAttribute('data-mode')
console.log('mode:', mode)
console.log('errors:', errors.filter((e) => !e.includes('fonts.googleapis')))
await page.screenshot({ path: 'screenshots/verify-inline.png', clip: { x: 780, y: 150, width: 560, height: 560 } })
await browser.close()
