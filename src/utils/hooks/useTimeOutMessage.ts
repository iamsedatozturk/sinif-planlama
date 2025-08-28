import { useEffect, useState } from 'react'

function useTimeOutMessage(
  interval = 3000,
): [string | undefined, React.Dispatch<React.SetStateAction<string | undefined>>] {
  const [message, setMessage] = useState<string | undefined>('')

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => setMessage(''), interval)
      return () => {
        clearTimeout(timeout)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message])

  return [message, setMessage]
}

export default useTimeOutMessage
