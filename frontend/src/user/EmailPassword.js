import React from 'react';
import { connect } from 'react-redux';
import {startLoginWithEmail} from '../redux-store/actions/auth';
import { NavLink,Redirect} from 'react-router-dom'
class EmailPasswordPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
      }
  }
  onRedirect = ()=>{
    if(this.props.islogin){
      if(this.props.userinfor&&this.props.userinfor.user.role===1) {
        return <Redirect to = '/admin/dashboard'/>
     }
     else{
       return <Redirect to = '/user/dashboard'/>
     }
    }
  }
  onEmailChange = (e)=>{
    const email = e.target.value;
        this.setState(()=>({email}));
  }
  onPasswordChange =(e)=>{
    const password = e.target.value;
    this.setState(()=>({password}));
  }
  onSubmit =(e) =>{
     e.preventDefault();
     if(!this.state.email||!this.state.password)
        {
            this.setState(()=>({error: "Missing Email or Password"}))
        }
    else{
      this.setState(()=>({error: ''}))
      this.props.startLoginWithEmail({email: this.state.email, password:this.state.password});
    }
  }

 render(){
   return (
     <div className='mt-4'>
       {this.onRedirect()}
       <form onSubmit ={this.onSubmit}>
         <div>
          <span className="font-weight-bold">Email:</span>
          <input 
                placeholder='Email'
                value= {this.state.email}
                onChange ={this.onEmailChange}
                type ='text' 
                className={`login_input ml-2 ${this.state.error||this.props.AuthError? 'login_invalid_input': ''}`}
     
            />
         </div>
          <div className='mt-4'>
            <span className="font-weight-bold">Password:</span>
            <input 
                placeholder='Password'
                value= {this.state.password}
                onChange ={this.onPasswordChange}
                type ='password' 
                className={`login_input ml-2 ${this.state.error||this.props.AuthError? 'login_invalid_input': ''}`}
           
            />  
          </div>
          <div className='text-center mt-4 text-danger'>
             {this.props.AuthError&&!this.state.error? <p>{this.props.AuthError}</p>: null}
             {this.state.error && <p>{this.state.error}</p>}
          </div>
          <button className='button mt-4 w-50 p-4'>NEXT</button>
          <div className='mt-3'><NavLink to="/resetpassword" className='new-link-color'>I've forgotten my password</NavLink></div>
       </form>
     </div>
   )
 }
}

const mapStatetoProps = (state) => ({
   AuthError: state.auth.authError,
   islogin: !!state.auth.user,
   userinfor : state.auth.user
})
const mapDispatchToProps = (dispatch) => ({
  startLoginWithEmail: (info) => dispatch(startLoginWithEmail(info))
});

export default connect(mapStatetoProps, mapDispatchToProps)(EmailPasswordPage);
