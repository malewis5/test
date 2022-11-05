const parseError = (e: any, fallback: string) => {
  return e?.response?.data?.error?.message || fallback
}

export default parseError
