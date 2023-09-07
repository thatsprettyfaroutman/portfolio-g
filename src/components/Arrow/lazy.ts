import dynamic from 'next/dynamic'

const lazy = dynamic(() => import('./index'), { ssr: false })

export default lazy
