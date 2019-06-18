import React, { Component } from 'react';
import "./Profile.css";


class Profile extends Component
{
    render() {
        return (
            <div className='Profile-container'>
                <h1>User Profile Here</h1>
                Username = {this.props.username}
                Horoscope = {this.props.horoscope}
                Points = {this.props.log}
                BaseId = {this.props.baseId}
            </div>
        );
    }
}


export default Profile;