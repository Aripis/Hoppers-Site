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
    const [categories, setCategories] = useState(["food", "phone", "other"])

    useEffect(() => {
        (async () => {
            let user = await firebase.firestore().collection("users").doc(AuthUser.id).get()
            let categories = user.data().categories
            categories = Object.keys(categories).sort((a, b) => categories[b] - categories[a])
            let another = []
            categories.forEach(async (category) => {
                let prod = await firebase.firestore().collection("products").where("category", "==", category).limit(5).get()
                let all = await Promise.all(prod.docs
                    .map(async  doc => {
                        const products = await firebase.storage().ref().child(`products/${doc.id}`).listAll()
                        const imagesUrl = await Promise.all(products.items.map(itemRef => itemRef.getDownloadURL()))
                        return { ...doc.data(), id: doc.id, urls: imagesUrl }
                    }))
                another = [...another, ...all]
                setProducts(another)
            })
        })()
    }, [])

    return (
        <>
            <style jsx>{`
                
            `}</style>
            <Navbar {...props} />
            <div className="wrp-index">
                <div className="view-suggestions">
                    {console.log(products)}
                    {products && products.length > 0 && products.map(product => (
                        <Product
                            key={product.id}
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
