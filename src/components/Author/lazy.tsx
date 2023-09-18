import dynamic from 'next/dynamic'
import { Wrapper } from './styled'

const lazy = dynamic(() => import('./index'), {
  ssr: false,
  loading: () => <Wrapper />,
})

export default lazy
