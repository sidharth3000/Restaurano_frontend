import React, { Component } from 'react';
import Bounce from 'react-reveal/Bounce';

import './Res.css'

class Order extends Component {
    render () {
    
        return(
            <Bounce bottom>
                <div className="res">

                    <div>You have a Reservation for <span className="res_specific">{this.props.members}</span> people on <span className="res_specific">{this.props.date}.</span></div>
                
                
                </div>
            </Bounce>
        ) ;
    }
}



export default Order;