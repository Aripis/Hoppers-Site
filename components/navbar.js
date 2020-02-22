import { useState } from 'react';

const Navbar = () => {

    return (
        <>
            <style jsx>{`
                .wrp-navbar {
                    height: 60px;
                    justify-content: space-between;
                    align-items: center;
                    display: flex;
                }

                .wrp-navbar .navbar-logo {
                    margin-left: 20px;
                }

                .wrp-navbar .navbar-buttons {
                    display: flex;
                }

                .wrp-navbar .navbar-buttons > * {
                    padding: 20px 40px 20px 40px;
                    user-select: none;
                    cursor: pointer;
                    border-bottom: 1px solid transparent;
                    transition: .3s;
                }

                .wrp-navbar .navbar-buttons > *:hover {
                    border-bottom: 1px solid black;
                    text-shadow: 0 0 .65px #333, 0 0 .65px #333;
                    background-color: #f2f5f3;

                }

            `}</style>

            <nav className="wrp-navbar">
                <div className="navbar-logo">
                    <h1>Aripis</h1>
                </div>
                <div className="navbar-buttons">
                    <div>
                        Home
                    </div>
                    <div>
                        Shop
                    </div>
                    <div>
                        ifc
                    </div>
                    <div>
                        Sign in
                    </div>
                    <div>
                        Sign up
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;