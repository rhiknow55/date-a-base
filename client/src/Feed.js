import React, { Component } from 'react';
import Post, {AddPost} from "./Post";
import './Feed.css'

const NUMBER_OF_POSTS_TO_LOAD = 10;

class Feed extends Component {
    constructor(props){
        super(props);

        this.state = {
            postIds: [],
            filteredByFriends: false
        };

        this.filter = this.filter.bind(this);
    }

    componentDidMount() {
        this.retrieveFeed();
    }

    retrieveFeed()
    {
        // Load the feed contents
        this.retrieveFeedAsync()
            .then(res => {this.setState( {
                postIds: res.postIds,
                filteredByFriends: false
        })}
    )
    }

    retrieveFeedAsync = async () => {
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
        console.log("inside renderPosts: " + this.state.postIds)
        let postIds = this.state.postIds;
        for (let i = 0; i < postIds.length; ++i)
        {
            posts.push(<Post key={postIds[i].postid} postId = {postIds[i].postId} myUserId={this.props.myUserId}/>);
        }

        return posts;
    }

    // Refresh the comment section. Callback for when you add a comment
    refreshFeed = () =>
    {
        this.retrieveFeed();
    }

    filter(event){
        // If currently filtered by friend, toggle to global feed
        if (this.state.filteredByFriends)
        {
            console.log("global filter")
            this.retrieveFeed();
        }
        else
        {
            // else if currently not friend feed, toggle to friend feed
            console.log("friend filter")
            this.retrieveFriendsFeed();
        }

        event.preventDefault();
    }

    retrieveFriendsFeed()
    {
        // Load the feed contents
        this.retrieveFriendsFeedAsync()
            .then(res => {this.setState( {
                postIds: res.postIds,
                filteredByFriends: true
            })
            }
    );
    }

    retrieveFriendsFeedAsync = async () => {
        let url = '/retrieve_friend_posts?userId=' + this.props.myUserId;
        const response = await fetch(url)

        const json = await response.json();

        if (response.status !== 200) {
            throw Error(json.message)
        }
        return json;
    }

    render() {
        return (
            // TODO: Make a box that contains the posts
            <div className='Feed-container'>
                <p>Feed Start</p>
                <AddPost myUserId={this.props.myUserId} refresh={this.refreshFeed} />

                <button type="button" onClick={this.filter} className="btn">{this.state.filteredByFriends ? 'Global' : 'Friends'}</button>
                {this.renderPosts()}
            </div>
        );
    }
}


export default Feed;