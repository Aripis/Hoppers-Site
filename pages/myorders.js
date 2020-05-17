import Navbar from '../components/navbar';
import { get } from 'lodash/object';
import PropTypes from 'prop-types';
import withAuthUser from '../utils/pageWrappers/withAuthUser';
import withAuthUserInfo from '../utils/pageWrappers/withAuthUserInfo';

const MyOrders = props => {


    const { AuthUserInfo } = props
    const AuthUser = get(AuthUserInfo, 'AuthUser', null)
    return (
        <>
            <Navbar {...props} />
            <p>You have successfully completed your order</p>
        </>
    )
}

MyOrders.propTypes = {
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

MyOrders.defaultProps = {
    AuthUserInfo: null,
}

export default withAuthUser(withAuthUserInfo(MyOrders));