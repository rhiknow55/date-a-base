import React, { Component }from 'react';
import { CommentSection, AddComment, CommentBox } from './Comment.js';
import './Post.css';


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

    // Add comment function
    addComment = function()
    {
        // POST comment

        console.log("Comment added!");
    }

    // Refresh the comment section. Callback for when you add a comment
    refreshCommentSection = () =>
    {
        this.commentSection.loadComments();
    }



    // report

    reportPost = async (postId) =>
    {
        let url = '/report_post';
        //console.log("============")
        //console.log(this.props.myUserId)
        //console.log(this.state.roomIds[0].sessionId)
        //console.log(this.state.number)
        //console.log(JSON.stringify({chatMessageId: chatmessageid, message: this.state.text, chatSessionId: this.state.roomIds[0].sessionId, userId: this.props.myUserId}))
        //console.log("adsfasdfsdfsdfsdf" +postId+this.props.myUserId)
        const response = await fetch(url,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({reportId: (postId*10+this.props.myUserId), postId: postId, userId: this.props.myUserId})
            });

        const json = await response.json();

        if (response.status !== 200) {
            throw Error(json.message)
        }

        return json;
    }



    render() {
        return (
            <div className="Post-container">
                <p>Post Id = {this.state.postId}</p>
                <p>Username = {this.state.user.username}</p>
                <p>Message = {this.state.message}</p>

                <CommentSection onRef={ref => (this.commentSection = ref)} postId={this.state.postId}/>
                <AddComment postId={this.state.postId} myUserId={this.props.myUserId} refresh={this.refreshCommentSection}/>
                <a
                    onClick={() => this.reportPost(this.state.postId)}
                    href="#">
                    # Report
                </a>
            </div>
        );
    }
}

export default Post;