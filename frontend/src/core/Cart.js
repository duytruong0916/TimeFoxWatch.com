import React, { useState, useEffect, Fragment } from 'react';
import { getCart } from '../redux-store/actions/cart';
import { connect } from "react-redux";
import Card from '../core/Card';
import { Link } from 'react-router-dom';
import Checkout from '../core/Checkout';
const Cart = (props) => {
    const [item, setitem] = useState([]);
    const [ready, setready] = useState(false)
    const { cartClick, isinmenu = false } = props;
    const handleClick = () => {
        cartClick();
    }
    const getTotal = () => {
        return item.reduce((currentvalue, nextvalue) => {
            return currentvalue + nextvalue.count * nextvalue.price;
        }, 0)
    }
    // const DisplayCheckout = ()=>{
    //     setready(true)
    // }
    const NoItemMessage = () => {
        return (
            <div>
                <div className='font-weight-bold p-5'>Your cart is empty!</div>
                <hr />
                <div className='row'>
                    <div className='col-12 mt-5' onClick={handleClick}>
                        <Link to='/men'><button className='button-card w-50'>SHOP MEN</button></Link>
                    </div>
                    <div className='col-12 mt-5 mb-5' onClick={handleClick}>
                        <Link to='/women'><button className='button-card w-50'>SHOP MEN</button></Link>
                    </div>
                </div>
            </div>
        )
    }
    useEffect(() => {
        setitem(getCart());
    }, [props])

    const ShowItem = () => {
        return (
            <div>
                <div className='font-weight-bold p-5'>Your cart has {`${item.length}`} items</div>
                <hr />
                <div className='row card-item-shower'>
                    {item.map((p, i) => (
                        <div className='col-6' key={i}>
                            <Card product={p} showaddtocartbutton={false} showQuantity={false} showviewbutton={false} cartupdate={true} showremovebutton={true} />
                        </div>

                    ))}
                </div>
            </div>
        )
    }
    const ShowCart = () => {
        return (
            <Fragment>
                <div>
                    <div>
                        {item.length > 0 ? ShowItem(item) : NoItemMessage()}
                    </div>
                </div>
                    {item.length > 0 && (
                        <div className='w-100 mt-5'>
                            <div>
                                <span>Subtotal:</span>
                                <span className='font-weight-bold'> ${getTotal()}</span>
                            </div>
                            <div>
                                <span>Shipping: </span>
                                <span className='font-weight-bold'>FREE</span>
                            </div>
                            {isinmenu && <Link to='/checkout' onClick={handleClick}><button className='button-card bg-success mt-2 p-4 font-weight-bold'>CHECKOUT</button></Link>}
                        </div>)}
            </Fragment>
        )
    }
    return (
        <div className='cart-wrapper'>
            {isinmenu && ShowCart()}
            {!isinmenu&& <Checkout products={item}/>}
        </div>
    )
}
const mapStatetoProps = state => ({
    numberOfItem: state.cart.item
});

export default connect(mapStatetoProps)(Cart);