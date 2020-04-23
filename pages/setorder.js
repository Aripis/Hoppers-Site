import { useState, useEffect } from 'react'
import Button from '../components/button'
import Navbar from '../components/navbar'
import Textfield from '../components/textfield'
import Message from '../components/message'
import Router from 'next/router'

import { get } from 'lodash/object'
import PropTypes from 'prop-types'
import withAuthUser from '../utils/pageWrappers/withAuthUser'
import withAuthUserInfo from '../utils/pageWrappers/withAuthUserInfo'
import firebase from 'firebase/app'
import initFirebase from '../utils/initFirebase'
import "firebase/firestore"
import 'firebase/auth'

initFirebase()

const SetOrder = props => {
    const { AuthUserInfo } = props
    const AuthUser = get(AuthUserInfo, 'AuthUser', null)

    const [billingAddress, setBillingAddress] = useState("")
    const [deliveryAddress, setDeliveryAddress] = useState("")
    const [telephoneNumber, setTelephoneNumber] = useState("")
    const [orderType, setOrderType] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("")
    const [loadingSignUp, setLoadingSignUp] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {

    }, [])

    const handleOrder = async e => {
        e.preventDefault()
        setLoadingSignUp(!loadingSignUp)
        // do some shit
        setLoadingSignUp(false)

    }

    return (
        // Billing address
        // Delivery address
        // telephone number
        // Fast order/Normal order
        // Cash or card 
        <>
            <style jsx>{`
                .wrp-setorder {
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

                .wrp-setorder > .setorder-from {
                    padding: 4em 6em 5em;
                    display: flex;
                    flex-direction: column;
                    max-width: 55em;
                    width: 100%;
                    background-image: linear-gradient(to top, #d2d2d2, #e5e5e5);
                    border-radius: .3em;
                    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
                }

                .wrp-setorder > .setorder-from > .form-field {
                    width: 100%;
                }

                .wrp-setorder > .setorder-from > :global(.form-message) {
                    margin-top: 1em;
                }

                .wrp-setorder > .setorder-from > .form-actions {
                    align-self: flex-end;
                }

                .wrp-setorder > .setorder-from > .form-field,
                .wrp-setorder > .setorder-from > .form-actions {
                    display:flex;
                    flex-direction: row;
                    justify-content: center;
                    margin-top: 1.4em;
                }

                .wrp-setorder > .setorder-from > .form-actions > :global(.form-submit) {
                    font-size: 1.1em;
                }

                .wrp-setorder > .setorder-from > .form-header {
                    align-self: center;
                    font-size: 2em;
                }

                .wrp-setorder > .setorder-from > .form-field > .form-div {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                }

                .wrp-setorder > .setorder-from > .form-field > .form-div:nth-child(even):not(:only-child) {
                    margin-left: .3em;
                }

                .wrp-setorder > .setorder-from > .form-field > .form-div:nth-child(odd):not(:only-child) {
                    margin-right: .3em;
                }

                .wrp-setorder > .setorder-from > .form-field > .form-div > :global(.form-input) {
                    font-size: 1em;
                }

                @media only screen and (max-width: 985px){
                    .wrp-setorder > .setorder-from > .form-field {
                        flex-direction: column;
                    }

                    .wrp-setorder > .setorder-from > .form-field > .form-div:nth-child(even):not(:only-child),
                    .wrp-setorder > .setorder-from > .form-field > .form-div:nth-child(odd):not(:only-child) {
                        margin: 0;
                    }

                    .wrp-setorder > .setorder-from > .form-field {
                        width: 100%;
                        margin-top: 0;
                    }

                    .wrp-setorder > .setorder-from > .form-field > .form-div > :global(.form-input) {
                        margin-top: 1.4em;
                    }

                    .wrp-setorder > .setorder-from > .form-field > :global(.form-submit) {
                        margin-top: 1em;
                    }
                }

                @media only screen and (max-width: 545px){
                    .wrp-setorder > .setorder-from {
                        padding: 4em 2em 5em;
                        align-items: center;
                    }

                    .wrp-setorder > .setorder-from > .form-header {
                        font-size: 1.5em;
                    }
                }
            `}</style>
            <Navbar {...props} />
            <div className="wrp-setorder">
                <from onSubmit={handleOrder} className="setorder-from">
                    <h2 className="form-header">Set an order</h2>
                    <div className="form-field">
                        <div className="form-div">
                            <Textfield error={error} label="Billing address" id="billingAddress"
                                value={billingAddress} required
                                onChange={e => { setBillingAddress(e.target.value); setError("") }}
                                className="form-input" />
                        </div>
                        <div className="form-div">
                            <Textfield error={error} label="Delivery address" id="deliveryAddress"
                                value={deliveryAddress} required
                                onChange={e => { setDeliveryAddress(e.target.value); setError("") }}
                                className="form-input" />
                        </div>
                    </div>
                    <div className="form-field">
                        <div className="form-div">
                            <Textfield error={error} label="telephone number" id="telephoneNumber"
                                value={telephoneNumber} required
                                onChange={e => { setTelephoneNumber(e.target.value); setError("") }}
                                className="form-input" />
                        </div>
                        <div className="form-div">
                            <Textfield error={error} label="Fast order/Normal order" id="orderType"
                                value={orderType} required
                                onChange={e => { setOrderType(e.target.value); setError("") }}
                                className="form-input" />
                        </div>
                    </div>
                    <div className="form-field">
                        <div className="form-div">
                            <Textfield error={error} label="Cash or card " id="paymentMethod"
                                value={paymentMethod} required
                                onChange={e => { setPaymentMethod(e.target.value); setError("") }}
                                className="form-input" />
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
                        <Button onClick={() => Router.replace("/finalizeorder")}
                            loading={loadingSignUp}
                            type="submit"
                            className="form-submit">
                            Procceed to final step
                        </Button>
                    </div>
                </from>
            </div>
        </>

    )

}

SetOrder.propTypes = {
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

SetOrder.defaultProps = {
    AuthUserInfo: null,
}

export default withAuthUser(withAuthUserInfo(SetOrder));