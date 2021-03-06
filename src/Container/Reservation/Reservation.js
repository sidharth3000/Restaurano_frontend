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
        console.log(this.state.date);
    }

    postResHandler = () => {


        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() ).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        var today = new Date(yyyy,mm,dd)

        var orderDate = new Date(this.state.date);

        if(orderDate<today){
            alert("You can't reserve a table in past date.")
        }

        else if(this.state.members>8){
            alert("Number of members cannot be greater then 8!")
        }

        else{
            this.setState({loading: true});
            const res = {
                members: this.state.members,
                date: this.state.date,
                userId: this.props.userId
            }
            axios.post('http://localhost:4000/api/res/RES' , res)
                .then(response => {
                    this.setState({loading: false});
                    this.setState({redirected: true})
                })
                .catch(error => {
                    this.setState({loading: false});
                });
        }
       
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
                                    <input type="date" className="res_input res_date" onChange={this.onDateChangeHandler}></input>
                                    
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