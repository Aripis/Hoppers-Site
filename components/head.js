import React from 'react';
import NextHead from 'next/head';
import PropTypes from 'prop-types'

const Head = props => (
    <NextHead>
        <meta charSet="UTF-8" />
        <title>{props.title || ''}</title>
        <meta
            name="description"
            content={props.description || ''}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:url" content={props.url || ''} />
        <meta property="og:title" content={props.title || ''} />
        <meta
            property="og:description"
            content={props.description || ''}
        />
        <meta name="twitter:site" content={props.url || ''} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={props.ogImage || ''} />
        <meta property="og:image" content={props.ogImage || ''} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
    </NextHead>
);

Head.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
    ogImage: PropTypes.string,
};

export default Head;
