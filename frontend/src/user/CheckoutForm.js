import React, { useState, useEffect, Fragment } from 'react';
import { states } from '../core/UsState';
const CheckoutForm = ({handleForm}) => {
    const [data, setdata] = useState({
        firstname: "",
        lastname: '',
        address: '',
        city: '',
        state: '',
        email: '',
        phone: ''
    })
    const { firstname, lastname, address, city, state, email, phone } = data;

    const onChangeHandler = name => (e) => {
        const value = e.target.value;
        setdata({ ...data, [name]: value });
    }
    const onSubmit = (e) => {
        e.preventDefault();
        handleForm(data);
    }
    return (
        <div>
            <div className='page-header-title text-center'>CONTACT INFORMATION</div>
            <form onSubmit={onSubmit}>
                <div className='m-5'>
                    <div><span className="font-weight-bold">Email:</span></div>
                    <input
                        className='text-input w-100'
                        id='email'
                        type='email'
                        placeholder='Email'
                        onChange={onChangeHandler('email')} />
                </div>
                <hr />
                <div className=''>
                    <div>
                        <input
                            className='text-input w-100 ml-4'
                            type='text'
                            placeholder='First name'
                            value={firstname}
                            onChange={onChangeHandler('firstname')} />
                    </div>
                    <div>
                        <input
                            className='text-input w-100 ml-4'
                            type='text'
                            placeholder='Last name'
                            value={lastname}
                            onChange={onChangeHandler('lastname')} />
                    </div>
                </div>
                <div className=''>
                    <div>
                        <input
                            className='text-input w-100 ml-4 mt-4'
                            type='text'
                            placeholder='Address (OR PO BOX)'

                            onChange={onChangeHandler('address')} />
                    </div>
                    <div>
                        <select onChange={onChangeHandler('state')} className='text-input w-100 ml-4'>
                            <option>SELECT A STATE</option>
                            {states.map((st, i) => (
                                <option key={i} value={st}>{st}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <input
                            className='text-input w-100 ml-4'
                            type='text'
                            placeholder='City'
                            onChange={onChangeHandler('city')} />
                    </div>
                   
                </div>
                <div className='text-center mt-4 text-danger'>

                </div>
                <div className ='text-center'>
                    <button className="button-card mt-3 w-50 p-4 mb-5">SUBMIT</button>
                </div>
            </form>

        </div>
    )
}



export default CheckoutForm;