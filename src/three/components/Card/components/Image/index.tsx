import { useTexture } from '@react-three/drei'
import Card, { type TCardProps } from '../Base'

type TCardImageProps = Omit<TCardProps, 'map'> & {
  src: string
}

export default function CardImage({ src, ...restProps }: TCardImageProps) {
  return <Card map={useTexture(src)} {...restProps} />
}
