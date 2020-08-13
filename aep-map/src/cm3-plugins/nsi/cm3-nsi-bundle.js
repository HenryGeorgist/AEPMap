import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Text from 'ol/style/Text';
import v4 from "uuid";
import Static from 'ol/source/ImageStatic';
import ImageLayer from 'ol/layer/Image';
import Projection from 'ol/proj/Projection';
import exampleTiff from '../../resources/Depth (Max).Terrain.stpaul_10ft.tif'
const NSI_INITALIZE_START='NSI_INITALIZE_START';
const NSI_INITALIZE_END='NSI_INITALIZE_END';
const MAP_INITIALIZED='MAP_INITIALIZED';

const apiHost=process.env.REACT_APP_APIHOST

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
    reactAepShouldInitialize: (state) => {
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
  /*
      const root = store.selectTreeRootNode();
  
      let vectorSource=new VectorSource({
        format: new GeoJSON({featureProjection:"EPSG:3857"}),
        loader:function(extent, resolution, projection) {
          //let token="";
          //const pp=store.selectParentProps();
          //if(store.selectParentProps()){
          //  token=store.selectParentProps().authToken;
          //}
          var url = `${apiHost}/models/boundaries`;
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url);
          xhr.setRequestHeader("Authorization", `Bearer ${config.token}`)
          //var onError = function() {
          //  vectorSource.removeLoadedExtent(extent);
          //}
          //xhr.onerror = onError;
          xhr.onload = function() {
            if (xhr.status == 200) {
              let format=vectorSource.getFormat();
              let features = format.readFeatures(xhr.responseText)
              vectorSource.addFeatures(features);
            } else {
              //onError();
              console.log("ERROR LOADING VECTOR SOURCE")
            }
          }
          xhr.send();
        }
      });

      var vectorLayer1 = new VectorLayer({
          source:vectorSource,
          style:function(feature){
            let s=styles('boundary')
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

      var featureOverlay = new VectorLayer({
        source: new VectorSource(),
        map: map,
        style: function(feature) {
          let highlightStyle=styles('highlight')
          //highlightStyle.getText().setText(feature.get('name'));
          return highlightStyle;
        }
      });

      let highlight=null;
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
      */
}