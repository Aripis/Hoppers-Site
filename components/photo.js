const imgWithClick = { cursor: "pointer" };

const Photo = ({ index, onClick, photo, margin, direction, top, left }) => {
    delete photo.file
    const imgStyle = { margin: margin };
    imgStyle.backgroundImage = `url('${photo.src}')`
    imgStyle.backgroundRepeat = "no-repeat"
    imgStyle.backgroundSize = "contain"
    imgStyle.backgroundPosition = "center"
    imgStyle.height = photo.height
    imgStyle.position = "relative"
    if (direction === "column") {
        imgStyle.position = "absolute";
        imgStyle.left = left;
        imgStyle.top = top;
    }

    const handleClick = event => {
        onClick(event, { photo, index });
    };

    return (
            <div
                className="react-photo-gallery_photo"
                style={onClick ? { ...imgStyle, ...imgWithClick } : imgStyle}
                onClick={onClick ? handleClick : null}
            >
                <span className="photo-close" style={{
                    position: 'absolute',
                    right: '0',
                    display: 'inline-block',
                    padding: '.1em .2em', 
                    backgroundColor: 'red',
                    color: 'white',
                    borderRadius: '50em',
                    textAlign: 'center',
                    cursor: 'pointer',
                    pointerEvents: 'auto',
                    userSelect: 'none'
                }}>
                ✖
                </span>
            </div>
    );
};

export default Photo;