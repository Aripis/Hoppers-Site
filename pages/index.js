import PropTypes from 'prop-types';
import { get } from 'lodash/object';
import { useState, useEffect } from 'react';;
import withAuthUser from '../utils/pageWrappers/withAuthUser';
import withAuthUserInfo from '../utils/pageWrappers/withAuthUserInfo';
import Navbar from '../components/navbar';
import Product from '../components/product';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import initFirebase from '../utils/initFirebase';

initFirebase()

const Home = props => {
    const { AuthUserInfo } = props
    const AuthUser = get(AuthUserInfo, 'AuthUser', null)
    const [products, setProducts] = useState([])

    useEffect(() => {
        
    }, [])

    return (
        <>
            <style jsx>{`
                
            `}</style>
            <Navbar {...props} />
            <div className="wrp-index">
                
            </div>
        </>
    )
}

Home.propTypes = {
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

Home.defaultProps = {
    AuthUserInfo: null,
}

export default withAuthUser(withAuthUserInfo(Home))
