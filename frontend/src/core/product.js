import React, { useState, useEffect } from 'react';
import Magnifier from "react-magnifier";
import API from '../config';
import { connect } from "react-redux";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Read, getRelatedProduct } from '../redux-store/actions/product';
import { addItem} from "../redux-store/actions/cart";
import Card from '../core/Card';
const Product = (props) => {
    const [product, setproduct] = useState({});
    const [relatedproduct, setrelatedproduct] = useState([]);
    const [error, seterror] = useState(false);
    const [isSwitched, setisSwitched] = useState(false);
    const loadSingleProduct = (productid) => {
        Read(productid).then((data) => {
            if (data.error) {
                seterror(data.error);
            } else {
                setproduct(data);
                getRelatedProduct(data._id).then((response) => {
                    console.log(response.error)
                    if (response.error) {
                        seterror(response.error);
                    }
                    else {
                        setrelatedproduct(response);
                    }
                })
            }
        })
    }
    const addToCart = () => {
        console.log(product);
        props.addItem(product, () => {
            console.log('added')
        });
    };
    const ShowCartbutton = () => {
        return (
                <div className='mt-5'>
                <button className='button-card p-md-5 p-4' onClick={addToCart}>ADD TO CART</button>
                </div>
        );
    };
    useEffect(() => {
        const productid = props.match.params.productid;
        loadSingleProduct(productid);
    }, [props])
    const ShowCarousel = () => {
        const responsive = {
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 4,
                slidesToSlide: 1 // optional, default to 1.
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 3,
                slidesToSlide: 1, // optional, default to 1.
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 2,
                slidesToSlide: 1, // optional, default to 1.
            },
        };
        return (
            <Carousel
                swipeable={true}
                draggable={true}
                showDots={false}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlaySpeed={1000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                //removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                {relatedproduct.map((p, i) => (
                    <Card product={p} key={i} showaddtocartbutton={false} showviewbutton={false} />
                ))}

            </Carousel>
        )

    }
    const ShowDescription = (product) => (
        <div className ='p-4'>
            <div className='description-title pt-5 pb-4'>
                <span className={`mr-4 pb-2 ${isSwitched? '': 'active-class'}`} onClick={()=>{setisSwitched(false)}}>DESCRIPTION</span>
                <span className={`ml-5 pb-2 ${isSwitched? 'active-class': ''}`} onClick={()=>{setisSwitched(true)}}>SHIPPING & RETURN</span>
            </div>
            <div className='description-content'>
                {!isSwitched&&<div>
                    The Chrono S is our calling card and it will never let you down.
                    Made for serious business this watch makes you feel like you’re in charge.
                    Note: The 40MM Series' straps have a width of 20MM. The 22MM width straps will not fit.
                </div>}
                {isSwitched&&<div>
                    Free worldwide shipping on all orders over $50.
                    If you are not 100% satisfied with your purchase, you can return it to
                    us within 30 days for a refund to the original payment source without processing fees.
                </div>}
            </div>
        </div>
    )
    return (
        <div className='product-wrapper'>
            <div className='row'>
                <div className='image-wrapper col-12 col-md-6 ml-auto'>

                    <Magnifier
                        src={`${API}/product/photo/${product._id}`}
                        width={`100%`}
                        mgShape='square'
                        mgShowOverflow='false'
                    />
                </div>
                <div className='product-info col-12 col-md-5'>
                    <div className='infor' >
                        <div className="product-name">{product.name}</div>
                        <div className='product-review'>
                            <span className='ml-1'><i className="fa fa-star" aria-hidden="true"></i></span>
                            <span className='ml-1'><i className="fa fa-star" aria-hidden="true"></i></span>
                            <span className='ml-1'><i className="fa fa-star" aria-hidden="true"></i></span>
                            <span className='ml-1'><i className="fa fa-star" aria-hidden="true"></i></span>
                            <span className='ml-1'><i className="fa fa-star" aria-hidden="true"></i></span>
                            <span className='ml-3'>Reviews</span>
                        </div>
                        <div className="product-descritpion">{product.description}</div>
                        <div className="product-price">${product.price}</div>
                        <div className="product-size my-5">Case Size(mm): <span className='size mr-2'>40</span> 41 </div>
                        {ShowCartbutton()}

                    </div>
                    <div>
                        {ShowDescription()}
                    </div>
                </div>
            </div>
            <div>
                <hr />
                <div className='page-header-title '>You may also like:</div>
                {ShowCarousel()}
            </div>
        </div>
    )
}

const mapStatetoProps = state => ({
    numberOfItem: state.cart.item
});
const mapDispatchToProps = dispatch => ({
    addItem: product => dispatch(addItem(product))
});

export default connect(mapStatetoProps, mapDispatchToProps)(Product);