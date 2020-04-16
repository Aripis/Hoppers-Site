import { useState } from 'react';

const CartProduct = props => {
  return (
    <>
      <style jsx>{`
        .wrp:nth-child(odd) {
          color: red;
        }
      `}</style>
      <div className="wrp">
        <h5>id: {props.dbId}</h5><h5>quantity: {props.quantity}</h5>
      </div>
    </>
  )
}

export default CartProduct;