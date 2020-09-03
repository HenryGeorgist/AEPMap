const UPDATE_AUTH_TOKEN = 'UPDATE_AUTH_TOKEN';
const authHost=process.env.REACT_APP_AUTH_HOST
const appId=process.env.REACT_APP_APPID
const authNSIHost=process.env.REACT_APP_NSI_AUTH_HOST
const appNSIId=process.env.REACT_APP_NSI_APPID
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};
export default {
  name: 'auth',
  getReducer: () => {
    const initialState = {
      loading: false,
      mlToken:null,
      nsiToken:null
    }
    return (state = initialState, { type, payload }) => {
      switch(type){
        case UPDATE_AUTH_TOKEN:
          return({...state,...payload});
        default:
          return state;
      }
    }
  },
    doAuthFetchTokens:()=>({dispatch,store})=>{
        fetch(`${authHost}/${appId}`, {
            method: 'get'
        }).then(function(response) {
            return response.text();
        }).then(function(data) {
            if(parseJwt(data)){
                dispatch({type:UPDATE_AUTH_TOKEN,payload:{mlToken:data}});
            }
        });
        fetch(`${authNSIHost}/${appNSIId}`, {
            method: 'get'
        }).then(function(response) {
            return response.text();
        }).then(function(data) {
            if(parseJwt(data)){
                dispatch({type:UPDATE_AUTH_TOKEN,payload:{nsiToken:data}});
            }
        });      
    },
    selectAuthMLToken:state=>state.auth.mlToken,
    selectAuthNSIToken:state=>state.auth.nsiToken
  }