import { useState, useEffect, useContext } from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'
import initFirebase from '../utils/initFirebase'
import CartContext from '../contexts/cartContext'
import Button from '../components/button'

initFirebase()

const CartProduct = props => {
    const [product, setProduct] = useState([])
    const { cartState, setCartState } = useContext(CartContext)

    useEffect(() => {
        firebase.firestore().collection("products").doc(props.dbId).get().then(doc => {
            setProduct(doc.data())
        })
    }, [])

    const removeItem = () => {
        if (props.authId) {
            firebase.firestore().collection(`users/${props.authId}/cart`).doc(props.dbId).delete().then(() => setCartState(true))
        }
        else {
            localStorage.removeItem(`Anonymus-${props.productId}`)
            setCartState(true)
        }
    }

    return (
        <>
            <style jsx>{`
                .wrp {
                    color: red;
                    display: flex;
                    flex-direction: row;
                }

                img {
                    object-fit: contain;
                    width: 50px;
                    height: 50px;
                }
            `}</style>
            <div className="wrp" >
                <img src={product.urls && product.urls[0]} />
                <p>name: {product.name};&nbsp;</p>
                <p>quantity: {props.quantity};&nbsp;</p>
                <p>price: {Math.round((product.price * props.quantity + Number.EPSILON) * 100) / 100};</p>
                <Button onClick={removeItem}>
                    Remove from Cart
                </Button>
            </div>
        </>
    )
}

export default CartProduct;