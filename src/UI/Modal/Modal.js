import React from 'react';

import './Modal.css';

const modal = (props) => (

    <div>

        <div className="modal" 
            style={{
                transform: props.show? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>

                {props.children}

        </div>
    </div>

   
)

export default modal;