import { useMemo, useRef } from 'react'
import { drawText } from 'canvas-txt'
import { CanvasTexture } from 'three'
import useCssVariable from '@/hooks/useCssVariable'
import FONT from '@/styles/fonts'
import useFontsStatus from '@/hooks/useFontsStatus'

type TUseBackMapProps = {
  text: string
  width: number
  height: number
  padding?: number
}

export default function useBackMap({
  text,
  width,
  height,
  padding = 0,
}: TUseBackMapProps) {
  const col = useCssVariable('--col')
  const fontsStatus = useFontsStatus()
  const backMapCanvas = useRef<HTMLCanvasElement>()

  // Generate texture for back text using canvas
  const backMap = useMemo(() => {
    if (fontsStatus !== 'loaded') {
      return
    }

    const canvas =
      backMapCanvas.current ||
      (document.createElement('canvas') as HTMLCanvasElement)

    backMapCanvas.current = canvas

    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      return
    }

    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#fff'
    const padding = col

    // TODO: fix canvas-txt types
    // @ts-ignore types are wrong
    drawText(ctx, text, {
      x: padding,
      y: padding,
      width: canvas.width - padding * 2,
      height: canvas.height - padding * 2,
      font: FONT.Fasthand,
      fontSize: 38,
      lineHeight: 38 * 1.5,
      vAlign: 'bottom',
      align: 'right',
    })

    return new CanvasTexture(canvas)
  }, [text, col, height, width, fontsStatus])

  return backMap
}
