import React, { useState, useEffect } from 'react';
import { getCategory } from '../redux-store/actions/admin';
import { List } from '../redux-store/actions/product';
import Card from '../core/Card';

const Search = () => {
    const [data, setdata] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false
    });
    const { categories, category, search, searched, results } = data;
    const loaddata = () => {
        getCategory().then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                setdata({ ...data, categories: data })
            }
        })
    };
    useEffect(() => {
        loaddata();
    }, [])
    const handleChange = name => (e) => {
        setdata({ ...data, [name]: e.target.value, searched: false });
    }
    const searchedProducts = (results = []) => {
        return (
            <div>
                <h2 className='mt-4 mb-4'>
                    {searchMessage(searched, results)}
                </h2>
                <div className='row'>
                    {results.map((product, i) => (
                        <div className='col-6 col-md-4' key={i}>
                            <Card product={product} showviewbutton={false}/>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
    const searchSubmit = (e) => {
        e.preventDefault();
        searchData();
    }
    const searchMessage = (searched, results) => {
        if (searched && results.length > 0) {
            return `${results.length} products found`
        }
        if (searched && results.length < 1) {
            return `No products founds`
        }
    }
    const searchData = () => {
        //console.log(search,category)
        List({ search: search || undefined, category: category }).then((response) => {
            if (response.error) {
                console.log(response.error);
            } else {
                setdata({ ...data, results: response, searched: true })
            }
        })
    }
    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <div className='d-flex flex-row'>
                <div className='w-100'>
                    <div className='input-group-prepend'>
                        <select  onChange={handleChange('category')}>
                            <option value='All'>PICK A CATEGORY</option>
                            {categories.map((c, i) => (
                                <option key={i} value={c._id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className ='w-100 text-center mb-4 mt-4'>
                        <input
                            type='text'
                            className='input-text w-75 p-4'
                            placeholder='Search by name'
                            onChange={handleChange('search')} />
                    </div>
                </div>

            </div>
            <div className='text-center'>
                <button className='button w-75'>SEARCH</button>
            </div>
        </form>
    )
    return (
        <div className= 'search-wrapper'>
            <div className='container mb-3 mt-4'>
                {searchForm()}
            </div>
            <div className='container mb-3'>
                {searchedProducts(results)}
            </div>
        </div>
    )
}

export default Search;