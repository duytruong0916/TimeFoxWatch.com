import React, { useState, useEffect, Fragment } from "react";
import ShowImage from "../core/ShowImage";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getPurchaseHistory } from "../redux-store/actions/user";
import { startLogOut } from "../redux-store/actions/auth";
import moment from "moment";
const UserDashboard = props => {
    const [purchasehistoy, setpurchasehistory] = useState([]);
    const { _id, firstname,lastname, address, phone, email, role } = props.userinfor.user;
    const loadPurchaseHistory = (userid, token) => {
        getPurchaseHistory(userid, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setpurchasehistory(data);
            }
        });
    };
    const userLink = () => {
        return (
            <div className="card mb-3">
                <div className="page-header-title text-center p-5">PROFILE</div>
                <ul className="list-group">
                    <li className="list-group-item"><span className='font-weight-bold'>Lastname:</span> {lastname}</li>
                    <li className="list-group-item"><span className='font-weight-bold'>Firstname</span> {firstname}</li>
                    <li className="list-group-item"><span className='font-weight-bold'>Email:</span> {email}</li>
                    <li className="list-group-item"><span className='font-weight-bold'>Address:</span> {address}</li>
                    <li className="list-group-item"><span className='font-weight-bold'>Phone:</span> {phone}</li>
                    <li className="list-group-item"><span className='font-weight-bold'>Role:</span> {role === 1 ? "Admin" : "User"}</li>
                    <li className="list-group-item text-center mt-4">
                        <Link to={`/profile/${_id}`}>
                            <button className="button-card p-4">EDIT PROFILE</button>
                        </Link>
                    </li>
                    <li
                        className="list-group-item text-center mt-2"
                        style={{ cursor: "pointer" }}>
                        <button className="button-card p-4" onClick={() => props.startLogout()}>LOG OUT</button>

                    </li>
                </ul>
            </div>
        );
    };
    const purchaseHistory = history => {
        return (
            <div className="mb-5 p-5">
                <div className='page-header-title text-center'>PURCHASE HISTORY</div>
                {purchasehistoy.length<1?<div className='text-center mt-5 text-danger'>YOU HAVE NO ORDER</div>:purchasehistoy.map((h, i) => {
                    return (
                        <div key={i}>
                            <hr />
                            <div className='page-header-title'>ORDER {i + 1}</div>
                            {h.products.map((p, i) => {
                                return (
                                    <div className='row p-5' key={i}>
                                            <div className='col-5 col-md-3 offset-md-3 pl-5 pt-3'><ShowImage product={p} url="product" /></div>
                                            <div className='col-6 col-md-6 font-weight-bold'>
                                                <h5>Product name: {p.name}</h5>
                                                <h5>Product price: ${p.price}</h5>
                                                <h5>Purchased date: {moment(p.createdAt).format("MMM Do YY")}</h5>
                                            </div>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        );
    };

    useEffect(() => {
        loadPurchaseHistory(props.userinfor.user._id, props.userinfor.token);
    }, []);
    return (
        <Fragment>
            <div className="row">
                <div className="col-md-5 col-12 p-5">{userLink()}</div>
                <div 
                     className={`${purchasehistoy.length>=1?'purchase-wrapper':''} col-md-7 col-12 `}>
                        {purchaseHistory()}
                </div>
            </div>
        </Fragment>
    );
};

const MapStateToProps = state => ({
    islogin: !!state.auth.user,
    userinfor: state.auth.user
});
const mapDispatchToProps = dispatch => ({
    startLogout: () => dispatch(startLogOut())
});
export default connect(MapStateToProps, mapDispatchToProps)(UserDashboard);
