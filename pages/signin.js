import { useState } from 'react';
import Textfield from '../components/texfield'
import Button from '../components/button'

const Signin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <>
            <style jsx>{`
                .wrp-signin {
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
                
                .wrp-signin > .signin-form {
                    padding: 5em 8em;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    background-image: linear-gradient(to bottom right, #ece9f2, #ebe4e7);
                    border-radius: .2em;
                }
                
                .wrp-signin > .signin-form > .form-div, 
                .wrp-signin > .signin-form > :global(.form-submit)  {
                    margin-top: 1.4em;
                    font-size: 1em;
                }

                .wrp-signin > .signin-form > input: active{
                    box-shadow: 10px;
                }

                .form-div {
                    display: flex;
                    flex-direction: column;
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
            <div className="wrp-signin">
                <form onSubmit={e => e.preventDefault()} className="signin-form">
                    <div className="form-div">
                        <Textfield value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-input" />
                        <label>Email</label>
                    </div>
                    <div className="form-div">
                        <Textfield value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-input" />
                        <label>Password</label>
                    </div>
                    <Button type="submit" value="Sign in" className="form-submit" />
                </form>
            </div>
        </>
    )
}

export default Signin;