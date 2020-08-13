import getBundle from './cm3-nsi-bundle';

const cm3NsiPlugin=function getPlugin(){
  return(
    {
      pluginName: 'NSI Plugin',
      enabled: true,
      bundle: getBundle(),
      components:[]
    }
  )
}

export {cm3NsiPlugin as default}