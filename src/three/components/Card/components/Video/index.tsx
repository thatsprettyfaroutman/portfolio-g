import { useVideoTexture } from '@react-three/drei'
import Card, { type TCardProps } from '../Base'

type TCardVideoProps = Omit<TCardProps, 'map'> & {
  src: string
}

export default function CardVideo({ src, ...restProps }: TCardVideoProps) {
  return (
    <Card
      map={useVideoTexture(src, {
        // TODO: play video if three canvas in view
        start: false,
      })}
      {...restProps}
    />
  )
}
