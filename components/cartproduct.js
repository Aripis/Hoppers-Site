import { useState, useEffect } from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'
import initFirebase from '../utils/initFirebase'

initFirebase()

const CartProduct = props => {
  const [product, setProduct] = useState([])

  useEffect(() =>{
    // console.log(props.id)
    firebase.firestore().collection("products").doc(props.dbId).get().then(doc => {
      setProduct(doc.data())
      console.log(doc.data())
    })
  }, [])

  return (
    <>
      <style jsx>{`
        .wrp {
          color: red;
          width: 20px;
          height: 20px;
        }

        img {
          object-fit: contain;
          width: 50px;
          height: 50px;
        }
      `}</style>
      <div className="wrp" >
        <img src={product.urls && product.urls[0]} />
        <p>name: {product.name}</p>
        <p>quantity: {props.quantity}</p>
        <p>price: {product.price * props.quantity}</p>
      </div>
    </>
  )
}

export default CartProduct;