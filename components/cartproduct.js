import { useState, useEffect, useContext } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import initFirebase from '../utils/initFirebase';
import CartContext from '../contexts/cartContext';
import Button from '../components/button';
import priceConvert from '../utils/priceConvert';


initFirebase()

const CartProduct = props => {
    const [product, setProduct] = useState([])
    const { cartContext, setCartContext } = useContext(CartContext)

    useEffect(() => {
        firebase.firestore().collection("products").doc(props.dbId).get().then(doc => {
            setProduct(doc.data())
        })
    }, [cartContext])

    const removeItem = () => {
        if (props.authId) {
            firebase.firestore().collection(`users/${props.authId}/cart`).doc(props.dbId).get().then(doc => {
                if (doc.exists) {
                    if (doc.data().quantity > 1) {
                        firebase.firestore().collection(`users/${props.authId}/cart`).doc(props.dbId).update({
                            quantity: doc.data().quantity - 1
                        }).then(() => {
                            setCartContext(true)
                        })
                    } else {
                        firebase.firestore().collection(`users/${props.authId}/cart`).doc(props.dbId).delete().then(() => {
                            setCartContext(true)
                        })
                    }
                }
            })

        } else {
            let cart = JSON.parse(localStorage.getItem("cart"))
            if (cart[props.dbId]) {
                if (cart[props.dbId].quantity > 1) {
                    cart[props.dbId].quantity--
                } else {
                    delete cart[props.dbId]
                }
            }
            localStorage.setItem("cart", JSON.stringify(cart))
            setCartContext(true)
        }
    }

    return (
        <>
            <style jsx>{`
                .wrp-cartproduct {
                    display: flex;
                    width: 30em;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                }

                .wrp-cartproduct .cartproduct-name {
                    font-size: .9em;
                    width: 1em;
                    text-align: left;
                    margin-left: 1em;
                }

                .wrp-cartproduct .cartproduct-img {
                    max-width: 80px;
                    max-height: 80px;
                }

                .wrp-cartproduct > .cartproduct-price {
                    color: red;
                    width: 1em;
                }

                .wrp-cartproduct > .cartproduct-quantity{
                    font-weight: bold;
                    width: .2em;

                }

                .wrp-cartproduct > .cartproduct-info{
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                }
            `}</style>
            <div className="wrp-cartproduct">
                <div className="cartproduct-info">
                    <img className="cartproduct-img" src={product.urls && product.urls[0]} />
                    <span className="cartproduct-name">{product.name}</span>
                </div>
                <span className="cartproduct-totalprice">{priceConvert(product.price, "лв.")}</span>
                <span className="cartproduct-quantity">x{props.quantity}</span>
                <span className="cartproduct-price">{priceConvert(product.price * props.quantity, "лв.")}</span>
                <div>
                    <Button onClick={removeItem}>
                        Remove
                    </Button>
                </div>
            </div>
        </>
    )
}

export default CartProduct;