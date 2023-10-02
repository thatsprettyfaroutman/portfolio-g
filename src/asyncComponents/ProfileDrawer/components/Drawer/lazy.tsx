'use client'

import dynamic from 'next/dynamic'
import { Wrapper as ToggleWrapper } from '../Toggle/styled'

const lazy = dynamic(() => import('./index'), {
  ssr: false,
  loading: () => <ToggleWrapper />,
})

export default lazy
