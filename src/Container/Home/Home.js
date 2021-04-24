import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Bounce from 'react-reveal/Bounce';
import { connect } from 'react-redux';

import Navbar from '../../Component/Navbar/Navbar';
import Footer from '../../Component/Footer/Footer'
import Backdrop from '../../UI/Backdrop/Backdrop';
import * as actions from '../../Store/actions/actions';

import './Home.css'

class Home extends Component {

    componentDidMount() {
        window.scrollTo(0,0);
        this.props.onBuycancel();
      }

    render () {
    
        return(
            <div>
                <Navbar/>
                
                <div class="home_parallax">
                
                    <div className='home_name'>
                        <Bounce bottom> 
                            <span style={{fontSize:"50px"}}>Welcome To</span><br/>
                            <span style={{color: "#"}} className="home_cursive">The RESTURANO</span> 
                        </Bounce>
                    </div>
                    
                </div>
                
                <div className='home_discover'>
                    <div className='home_discover_head'>DISCOVER</div>

                    <div className="home_cardholder">
                        <Link to="/breakfast" className="link">
                            <div className='home_card'>
                            <img className='home_discover_img' src={'Assets/breakfast.png'}></img>
                            <div className='home_time'>Breakfast</div>
                            <div className="home_desc">Our pasta is fresh, our wine is old.</div>
                            </div>
                        </Link>


                    <Link to="/lunch" className="link">
                        <div className='home_card'>
                            <img className='home_discover_img' src={'Assets/lunch.png'}></img>
                            <div className='home_time'>Lunch</div>
                            <div className="home_desc">We’ve got something for everyone, fuel for your life.</div>
                        </div>
                    </Link>

                    <Link to="/dinner" className="link">
                        <div className='home_card'>
                            <img className='home_discover_img' src={'Assets/dinner.png'}></img>
                            <div className='home_time'>Dinner</div>
                            <div className="home_desc">No one ever regrets a healthy meal!.</div>
                        </div>
                    </Link>
                    </div>

                   
                </div>

                <div className='chefs'>

                    <div className='home_team_head'>Our Chefs</div>

                    <div className="home_cardholder">
                        <div className='chef_card'>
                            <img src={'../../Assets/chef.jpg'}></img>
                            <div className="chef_name">Sidharth</div>
                            <div className="home_expert">cooffee expert</div>
                        </div>

                        <div className='chef_card'>
                            <img src={'../../Assets/chef.jpg'}></img>
                            <div className="chef_name">Aditya</div>
                            <div className="home_expert">cooffee expert</div>
                        </div>

                        <div className='chef_card'>
                            <img src={'../../Assets/chef.jpg'}></img>
                            <div className="chef_name">Shubham</div>
                            <div className="home_expert">cooffee expert</div>
                        </div>
                    </div>
                </div>

                <Footer/>

            </div>
        ) ;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onBuycancel: () => dispatch(actions.buyNot())
    }
}

export default connect(null, mapDispatchToProps)(Home);