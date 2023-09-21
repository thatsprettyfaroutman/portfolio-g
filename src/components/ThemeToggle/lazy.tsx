import dynamic from 'next/dynamic'
import { Wrapper, Switch } from './styled'

const lazy = dynamic(() => import('./index'), {
  ssr: false,
  loading: () => (
    <Wrapper $loading>
      <Switch />
    </Wrapper>
  ),
})

export default lazy
