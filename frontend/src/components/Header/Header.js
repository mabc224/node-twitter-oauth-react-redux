import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {connect} from "react-redux";
import {logout} from '../../actions/Logout';

class Header extends React.Component {

    render() {

        let navAuth = (
            <Nav pullRight>
                <LinkContainer to="/profile">
                    <NavItem eventKey={1}>Profile</NavItem>
                </LinkContainer>
                <LinkContainer to="/logout">
                    <NavItem eventKey={2}>Logout</NavItem>
                </LinkContainer>
            </Nav>
        );

        let navNotAuth = (
            <Nav pullRight>
                <LinkContainer to="/">
                    <NavItem eventKey={1}>Home</NavItem>
                </LinkContainer>
                <LinkContainer to="/login">
                    <NavItem eventKey={2}>Login</NavItem>
                </LinkContainer>
            </Nav>
        );

        const authNav = this.props.isAuthenticated ? navAuth : navNotAuth;


        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#brand">Twitter React</a>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>
                        {authNav}
                </Navbar.Collapse>
            </Navbar>
        )
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
)(Header);