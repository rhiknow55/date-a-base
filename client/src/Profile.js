import React, { Component } from 'react';
import "./Profile.css";
import ElectricBass from './images/electricBass.png';
import ChemicalBase from './images/chemicalBase.png';
import Baseball from './images/baseball.png';
import Trophy from "./Trophy.js";
import {Button, FormControl, FormGroup, NavItem} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";


class Profile extends Component
{
    state = {
        trophyIds: [],
        hasAllTrophies: false,
        newUserName: "",
        userName: "user name in state",
        isTakingQuestions: false,
        questions: []
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

        this.retrieveQuestions()
            .then(res => {
                console.log(res.questions);
                // console.log(typeof res.trophyIds);
                this.setState( {

                questions: res.questions
                });
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
            return <h3>you have all the trophies!</h3>;
        }

    }

    validateForm() {
        return this.state.newUserName.length > 0;
      }

    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }

    handleSubmit = event => {
        event.preventDefault();

        try{
          this.updateUserName();
          // this.props.history.push("/user");
        } catch (e) {
         alert(e.message);
       }
      }
      

     handleAlternate(event) {
        event.preventDefault();
        console.log('on click taking sorting hat questions');
        this.setState({
              isTakingQuestions: true
            });
        console.log(this.state.isTakingQuestions);

      }


      renderQuestions() {
        console.log("render questions:");
        console.log(this.state.questions);

        let questionContents = [];

        // Add the questions
        let questions = this.state.questions;
        for (let i = 0; i < questions.length; ++i)
        {
            questionContents.push(<p>Question {i}:  {questions[i].question}</p>);
        }
        return questionContents;
      }

      retrieveQuestions = async () => {
        console.log('get questions api is called');
        let url = '/get_questions';
        const response = await fetch(url)

        const json = await response.json();

        if (response.status !== 200) {
            throw Error(json.message)
        }
        console.log(json);
        return json;
    }

     updateUserName = async () => {
        console.log('update user name');
        console.log(this.state.newUserName);
        // var newUserName = this.state.newUserName;
        // var userId = this.props.myUserId;
        console.log('current user id:');
        // let url = '/update_user_name?newUserName=' + this.state.newUserName + '&userId=' + this.props.myUserId;

        const response = await fetch('/update_user_name', {
          method: 'POST',
          headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            newUserName: this.state.newUserName,
            userId: this.props.myUserId,
          })
        });

        if (response.status !== 200) {
            //throw Error(body.message)
            console.log('user name update failed')
        } else {
          console.log("Successfully updated, current user name is updated to:");
          console.log(this.state.userName);
          // const response_json = await response.json();
          // console.log(response_json);
          // const userId = response_json.userId;
          // const username = response_json.username;
          // console.log(`userID: ${userId}`)
          // this.props.userHasAuthenticated(true, userId, username);
          // this.props.history.push("/");

        }

     }

    render() {
        return (
            <div className='Profile-container'>
                <h2>My Profile</h2>
                {this.renderBaseLogo(this.props.baseId)}
                <p>BaseId: {this.props.baseId}</p>
                <p>Username: {this.props.username}</p>


                <form onSubmit={this.handleSubmit}>
                  <FormGroup controlId="newUserName" bsSize="small">
                    {/*<label></label>*/}
                    <FormControl
                      autoFocus
                      type="newUserName"
                      value={this.state.newUserName}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <Button
                    // block
                    bsSize="small"
                    disabled={!this.validateForm()}
                    type="submit"
                  >
                    Update My User Name
                  </Button>
                </form>

                <p>Horoscope: {this.props.horoscope}</p>
                <p>Points: {this.props.log}</p>
                {this.renderHasAllTrofies()}
                {this.renderTrofiess()}
                <Button
                    // block
                    bsSize="small"
                    onClick={this.handleAlternate.bind(this)}
                  >
                    View sorting hat questions
                  </Button>
                  { this.state.isTakingQuestions
                    ? this.renderQuestions()
                    : null
                  }
            </div>
        );
    }
}


export default Profile;