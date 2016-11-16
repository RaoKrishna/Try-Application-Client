import axios from 'axios';
import * as localStorage from './localStorage';
import history from '../../app/index'

export function setTransform(token) {
  axios.defaults.transformRequest.push(function(data, headers) {
    headers['Authorization'] = 'Bearer ' + token;
    headers['Content-Type'] = 'application/json';
    return data;
  });
}

export function setupInterceptors() {
  axios.interceptors.response.use(
    function(response) {
      return response;
    },
    function(error) {
      if(error.response.status == 401) {
        localStorage.clear();
        history.push('/login');
      } else if (error.status === 403) {

      } else {
        return Promise.reject(error);
      }
    }
  );
}