import React, { Component, PropTypes } from 'react';
import history from '../../../app/index';
import { setTransform } from '../../helpers/transforms';
import * as localStorage from '../../helpers/localStorage';
import {CLEAR_MESSAGES} from '../../helpers/constants';

export default class Header extends Component {

    signOut() {
        localStorage.set('auth', {token: null});
        setTransform(null);
        this.props.dispatch({
            type: CLEAR_MESSAGES
        });
        window.setTimeout(() => {
            history.push('/login');
        }, 1000)
    }

    render() {
        console.log("Show sign  out = ", this.props.showSignOut);
        return (
            <div className="header">
                <p>
                    Rochester Institute of Technology
                </p>
                <p className="application-name">
                    TRY Application
                </p>
                {
                    this.props.showSignOut == 'true' &&
                    <label onClick={() => this.signOut()}>
                        Sign Out
                    </label>
                }
            </div>
        )
    }
}