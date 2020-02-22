import PropTypes from 'prop-types';

const Textfield = props => (
    <>
        <style jsx>{`
            .input {
                padding: 0.8em 1.8em;
                border-radius: .4em;
                border: 0;
                transition: .4s;
                outline: none;
            }

            .input:focus {
                box-shadow: 0 0 .15em .08em #0089fa;
            }
        `}</style>
        <input 
            id={props.id}
            type={props.type}
            className={`input ${props.className}`}
            value={props.value}
            placeholder={props.placeholder}
            required={props.required}
        />
    </>
)

Textfield.defoultProps = {
    type: "text"
}

Textfield.propTypes = {
    type: PropTypes.oneOf(["text", "email", "password"]),
    value: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool
}

export default Textfield;