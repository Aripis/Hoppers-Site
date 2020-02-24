import React from 'react'
import App from 'next/app'

import Head from '../components/head'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

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
                    {/* <Navbar /> */}
                    <Component {...pageProps} />
                    {/* <Footer /> */}
                </div>
            </>
        )
    }
}