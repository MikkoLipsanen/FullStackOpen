import { useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'

const Header = ({ user }) => {
    const dispatch = useDispatch()

    return (
        <p>
            {user.name} logged in{' '}
            <button onClick={() => dispatch(logoutUser())}>logout</button>
        </p>
    )
}

export default Header