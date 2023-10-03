import dynamic from 'next/dynamic'
import { Loading } from './styled'

const LazyThree = dynamic(() => import('./index'), {
  ssr: false,
  loading: () => <Loading $timeOffset={performance.now()} />,
})

export default LazyThree
