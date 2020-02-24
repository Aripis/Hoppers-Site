import PropTypes from 'prop-types';

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
        `}</style>
        <input 
            id={props.id}
            style={props.style}
            type={props.type}
            onChange={props.onChange}
            className={`input ${props.className}`}
            value={props.value}
            placeholder={props.placeholder}
            required={props.required}
        />
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