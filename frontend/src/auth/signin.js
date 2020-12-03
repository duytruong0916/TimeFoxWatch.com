import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import {startLoginWithEmail,startLoginWithFacebookGoogle } from '../redux-store/actions/auth';
import axios from 'axios';
import {Redirect , Link} from 'react-router-dom';
import {authenticate, isAuth } from '../auth/Helpers';
import Google from '../auth/Google';
import Facebook from '../auth/Facebook';
const SignIn = ({userinfor,islogin,AuthError, incheckout = false, startLoginWithEmail,startLoginWithFacebookGoogle}) => {
    const [data, setdata] = useState({
        password: '',
        confirmpassword: '',
        email: '',
        error: false,
        success:false,
        errornotmatch: false,
        name:'',
        submit: false
    })
    const {success,email, password, confirmpassword, error, errornotmatch,name,submit } = data;
    const onChangeHandler = name => (e) => {
        const value = e.target.value;
        setdata({ ...data, [name]: value });
    }
    const informParent = (response)=>{
            startLoginWithFacebookGoogle(response);
            setdata({email:'',error:'',password: '',confirmpassword:'',success: true,name:response.data.user.lastname});
    }
    useEffect(()=>{
        setdata({...data, error:AuthError, submit:false})
    },[submit, AuthError])
    const onSubmit = (e) => {
        e.preventDefault();
        setdata({...data, submit: true})
        // console.log(process.env.REACT_APP_GOOGLECLIENTID)
        if(!email||!password||!confirmpassword){
            setdata({...data, error: 'Missing required fields'});
        }else if(password!==confirmpassword){
            setdata({...data, errornotmatch: 'Passwords do not match'})
        }else{
            startLoginWithEmail({email, password});
            setdata({email:'',password: '',confirmpassword:''})
            //console.log(`${process.env.REACT_APP_API}`)
            // axios({
            //     method: 'POST',
            //     url: `${process.env.REACT_APP_API}/signin`,
            //     data: {email, password}
            // })
            // .then((response)=>{
            //     console.log('USER INFO:',response.data.user)
            //     console.log('TOKEN:',response.data.token)
            //     authenticate(response, ()=>{
            //         setdata({email:'',error:'',password: '',confirmpassword:'',success: true,name:response.data.user.lastname});
            //         window.location.reload(false);
            //     });
            // })
            // .catch(error=>{
            //     setdata({...data, error: error.response.data.error});
            // })
        }
    }
    const onRedirect = ()=>{
        if(islogin){
          if(userinfor&&userinfor.role===1) {
            return <Redirect to = '/admin/dashboard'/>
         }
         else{
           return <Redirect to = '/user/dashboard'/>
         }
        }
      }
    const ShowForm = ()=>(
        <div className='py-5'>
              {!incheckout && <div>
                        <div className='page-header-title text-center'>LOG INTO TIMEFOX </div>
                        <div className='text-center'>It's time to manage your account</div>
                    </div>}
            <form onSubmit={onSubmit} onBlur={()=>{setdata({...data,error:'', errornotmatch:'', success:'',name:''})}}>
                <div className='mt-4'>
                    <div><span className="font-weight-bold">*Email:</span></div>
                    <input
                        className={`text-input w-100 ${error&&!email?'missing-field':''}`}
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={onChangeHandler('email')} />
                </div>
                <div className='mt-4'>
                    <div><span className="font-weight-bold">*Password:</span></div>
                    <div>
                        <input
                            className={`text-input w-100 ${error&&!password||errornotmatch?'missing-field':''}`}
                            type='password'
                            value={password}
                            placeholder='password'
                            onChange={onChangeHandler('password')} />
                    </div>
                    <div className='mt-4'>
                    <div><span className="font-weight-bold">*Confirm password:</span></div>
                        <input
                            className={`text-input w-100 ${error&&!confirmpassword||errornotmatch?'missing-field':''}`}
                            type='password'
                            value={confirmpassword}
                            placeholder='Confirm password'
                            onChange={onChangeHandler('confirmpassword')} />
                    </div>
                </div>
                <div className='text-center text-danger m-4'>
                    {/* {AuthError&&(<div>{AuthError}</div>)} */}
                    {error&&(<div>{error}</div>)}
                    {!error&&errornotmatch&&(<div>{errornotmatch}</div>)}
                </div>
                <div className='text-center text-success mt-4'>
                    {success&&(<div>Welcome Back {name.toUpperCase()} </div>)}
                </div>
                <div>
                    <Link to='/forgotpassword'>I've forgot my password.</Link>
                </div>
                <div className='text-center'>
                    <button className="button-card mt-3 w-50">SUBMIT</button>
                </div>
                <div className='text-center'>
                    <Link to ='/signup'><button className="button-card mt-3 w-50">CREATE AN ACCOUNT</button></Link>
                </div>
            </form>
        </div>
    )
    return (
        <div className='Signup-wrapper mx-auto'>
             {onRedirect()}
            {ShowForm()}
            <div>
                 <Google informParent = {informParent}/>
            </div>
            <div className= 'mt-3'>
                 <Facebook informParent = {informParent}/>
            </div>
        </div>
    
    )
}

const mapStatetoProps = (state) => ({
    AuthError: state.auth.authError,
    islogin: !!state.auth.user,
    userinfor : state.auth.user
 })
 const mapDispatchToProps = (dispatch) => ({
   startLoginWithEmail: (info) => dispatch(startLoginWithEmail(info)),
   startLoginWithFacebookGoogle: (response) => dispatch(startLoginWithFacebookGoogle(response))
 });
 
 export default connect(mapStatetoProps, mapDispatchToProps)(SignIn);
 