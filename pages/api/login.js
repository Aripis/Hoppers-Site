import commonMiddleware from '../../utils/middleware/commonMiddleware';
import { verifyIdToken } from '../../utils/auth/verifyIdToken';

const handler = (req, res) => {
    if (!req.body) {
        return res.status(400).json({ code: 400, message: "Bad Request" }).end()
    }

    const { token } = req.body

    return verifyIdToken(token)
        .then(decodedToken => {
            req.session.decodedToken = decodedToken
            req.session.token = token
            return decodedToken
        })
        .then(decodedToken => {
            return res.status(200).json({ status: true, decodedToken })
        })
        .catch(error => {
            return res.status(500).json({ error })
        })
}

export default commonMiddleware(handler)