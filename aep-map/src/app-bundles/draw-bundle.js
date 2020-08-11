
import 'ol/ol.css';
import {getLayer} from '@corpsmap/corpsmap/src/openlayers-utils/layer-utilities'

export default {
    name: 'draw',
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
                    return Object.assign({}, state, {
                        shouldInitalize: true
                    });
                default:
                    return state;
            }
        }
    },
    doDrawInitializeLayer: () => ({dispatch, store}) => {
        dispatch({type: 'DRAW_INITIALIZE_STARTED', payload: {shouldInitalize: false}})
        const map = store.selectMap();
        //replace this with a service from the PFRA AEP grid data - then we can have a view of the AEP grids.
        const lyr = getLayer({
            serviceType: 'ArcGIS',
            url: "https://basemap.nationalmap.gov/ArcGIS/rest/services/USGSTopo/MapServer"
        })
        map.addLayer(lyr)
        dispatch({
            type: 'DRAW_INITIALIZE_FINISHED'
        })
    },
    reactDrawShouldInitialize: (state) => {
        if(state.draw.shouldInitalize) return { actionCreator: 'doDrawInitializeLayer'}
    },
    init: (store) =>{

    }
}