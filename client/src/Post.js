import React, { Component }from 'react';

class Post extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            postId: this.props.postId,
            message: null,
            image: null,
            userId: null,
            user: {username: null, horoscope: null, log: null}
        }
    }

    componentDidMount() {
        // Load the feed contents
        this.retrieveFeed()
            .then(res => {
            this.setState({
                message: res.message,
                image: res.image,
                userId: res.userId
            });

            this.getUserData();
        });


    }

    retrieveFeed = async () => {
        let url = '/get_post?postId=' + this.state.postId;
        const response = await fetch(url)

        const json = await response.json();

        if (response.status !== 200) {
            throw Error(json.message)
        }
        return json;
    }

    getUserData = function()
    {
        this.retrieveUserData()
            .then(res => this.setState( {
            user: {username: res.username, horoscope: res.horoscope, log: res.log}
        }));
    }

    retrieveUserData = async () => {
        const response = await fetch('/user_data?userId=' + this.state.userId);
        const json = await response.json();

        if (response.status !== 200) {
            throw Error(json.message)
        }
        return json;
    }

    render() {
        return (
            <div>
                <p>Post Id = {this.state.postId}</p>
                <p>Username = {this.state.user.username}</p>
                <p>Message = {this.state.message}</p>
            </div>
        );
    }
}

export default Post;