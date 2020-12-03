import React, { useState, useEffect, Fragment } from 'react';
import Carousel from '../core/Carousel';
import { getProductByCategory } from '../redux-store/actions/product';
import { getCategory } from '../redux-store/actions/admin';
import Card from '../core/Card';
import { prices } from '../core/FixedPrice';
import { getFilteredProducts } from '../redux-store/actions/product';
const Gender = ({ ismen = false, iswomen = false, isaccessories }) => {
    const [product, setproduct] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setlimit] = useState(6);
    const [skip, setskip] = useState(0);
    const [size, setsize] = useState(0);
    const [categories, setcategories] = useState('');
    const [isfilterd, setisfiltered] = useState(false)
    const [FilteredResults, setFilteredResults] = useState([]);
    const [myfilters, setFilter] = useState({
        filters: { category: [], price: [] }
    });
    const loaddata = () => {
        getCategory().then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                const categories = data;
                setcategories(categories);
                categories.map((ca, i) => {
                    if (ca.name === 'MEN WATCH' && ismen) {
                        loadProduct(ca)
                    } else if (ca.name === 'WOMEN WATCH' && iswomen) {
                        loadProduct(ca)
                    }
                })
            }
        })
    };

    const loadProduct = (ca) => {
        getProductByCategory(ca._id, skip, limit).then((response) => {
            if (response.error) {
                console.log(response.error);
            } else {
                setproduct(response);
                setsize(response.length);
                setskip(0);
            }
        })
    };
    const loadmore = () => {
        let toSkip = skip + limit;
        let categoryid = '';
        for (let category of categories) {
            if (category.name === 'MEN WATCH'&&ismen===true) {
                categoryid = category._id
            } else if (category.name === 'WOMEN WATCH'&&iswomen===true) {
                categoryid = category._id
            }
        }
        if (isfilterd===false) {
            getProductByCategory(categoryid, toSkip, limit).then((data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setproduct([...product, ...data]);
                    setsize(data.length);
                    setskip(toSkip);
                }
            });
        } else {
            getFilteredProducts(toSkip, limit, myfilters.filters).then((data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setFilteredResults([...FilteredResults, ...data.data]);
                    setsize(data.size);
                    setskip(toSkip);
                }
            });
        }

    }
    const loadmorebutton = () => {
        return (
            size > 0 && size >= limit && (
                <button className='button button-secondary' onClick={loadmore}>VIEW MORE</button>
            )
        )
    }
    useEffect(() => {
        loaddata();
        //loadFilterResults(skip, limit, myfilters.filters)
    }, [])

    const handleChange = (filterBy) => (e) => {
        setisfiltered(true); //using filtered data
        let categoryid = '';
        const newfilters = { ...myfilters };
        for (let category of categories) {
            if (category.name === 'MEN WATCH'&&ismen===true) {
                categoryid = category._id;
                newfilters.filters['category'] = categoryid;
                console.log(categoryid)

            } else if (category.name === 'WOMEN WATCH'&&iswomen===true) {
                categoryid = category._id;
                newfilters.filters['category'] = categoryid;
                console.log(categoryid)
            }
        }
        let filter_value = e.target.value;
        let pricevalues = handlePrice(filter_value);
        newfilters.filters[filterBy] = pricevalues;
        loadFilterResults(newfilters.filters);
        setFilter(newfilters);
    }

    const handlePrice = (value) => {
        const data = prices;
        let array = [];
        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    }
    const loadFilterResults = (filters) => {
        //console.log(filters)
        getFilteredProducts(0, limit, filters).then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults(data.data);
                setsize(data.size);
                setskip(0);
            }
        });
    }
    const ShowSelectOption = () => (
        <div className='input-group-prepend '>
            <select onChange={handleChange('price')}>
                <option >SHOP BY PRICE</option>
                {prices.map((p, i) => (
                    <option key={i} value={p._id}>{p.name}</option>
                ))}
            </select>
        </div>
    )
    return (
        <div>
            <Carousel />
            {ismen&&<div className ='poster-men w-100'></div>}
            {iswomen&&<div className ='poster-women'></div>}
            <div className='row'>
                <div className='col-md-3 col-12'>
                    {ShowSelectOption()}
                </div>
                <div className='col-md-9 col-12 mt-5 p-5'>
                    <div className='row'>
                        {isfilterd===false && product.map((product, i) => (
                            <div className='col-md-4 col-6 mb-3' key={i}>
                                <Card product={product} showviewbutton={false} />
                            </div>
                        ))}
                        {isfilterd ===true && FilteredResults.map((product, i) => (
                            <div className='col-md-4 col-6 mb-3' key={i}>
                                <Card product={product} showviewbutton={false} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <hr />
            <div className='w-100 text-center p-5'>
                 {loadmorebutton()}
            </div>
        </div>
    )
}
export default Gender;