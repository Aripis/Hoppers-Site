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

const AddProduct = props => {
    const { AuthUserInfo } = props
    const AuthUser = get(AuthUserInfo, 'AuthUser', null)
    const [name, setName] = useState("")
    const [productId, setProductId] = useState("")
    const [price, setPrice] = useState("")
    const [url, setUrl] = useState("")
    const [loadingAdd, setLoadingAdd] = useState(false)
    const [checked, setChecked] = useState(false)

    const addProduct = () => {
        setLoadingAdd(true)
        firebase.firestore().collection("products").add({
            productId: productId,
            name: name,
            price: price,
            url: url,
            uid: AuthUser.id,
            available: checked
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
                <input type="checkbox" checked={checked} onChange={e => setChecked(e.target.checked)} id="available" name="available" value="Bike" />
                <label htmlFor="available">Available</label>
                <Textfield placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} className="form-input" />
                <Textfield placeholder="Image Url" value={url} onChange={e => setUrl(e.target.value)} className="form-input" />
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