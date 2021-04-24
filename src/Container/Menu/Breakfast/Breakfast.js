import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import './Breakfast.css';
import Navbar from '../../../Component/Navbar/Navbar';
import Card from '../../../Component/Card/Card';
import Footer from '../../../Component/Footer/Footer'
import Modal from '../../../UI/Modal/Modal';
import Backdrop from '../../../UI/Backdrop/Backdrop';
import Spinner from '../../../UI/Spinner/Spinner';
import axios from "../../../axios-orders";
import * as actions from '../../../Store/actions/actions';

class Breakfast extends Component {

    componentDidMount () {
        window.scrollTo(0,0);
        this.props.onOrderCancelHandler();
    }

    render () {
        
        return(
            <div>
               <Navbar/>
            
                <Backdrop show={this.props.show} purchseCancel={this.props.onOrderCancelHandler}/>
                <Modal show={this.props.show} >

                    <div className="child_modal">

                        <img className="modal_image" src={'Assets/' + this.props.item_name + '.jpg'}/>
                        
                        <div className="menu_right">
                            <div className="modal_item">{this.props.item_name}</div>
                            <div className="modal_price">&#x20B9;{this.props.price}</div>

                            <div className="modal_desc"> {this.props.desc}
                            </div>

                            <Link to={this.props.isAuth ? "/checkout" : "/authenticate"} onClick={this.props.onBuy}><div className="modal_continue" >{this.props.isAuth ? "Continue" : "Authenticate"}</div></Link>
                            <div className="modal_cancel" onClick={this.props.onOrderCancelHandler}>Cancel</div>
                        </div>

                    </div>     
            
                </Modal>

               <div className="menu">

                <div className="meal_name">Breakfast</div>

                <div className="menu_cards">
                <Card name="coffee" cost="60" veg="1" desc="A refreshing cup to keep you going all day long."/>
                        <Card name="omelete" cost="100" veg="2" desc="An all time favourite breakfast dish in India, is jazzed up with tangy tomatoes,
                                    pepper , spices and other ingredients to make it mouth-watering."/>
                        <Card name="sandwich" cost="150" veg="1" desc="What's better than trying a Veg Grilled Sandwich to reminisce the popular
                                    Maharashtrian street food?"/>
                        <Card name="pancakes" cost="120" veg="2" desc="look no further because a steaming stack of
                                    perfectly soft, best fluffy pancakes are right
                                    here! weekends will never be the same again."/>
                </div>

               </div>

               <Footer/>

            </div>
        ) ;
    }
}

const mapStateToProps = state => {
    return{
        item_name: state.name,
        price: state.price,
        show: state.purchasing,
        isAuth: state.token !== null,
        buying: state.buying,
        desc: state.desc
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderHandler: (name,price, desc) => dispatch(actions.purchaseCont(name, price, desc)),
        onOrderCancelHandler: () => dispatch(actions.purchaseCancel()),
        onBuy : () => dispatch(actions.buyChange())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Breakfast);