import { chromium } from 'playwright'

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
})
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
// Simula falha ao carregar o vídeo (arquivo corrompido/indisponível/rede lenta demais).
await page.route('**/*.webm', (route) => route.abort())

const errors = []
page.on('pageerror', (e) => errors.push(e.message))
await page.goto('http://localhost:5184/', { waitUntil: 'networkidle' })
await page.waitForTimeout(800)

const mode = await page.locator('.hero-visual').getAttribute('data-mode')
console.log('data-mode with video blocked:', mode)
console.log('page errors:', errors)

await page.locator('.hero-visual').screenshot({ path: 'screenshots/fallback-no-video.png' })

await browser.close()
