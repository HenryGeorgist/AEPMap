import React from 'react';
import { connect } from 'redux-bundler-react';
import fema from '../../resources/FEMA_logo-white.png';
import usace from '../../resources/USACE_logo.png';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

class Banner extends React.Component{
    render(){
        let { doAuthLogin, authIsLoggedIn} = this.props;
        return (
            <nav className="navbar navbar=expand-lg navbar-dark bg-dark">
                <div className="float-left">
                    <img src={usace} alt="USACE" style={{width:'80px'}}/>
                    <span style={{width: "5px"}}>  </span>
                    <img src={fema} alt="FEMA" style={{width:'80px'}}/>
                    <span style={{width: "10px"}}>      </span>
                    <a className="navbar-brand" href="/">AEP Map</a>            
                </div>
                <button className="btn btn-secondary mr-2" onClick={ doAuthLogin } disabled ={ authIsLoggedIn} >
                    {(authIsLoggedIn)?
                        ("My Account"):
                        ("Sign In")
                    }
                    <AccountCircleIcon style={{fontSize:30,paddingLeft:"5px"}}/>
                </button>
            </nav>
        )
    }
}
export default connect(
    'doAuthLogin',
    'doAuthLogout',
    'selectAuthIsLoggedIn',
    'selectAuthUsername',
    Banner
);