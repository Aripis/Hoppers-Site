import PropTypes from 'prop-types';

const Button = props => (
    <>
        <style>{`
            .button {
                padding: .5em 1em;
                border: 0;
                border-radius: .4em;
                outline: none;
                background-image: linear-gradient(to bottom right, #36a5ff, #0089fa, #006dc7);
                color: white;
                transition: .2s;
                box-shadow: 0 .065em .19em rgba(0,0,0,0.12), 0 .065em .125em rgba(0,0,0,0.24);
                cursor: pointer;
            }

            .button:hover {
                background-image: linear-gradient(to top left, #36a5ff, #0089fa, #006dc7);
                box-shadow: 0 .10em .38em rgba(0,0,0,0.16), 0 .10em .38em rgba(0,0,0,0.23);
            }

            .button:active {
                transform: scale(1.02);
            }
        `}</style>
        <input 
            id={props.id}
            type={props.type}
            className={`button ${props.className}`}
            value={props.value}
        />
    </>
)

Button.defoultProps = {
    type: "button"
}

Button.propTypes = {
    type: PropTypes.oneOf(["submit", "button"]),
    value: PropTypes.string
}

export default Button;