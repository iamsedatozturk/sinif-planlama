const defaultSubDomain = 'KURS'

export const getSubdomain = (): string | null => {
  if (typeof window === 'undefined') return null

  const hostname = window.location.hostname
  const parts = hostname.split('.')

  // localhost veya normal domain ise subdomain yok
  if (hostname === 'localhost' || parts.length < 3) {
    return null
  }

  // Default subdomain ise null döndür
  if (parts[0].toUpperCase() === defaultSubDomain) {
    return null
  }

  return parts[0].toUpperCase()
}

export const hasSubdomain = (): boolean => {
  return getSubdomain() !== null
}
