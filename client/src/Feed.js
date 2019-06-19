import React, { Component } from 'react';
import Post, {AddPost} from "./Post";
import './Feed.css'

const NUMBER_OF_POSTS_TO_LOAD = 10;

class Feed extends Component {
    state = {
        postIds: []
    };

    componentDidMount() {
        this.loadFeed();
    }

    loadFeed()
    {
        // Load the feed contents
        this.retrieveFeed()
            .then(res => {this.setState( {
            postIds: res.postIds
        })}
    );
    }

    retrieveFeed = async () => {
        let url = '/retrieve_posts?numberOfPosts=' + NUMBER_OF_POSTS_TO_LOAD;
        const response = await fetch(url)

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
            posts.push(<Post key={postIds[i].postid} postId = {postIds[i].postid} myUserId={this.props.myUserId}/>);
        }

        return posts;
    }

    // Refresh the comment section. Callback for when you add a comment
    refreshFeed = () =>
    {
        this.loadFeed();
    }

    render() {
        return (
            // TODO: Make a box that contains the posts
            <div className='Feed-container'>
                <p>Feed Start</p>
                <AddPost myUserId={this.props.myUserId} refresh={this.refreshFeed} />
                {this.renderPosts()}
            </div>
        );
    }
}


export default Feed;