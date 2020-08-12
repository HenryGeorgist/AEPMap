import getBundle from './cm3-aep-bundle';

const cm3AepPlugin=function getPlugin(){
  return(
    {
      pluginName: 'AEP Plugin',
      enabled: true,
      bundle: getBundle(),
      components:[]
    }
  )
}

export {cm3AepPlugin as default}