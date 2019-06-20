import React, { Component } from 'react';
import "./Profile.css";
import ElectricBass from './images/electricBass.png';
import ChemicalBase from './images/chemicalBase.png';
import Baseball from './images/baseball.png';
import Trophy from "./Trophy.js";
import Post from "./Post";
import {NavItem} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";


class Profile extends Component
{
    state = {
        trophyIds: [],
        hasAllTrophies: false
    };

    componentDidMount() {
        console.log("call componentDidMount")
        // Load the trophies
        this.retrieveTrophy()
            .then(res => {
                console.log(res.trophyIds);
                console.log(typeof res.trophyIds);
                this.setState( {

                trophyIds: res.trophyIds
                });
            });
        this.hasAllTrophies()
            .then(res => {
                console.log('get all user ids that has all trophies');

                let allTrophiesUserIds = res.userIds;
                for (let i = 0; i < allTrophiesUserIds.length; i++)
                {
                    if (this.props.myUserId == allTrophiesUserIds[i].userId){
                        console.log('you have all the trophies!')
                        this.setState( {
                            hasAllTrophies: true
                        });
                    }
                }
                console.log(this.state.hasAllTrophies);
            });
    }

    retrieveTrophy = async () => {
        // console.log('get api is called');
        // console.log("user id: " + this.props.myUserId);
        let url = '/get_trophies?userId=' + this.props.myUserId;
        const response = await fetch(url)

        const json = await response.json();

        if (response.status !== 200) {
            throw Error(json.message)
        }
        console.log(json);
        return json;
    }

    renderTrofiess = () =>
    {
        let trophies = [];

        // Add the trophies
        let trophyIds = this.state.trophyIds;
        for (let i = 0; i < trophyIds.length; ++i)
        {
            trophies.push(<Trophy trophyId = {trophyIds[i].trophyId} myUserId={this.props.myUserId}/>);
        }
        return trophies;
    }

    renderBaseLogo(baseId)
    {
        switch(baseId) {
            case 1:
              return <img src={ElectricBass} />;
            case 2:
              return <img src={ChemicalBase} />;
            case 3:
              return <img src={Baseball} />;
            case 4:
              return <p>Log base</p>;
            case 5:
              return <p>Bass Fish</p>;;
            default:
              return null;
        }
    }

    hasAllTrophies = async () => {
        console.log('hasAllTrophies is called');
        console.log("user id: " + this.props.myUserId);
        let url = '/has_all_trophies';
        const response = await fetch(url)

        const json = await response.json();

        if (response.status !== 200) {
            throw Error(json.message)
        }
        console.log(json);
        return json;
    }

    renderHasAllTrofies = () =>
    {
        let hasAllTrophies = this.state.hasAllTrophies;
        console.log(hasAllTrophies);
        if (hasAllTrophies) {
            return <p>you have all the trophies!</p>;
        }

    }


    render() {
        return (
            <div className='Profile-container'>
                <h1>User Profile Here</h1>
                {this.renderBaseLogo(this.props.baseId)}
                <p>BaseId: {this.props.baseId}</p>
                <p>Username: {this.props.username}</p>
                <p>Horoscope: {this.props.horoscope}</p>
                {/*<span>&nbsp;</span>*/}
                <p>Points: {this.props.log}</p>
                {this.renderHasAllTrofies()}
                {this.renderTrofiess()}
            </div>
        );
    }
}


export default Profile;