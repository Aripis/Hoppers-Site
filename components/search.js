import PropTypes from 'prop-types';
import Textfield from '../components/textfield'

const Search = props => (
    <>
        <style jsx>{`
            
        `}</style>
        <Textfield 
            id={props.id}
            style={props.style}
            value={props.value} 
            onChange={props.onChange} 
            className={`search ${props.className || ''}`} 
            placeholder={props.placeholder} 
        />
    </>
)

Search.defaultProps = {
    placeholder: "Search products"
}

Search.propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
}

export default Search; 