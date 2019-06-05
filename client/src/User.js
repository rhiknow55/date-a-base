import React, { Component } from 'react';

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
                <p className="User-username">Username = {this.state.username}</p>
                <p className="User-horoscope">Horoscope = {this.state.horoscope}</p>
                <p className="User-log">Log = {this.state.log}</p>
            </div>
        );
    }
}

export default User;