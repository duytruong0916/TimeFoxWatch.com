import React, { useState, useEffect } from 'react';
import Carousel from '../core/Carousel';
import Card from '../core/Card';
import Checkbox from '../core/Checkbox';
import Radiobox from '../core/Radiobox';
import { getCategory } from '../redux-store/actions/admin';
import { prices } from '../core/FixedPrice';
import { getFilteredProducts } from '../redux-store/actions/product';
const Shop = () => {
    const [categories, setCategory] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setlimit] = useState(6);
    const [skip, setskip] = useState(0);
    const [size, setsize] = useState(0);
    const [FilteredResults, setFilteredResults] = useState([]);
    const [myfilters, setFilter] = useState({
        filters: { category: [], price: [] }
    });

    const init = () => {
        getCategory().then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategory(data);
            }
        })
    }
    const handleChange = (filterBy) => (e) => {
        let filter_value = e.target.value;
        const newfilters = { ...myfilters };
        if (filter_value === 'All') {
            filter_value = categories;
        }
        newfilters.filters[filterBy] = filter_value;
        if (filterBy == 'price') {
            let pricevalues = handlePrice(filter_value);
            newfilters.filters[filterBy] = pricevalues;
        }
        loadFilterResults(newfilters.filters);
        setFilter(newfilters);
    }
    const handleFilter = (filter_value, filterBy) => {
        const newfilters = { ...myfilters }
        newfilters.filters[filterBy] = filter_value;
        if (filterBy == 'price') {
            let pricevalues = handlePrice(filter_value);
            newfilters.filters[filterBy] = pricevalues;
        }

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
        getFilteredProducts(skip, limit, filters).then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults(data.data);
                setsize(data.size);
                setskip(0);
            }
        });
    }
    const loadmore = () => {
        let toSkip = skip + limit;
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
    const loadmorebutton = () => {
        return (
            size > 0 && size >= limit && (
                <button className='button button-secondary' onClick={loadmore}>VIEW MORE</button>
            )
        )
    }
    useEffect(() => {
        init();
        loadFilterResults(skip, limit, myfilters.filters)
    }, [])
    const ShowRadioandCheckbox = () => (
        <div className='d-lg-block d-none '>
              <div className='section'>
                <div className='check-title'>SHOP BY PRICE</div>
                <ul className='check-option'>
                    <Radiobox prices={prices} handleFilter={(filter) => handleFilter(filter, 'price')} />
                </ul>
            </div>
            <div className='section'>
                <div className='check-title'>SHOP BY CATEGORY</div>
                <ul className='check-option'>
                    <Checkbox categories={categories} handleFilter={(filter) => handleFilter(filter, 'category')} />
                </ul>
            </div>
        </div>
    )
    const ShowSelectOption = () => (
        <div className ='d-lg-none d-block'>
            <div className='input-group-prepend'>
                <select  onChange={handleChange('category')}>
                    <option value='All'>SHOP CATEGORY</option>
                    {categories.map((c, i) => (
                        <option key={i} value={c._id}>{c.name}</option>
                    ))}
                </select>
            </div>
            <div className='input-group-prepend'>
                <select  onChange={handleChange('price')}>
                    <option >SHOP PRICE</option>
                    {prices.map((p, i) => (
                        <option key={i} value={p._id}>{p.name}</option>
                    ))}
                </select>
            </div>
        </div>

    )
    return (

        <div className='wrapper'>
               <Carousel />
            <div className='row'>
                <div className='col-lg-3 col-12'>
                    {ShowRadioandCheckbox()}
                    {ShowSelectOption()}
                </div>
                <div className='col-lg-9 col-12 p-3 mt-5 p-5'>
                    <div className='row'>
                        {FilteredResults.map((product, i) => (
                            <div className='col-lg-4 col-6 mb-3' key={i}>
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

export default Shop;