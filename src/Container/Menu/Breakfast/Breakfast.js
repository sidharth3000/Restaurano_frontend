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

                            <div className="modal_desc"> Lorem Ipsum is simply dummy text of the printing and typesetting
                                try. Lorem Ipsum has been the industry's standard dummy text ever since
                                1500s
                            </div>

                            <Link to={this.props.isAuth ? "/checkout" : "/authenticate"} onClick={this.props.onBuy}><div className="modal_continue" >{this.props.isAuth ? "Continue" : "Authenticate"}</div></Link>
                            <div className="modal_cancel" onClick={this.props.onOrderCancelHandler}>Cancel</div>
                        </div>

                    </div>     
            
                </Modal>

               <div className="menu">

                <div className="meal_name">Breakfast</div>

                <div className="menu_cards">
                        <Card name="coffee" cost="60" veg="1"/>
                        <Card name="omelete" cost="100" veg="2"/>
                        <Card name="sandwich" cost="150" veg="1"/>
                        <Card name="pancakes" cost="120" veg="1"/>
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
        buying: state.buying
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderHandler: (name,price) => dispatch(actions.purchaseCont(name, price)),
        onOrderCancelHandler: () => dispatch(actions.purchaseCancel()),
        onBuy : () => dispatch(actions.buyChange())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Breakfast);