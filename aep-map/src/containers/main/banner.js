import React from 'react';
import { connect } from 'redux-bundler-react';
import fema from '../../resources/FEMA_logo-white.png';
import usace from '../../resources/USACE_logo.png';

class Banner extends React.Component{
    render(){
        return (
            <nav className="navbar navbar=expand-lg navbar-dark bg-primary">
                <a className="navbar-brand" href="/">AEP Map</a>
                <img src={fema} alt="FEMA" style={{width:'150px'}}/>
                <img src={usace} alt="USACE" style={{width:'150px'}}/>
            </nav>
        )
    }
}
export default connect(
    Banner
);