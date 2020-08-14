import v4 from "uuid";
import Static from 'ol/source/ImageStatic';
import ImageLayer from 'ol/layer/Image';
import Projection from 'ol/proj/Projection';
import exampleTiff from '../../resources/Depth (Max).Terrain.stpaul_10ft.tif'
const AEP_INITALIZE_START='AEP_INITALIZE_START';
const AEP_INITALIZE_END='AEP_INITALIZE_END';
const MAP_INITIALIZED='MAP_INITIALIZED';

const getBundle=function(){
  return({
    name:'aep',
    getReducer: () => {
      const initialData = {
        _shouldInitialize: false,
      };
      return (state = initialData, { type, payload }) => {
        switch(type){
          case AEP_INITALIZE_START:
          case AEP_INITALIZE_END:
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
    doAepInitialize: () => ({ dispatch, store, anonGet }) => {
      dispatch({
        type: AEP_INITALIZE_START,
        payload: {
          _shouldInitialize: false,
        }
      })
      initMap(store);      
    },
    reactAepShouldInitialize: (state) => {
      if(state.aep._shouldInitialize) return { actionCreator: "doAepInitialize" };
    }
  })
}

export {getBundle as default}


const initMap=function(store){
  const map = store.selectMap();
  console.log(map)
  var extent = [745484.7500000000000000,8008067.9699999997392297, 763614.7500000000000000,8018797.9699999997392297];
  var projection = new Projection({
    code: '4269',
    units: 'ft',
    extent: extent,
  });
  const lyr = new ImageLayer({
    source: new Static({
    url: exampleTiff,
    projection: projection,
    imageExtent: extent,
    }),
  }) 

  const parentUid = store.selectTreeViewRootId();
  const uid = v4();
  store.doAddLayer({
    uid: uid,
    displayName: 'AEP Grid',
    parentUid: parentUid,
    mapLayer: lyr,
    serviceType: "LocalGeoTif",
    visible: true,
    zoomTo: false,
  });
}