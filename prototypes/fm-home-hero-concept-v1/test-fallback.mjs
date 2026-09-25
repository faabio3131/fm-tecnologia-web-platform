import { chromium } from 'playwright'

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--disable-webgl', '--disable-webgl2', '--disable-3d-apis'],
})
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const errors = []
page.on('pageerror', (e) => errors.push(e.message))
await page.goto('http://localhost:5184/', { waitUntil: 'networkidle' })
await page.waitForTimeout(500)

const mode = await page.locator('.hero-visual').getAttribute('data-mode')
console.log('data-mode with WebGL disabled:', mode)
console.log('page errors:', errors)

await page.locator('.hero-visual').screenshot({ path: 'screenshots/fallback-no-webgl.png' })

await browser.close()
