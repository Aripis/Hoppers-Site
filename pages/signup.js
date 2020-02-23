import { useState } from 'react';
import Textfield from '../components/texfield'
import Button from '../components/button'

const Signup = () => {
    const [firstName, setFirstName] = useState("")
    const [surName, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [reEmail, setReEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rePassword, setRePassword] = useState("")

    return (
        <>
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
                    padding: 5em 8em;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    background-image: linear-gradient(to bottom right, #ece9f2, #ebe4e7);
                    border-radius: .2em;
                }

                .wrp-signup > .signup-form > .form-field {
                    display:flex;
                    flex-direction: row;
                    margin-top: 1.4em;
                }

                .wrp-signup > .signup-form > .form-field > .form-div {
                    display: flex;
                    flex-direction: column;
                    font-size: 1em;
                    margin: 0 .3em;
                }

                .form-div > label {
                    color: grey;
                    position: absolute;
                    margin: .68em 1.05em 0;
                    font-size: .85em;
                    user-select: none;
                    transition: .2s;
                    pointer-events: none;
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
            `}</style>
            <div className="wrp-signup">
                <form onSubmit={e => e.preventDefault()} className="signup-form">
                    <div className="form-field">
                        <div className="form-div">
                            <Textfield value={firstName} onChange={e => setFirstName(e.target.value)} className="form-input"/>
                            <label>First name</label>
                        </div>
                        <div className="form-div">
                            <Textfield value={surName} onChange={e => setSurname(e.target.value)} className="form-input"/>
                            <label>Surname</label>
                        </div>
                    </div>
                    <div className="form-field">
                        <div className="form-div">
                            <Textfield value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-input"/>
                            <label>Email</label>
                        </div>
                        <div className="form-div">
                            <Textfield value={reEmail} onChange={e => setReEmail(e.target.value)} type="email"  className="form-input"/>
                            <label>Retype email</label>
                        </div>
                    </div>
                    <div className="form-field">
                        <div className="form-div">
                            <Textfield value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-input"/>
                            <label>Password</label>
                        </div>
                        <div className="form-div">
                            <Textfield value={rePassword} onChange={e => setRePassword(e.target.value)} type="password" className="form-input"/>
                            <label>Retype password</label>
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