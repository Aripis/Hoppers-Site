import { useState } from 'react';
import Textfield from '../components/textfield'
import Button from '../components/button'
import Head from '../components/head'

const Signup = () => {
    const [firstName, setFirstName] = useState("")
    const [surName, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [reEmail, setReEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rePassword, setRePassword] = useState("")

    return (
        <>
            <Head />
            <style jsx>{`
                .wrp-signup {
                    height: calc(100vh - 60px); 
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-image: url("https://miro.medium.com/max/11416/0*Mjaw2WtpiOUiz2dy");
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
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
                }

                .wrp-signup > .signup-form > .form-field {
                    display:flex;
                    flex-direction: row;
                    justify-content: center;
                    margin-top: 1.4em;
                }

                .wrp-signup > .signup-form > .form-field > :global(.form-submit) {
                    font-size: 1.1em;
                }

                .wrp-signup > .signup-form > .form-header {
                    align-self: center;
                    font-size: 2em;
                }

                .wrp-signup > .signup-form > .form-field > .form-div {
                    display: flex;
                    flex-direction: column;
                }

                .wrp-signup > .signup-form > .form-field > .form-div:nth-child(even) {
                    margin-left: .3em;
                }

                .wrp-signup > .signup-form > .form-field > .form-div:nth-child(odd) {
                    margin-right: .3em;
                }

                .wrp-signup > .signup-form > .form-field > .form-div > :global(.form-input) {
                    font-size: 1em;
                    width: 350px;
                }

                .form-div > label {
                    color: grey;
                    position: absolute;
                    margin: .81em 1.05em 0;
                    font-size: 1em;
                    user-select: none;
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

                @media only screen and (max-width: 900px){
                    .wrp-signup > .signup-form > .form-field {
                        flex-direction: column;
                    }

                    .wrp-signup > .signup-form > .form-field > .form-div:nth-child(even),
                    .wrp-signup > .signup-form > .form-field > .form-div:nth-child(odd) {
                        margin: 0;
                    }

                    .wrp-signup > .signup-form > .form-field {
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
                }

                @media only screen and (max-width: 545px){
                    .wrp-signup > .signup-form {
                        padding: 4em 2em 5em;
                    }

                    .wrp-signup > .signup-form > .form-header {
                        // font-size: 1.5em;
                    }
                }
            `}</style>
            <div className="wrp-signup">
                <form onSubmit={e => e.preventDefault()} className="signup-form">
                    <h2 className="form-header">Create your new profile</h2>
                    <div className="form-field">
                        <div className="form-div">
                            <Textfield value={firstName} required onChange={e => setFirstName(e.target.value)} className="form-input"/>
                            <label className="required">First name</label>
                        </div>
                        <div className="form-div">
                            <Textfield value={surName} required onChange={e => setSurname(e.target.value)} className="form-input"/>
                            <label className="required">Surname</label>
                        </div>
                    </div>
                    <div className="form-field">
                        <div className="form-div">
                            <Textfield value={email} required onChange={e => setEmail(e.target.value)} type="email" className="form-input"/>
                            <label className="required">Email</label>
                        </div>
                        <div className="form-div">
                            <Textfield value={reEmail} required onChange={e => setReEmail(e.target.value)} type="email"  className="form-input"/>
                            <label className="required">Retype email</label>
                        </div>
                    </div>
                    <div className="form-field">
                        <div className="form-div">
                            <Textfield value={password} required onChange={e => setPassword(e.target.value)} type="password" className="form-input"/>
                            <label className="required">Password</label>
                        </div>
                        <div className="form-div">
                            <Textfield value={rePassword} required onChange={e => setRePassword(e.target.value)} type="password" className="form-input"/>
                            <label className="required">Retype password</label>
                        </div>
                    </div>
                    <div className="form-field">
                        <Button type="submit" value="Sign up" className="form-submit"/>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signup;