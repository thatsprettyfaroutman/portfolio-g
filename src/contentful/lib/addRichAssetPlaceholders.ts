import { createCanvas, loadImage } from 'canvas'
import fromPairs from 'ramda/src/fromPairs'
import toPairs from 'ramda/src/toPairs'
import { TRichAsset } from '../types'

const PLACEHOLDER_WIDTH = 40
const COLOR_ONLY = true

const isRichAssetPlaceholderable = (data: unknown): data is TRichAsset => {
  // @ts-ignore
  return !!(data?.url && data?.width && data?.height)
}

const getWidthUrl = (url: string) => {
  const q = url.includes('?') ? '&' : '?'
  return `${url}${q}w=${PLACEHOLDER_WIDTH}`
}

// Populate TRichAsset with `placeholder` images
export default async function addRichAssetPlaceholders<T>(
  data: Array<TRichAsset> | Record<string, TRichAsset> | TRichAsset
): Promise<T> {
  if (isRichAssetPlaceholderable(data)) {
    const image = await loadImage(getWidthUrl(data.url))
    const canvas = createCanvas(image.width, image.height)
    const context = canvas.getContext('2d')
    context.drawImage(image, 0, 0)

    if (COLOR_ONLY) {
      const color = context.getImageData(0, 0, 1, 1).data
      context.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
      context.fillRect(0, 0, canvas.width, canvas.height)
    }

    return { ...data, placeholder: canvas.toDataURL() } as T
  }

  if (Array.isArray(data)) {
    return Promise.all(
      data.map((value) => addRichAssetPlaceholders<T>(value))
    ) as Promise<T>
  }

  if (typeof data === 'object') {
    const entries = toPairs(data as any)
    const resolved = await Promise.all(
      entries.map(async ([key, value]) => {
        return [key, await addRichAssetPlaceholders<T>(value)]
      })
    )
    return fromPairs(resolved as []) as T
  }

  return data as T
}
