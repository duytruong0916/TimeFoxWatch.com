import React, { useState, useEffect, Fragment } from 'react';
import Layout from './Layout';
import { Link, Redirect } from 'react-router-dom';
import { getProductByCategory } from '../redux-store/actions/product';
import { getCategory } from '../redux-store/actions/admin';
import Card from './Card';
const Gender = ({ ismen=false, iswomen =false, isaccessories }) => {
    const [productsMen, setProductMen] = useState([]);
    const [productsWomen, setProductWomen] = useState([]);
    const [mencategory, setmencategory] = useState({});
    const [womencategory, setwomencategory] = useState({});
    const [error, setError] = useState(false);
    const [limit, setlimit] = useState(1);
    const [skip, setskip] = useState(0);
    const [size, setsize] = useState(0);
    const [categories, setcategories] = useState('');
    const category = categories;
    useEffect(() => {
        loaddata();
      
    }, [])
    const loaddata = () => {
        getCategory().then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                const categories = data;
                categories.map((ca, i) => {
                    if (ca.name === 'MEN WATCH'&&ismen) {
                        loadProductMen(ca._id)
                    } else {
                        loadProductWomen(ca)
                    }
                })
            }
        })
    };
    const loadProductMen = (categoryid) => {
        getProductByCategory(categoryid,skip,limit)
        .then((response) => {
            if (response.error) {
                console.log(response.error);
            } else {
                setProductMen(response);
                setsize(response.length);
                setskip(0);
            }
        })
    }
    const loadProductWomen = (categoryid) => {
        getProductByCategory(categoryid,skip,limit).then((response) => {
            if (response.error) {
                console.log(response.error);
            } else {
                setProductWomen(response);
                setsize(response.length);
                setskip(0);
            }
        })
    };
    const loadmore = (ca) => {
        let toSkip = skip + limit;
        getProductByCategory(ca._id,toSkip, limit).then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductMen([...productsMen,...data]);
                setsize(data.length);
                setskip(toSkip);
            }
        });
    }
    const loadmorebutton = (categories) => {
        return (
            size > 0 && size >= limit && (
                <button className='btn btn-warining mb-4' onClick={loadmore(categories)}>Load more</button>
            )
        )
    }
    return (
        <div className='row wrapper'>  
        <div className='col-lg-10 col-12'>
            <h2 className='mb-4'>Products}</h2>
            <div className='row'>
                {ismen&&productsMen.map((product, i) => (
                    <div className='col-md-4 col-6 mb-3'  key={i}>
                        <Card product={product} />
                    </div>
                ))}
                {iswomen&&productsWomen.map((product, i) => (
                    <div className='col-md-4 col-6 mb-3' key={i}>
                        <Card product={product} />
                    </div>
                ))}
            </div>
            <hr />
           {loadmorebutton(categories)}
        </div>
    </div>
    )
}
export default Gender;