import React from 'react';
//const API ='/api';
import API  from '../config';
const ShowImage = ({product, url})=>{
    return(
        <div className ='product-image'>
            <img 
                src = {`${API}/${url}/photo/${product._id}`}
                alt = {product.name}
                className ='mb-3'
                style= {{maxHeight: '100%', maxWidth: '100%'}}
            />
        </div>
    )
}
export default ShowImage;