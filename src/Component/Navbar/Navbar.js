import React, { Component } from 'react';
import {NavLink, Link} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../Store/actions/actions';

import './Navbar.css'

class Navbar extends Component {

    state = {
        theposition: 0
    }

    componentDidMount() {
        window.addEventListener('scroll', this.listenToScroll)
      }
      
      componentWillUnmount() {
        window.removeEventListener('scroll', this.listenToScroll)
      }
      
      listenToScroll = () => {
        const winScroll =
          document.body.scrollTop || document.documentElement.scrollTop
      
        const height =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight
      
        const scrolled = winScroll / height
      
        this.setState({
          theposition: scrolled,
        })
      }
    
    render () {

        let nav =  <div className='navbar_container'>

        <div className="navbar_logo">
            <img className='navbar_img' src={"Assets/logo.png"} alt="logo" />
                    
        </div>
           
            <div className='navbar_name'>RESTURANO</div>
            <NavLink to="/" exact>
                <div className="home navbar_links">Home</div>
            </NavLink>
           
            {this.props.isAuth ?
           <NavLink to="/orders" className="navbar_links" exact>
           <div className="orders">Orders</div>
           </NavLink>:
           null}
           
           {this.props.isAuth ?
           <div  className="navbar_links" exact>
                <div class="dropdown">
                <div class="dropbtn">Reservations</div>
                <div class="dropdown-content">
                <NavLink to="/reservation" className="navbar_links" exact>Make</NavLink>
                <NavLink to="/show" className="navbar_links" exact>Show</NavLink>
                </div>
                </div>
           </div> :
           null}
           
           <NavLink to="/feedback" className="navbar_links" exact>
           <div className="feed">Feedback</div>
           </NavLink>

        {this.props.isAuth ?
            <Link to="/" className="navbar_links" exact>
           <div className="feed" onClick={this.props.onLogoutHandler}>Logout</div>
            </Link>
           
           :
           <Link to="/authenticate" className="navbar_links" exact>
           <div className="feed">Authenticate</div>
            </Link>
}              
        </div>

                    if(this.state.theposition>0.1){
                        nav=<div className='navbar_container lite'>

                        <div> </div>
                           
                            <div className='navbar_name'>RESTURANO</div>
                            <NavLink to="/" exact>
                                <div className="home navbar_links">Home</div>
                            </NavLink>
                           
                            {this.props.isAuth ?
                           <NavLink to="/orders" className="navbar_links" exact>
                           <div className="orders">Orders</div>
                           </NavLink>:
                           null}
                           
                           {this.props.isAuth ?
                           <div  className="navbar_links" exact>
                                <div class="dropdown">
                                <div class="dropbtn">Reservations</div>
                                <div class="dropdown-content">
                                <NavLink to="/reservation" className="navbar_links" exact>Make</NavLink>
                                <NavLink to="/show" className="navbar_links" exact>Show</NavLink>
                                </div>
                                </div>
                           </div> :
                           null}
                           
                           <NavLink to="/feedback" className="navbar_links" exact>
                           <div className="feed">Feedback</div>
                           </NavLink>
            
                        {this.props.isAuth ?
                            <Link to="/" className="navbar_links" exact>
                           <div className="feed" onClick={this.props.onLogoutHandler}>Logout</div>
                            </Link>
                           
                           :
                           <Link to="/authenticate" className="navbar_links" exact>
                           <div className="feed">Authenticate</div>
                            </Link>
            }              
                        </div>
                    }

        return(
            <div>
                {nav}
            </div>
        ) ;
    }
}

const mapStateToProps = state => {
    return{
        isAuth: state.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogoutHandler: () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);