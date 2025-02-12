import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
    TextField,
    Button
} from '@mui/material'

import { loginUser } from '../reducers/userReducer'

const LoginForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async (event) => {
        event.preventDefault()
        const username = event.target.username.value
        event.target.username.value = ''
        const password = event.target.password.value
        event.target.password.value = ''
        dispatch(loginUser({ username, password }))
        navigate('/')
    }

    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <TextField name="username" label="username" />
                </div>
                <br></br>
                <div>
                    <TextField name="password" label="password" type='password' />
                </div>
                <div>
                    <Button variant="contained" color="primary" type="submit">
                        login
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm
