import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import './Lunch.css';
import Navbar from '../../../Component/Navbar/Navbar';
import Card from '../../../Component/Card/Card';
import Footer from '../../../Component/Footer/Footer'
import Modal from '../../../UI/Modal/Modal';
import Backdrop from '../../../UI/Backdrop/Backdrop';
import Spinner from '../../../UI/Spinner/Spinner';
import axios from "../../../axios-orders";
import * as actions from '../../../Store/actions/actions';

class Dinner extends Component {

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

                            <Link to={this.props.isAuth ? "/checkout" : "/authenticate"}><div className="modal_continue" >{this.props.isAuth ? "Continue" : "Authenticate"}</div></Link>
                            <div className="modal_cancel" onClick={this.props.onOrderCancelHandler}>Cancel</div>
                        </div>

                    </div>     
            
                </Modal>

               <div className="menu">

                <div className="meal_name">Lunch</div>

                <div className="menu_cards">
                <Card name="Pasta" cost="150" veg="1" desc="a desi or spicy twist to the authentic Italian pasta to meet the
                                    taste buds of spice lovers."/>
                        <Card name="Fried_Rice" cost="200" veg="1" desc="This classic fried rice is loaded with fresh mixed
                                    veggies and aromatic spices for an incredibly hearty,
                                    flavourful vegan dish."/>
                        <Card name="Pizza" cost="450" veg="1" desc="Hot, cheesy pizza loaded with your favourite veggies
                                    and bursting cheese from everywhere."/>
                        <Card name="Fried_Chicken" cost="300" veg="0" desc="Always a picnic favorite, this deep fried chicken is delicious either hot or cold."/>
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
        desc: state.desc
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderHandler: (name,price) => dispatch(actions.purchaseCont(name, price)),
        onOrderCancelHandler: () => dispatch(actions.purchaseCancel()),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dinner);