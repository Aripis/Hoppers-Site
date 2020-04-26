import { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { get } from 'lodash/object';
import logout from '../utils/auth/logout';
import Router from 'next/router';
import CartContext from '../contexts/cartContext';
import Button from '../components/button';
import priceConvert from '../utils/priceConvert';
import CartProduct from '../components/cartproduct';
import initFirebase from '../utils/initFirebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

initFirebase()

const Navbar = props => {
    const { AuthUserInfo } = props
    const AuthUser = get(AuthUserInfo, 'AuthUser', null)

    const [totalPrice, setTotalPrice] = useState()

    const { cartContext, setCartContext } = useContext(CartContext)
    const [cart, setCart] = useState({})

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
            setCart(JSON.parse(localStorage.getItem("cart")))
            let price = 0
            if (cart) {
                Object.keys(cart).forEach(key => {
                    price += cart[key].quantity * cart[key].price
                })
            }
            setTotalPrice(price)
        }
        const cart = JSON.parse(localStorage.getItem("cart"))
        setCartContext(false)
    }, [cartContext])

    return (
        <>
            <style jsx>{`
                .wrp-navbar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background-color: #FAFBFD;
                }

                .wrp-navbar > .navbar-logo {
                    margin-left: 1.250em;
                }

                .wrp-navbar > .navbar-buttons {
                    display: flex;
                }

                .wrp-navbar > .navbar-buttons > .wrp-cart > .cart {
                    display: flex;
                    flex-direction: column;
                    visibility: hidden;
                    opacity: 0;
                    position: absolute;
                    right: 0;
                    background-color: #FAFBFD;
                    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
                    padding: .6em;
                    margin-top: 1.6em;
                    z-index: -2;
                    transition: opacity .2s, visibility .2s;
                }
                
                .wrp-navbar > .navbar-buttons > .wrp-cart > .cart > :global(.cart-button) {
                    margin-top: 1em;
                }
                
                .wrp-navbar > .navbar-buttons > .wrp-cart {
                    position: relative;
                }
                
                .wrp-navbar > .navbar-buttons > :global(a),
                .wrp-navbar > .navbar-buttons > .wrp-cart  {
                    display: inline-block;
                    padding: 1.55em 2.5em;
                    user-select: none;
                    color: #444;
                    cursor: pointer;
                    transition: .3s;
                }
                
                .wrp-navbar > .navbar-buttons > .wrp-cart:hover > .cart{
                    visibility: visible;
                    opacity: 1;
                    z-index: 999;
                }

                .wrp-navbar > .navbar-buttons > :global(a):hover,
                .wrp-navbar > .navbar-buttons > .wrp-cart:hover {
                    text-shadow: 0 0 .65px black, 0 0 .65px black;
                    color: black;
                }


            `}</style>
            <nav className="wrp-navbar">
                <div className="navbar-logo">
                    <h1>Aripis</h1>
                </div>
                <div className="navbar-buttons">
                    {AuthUser && AuthUser.role === "creator" &&
                        <Link href="/addproduct">
                            <a>Add Product</a>
                        </Link>
                    }
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                    <Link href="/store">
                        <a>Store</a>
                    </Link>
                    <div className="wrp-cart">
                        Cart
                        <div className="cart">
                            {cart && Object.keys(cart).length > 0
                                ?
                                Object.keys(cart).map(key => (
                                    <CartProduct
                                        key={key}
                                        dbId={key}
                                        quantity={cart[key].quantity}
                                        productId={cart[key].productId}
                                        authId={AuthUser ? AuthUser.id : null}
                                    />

                                ))
                                :
                                "Your cart is empty :)"
                            }
                            <p>TotalPrice: {priceConvert(totalPrice, "лв.")}</p>
                            <Button className="cart-button" onClick={() => Router.replace("/seecart")}>
                                See cart
                            </Button>
                        </div>
                    </div>
                    {!AuthUser ? (
                        <>
                            <Link href="/signin">
                                <a>Sign in</a>
                            </Link>
                            <Link href="/signup">
                                <a>Sign up</a>
                            </Link>
                        </>
                    ) : (
                            <a onClick={async () => {
                                try {
                                    await logout()
                                    Router.push('/')
                                } catch (e) {
                                    console.error(e)
                                }
                            }}>Log out</a>
                        )}
                </div>
            </nav>
        </>
    );
}

Navbar.propTypes = {
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

Navbar.defaultProps = {
    AuthUserInfo: null,
}

export default Navbar;