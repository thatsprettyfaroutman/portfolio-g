import { useEffect, useState } from 'react'

export default function useFontsStatus() {
  const [fontStatus, setFontStatus] = useState<
    'not available' | 'loading' | 'loaded'
  >('not available')

  useEffect(() => {
    setFontStatus('loading')
    document.fonts.ready.then(() => setFontStatus('loaded'))
  }, [])

  return fontStatus
}
