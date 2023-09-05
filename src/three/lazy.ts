import dynamic from 'next/dynamic'

const LazyThree = dynamic(() => import('./index'), { ssr: false })

export default LazyThree
