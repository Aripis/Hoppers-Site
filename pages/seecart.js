import { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types'

import { get } from 'lodash/object'
import Button from '../components/button';
import Navbar from '../components/navbar'
import CartContext from '../contexts/cartContext'
import CartProduct from '../components/cartproduct'

import withAuthUser from '../utils/pageWrappers/withAuthUser'
import withAuthUserInfo from '../utils/pageWrappers/withAuthUserInfo'
import firebase from 'firebase/app'
import initFirebase from '../utils/initFirebase'
import "firebase/firestore"
import 'firebase/auth'

initFirebase()

const SeeCart = props => {
    const { AuthUserInfo } = props
    const AuthUser = get(AuthUserInfo, 'AuthUser', null)
    const { cartState, setCartState } = useContext(CartContext)

    const [cart, setCart] = useState([])

    useEffect(() => {
        if (AuthUser) {
            firebase.firestore().collection(`users/${AuthUser.id}/cart`).onSnapshot(cart => {
                setCart(cart.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id
                })))
                setCartState(false)
            })
        }
        else {
            setCart(Object.values({ ...localStorage }).map(product => JSON.parse(product)))
            setCartState(false)
        }
    }, [cartState])


    return (
        <>
            <style jsx>{`
            `}</style>
            <Navbar {...props} />
            <div className="wrp-seecart-products">
                {cart && cart.map((item, i) => (
                    <CartProduct key={i} dbId={item.id} productId={item.productId} quantity={item.quantity} authId={AuthUser ? AuthUser.id : null}>

                    </CartProduct>
                ))}
            </div>
        </>
    )
}


SeeCart.propTypes = {
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

SeeCart.defaultProps = {
    AuthUserInfo: null,
}

export default withAuthUser(withAuthUserInfo(SeeCart));