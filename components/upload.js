import PropTypes from 'prop-types';

const Upload = props => (
    <>
        <style jsx>{`
            .upload-input{
                width: 0.1px;
                height: 0.1px;
                position: absolute;
                opacity: 0;
                overflow: hidden;
                z-index: -1;
            }

            .upload-input + label{
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
                display: inline-block;
                font-size: .83em;
            }

            .upload-input:hover + label {
                background-position: 50% 0;
                box-shadow: 0 .10em .28em rgba(0,0,0,0.16), 0 .10em .28em rgba(0,0,0,0.23);
            }

            .upload-input:active + label {
                background-position: 100% 0;
                transform: perspective(1px) scale(1.03);
            }

            .upload-input + label * {
                pointer-events: none;
            }
        `}</style>
        <span className="wrp-upload">
            <input 
                className="upload-input"
                name="file"
                type="file" 
                id="file"
                onChange={props.onChange}
                multiple={props.multiple}
                accept={props.accept}
            />
            <label htmlFor="file">Choose images</label>
        </span>
    </>
)

Upload.defaultProps = {
    multiple: false
}

Upload.propTypes = {
    multiple: PropTypes.bool,
    accept: PropTypes.string
}

export default Upload;