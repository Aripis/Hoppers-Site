import { useState, useEffect, useContext } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import initFirebase from '../utils/initFirebase';
import CartContext from '../contexts/cartContext';
import Button from '../components/button';
import priceConvert from '../utils/priceConvert';


initFirebase()

const OrderProduct = props => {
    const [product, setProduct] = useState([])
    const { cartContext, setCartContext } = useContext(CartContext)

    useEffect(() => {
        firebase.firestore().collection("products").doc(props.dbId).get().then(doc => {
            setProduct(doc.data())
        })
    }, [])

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
                .wrp-orderproduct {
                    display: flex;
                    width: 40em;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1em 2em;
                    border-bottom: 1px solid black;
                }

                .wrp-orderproduct .orderproduct-name {
                    width: 6em;
                    text-align: left;
                    margin-left: 3em;
                }

                .wrp-orderproduct .orderproduct-img {
                    max-width: 9em;
                    max-height: 9em;
                }

                .wrp-orderproduct > .orderproduct-price {
                    color: red;
                    width: 3em;
                    font-size: 1.3em;
                }

                .wrp-orderproduct > .orderproduct-quantity{
                    font-weight: bold;
                    width: 1em;

                }

                .wrp-orderproduct > .orderproduct-info{
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                }
            `}</style>
            <div className="wrp-orderproduct">
                <div className="orderproduct-info">
                    <img className="orderproduct-img" src={product.urls && product.urls[0]} />
                    <p className="orderproduct-name">{product.name}</p>
                </div>
                <p className="orderproduct-quantity">x{props.quantity}</p>
                <p className="orderproduct-price">{priceConvert(product.price * props.quantity, "лв.")}</p>
                <div>
                    <Button onClick={removeItem}>
                        Remove
                    </Button>
                </div>
            </div>
        </>
    )
}

export default OrderProduct;