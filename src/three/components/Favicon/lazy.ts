import dynamic from 'next/dynamic'

const lazy = dynamic(() => import('./index'))

export default lazy
