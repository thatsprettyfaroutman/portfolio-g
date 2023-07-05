import { BufferGeometry, Float32BufferAttribute, PlaneGeometry } from 'three'
// @ts-ignore
import PerlinNoise3d from 'perlin-noise-3d'

type TNoiseGenerator = {
  get(x: number, y?: number, z?: number): number
  noiseSeed(seed: number): void
}

type TPerlinNoisePlaneGeometryParams = {
  width?: number
  height?: number
  widthSegments?: number
  heightSegments?: number
  noiseScale?: number
  noise?: number
  noiseSeed?: number
}

const clamp = (a: number, b: number, v: number) => Math.max(a, Math.min(b, v))

class PerlinNoisePlaneGeometry extends BufferGeometry {
  noiseGenerator: TNoiseGenerator

  constructor(
    width = 1,
    height = 1,
    widthSegments = 1,
    heightSegments = 1,
    noiseScale = 1,
    noise = 1,
    noiseSeed = Math.PI
  ) {
    super()

    this.noiseGenerator = new PerlinNoise3d()
    this.noiseGenerator.noiseSeed(noiseSeed)

    // @ts-ignore
    this.type = 'PerlinNoisePlaneGeometry'

    // @ts-ignore
    this.parameters = {
      width,
      height,
      widthSegments,
      heightSegments,
      noiseScale,
      noise,
      noiseSeed,
    }

    const widthHalf = width / 2
    const heightHalf = height / 2

    const gridX = Math.floor(widthSegments)
    const gridY = Math.floor(heightSegments)

    const gridX1 = gridX + 1
    const gridY1 = gridY + 1

    const segmentWidth = width / gridX
    const segmentHeight = height / gridY

    //

    const indices = []
    const vertices = []
    const normals = []
    const uvs = []

    for (let iy = 0; iy < gridY1; iy++) {
      const y = iy * segmentHeight - heightHalf

      for (let ix = 0; ix < gridX1; ix++) {
        const x = ix * segmentWidth - widthHalf

        const isEdge = ix === 0 || iy === 0 || ix === gridX || iy === gridY
        const noiseAmount = isEdge
          ? 0
          : this.noiseGenerator.get(x * noiseScale, y * noiseScale) - 0.5

        const offsetX = segmentWidth * noiseAmount * noise
        const offsetY = segmentHeight * noiseAmount * noise
        vertices.push(
          clamp(-widthHalf, widthHalf, x + offsetX),
          -clamp(-heightHalf, heightHalf, y + offsetY),
          0
        )

        const offsetUvX = offsetX / width
        const offsetUvY = offsetY / height
        uvs.push(ix / gridX + offsetUvX)
        uvs.push(1 - iy / gridY - offsetUvY)

        normals.push(0, 0, 1)
      }
    }

    for (let iy = 0; iy < gridY; iy++) {
      for (let ix = 0; ix < gridX; ix++) {
        const a = ix + gridX1 * iy
        const b = ix + gridX1 * (iy + 1)
        const c = ix + 1 + gridX1 * (iy + 1)
        const d = ix + 1 + gridX1 * iy

        indices.push(a, b, d)
        indices.push(b, c, d)
      }
    }

    this.setIndex(indices)
    this.setAttribute('position', new Float32BufferAttribute(vertices, 3))
    this.setAttribute('normal', new Float32BufferAttribute(normals, 3))
    this.setAttribute('uv', new Float32BufferAttribute(uvs, 2))
  }

  copy(source: PerlinNoisePlaneGeometry | PlaneGeometry) {
    super.copy(source)

    // @ts-ignore
    this.parameters = Object.assign({}, source.parameters)

    return this
  }

  static fromJSON(data: TPerlinNoisePlaneGeometryParams) {
    return new PerlinNoisePlaneGeometry(
      data.width,
      data.height,
      data.widthSegments,
      data.heightSegments,
      data.noiseScale,
      data.noise,
      data.noiseSeed
    )
  }
}

export default PerlinNoisePlaneGeometry
