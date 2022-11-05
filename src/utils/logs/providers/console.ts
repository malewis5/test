// import { CONFIG_ENV } from '../../../settings/variables'
import { parseAxiosError } from '../axiosParser'

// const isServer = (): boolean => {
//   return typeof window == 'undefined'
// }

const initialize = () => {
  //do nothing
}

const hook = () => {
  //do nothing
}

const logMessage = (message: string) => {
  console.log(message)
}

const logWarning = (message: string) => {
  console.warn(message)
}

const logError = (error: any) => {
  // If axios error, let's only show what is necessary
  if (error.response) {
    console.error(parseAxiosError(error))
  } else {
    console.error(error)
  }
}

export default { initialize, logMessage, logError, hook, logWarning }
