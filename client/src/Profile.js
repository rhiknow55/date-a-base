import React, { Component } from 'react';
import "./Profile.css";
import ElectricBass from './images/electricBass.png';


class Profile extends Component
{
    state = {
        baseLogo: null
    };

    componentWillReceiveProps(){
      if(this.props.baseId == 2){
        this.setState({baseLogo: ElectricBass });
        // this.classMethod();
      }
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

            </div>
        );
    }
}


export default Profile;