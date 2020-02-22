import { useState } from 'react';
import Textfield from '../components/texfield'
import Button from '../components/button'
import Signin from './signin';

const Signup = () => (
    <>
        <style>{`
            .wrp-signup {
                height: calc(100vh - 60px); 
                display: flex;
                align-items: center;
                flex-direction: column;
                justify-content: center;
                background-image: url("https://miro.medium.com/max/11416/0*Mjaw2WtpiOUiz2dy");
                background-repeat: no-repeat;
                background-size: 100% 100%;
                background-position: center;
                background-attachment: fixed;  
            }

            .wrp-signup > .signup-form {
                padding: 5rem 8rem;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                background-image: linear-gradient(to bottom right, #ece9f2, #ebe4e7);
                border-radius: .2rem;
            }

            .wrp-signup > .signup-form > .form-input {
                margin-top: 1em;
                font-size: .9em;
                margin-right: .6em;
            }

            .wrp-signup > .signup-form > .form-input > input{
                margin-right: .6em;
            }
        `}</style>
        <div className="wrp-signup">
            <form onSubmit={e => e.preventDefault()} className="signup-form">
                <div  className="form-input">
                    <Textfield type="text" placeholder="First Name"/>
                    <Textfield type="text" placeholder="Surname"/>
                </div>
                <div  className="form-input">
                    <Textfield type="email" placeholder="Google@bulgaria.bg" />
                    <Textfield type="email"  placeholder="Re-email" />
                </div>
                <div  className="form-input">
                    <Textfield type="password" placeholder="Password" />
                    <Textfield type="password" placeholder="Re-password" />
                </div>
                <div className="form-input">
                    <Button type="submit" value="Sign up" />
                </div>
            </form>
        </div>
    </>
)

export default Signup;