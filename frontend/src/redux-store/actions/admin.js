// const API ='/api';
import API from '../../config';
export const CreateCategory = (userid, token, category) =>{
        return fetch(`${API}/category/create/${userid}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
         }).then((response) => {
            return response.json();
        }).catch((err) => {
            console.log(err)
        });;
    }
export const getCategory = ()=>{
    return fetch(`${API}/categories`,{
        method: 'GET'
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err)
    });
}

export const deleteCategory = (categoryid, userid, token)=>{
    return fetch(`${API}/category/${categoryid}/${userid}`,{
        method: 'DELETE',
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

//Prooduct
export const CreateProduct = (userid, token, product) =>{
        return fetch(`${API}/product/create/${userid}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: product
         }).then((response) => {
            return response.json();
        }).catch((err) => {
            console.log(err)
        });;
    }
/*
    To perform CRUD on the products
    get All products
    get a single product
    update or delete the products
*/
    export const getProducts = ()=>{
    return fetch(`${API}/products?limit=undefined`,{
        method: 'GET'
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err)
    });
    }

    export const deleteProduct = (productid, userid, token)=>{
        return fetch(`${API}/product/${productid}/${userid}`,{
            method: 'DELETE',
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
    export const getProduct = (productid)=>{
        return fetch(`${API}/product/${productid}`,{
            method: 'GET'
        }).then((response) => {
            return response.json();
        }).catch((err) => {
            console.log(err)
        });
        }
        
export const updateProduct = (productid, userid, token, product)=>{
        return fetch(`${API}/product/${productid}/${userid}`,{
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: product
        }).then((response) => {
            return response.json();
        }).catch((err) => {
            console.log(err)
        });
    }