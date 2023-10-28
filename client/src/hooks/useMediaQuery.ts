import { useEffect, useState } from 'react'

export function useMediaQuery(query: string): boolean {
  const [isMatch, setIsMatch] = useState<boolean>(false)

  const getMatches = (query: string): boolean => {
    if (typeof window !== 'undefined') {
      window.matchMedia(query).matches
    }
    return false
  }

  const handleChange = () => {
    setIsMatch(getMatches(query))
  }

  useEffect(() => {
    const matchMedia = window.matchMedia(query)

    handleChange()

    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange)
    } else {
      matchMedia.addEventListener('change', handleChange)
    }

    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange)
      } else {
        matchMedia.removeEventListener('change', handleChange)
      }
    }
  }, [query])

  return isMatch
}
