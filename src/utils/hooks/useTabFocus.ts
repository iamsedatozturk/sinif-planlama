import { useStoreActions } from '@/store'
import { useEffect } from 'react'

function useTabFocus() {
  const { setTabHasFocus } = useStoreActions((a) => a.base.common)

  useEffect(() => {
    if (window === undefined || document === undefined) {
      return
    }

    setTabHasFocus(document.hasFocus())

    const handleFocus = () => {
      setTabHasFocus(true)
    }

    const handleBlur = () => {
      setTabHasFocus(false)
    }

    window.addEventListener('focus', handleFocus)
    window.addEventListener('blur', handleBlur)

    // Clean up
    return () => {
      window.removeEventListener('focus', handleFocus)
      window.removeEventListener('blur', handleBlur)
    }
  }, [])
}

export default useTabFocus
