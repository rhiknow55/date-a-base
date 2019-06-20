import React, { Component } from 'react';
import Feed from './Feed.js';
import Profile from './Profile.js';
import {CommentSection} from "./Comment";
import Chat from './Chat.js'
class User extends Component {
    state = {
        userId: -1,
        loginName: null,
        username: null,
        // horoscope: null,
        log: 0,
        baseId: 0,
        created: null
    };

    componentDidMount() {
        // Load the user data
        this.retrieveUserData()
            .then(res => this.setState( {
                username: res.username,
                // horoscope: res.horoscope,
                log: res.log,
                baseId: res.baseId
            }));
    }

    retrieveUserData = async () => {
        const response = await fetch('/user_data?userId=' + this.props.myUserId);
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
                    // horoscope={this.state.horoscope}
                    log={this.state.log}
                    baseId={this.state.baseId}
                    myUserId={this.props.myUserId}
                    />
                <span>&nbsp;</span>
                {/*<Feed myUserId={this.props.myUserId} />*/}
                <Chat myUserId={this.props.myUserId} />
                <Feed myUserId={this.props.myUserId} />
            </div>
        );
    }
}

export default User;