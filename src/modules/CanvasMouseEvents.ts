import { canvasContainer, canvasDrawing, IPoint, ratio } from '../canvas'
import { startDrawing, keepDrawing, stopDrawing } from './Tools'

let lastPoint: IPoint | null

canvasContainer.addEventListener('mousedown', e => {
  const point = getPositionInCanvas(e.clientX, e.clientY)

  startDrawing(point)
})

canvasContainer.addEventListener(
  'touchstart',
  e => {
    e.preventDefault()
    e.stopPropagation()

    const point = getPositionInCanvas(
      e.touches[0].clientX,
      e.touches[0].clientY
    )

    startDrawing(point)
  },
  {
    passive: false,
  }
)

canvasContainer.addEventListener('mousemove', e => {
  const point = getPositionInCanvas(e.clientX, e.clientY)

  if (lastPoint && lastPoint.x === point.x && lastPoint.y === point.y) return

  keepDrawing(point)

  lastPoint = point
})

canvasContainer.addEventListener(
  'touchmove',
  e => {
    e.preventDefault()
    e.stopPropagation()

    const point = getPositionInCanvas(
      e.touches[0].clientX,
      e.touches[0].clientY
    )

    if (lastPoint && lastPoint.x === point.x && lastPoint.y === point.y) return

    keepDrawing(point)

    lastPoint = point
  },
  {
    passive: false,
  }
)

canvasContainer.addEventListener('mouseup', e => {
  const point = getPositionInCanvas(e.clientX, e.clientY)

  stopDrawing(point)

  lastPoint = null
})

canvasContainer.addEventListener(
  'touchend',
  e => {
    const point = getPositionInCanvas(
      e.touches[0].clientX,
      e.touches[0].clientY
    )

    stopDrawing(point)

    lastPoint = null
  },
  {
    passive: false,
  }
)

export function getPositionInCanvas(clientX: number, clientY: number): IPoint {
  const rect = canvasDrawing.getBoundingClientRect()

  clientX -= rect.x
  clientY -= rect.y

  const posX = Math.floor(clientX * ratio.width)
  const posY = Math.floor(clientY * ratio.height)

  return {
    x: posX,
    y: posY,
  }
}
