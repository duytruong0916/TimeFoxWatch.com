import React,{useState, useEffect} from 'react';
import {getOrders, getStatusValues, updateOrderStatus} from '../redux-store/actions/order';
import Layout from '../core/Layout';
import { connect } from 'react-redux';
import moment from 'moment';
const Orders = ({user})=>{
    const [ordervalues,setordervalues] = useState([]);
    const [statusvalues, setstatusvalues] = useState([]);

    const loadOrders = (userid, token)=>{
        getOrders(userid,token).then((data)=>{
            if(data.error){
                console.log(data.error);
            }else{
                setordervalues(data)
            }
        })
    }

    const loadStatusValues = (userid, token)=>{
       getStatusValues(userid,token).then((response)=>{
            if(response.error){
                console.log(response.error);
            }else{
                setstatusvalues(response)
            }
        })
    }
    const ShowNumberOrders =(orders) =>{
        return orders.length < 1 ? (<h1>No orders</h1>): (<h1>Total orders: {orders.length}</h1>)
    }
    const showInput = (title,value) =>{
        return (
            <div className='input-group mb-2 mr-sm-2'>
                <div className ='input-group-prepend'>
                    <div className='input-group-text'>{title}</div>
                </div>
                <input type='text' value ={value} className ='form-control' readOnly/>
            </div>
        )
    }
    const handleChangeStatus =(e, orderId)=>{
        updateOrderStatus(user.user._id, user.token, orderId , e.target.value).then((data)=>{
            if(data.error){
                console.log(data.error)
            }else{
                loadOrders(user.user._id, user.token);
            }
        })
    }
    const ShowStatus = (order) =>{
        return (
            <div className ='form-group'>
                <h3>Status: {order.status}</h3>
                <select className='form-control' onChange ={(e)=> handleChangeStatus(e, order._id)}>
                    <option>Update Status</option>
                    {statusvalues.map((status,i)=>(
                        <option key={i} value ={status}>{status}</option>
                    ))}
                </select>
            </div>
        )
    }
    const ShowOrders = (orders)=>{
        return orders.map((order,i)=>{
            return (
                <div className ='mt-5' key ={i} style ={{borderbottom: '1px solid indigo'}}>
                    <h2 className ='mb-3'>
                        <span className='bg-dark text-white'>Order ID: {order._id}</span>
                    </h2>
                    <ul className ='list-group mb-4'>
                        <li className='list-group-item'>{ShowStatus(order)}</li>
                        <li className='list-group-item'>Transaction ID: {order.transaction_id}</li>
                        <li className='list-group-item'>Amount: ${order.amount}</li>
                        <li className='list-group-item'>Ordered by: {order.user.name}</li>
                        <li className='list-group-item'>Ordered on: {moment(order.createdAt).fromNow()}</li>
                        <li className='list-group-item'>Delivery address: {order.address}</li>
                    </ul>
                    <h2 className="mt-3 mb-5 font-italic">
                        Total item: {order.products.length}
                    </h2>
                    {order.products.map((p,i)=>(
                        <div className ='mb-4 border p-2' >
                            {showInput('Product ID', p._id)}
                            {showInput('Product name', p.name)}
                            {showInput('Product price', p.price)}
                            {showInput('Product total', p.count)}
                        </div>
                    ))}
                </div>
            )
        })
    }
    useEffect(()=>{
        loadOrders(user.user._id, user.token);
        loadStatusValues(user.user._id, user.token)
    },[])


    return (
        <Layout title='Orders' description='Order list:'>
            <div className='row'>
                <div className ='col-md-8 offset-md-2'>
                    {ShowNumberOrders(ordervalues)}
                    {ShowOrders(ordervalues)}
                </div>
            </div>
        </Layout>
    )
}
const mapStatetoProps = (state) => ({
    AuthError: state.auth.authError,
    islogin: !!state.auth.user,
    user: state.auth.user
})

export default connect(mapStatetoProps)(Orders);