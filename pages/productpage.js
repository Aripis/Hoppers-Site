import PropTypes from 'prop-types'
import { get } from 'lodash'
import Product from '../components/product'
import { useState } from 'react';
import Textfield from '../components/textfield'
import Button from '../components/button'
import Navbar from '../components/navbar'
import withAuthUser from '../utils/pageWrappers/withAuthUser'
import withAuthUserInfo from '../utils/pageWrappers/withAuthUserInfo'
import firebase from 'firebase/app'
import 'firebase/auth'
import initFirebase from '../utils/initFirebase'
import Router from 'next/router'
import CardProduct from '../components/cardProduct'

initFirebase()

const ProductPage = props => {

    return (
        <>
            <style jsx>{`

            `}</style>
            <Navbar />
            <CardProduct
                image="https://stolche.info/wp-content/uploads/2017/03/PC-018-grey.jpg"
                available
                name="Hello World"
                price={1234}
                provider="uuupsy.com"
                description="Lorem ipsum is my description"    
            /> 
        </>
    )
}

export default ProductPage;