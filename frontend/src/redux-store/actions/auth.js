import  API  from '../../config';
export const startSignUpWithEmail = (new_user = {}) => {
    return (dispatch) => {
       return fetch(`${API}/signup`,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(new_user)
        })
        .then((response) => {
          return response.json();
          
        })
        .then(({message, error})=>{
            if(message){
                return dispatch({ type: 'SIGNUP_SUCCESS',message});
            }
            return dispatch({ type: 'SIGNUP_ERROR', error});
            
        })
        .catch((error) => {
            return dispatch({ type: 'SIGNUP_ERROR', error });
        });
    }
  }

  export const startLoginWithEmail = (user = {}) => {
    return (dispatch) => {
       return fetch(`${API}/signin`,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then((response) => {
          return response.json();
          
        })
        .then((data)=>{
            if(data.token){
                //save the user o localstorage
                if(typeof window !=='undefined'){
                    localStorage.setItem('jwt', JSON.stringify(data))
                }
                const user =  {
                    user:   data.user,
                    token: data.token
                }
                return dispatch({ type: 'LOGIN_SUCCESS', user});
            }
            const error = data.error;
            return dispatch({ type: 'LOGIN_ERROR', error});
            
        })
        .catch((error) => {
            return dispatch({ type: 'LOGIN_ERROR', error });
        });
    }
  }
export const startLoginWithFacebookGoogle = (response)=>{
    return (dispatch)=>{
        if(typeof window !=='undefined'){
            localStorage.setItem('jwt', JSON.stringify(response.data))
        }
        const user = {
            token: response.data.token,
            user: response.data.user
        }
        return dispatch({ type: 'LOGIN_SUCCESS', user});
    }
}
export const startLogOut = ()=>{
    if(typeof window !=='undefined'){
        localStorage.removeItem('jwt');
    }
    return (dispatch)=>{
        return fetch(`${API}/user/signout`,{
            method: 'GET'
        })
        .then((response) => {
            return response.json();
            
          })
        .then((data)=>{
            console.log(data.msg);
            return dispatch({type: 'SIGNOUT_SUCCESS'})
        })
    }
}
export const isAuthenticated = ()=>{
    if(typeof window =='undefined') {
        return false;
    }
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'));
    }else
    {
        return false;
    }
    
}

export const startCheckout =()=>{
    return (dispatch) =>{
        return dispatch({type:'CHECK_OUT'})
    }
}
export const FinishedCheckout =()=>{
    return (dispatch) =>{
        return dispatch({type:'FINISH_CHECK_OUT'})
    }
}