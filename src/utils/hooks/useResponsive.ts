import { useEffect, useState } from 'react'
import { SCREENS } from '@/utils/tailwind'

const breakpoint = {
  '2xl': SCREENS['2xl'], // 1536
  xl: SCREENS.xl, // 1280
  lg: SCREENS.lg, // 1024
  md: SCREENS.md, // 768
  sm: SCREENS.sm, // 640
  xs: SCREENS.xs, // 576
}

const useResponsive = () => {
  const getAllSizes = (comparator = 'smaller') => {
    const currentWindowWidth = window.innerWidth
    return Object.fromEntries(
      Object.entries(breakpoint).map(([key, value]) => [
        key,
        comparator === 'larger' ? currentWindowWidth >= value : currentWindowWidth < value,
      ]),
    )
  }

  const getResponsiveState = () => {
    const currentWindowWidth = window.innerWidth
    return {
      windowWidth: currentWindowWidth,
      larger: getAllSizes('larger'),
      smaller: getAllSizes('smaller'),
    }
  }

  const [responsive, setResponsive] = useState(getResponsiveState())

  const resizeHandler = () => {
    const responsiveState = getResponsiveState()
    setResponsive(responsiveState)
  }

  useEffect(() => {
    window.addEventListener('resize', resizeHandler)
    return () => window.removeEventListener('resize', resizeHandler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responsive.windowWidth])

  return responsive
}

export default useResponsive
