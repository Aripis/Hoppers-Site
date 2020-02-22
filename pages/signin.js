import { useState } from 'react';
import Textfield from '../components/texfield'
import Button from '../components/button'

const Signin = () => {

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
                    padding: 6rem 8rem;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    background-image: linear-gradient(to bottom right, #ece9f2, #ebe4e7);
                    border-radius: .2rem;
                }
                
                .wrp-signin > .signin-form > .form-div, .wrp-signin > .signin-form > :global(.form-submit)  {
                    margin-top: 1rem;
                    font-size: 1rem;
                }

                .wrp-signin > .signin-form > input: active{
                    box-shadow: 10px;
                }

                .form-div {
                    // padding: 
                    display: flex;
                    flex-direction: column;
                }

                .form-div > label {
                    margin-bottom: .3rem;
                    font-size: .9rem;
                }
            `}</style>
            <div className="wrp-signin">
                <form onSubmit={e => e.preventDefault()} className="signin-form">
                    <div className="form-div">
                        <Textfield type="email" placeholder="Google@bulgaria.bg" className="form-input" />
                    </div>
                    <div className="form-div">
                        <Textfield type="password" placeholder="Password" className="form-input" />
                    </div>
                    <Button type="submit" value="Sign in" className="form-submit" />
                </form>
            </div>
        </>
    )
}

export default Signin;