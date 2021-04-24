import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Card.css';
import * as actions from '../../Store/actions/actions'

class Card extends Component {

    render () {

        let veg = <i class="fa fa-circle non"></i>

        if(this.props.veg==1){
             veg = <i class="fa fa-circle veg"></i>
        }

        if(this.props.veg==2){
            veg = <i class="fa fa-circle egg"></i>
       }

        return(
            <div className="card">
                <img className="card_product" src={'Assets/' + this.props.name + '.jpg'}/>
                <div className="card_right">

                    <div className="card_name">{this.props.name}</div>
                    <div className="card_price">&#x20B9;{this.props.cost}</div>
{veg}
                    <div className="card_info">
                  {this.props.desc}
                    </div>
                    
                    <div onClick={this.props.onBuy}> <div className="buy" onClick={() => this.props.onOrderHandler(this.props.name, this.props.cost, this.props.desc)} >Add To Basket</div></div>
                   
                </div>
            </div>
        ) ;
    }
}

const mapStateToProps = state => {
    return{
        item_name: state.name,
        price: state.price,
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderHandler: (name,price,desc) => dispatch(actions.purchaseCont(name, price, desc)),
        onBuy : () => dispatch(actions.buyChange())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);