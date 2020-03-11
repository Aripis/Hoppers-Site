import { useState } from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types'
import priceConvert from '../utils/priceConvert'
import Button from './button';

const CardProduct = props => {

    return (
        <>
            <style jsx>{`
                .wrp-card {
                    margin: 0 1.8em;
                    display: flex;
                }

                .wrp-card > .card-image {
                }
            `}</style>
            <div className= "wrp-card">
                <div className="card-image" style={{backgroundImage: `url('${props.image}')`}}/>
                <div className="card-content">
                    <div className="content-name">
                        {props.name}
                    </div>
                    <div className="content-price">
                        {props.price}
                    </div>
                    <div className="content-provider">
                        {props.provider}
                    </div>
                    <div className="content-description">
                        {props.description}
                    </div>
                    <div className="content-available">
                        {props.available ? (
                            <>
                                is available
                            </>
                        ) : (
                            <>
                                isn't available
                            </>
                        )}
                    </div>
                    <Button className="card-button"> 
                        Add to cart.
                    </Button>
                </div>
            </div>
        </>
    )
}

export default CardProduct;