import React from 'react';
import { connect } from 'redux-bundler-react';
import {
  Map,
  addData,
  basemapSwitcher,
  bookmarks,
  coordDisplay,
  draw,
  treeView,
  geocoder,
  identify,
  measureTools,
  rotateNorth,
  zoomInOut,
  zoomHome,
  zoomToBox
} from "@corpsmap/corpsmap";
import "@corpsmap/corpsmap/css/corpsmap.css";
import aep from '../../cm3-plugins/aep/index';
import ml from '../../cm3-plugins/ml/index';
let hook = null;
class MapPage extends React.Component {

  render(){
    if(hook){
      hook(this.props)
    }  
    const {authToken} = this.props;
    return (
        <div className="container-fluid" style={{ padding: "0" }}>
            <Map
              theme="grey"
              plugins={[
                addData,
                basemapSwitcher,
                bookmarks,
                coordDisplay,
                draw,
                treeView(),
                geocoder,
                identify,
                measureTools,
                rotateNorth,
                zoomInOut,
                zoomHome,
                zoomToBox,
                ml({
                  authToken:authToken,
                  registerHook:function(store){
                    hook = store.doSetParentProps
                  }
                }),
                aep()
              ]}
            />        
        </div>
    )
  }
}
export default connect(
  'doDrawAEPGridInitializeLayer',
  'selectAuthToken',
  MapPage
  );