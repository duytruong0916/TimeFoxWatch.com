import React from 'react';
import * as EmailValidator from 'email-validator'
import { connect } from 'react-redux';
import { startSignUpWithEmail } from '../redux-store/actions/auth';
export class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirm_password: '',
            error: ''
        }
    }
    onFirstNameChange = (e) => {
        const firstname = e.target.value;
        this.setState(() => ({ firstname }));
    }
    onLastNameChange = (e) => {
        const lastname = e.target.value;
        this.setState(() => ({ lastname }));
    }
    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState(() => ({ email }));
    }
    onPasswordChange = (e) => {
        const password = e.target.value;
        this.setState(() => ({ password }));
    }
    onConfirmPasswordChange = (e) => {
        const confirm_password = e.target.value;
        this.setState(() => ({ confirm_password }));
    }
    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.email || !this.state.password) {
            this.setState(() => ({ error: "Missing Email or Password" }))
        } else if (!EmailValidator.validate(this.state.email)) {
            this.setState(() => ({ error: 'Invalid email' }));
        }
        else if (this.state.password !== this.state.confirm_password) {
            this.setState(() => ({ error: "Passwords do not match" }))
        }
        else {
            this.setState(() => ({ error: '' }));
            const user = {
                name:  this.state.firstname,
                email: this.state.email,
                password: this.state.password
            }
            console.log(user)
            this.props.signUp(user);
        }
    }
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className='mt-4'>
                        <div>
                        <div><span className="font-weight-bold">First name:</span></div>
                            <input
                                className='text-input w-100 ml-2'
                                id='fistname'
                                type='text'
                                placeholder='First name'
                                value={this.state.firstname}
                                onChange={this.onFirstNameChange} />
                        </div>
                        <div className='mt-4'>
                            <div><span className="font-weight-bold">Last name:</span></div>
                            <input
                                className='text-input w-100 ml-2'
                                id='lastname'
                                type='text'
                                placeholder='Last name'
                                value={this.state.lastname}
                                onChange={this.onLastNameChange} />
                        </div>
                    </div>
                    <div className='mt-4'>
                        <div><span className="font-weight-bold">Email:</span></div>
                        <input
                            className={`text-input w-100 text-input ml-2 ${this.state.error || this.props.AuthError ? 'login_invalid_input' : ''}`}
                            id='email'
                            type='email'
                            placeholder='Email'
                            value={this.state.email}
                            onChange={this.onEmailChange} />
                    </div>
                    <div className='mt-4'>
                        <div><span className="font-weight-bold">Password:</span></div>
                        <input
                            className={`text-input w-100 text-input ml-2 ${this.state.error || this.props.AuthError ? 'login_invalid_input' : ''}`}
                            id='password'
                            type='password'
                            placeholder='Password'
                            value={this.state.password}
                            onChange={this.onPasswordChange} />
                    </div>
                    <div className='mt-4'>
                        <div><span className="font-weight-bold">Confirm Password</span></div>
                        <input
                            className={`text-input w-100 text-input ml-2 ${this.state.error || this.props.AuthError ? 'login_invalid_input' : ''}`}
                            id='confirm_password'
                            type='password'
                            placeholder='Confirm password'
                            value={this.state.confirm_password}
                            onChange={this.onConfirmPasswordChange} />
                    </div>
                    <div className='text-center mt-4 text-danger'>
                        {this.props.signupError && !this.state.error ? <p>{this.props.signupError}</p> : null}
                        {this.state.error && <p>{this.state.error}</p>}
                    </div>
                    <button className="button mt-3 w-100 p-lg-5 p-4" style={{fontSize:'16px'}}>Submit & Log In</button>
                </form>

            </div>
        )
    }
}
const MapStateToProps = (state) => ({
    signupError: state.auth.authError,
    signupMessage: state.auth.message
})
const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (creds) => dispatch(startSignUpWithEmail(creds))
    }
}
export default connect(MapStateToProps, mapDispatchToProps)(SignUpForm);