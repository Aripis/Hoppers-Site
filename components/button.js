import PropTypes from 'prop-types';
import Dotloader from './dotloader';

const Button = props => (
    <>
        <style jsx>{`
            .button {
                padding: .5em 1em;
                border: 0;
                border-radius: .4em;
                outline: none;
                background-image: linear-gradient(to bottom right, #36a5ff 0%, #0089fa 50%, #006dc7 100%);
                background-size: 300% 100%;
                color: white;
                transition: .2s;
                box-shadow: 0 .065em .19em rgba(0,0,0,0.12), 0 .065em .125em rgba(0,0,0,0.24);
                cursor: pointer;
                user-select: none;
                position: relative;
            }

            .button:hover {
                background-position: 50% 0;
                box-shadow: 0 .10em .28em rgba(0,0,0,0.16), 0 .10em .28em rgba(0,0,0,0.23);
            }

            .button:active {
                background-position: 100% 0;
                transform: perspective(1px) scale(1.03);
            }

            .button > span > :global(*) {
                color: white;
            }
        `}</style>
        <button
            id={props.id}
            type={props.type}
            onClick={props.onClick}
            className={`button ${props.className || ""}`}
            style={props.style}
            disabled={props.disabled}
        >
            {props.loading && <Dotloader dots={props.dots} />}
            <span style={{ visibility: props.loading ? "hidden" : "visible" }}>
                {props.children}
            </span>
        </button>
    </>
)

Button.defaultProps = {
    type: "button",
    dots: 3
}

Button.propTypes = {
    value: PropTypes.string,
    dots: PropTypes.number
}

export default Button;