import { useDispatch } from 'react-redux'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { logoutUser } from '../reducers/userReducer'

const Header = ({ user }) => {
    const dispatch = useDispatch()

    return (
        <div>
            <Button color="inherit" component={Link} onClick={() => dispatch(logoutUser())} >
                Logout
            </Button>
            {user.name} logged in
        </div>
    )
}

export default Header