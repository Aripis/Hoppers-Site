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
                    @import url('https://fonts.googleapis.com/css?family=Montserrat:400,600,700&display=swap');                    
                    
                    * {
                        box-sizing: border-box;
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                    }
                    
                    html, body {
                        margin: 0;
                        font-family: 'Мontserrat', Helvetica, Arial, sans-serif;
                        -webkit-tap-highlight-color: transparent;
                    }

                    a {
                        text-decoration: none;
                    }

                    .layout{
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        align-items: space-between;
                        height: 100vh;
                    }

                    @media only screen and (min-width: 1024px){
                        /* width */
                        ::-webkit-scrollbar {
                          width: 9px;
                        }
              
                        /* Track */
                        ::-webkit-scrollbar-track {
                          // background: #f1f1f1;
                          background: transparent; 
                        }
                        
                        /* Handle */
                        ::-webkit-scrollbar-thumb {
                          background: #999; 
                          border-radius:5px;
              
                        }
              
                        /* Handle on hover */
                        ::-webkit-scrollbar-thumb:hover {
                          background: #777; 
                        }

                        /* Handle on hold */
                        ::-webkit-scrollbar-thumb:active {
                            background: #555; 
                          }
                    }

                `}</style>
                <div className="layout">
                    <Navbar />
                    <Component {...pageProps} />
                    <Footer />
                </div>
            </>
        )
    }
}