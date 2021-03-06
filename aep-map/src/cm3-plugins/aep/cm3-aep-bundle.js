import v4 from "uuid";
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';

const AEP_INITALIZE_START='AEP_INITALIZE_START';
const AEP_INITALIZE_END='AEP_INITALIZE_END';
const UPDATE_AEP_TOKEN='UPDATE_AEP_TOKEN';
const MAP_INITIALIZED='MAP_INITIALIZED';
const apiHost=process.env.REACT_APP_APIHOST_AEP

const getBundle=function(config){
  console.log(config)
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
          case UPDATE_AEP_TOKEN:
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
    doSetAEPToken:(token)=>({dispatch, store})=>{
      dispatch({"type":UPDATE_AEP_TOKEN,payload:{"token":token}});
      if(token.authToken && token.authToken!==""){
        initMap(store,token.authToken)
      }
    },
    doAepInitialize: () => ({ dispatch, store, anonGet }) => {
      config.registerAEPHook(store)
      dispatch({
        type: AEP_INITALIZE_START,
        payload: {
          _shouldInitialize: false,
        }
      })   
    },
    reactAepShouldInitialize: (state) => {
      if(state.aep._shouldInitialize) return { actionCreator: "doAepInitialize" };
    }
  })
}

export {getBundle as default}

const Pluvial_layers = [
  {
    name:"DC",
    url:"gwc/service/tms/1.0.0/ml%3Adc_p@EPSG%3A900913@png/{z}/{x}/{-y}.png"
  },
  {
    name:"Harrison",
    url:"gwc/service/tms/1.0.0/ml%3Aharrison_p@EPSG%3A900913@png/{z}/{x}/{-y}.png"
  },
  {
    name:"Brentwood",
    url:"gwc/service/tms/1.0.0/ml%3Abrentwood_p@EPSG%3A900913@png/{z}/{x}/{-y}.png"
  },
  {
    name:"Highland Park",
    url:"gwc/service/tms/1.0.0/ml%3Ahighlandpark_p@EPSG%3A900913@png/{z}/{x}/{-y}.png"
  },
  {
    name:"Cedar Rapids",
    url:"gwc/service/tms/1.0.0/ml%3Acedarrapids_p@EPSG%3A900913@png/{z}/{x}/{-y}.png"
  },
  {
    name:"Renton",
    url:"gwc/service/tms/1.0.0/ml%3Arenton_p@EPSG%3A900913@png/{z}/{x}/{-y}.png"
  },
  {
    name:"Sacramento",
    url:"gwc/service/tms/1.0.0/ml%3Asacramento_p@EPSG%3A900913@png/{z}/{x}/{-y}.png"
  },
  {
    name:"Skagit City",
    url:"gwc/service/tms/1.0.0/ml%3Askagitcity_p@EPSG%3A900913@png/{z}/{x}/{-y}.png"
  },
  {
    name:"Stockton",
    url:"gwc/service/tms/1.0.0/ml%3Astockton_p@EPSG%3A900913@png/{z}/{x}/{-y}.png"
  },
  {
    name:"Meridian Hills",
    url:"gwc/service/tms/1.0.0/ml%3Ameridianhiils_p@EPSG%3A900913@png/{z}/{x}/{-y}.png"
  },
  {
    name:"Passic",
    url:"gwc/service/tms/1.0.0/ml%3Apassaic_p@EPSG%3A900913@png/{z}/{x}/{-y}.png"
  },
  {
    name:"Yuba City",
    url:"gwc/service/tms/1.0.0/ml%3Ayuba_p@EPSG%3A900913@png/{z}/{x}/{-y}.png"
  },
  {
    name:"Merced",
    url:"gwc/service/tms/1.0.0/ml%3Amerced_p@EPSG%3A900913@png/{z}/{x}/{-y}.png"
  },
  {
    name:"Des Plains",
    url:"gwc/service/tms/1.0.0/ml%3Adesplains_p@EPSG%3A900913@png/{z}/{x}/{-y}.png"
  }
]
  const Fluvial_layers = [
    {
      name:"DC",
      url:"gwc/service/tms/1.0.0/ml%3Adc_f@EPSG%3A900913@png/{z}/{x}/{-y}.png"
    },
    {
      name:"Cedar Rapids",
      url:"gwc/service/tms/1.0.0/ml%3Acedarrapids_f@EPSG%3A900913@png/{z}/{x}/{-y}.png"
    },
    {
      name:"Renton",
      url:"gwc/service/tms/1.0.0/ml%3Arenton_f@EPSG%3A900913@png/{z}/{x}/{-y}.png"
    },
    {
      name:"Sacramento",
      url:"gwc/service/tms/1.0.0/ml%3Asacramento_f@EPSG%3A900913@png/{z}/{x}/{-y}.png"
    },
    {
      name:"Skagit City",
      url:"gwc/service/tms/1.0.0/ml%3Askagitcity_f@EPSG%3A900913@png/{z}/{x}/{-y}.png"
    },
    {
      name:"Stockton",
      url:"gwc/service/tms/1.0.0/ml%3Astockton_f@EPSG%3A900913@png/{z}/{x}/{-y}.png"
    },
    {
      name:"Meridian Hills",
      url:"gwc/service/tms/1.0.0/ml%3Ameridianhiils_f@EPSG%3A900913@png/{z}/{x}/{-y}.png"
    },
    {
      name:"Passic",
      url:"gwc/service/tms/1.0.0/ml%3Apassaic_f@EPSG%3A900913@png/{z}/{x}/{-y}.png"
    },
    {
      name:"Yuba City",
      url:"gwc/service/tms/1.0.0/ml%3Ayuba_f@EPSG%3A900913@png/{z}/{x}/{-y}.png"
    },
    {
      name:"Merced",
      url:"gwc/service/tms/1.0.0/ml%3Amerced_f@EPSG%3A900913@png/{z}/{x}/{-y}.png"
    },
    {
      name:"Des Plains",
      url:"gwc/service/tms/1.0.0/ml%3Adesplains_f@EPSG%3A900913@png/{z}/{x}/{-y}.png"
    }
]

const initMap=function(store,token){
    const parentUid = store.selectTreeViewRootId();
    const p_id = v4();
    store.doAddLayer({
      uid: p_id,
      displayName: "Pluvial AEP Grids",
      parentUid: parentUid,
      mapLayer: null,
      serviceType: "not a folder",
      visible: true,
      zoomTo: false,
    });
    const f_id = v4();
    store.doAddLayer({
      uid: f_id,
      displayName: "Fluvial AEP Grids",
      parentUid: parentUid,
      mapLayer: null,
      serviceType: "not a folder",
      visible: true,
      zoomTo: false,
    });
    Pluvial_layers.forEach((layer)=>{
      let wms = new TileLayer({
        source: new XYZ({
          url: apiHost + layer.url,
        }),
      })
      
      const uid = v4();
      store.doAddLayer({
        uid: uid,
        displayName: layer.name,
        parentUid: p_id,
        mapLayer: wms,
        serviceType: "TMS",
        visible: false,
        zoomTo: false,
      });      
    });
    Fluvial_layers.forEach((layer)=>{
      let wms = new TileLayer({
        source: new XYZ({
          url: apiHost + layer.url,
        }),
      })
      
      const uid = v4();
      store.doAddLayer({
        uid: uid,
        displayName: layer.name,
        parentUid: f_id,
        mapLayer: wms,
        serviceType: "TMS",
        visible: true,
        zoomTo: false,
      });      
    });

}