import dynamic from 'next/dynamic'
import Spinner from './components/Spinner'
import { Wrapper } from './styled'

const lazy = dynamic(() => import('./index'), {
  ssr: false,
  loading: () => (
    <Wrapper>
      <Spinner />
    </Wrapper>
  ),
})

export default lazy
