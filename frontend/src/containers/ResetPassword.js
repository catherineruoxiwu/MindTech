import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { reset_password } from '../actions/auth'
import axios from 'axios'

const ResetPassword = ({ reset_password }) => {
    const [requestSent, setRequestSent] = useState(false)
    const [formData, setFormData] = useState({
        email: ''
    })

    const { email } = formData

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = (e) => {
        e.preventDefault()

        // get the user with this email, check whether the user exists
        axios
            .get(`${process.env.REACT_APP_API_URL}/auth/check-email/`, {
                params: {
                    email: email
                }
            })
            .then((response) => {
                if (!response.data.exist) {
                    alert('This email has not registered. Please try again.')
                    return
                }
                try {
                    reset_password(email)
                    setRequestSent(true)
                } catch (err) {
                    alert('An error occurred. Please try again later.')
                }
            })
            .catch((res) => {
                alert('An error occurred. Please try again later.')
            })
    }

    if (requestSent) {
        return <Redirect to='/' />
    }

    return (
        <div className='container mt-5' style={{width: '500px'}}>
            <h1>Request Password Reset:</h1>
            <form onSubmit={(e) => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <button
                    className='btn btn-primary'
                    type='submit'
                >
                    Reset Password
                </button>
            </form>
        </div>
    )
}

export default connect(null, { reset_password })(ResetPassword)
