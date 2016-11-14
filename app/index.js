import React from 'react';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import Root, { store } from './Root';
import 'babel-polyfill';

const app = document.createElement('div');
document.body.appendChild(app);

export default browserHistory;

render(
    <Provider store={store} >
        <Root history = {browserHistory} />
    </Provider>, app);
