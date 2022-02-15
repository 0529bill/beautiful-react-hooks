import { useEffect, useState } from 'react'
import isClient from './shared/isClient'
import isAPISupported from './shared/isAPISupported'
import isDevelopment from './shared/isDevelopment'

function useCookie(cookieKey: string): [string | null, (updateValue: any) => void, () => void] {
  if (!isClient && !isAPISupported('cookieStore')) {
    // eslint-disable-next-line no-console
    console.warn('cookieStore is not supported')
  }

  if (!isClient) {
    if (isDevelopment) {
      // eslint-disable-next-line no-console
      console.warn(
        'Please be aware that cookieStore could not be available during SSR',
      )
    }
    return [undefined, () => undefined, () => undefined]
  }

  const [value, setValue] = useState<string | null>(null)
  const [cookieIsDeleted, setCookieIsDeleted] = useState<boolean>(false)

  useEffect(() => {
    if (cookieIsDeleted) {
      // eslint-disable-next-line no-console
      return console.warn('cookie is deleted')
    }
    (window as any).cookieStore.get(cookieKey).then((resolve: any) => {
      if (resolve) {
        return resolve.value ? setValue(JSON.parse(resolve.value)) : null
      }
      (window as any).cookieStore.set({ name: cookieKey, value: '' })
      return setValue(null)
    })
    return () => { }
  }, [])

  const deleteCookie = () => {
    (window as any).cookieStore.delete(cookieKey)
    if (!cookieIsDeleted) {
      setCookieIsDeleted(true)
    }
  }

  const updateCookie = (updateValue: string) => {
    (window as any).cookieStore
      .set({
        name: cookieKey,
        value: JSON.stringify(updateValue),
      })
      .then(() => {
        setValue(updateValue)
      })
  }
  return [value, updateCookie, deleteCookie]
}

export default useCookie
