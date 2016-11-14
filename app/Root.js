import React, { Component, PropTypes } from 'react';
import { Router } from 'react-router';
import { connect } from 'react-redux';
import configureStore from './helpers/store';
import { RootRoute } from './helpers/RootConfig';
import './styles/global.scss';
import * as localStorage from '../app/helpers/localStorage';
import { setTransform, setupInterceptors } from '../app/helpers/transforms';
import 'babel-polyfill';
//import DevTools from './components/DevTools';

let auth = localStorage.get('auth') || {};
if (auth.token) {
    console.log("Got auht token. Setting transforms: " + auth.token);
    setTransform(auth.token);
    setupInterceptors();
}

const initialState = {
    login: {
        accessToken: auth.token,
        userName: auth.userName
    }
};

export const store = configureStore(initialState);

@connect((state) => ({state}))
export default class Root extends Component {

    renderDevTools() {
        /*if(__DEVTOOLS__) {
            return <DevTools key="devTools" />;
        }*/
        return null;
    }

    render() {
        return (
            <div>
                { this.renderDevTools() }
                <Router history={this.props.history} routes={RootRoute}/>
            </div>
        )
    }
}

//