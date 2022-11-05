const ENDPOINTS = {
  SEND: `email-proxy`,
}

/**
 * Method used to send emails via omnimerse-email-service.
 *
 * @param transport
 * @param data
 */
export const sendEmail = async (transport: any, data: any): Promise<any> => {
  try {
    const response = await transport.post(`/${ENDPOINTS.SEND}`, buildFormData(data), {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return { error: '', data: response.data }
  } catch (e) {
    return { error: 'An error has occurred...', data: null }
  }
}

export const sendOrderEmail = async (transport: any, data: any): Promise<any> => {
  try {
    const response = await transport.post(`/${ENDPOINTS.SEND}`, data)
    return { error: '', data: response }
  } catch (e) {
    return { error: 'An error has occurred...', data: null }
  }
}

const buildFormData = (data: any) => {
  if (data instanceof FormData) {
    return data
  }
  const formData: any = new FormData()
  for (const key in data) {
    if (data[key]) {
      formData.append(key, data[key])
    }
  }

  return formData
}
