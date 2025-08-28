import { useEffect } from 'react'

function useNotification() {
  useEffect(() => {
    if (window === undefined) {
      return
    }

    if (!('Notification' in window)) {
      console.log('This browser does not support desktop notification')
    } else {
      Notification.requestPermission()
    }
  }, [])
}

export default useNotification
