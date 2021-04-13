import React, {Component} from 'react';
import './App.css';
import { Route, withRouter } from 'react-router-dom';
import {connect} from 'react-redux'

import Home from './Container/Home/Home';
import Breakfast from './Container/Menu/Breakfast/Breakfast';
import Lunch from './Container/Menu/Lunch/Lunch';
import Dinner from './Container/Menu/Dinner/Dinner';
import Orders from './Container/Orders/Orders';
import Checkout from './Container/Checkout/Checkout';
import Feedback from './Container/Feedback/Feedback';
import Reservation from './Container/Reservation/Reservation';
import ShowRes from './Container/ShowRes/ShowRes';
import Auth from './Container/Auth/Auth';
import * as actions from './Store/actions/actions';


class App extends Component {

  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  componentDidMount(){
    document.title = "Resturano"
  }


  render() {

    let routes =  <div>
                   <Route path='/authenticate' component={Auth} exact/>
                    <Route path='/feedback' component={Feedback} exact/>
                    <Route path='/checkout' component={Checkout} exact/>
                    <Route path='/orders' component={Orders} exact/>
                    <Route path="/breakfast" component={Breakfast} exact/>
                    <Route path="/lunch" component={Lunch} exact/>
                    <Route path="/dinner" component={Dinner} exact/>
                    <Route path="/" exact component={Home} exact/>
                    <Route path="/reservation" component={Reservation} exact/>
                    <Route path="/show" component={ShowRes} exact/>
                  </div>
     if(this.props.isAuth){
       routes=   <div>
                    <Route path='/authenticate' component={Auth} exact/>
                    <Route path='/feedback' component={Feedback} exact/>
                    <Route path='/checkout' component={Checkout} exact/>
                    <Route path='/orders' component={Orders} exact/>
                    <Route path="/breakfast" component={Breakfast} exact/>
                    <Route path="/lunch" component={Lunch} exact/>
                    <Route path="/dinner" component={Dinner} exact/>
                    <Route path="/reservation" component={Reservation} exact/>
                    <Route path="/" exact component={Home} exact/>
                    <Route path="/show" component={ShowRes} exact/>
                  </div>
     }

      return (

        <div>
        {routes}
      </div>

      );
  }
}

const mapStateToProps = state => {
  return{
      isAuth: state.token !== null
     
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
