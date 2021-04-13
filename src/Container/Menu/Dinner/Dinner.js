import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import './Dinner.css';
import Navbar from '../../../Component/Navbar/Navbar';
import Card from '../../../Component/Card/Card';
import Footer from '../../../Component/Footer/Footer'
import Modal from '../../../UI/Modal/Modal';
import Backdrop from '../../../UI/Backdrop/Backdrop';
import Spinner from '../../../UI/Spinner/Spinner';
import axios from "../../../axios-orders";
import * as actions from '../../../Store/actions/actions';

class Dinner extends Component {

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
                            <Link to={this.props.isAuth ? "/checkout" : "/authenticate"}><div className="modal_continue" >{this.props.isAuth ? "Continue" : "Authenticate"}</div></Link>
                            <div className="modal_cancel" onClick={this.props.onOrderCancelHandler}>Cancel</div>
                        </div>

                    </div>     
            
                </Modal>

               <div className="menu">

                <div className="meal_name">Dinner</div>

                <div className="menu_cards">
                        <Card name="Butter_Chicken" cost="600" veg="0"/>
                        <Card name="Butter_Paneer" cost="400" veg="1"/>
                        <Card name="Mushroom_Roast" cost="350" veg="1"/>
                        <Card name="Pulao" cost="180" veg="1"/>
                        <Card name="Roti" cost="11" veg="1"/>
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
        isAuth: state.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderHandler: (name,price) => dispatch(actions.purchaseCont(name, price)),
        onOrderCancelHandler: () => dispatch(actions.purchaseCancel()),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dinner);