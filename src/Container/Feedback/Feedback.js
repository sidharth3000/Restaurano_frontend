import React, { Component } from 'react';
import axios from 'axios';
import HeadShake from 'react-reveal/HeadShake';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import Navbar from '../../Component/Navbar/Navbar';
import Footer from '../../Component/Footer/Footer';
import Review from '../../Component/Review/Review';
import Spinner from '../../UI/Spinner/Spinner';
import * as actions from '../../Store/actions/actions';
import './Feedback.css';

class Feedback extends Component {

    state = {
        loading: true,
        review: "NA",
        stars: "not rated",
        reviews: [],
        orders: []
    }
       

    componentDidMount () {

        // const query = '?auth=' + this.props.token + '&orderBy="userId"&equalTo="' + this.props.userId + '"';
        // axios.get( '/orders.json' + query)
        // .then(res => {
        //     const fetchedOrders = [];
        //     for(let key in res.data) {
        //         fetchedOrders.push({
        //             ...res.data[key],
        //             id: key
        //         });
        //     }
        //     this.setState({loading: false, orders: fetchedOrders})
        // })
        // .catch(err =>{
        //     this.setState({loading: false})
        // })



        axios.get('http://localhost:4000/api/feed/GETFEED')
        .then(res => {
            const fetchedReviews = [];
            for(let key in res.data.result) {
                fetchedReviews.push({
                    ...res.data.result[key],
                    id: key
                });
            }
            this.setState({loading: false, reviews: fetchedReviews})
        })
        .catch(err =>{
            this.setState({loading: false})
        })
    }

    onReviewChangeHandler = (evt) => {
        this.setState({review: evt.target.value});
    }

    onRatingChangeHandler = (evt) => {
        this.setState({stars: evt.target.value});
    }

    postReviewHandler = () => {
        
    //    if( (this.state.orders.length) > 0){
        this.setState({loading: true});
        const review = {
            body: this.state.review,
            stars: this.state.stars
        }
        axios.post('http://localhost:4000/api/feed/Feedback', review)
            .then(response => {
                this.setState({loading: false});
                window.scrollTo(0,0)
            })
            .catch(error => {
                this.setState({loading: false});
            });
    //    }

    //    else{
    //        alert("You need to order something first to write a review!")
    //    }

       
    }

    onScroll () {
        window.scrollTo(0,100000000000000000000000000000000000000)
    }


    render () {

        let posts =
        <div>
             <HeadShake>
                <button className="review_write_bttn" onClick={this.onScroll}>
                <i className="fa fa-pencil pencil"></i>
                    Write a review
                </button>
                </HeadShake>

                <div className="read_reviews">
                        {this.state.reviews.map(review =>(
                            <Review 
                                    ratting={review.stars}
                                    body={review.body}
                            />
                        ))}
                    </div>
        </div>
       
    
        if(this.state.loading){
            posts=<Spinner/>
        }
       
        // const query = '?auth=' + this.props.token + '&orderBy="userId"&equalTo="' + this.props.userId + '"';
        // axios.get( '/orders.json' + query)
        // .then(res => {
        //     const fetchedOrders = [];
        //     for(let key in res.data) {
        //         fetchedOrders.push({
        //             ...res.data[key],
        //             id: key
        //         });
        //     }
        //     this.setState({loading: false, orders: fetchedOrders})
        // })
        // .catch(err =>{
        //     this.setState({loading: false})
        // })

        return(
            
            <div>
               <Navbar/>

            <div className="feedback_cont">

                <div className="feedback_head">
                    Feedback
                </div>

               {posts}

               <div className="review">

                   <div className="rating_outer">
                       <input type="text" placeholder="Ratings (1-5)" className="review_rating" onChange={this.onRatingChangeHandler}></input>
                   </div>

                   <div className="write_outer">
                       <input type="text" placeholder="write your review here" className="review_write" onChange={this.onReviewChangeHandler}></input>
                   </div>

                    {this.props.isAuth ? 
                    <div className="review_post" onClick={this.postReviewHandler}>Post</div>
                     :
                     <Link to="/authenticate"><div className="review_post" >Authenticate</div></Link>
                     }
                   
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
        token: state.token,
        userId: state.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderHandler: (name,price) => dispatch(actions.purchaseCont(name, price)),
        onOrderCancelHandler: () => dispatch(actions.purchaseCancel()),
        onBuy : () => dispatch(actions.buyChange())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);