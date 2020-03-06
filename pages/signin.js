import { useState } from 'react';
import PropTypes from 'prop-types'
import { get } from 'lodash'
import Textfield from '../components/textfield'
import Button from '../components/button'
import Navbar from '../components/navbar'
import Message from '../components/message'
import withAuthUser from '../utils/pageWrappers/withAuthUser'
import withAuthUserInfo from '../utils/pageWrappers/withAuthUserInfo'
import firebase from 'firebase/app'
import 'firebase/auth'
import initFirebase from '../utils/auth/initFirebase'
import Router from 'next/router'

initFirebase()

const Signin = props => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loadingSignIn, setLoadingSignIn] = useState(false)
    const [error, setError] = useState("")

    const handleSignIn = e => {
        e.preventDefault()
        setLoadingSignIn(!loadingSignIn)
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            Router.replace('/')
        })
        .catch(error => {
            setError(error.message)
            setLoadingSignIn(false)
        })
    }

    return (
        <>
            <style jsx>{`
                .wrp-signin {
                    flex-grow: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-image: url("https://miro.medium.com/max/11416/0*Mjaw2WtpiOUiz2dy");
                    background-repeat: no-repeat;
                    background-size: cover;
                    background-position: center;
                    background-attachment: fixed;  
                }

                .wrp-signin > .signin-form {
                    padding: 4em 6em 5em;
                    display: flex;
                    flex-direction: column;
                    background-image: linear-gradient(to top, #d2d2d2, #e5e5e5);
                    border-radius: .3em;
                    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
                }

                .wrp-signin > .signin-form > .form-field, 
                .wrp-signin > .signin-form > :global(.form-message) {
                    width: 100%;
                }

                .wrp-signin > .signin-form > :global(.form-message) {
                    margin-top: 1em;
                }

                .wrp-signin > .signin-form > .form-actions {
                    align-self: flex-end;
                }

                .wrp-signin > .signin-form > .form-field,
                .wrp-signin > .signin-form > .form-actions {
                    display:flex;
                    flex-direction: row;
                    justify-content: center;
                    margin-top: 1.4em;
                }

                .wrp-signin > .signin-form > .form-actions > :global(.form-submit) {
                    font-size: 1.1em;
                }

                .wrp-signin > .signin-form > .form-header {
                    align-self: center;
                    font-size: 2em;
                }

                .wrp-signin > .signin-form > .form-field > .form-div {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                }

                .wrp-signin > .signin-form > .form-field > .form-div:nth-child(even):not(:only-child) {
                    margin-left: .3em;
                }
                
                .wrp-signin > .signin-form > .form-field > .form-div:nth-child(odd):not(:only-child) {
                    margin-right: .3em;
                }

                .wrp-signin > .signin-form > .form-field > .form-div > :global(.form-input) {
                    font-size: 1em;
                }

                @media only screen and (max-width: 985px){
                    .wrp-signin > .signin-form > .form-field {
                        flex-direction: column;
                    }

                    .wrp-signin > .signin-form > .form-field > .form-div:nth-child(even):not(:only-child),
                    .wrp-signin > .signin-form > .form-field > .form-div:nth-child(odd):not(:only-child) {
                        margin: 0;
                    }

                    .wrp-signin > .signin-form > .form-field {
                        margin-top: 0;
                    }

                    .wrp-signin > .signin-form > .form-field > .form-div > :global(.form-input) {
                        margin-top: 1.4em;
                    }

                    .wrp-signin > .signin-form > .form-field > :global(.form-submit) {
                        margin-top: 1em;
                    }
                }

                @media only screen and (max-width: 545px){
                    .wrp-signin > .signin-form {
                        padding: 4em 2em 5em;
                        align-items: center;
                    }

                    .wrp-signin > .signin-form > .form-header {
                        font-size: 1.5em;
                    }
                }
            `}</style>
            <Navbar {...props}/>
            <div className="wrp-signin">
                <form onSubmit={handleSignIn} className="signin-form">
                    <h2 className="form-header">Sign into your account</h2>
                    <div className="form-field">
                        <div className="form-div">
                            <Textfield label="Email" error={error} id="email" value={email} onChange={e => {setEmail(e.target.value); setError("")}} type="email" className="form-input" />
                        </div>
                    </div>
                    <div className="form-field">
                        <div className="form-div">
                            <Textfield label="Password" error={error} id="password" value={password} onChange={e => {setPassword(e.target.value); setError("")}} type="password" className="form-input" />
                        </div>
                    </div>
                    <Message 
                        visible={error} 
                        error={error} 
                        className="form-message" 
                        header="An error occurred"
                        content={error}
                    />
                    <div className="form-actions">
                        <Button loading={loadingSignIn} type="submit" className="form-submit">
                            Sign in
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}

Signin.getInitialProps = async ctx => {
    const AuthUserInfo = get(ctx, 'myCustomData.AuthUserInfo', null)
    const AuthUser = get(AuthUserInfo, 'AuthUser', null)
    if(AuthUser !== null){
        ctx.res.writeHead(302, { Location: '/' })
        ctx.res.end()
        return
    }
    return
}

Signin.propTypes = {
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

Signin.defaultProps = {
    AuthUserInfo: null,
}

export default withAuthUser(withAuthUserInfo(Signin))