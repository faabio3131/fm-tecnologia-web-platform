import { chromium } from 'playwright'

const viewports = {
  desktop: { width: 1440, height: 900 },
  tablet: { width: 1024, height: 900 },
  mobile: { width: 390, height: 844 },
}

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
})

const errors = []

for (const [name, viewport] of Object.entries(viewports)) {
  const page = await browser.newPage({ viewport })
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`[${name}] ${msg.text()}`)
  })
  page.on('pageerror', (err) => errors.push(`[${name}] pageerror: ${err.message}`))

  await page.goto('http://localhost:5183/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  await page.screenshot({ path: `screenshots/hero-${name}.png`, fullPage: false })
  await page.screenshot({ path: `screenshots/full-${name}.png`, fullPage: true })
  await page.close()
}

await browser.close()

if (errors.length) {
  console.log('CONSOLE/PAGE ERRORS:')
  console.log(errors.join('\n'))
} else {
  console.log('No console or page errors detected.')
}
