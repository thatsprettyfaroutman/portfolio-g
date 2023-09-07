'use client'

import { DependencyList, useMemo, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { drawText } from 'canvas-txt'
import isEmpty from 'ramda/src/isEmpty'
import { CanvasTexture } from 'three'
import FONT from '@/styles/fonts'

type TUseBackTextureProps = {
  text?: string
  width: number
  height: number
  padding?: number
}

export default function useBackMap(
  { text, width, height, padding: paddingProp = 0 }: TUseBackTextureProps,
  deps: DependencyList = []
) {
  const { viewport } = useThree()
  const backMapCanvas = useRef<HTMLCanvasElement>()

  // Generate b/w map for back text using canvas
  const backMap = useMemo(() => {
    if (!text || isEmpty(text)) {
      return
    }

    const canvas =
      backMapCanvas.current ||
      (document.createElement('canvas') as HTMLCanvasElement)

    backMapCanvas.current = canvas

    const padding = paddingProp * viewport.dpr
    const fontSize = width / 10
    canvas.width = width * viewport.dpr
    canvas.height = height * viewport.dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      return
    }

    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#fff'

    // @ts-ignore types are old
    drawText(ctx, text, {
      x: padding,
      y: padding,
      width: canvas.width - padding * 2,
      height: canvas.height - padding * 2,
      font: FONT.Fasthand,
      fontSize: fontSize,
      lineHeight: fontSize * 1.5,
      vAlign: 'bottom',
      align: 'right',
    })

    return new CanvasTexture(canvas)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, paddingProp, viewport.dpr, width, height, ...deps])

  return backMap
}
