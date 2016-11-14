import { store } from '../Root';
import Application from '../components/Application';

export const RootRoute = {
  component: Application,
  childRoutes: [
    {
      path: '/',
      onEnter: function (nextState, replace) {
        replace('/student');
      }
    },
    require('../components/login'),
    /*require('../features/error-pages'),*/
    {
      onEnter: requireAuth,
      childRoutes: [
        require('../components/student')
      ]
    }
  ]
};

function requireAuth (nextState, replace) {
  const state = store.getState();
  const token = state.login.accessToken;
  const isLoggedIn = !!token;
  console.log('logged in: ', isLoggedIn);
  if (!isLoggedIn) {
    replace({
      nextPathName: nextState.location.pathname
    }, '/login');
  }
}