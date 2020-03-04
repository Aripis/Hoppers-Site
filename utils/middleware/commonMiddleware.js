import cookieSession from './cookieSession'
import cookieSessionRefresh from './cookieSessionRefresh'

require('../../env')

export default handler => cookieSession(cookieSessionRefresh(handler))
