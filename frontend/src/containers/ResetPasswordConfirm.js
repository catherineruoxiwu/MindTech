import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password_confirm } from '../actions/auth';

const ResetPasswordConfirm = ({ match, reset_password_confirm }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    });

    const { new_password, re_new_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        const uid = match.params.uid;
        const token = match.params.token;

        if (new_password === re_new_password) {
            if (!/(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,30}/.test(new_password)) {
                alert('Your password security is too low (must contain letters, numbers, and special characters).')
                return
            }
            reset_password_confirm(uid, token, new_password, re_new_password);
            setRequestSent(true);
        }
        else{
            alert("Passwords do not match. Please try again.");
        }
    };

    if (requestSent) {
        return <Redirect to='/' />
    }

    return (
        <div className='container mt-5' style={{width: '500px'}}>
            <form onSubmit={e => onSubmit(e)}>
            <div className='form-group'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='New Password'
                        name='new_password'
                        value={new_password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Confirm New Password'
                        name='re_new_password'
                        value={re_new_password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <button className='btn btn-primary' type='submit'>Reset Password</button>
            </form>
        </div>
    );
};

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);
