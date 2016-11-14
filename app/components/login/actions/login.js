import axios from 'axios';
import history from '../../../../app/index'
import * as localStorage from '../../../helpers/localStorage';
import { setTransform } from '../../../helpers/transforms';
import {
    LOG_IN
} from '../../../helpers/constants';

// 129.21.83.109
export function loginUser(token) {
    return dispatch => {
        axios.post('https://ec2-35-163-206-61.us-west-2.compute.amazonaws.com:5000/login/', {
            token: token
        }).then(function(response, err) {
            if(response) {
                var token = response.data.token;
                localStorage.set('auth', {token: token});
                dispatch({
                 type: LOG_IN,
                 token: token,
                 isAuthenticated: true
                });
                setTransform(token);
                window.setTimeout(() => {
                    history.push('/student');
                }, 1000)
            }
        }).catch(function(err) {
            console.log('Error is => ', err)
            dispatch({
                type: 'INVALID_USER'
            })
        })
    }
}
