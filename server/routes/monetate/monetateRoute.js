/* eslint-disable @typescript-eslint/no-var-requires */
const monetateHome = require('./monetateHelper.js')
const axios = require('axios')
const appendQueryString = require('../../utils/utilFormatters')

const MONETATE_ENGINE_BASE_URL = `https://engine.monetate.net/api/engine/v1/decide`

const getMonetateEngineApiTransport = (ctx) => {
  const axiosInstance = axios.create({ baseURL: MONETATE_ENGINE_BASE_URL })
  axiosInstance.interceptors.request.use(
    async (config) => {
      return Promise.resolve(config)
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  return axiosInstance
}

//times out the monetate api request if it is taking over 5 seconds as to not add latency to the webpage//

if (process.env.CONFIG_ENV === 'staging' || process.env.CONFIG_ENV === 'dev') {
  setTimeout(
    () =>
      (module.exports.monetateHelper = async (req, reply) => {
        try {
          const response = await getMonetateEngineApiTransport().post(`/shoesforcrews`, monetateHome.monetateHome)
          return reply.send(response.data)
        } catch (e) {
          console.error(e)
          return reply.send({ error: true })
        }
      }),
    console.log('fired'),
    200,
    console.log('timeout')
  )
}

module.exports = { getMonetateEngineApiTransport }
