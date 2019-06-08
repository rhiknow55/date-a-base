import React, { Component } from 'react';
import Feed from './Feed.js';

class User extends Component {
    state = {
        username: null,
        horoscope: null,
        log: 0
    };

    componentDidMount() {
        // Load the user data
        this.retrieveUserData()
            .then(res => this.setState( {
                username: res.username,
                horoscope: res.horoscope,
                log: res.log
            }));
    }

    retrieveUserData = async () => {
        const response = await fetch('/user_data');
        const json = await response.json();

        if (response.status !== 200) {
            throw Error(json.message)
        }
        return json;
    }

    render() {
        return (
            <div className="User">
                <Profile
                    username={this.state.username}
                    horoscope={this.state.horoscope}
                    log={this.state.log}
                    />
                <Feed />
            </div>
        );
    }
}

class Profile extends Component
{
    render() {
        return (
            <div>
                <p>This is Profile</p>
                Username = {this.props.username}
                Horoscope = {this.props.horoscope}
                LOG = {this.props.log}
            </div>
        );
    }
}


export default User;