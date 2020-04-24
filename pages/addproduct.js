import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../components/button';
import Navbar from '../components/navbar';
import { get } from 'lodash';
import searchQueries from '../utils/searchQueries';
import Textfield from '../components/textfield';
import withAuthUser from '../utils/pageWrappers/withAuthUser';
import withAuthUserInfo from '../utils/pageWrappers/withAuthUserInfo';
import firebase from 'firebase/app';
import "firebase/firestore";
import 'firebase/auth';
import initFirebase from '../utils/initFirebase';
import Router from 'next/router';
import ImageGallery from 'react-image-gallery';

initFirebase()

const AddProduct = props => {
    const { AuthUserInfo } = props
    const AuthUser = get(AuthUserInfo, 'AuthUser', null)

    const [name, setName] = useState("")
    const [productId, setProductId] = useState("")
    const [price, setPrice] = useState("")
    const [urls, setUrls] = useState("")
    const [loadingAdd, setLoadingAdd] = useState(false)
    const [loadingCancel, setLoadingCancel] = useState(false)
    const [available, setAvailable] = useState(false)

    const addProduct = () => {
        setLoadingAdd(true)
        firebase.firestore().collection("products").add({
            productId: productId,
            name: name,
            price: price,
            urls: urls.split(/[ ,]+/),
            uid: AuthUser.id,
            available: available,
            searchQueries: searchQueries(name)
        }).then(() => Router.replace("/store"))
    }

    const cancelAdd = () => {
        setLoadingCancel(true)
        Router.replace("/store")
    }

    return (
        <>
            <style jsx>{`
                .wrp-add {
                    margin: 1em 1.8em;
                    display: flex;
                    flex-grow: 1;
                    flex-direction: column;
                }

                .wrp-add > .add-content {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                }

                .wrp-add > .add-content {
                    margin: 1em;
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
            <div className="wrp-add">
                <div className="add-content">
                    <div className="content-gallery">
                        <ImageGallery
                            slideDuration={350}
                            showPlayButton={false}
                            showFullscreenButton={false}
                            items={
                                urls.length > 0
                                    ?
                                    urls.split(/[ ,]+/).map(url => ({ original: url, thumbnail: url }))
                                    :
                                    [{ original: "https://bit.ly/39bL8Gi", thumbnail: "https://bit.ly/39bL8Gi" }]
                            }
                        />
                    </div>
                    <div className="content-fields">
                        <Textfield
                            placeholder="Id"
                            value={productId}
                            onChange={e => setProductId(e.target.value)}
                            className="add-product-id" />
                        <Textfield
                            placeholder="Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="add-name" />
                        <div className="add-available">
                            <input
                                type="checkbox"
                                checked={available}
                                onChange={e => setAvailable(e.target.checked)}
                                id="available"
                                name="available"
                                value="Bike" />
                            <label htmlFor="available">Available</label>
                        </div>
                        <Textfield
                            placeholder="Price"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            className="add-price" />
                        <Textfield
                            placeholder="Image Urls"
                            value={urls}
                            onChange={e => setUrls(e.target.value)}
                            className="add-urls" />
                        <Button
                            loading={loadingAdd}
                            onClick={addProduct}
                            className="add-submit-add"
                        >
                            Add product
                        </Button>
                        <Button
                            loading={loadingCancel}
                            onClick={cancelAdd}
                            className="add-cancel-add"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

AddProduct.getInitialProps = async ctx => {
    const AuthUserInfo = get(ctx, 'myCustomData.AuthUserInfo', null)
    const AuthUser = get(AuthUserInfo, 'AuthUser', null)
    if ((AuthUser === null || AuthUser.role !== 'creator') && ctx.res) {
        ctx.res.writeHead(302, { Location: '/' })
        ctx.res.end()
        return
    }
    return
}

AddProduct.propTypes = {
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

AddProduct.defaultProps = {
    AuthUserInfo: null,
}

export default withAuthUser(withAuthUserInfo(AddProduct));