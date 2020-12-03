import React from 'react';
import { createBrowserHistory as createHistory } from 'history'
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import PrivateRoute from '../route/PrivateRoute';
import AdminRoute from '../route/AdminRoute';
//import Signin from '../user/Signin'
import SignIn from '../auth/signin';
import SignUp from '../auth/signup';
import Forgot from '../auth/Forgot';
import Reset from '../auth/Reset';
import Activate from '../auth/Activate';
//import Signup from '../user/Signup'
import Home from '../core/Home';
import Menu from '../core/Menu';
import UserDashboard from '../user/UserDashboard';
import AdminDashboard from '../user/AdminDashboard';
import Addcategory from '../admin/AddCategory';
import Addproduct from '../admin/AddProduct';
import Shop from '../core/Shop';
import Product from '../core/product';
import Cart from '../core/Cart';
import Orders from '../admin/Orders';
import Profile from '../user/profile';
import ManageProduct from '../admin/ManageProduct';
import UpdateProduct from '../admin/UpdateProduct';
import Search from '../core/Search';
import ManageCategory from '../admin/ManageCategory';
import Footer from '../core/footer';
import ScrollToTop from '../route/ScrollToTop';
import Men from '../core/Men';
import Women from '../core/Women';
import Checkout from '../core/Checkout';
import About from '../others/About';
export const history = createHistory();
const Routes = () => {
    return (
        <BrowserRouter history={history} onUpdate={() => window.scrollTo(0, 0)} >
            <React.Fragment>
                <ScrollToTop />
                <Menu />
                <div className='WRAPPER'>
                    <Switch>
                        <Route path='/' component={Home} exact={true} />
                        <Route path='/signup' component={SignUp} />
                        <Route path='/signin' component={SignIn} />
                        <Route path='/forgotpassword' component={Forgot} />
                        <Route path='/auth/password/reset/:token' component={Reset} />
                        <Route path='/auth/activate/:token' component={Activate} />
                        {/* <Route path='/signup' exact component={Signup} /> */}
                        <Route path='/home' exact component={Home} />
                        <Route path='/shop' exact component={Shop} />
                        <Route path='/search' exact component={Search} />
                        <Route path='/about' exact component={About} />
                        <Route path='/men' exact component={Men} />
                        <Route path='/women' exact component={Women} />
                        <Route path='/checkout' exact component={Cart} />
                        <Route path='/product/:productid' exact component={Product} />
                        <PrivateRoute path='/user/dashboard' exact component={UserDashboard} />
                        <PrivateRoute path='/profile/:userid' exact component={Profile} />
                        <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
                        <AdminRoute path='/admin/products' exact component={ManageProduct} />
                        <AdminRoute path='/admin/categories' exact component={ManageCategory} />
                        <AdminRoute path='/admin/orders' exact component={Orders} />
                        <AdminRoute path='/admin/addcategory' exact component={Addcategory} />
                        <AdminRoute path='/admin/addproduct' exact component={Addproduct} />
                        <AdminRoute path='/admin/updateproduct/:productid' exact component={UpdateProduct} />
                    </Switch>
                </div>
                <Footer />
            </React.Fragment>
        </BrowserRouter>
    )
}

export default Routes;