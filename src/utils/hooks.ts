import { useEffect, useState } from 'react'

export const useMediaQuery = (queries: string[], values: any[], defaultValue: any) => {
  const mediaQueryLists: MediaQueryList[] =
    typeof window !== 'undefined' ? queries.map((q) => window.matchMedia(q)) : []

  const getValue = () => {
    const index = mediaQueryLists.findIndex((mql) => mql.matches)
    return typeof values[index] !== 'undefined' ? values[index] : defaultValue
  }

  const [value, setValue] = useState(getValue)

  useEffect(() => {
    const handler = () => setValue(getValue)
    mediaQueryLists.forEach((mql) => mql.addListener(handler))
    return () => mediaQueryLists.forEach((mql) => mql.removeListener(handler))
  }, [])

  return value
}
