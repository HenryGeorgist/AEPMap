import getBundle from './cm3-aep-bundle';

const cm3AepPlugin=function getPlugin(config){
  return(
    {
      pluginName: 'AEP Plugin',
      enabled: true,
      bundle: getBundle(config),
      components:[]
    }
  )
}

export {cm3AepPlugin as default}