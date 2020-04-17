import { useState, useEffect } from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'
import initFirebase from '../utils/initFirebase'

initFirebase()

const CartProduct = props => {
  const [product, setProduct] = useState([])

  useEffect(() =>{
    firebase.firestore().collection("products").doc(props.dbId).get().then(doc => {
      setProduct(doc.data())
    })
  }, [])

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
        <img src={product.urls && product.urls[0]}/>
        <p>name: {product.name};&nbsp;</p>
        <p>quantity: {props.quantity};&nbsp;</p>
        <p>price: {Math.round((product.price * props.quantity + Number.EPSILON) * 100) / 100};</p>
      </div>
    </>
  )
}

export default CartProduct;