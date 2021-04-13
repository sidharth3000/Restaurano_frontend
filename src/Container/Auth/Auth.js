import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Modal from '../../UI/Modal/Modal';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Spinner from '../../UI/Spinner/Spinner';
import * as actions from '../../Store/actions/actions';
import HeadShake from 'react-reveal/HeadShake';

import './Auth.css'

class Auth extends Component {

    state = {
        email: null,
        password: null,
        signup: false
    }

    onEmailChangeHandler = (evt) => {
        this.setState({email: evt.target.value});
    }

    onPasswordChangeHandler = (evt) => {
        this.setState({password: evt.target.value});
    }

    onSubmitHandler = (event) => {
        this.props.onAuth(this.state.email, this.state.password, this.state.signup);
    }

    switchAuthModeHandker = () => {
        this.setState(prevstate => {
            return{
                signup: !prevstate.signup
            };
        });
    }

    render() {
        let authRedirect = null;
        if(this.props.isAuth){
            authRedirect = <Redirect to={this.props.buying ? "/checkout" : "/"} />
        }

        let form = <Modal show={true} >
                        <div className="auth_form">
                            <div className="auth_mode" onClick={this.switchAuthModeHandker}>
                                Switch to {this.state.signup ? "SING-IN" : "SIGN-UP"}
                            </div>

                            <div className="checkout_input_cont">
                                <input className="checkout_input" type="email" placeholder="Email" onChange={this.onEmailChangeHandler}></input>
                            </div>

                            <div className="checkout_input_cont">
                                <input className="checkout_input" type="password" placeholder="Password" onChange={this.onPasswordChangeHandler}></input>
                            </div>

                            <div className="checkout_order" onClick={this.onSubmitHandler}>Submit</div>
                           <Link to="/"> <div className="checkout_cancel">Cancel</div></Link>
                        </div>
                    </Modal>

        if(this.props.loading){
            form = <Spinner/>
        }

        let errMssg = null;

        if(this.props.error){
            errMssg = (
                <HeadShake><div className="auth_error">{this.props.error.message}</div></HeadShake>
            )
        }

        return (

            <div className="auth">
                {authRedirect}
                <Backdrop show={true}/>
                {errMssg}
                {form}

            </div>

        );
    }
}

const mapStateToProps = state => {
    return{
        loading: state.loading,
        error: state.error,
        isAuth: state.token !== null,
        buying: state.buying
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAuth: (email, password, signup) => dispatch(actions.auth(email, password, signup))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);