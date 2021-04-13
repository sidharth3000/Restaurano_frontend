import React, { Component } from 'react';
import Bounce from 'react-reveal/Bounce';

import './Order.css'

class Order extends Component {
    render () {
    
        return(
            <Bounce bottom>
                <div className="order">

                    <div className="order_item">
                        {this.props.item}
                    </div>

                    <div className="order_price">
                        <p style={{display: "inline"}}>&#x20B9;{this.props.price}</p>    
                    </div>
                
                <div className="order_lower">
                    <div className="order_name">
                            {this.props.name}
                    </div>

                    <div className="order_detail">
                            {this.props.address}
                    </div>
                    
                    <div className="order_detail">
                            {this.props.phone}
                    </div>

                    <div className="order_detail">
                            {this.props.delivery}
                    </div>
                </div>
                
                
                </div>
            </Bounce>
        ) ;
    }
}



export default Order;