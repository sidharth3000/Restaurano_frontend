import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders'

import './ShowRes.css';
import Navbar from '../../Component/Navbar/Navbar'
import Footer from '../../Component/Footer/Footer'
import Res from '../../Component/Res/Res'
import Spinner from '../../UI/Spinner/Spinner'
import * as actions from '../../Store/actions/actions'

class Home extends Component {

    state = {
        reservations: [],
        loading: true
    }

    componentDidMount () {

        window.scrollTo(0,0)
       
        const userId = localStorage.getItem('userId');

        axios.get('http://localhost:4000/api/res/GETRES',  {
            headers: {
              id:  userId 
            }
           })
        .then(res => {
            const fetchedres = [];
            for(let key in res.data.result) {
                fetchedres.push({
                    ...res.data.result[key],
                    id: key
                });
            }
            this.setState({loading: false, reservations: fetchedres})
        })
        .catch(err =>{
            this.setState({loading: false})
        })
    }

    render () {

        let content =  <div className="ress">
                           {this.state.reservations.map(reservations =>(
                                <Res 
                                        // key={order.id}
                                        members={reservations.members}
                                        date={reservations.date}
                                />
                            ))}
                        </div>

        if(this.state.loading){
            content = <Spinner/>
        }

        return(
            <div>
                <Navbar/>

                <div className="orders_heading">Your Reservations</div>

                {content}
                
                <Footer/>
            </div>
        ) ;
    }
}

const mapStateToProps = state => {
    return{
        item_name: state.name,
        price: state.price,
        token: state.token,
        userId: state.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderHandler: (name,price) => dispatch(actions.purchaseCont(name,price))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);