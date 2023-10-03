import dynamic from 'next/dynamic'

const VideoPoster = dynamic(() => import('./index'), {
  ssr: false,
})

export default VideoPoster
