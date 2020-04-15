import { useContext, useEffect } from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types'
import { get } from 'lodash/object'
import logout from '../utils/auth/logout'
import Router from 'next/router'
import CartContext from '../contexts/cartContext'

const Navbar = props => {
    const { AuthUserInfo } = props
    const AuthUser = get(AuthUserInfo, 'AuthUser', null)
    const { cartState, setCartState } = useContext(CartContext)

    useEffect(() => {
        const cart = Object.values({...localStorage}).map(product => JSON.parse(product))
        setCartState(false)
    }, [cartState])

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
                    {AuthUser &&
                        <>
                            <Link href="/addproduct">
                                <a>Add Product</a>
                            </Link>
                        </>
                    }
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                    <Link href="/store">
                        <a>Store</a>
                    </Link>
                    {/* <Link href="">
                        <a>ifc</a>
                    </Link> */}
                    {!AuthUser ? (
                        <>
                            <Link href="/signin">
                                <a>Sign in</a>
                            </Link>
                            <Link href="/signup">
                                <a>Sign up</a>
                            </Link>
                        </>
                    ) : (
                        <a onClick={async () => {
                            try {
                              await logout()
                              Router.push('/')
                            } catch (e) {
                              console.error(e)
                            }
                          }}>Log out</a>
                    )}
                </div>
            </nav>
        </>
    );
}

Navbar.propTypes = {
    AuthUserInfo: PropTypes.shape({
        AuthUser: PropTypes.shape({
            id: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            emailVerified: PropTypes.bool.isRequired,
        }),
        token: PropTypes.string,
    }),
    data: PropTypes.shape({
        user: PropTypes.shape({
            id: PropTypes.string,
        }).isRequired
    }),
}

Navbar.defaultProps = {
    AuthUserInfo: null,
}

export default Navbar;