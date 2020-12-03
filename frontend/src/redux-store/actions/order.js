
import  API  from '../../config';
export const createOrder = (userid,token, orderdata)=>{
    return fetch(`${API}/order/create/${userid}`,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({order: orderdata})
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err)
    });
}
export const getOrders = (userid, token)=>{
    return fetch(`${API}/order/list/${userid}`,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err)
    });
}
export const getStatusValues = (userid, token)=>{
    return fetch(`${API}/order/status-values/${userid}`,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err)
    });
}
export const updateOrderStatus = (userid, token, orderId, status)=>{
    return fetch(`${API}/order/${orderId}/${userid}`,{
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({status, orderId})
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err)
    });
}