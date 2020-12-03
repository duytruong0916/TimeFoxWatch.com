import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { getProducts, deleteProduct } from '../redux-store/actions/admin';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const ManageProduct = (props) => {
    const [products, setproducts] = useState([]);
    const [deleted, setdeleted] = useState(false)
    const {user, token} = props.user;
    const loadProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setproducts(data)
            }
        })
    }
    const onRemoveHandler= (productid) => {
        deleteProduct(productid,user._id, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                loadProducts();
                setdeleted(true);
            }
        })
    }

    const ShowTable = (products) => {
        return (
            <div>
                {products.map((product,i)=>(
                     <div class='mt-5' key={i}>
                        <span className='p-3 ml-2 border d-block d-xl-inline'>
                            <span className='font-weight-bold'>ID:</span> {product._id}
                        </span>
                        <span className='p-3 ml-2 border d-block d-xl-inline'>
                            <span className='font-weight-bold'>NAME:</span> {product.name}
                        </span>
                        <span className='p-3 ml-2 border d-block d-xl-inline'>
                            <span className='font-weight-bold'>DESCRIPTION:</span> {product.description.substring(50,0)}
                        </span>
                        <span className='p-3 ml-2 border d-block d-xl-inline'>
                            <span className='font-weight-bold'>PRICE:</span> ${product.price}
                        </span>
                        <span className='p-3 ml-2 border d-block d-xl-inline'>
                            <span className='font-weight-bold'>ACTION: </span>
                            <Link className='ml-2' onClick= {()=>onRemoveHandler(product._id)}>Delete</Link>
                            <Link className='ml-2' to={`/admin/updateproduct/${product._id}`}>Update</Link>
                        </span>
                    </div>
                ))}
            </div>

        )
    }
    const ShowMessage= (deleted)=>{
       let timer = setTimeout(() => {
            setdeleted(false)
            return clearTimeout(timer);
          }, 3000);
        return deleted&&<h2 className= 'text-center text-success'>Deleted Successfully</h2>
    }
    useEffect(() => {
        loadProducts();
    }, [])

    return (
        <Layout title='Manage Product' description='Manage your product'>
            <div >
                <h2 className='mb-4'>Total {products.length} products:</h2>
                {ShowMessage(deleted)}
                {ShowTable(products)}
            </div>


        </Layout>
    )
}

const mapStatetoProps = (state) => ({
    islogin: !!state.auth.user,
    user: state.auth.user
})
export default connect(mapStatetoProps)(ManageProduct); 
