import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { connect } from 'react-redux';
import {  getCategory } from '../redux-store/actions/admin'
import { Link ,Redirect} from 'react-router-dom'
import { getProduct, updateProduct } from '../redux-store/actions/admin';

const AddProduct = (props) => {
    const [data, setdata] = useState({
        name: "",
        description: '',
        price: '',
        category: '',
        categories: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        success: '',
        formdata: ''
    })
    const { name, description, price, category, shipping, quantity, photo, loading, success, error , categories, formdata} = data;
    const loadProduct =(productid)=>{
        getProduct(productid).then(response=>{
            if(response.error){
                setdata({...data,error: response.error});
            }else{
                setdata({
                    ...data,
                    name: response.name,
                    description: response.description,
                    category: response.category._id,
                    price: response.price,
                    quantity: response.quantity,
                    shipping: response.shipping,
                    formdata: new FormData()
                })
                loadCategories();
            }
        })
    }
    const loadCategories = () => {
        getCategory().then(response => {
            if (response.error) {
                setdata({...data,error: response.error })
            } else {
                setdata({categories: response, formdata: new FormData() })
        }
        })
    }
    const showCategories = () => {
        if (categories) {
            return data.categories.map((c, i) => (
                <option key={i} value={c._id}>
                    {c.name}
                </option>
            ))
        }
    }
    useEffect(() => {
        loadProduct(props.match.params.productid);
       
     }, [])
    //This is the magic highlevel function
    const onChangeHanle = (name) => (event) => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formdata.set(name, value)
        setdata({ ...data, [name]: value });
    }
    const onSubmit = (e) => {
        e.preventDefault();
        updateProduct(props.match.params.productid, props.user.user._id, props.user.token, formdata)
        .then((response)=>{
            setdata({
                name: '',
                description: '',
                price: '',
                category: '',
                shipping: '',
                quantity: '',
                photo: '',
                error: '',
                success: 'Updated successfully!'
            }) 
        })
    }
    const AddProductForm = () => {
        return (
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <span className="font-weight-bold">Photo:</span>
                    <label className='btn btn-secondary'>
                        <input
                            type='file'
                            name="photo"
                            accept='image/*'
                            onChange={onChangeHanle('photo')} />
                    </label>
                </div>
                <div className='form-group'>
                    <span className="font-weight-bold">Product Name:</span>
                    <input
                        className={`text-input w-50 ml-4 ${!name && error ? 'missing-field' : ''}`}
                        type='text'
                        placeholder='Product name'
                        value={name}
                        onChange={onChangeHanle('name')} />
                </div>
                <div className='form-group'>
                    <span className="font-weight-bold">Description:</span>
                    <input
                        className={`text-input w-50 ml-4 ${!description && error ? 'missing-field' : ''}`}
                        type='text'
                        placeholder='Description'
                        value={description}
                        onChange={onChangeHanle('description')} />
                </div>
                <div className='form-group'>
                    <span className="font-weight-bold">Category:</span>
                    <select className={`text-input w-50 ml-4 ${!category && error ? 'missing-field' : ''}`} onChange={onChangeHanle('category')} >
                        <option value="" selected disabled hidden>Choose here</option>
                        {showCategories()}
                    </select>
                </div>
                <div className='form-group'>
                    <span className="font-weight-bold">Price:</span>
                    <input
                        className={`text-input w-50 ml-4 ${!price && error ? 'missing-field' : ''}`}
                        type='number'
                        placeholder='Price'
                        value={price}
                        onChange={onChangeHanle('price')} />
                </div>
                <div className='form-group'>
                    <span className="font-weight-bold">Shipping:</span>
                    <select
                        className={`text-input w-50 ml-4 ${!shipping && error ? 'missing-field' : ''}`}
                        onChange={onChangeHanle('shipping')} >
                        <option value="" selected disabled hidden>Choose here</option>
                        <option value='1'>Yes</option>
                        <option value='0'>No</option>
                    </select>
                </div>
                <div className='form-group'>
                    <span className="font-weight-bold">Quantity:</span>
                    <input
                        className={`text-input w-50 ml-4 ${!quantity && error ? 'missing-field' : ''}`}
                        type='number'
                        placeholder='Quantity'
                        value={quantity}
                        onChange={onChangeHanle('quantity')} />
                </div>
                {error && !success && (<div className='text-center mt-4 text-danger'>{error}</div>)}
                {!error && success && (<div className='text-center mt-4 text-success'>{success}</div>)}
                <div>
                    <button className="button mt-3 w-25">ADD</button>
                </div>
            </form>
        )
    }
    return (
        <Layout title='Add a new Product' description='Create a new Product' >
            {data.success&&<Redirect to='/admin/products'/>}
            <div className='row'>
                <div className='col-md-8 offset-md-2'>
                    {AddProductForm()}
                    <Link to='/admin/products'>Go back to view the products</Link>
                </div>
            </div>
        </Layout >

    )
}


const MapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.user,
    user: state.auth.user
})
const MapDispatchToProps = (dispatch) => ({
    // AddCategory: (userid, token, category) => dispatch(CreateCategory(userid, token, category))
})
export default connect(MapStateToProps, MapDispatchToProps)(AddProduct);