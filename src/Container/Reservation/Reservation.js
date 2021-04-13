import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders'
import {Link, Redirect} from 'react-router-dom';

import './Reservation.css';
import Navbar from '../../Component/Navbar/Navbar'
import Footer from '../../Component/Footer/Footer'
import Spinner from '../../UI/Spinner/Spinner'
import * as actions from '../../Store/actions/actions'

class Reservation extends Component {

    state = {
        members: null,
        date: null,
        loading: false,
        res: null,
        redirected: false
    }

    onMembersChangeHandler = (evt) => {
        this.setState({members: evt.target.value});
    }

    onDateChangeHandler = (evt) => {
        this.setState({date: evt.target.value});
    }

    postResHandler = () => {
        console.log("clicked")
        this.setState({loading: true});
        const res = {
            members: this.state.members,
            date: this.state.date,
            userId: this.props.userId
        }
        axios.post('/reservation.json?auth=' + this.props.token, res)
            .then(response => {
                this.setState({loading: false});
                this.setState({redirected: true})
            })
            .catch(error => {
                this.setState({loading: false});
            });
    }

    render () {

        let redirect = null;
        if(this.state.redirected){
            redirect = <Redirect to="/show"/>
        }

        let content =  <div >
                             <div className="orders_heading">Make Reservation</div>

                                <div className="reserve">
                                    <div className="res_input_outer">
                                        <input placeholder="Number of members" className="res_input" maxLength="2" onChange={this.onMembersChangeHandler}></input>
                                    </div>

                                    <div className="res_input_outer">
                                        <input placeholder="Date DD//MM" className="res_input" maxLength="5" onChange={this.onDateChangeHandler}></input>
                                    </div>

                                    <div className="reserve_bttn" onClick={this.postResHandler}>Reserve</div>
                                </div>

                                {redirect}
                        </div>

        if(this.state.loading){
        content = <Spinner/>
        }


        return(
            <div>
                <Navbar/>

                    {content}
               
                <Footer/>
            </div>
        ) ;
    }
}

const mapStateToProps = state => {
    return{
        item_name: state.name,
        price: state.price,
        token: state.token,
        userId: state.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderHandler: (name,price) => dispatch(actions.purchaseCont(name,price))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reservation);