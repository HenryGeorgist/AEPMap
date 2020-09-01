import v4 from "uuid";
const NSI_INITALIZE_START='NSI_INITALIZE_START';
const NSI_INITALIZE_END='NSI_INITALIZE_END';
const MAP_INITIALIZED='MAP_INITIALIZED';

const apiHost=process.env.REACT_APP_APIHOST_NSI

const getBundle=function(){
  return({
    name:'nsi',
    getReducer: () => {
      const initialData = {
        _shouldInitialize: false,
      };
      return (state = initialData, { type, payload }) => {
        switch(type){
          case NSI_INITALIZE_START:
          case NSI_INITALIZE_END:
            return Object.assign({}, state, payload);
          case MAP_INITIALIZED:
            return Object.assign({}, state, {
              _shouldInitialize: true
            })
          default:
            return state;
        }
      }
    },
    doNsiInitialize: () => ({ dispatch, store, anonGet }) => {
      dispatch({
        type: NSI_INITALIZE_START,
        payload: {
          _shouldInitialize: false,
        }
      })
      initMap(store);      
    },
    reactNsiShouldInitialize: (state) => {
      if(state.nsi._shouldInitialize) return { actionCreator: "doNsiInitialize" };
    }
  })
}

export {getBundle as default}


const initMap=function(store){
  const map = store.selectMap();
  let lyr = null;

  const parentUid = store.selectTreeViewRootId();
  const uid = v4();
  store.doAddLayer({
    uid: uid,
    displayName: 'National Structure Inventory',
    parentUid: parentUid,
    mapLayer: lyr,
    serviceType: "VectorTile",
    visible: true,
    zoomTo: false,
  });
}