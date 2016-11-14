import React, { Component, PropTypes } from 'react';
import { loginUser } from '../actions/login';
import GoogleLogin from 'react-google-login';
import Header from '../../../components/common/Header';
import { LOG_IN_ERROR_MSG } from '../../../helpers/constants';

export default class Login extends Component {

    onSignIn(googleUser) {
        console.log("User is : ", googleUser);
        //var profile = googleUser.getBasicProfile();
        var id_token = googleUser.getAuthResponse().id_token;
        this.props.dispatch(loginUser(id_token));
    }

    errorOnSignIn(googleUser) {
        console.log("Error happened: ", googleUser);
        this.props.dispatch({
            type: LOG_IN_ERROR_MSG,
            message: googleUser.reason
        })
    }

    signOut() {
        var auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            alert('User signed out.');
        });
    }

    render() {

        var errorMessage = this.props.login.errorMessage || '';

        return (
            <div className="login-content">
                <Header showSignOut="false" dispatch={this.props.dispatch}/>
                <GoogleLogin
                    className="google-sign-in"
                    text="Login with Google"
                    clientId="868027264248-4uh3q5om3opnl4ajmijlusmmlhkn18lc.apps.googleusercontent.com"
                    onSuccess={(user) => this.onSignIn(user)}
                    onFailure={(user) => this.errorOnSignIn(user)}
                    hostedDomain="g.rit.edu" />
                {
                    errorMessage &&
                        <p className="login-error">
                            {errorMessage}
                        </p>
                }
            </div>
        )
    }
};