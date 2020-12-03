import React from 'react';
import { connect } from 'react-redux';
import Layout from '../core/Layout';
import { NavLink } from 'react-router-dom';
import EmailPasswordPage from '../user/EmailPassword'
const Signin = ({ incheckout = false }) => {
    return (
        <Layout title='Signin Page' description='App Node-React'>
            <div className ='login-poster'></div>
            <div className='login_wrapper'>
                <div className="login_box">
                    {!incheckout && <div>
                        <div className='page-header-title text-center'>LOG INTO TIMEFOX </div>
                        <div className='text-center'>It's time to manage your account</div>
                    </div>}
                    <EmailPasswordPage />
                    <div className='text-center mt-4 new-link-color ' >
                        <div>New to TimeFox? </div>
                        <NavLink to="/signup">CREATE AN ACCOUNT</NavLink></div>
                </div>
            </div>
        </Layout>
    )
}


export default Signin;
