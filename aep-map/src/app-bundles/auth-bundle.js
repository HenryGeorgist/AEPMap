const UPDATE_AUTH_TOKEN = 'UPDATE_AUTH_TOKEN';
const authHost=process.env.REACT_APP_AUTH_HOST
const appId=process.env.REACT_APP_APPID
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
      token:null,
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
doAuthFetchToken:()=>({dispatch,store})=>{
    fetch(`${authHost}/${appId}`, {
        method: 'get'
    }).then(function(response) {
        return response.text();
    }).then(function(data) {
        if(parseJwt(data)){
            dispatch({type:UPDATE_AUTH_TOKEN,payload:{token:data}});
          }
      });      
    },
    selectAuthToken:state=>state.auth.token,
  }