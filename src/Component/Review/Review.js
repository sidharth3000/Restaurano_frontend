import React, { Component } from 'react';
import Slide from 'react-reveal/Slide';

import './Review.css'

class Review extends Component {
    render () {

        let stars =  <i className="fa fa-star star"></i>
            
        if(this.props.ratting<=1){
            stars = <div>
                        <i className="fa fa-star star"></i>
                    </div>
        }
        
        if(this.props.ratting==2){
            stars = <div>
                        <i className="fa fa-star star"></i>
                        <i className="fa fa-star star"></i>
                    </div>
        }

    if(this.props.ratting==3){
        stars = <div>
                    <i className="fa fa-star star"></i>
                    <i className="fa fa-star star"></i>
                    <i className="fa fa-star star"></i>
                </div>
    }

    if(this.props.ratting==4){
        stars = <div>
                    <i className="fa fa-star star"></i>
                    <i className="fa fa-star star"></i>
                    <i className="fa fa-star star"></i>
                    <i className="fa fa-star star"></i>
                </div>
    }

    if(this.props.ratting>=5){
        stars = <div>
                    <i className="fa fa-star star"></i>
                    <i className="fa fa-star star"></i>
                    <i className="fa fa-star star"></i>
                    <i className="fa fa-star star"></i>
                    <i className="fa fa-star star"></i>
                </div>
    }
    
        return(

            <Slide left>        
            <div className="review_view">

                <div className="review_stars">
                    {stars}
                </div>
        
               <div className="review_body">
                   {this.props.body}
                </div>
            
            </div>

            </Slide>  
        ) ;
    }
}



export default Review;