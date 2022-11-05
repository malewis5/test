import axios, { AxiosRequestHeaders } from 'axios'

const getDefaultTransport = (path?: any) => {
  if (path !== undefined) {
    if (typeof window === 'object') {
      const csrfToken = window.document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
      const headers: AxiosRequestHeaders = {}
      if (csrfToken) {
        headers['CSRF-Token'] = csrfToken
      }
      return axios.create({ baseURL: path.baseURL, headers })
    }
    return axios.create(path)
  }
  if (typeof window === 'object') {
    const csrfToken = window.document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
    const headers: AxiosRequestHeaders = {}
    if (csrfToken) {
      headers['CSRF-Token'] = csrfToken
    }
    return axios.create(headers)
  }
  return axios
}

export default getDefaultTransport
