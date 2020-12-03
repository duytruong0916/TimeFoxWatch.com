import React, { useState, useEffect, Fragment } from 'react';
import CheckoutForm from '../user/CheckoutForm';
import ShowImage from "../core/ShowImage";
//import Signin from '../user/Signin';
import Signin from '../auth/signin';
import Carousel from '../core/Carousel';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { getBraintreeClientToken, processPayment } from '../redux-store/actions/product';
import { createOrder } from '../redux-store/actions/order';
import { EmptyCart } from '../redux-store/actions/cart';
import { startCheckout, FinishedCheckout } from '../redux-store/actions/auth';
import DropIn from 'braintree-web-drop-in-react'
const Checkout = (props) => {
    const { FinishedCheckout, Checkout, EmptyCart, products, islogin, user } = props
    const [data, setdata] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        information: {},
        ready: true,
        Shouldredirect: false
    })
    const { information, ready, loading, success, Shouldredirect } = data;
    useEffect(() => {
        if (user) {
            getToken(user.user._id, user.token);
        }

    }, [props])
    const handleForm = (infor) => {
        Checkout();
        setdata({ ...data, information: infor, ready: true });
    }
    const getToken = (userid, token) => {
        getBraintreeClientToken(userid, token).then((response) => {
            if (response.error) {
                setdata({ ...data, error: response.error })
            } else {
                setdata({ clientToken: response.clientToken })
            }
        })
    }
    const getTotal = () => {
        return products.reduce((currentvalue, nextvalue) => {
            return currentvalue + nextvalue.count * nextvalue.price;
        }, 0)
    }
    const ShowCheckout = () => (
        islogin ? (
            <div>{ShowDropIn()}</div>
        ) : (
                <div>
                    <div className = 'page-header-title text-center mt-5'>LOGIN TO CHECKOUT</div>
                    <Signin incheckout ={true}/>
                </div>
            )
    )
    const ShouldRedirect = (Should) => (
        Should && <Redirect to='/home' />
    )
    const Pay = (e) => {
        e.preventDefault();
        setdata({ ...data, loading: true })
        let nonce;
        data.instance.requestPaymentMethod().then(data => {
            nonce = data.nonce;
            const paymentdata = {
                paymentMethodNonce: nonce,
                amount: getTotal(products)
            }
            processPayment(user.user._id, user.token, paymentdata)
                .then((response) => {
                    if (response.error) {
                        setdata({ loading: false, error: response.message ? response.message : response.error })
                    } else {
                        //send order to the backend
                        // console.log(response)
                        const orderdata = {
                            products: products,
                            trasaction_id: response.transaction.id,
                            amount: response.transaction.amount
                        }
                        createOrder(user.user._id, user.token, orderdata).then(response => {
                            //sent successfully and empty cart
                            console.log('Payment Success and empty cart');
                            EmptyCart();
                            setdata({ loading: false, success: true, ready: false });
                            FinishedCheckout()
                        }).catch(err => {
                            console.log(err)
                        })

                    };
                });
        }).catch(err => {
            setdata({ ...data, error: err.message });
        });
    };
    const handleAddreschange = e => {
        setdata({ ...data, address: e.target.value });
    }
    const ShowDropIn = () => (
        <div onBlur={() => setdata({ ...data, error: '' })}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <div className= 'font-weight-bold mt-4' style={{fontSize: '20px'}}>*Card number:  4111-1111-1111-1111 for testing</div>
                    <div className= 'mt-4'>
                        <DropIn
                            options={{ authorization: data.clientToken, paypal: { flow: 'vault' } }}
                            onInstance={instance => data.instance = instance} />
                        <button className='button bg-success w-50' onClick={Pay}>Submit</button>
                    </div>
                </div>
            ) : null}
        </div>
    )
    const ShowError = (error) => (
        <div className='alert alert-danger' style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )
    const ShowMessage = (success) => (
        <div className='alert alert-success text-center' style={{ display: success ? '' : 'none' }}>
            Thanks! Your payment was successful.
        </div>
    )
    const ShowLoading = (loading) => (loading && <h2>Loading.....</h2>)
    return (
        <div>
            <Carousel />
            <div className='row checkout-wrapper'>
                {/* {ShouldRedirect(Shouldredirect)} */}
                <div className='col-lg-5 col-12 mt-5'>
                    <div className='item-list'>
                        {products.map((p, i) => (
                            <div className='row' key={i}>
                                <div className='col-3 pl-5 pt-3'><ShowImage product={p} url="product" /></div>
                                <div className='col-6 pt-5 font-weight-bold'>
                                    <div>{p.name}</div>
                                    <div>{p.description}</div>
                                </div>
                                <div className='col-3 pt-5 text-danger font-weight-bold'>${p.price}</div>
                            </div>
                        ))}
                    </div>
                    <hr className=' mt-5' />
                    <div className='w-75 mx-auto mt-5'>
                        <div className='d-flex flex-row justify-content-between mt-3'>
                            <span className=''>Subtotal</span><span>${getTotal()}</span>
                        </div>
                        <div className='d-flex flex-row justify-content-between mt-3'>
                            <span className=''>Discount</span><span> 25% OFF - ${getTotal() * 25 / 100}</span>
                        </div>
                        <div className='d-flex flex-row justify-content-between mt-3'>
                            <span className=''>Shipping</span><span>Free</span>
                        </div>
                        <div className='d-flex flex-row justify-content-between mt-3'>
                            <span className=''>Tax</span><span> ${(getTotal() * 8.25 / 100).toFixed(2)}</span>
                        </div>
                        <hr />
                        <div className='d-flex flex-row justify-content-between mt-5'>
                            <span className='font-weight-bold'>Total</span><span>USD <span style={{ fontSize: '40px' }}>{(getTotal() - (getTotal() * 25 / 100) + (getTotal() * 8.25 / 100)).toFixed(2)}</span></span>
                        </div>
                    </div>
                    <div className='text-center mb-5'>
                        <Link to='/shop'>
                            <button className='button-card w-75 mt-5 p-md-5 p-4' onClick={() => FinishedCheckout()}>ADD MORE ITEM</button>
                        </Link>
                    </div>
                </div>
                <div className='col-lg-7 col-12 border mt-lg-5 mt-3'>
                    {ShowMessage(success)}
                    {!ready && <CheckoutForm handleForm={(data) => handleForm(data)} />
                    }
                    {ready && <div className=''>
                        {ShowLoading(loading)}
                        {ShowError(data.error)}
                        {ShowCheckout()}
                    </div>}
                </div>
            </div>
        </div>

    )
}
const mapStatetoProps = (state) => ({
    islogin: !!state.auth.user,
    user: state.auth.user
})
const mapDispatchToProps = (dispatch) => ({
    EmptyCart: () => dispatch(EmptyCart()),
    Checkout: () => dispatch(startCheckout()),
    FinishedCheckout: () => dispatch(FinishedCheckout())
});
export default connect(mapStatetoProps, mapDispatchToProps)(Checkout); 
