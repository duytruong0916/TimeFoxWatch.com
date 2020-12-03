import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import Menu from '../core/Menu';
export const PrivateRoute =({isAuthenticated, component: Component, ...rest}) =>(
    <Route {...rest} render = {(props)=>(
        isAuthenticated ? 
        (<div>
            <Component {...props}/>
        </div> 
        ): 
        (
            <Redirect to = "/signin"/>
        )
    )}/>
)


const MapStateToProps =(state) => ({
    isAuthenticated: !!state.auth.user
})
export default connect(MapStateToProps)(PrivateRoute);