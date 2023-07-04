import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function useFirstRender(callback?: () => void) {
  const firstRender = useRef(true)
  useFrame(() => {
    if (firstRender.current) {
      firstRender.current = false
      if (typeof callback === 'function') {
        callback()
      }
    }
  })
}
