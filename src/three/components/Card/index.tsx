import Base from './components/Base'
import Video from './components/Video'
import Image from './components/Image'

// Card Compound

// TODO: Prolly doesn't need to be a compound component

export type TCard = {
  Image: typeof Image
  Video: typeof Video
} & typeof Base

const Card = Base as TCard
Card.Image = Image
Card.Video = Video

export default Card
