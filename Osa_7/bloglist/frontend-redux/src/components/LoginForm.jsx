import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
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
                    username
                    <input name="username" />
                </div>
                <div>
                    password
                    <input name="password" />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm
