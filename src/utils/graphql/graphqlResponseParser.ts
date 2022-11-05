import logProviderFactory from '../logs/logProviderFactory'

interface IGraphQLExtension {
  code: string
  exception: {
    data: any
    isBoom: boolean
    isServer: boolean
    output: {
      statusCode: number
      payload: {
        statusCode: number
        error: string
        message: string
      }
      headers: any
    }
    message: string
    stacktrace?: string[]
  }
}

export interface IGraphQLError {
  message: string
  locations: any[]
  path: string[]
  extensions: IGraphQLExtension
}

export interface IGraphQLResponse {
  errors: IGraphQLError[]
  data: Record<string, any>
}

export interface IGraphParserResponse {
  message: string
  full: IGraphQLError[]
}

const parseGraphQLResponseForErrorsAndLog = (
  body: IGraphQLResponse,
  fallbackMessage?: string
): IGraphParserResponse => {
  if (body?.errors?.length > 0) {
    //overall, the stacktrace isn't very useful to us the error will most likely be issue with
    //how we are using their api vs an actual issue with the core graphql code
    //Let's clean it up for Sentry since they have a cap on error text
    for (const error of body.errors) {
      if (error?.extensions?.exception?.stacktrace) {
        delete error.extensions.exception.stacktrace
      }
    }
    logProviderFactory.logError(JSON.stringify(body.errors))
    return {
      message: (body?.errors?.[0]?.message || fallbackMessage) ?? '',
      full: body.errors || [],
    }
  }
  return {
    message: fallbackMessage ?? '',
    full: [],
  }
}

export default parseGraphQLResponseForErrorsAndLog
