import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../actions/auth'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

const Login = ({ login, isAuthenticated }) => {
    const [error, setError] = useState('')
    const [isAPILoading, setIsAPILoading] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = async (e) => {
        setError('')
        e.preventDefault()

        try {
            if (email === '') {
                setError('please fill in email')
                return
            }
            if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)) {
                setError('please check out your email format')
                return
            }
            if (password === '') {
                setError('please fill in password')
                return
            }
            if (!/(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,30}/.test(password)) {
                setError('please check out your password (must contain letters, numbers, and special characters)')
                return
            }
            setIsAPILoading(true)
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, {
                email,
                password
            })

            // console.log(res) // Log the parsed response object for debugging

            if (res.status === 200) {
                login(email, password)
                    .then(() => {
                        setIsAPILoading(false)
                    })
                    .catch(() => {
                        setIsAPILoading(false)
                    })
            } else {
                setError('Wrong email or password')
                setIsAPILoading(false)
            }
        } catch (err) {
            setIsAPILoading(false)
            setError('Wrong email or password')
            console.error(err) // Log the error for debugging
        }
    }

    const continueWithGoogle = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`)

            window.location.replace(res.data.authorization_url)
        } catch (err) {}
    }

    if (isAuthenticated) {
        return <Redirect to='/' />
    }

    return (
        <div
            className='container mt-5'
            style={{ width: '500px' }}
        >
            <h1>Sign In</h1>
            <p style={{ color: 'grey' }}>Sign into your Account</p>
            <form>
                <div className='form-group'>
                    <TextField
                        className='form-control'
                        type='email'
                        label='Email'
                        name='email'
                        value={email}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <TextField
                        className='form-control'
                        type='password'
                        label='Password'
                        name='password'
                        value={password}
                        onChange={(e) => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
            </form>
            <div style={{ color: 'red' }}>{error}</div>
            <div
                className='d-flex justify-content-center align-item-center'
                style={{ marginTop: '4em', height: '48px' }}
            >
                {isAPILoading ? (
                    <CircularProgress></CircularProgress>
                ) : (
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={(e) => onSubmit(e)}
                        disabled={isAPILoading}
                        style={{height: '36px'}}
                    >
                        Login
                    </Button>
                )}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button
                    variant='contained'
                    color='secondary'
                    onClick={continueWithGoogle}
                    style={{height: '36px'}}
                >
                    Continue With Google
                </Button>
            </div>
            <p className='mt-3'>
                Don't have an account? <Link to='/sign-up'>Sign Up</Link>
            </p>
            <p className='mt-3'>
                Forgot your Password? <Link to='/reset-password'>Reset Password</Link>
            </p>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)
