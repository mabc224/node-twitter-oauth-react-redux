import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import {ListGroup, ListGroupItem} from 'react-bootstrap';

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {user: null};
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.getTweets(this.props.token);
    }

    render() {

        let textToDispay;
        let tweets = this.props.tweets;
        if(!tweets.length){
            textToDispay = (
                <div>
                    <strong>Alert!</strong> Push button To Fetch tweet
                    <br />
                    <input className="btn btn-outline-success col-2" type="submit" id="submit" value="Get User tweets"/>
                </div>
            )
        } else {
            textToDispay = (
                <ListGroup>
                    {tweets.map((item, index) => {
                            return <ListGroupItem key={index}>{item}</ListGroupItem>
                        })
                    }
                </ListGroup>
            )
        }


        return !this.props.isAuthenticated ?
            <Redirect to={{pathname: '/login'}}/> : (
                <div>
                <section className="user-profile">
                    <h1>User Profile (Secure Page)</h1>
                    <div>
                        <label>Email:</label>
                        <span>{this.props.user.email}</span>
                        <br />
                        <label>Username:</label>
                        <span>{this.props.user.username}</span>
                        <br />
                        <label>Display Name:</label>
                        <span>{this.props.user.displayName}</span>
                        <br />
                        <label>Photo:</label>
                        <img src={this.props.user.photo} alt="Profile" />
                    </div>
                </section>
                <br/>
                <br/>
                <form className="form-horizontal col-sm-6" onSubmit={this.handleSubmit}>
                    <h3>Tweet data</h3>
                    <br/>
                    {textToDispay}
                </form>
            </div>
        )
    }
};


const mapStateToProps = (state) => {
    return {
        token: state.login.token,
        user: state.login.user,
        isAuthenticated: state.login.isAuthenticated,
        tweets: state.profile.tweets
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTweets: (data) => dispatch({type: 'GET_USER_TWEET', data})
        // getTweets: (data) => dispatch(getUserTweets(data))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePage);