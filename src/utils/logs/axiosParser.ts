export const parseAxiosError = (e: any) => {
  if (e.response) {
    const obj = {
      baseURL: e.response.config.baseURL,
      path: e.response.config.url,
      method: e.response.config.method,
      body: e.response.config.data,
      status: e.response.status,
      statusText: e.response.statusText,
      headers: e.response.config.headers,
      error: JSON.stringify(e.response.data),
    }
    return obj
  } else {
    return null
  }
}
