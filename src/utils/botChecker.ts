import { has } from '../components/Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Common/Utils/lodash'

const isBot = (ctx: any) => {
  if (ctx?.req) {
    const userAgent: string | undefined = has(ctx.req, ['headers', 'user-agent'])
    if (userAgent) {
      return (
        userAgent.indexOf('GoogleHC') !== -1 ||
        userAgent.indexOf('Pingdom') !== -1 ||
        userAgent.indexOf('UptimeRobot') !== -1
      )
    }
  }
  return false
}
export default isBot
