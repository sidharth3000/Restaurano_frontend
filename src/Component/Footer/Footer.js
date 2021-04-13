import React from 'react';

import './Footer.css';

const footer = ( props ) => {
   
    return (
        <div className='footer'>
           <img src={'Assets/logo.png'} className='footer_logo'></img>
           <div className='footer_name'>RESTAURANO</div>
           <div className='footer_p'>This is the last section of page and provides 
           the user with options to contact the restaurant, feedback, information about
           restaurant and  a help section to resolve doubts.
            </div>

            <div>
                <i className="fa fa-facebook-square handle"></i>
                <i className="fa fa-instagram handle"></i>
                <i className="fa fa-twitter handle"></i>
                <i class="fa fa-github handle"></i>
            </div>

            <div className='footer_strip'></div>
            
        </div>
    );
};

export default footer;