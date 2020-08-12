
import 'ol/ol.css';
import {getLayer} from '@corpsmap/corpsmap/src/openlayers-utils/layer-utilities'
import exampleTiff from '../resources/Depth (Max).Terrain.stpaul_10ft.tif'

export default {
    name: 'drawAEPGrid',
    getReducer:() =>{
        const initialData = {
            shouldInitalize: false,
        }
        return (state = initialData, {type, payload}) => {
            switch(type){
                case 'DRAW_INITIALIZE_STARTED':
                case 'DRAW_INITIALIZE_FINISHED':
                    return Object.assign({}, state, payload);
                case "MAP_INITIALIZED":
                case "CM2_INITIALIZE_FINISHED":
                case "TREEVIEW_LOADED":
                    return Object.assign({}, state, {
                        shouldInitalize: true
                    });
                default:
                    return state;
            }
        }
    },
    doDrawAEPGridInitializeLayer: () => ({dispatch, store}) => {
        dispatch({type: 'DRAW_INITIALIZE_STARTED', payload: {shouldInitalize: false}})
        const map = store.selectMap();
        //replace this with a service from the PFRA AEP grid data - then we can have a view of the AEP grids.
        
//    const lyr = new ImageLayer({
//    source: new Static({
//        url: 'C:\Examples\aepmap\aep-map\src\resources\Depth (Max).Terrain.stpaul_10ft.tif',
//        projection: projection,
//       imageExtent: extent,
//      }),
//    }) 
        const lyr = getLayer({
            serviceType: 'WMS',
            url: "C:\Examples\aepmap\aep-map\src\resources\Depth (Max).Terrain.stpaul_10ft.tif"
        })
        map.addLayer(lyr)
        dispatch({
            type: 'DRAW_INITIALIZE_FINISHED'
        })
    },
    reactDrawShouldInitialize: (state) => {
        if(state.drawAEPGrid.shouldInitalize) return { actionCreator: 'doDrawInitializeLayer'}
    }
}