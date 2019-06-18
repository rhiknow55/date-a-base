import React, { Component } from 'react';
import Feed from './Feed.js';

class User extends Component {
    state = {
        username: null,
        horoscope: null,
        log: 0,
        baseId: 0
    };

    componentDidMount() {
        // Load the user data
        this.retrieveUserData()
            .then(res => this.setState( {
                username: res.username,
                horoscope: res.horoscope,
                log: res.log,
                baseId: res.baseId
            }));
    }

    retrieveUserData = async () => {
        var userId = 2
        const response = await fetch('/user_data?userId=' + userId);
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
                    baseId={this.state.baseId}
                    />
                <Feed myUserId={this.props.myUserId} />
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
                BaseId = {this.props.baseId}
            </div>
        );
    }
}


export default User;