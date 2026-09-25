import { CanvasTexture, SRGBColorSpace } from 'three'

/**
 * Desenha o emblema "FM" em um canvas 2D e devolve como textura.
 * Evita depender de fontes/CDN externos (troika/Text do drei) para um
 * protótipo isolado e confiável offline.
 */
export function createFmLabelTexture(): CanvasTexture {
  const size = 512
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!

  ctx.clearRect(0, 0, size, size)

  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  ctx.shadowColor = 'rgba(143, 211, 255, 0.9)'
  ctx.shadowBlur = 26
  ctx.fillStyle = '#eaf6ff'
  ctx.font = '700 168px "Space Grotesk", "Segoe UI", sans-serif'
  ctx.fillText('FM', size / 2, size / 2 - 36)

  ctx.shadowBlur = 10
  ctx.fillStyle = 'rgba(195, 224, 250, 0.92)'
  ctx.font = '500 34px "Inter", "Segoe UI", sans-serif'
  ctx.fillText('FM TECNOLOGIA', size / 2, size / 2 + 78)

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  texture.needsUpdate = true
  return texture
}
