import React, { Component } from 'react';
import "./Profile.css";
import ElectricBass from './images/electricBass.png';
import Trophy from "./Trophy.js";
import Post from "./Post";


class Profile extends Component
{
    state = {
        baseLogo: null,
        trophyIds: []
    };

    componentWillReceiveProps(){
      if(this.props.baseId == 2){
        this.setState({baseLogo: ElectricBass });
        // this.classMethod();
      }
    }

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
    }

    retrieveTrophy = async () => {
        console.log('get api is called');
        console.log("user id: " + this.props.myUserId);
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

        // Add the posts
        let trophyIds = this.state.trophyIds;
        for (let i = 0; i < trophyIds.length; ++i)
        {
            trophies.push(<Trophy trophyId = {trophyIds[i].trophyId} myUserId={this.props.myUserId}/>);
        }

        return trophies;
    }

    render() {
        return (
            <div className='Profile-container'>
                <h1>User Profile Here</h1>
                {/*<img src={ElectricBass} alt="ElectricBass" />;*/}
                {/*todo: using baseLogo can change logo based on baseId, but cannot be rendered after user login*/}
                {/*<img src={this.state.baseLogo} />*/}
                <img src={ElectricBass} />
                {/*<img src='./images/electricBass.png' />*/}
                <p>Username: {this.props.username}</p>
                <p>Horoscope: {this.props.horoscope}</p>
                {/*<span>&nbsp;</span>*/}
                <p>Points: {this.props.log}</p>
                {/*<p>BaseId: {this.props.baseId}</p>*/}
                {/*<Trophy trophyIds={this.state.trophyIds}/>*/}
                {this.renderTrofiess()}
            </div>
        );
    }
}


export default Profile;