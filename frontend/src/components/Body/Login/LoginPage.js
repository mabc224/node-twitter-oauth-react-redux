import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import TwitterLogin from 'react-twitter-auth';
import {getUser, loginError} from '../../../actions/LoginPage';

class Login extends Component {
    constructor(props) {
        super(props);
        this.onSuccess = this.onSuccess.bind(this);
        this.onFailed = this.onFailed.bind(this);
    }

    onSuccess(response) {
        const token = response.headers.get('x-auth-token');
        this.props.onLoginSuccess(token, response);
    };

    onFailed(error) {
        console.log(error);
        this.props.onLoginError(error);
    };

    render() {
        return this.props.isAuthenticated ?
            <Redirect to={{pathname: '/profile'}}/> :
            (
                <TwitterLogin loginUrl="http://localhost:4000/oauth_request"
                              onFailure={this.onFailed} onSuccess={this.onSuccess}
                              requestTokenUrl="http://localhost:4000/oauth_request/callback"/>
            );
    }
};

const mapStateToProps = (state) => {
    return {
        token: state.login.token,
        user: state.login.user,
        isAuthenticated: state.login.isAuthenticated,
        error: state.login.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLoginSuccess: (token, user) => dispatch(getUser(token, user)),
        onLoginError: (err) => dispatch(loginError(err.message))
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);