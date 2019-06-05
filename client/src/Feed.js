import React, { Component } from 'react';

class Feed extends Component {
    state = {
        data: null
    };

    componentDidMount() {
        // Load the feed contents
        this.retrieveFeed()
            .then(res => this.setState( {
                data: res.data
            }));
    }

    retrieveFeed = async () => {
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
                <p>Feed</p>
                Has some stuff like filter, then the scrollable layout with posts
            </div>
        );
    }
}


export default Feed;