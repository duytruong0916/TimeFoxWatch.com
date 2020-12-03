export const addItem = (item, next)=>{
    return (dispatch,next) =>{
        let cart = [];
        if(typeof window !=='undefined'){
            if(localStorage.getItem('cart')){
                cart = JSON.parse(localStorage.getItem('cart'));
            }
            cart.push({
                ...item,
                count: 1
            })
            cart = Array.from(new Set(cart.map(p=> p._id))).map(id=>{
                return cart.find(p=>p._id ===id);
            })
            localStorage.setItem('cart', JSON.stringify(cart));
            const numberOfItem = cart.length;
            dispatch({type: 'UPDATE_ITEM',numberOfItem })
            next();
        }
    }
}
export const itemTotal = ()=>{
    if(typeof window !=='undefined'){
        if(localStorage.getItem('cart'))
        {
            return JSON.parse(localStorage.getItem('cart')).length;
        }
    }
    return 0;
}
export const getCart = ()=>{
    if(typeof window !=='undefined'){
        if(localStorage.getItem('cart'))
        {
            return JSON.parse(localStorage.getItem('cart'));
        }
    }
    return [];
}
export const updateItem = (productid, count)=>{
    return (dispatch)=>{
        let cart = [];
        if(typeof window !== 'undefined'){
            if(localStorage.getItem('cart')){
                cart = JSON.parse(localStorage.getItem('cart'));
            }
            cart.map((p,i)=>{
                if(p._id ===productid){
                    cart[i].count = count; 
                }
            })
            const numberOfItem = cart.length;
            dispatch({type: 'UPDATE_ITEM',numberOfItem })
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }
  
}
export const removeItem= (productid, count)=>{
    return (dispatch) =>{
        let cart = [];
        if(typeof window !== 'undefined'){
            if(localStorage.getItem('cart')){
                cart = JSON.parse(localStorage.getItem('cart'));
            }
            cart.map((p,i)=>{
                if(p._id ===productid){
                    cart.splice(cart[i],1);
                }
            })
            const numberOfItem = cart.length;
            dispatch({type: 'UPDATE_ITEM',numberOfItem })
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        return cart;
    }
}
export const EmptyCart = ()=>{
    return (dispatch)=>{
        if(typeof window !=='undefined'){
            localStorage.removeItem('cart');
            const numberOfItem = 0;
            dispatch({type: 'UPDATE_ITEM',numberOfItem })
        }
    }
   
}