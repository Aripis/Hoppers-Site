import { useState } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import priceConvert from '../utils/priceConvert'
import Button from './button'
import Router from 'next/router'

const Product = props => {
    return (
        <>
            <style jsx>{`                
                .wrp-card {
                    margin: .5em;
                    flex-shrink: 1;
                    max-width: 13em;
                    height: 18em;
                    box-shadow: 0 .065em .19em rgba(0,0,0,0.12), 0 .065em .125em rgba(0,0,0,0.24);
                    display: flex;
                    flex-direction: column;
                    border-radius: .3125em;
                    background-color: white;
                }

                .wrp-card > .card-image {
                    max-width: 100%;
                    border-radius: .3125em .3125em 0 0;
                    height: 11em;
                    background-size: contain;
                    background-position: center;
                    background-repeat: no-repeat;
                }

                .wrp-card > .card-content {
                    text-align: center;
                }

                .wrp-card > .card-content > .content-name {
                    font-weight: bold;
                    padding: .6em 1em;
                    word-break: break-word;
                }
                
                .wrp-card > .card-content > .content-available {
                    color: ${props.available ? "green" : "darkgrey"};
                    font-size: .9em;
                }

                .wrp-card > .card-content > .content-info {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-around;
                    align-items: center;
                    margin: .625em;
                }

                .wrp-card > .card-content > .content-info > .info-price {
                    color: red;
                    font-size: 1.125em;
                }

                .wrp-card > .card-content > .content-info > .info-actions > :global(.actions-button) {
                    font-size: .9em;
                    width: 7em;
                }

                @media only screen and (max-width: 425px){
                    .wrp-card {
                        max-width: 45%;
                    }
                    .wrp-card > .card-content > .content-info > .info-actions {
                        display: none;
                    }
                }
                
            `}</style>
            <div className={`wrp-card ${props.className || ""}`}>
                <div className="card-image" style={{backgroundImage: `url('${props.image}')`}}/>
                <div className="card-content">
                    <div className="content-name">
                        {props.name}
                    </div>
                    
                    <div className="content-available">
                        {props.available ?
                            <>in stock</>
                            :
                            <>sold out</>
                        }
                    </div>
                    <div className="content-info">
                        <div className="info-price">
                            {priceConvert(props.price, props.currency)}
                        </div>
                        
                        <div className="info-actions">
                                <Button 
                                    className="actions-button"
                                >
                                    <Link href={`/viewproduct?id=${props.id}`}>
                                        <a>See offer</a>
                                    </Link>
                                </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Product;