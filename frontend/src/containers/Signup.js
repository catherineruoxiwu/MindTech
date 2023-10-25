import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signup } from '../actions/auth'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'

const Signup = ({ signup, isAuthenticated }) => {
    const [error, setError] = useState('')
    const [isAPILoading, setIsAPILoading] = useState(false)
    const [accountCreated, setAccountCreated] = useState(false)
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        re_password: ''
    })

    const { first_name, last_name, email, password, re_password } = formData

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = async (e) => {
        e.preventDefault()
        // check null
        if (first_name === '') {
            setError('please fill in first_name')
            return
        }
        if (last_name === '') {
            setError('please fill in last_name')
            return
        }
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
            setError('Your password security is too low (must contain letters, numbers, and special characters).')
            return
        }
        if (re_password === '') {
            setError('please fill in re_password')
            return
        }
        if (password !== re_password) {
            // Check whether this email is already registered
            // await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/`, {
            //     params: {
            //         email: email
            //     }
            // });

            // If the request succeeds, the email is not registered yet
            // signup(first_name, last_name, email, password, re_password);
            // setAccountCreated(true);
            setError('Passwords do not match. Please try again.')
            return
        }
        try {
            setIsAPILoading(true)
            // Check whether this email is already registered
            await axios
                .get(`${process.env.REACT_APP_API_URL}/auth/check-email/`, {
                    params: {
                        email: email
                    }
                })
                .then((response) => {
                    if (response.data.exist) {
                        setError('This email is already registered. Please try other email.')
                    } else {
                        // If the request succeeds, the email is not registered yet
                        signup(first_name, last_name, email, password, re_password)
                        setAccountCreated(true)
                    }
                    setIsAPILoading(false)
                })
                .catch(() => {
                    setIsAPILoading(false)
                })
        } catch (error) {
            setIsAPILoading(false)
            // If the request fails, the email is already registered
            // if (error.response && (error.response.status === 400 || error.response.status === 401)) {
            //     alert('This email is already registered. Please try again.')
            // } else {
            setError('An error occurred. Please try again later.')
            // }
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
    if (accountCreated) {
        return <Redirect to='/login' />
    }

    return (
        <div
            className='container mt-5'
            style={{ width: '500px' }}
        >
            <h1>Sign Up</h1>
            <p style={{ color: 'grey' }}>Create your Account</p>
            <form>
                <div className='form-group'>
                    <TextField
                        className='form-control'
                        type='text'
                        label='First Name'
                        name='first_name'
                        value={first_name}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <TextField
                        className='form-control'
                        type='text'
                        label='Last Name'
                        name='last_name'
                        value={last_name}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
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
                <div className='form-group'>
                    <TextField
                        className='form-control'
                        type='password'
                        label='Confirm Password'
                        name='re_password'
                        value={re_password}
                        onChange={(e) => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
            </form>
            <div style={{ color: 'red' }}>{error}</div>
            <div
                className='d-flex justify-content-center'
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
                        Register
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
            <br />
            <p className='mt-3'>
                Already have an account? <Link to='/login'>Sign In</Link>
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

export default connect(mapStateToProps, { signup })(Signup)
