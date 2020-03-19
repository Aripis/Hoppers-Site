import React from 'react'
import PropTypes from 'prop-types';
import Label from '../components/label'

const Textfield = props => (
    <>
        <style jsx>{`
            .input {
                padding: 0.7em 1.1em;
                border-radius: .4em;
                border: 1px solid rgba(0, 0, 0, 0.2);
                transition: .3s;
                outline: none;
            }

            .input:focus {
                box-shadow: 0 0 .15em .03em #0089fa;
                border: 1px solid transparent;
            }

            .input::placeholder {
                transition: .3s;
            }

            .input:focus::placeholder {
                opacity: .7;
            }

            .input.error {
                border: 1px solid #e0b4b4;
                background-color: #fff6f6;
                color: #9f3a38;
            }

            .input.error:focus {
                box-shadow: 0 0 .15em .03em #fa1d00;
            }
        `}</style>
        <input 
            id={props.id}
            style={props.style}
            type={props.type}
            onChange={props.onChange}
            className={`input ${props.error ? "error" : ""} ${props.className || ""}`}
            value={props.value}
            placeholder={props.placeholder}
            required={props.required}
        />
        {props.label &&
            <Label required={props.required} error={props.error} htmlFor={props.id} content={props.label} on="input" />
        }
    </>
)

Textfield.defaultProps = {
    type: "text"
}

Textfield.propTypes = {
    type: PropTypes.oneOf(["text", "email", "password"]),
    value: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool
}

export default Textfield;