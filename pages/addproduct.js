import { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '../components/button'
import Navbar from '../components/navbar'
import { get } from 'lodash'
import Textfield from '../components/textfield'
import withAuthUser from '../utils/pageWrappers/withAuthUser'
import withAuthUserInfo from '../utils/pageWrappers/withAuthUserInfo'
import firebase from 'firebase/app'
import "firebase/firestore"
import 'firebase/auth'
import initFirebase from '../utils/initFirebase'

initFirebase()

const AddProduct = props => {
    const { AuthUserInfo } = props
    const AuthUser = get(AuthUserInfo, 'AuthUser', null)
    const [name, setName] = useState("")
    const [productId, setProductId] = useState("")
    const [price, setPrice] = useState("")
    const [urls, setUrls] = useState([])
    const [loadingAdd, setLoadingAdd] = useState(false)
    const [available, setAvailable] = useState(false)

    const addProduct = () => {
        setLoadingAdd(true)
        firebase.firestore().collection("products").add({
            productId: productId,
            name: name,
            price: price,
            urls: urls,
            uid: AuthUser.id,
            available: available
        }).then(() => setLoadingAdd(false))
    }

    return (
        <>
            <style jsx>{`

            `}</style>
            <Navbar {...props}/>
            <div className="wrp-add">
                <Textfield placeholder="Id" value={productId} onChange={e => setProductId(e.target.value)} className="form-input" />
                <Textfield placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="form-input" />
                <input type="checkbox" checked={available} onChange={e => setAvailable(e.target.checked)} id="available" name="available" value="Bike" />
                <label htmlFor="available">Available</label>
                <Textfield placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} className="form-input" />
                {/* Must edit urls for thumnails and multiple images */}
                <Textfield placeholder="Image Urls" value={urls[0]} onChange={e => setUrls([e.target.value])} className="form-input" />
                <Button loading={loadingAdd} onClick={addProduct} className="form-submit">
                    Add product
                </Button>
            </div>
        </>
    )
}

AddProduct.getInitialProps = async ctx => {
    const AuthUserInfo = get(ctx, 'myCustomData.AuthUserInfo', null)
    const AuthUser = get(AuthUserInfo, 'AuthUser', null)
    if(AuthUser === null){
        ctx.res.writeHead(302, { Location: '/' })
        ctx.res.end()
        return
    }
    return
}

AddProduct.propTypes = {
    AuthUserInfo: PropTypes.shape({
        AuthUser: PropTypes.shape({
            id: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            emailVerified: PropTypes.bool.isRequired,
        }),
        token: PropTypes.string,
    }),
    data: PropTypes.shape({
        user: PropTypes.shape({
            id: PropTypes.string,
        }).isRequired
    }),
}

AddProduct.defaultProps = {
    AuthUserInfo: null,
}

export default withAuthUser(withAuthUserInfo(AddProduct));