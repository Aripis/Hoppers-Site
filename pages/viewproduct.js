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

initFirebase()

const ViewProduct = props => {

    let images = []
    for (let i = 0; i < 5; i++){
        images [i] = {original: "https://stolche.info/wp-content/uploads/2017/03/PC-018-grey.jpg",
                      thumbnail: "https://stolche.info/wp-content/uploads/2017/03/PC-018-grey.jpg",
                      sizes: "50px, 20px"};
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
                    justify-content: space-between;
                }

                .wrp-view > .view-content > * {
                    margin: 1em;
                }

                .wrp-view > .content-gallery > * {
                    max-width: 3em;
                    max-height: 3em;
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


            `}</style>
            <Navbar />
            <div className="wrp-view">
                <div className="view-content">
                    <div className="content-gallery">
                        <ImageGallery
                            disableThumbnailScroll
                            slideInterval={1500}
                            startIndex={0}
                            showPlayButton={false}
                            items={images}
                        />
                    </div>
                    <div className="content-prereview">
                        <div className="prereview-name">
                            Name: Aldus PageMaker including versions of Lorem Ipsum.
                        </div>
                        <div className="prereview-price">
                            Price: 19.99
                        </div>
                        <div className="prereview-provider">
                            Provider: Aripis Ltd.
                        </div>
                        <div className="prereview-available">
                            is available
                        </div>
                        <Button className="content-button"> 
                            Add to cart.
                        </Button>
                    </div>
                </div>
                <div className="view-details">
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
                </div>
            </div>
        </>
    )
}

export default ViewProduct;