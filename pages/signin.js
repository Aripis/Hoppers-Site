import { useState } from 'react';
import Textfield from '../components/textfield'
import Button from '../components/button'

const Signin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

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
                    align-items: flex-end;
                    background-image: linear-gradient(to top, #d2d2d2, #e5e5e5);
                    border-radius: .3em;
                }

                .wrp-signin > .signin-form > .form-field {
                    width: 40em;
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
                    .wrp-signin > .signin-form > .form-field {
                        flex-direction: column;
                    }

                    .wrp-signin > .signin-form > .form-field > .form-div:nth-child(even),
                    .wrp-signin > .signin-form > .form-field > .form-div:nth-child(odd) {
                        margin: 0;
                    }

                    .wrp-signin > .signin-form > .form-field {
                        width: 100%;
                        margin-top: 0;
                    }

                    .wrp-signin > .signin-form > .form-field > .form-div > :global(.form-input) {
                        margin-top: 1.4em;
                    }

                    .wrp-signin > .signin-form > .form-field > :global(.form-submit) {
                        margin-top: 1em;
                    }

                    .form-div > label {
                        margin: 2.2em 1.05em 0;
                        font-size: 1em;
                    }

                    :global(.form-input):focus + label {
                        margin: .2em 0 0 0;
                    }
                }

                @media only screen and (max-width: 545px){
                    .wrp-signin > .signin-form {
                        padding: 4em 2em 5em;
                        align-items: center;
                    }

                    .wrp-signin > .signin-form > .form-header {
                        // font-size: 1.5em;
                    }
                }
            `}</style>
            <div className="wrp-signin">
                <form onSubmit={e => e.preventDefault()} className="signin-form">
                    <h2 className="form-header">Sign into your account</h2>
                    <div className="form-field">
                        <div className="form-div">
                            <Textfield value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-input" />
                            <label className="required">Email</label>
                        </div>
                    </div>
                    <div className="form-field">
                        <div className="form-div">
                            <Textfield value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-input" />
                            <label className="required">Password</label>
                        </div>
                    </div>
                    <div className="form-actions">
                        <Button type="submit" value="Sign in" className="form-submit" />
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signin;