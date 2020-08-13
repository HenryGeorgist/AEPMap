import getBundle from './cm3-ml-bundle';

const cm3MlPlugin=function getPlugin(config){
  return(
    {
      pluginName: 'Model Library Plugin',
      enabled: true,
      bundle: getBundle(config),
      components:[]
    }
  )
}

export {cm3MlPlugin as default}