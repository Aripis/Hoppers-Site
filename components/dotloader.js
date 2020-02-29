import PropTypes from 'prop-types';

const Dotloader = props => (
    <>
        <style jsx>{`
            .dotloader {
                position: absolute;
                top:0;
                bottom: 0;
                left: 0;
                right: 0;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
            }

            .dotloader > span {
                display: inline-block;
                width: .45em;
                height: .45em;
                border-radius: 50%;
                margin: 0 .1em;
            }
            
            .dotloader > span:nth-child(odd) {
                background-color: #CCC;
                animation: odd 0.6s ease-in-out infinite alternate forwards;
            }

            .dotloader > span:nth-child(even) {
                background-color: #F6F7F9;
                animation: even 0.6s ease-in-out infinite alternate forwards;
            }

            @keyframes odd {
                from {
                    background-color: #CCC;
                    transform: scale(1);
                }
                to {
                    background-color: #F6F7F9;
                    transform: scale(1.1);
                }
            }

            @keyframes even {
                from {
                    background-color: #F6F7F9;
                    transform: scale(1.1);
                }
                to {
                    background-color: #CCC;
                    transform: scale(1);
                }
            }

        `}</style>
        <div className={`dotloader ${props.className || ""}`}>
            {Array.from(Array(props.dots)).map((dot, i) => (
                <span key={i}></span>
            ))}
        </div>
    </>
)

Dotloader.defaultProps = {
    dots: 3
}

Dotloader.propTypes = {
    dots: PropTypes.number
}

export default Dotloader;