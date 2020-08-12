import { 
  composeBundles,
  createUrlBundle,
  createCacheBundle
} from 'redux-bundler';

import createAuthBundle from '@corpsmap/create-auth-bundle'
import createJwtApiBundle from '@corpsmap/create-jwt-api-bundle'

import cache from '@corpsmap/corpsmap/src/utils/cache'

import routesBundle from './routes-bundle';

import drawBundle from './draw-bundle';

export default composeBundles(
  routesBundle,
  createUrlBundle(),
  createCacheBundle(cache.set),
  createAuthBundle({
    appId: '17de6a86-32a9-47fc-9fa5-e98a400111b3',
    redirectOnLogout: '/'
  }),
  createJwtApiBundle({
    root: 'https://x1s6pwmufa.execute-api.us-east-1.amazonaws.com/production'
  }),
  drawBundle
);