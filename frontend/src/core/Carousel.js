import React from 'react';
import { Link } from 'react-router-dom';
const Carousel = () => (
    <div className="carousel slide" data-ride="carousel" data-interval="2000">
        <div className="carousel-inner">
            <div className="carousel-item active mt-4 ">
                <div>FREE SHIPPING ALL ORDERS</div>
                <span className='ml-2 font-weight-bold'><Link to='signup' className='unlink text-white'>Sign Up NOW!</Link></span>
            </div>
            <div className="carousel-item mt-3">
                <div >YEAR END SALE *EXTENDED*</div>
                <span className='mr-2 text-white font-weight-bold'>15% OFF ALL ORDER |</span>
                <span className='mr-2 text-white font-weight-bold'>20% OFF ORDERS $200+</span>
            </div>
        </div>
    </div>
)
export default Carousel;