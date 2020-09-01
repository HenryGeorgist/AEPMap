import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Text from 'ol/style/Text';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

import GeoJSON from 'ol/format/GeoJSON';
const ML_INITALIZE_START='ML_INITALIZE_START';
const ML_INITALIZE_END='ML_INITALIZE_END';
const MAP_INITIALIZED='MAP_INITIALIZED';
const UPDATE_ML_TOKEN='UPDATE_ML_TOKEN';

const apiHost=process.env.REACT_APP_APIHOST_ML

const getBundle=function(config){
  return({
    name:'ml',
    getReducer: () => {
      const initialData = {
        _shouldInitialize: false,

      };
      return (state = initialData, { type, payload }) => {
        switch(type){
          case ML_INITALIZE_START:
          case ML_INITALIZE_END:
          case UPDATE_ML_TOKEN:
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
    doSetMLToken:(token)=>({dispatch, store})=>{
      dispatch({"type":UPDATE_ML_TOKEN,payload:{"token":token}});
      if(token.authToken && token.authToken!==""){
        initMap(store,token.authToken)
      }
    },
    doMlInitialize: () => ({ dispatch, store, anonGet }) => {
      config.registerHook(store)
      dispatch({
        type: ML_INITALIZE_START,
        payload: {
          _shouldInitialize: false,
        }
      })
    },
    reactMlShouldInitialize: (state) => {
      if(state.ml._shouldInitialize) return { actionCreator: "doMlInitialize" };
    }
  })
}
export {getBundle as default}
const initMap=function(store,token){
  const map = store.selectMap();
      const root = store.selectTreeRootNode();
      let vectorSource=new VectorSource({
        format: new GeoJSON({featureProjection:"EPSG:3857"}),
        loader:function(extent, resolution, projection) {
          var url = `${apiHost}/models/boundaries`;
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url);
          xhr.setRequestHeader("Authorization", `Bearer ${token}`)
          xhr.onload = function() {
            if (xhr.status === 200) {
              let format=vectorSource.getFormat();
              let features = format.readFeatures(xhr.responseText)
              vectorSource.addFeatures(features);
            } else {
              console.log("ERROR LOADING VECTOR SOURCE")
            }
          }
          xhr.send();
        }
      });

      var vectorLayer1 = new VectorLayer({
          source:vectorSource,
          style:function(feature){
            let s = new Style({
              stroke: new Stroke({
                color: '#CCC',
                width: 3.0
              }),
              fill:new Fill({
                color: 'rgba(0,0,255,0.0)'
              }),
              text: new Text({
                font: '11px "Open Sans", "Arial Unicode MS", "sans-serif"',
                overflow:false,
                stroke: new Stroke({color:"#FFF", width:2}),
                fill: new Fill({
                  color: 'black'
                })
              })
            })
            s.getText().setText(feature.get('modelName'));
            return s;
          } 
      });
   
      store.doAddLayer({
          mapLayer:vectorLayer1,
          displayName:"Model Boundaries",
          type:"notfolder",
          parentUid:root.uid,
          visible:true,
      })
      vectorLayer1.getSource().on('change', function(event) {
        if(vectorLayer1.getSource().getState()==='ready'){

          map.on('click',function(evt) {
            console.log(evt.pixel)
          })

          map.on('pointermove', function(evt) {
            if (evt.dragging) {
              return;
            }
            console.log(evt)
          })
        }
      });
}