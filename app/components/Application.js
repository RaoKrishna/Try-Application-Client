/**
 * Created by krao on 4/5/2016.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
//import Spinner from './common/spinner/Spinner';
//import GlobalNav from './globalnav/GlobalNav';
//import {HIDE_NOTIFICATION} from '../constants';

@connect(state => ({state}))
export default class Application extends React.Component {

    constructor(props, context) {
        super(props, context);
    };

    /*hideNotification = () => {
        this.props.dispatch({
            type: HIDE_NOTIFICATION
        });
        document.removeEventListener('click', this.hideNotification);
    };

    componentWillReceiveProps(newProps) {
        const { application } = newProps.state;

        if(application.showNotification) {
            document.addEventListener('click', this.hideNotification);
        }
    }*/

    render() {
        //const { application, orghierarchy } = this.props.state;
        //let isLoggedIn = this.props.state.login && this.props.state.login.accessToken;
        return (
            <div>
                <div>
                    {
                        this.props.children &&
                        React.cloneElement(
                            this.props.children,
                            {dispatch: this.props.dispatch, ...this.props.state}
                        )
                    }
                </div>
            </div>
        );
    }
}