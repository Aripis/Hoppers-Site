import { useState } from 'react';
import Link from 'next/link'

const Navbar = () => {
    return (
        <>
            <style jsx>{`
                .wrp-navbar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background-color: #FAFBFD;
                }

                .wrp-navbar > .navbar-logo {
                    margin-left: 1.250em;
                }

                .wrp-navbar > .navbar-buttons {
                    display: flex;
                }

                .wrp-navbar > .navbar-buttons > :global(a) {
                    display: inline-block;
                    padding: 1.55em 2.5em;
                    user-select: none;
                    color: #444;
                    cursor: pointer;
                    transition: .3s;
                }

                .wrp-navbar > .navbar-buttons > :global(a):hover {
                    text-shadow: 0 0 .65px black, 0 0 .65px black;
                    color: black;
                }

            `}</style>

            <nav className="wrp-navbar">
                <div className="navbar-logo">
                    <h1>Aripis</h1>
                </div>
                <div className="navbar-buttons">
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                    <Link href="/shop">
                        <a>Shop</a>
                    </Link>
                    <Link href="">
                        <a>ifc</a>
                    </Link>
                    <Link href="/signin">
                        <a>Sign in</a>
                    </Link>
                    <Link href="/signup">
                        <a>Sign up</a>
                    </Link>
                </div>
            </nav>
        </>
    );
}

export default Navbar;