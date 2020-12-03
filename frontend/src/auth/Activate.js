import React, { useState, useEffect, Fragment } from 'react';
import {Redirect} from 'react-router-dom';
import jwt from 'jsonwebtoken';
import axios from 'axios';
const Activate = (props) => {
    const [data, setdata] = useState({
        lastname: '',
        token: '',
        message:'',
        error: ''

    })
    const {lastname, token , error, message} = data;
    useEffect(() => {
       let token  = props.match.params.token;
       console.log(token)
       if(token){
        let {lastname='unknown'} = jwt.decode(token);
        setdata({...data, lastname,token})
       }

    }, [])
    const ClickSubmit = (e) => {
        e.preventDefault();
        axios({
            method: 'POST',
            url: `http://localhost:8000/api/account-activation`,
            data: {token }
        })
            .then((response) => {
                console.log('ACCOUNT ACTIVATED',response.data.message);
                setdata({...data, error:'' ,message: response.data.message });
                const timer = setTimeout(() => {
                    props.history.push('/signin');
                    clearTimeout(timer);
                  }, 3000);
            })
            .catch(error => {
                console.log(error)
                setdata({ ...data, error: error.response.data.error });
            })

    }
    const ActivationLink = () => (
        <div>
            <h1>Hey {lastname}, ready to activate your account?</h1>
            <div className='text-center text-danger m-4'>
                    {error && (<div>{error}</div>)}
                </div>
                <div className='text-center text-success m-4'>
                    {message && (<div>{message}</div>)}
                </div>
            <button className='button-card' onClick={ClickSubmit}>Activate Account</button>
        </div>
    )
    return (
        <div className='Signup-wrapper mx-auto py-5'>
            {ActivationLink()}
        </div>

    )
}

export default Activate;