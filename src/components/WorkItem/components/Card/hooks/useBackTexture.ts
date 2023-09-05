'use client'

import { useMemo, useRef } from 'react'
import { drawText } from 'canvas-txt'
import isEmpty from 'ramda/src/isEmpty'
import useFontsStatus from '@/hooks/useFontsStatus'
import FONT from '@/styles/fonts'

type TUseBackTextureProps = {
  text: string
  width: number
  height: number
  padding?: number
}

export default function useBackTexture({
  text,
  width,
  height,
  padding = 0,
}: TUseBackTextureProps) {
  if (!text || isEmpty(text)) {
    throw new Error('useBackTexture: `text` is empty')
  }

  const fontsStatus = useFontsStatus()
  const backMapCanvas = useRef<HTMLCanvasElement>()

  // Generate b/w map for back text using canvas
  const backTexture = useMemo(() => {
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

    // @ts-ignore types are confused
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

    return canvas
  }, [text, height, width, padding, fontsStatus])

  return backTexture
}
