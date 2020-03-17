import { useState } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import priceConvert from '../utils/priceConvert'
import Button from '../components/button'
import Navbar from '../components/navbar'
import { get } from 'lodash'
import Textfield from '../components/textfield'
import withAuthUser from '../utils/pageWrappers/withAuthUser'
import withAuthUserInfo from '../utils/pageWrappers/withAuthUserInfo'
import firebase from 'firebase/app'
import 'firebase/auth'
import initFirebase from '../utils/initFirebase'
import Router from 'next/router'
import Product from '../components/product'
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css"

initFirebase()

const ViewProduct = props => {

    let urls = [
        "https://s12emagst.akamaized.net/products/4528/4527387/images/res_afa4aac2b65cd5736e38f4f278b09527_450x450_l4o1.jpg", 
        "https://s12emagst.akamaized.net/products/4528/4527387/images/res_ba95234e06c901becd35312782b712fc_450x450_6r3l.jpg", 
        "https://s12emagst.akamaized.net/products/4528/4527387/images/res_070500e90047be9120d28e1eb8fc4142_450x450_o68i.jpg", 
        "https://s12emagst.akamaized.net/products/4528/4527387/images/res_fe46efa9dcda4ea6351baace05a15581_450x450_bdnm.jpg",
        "https://s12emagst.akamaized.net/products/4528/4527387/images/res_6229d1b1261237a232b5f67d13529ce6_450x450_q9e4.jpg",
        "https://s12emagst.akamaized.net/products/4528/4527387/images/res_7b8d0abc4b5158d275c1c7f6cd843edb_450x450_e3bp.jpg",
        "https://s12emagst.akamaized.net/products/4528/4527387/images/res_05abbaa19776bea7a893766606fe009f_450x450_rka6.jpg",
        "https://s12emagst.akamaized.net/products/4528/4527387/images/res_8ac385114fabc3a810d6d3df6ca936fe_450x450_t82b.jpg",
        "https://s12emagst.akamaized.net/products/4528/4527387/images/res_d8211e274521cb689913d57ebc4f1609_450x450_mbn6.jpg",
        "https://s12emagst.akamaized.net/products/5747/5746210/images/res_993d05230cb923da18f5eec2ec02fdd6_450x450_162h.jpg",
        "https://s12emagst.akamaized.net/products/5747/5746210/images/res_3bd8e4ce008d7bca31e66bd6b44c76fd_450x450_nrck.jpg",
        "https://s12emagst.akamaized.net/products/5747/5746210/images/res_5df1009b930e65aa0894b971ac7f9bad_450x450_qd31.jpg"
    ]
    let images = urls.map(url => ({original: url, thumbnail: url}))
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

                .wrp-view > .view-content > .content-gallery {
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
            {/* <Navbar /> */}
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
                            Телевизор Smart Android LED Star-Light, 32" (81 cм), 32DM6500, HD
                        </h2>
                        <div className="preview-available">
                            {props.available || true ?
                                <>in stock</>
                                :
                                <>sold out</>
                            }
                        </div>
                        <div className="preview-price">
                            <span>{priceConvert(19.99, "лв")}</span>
                        </div>
                        <Button className="content-button"> 
                            Add to cart.
                        </Button>
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
                </div>
                <div className="view-suggestions">
                    {[...Array(6).keys()].map(i => (
                        <Product
                            key={i}
                            className="product"
                            image="https://stolche.info/wp-content/uploads/2017/03/PC-018-grey.jpg" 
                            name="Chair Milon, Grey, Wooden" 
                            price="19.99"
                            currency="лв"
                            available
                        />
                    ))}
                </div> */}
            </div>
        </>
    )
}

export default ViewProduct;