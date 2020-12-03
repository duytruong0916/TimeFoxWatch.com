import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { getCategory, deleteCategory } from '../redux-store/actions/admin';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';;

const ManageCategory = (props) => {
    const [categories, setcategories] = useState([]);
    const [deleted, setdeleted] = useState(false)
    const {user, token} = props.user;
    const loadCategories = () => {
        getCategory().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setcategories(data)
            }
        })
    }
    const onRemoveHandler= (category) => {
        deleteCategory(category,user._id, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                loadCategories();
                setdeleted(true);
            }
        })
    }

    const ShowTable = (categories) => {
        return (
            <div>
                {categories.map((category,i)=>(
                     <div class='mt-5' key={i}>
                        <span className='p-3 ml-2 border d-block d-xl-inline'>
                            <span className='font-weight-bold'>ID:</span> {category._id}
                        </span>
                        <span className='p-3 ml-2 border d-block d-xl-inline'>
                            <span className='font-weight-bold'>NAME:</span> {category.name}
                        </span>
                        <span className='p-3 ml-2 border d-block d-xl-inline'>
                            <span className='font-weight-bold'>ACTION: </span>
                            <Link className='ml-2' onClick= {()=>onRemoveHandler(category._id)}>Delete</Link>
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
        loadCategories();
    }, [])

    return (
          <div className='category-wrapper'>
                <h2 className='mb-4'>Total {categories.length} categories:</h2>
                {ShowMessage(deleted)}
                {ShowTable(categories)}
            </div>

    )
}

const mapStatetoProps = (state) => ({
    islogin: !!state.auth.user,
    user: state.auth.user
})
export default connect(mapStatetoProps)(ManageCategory); 
