import React from 'react';
import {connect} from 'react-redux';
import  {Route, Redirect} from  'react-router-dom';
export const  PublicRoute = ({isAuthenticated, component: Component, ...rest}) =>(
    <Route {...rest} render ={(props)=>(
        <Fragment>
                <Component {...props}/>     
        </Fragment>
        )}/>
)

const MapStateToProps =(state) =>({
    isAuthenticated: !!state.auth.uid
})
export default connect(MapStateToProps)(PublicRoute); 