// resource for handling cookies taken from here:
// https://github.com/carlos-peru/next-with-api/blob/master/lib/session.js

import { IncomingMessage } from 'http'
import * as cookie from 'js-cookie'

export const setCookie = (key: string, value: any) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 7,
      path: '/',
    })
  }
}

export const removeCookie = (key: string) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1,
    })
  }
}

export const getCookie = (key: string, req: any = null) => {
  return process.browser ? getCookieFromBrowser(key) : getCookieFromServer(key, req)
}

export const cookieIsSet = (key: string): boolean => {
  return getCookie(key) !== undefined
}

const getCookieFromBrowser = (key: string) => {
  return cookie.get(key)
}

export const getCookieAsObject = (key: string, req: IncomingMessage | null = null): { [x: string]: any } | null => {
  try {
    const cookieString: string | undefined = getCookie(key, req)
    if (cookieString) {
      return JSON.parse(unescape(cookieString))
    }
    return null
  } catch (e) {
    return null
  }
}

const getCookieFromServer = (key: string, req: any) => {
  if (!req) {
    return undefined
  }
  if (!req.headers.cookie) {
    return undefined
  }
  const rawCookie = req.headers.cookie.split(';').find((c: any) => c.trim().startsWith(`${key}=`))
  if (!rawCookie) {
    return undefined
  }
  return rawCookie.split('=')[1]
}
