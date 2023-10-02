import { useState, useEffect } from 'react'
import debounce from 'lodash.debounce'

export default function useWindowSize() {
  const [resizing, setResizing] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
      setResizing(false)
    }
    updateSize()
    const debouncedUpdateSize = debounce(updateSize, 1000)

    const handleResize = () => {
      setResizing(true)
      debouncedUpdateSize()
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return {
    ...windowSize,
    resizing,
  }
}
