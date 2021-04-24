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
                            <div className="modal_desc">{this.props.desc}
                            </div>
                            <Link to={this.props.isAuth ? "/checkout" : "/authenticate"}><div className="modal_continue" >{this.props.isAuth ? "Continue" : "Authenticate"}</div></Link>
                            <div className="modal_cancel" onClick={this.props.onOrderCancelHandler}>Cancel</div>
                        </div>

                    </div>     
            
                </Modal>

               <div className="menu">

                <div className="meal_name">Dinner</div>

                <div className="menu_cards">
                         <Card name="Butter_Chicken" cost="600" veg="0" desc="Aromatic golden chicken pieces in an incredible
                                    creamy curry sauce, this Butter Chicken is one of
                                    the best you will try!"/>
                        <Card name="Butter_Paneer" cost="400" veg="1" desc="The dish has a lovely tang coming from the tomatoes and
                                    is slightly sweet with a creamy and velvety feel to it."/>
                        <Card name="Mushroom_Roast" cost="350" veg="1" desc="Mushroom roast spicy sauteed mushroom preparation.
                                    Gluten-free and vegan. Eat it and you will repeat it."/>
                        <Card name="Pulao" cost="180" veg="1" desc="Pulao is comfort food at its best and I make it when I
                                    want to cook something quick, easy and satisfying.
                                    This one-pot dish made with rice and vegetables has
                                    added spices and herbs, giving it a mild aromatic
                                    flavour."/>
                        <Card name="Roti" cost="11" veg="1" desc="Tandoori roti are made Traditionally in a tandoor (a pot
                                    shaped clay oven) and ideal for you."/>
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