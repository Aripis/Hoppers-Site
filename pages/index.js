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
            let tmp = categories
            if (AuthUser) {
                let user = await firebase.firestore().collection("users").doc(AuthUser.id).get()
                if (user.data().categories) {
                    tmp = Object.keys(user.data().categories).sort((a, b) => user.data().categories[b] - user.data().categories[a])
                    setCategories(tmp)
                }
            } else {
                let uspref = localStorage.getItem("user_preferences")
                if (uspref != null) {
                    uspref = JSON.parse(uspref)
                    tmp = [...Object.keys(uspref)]
                }
            }
            let tmpProducts = []
            for (const category of tmp) {
                let prod = await firebase.firestore().collection("products").where("category", "==", category).where("available", "==", true).limit(5).get()
                let all = await Promise.all(prod.docs
                    .map(async  doc => {
                        const products = await firebase.storage().ref().child(`products/${doc.id}`).listAll()
                        const imagesUrl = await Promise.all(products.items.map(itemRef => itemRef.getDownloadURL()))
                        return { ...doc.data(), id: doc.id, urls: imagesUrl }
                    }))
                tmpProducts = [...tmpProducts, ...all]
            }
            setProducts(tmpProducts)
        })()
    }, [])

    return (
        <>
            <style jsx>{`
                .wrp-index {
                    flex-grow: 1;
                    display: flex;
                    flex-flow: row wrap;
                    justify-content: center;
                    background-color: #E9EBEE;
                    padding-left: 10em;
                    padding-right: 10em;
                }

                .wrp-index .view-suggestions {
                    flex: 1;
                    margin-top: 2em;
                    display:flex;
                    justify-content: center;
                }
            `}</style>
            <Navbar {...props} />
            <div className="wrp-index">
                <div className="view-suggestions">
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
