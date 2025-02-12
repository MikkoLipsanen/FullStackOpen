import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@mui/material'

const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility,
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <div>
                    <Button variant="outlined" color="primary" onClick={toggleVisibility} >
                        {props.buttonLabel}
                    </Button>
                </div>
                <br></br>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <div>
                    <Button variant="outlined" color="primary" onClick={toggleVisibility} >
                        cancel
                    </Button>
                </div>
                <br></br>
            </div>
        </div>
    )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
