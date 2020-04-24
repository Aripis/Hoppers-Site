import commonMiddleware from '../../utils/middleware/commonMiddleware';

const handler = (req, res) => {
    req.session = null
    res.status(200).json({ status: true })
}

export default commonMiddleware(handler)