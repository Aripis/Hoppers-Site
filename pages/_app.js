import React from 'react'
import App from 'next/app'

import Navbar from '../components/navbar'
import Head from '../components/head'

export default class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props
        return (
            <>
                <Head />
                <style jsx global>{`
                    * {
                        box-sizing: border-box;
                    }
                    
                    html, body {
                        margin: 0;
                        font-family: Helvetica, Arial, sans-serif;
                    }

                    a {
                        text-decoration: none;
                    }
                `}</style>
                <div>
                    <Navbar />
                    <Component {...pageProps} />
                </div>
            </>
        )
    }
}