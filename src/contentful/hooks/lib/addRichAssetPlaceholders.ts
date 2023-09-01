import { createCanvas, loadImage } from 'canvas'
import fromPairs from 'ramda/src/fromPairs'
import toPairs from 'ramda/src/toPairs'
import { TRichAsset } from '../../types'

const PLACEHOLDER_WIDTH = 20

const isRichAsset = (data: unknown): data is TRichAsset => {
  // @ts-ignore
  return !!(data?.url && data?.width && data?.height)
}

const getWidthUrl = (url: string) => {
  const q = url.includes('?') ? '&' : '?'
  return `${url}${q}w=${PLACEHOLDER_WIDTH}`
}

// Populate TRichAsset with `placeholder` images
export const addRichAssetPlaceholders = async <T>(
  data: Array<TRichAsset> | Record<string, TRichAsset> | TRichAsset
): Promise<T> => {
  if (isRichAsset(data)) {
    const image = await loadImage(getWidthUrl(data.url))
    const canvas = createCanvas(image.width, image.height)
    const context = canvas.getContext('2d')
    context.drawImage(image, 0, 0)
    return { ...data, placeholder: canvas.toDataURL() } as T
  }

  if (Array.isArray(data)) {
    return Promise.all(data.map((x) => addRichAssetPlaceholders(x))) as T
  }

  if (typeof data === 'object') {
    const entries = toPairs(data as any)
    const resolved = await Promise.all(
      entries.map(async ([key, value]) => {
        return [key, await addRichAssetPlaceholders(value)]
      })
    )

    console.log('///////////')
    console.log('///////////')
    console.log('///////////')
    console.log('///////////')
    console.log(fromPairs(resolved as []))

    return fromPairs(resolved as []) as T
  }

  return data as T
}