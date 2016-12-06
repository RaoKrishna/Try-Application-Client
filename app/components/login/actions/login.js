import axios from 'axios';
import history from '../../../../app/index'
import * as localStorage from '../../../helpers/localStorage';
import { setTransform, setupInterceptors } from '../../../helpers/transforms';
import {
    LOG_IN
} from '../../../helpers/constants';

// 129.21.83.109
export function loginUser(token) {
    return dispatch => {
        axios.get('https://localhost:5000/')
            .then(function(response, err) {
                axios.post('https://localhost:5000/login/', {
                    token: token
                }).then(function(response, err) {
                    console.log("After post: ", response);
                    if(response) {
                        var token = response.data.token;
                        localStorage.set('auth', {token: token});
                        dispatch({
                            type: LOG_IN,
                            token: token,
                            isAuthenticated: true
                        });
                        setTransform(token);
                        setupInterceptors();
                        window.setTimeout(() => {
                            history.push('/submission');
                        }, 1000)
                    }
                }).catch(function(err) {
                    console.log('Error is => ', err)
                    dispatch({
                        type: 'INVALID_USER'
                    })
                })
            })
    }
}