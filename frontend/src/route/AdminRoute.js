import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
export const AdminRoute =({isAuthenticated, user, component: Component, ...rest}) =>(
    <Route {...rest} render = {(props)=>(
        isAuthenticated && user.user.role===1? 
        (<div>
            <Component {...props}/>
        </div> 
        ): 
        (
            <Redirect to = "/home"/>
        )
    )}/>
)


const MapStateToProps =(state) => ({
    isAuthenticated: !!state.auth.user,
    user: state.auth.user
})
export default connect(MapStateToProps)(AdminRoute);