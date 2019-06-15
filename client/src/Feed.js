import React, { Component } from 'react';
import Post from "./Post";

const NUMBER_OF_POSTS_TO_LOAD = 10;

class Feed extends Component {
    state = {
        postIds: []
    };

    componentDidMount() {
        // Load the feed contents
        this.retrieveFeed()
            .then(res => this.setState( {
                postIds: res.postIds
            }));
    }

    retrieveFeed = async () => {
        let url = '/retrieve_posts?numberOfPosts=' + NUMBER_OF_POSTS_TO_LOAD;
        const response = await fetch(url)

        // const response = await fetch('/retrieve_posts?', {
        //     method: 'POST',
        //     headers: new Headers({
        //         'Accept': 'application/json, text/plain, */*',
        //         'Content-Type': 'application/json'
        //     }),
        //     body: JSON.stringify({
        //         numberOfPosts: NUMBER_OF_POSTS_TO_LOAD
        //     })
        // })

        const json = await response.json();

        if (response.status !== 200) {
            throw Error(json.message)
        }
        return json;
    }

    // Translates this.state.postIds into legible React Post objects
    renderPosts = () =>
    {
        let posts = [];

        // Add the posts
        let postIds = this.state.postIds;
        for (let i = 0; i < postIds.length; ++i)
        {
            posts.push(<Post postId = {postIds[i].postid}/>);
        }

        return posts;
    }

    render() {
        return (
            // TODO: Make a box that contains the posts
            <div>
                <p>Feed Start</p>
                {this.renderPosts()}
            </div>
        );
    }
}


export default Feed;