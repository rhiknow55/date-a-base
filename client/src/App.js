import React, { Component } from 'react';
import User from './User.js';
import Login from './Login.js';
import './App.css'
import './Color.css'
import Chat from './Chat.js'


class App extends Component {
    state = {
        data: null
    };

    componentDidMount() {
        // Call our fetch function below once the component mounts
        this.callBackendAPI()
            .then(res => this.setState({ data: res.express }))
            .catch(err => console.log(err));
    }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    callBackendAPI = async () => {
        const response = await fetch('/express_backend');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Date-a-base</h1>
                </header>

                <Chat />

                <p className="App-intro">{this.state.data}</p>
                <Login />
                <User myUserId={1}/>
            </div>
    );
    }
}

export default App;