import PropTypes from 'prop-types'
import { get } from 'lodash'
import Product from '../components/product'
import { useState, useEffect } from 'react';
import Textfield from '../components/textfield'
import Button from '../components/button'
import Navbar from '../components/navbar'
import withAuthUser from '../utils/pageWrappers/withAuthUser'
import withAuthUserInfo from '../utils/pageWrappers/withAuthUserInfo'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import initFirebase from '../utils/initFirebase'
import Router from 'next/router'

initFirebase()

const Store = props => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        firebase.firestore().collection("products").onSnapshot(snapshot => {
            setProducts(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
        })
    })

    return (
        <>
            <style jsx>{`
                .wrp-products {
                    flex-grow: 1;
                    display: flex;
                    flex-flow: row wrap;
                    justify-content: center;
                    background-color: #E9EBEE;
                }

                @media only screen and (max-width: 450px){
                    .wrp-products > :global(.product) {
                        margin-top: .4em;
                        margin-bottom:0;
                    }

                    .wrp-products > :global(.product):nth-child(odd) {
                        margin-left: 0;
                        margin-right: .2em;
                    }

                    .wrp-products > :global(.product):nth-child(even) {
                        margin-left: .2em;
                        margin-right: 0;
                    }
                }
            `}</style>
            <Navbar {...props}/>
            <div className="wrp-products"> 
                {products.map((product, i) => (
                    <Product
                        key={i}
                        id={product.id}
                        className="product"
                        image={product.urls[0]} 
                        name={product.name} 
                        price={product.price}
                        currency="лв"
                        available={product.available}
                    />
                ))}
            </div>
        </>
    )
}

Store.propTypes = {
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

Store.defaultProps = {
    AuthUserInfo: null,
}

export default withAuthUser(withAuthUserInfo(Store));