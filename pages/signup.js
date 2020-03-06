import { useState } from 'react';
import PropTypes from 'prop-types'
import { get } from 'lodash'
import Textfield from '../components/textfield'
import Button from '../components/button'
import Navbar from '../components/navbar'
import Head from '../components/head'
import withAuthUser from '../utils/pageWrappers/withAuthUser'
import withAuthUserInfo from '../utils/pageWrappers/withAuthUserInfo'
import firebase from 'firebase/app'
import 'firebase/auth'
import initFirebase from '../utils/auth/initFirebase'
import Router from 'next/router'

initFirebase()

const Signup = props => {
    const [firstName, setFirstName] = useState("")
    const [surName, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [reEmail, setReEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rePassword, setRePassword] = useState("")
    const [loadingSignUp, setLoadingSignUp] = useState(false)
    const [error, setError] = useState("")

    const handleSignUp = e => {
        e.preventDefault()
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            Router.replace('/')
        })
        .catch(error => {
            setLoadingSignUp(false)
            setError(error)
        })
    }

    return (
        <>
            <Head />
            <style jsx>{`
                .wrp-signup {
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

                .wrp-signup > .signup-form {
                    padding: 4em 6em 5em;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    background-image: linear-gradient(to top, #d2d2d2, #e5e5e5);
                    border-radius: .3em;
                    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
                }

                .wrp-signup > .signup-form > .form-field {
                    width: 50em;
                }

                .wrp-signup > .signup-form > .form-field,
                .wrp-signup > .signup-form > .form-actions {
                    display:flex;
                    flex-direction: row;
                    justify-content: center;
                    margin-top: 1.4em;
                }

                .wrp-signup > .signup-form > .form-actions > :global(.form-submit) {
                    font-size: 1.1em;
                }

                .wrp-signup > .signup-form > .form-header {
                    align-self: center;
                    font-size: 2em;
                }

                .wrp-signup > .signup-form > .form-field > .form-div {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                }

                .wrp-signup > .signup-form > .form-field > .form-div:nth-child(even):not(:only-child) {
                    margin-left: .3em;
                }

                .wrp-signup > .signup-form > .form-field > .form-div:nth-child(odd):not(:only-child) {
                    margin-right: .3em;
                }

                .wrp-signup > .signup-form > .form-field > .form-div > :global(.form-input) {
                    font-size: 1em;
                }

                .form-div > label {
                    color: grey;
                    position: absolute;
                    margin: .81em 1.05em 0;
                    font-size: 1em;
                    user-select: none;
                    transform: translateZ(0);
                    transition: .2s;
                    pointer-events: none;
                }

                .form-div .required:after{
                    content: '*';
                    color: red;
                    margin-left: .25em;
                }

                :global(.form-input:not([value=""])) + label{
                    margin: -1.5em 0 0 .3em;
                    color: black;
                    font-size: .75em;
                }

                :global(.form-input):focus + label {
                    margin: -1.5em 0 0 .3em;
                    color: #0089fa;
                    font-size: .75em;
                }

                @media only screen and (max-width: 985px){
                    .wrp-signup > .signup-form > .form-field {
                        flex-direction: column;
                    }

                    .wrp-signup > .signup-form > .form-field > .form-div:nth-child(even):not(:only-child),
                    .wrp-signup > .signup-form > .form-field > .form-div:nth-child(odd):not(:only-child) {
                        margin: 0;
                    }

                    .wrp-signup > .signup-form > .form-field {
                        width: 100%;
                        margin-top: 0;
                    }

                    .wrp-signup > .signup-form > .form-field > .form-div > :global(.form-input) {
                        margin-top: 1.4em;
                    }

                    .wrp-signup > .signup-form > .form-field > :global(.form-submit) {
                        margin-top: 1em;
                    }

                    .form-div > label {
                        margin: 2.2em 1.05em 0;
                        font-size: 1em;
                    }

                    :global(.form-input:not([value=""])) + label{
                        margin: .2em 0 0 0;
                    }

                    :global(.form-input):focus + label {
                        margin: .2em 0 0 0;
                    }
                }

                @media only screen and (max-width: 545px){
                    .wrp-signup > .signup-form {
                        padding: 4em 2em 5em;
                        align-items: center;
                    }

                    .wrp-signup > .signup-form > .form-header {
                        font-size: 1.5em;
                    }
                }
            `}</style>
            <Navbar {...props}/>
            <div className="wrp-signup">
                <form onSubmit={handleSignUp} className="signup-form">
                    <h2 className="form-header">Create your new profile</h2>
                    <div className="form-field">
                        <div className="form-div">
                            <Textfield error={error} label="First name" id="firstname" value={firstName} required onChange={e => setFirstName(e.target.value)} className="form-input"/>
                        </div>
                        <div className="form-div">
                            <Textfield error={error} label="Surname" id="surname" value={surName} required onChange={e => setSurname(e.target.value)} className="form-input"/>
                        </div>
                    </div>
                    <div className="form-field">
                        <div className="form-div">
                            <Textfield error={error} label="Email" id="email" value={email} required onChange={e => setEmail(e.target.value)} type="email" className="form-input"/>
                        </div>
                        <div className="form-div">
                            <Textfield error={error} label="Retype email" id="retypeemail" value={reEmail} required onChange={e => setReEmail(e.target.value)} type="email"  className="form-input"/>
                        </div>
                    </div>
                    <div className="form-field">
                        <div className="form-div">
                            <Textfield error={error} label="Password" id="password" value={password} required onChange={e => setPassword(e.target.value)} type="password" className="form-input"/>
                        </div>
                        <div className="form-div">
                            <Textfield error={error} label="Retype password" id="retypepassword" value={rePassword} required onChange={e => setRePassword(e.target.value)} type="password" className="form-input"/>
                        </div>
                    </div>
                    <div className="form-actions">
                        <Button loading={loadingSignUp} onClick={() => setLoadingSignUp(!loadingSignUp)} type="submit" className="form-submit">
                            Sign up
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}

Signup.getInitialProps = async ctx => {
    const AuthUserInfo = get(ctx, 'myCustomData.AuthUserInfo', null)
    const AuthUser = get(AuthUserInfo, 'AuthUser', null)
    if(AuthUser !== null){
        ctx.res.writeHead(302, { Location: '/' })
        ctx.res.end()
        return
    }
    return
}

Signup.propTypes = {
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

Signup.defaultProps = {
    AuthUserInfo: null,
}

export default withAuthUser(withAuthUserInfo(Signup))