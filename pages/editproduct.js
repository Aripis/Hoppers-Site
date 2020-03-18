import { useState } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import priceConvert from '../utils/priceConvert'
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
import Router from 'next/router'
import Product from '../components/product'

initFirebase()

const EditProduct = props => {
    const { AuthUserInfo } = props
    const AuthUser = get(AuthUserInfo, 'AuthUser', null)
    const [name, setName] = useState(props.name)
    const [productId, setProductId] = useState(props.productId)
    const [price, setPrice] = useState(props.price)
    const [urls, setUrls] = useState(props.urls)
    const [loadingEdit, setLoadingEdit] = useState(false)
    const [available, setAvailable] = useState(props.available)
    const [loadingDelete, setLoadingDelete] = useState(false)

    const editProduct = () => {
        setLoadingEdit(true)
        firebase.firestore().collection("products").doc(props.id).update({
            productId: productId,
            name: name,
            price: price,
            urls: urls,
            uid: AuthUser.id,
            available: available
        }).then(() => setLoadingEdit(false))
    }

    const deleteProduct = () => {
        setLoadingDelete(true)
        firebase.firestore().collection("products").doc(props.id).delete().then(() => Router.replace("/store"))
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
                <Textfield placeholder="Image Url" value={urls[0]} onChange={e => setUrls([e.target.value])} className="form-input" />
                <Button loading={loadingEdit} onClick={editProduct} className="form-submit">
                    Edit product
                </Button>
                <Button loading={loadingDelete} onClick={deleteProduct} className="form-submit">
                    Delete product
                </Button>
            </div>
        </>
    )
}

EditProduct.getInitialProps = async ctx => {
    const AuthUserInfo = get(ctx, 'myCustomData.AuthUserInfo', null)
    const AuthUser = get(AuthUserInfo, 'AuthUser', null)
    if(AuthUser === null){
        ctx.res.writeHead(302, { Location: '/' })
        ctx.res.end()
        return
    }
    let doc = await firebase.firestore().collection("products").doc(ctx.query.id).get()
    return {...doc.data(), id: ctx.query.id}
}

EditProduct.propTypes = {
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

EditProduct.defaultProps = {
    AuthUserInfo: null,
}

export default withAuthUser(withAuthUserInfo(EditProduct));