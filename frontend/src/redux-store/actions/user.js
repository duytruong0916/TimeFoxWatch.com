
import  API  from '../../config';
export const read = (userid, token)=>{
    return fetch(`${API}/user/${userid}`,{
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
export const update = (userid,token, userdata)=>{
    return fetch(`${API}/user/update/${userid}`,{
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userdata)
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err)
    });
}
export const updateUserInLocalStorage = (user, next)=>{
    return (dispatch) =>{
        if(typeof window !=='undefined'){
            if(localStorage.getItem('jwt')){
                let auth = JSON.parse(localStorage.getItem('jwt'));
                auth.user = user;
                localStorage.setItem('jwt', JSON.stringify(auth));
                return dispatch({type: 'UPDATE_SUCCESS', auth })
            }
        }
    }
}
export const getPurchaseHistory = (userid, token)=>{
    return fetch(`${API}/orders/by/user/${userid}`,{
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