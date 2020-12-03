import queryString from 'query-string';
import API  from '../../config';

export const getProduct = (sortBy) => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
        method: 'GET'
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err)
    });
}
export const getFilteredProducts = (skip, limit, filters = {}) => {
    const data = {
        limit,
        skip,
        filters
    }
    return fetch(`${API}/products/by/search`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err)
    });;
}
export const List = (params) => {
    const query = queryString.stringify(params);
    console.log('query', query);
    return fetch(`${API}/products/search?${query}`, {
        method: 'GET'
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err)
    });
}
//export const listByCategory = 
export const Read = (productid) => {
    return fetch(`${API}/product/${productid}`, {
        method: 'GET'
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err)
    });
}
export const getRelatedProduct = (productid)=>{
    return fetch(`${API}/products/related/${productid}`,{
        method: 'GET'
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err)
    });
}
export const getBraintreeClientToken = (userid,token)=>{
    return fetch(`${API}/braintree/getToken/${userid}`,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err)
    });
}
export const processPayment = (userid,token, paymentdata)=>{
    return fetch(`${API}/braintree/payment/${userid}`,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentdata)
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err)
    });
}

export const getProductByCategory = (categoryId, skip=0, limit = 12) => {
    return fetch(`${API}/products/listbycategory/${categoryId}?skip=${skip}&limit=${limit}`, {
        method: 'GET'
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err)
    });
}