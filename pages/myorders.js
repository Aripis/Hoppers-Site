import Navbar from '../components/navbar'
const MyOrders = props => {
    return (
        <>
            <Navbar {...props} />
            <p>You have successfully completed your order</p>
        </>
    )
}

export default MyOrders;