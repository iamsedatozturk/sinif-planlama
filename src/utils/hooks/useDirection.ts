import { useEffect } from 'react'
import { useStoreActions, useStoreState } from '@/store'
import type { Direction } from '@/@types/theme'

function useDirection(): [direction: Direction, updateDirection: (dir: Direction) => void] {
  const direction = useStoreState((state) => state.theme.direction)

  const { setDirection } = useStoreActions((actions) => actions.theme)
  const updateDirection = (dir: Direction) => setDirection(dir)

  useEffect(() => {
    if (window === undefined) {
      return
    }
    const root = window.document.documentElement
    root.setAttribute('dir', direction)
  }, [direction])

  return [direction, updateDirection]
}

export default useDirection
