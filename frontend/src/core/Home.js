import React, { useState, useEffect, Fragment } from 'react';
import Carousel from '../core/Carousel';
import { Link, Redirect } from 'react-router-dom';
import { getProductByCategory } from '../redux-store/actions/product';
import { getCategory } from '../redux-store/actions/admin';
import Card from '../core/Card';
import Footer from './footer';
const Home = () => {
    const [productsMen, setProductMen] = useState([]);
    const [productsWomen, setProductWomen] = useState([]);
    const [error, setError] = useState(false);
    //const [categories, setcategories] = useState([]);

    const loaddata = () => {
        getCategory().then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                const categories = data;
                categories.map((ca, i) => {
                    if (ca.name === 'MEN WATCH') {
                        loadProductMen(ca)
                    } else {
                        loadProductWomen(ca)
                    }
                })
            }
        })
    };
    const loadProductMen = (ca) => {
        getProductByCategory(ca._id, 0, 3).then((response) => {
            if (response.error) {
                console.log(response.error);
            } else {
                setProductMen(response);
            }
        })
    }
    const loadProductWomen = (ca) => {
        getProductByCategory(ca._id, 0, 3).then((response) => {
            if (response.error) {
                console.log(response.error);
            } else {
                setProductWomen(response);
            }
        })
    };
    useEffect(() => {
        loaddata();
    }, [])
    const ShowSignUp = () => {
        return (
            <div className='row'>
                <div className='col-12 col-md-6'>
                    <img src='\asset\fish1.png' className='mw-100' />
                </div>
                <div className='col-12 col-md-6 d-flex my-5'>
                    <div className='content-signup'>
                        <div className='message mb-3'>MANAGE YOUR TIME</div>
                        <Link to='/signup'>
                            <span className='button button-circle px-5 font-weight-bold'>JOIN US</span>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
    const ShowPoster = (products, title, nameclass) => {
        return (
            <Fragment>
                <div className={nameclass} style={{ justifyItems: 'center', display: 'flex' }}>
                    <div className='content'>
                        <div className='text-white'>{title}</div>
                        <Link to='/shop'>
                            <span className='button button-white px-5 font-weight-bold'>SHOP</span>
                        </Link>
                    </div>
                </div>
                <div className='row product-display'>
                    <div className='display-header col-6 col-md-3'>
                        New Arrivals
                    </div>
                    {products.map((product, i) => (
                        <div className='col-md-3 col-6 mb-4 mt-4' key={i}>
                            <Card product={product} showviewbutton={false} showaddtocartbutton={false} />
                        </div>
                    ))}
                </div>
            </Fragment>
        )

    }
    return (
        <div className='home-wrapper'>
            <Carousel />
            <div>
                <img src='asset\carousel.jpg' className='image-home w-100'/>
            </div>
            <div className='d-xl-none d-flex text-center small'>
                <Link to='/men' className='bg-light w-50 p-3 border font-weight-bold unlink'>
                    <span >SHOP NEW MENS</span>
                </Link>
                <Link to='/women' className='bg-light w-50 p-3 border font-weight-bold unlink'>
                    <span >SHOP NEW WOMENS</span>
                </Link>
            </div>
            {ShowPoster(productsMen, 'BE A GENTLEMAN', 'home-poster-men')}
            {ShowSignUp()}
            {ShowPoster(productsWomen, 'BE GORGEOUS', 'home-poster-women')}
        </div>
    )
}
export default Home;