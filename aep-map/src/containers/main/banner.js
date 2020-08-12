import React from 'react';
import { connect } from 'redux-bundler-react';
import fema from '../../resources/FEMA_logo-white.png';
import usace from '../../resources/USACE_logo.png';

class Banner extends React.Component{
    constructor(props){
        super(props);
        this.renderMsg = this.renderMsg.bind(this);
      }
    renderMsg(){
        const {authIsLoggedIn, authUsername} = this.props;
        if(authIsLoggedIn){
          return (
            <span>{ authUsername }</span>
          )
        }else{
            return <span>Sign in</span>
        }
        
      }
    render(){
        const { doAuthLogin, authIsLoggedIn} = this.props;
        return (
            <nav className="navbar navbar=expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/">AEP Map</a>
                <img src={fema} alt="FEMA" style={{width:'150px'}}/>
                <img src={usace} alt="USACE" style={{width:'150px'}}/>
                <button className="btn btn-secondary mr-2" onClick={ doAuthLogin } disabled ={ authIsLoggedIn} >{this.renderMsg()}</button>
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