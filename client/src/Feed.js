import React, { Component } from 'react';
import Post from "./Post";

const NUMBER_OF_POSTS_TO_LOAD = 10;

class Feed extends Component {
    state = {
        postIds: null
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

    loadPosts = () =>
    {
        let posts = [];

        // Add the posts
        for (let i = 0; i < NUMBER_OF_POSTS_TO_LOAD; ++i)
        {
            // TODO: Get the recent posts via timestamp from express
            posts.push(<Post postName = {i}/>);
        }

        return posts;
    }

    renderPosts = () =>
    {
        let posts = [];

        // Add the posts
        for (let i = 0; i < this.state.postIds.length; ++i)
        {
            posts.push(<Post postName = {i}/>);
        }

        return posts;
    }

    render() {
        return (
            // TODO: Make a box that contains the posts
            <div className="User">
                <p>Feed Start</p>

                {this.loadPosts()}
                {this.state.postIds}
            </div>
        );
    }
}


export default Feed;