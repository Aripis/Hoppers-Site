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
                padding: 6rem 8rem;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                background-image: linear-gradient(to bottom right, #ece9f2, #ebe4e7);
                border-radius: .2rem;
            }

            .wrp-signup > .signup-form > .form-input {
                margin-top: .5em;
            }
        `}</style>
        <div className="wrp-signup">
            <form onSubmit={e => e.preventDefault()} className="signup-form">
                <div></div>
                <Textfield type="text" placeholder="First Name" className="form-input"/>
                <Textfield type="text" placeholder="Surname" className="form-input"/>
                <Textfield type="email" placeholder="Google@bulgaria.bg" className="form-input"/>
                <Textfield type="email"  placeholder="Re-email" className="form-input"/>
                <Textfield type="password" placeholder="Password" className="form-input"/>
                <Textfield type="password" placeholder="Re-password" className="form-input"/>
            </form>
        </div>
    </>
)

export default Signup;