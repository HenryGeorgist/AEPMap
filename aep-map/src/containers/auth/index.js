import React from 'react';
import { connect } from 'redux-bundler-react';
class Auth extends React.Component {
  constructor(props){
    super(props);
    this.renderMsg = this.renderMsg.bind(this);
  }
  renderMsg(){
    const {authIsLoggedIn, authUsername} = this.props;
    if(authIsLoggedIn){
      return (
        <p>{ authUsername }, click on the button below to fetch data.</p>
      )
    }else{
        return <p>Click the Login button below to log in and fetch data.</p>
    }
    
  }
  render(){

    const { doAuthLogin, authIsLoggedIn} = this.props;
    return (
      <div className="container">
        <div className="card bg-light m-5">
          <div className="card-body">
            <h2>The request you made requires elevation</h2>
            {
              this.renderMsg()
            }
            <button onClick={ doAuthLogin } disabled ={ authIsLoggedIn} className="btn btn-primary mr-2">Login</button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  'doAuthLogin',
  'doAuthLogout',
  'selectAuthIsLoggedIn',
  'selectAuthUsername',
  Auth
  );