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
                    <a href = "/"><img src={usace} alt="USACE LOGO" style={{width:'80px'}}/></a>
                    <a href = "/"><img src={fema} alt="FEMA LOGO" style={{width:'80px', paddingLeft:"5px"}}/></a>
                    <a className="navbar-brand" href="/" style={{paddingLeft:"15px"}}><b>AEP Map</b></a>            
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