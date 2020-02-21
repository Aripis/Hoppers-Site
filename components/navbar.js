import React, { useState } from 'react';

const Navbar = () => {

    return (
        <>
            <style jsx>{`
                .wrp-navbar {
                    height: 80px;
                    background-color: blue;
                    color: white;
                    justify-content: space-between;
                    align-items: center;
                    display: flex;
                }

                .wrp-navbar .navbar-logo{

                }

                .wrp-navbar .navbar-buttons{
                    display: flex;
                }

                .wrp-navbar .navbar-buttons > *{
                    cursor: pointer;
                }
            `}</style>

            <nav className="wrp-navbar">
                <div className="navbar-logo">
                    <h1>Aripis</h1>
                </div>
                <div className="navbar-buttons">
                    <div>
                        Kalata
                    </div>
                    <div>
                        Ivan
                    </div>
                    <div>
                        Hoppers
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;