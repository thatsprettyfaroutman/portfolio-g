import { useState, useEffect } from 'react'
import debounce from 'lodash.debounce'

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    handleResize()
    const debouncedHandleResize = debounce(handleResize, 100)
    window.addEventListener('resize', debouncedHandleResize)
    return () => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  }, [])

  return windowSize
}
