import { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash/object';
import Button from '../components/button';
import Navbar from '../components/navbar';
import Router from 'next/router';
import CartContext from '../contexts/cartContext';
import OrderProduct from '../components/orderproduct';
import priceConvert from '../utils/priceConvert';
import withAuthUser from '../utils/pageWrappers/withAuthUser';
import withAuthUserInfo from '../utils/pageWrappers/withAuthUserInfo';
import firebase from 'firebase/app';
import initFirebase from '../utils/initFirebase';
import "firebase/firestore";
import 'firebase/auth';

import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import StripeCardSection from '../components/stripecardsection';

initFirebase()

const FinalizeOrder = props => {
    const stripe = useStripe();
    const elements = useElements();

    const { AuthUserInfo } = props
    const AuthUser = get(AuthUserInfo, 'AuthUser', null)

    const { cartContext, setCartContext } = useContext(CartContext)
    const [cart, setCart] = useState([])
    const [totalPrice, setTotalPrice] = useState()

    const [loadingSubmit, setLoadingSubmit] = useState(false)
    const [billingAddress, setBillingAddress] = useState("")
    const [deliveryAddress, setDeliveryAddress] = useState("")
    const [telephoneNumber, setTelephoneNumber] = useState("")
    const [orderType, setOrderType] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoadingSubmit(true)
        const response = await fetch(`/api/secret?price=${totalPrice}`);
        const data = await response.json()

        if (!stripe || !elements) {
            return;
        }

        const result = await stripe.confirmCardPayment(data.client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: 'Jenny Rosen',
                },
            }
        });

        if (result.error) {
            console.log(result.error.message);
            setLoadingSubmit(false)
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                const res = await fetch(`/api/checkpayment?id=${result.paymentIntent.id}`)
                const status = res.status
                if (status === 200) {
                    await firebase.firestore().collection("orders").add({
                        cart: cart,
                        orderinfo: {
                            billingAddress: billingAddress[0],
                            deliveryAddress: deliveryAddress[0],
                            telephoneNumber: telephoneNumber,
                            orderType: orderType,
                        },
                        user: AuthUser ? firebase.firestore().doc(`users/${AuthUser.id}`) : null
                    })
                    if(AuthUser){
                        let snapshot = await firebase.firestore().collection(`users/${AuthUser.id}/cart`).get()
                        snapshot.docs.forEach(async doc => {
                            await firebase.firestore().collection(`users/${AuthUser.id}/cart`).doc(doc.id).delete()
                        })
                    } else {
                        delete localStorage["cart"]
                    }
                    Router.replace('/myorders')
                } else {
                    setLoadingSubmit(false)
                }
            }
        }
    }

    useEffect(() => {
        if (AuthUser) {
            firebase.firestore().collection(`users/${AuthUser.id}/cart`).onSnapshot(cart => {
                let cart_data = {}
                let price = 0
                cart.docs.forEach(doc => {
                    cart_data[doc.id] = doc.data()
                    price += doc.data().price * doc.data().quantity
                })
                setCart(cart_data)
                setTotalPrice(price)
            })
            firebase.firestore().collection("users").doc(AuthUser.id).get().then(doc => {
                setBillingAddress(doc.data().orderInfo.billingAddress)
                setDeliveryAddress(doc.data().orderInfo.deliveryAddress)
                setTelephoneNumber(doc.data().orderInfo.telephoneNumber)
                setOrderType(doc.data().orderInfo.orderType)
            })
        }
        else {
            const info = JSON.parse(sessionStorage.getItem("Anonymus-info"))

            setBillingAddress(info.billingAddress)
            setDeliveryAddress(info.deliveryAddress)
            setTelephoneNumber(info.telephoneNumber)
            setOrderType(info.orderType)

            let cart_data = JSON.parse(localStorage.getItem("cart"))
            let price = 0
            if (cart_data) {
                Object.keys(cart_data).forEach(key => {
                    price += cart_data[key].quantity * cart_data[key].price
                })
            }
            setCart(cart_data)
            setTotalPrice(price)
            setCartContext(false)

        }
    }, [cartContext])

    return (
        <>
            <style jsx>{`
                .wrp-cartcontent {
                    flex:1;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    background-color: #E9EBEE;
                }
                
                .wrp-cartcontent > .cartcontent-productslist {
                    background-color: white;
                    border-radius: .3em;
                    box-shadow: 0 .065em .19em rgba(0,0,0,0.12), 0 .065em .125em rgba(0,0,0,0.24);
                    margin-right: 1em;
                }

                .wrp-cartcontent > .cartcontent-productslist > :global(:last-child) {
                    border: 0;
                }

                .wrp-cartcontent > .cartcontent-info > .info-details {
                    padding: 1em 2em;
                    display: flex;
                    flex-direction: column;
                    background-color: white;
                    box-shadow: 0 .065em .19em rgba(0,0,0,0.12), 0 .065em .125em rgba(0,0,0,0.24);
                    border-radius: .3em;
                    margin-left: 1em;
                }

                .wrp-cartcontent > .cartcontent-info > .info-details> .details-totalprice {
                    font-weight: bold;
                    font-size: 1.5em;
                }
                
                .wrp-cartcontent > .cartcontent-info > .info-details > .details-info {
                    font-weight: bold;
                }
            `}</style>
            <Navbar {...props} />
            <div className="wrp-cartcontent">
                {cart && Object.keys(cart).length > 0
                    ?
                    <>
                        <div className="cartcontent-productslist">
                            {
                                Object.keys(cart).map(key => (
                                    <OrderProduct
                                        key={key}
                                        dbId={key}
                                        quantity={cart[key].quantity}
                                        productId={cart[key].productId}
                                        authId={AuthUser ? AuthUser.id : null}
                                    />
                                ))
                            }
                        </div>
                        <form className="cartcontent-info" onSubmit={handleSubmit}>
                            <div className="info-details">
                                <StripeCardSection className="details-card" />
                                <span ><b>Billing address:</b> {billingAddress}</span>
                                <span ><b>Delivery address:</b> {deliveryAddress}</span>
                                <span ><b>Telephone number:</b> {telephoneNumber}</span>
                                <span ><b>Type of order:</b> {orderType}</span>
                                <span className="details-totalprice">Total price: {priceConvert(totalPrice, "лв.")}</span>
                                <Button loading={loadingSubmit} type="submit" disabled={!stripe}>Confirm order</Button>
                            </div>
                        </form>
                    </>
                    :
                    <div>
                        Your cart is empty :)
                </div>
                }
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