import React from 'react';

import './Spinner.css';
import Backdrop from '../../UI/Backdrop/Backdrop'

const Spinner = (props) => (

    <div>
        <Backdrop show={true}/>
        <div className="loader">Loading...</div>
    </div>
)

export default Spinner;