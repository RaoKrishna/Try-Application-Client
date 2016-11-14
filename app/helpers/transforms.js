import axios from 'axios';
import * as localStorage from './localStorage';

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
      if(error.status === 401) {
        localStorage.clear();
        window.location = '/login';
      } else if (error.status === 403) {
        //window.location = '/error/unauthorized';
      } else {
        //window.location = '/error/internal-error';
      }
    }
  );
}