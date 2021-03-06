import PropTypes from 'prop-types';
import priceConvert from '../utils/priceConvert';
import Button from '../components/button';
import Navbar from '../components/navbar';
import { get } from 'lodash';
import withAuthUser from '../utils/pageWrappers/withAuthUser';
import withAuthUserInfo from '../utils/pageWrappers/withAuthUserInfo';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import initFirebase from '../utils/initFirebase';
import ImageGallery from 'react-image-gallery';
import Link from 'next/link';
import CartContext from '../contexts/cartContext';
import { useContext, useState, useEffect } from 'react';
import Product from '../components/product';

initFirebase()

const ViewProduct = props => {
    const { AuthUserInfo } = props
    const AuthUser = get(AuthUserInfo, 'AuthUser', null)
    const [images, setImages] = useState([])
    const { cartContext, setCartContext } = useContext(CartContext)
    const [products, setProducts] = useState([])

    useEffect(() => {
        (async () => {
            if (AuthUser) {
                await firebase.firestore().collection("users").doc(AuthUser.id).update(
                    `categories.${props.category}`,
                    firebase.firestore.FieldValue.increment(1)
                )
            } else {
                let uspref = localStorage.getItem("user_preferences")
                if (uspref === null) {
                    uspref = {
                        [props.category]: 1
                    }
                } else {
                    uspref = JSON.parse(uspref)
                    if (uspref[props.category]) {
                        uspref[props.category]++
                    } else {
                        uspref = {
                            ...uspref,
                            [props.category]: 1
                        }
                    }
                }
                localStorage.setItem("user_preferences", JSON.stringify(uspref))
            }

            const images = await firebase.storage().ref().child(`products/${props.id}`).listAll()
            const imagesUrl = await Promise.all(images.items.map(itemRef => itemRef.getDownloadURL()))
            let mappedImages = imagesUrl.map(url => ({ original: url, thumbnail: url }))
            setImages(mappedImages)
        })()

        firebase.firestore().collection("products").where("category", "==", props.category).where("available", "==", true).limit(5).onSnapshot(async snapshot => {
            setProducts(await Promise.all(snapshot.docs
                .filter(doc => doc.id != props.id)
                .map(async  doc => {
                    const products = await firebase.storage().ref().child(`products/${doc.id}`).listAll()
                    const imagesUrl = await Promise.all(products.items.map(itemRef => itemRef.getDownloadURL()))
                    return { ...doc.data(), id: doc.id, urls: imagesUrl }
                })))
        })

    }, [images])


    const addToCart = async () => {
        if (AuthUser) {
            firebase.firestore().collection(`users/${AuthUser.id}/cart`).doc(props.id).get().then(doc => {
                if (doc.exists) {
                    firebase.firestore().collection(`users/${AuthUser.id}/cart`).doc(props.id).update({
                        quantity: doc.data().quantity + 1,
                    })
                } else {
                    firebase.firestore().collection(`users/${AuthUser.id}/cart`).doc(props.id).set({
                        quantity: 1,
                        productId: props.productId,
                        price: parseFloat(props.price)
                    })
                }
            })
        } else {
            let cart = localStorage.getItem("cart")
            if (cart === null) {
                cart = {
                    [props.id]: {
                        quantity: 1,
                        productId: props.productId,
                        price: props.price
                    }
                }
            } else {
                cart = JSON.parse(cart)
                if (cart[props.id]) {
                    cart[props.id].quantity++
                } else {
                    cart = {
                        ...cart,
                        [props.id]: {
                            quantity: 1,
                            productId: props.productId,
                            price: props.price
                        }
                    }
                }
            }
            localStorage.setItem("cart", JSON.stringify(cart))
        }
        setCartContext(true)
    }

    return (
        <>
            <style jsx>{`
                .wrp-view {
                    margin: 1em 1.8em;
                    display: flex;
                    flex-grow: 1;
                    flex-direction: column;
                }

                .wrp-view > .view-content {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                }

                .wrp-view > .view-content > * {
                    margin: 1em;
                }

                .wrp-view > .view-details {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-around;
                }
                
                .wrp-view > .view-details > *{
                    width: 100%;
                    max-width: 7em;
                    word-break: break-word;
                    margin: 1em;
                }
                
                .wrp-view > .view-suggestions {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-evenly;
                }

                :global(.image-gallery .image-gallery-image){
                    width: 100vw;
                    max-width: 45em;
                    max-height: 28em!important;
                }

                :global(.image-gallery .image-gallery-thumbnails-wrapper.bottom){
                    width: 100vw;
                    max-width: 45em;
                }

                :global(.image-gallery .image-gallery-thumbnail){
                    border: .2em solid transparent;
                    padding: .625em;
                    transition: .2s;
                    min-height: 7em;
                    margin-left: .625em;
                    margin-right: .625em;
                }

                :global(.image-gallery .image-gallery-thumbnail:hover){
                    border: .2em solid #36a5ff;
                    border-radius: .3em;
                }

                :global(.image-gallery .image-gallery-thumbnail.active,
                        .image-gallery .image-gallery-thumbnail:focus){
                    border: .2em solid #006dc7;
                    border-radius: .3em;
                    transform: scale(.9);
                }

                :global(.image-gallery .image-gallery-icon:focus,
                        .image-gallery .image-gallery-icon:hover) {
                    outline: none;
                    color: #36a5ff;
                }

                :global(.image-gallery .image-gallery-slide){
                    outline:none;
                }

                .wrp-view > .view-content > .content-preview > .preview-available {
                    color: ${props.available || true ? "green" : "darkgrey"};
                    font-size: 1.2em;
                }

                .wrp-view > .view-content > .content-preview > .preview-price > span:last-child {
                    color: red;
                    font-size: 2em;
                }

                @media only screen and (max-width: 520px) {
                    :global(.image-gallery .image-gallery-image){
                        max-width: 40em;
                        max-height: 20em!important;
                    }
                }

                @media only screen and (max-width: 390px) {
                    :global(.image-gallery .image-gallery-thumbnail){
                        width: 100%;
                        max-width: 5.5em;
                        margin-left: .2em;
                        margin-right: .2em;
                    }
                }

            `}</style>

            <Navbar {...props} />
            <div className="wrp-view">
                <div className="view-content">
                    <div className="content-gallery">
                        <ImageGallery
                            slideDuration={350}
                            showPlayButton={false}
                            showFullscreenButton={false}
                            items={images}
                        />
                    </div>
                    <div className="content-preview">
                        <h2 className="preview-name">
                            {props.name}
                        </h2>
                        <div className="preview-available">
                            {props.available ?
                                "in stock"
                                :
                                "sold out"
                            }
                        </div>
                        <div className="preview-price">
                            <span>{priceConvert(props.price, "лв")}</span>
                        </div>
                        {AuthUser && AuthUser.id === props.uid
                            ?
                            <Button className="content-button">
                                <Link href={`/editproduct?id=${props.id}`}>
                                    <a>Edit product</a>
                                </Link>
                            </Button>
                            :
                            <Button
                                className="content-button"
                                onClick={addToCart}
                            >
                                Add to cart.
                            </Button>
                        }
                    </div>
                </div>
                {/* <div className="view-details">
                        <div className="details-description">
                            Description<br />
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem
                        </div>
                        <div className="details-faq">
                            Faq<br />
                            1.<br />
                            2.<br />
                            3.<br />
                            4.<br />
                        </div>
                        <div className="details-reviews">
                            Reviews <br />
                            1.<br />
                            2.<br />
                            3.<br />
                            4.<br />
                        </div>
                        <div className="details-specs">
                            Specs <br />
                            1.<br />
                            2.<br />
                            3.<br />
                            4.<br />
                        </div>
                    </div> */}
                <div className="view-suggestions">
                    {products.map(product => (
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

ViewProduct.getInitialProps = async ctx => {
    const doc = await firebase.firestore().collection("products").doc(ctx.query.id).get()
    return { ...doc.data(), id: ctx.query.id, urls: [] }
}

ViewProduct.propTypes = {
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
    name: PropTypes.string,
    available: PropTypes.bool
}

ViewProduct.defaultProps = {
    AuthUserInfo: null,
}

export default withAuthUser(withAuthUserInfo(ViewProduct));