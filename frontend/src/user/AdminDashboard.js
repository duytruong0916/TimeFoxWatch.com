import React from 'react';
import Layout from '../core/Layout';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
export class AdminDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { _id, name, email, role } = this.props.adminInfo.user;
        const adminLink = () => {
            return (
                <div className='card mb-3'>
                    <h3 className='card-header'>User Link</h3>
                    <ul className='list-group'>
                        <li className='list-group-item'>
                            <Link to='/admin/addcategory'>Add Category</Link>
                        </li>
                        <li className='list-group-item'>
                            <Link to='/admin/categories'>Manage Categories</Link>
                        </li>
                        <li className='list-group-item'>
                            <Link to={`/admin/addproduct`}>Add Products</Link>
                        </li>
                        <li className='list-group-item'>
                            <Link to='/admin/products'>Manage Products</Link>
                        </li>
                        <li className='list-group-item'>
                            <Link to='/admin/orders'>View Orders</Link>
                        </li>
                        
                    </ul>
                </div>
            )
        }
        const adminInfo = () => {
            return (
                <div className='card mb-5 container'>
                    <h3 className='card-header'>User Information</h3>
                    <ul className='list-group'>
                        <li className='list-group-item'>{name}</li>
                        <li className='list-group-item'>{email}</li>
                        <li className='list-group-item'>{role === 1 ? 'Admin' : 'User'}</li>
                    </ul>
                </div>
            )
        }
        return (
            <Layout title='UserDashbard' description= {`Hello ${name}`} className='containrt-fluid'>
                <div className ='row'>
                    <div className='col-md-3 '>
                             {adminLink()}
                    </div>
                    <div className ='col-md-9'>
                             {adminInfo()}
                    </div>
                </div>
            </Layout>
        )
    }
}
const MapStateToProps = (state) => ({
    islogin: !!state.auth.user,
    adminInfo: state.auth.user
})
export default connect(MapStateToProps)(AdminDashboard);