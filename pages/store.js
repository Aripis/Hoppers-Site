import PropTypes from 'prop-types'
import { get } from 'lodash'
import Document, { Html, Head, Main, NextScript } from 'next/document'
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

initFirebase()

const Store = props => {

    return (
        <>
            <style jsx>{`
                .wrp-products {
                    flex-grow: 1;
                    flex-direction: row;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    align-self: start;
                }
            `}</style>
            <Navbar {...props}/>
            <div className="wrp-products">
                <Product name="Kalata" price="1992" available moreInfo="asdasdasdasdasa sdasdadsadadasd" />
                <Product name="Ivan" price="1882" available moreInfo="kooonondfd sdasdadsadadasd" />
                <Product name="Petur" price="176" available moreInfo="kooonondfd oooook" />
                {/* <Product name="Ivan" price="1882" available moreInfo="kooonondfd sdasdadsadadasd" />
                <Product name="Petur" price="176" available moreInfo="kooonondfd oooook" />
                <Product name="Ivan" price="1882" available moreInfo="kooonondfd sdasdadsadadasd" />
                <Product name="Petur" price="176" available moreInfo="kooonondfd oooook" />
                <Product name="Ivan" price="1882" available moreInfo="kooonondfd sdasdadsadadasd" />
                <Product name="Petur" price="176" available moreInfo="kooonondfd oooook" />
                <Product name="Ivan" price="1882" available moreInfo="kooonondfd sdasdadsadadasd" />
                <Product name="Petur" price="176" available moreInfo="kooonondfd oooook" />
                <Product name="Ivan" price="1882" available moreInfo="kooonondfd sdasdadsadadasd" />
                <Product name="Petur" price="176" available moreInfo="kooonondfd oooook" />
                <Product name="Ivan" price="1882" available moreInfo="kooonondfd sdasdadsadadasd" />
                <Product name="Petur" price="176" available moreInfo="kooonondfd oooook" />
                <Product name="Ivan" price="1882" available moreInfo="kooonondfd sdasdadsadadasd" />
                <Product name="Petur" price="176" available moreInfo="kooonondfd oooook" />
                <Product name="Ivan" price="1882" available moreInfo="kooonondfd sdasdadsadadasdsdasdadsadadasdsdasdadsadadasdsdasdadsadadasdsdasdadsadadasdsdasdadsadadasdsdasdadsadadasd" /> */}
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