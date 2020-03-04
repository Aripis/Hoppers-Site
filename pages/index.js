import PropTypes from 'prop-types'
import { get } from 'lodash/object'
import withAuthUser from '../utils/pageWrappers/withAuthUser'
import withAuthUserInfo from '../utils/pageWrappers/withAuthUserInfo'
import logout from '../utils/auth/logout'
import Router from 'next/router'
import Navbar from '../components/navbar'

const Home = props => {
    const { AuthUserInfo } = props
    const AuthUser = get(AuthUserInfo, 'AuthUser', null)

    return (
        <>
            <Navbar {...props}/>
            <div>
                {!AuthUser ? (
                    <p>
                        You are not signed in.
                    </p>
                ) : (
                        <div>
                            <p>You're signed in. Email: {AuthUser.email}</p>
                        </div>
                    )}
            </div>
        </>
    )
}

Home.propTypes = {
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

Home.defaultProps = {
    AuthUserInfo: null,
}

export default withAuthUser(withAuthUserInfo(Home))
