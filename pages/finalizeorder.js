import { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { get } from 'lodash/object';
import Button from '../components/button';
import Navbar from '../components/navbar';
import Router from 'next/router';
import CartContext from '../contexts/cartContext';
import CartProduct from '../components/cartproduct';

import withAuthUser from '../utils/pageWrappers/withAuthUser';
import withAuthUserInfo from '../utils/pageWrappers/withAuthUserInfo';
import firebase from 'firebase/app';
import initFirebase from '../utils/initFirebase';
import "firebase/firestore";
import 'firebase/auth';

initFirebase()

const FinalizeOrder = props => {
    const { AuthUserInfo } = props
    const AuthUser = get(AuthUserInfo, 'AuthUser', null)
    const { cartState, setCartState } = useContext(CartContext)
    const [cart, setCart] = useState([])

    const [billingAddress, setBillingAddress] = useState("")
    const [deliveryAddress, setDeliveryAddress] = useState("")
    const [telephoneNumber, setTelephoneNumber] = useState("")
    const [orderType, setOrderType] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("")

    const handleSubmit = async () => {
        await firebase.firestore().collection("orders").add({
            cart: cart,
            orderinfo: {
                billingAddress: billingAddress[0],
                deliveryAddress: deliveryAddress[0],
                telephoneNumber: telephoneNumber,
                orderType: orderType,
                paymentMethod: paymentMethod
            },
            user: firebase.firestore().doc(`users/${AuthUser.id}`)
        })
        Router.push('/myorders')
    }

    useEffect(() => {
        if (AuthUser) {
            firebase.firestore().collection(`users/${AuthUser.id}/cart`).onSnapshot(cart => {
                setCart(cart.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id
                })))
                setCartState(false)
            })
            firebase.firestore().collection("users").doc(AuthUser.id).get().then(doc => {
                setBillingAddress(doc.data().orderInfo.billingAddress)
                setDeliveryAddress(doc.data().orderInfo.deliveryAddress)
                setTelephoneNumber(doc.data().orderInfo.telephoneNumber)
                setOrderType(doc.data().orderInfo.orderType)
                setPaymentMethod(doc.data().orderInfo.paymentMethod)
            })
        }
        else {
            const info = JSON.parse(sessionStorage.getItem("Anonymus-info"))
            setBillingAddress(info.billingAddress)
            setDeliveryAddress(info.deliveryAddress)
            setTelephoneNumber(info.telephoneNumber)
            setOrderType(info.orderType)
            setPaymentMethod(info.paymentMethod)
            setCart(Object.values({ ...localStorage }).map(product => JSON.parse(product)))
            setCartState(false)
        }
    }, [cartState])

    return (
        <>
            <style jsx>{`
                .wrp {
                    display: flex;
                    flex-direction: row;
                }
            `}</style>
            <Navbar {...props} />
            <div className="wrp" >
                <div className="cartcontent-productslist">
                    {cart && cart.map((item, i) => (
                        <CartProduct key={i}
                            dbId={item.id}
                            productId={item.productId}
                            quantity={item.quantity}
                            authId={AuthUser ? AuthUser.id : null}>

                        </CartProduct>
                    ))}
                </div>
                <div className="cartcontent-address">
                    <p>{billingAddress}</p>
                    <p>{deliveryAddress}</p>
                    <p>{telephoneNumber}</p>
                    <p>{orderType}</p>
                    <p>{paymentMethod}</p>

                </div>
                <div className="cartcontent-button">
                    <Button onClick={handleSubmit}>
                        Submit Order
                    </Button>
                </div>
            </div>
        </>
    )
}
FinalizeOrder.propTypes = {
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

FinalizeOrder.defaultProps = {
    AuthUserInfo: null,
}

export default withAuthUser(withAuthUserInfo(FinalizeOrder));