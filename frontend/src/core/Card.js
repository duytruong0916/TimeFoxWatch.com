import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "../core/ShowImage";
import moment from "moment";
import { addItem, updateItem, removeItem } from "../redux-store/actions/cart";
const Card = ({
    addItem,
    updateItem,
    removeItem,
    product,
    showviewbutton = true,
    showaddtocartbutton = true,
    cartupdate = false,
    showremovebutton = false,
    showQuantity = true
 
}) => {
    const [redirect, setredirect] = useState(false);
    const [count, setcount] = useState(product.count);

    // const handleChange = productid => (e) =>{
    //     setrun(!run)
    //     setcount(e.target.value <1 ? 1: e.target.count);
    //     if(e.target.value >=1){
    //         updateItem(productid,e.target.value);
    //     }
    // }
    const increaseCount = product => {
        let newcount = count + 1;
        if (newcount >= product.quantity) {
            newcount = product.quantity;
        }
        setcount(newcount);
        updateItem(product._id, newcount);
    };
    const decreaseCount = product => {
        let newcount = count - 1;
        if (newcount < 1) {
            newcount = 1;
        }
        setcount(newcount);
        updateItem(product._id, newcount);
    };
    const ShowQuantity = quantity => {
        return (
            showQuantity && (quantity > 0 ? <span className='pb-3'>In stock</span> : <span  className='pb-3'>Out of stock</span>)
        )
    };
    const ShowViewButton = showviewbutton => {
        return (
            showviewbutton && (
                <Link to={`/product/${product._id}`} className="mr-2">
                    <button className="button-card mr-2 mb-2">View product</button>
                </Link>
            )
        );
    };
    const addToCart = () => {
        addItem(product, () => {
            setredirect(true);
        });
    };
    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart" />;
        }
    };
    const ShowCartbutton = showaddtocartbutton => {
        return (
            showaddtocartbutton && (
                <button className="button-card mt-2 mb-2" onClick={addToCart}>
                    Add to cart
        </button>
            )
        );
    };
    const Showremovebutton = removebutton => {
        return (
            removebutton && (
                <button
                    className="button-card remove-button mt-2 mb-2 w-25"
                    onClick={() => {
            
                        removeItem(product._id);
                    }}
                >
                    X
        </button>
            )
        );
    };
    const Showcartupdatebutton = cartupdate => {
        return (
            cartupdate && (
                <div className="input-group mb-3">
                    <div className="quanlity-adjust">
                        <div>
                            <span onClick={() => increaseCount(product)}>+</span>
                        </div>
                        <span className="count-item">{count}</span>
                        <div>
                            <span onClick={() => decreaseCount(product)}>-</span>
                        </div>
                    </div>
                    {/* <input type ='number' className='form-control' value={count} onChange ={handleChange(product._id)} /> */}
                </div>
            )
        );
    };
    return (
        <div className="card">
            {shouldRedirect()}
            <div className="card-body card-info">
            {Showremovebutton(showremovebutton)}    
                <Link to={`/product/${product._id}`} className="mr-2">
                    <ShowImage product={product} url="product" />
                </Link>
                <div className="card-info">
                    <span className="card-title">{product.name}</span>
                    <span className ='p-3'>${product.price}</span>
                    {ShowQuantity(product.quantity)}
                    {ShowViewButton(showviewbutton)}
                    {ShowCartbutton(showaddtocartbutton)}
                    {Showcartupdatebutton(cartupdate)}
                </div>
            </div>
        </div>
    );
};

const mapStatetoProps = state => ({
    numberOfItem: state.cart.item
});
const mapDispatchToProps = dispatch => ({
    removeItem: id => dispatch(removeItem(id)),
    addItem: product => dispatch(addItem(product)),
    updateItem: (id, value) => dispatch(updateItem(id, value))
});

export default connect(mapStatetoProps, mapDispatchToProps)(Card);
