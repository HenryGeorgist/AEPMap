import React from 'react';
import { connect } from 'redux-bundler-react';
import fema from '../../resources/FEMA_logo.png';
import usace from '../../resources/usace3.png';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

class Banner extends React.Component{
    render(){
        const { doAuthFetchToken, authMLToken} = this.props;
        const authIsLoggedIn = (authMLToken)?true:false; //check if NSI and ML are logged on?
        return (
            <nav className="navbar navbar=expand-lg navbar-dark bg-dark">
                <div className="float-left">
                    <a href = "/"><img src={usace} alt="USACE LOGO" style={{width:'45px'}}/></a>
                    <a href = "/"><img src={fema} alt="FEMA LOGO" style={{width:'45px', paddingLeft:"5px"}}/></a>
                    <a className="navbar-brand" href="/" style={{paddingLeft:"15px"}}><b>AEP Map</b></a>            
                </div>
                <button className="btn btn-secondary mr-2" onClick={ doAuthFetchToken } disabled ={ authIsLoggedIn} >
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
    'doAuthFetchTokens',
    'selectAuthMLToken',
    Banner
);