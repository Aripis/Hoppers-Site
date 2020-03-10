import { useState } from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types'
import { get } from 'lodash/object'
import logout from '../utils/auth/logout'
import Router from 'next/router'

const Product = props => {
    return (
        <>
            <style jsx>{`                
                .wrp-card {
                    margin: 1em;
                    width: 100%;
                    max-width: 13em;
                    border: 2px solid black;
                    
                }

                
            `}</style>
            <div className="wrp-card">
                <div className="card-header" style={{backgroundImage: `url('${props.imageUrl}')`}}/>
                <div className="card-content">
                    <div className="content-name">
                        {props.name}
                    </div>
                    
                    <div className="content-price">
                        {props.price}
                    </div>
                    
                    <div className="content-available">
                        {props.available}
                    </div>
                    
                    <div className="content-moreInfo">
                        {props.moreInfo}
                    </div>
                    
                </div>
            </div>

        </>
    );
}

export default Product;