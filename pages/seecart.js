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

initFirebase()

const SeeCart = props => {
    const { AuthUserInfo } = props
    const AuthUser = get(AuthUserInfo, 'AuthUser', null)
    const { cartContext, setCartContext } = useContext(CartContext)
    const [totalPrice, setTotalPrice] = useState()


    const [cart, setCart] = useState([])

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
        } else {
            let cart_data = JSON.parse(localStorage.getItem("cart"))
            let price = 0
            if (cart_data) {
                Object.keys(cart_data).forEach(key => {
                    price += cart_data[key].quantity * cart_data[key].price
                })
            }
            setCart(cart_data)
            setTotalPrice(price)
        }
        setCartContext(false)
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

                .wrp-cartcontent > .cartcontent-info {
                    padding: 1em 2em;
                    display: flex;
                    flex-direction: column;
                    background-color: white;
                    box-shadow: 0 .065em .19em rgba(0,0,0,0.12), 0 .065em .125em rgba(0,0,0,0.24);
                    border-radius: .3em;
                    margin-left: 1em;
                }

                .wrp-cartcontent > .cartcontent-info > .info-totalprice {
                    font-weight: bold;
                    font-size: 1.5em;
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
                        <div className="cartcontent-info">
                            <span className="info-totalprice">Total price: {priceConvert(totalPrice, "лв.")}</span>
                            <Button onClick={() => Router.push("/setorder")}>
                                Set Products
                            </Button>
                        </div>
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