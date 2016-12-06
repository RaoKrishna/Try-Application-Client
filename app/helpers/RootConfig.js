import { store } from '../Root';
import Application from '../components/Application';

/*
 * RootRoute component sets up the routes for the application. Each require
 * function points to a component and the route to access the component
 * can be found in their corresponding index.js
 */
export const RootRoute = {
  component: Application,
  childRoutes: [
    {
      path: '/',
      onEnter: function (nextState, replace) {
        replace('/submission');
      }
    },
    require('../components/login'),
    {
      onEnter: requireAuth,
      childRoutes: [
        require('../components/student')
      ]
    }
  ]
};

/*
 * Some routes like submission can be accessed only if the student is
 * authenticated. This function checks if the access token is set. If not,
 * he will be redirected to the login page
 */
function requireAuth (nextState, replace) {
  const state = store.getState();
  const token = state.login.accessToken;
  const isLoggedIn = !!token;
  if (!isLoggedIn) {
    replace({
      nextPathName: nextState.location.pathname
    }, '/login');
  }
}