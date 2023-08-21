import dynamic from 'next/dynamic'

const LazyThree = dynamic(() => import('./index'))

export default LazyThree
