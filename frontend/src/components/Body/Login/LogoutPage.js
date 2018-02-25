import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../../actions/Logout';

class Logout extends Component {

    componentDidMount() {
        this.props.logout();
    }

    render() {
        return this.props.isAuthenticated ?
            <Redirect to={{pathname: '/profile'}}/> :
            <Redirect to={{pathname: '/login'}}/> ;
    }
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.login.isAuthenticated
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Logout);