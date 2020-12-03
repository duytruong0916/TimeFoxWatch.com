import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { connect } from 'react-redux';
import { states } from '../core/UsState';
import { Redirect, Link} from 'react-router-dom'
import { read, update, updateUserInLocalStorage } from '../redux-store/actions/user';
const Profile = (props) => {
    const [data, setdata] = useState({
        firstname: '',
        lastname: '',
        password: '',
        confirmpassword: '',
        addressNumber: '',
        city: '',
        state: '',
        email: '',
        phone: '',
        zipcode: '',
        error: false,
        success: false,
        errornotmatch: false,
        success: false
    })
    const { firstname, lastname, success, addressNumber, city, state, email, phone, zipcode, password, confirmpassword, error, errornotmatch } = data;
    const onChangeHandler = (name) => (e) => {
        const value = e.target.value;
        setdata({ ...data, [name]: value });
    }
    const init = (userid) => {
        read(userid, props.user.token ).then(response=>{
            if(response.error){
                setdata({...data, error: response.error})
            }else{
                const {firstname, email,lastname,phone} = response;
                ///const array = address.split(' ');
                setdata({...data,  email, firstname, lastname,phone})
            }
        })
    }
    const onSubmit = (e)=>{
        e.preventDefault();
        if (!firstname || !lastname || !email || !password || !confirmpassword) {
            setdata({ ...data, error: 'Missing required fields' });
        } else if (password !== confirmpassword) {
            setdata({ ...data, errornotmatch: 'Passwords do not match' })
        } else{
            let address = `${addressNumber}. ${city}, ${state}-${zipcode}`;
            update(props.match.params.userid, props.user.token,  {firstname, email,lastname, address,phone, password})
            .then((response)=>{
                if(response.error){
                    console.log(data.error);
                }else{
                    setdata({...data,success:true})
                    props.updateUser(data);
                }
            })
        }

    }
    const RedirectUser = (success)=>{
        if(success){
            return <Redirect to= '/user/dashboard'/>
        }
    }
    const ProfileUpdate =()=>{
        return (
            <div>
            <form onSubmit={onSubmit} onBlur={() => setdata({ ...data, error: '', errornotmatch: '', success: '' })}>
                <div className='row'>
                    <div className='col-md-6 col-12'>
                        <div className='mt-4'>
                            <div><span className="font-weight-bold">*First name:</span></div>
                            <input
                                className={`text-input w-100 ${error && !firstname ? 'missing-field' : ''}`}
                                type='text'
                                placeholder='First name'
                                value={firstname}
                                onChange={onChangeHandler('firstname')} />
                        </div>
                        <div className='mt-4'>
                            <div><span className="font-weight-bold">*Last name:</span></div>
                            <input
                                className={`text-input w-100 ${error && !lastname ? 'missing-field' : ''}`}
                                type='text'
                                value={lastname}
                                placeholder='Last name'
                                onChange={onChangeHandler('lastname')} />
                        </div>
                        <div className='w-50 mt-4'>
                            <div><span className="font-weight-bold">Phone:</span></div>
                            <input
                                className='text-input w-100'
                                type="text"
                                value={phone}
                                placeholder='+1( - - -) - - - - - - -'
                                onChange={onChangeHandler('phone')} />
                        </div>
                        <div className='mt-4'>
                            <div><span className="font-weight-bold">Address:</span></div>
                            <div>
                                <input
                                    className='text-input w-100'
                                    type='text'
                                    value={addressNumber}
                                    placeholder='Address (OR PO BOX)'
                                    onChange={onChangeHandler('addressNumber')} />
                            </div>
                            <div >
                                <select onChange={onChangeHandler('state')} className='text-input w-50' value={state}>
                                    <option className='small'>STATE</option>
                                    {states.map((st, i) => (
                                        <option key={i} value={st}>{st}</option>
                                    ))}
                                </select>
                            </div>
                            <div >
                                <input
                                    className='text-input w-100'
                                    type='text'
                                    value={city}
                                    placeholder='City'
                                    onChange={onChangeHandler('city')} />
                            </div>
                            <div >
                                <input
                                    className='text-input w-100'
                                    type='text'
                                    value={zipcode}
                                    placeholder='Zipcode'
                                    onChange={onChangeHandler('zipcode')} />
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6 col-12'>
                        <div className='mt-4'>
                            <div><span className="font-weight-bold">*Email:</span></div>
                            <input
                                className={`text-input w-100 ${error && !email ? 'missing-field' : ''}`}
                                type='email'
                                placeholder='Email'
                                value={email}
                                onChange={onChangeHandler('email')} />
                        </div>
                        <div className='mt-4'>
                            <div><span className="font-weight-bold">*Password:</span></div>
                            <div>
                                <input
                                    className={`text-input w-100 ${error && !password || errornotmatch ? 'missing-field' : ''}`}
                                    type='password'
                                    value={password}
                                    placeholder='password'
                                    onChange={onChangeHandler('password')} />
                            </div>
                            <div className='mt-4'>
                                <div><span className="font-weight-bold">*Confirm password:</span></div>
                                <input
                                    className={`text-input w-100 ${error && !confirmpassword || errornotmatch ? 'missing-field' : ''}`}
                                    type='password'
                                    value={confirmpassword}
                                    placeholder='Confirm password'
                                    onChange={onChangeHandler('confirmpassword')} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='text-center text-danger'>
                    {error && (<div>{error}</div>)}
                    {!error && errornotmatch && (<div>{errornotmatch}</div>)}
                </div>
                <div className='text-center text-success'>
                    {success && (<div>{success}</div>)}
                </div>
                <div className='mt-4'>
                    <button className="button-card mt-3 w-50 p-4">SUBMIT</button>
                </div>
                <Link to= '/user/dashboard'>
                    <button className="button-card mt-3 w-50 p-4 mb-5">GO BACK</button>
                </Link>
            </form>
        </div>
        )
    }
    useEffect(() => {
        init(props.match.params.userid)
    }, [])

    return (
        <div className='profile-wrapper'>
            <div className='page-header-title text-center'>UPDATE PROFILE</div>
            {ProfileUpdate()}
            {RedirectUser(success)}
        </div>
            
    )
}

const MapStateToProps = (state) => ({
    islogin: !!state.auth.user,
    user: state.auth.user
})
const MapDistpatchToProps = (dispatch) =>({
    updateUser: (user)=> dispatch(updateUserInLocalStorage(user))
})
export default connect(MapStateToProps, MapDistpatchToProps)(Profile);