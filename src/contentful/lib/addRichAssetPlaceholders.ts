import { createCanvas, loadImage } from 'canvas'
import fromPairs from 'ramda/src/fromPairs'
import toPairs from 'ramda/src/toPairs'
import { TRichAsset } from '../types'

const PLACEHOLDER_WIDTH = 40
const COLOR_ONLY = true

const isRichAssetPlaceholderable = (data: unknown): data is TRichAsset => {
  return !!(
    data &&
    // @ts-ignore
    data?.url &&
    // @ts-ignore
    data?.contentType
  )
}

const getWidthUrl = (url: string) => {
  const q = url.includes('?') ? '&' : '?'
  return `${url}${q}w=${PLACEHOLDER_WIDTH}`
}

/**
 * Populate TRichAsset with `placeholder` images that are generated with node-canvas in the build time.
 */
export default async function addRichAssetPlaceholders<T>(
  data: Array<TRichAsset> | Record<string, TRichAsset> | TRichAsset
): Promise<T> {
  if (isRichAssetPlaceholderable(data)) {
    // @ts-ignore
    const { description, ...rawAsset } = data

    // TODO: Create video posters from video data instead of using the description field. With ffmpeg for example.
    if (rawAsset.contentType.includes('video') && !description.trim()) {
      console.warn('Video asset needs DataUrl in the description field')
      return null as T
    }

    const url = rawAsset.contentType.includes('video')
      ? // @ts-ignore
        description
      : getWidthUrl(rawAsset.url)

    const image = await loadImage(url)
    const canvas = createCanvas(image.width, image.height)
    const context = canvas.getContext('2d')
    context.drawImage(image, 0, 0)

    if (COLOR_ONLY) {
      const color = context.getImageData(0, 0, 1, 1).data
      context.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
      context.fillRect(0, 0, canvas.width, canvas.height)
    }

    const asset = {
      ...rawAsset,
      placeholder: canvas.toDataURL(),
    }

    if (data.contentType.includes('video')) {
      asset.poster = description
    }

    return asset as T
  }

  if (Array.isArray(data)) {
    const resolved = await Promise.all(
      data.map((value) => addRichAssetPlaceholders<T>(value))
    )
    return resolved.filter(Boolean) as T
  }

  if (typeof data === 'object') {
    const entries = toPairs(data as any)
    const resolved = await Promise.all(
      entries.map(async ([key, value]) => {
        return [key, await addRichAssetPlaceholders<T>(value)]
      })
    )
    return fromPairs(resolved.filter(([_, value]) => Boolean(value)) as []) as T
  }

  return data as T
}
