import { createRouteBundle } from 'redux-bundler';
import Auth from '../containers/auth';
import Main from '../containers/main/main';
import FourOhFour from '../containers/404';

export default createRouteBundle({
  '/Auth': Auth,
  '/': Main,
  '*': FourOhFour
})