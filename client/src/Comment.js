import React, {Component} from 'react';
import './Post.css';

export class CommentSection extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            hasComments: false,
            postId: this.props.postId,
            commentIds: []
        }
    }

    componentDidMount() {
        // Load the comments for this post
        this.retrieveFeed()
            .then(res =>
            this.setState({
                hasComments: true,
                commentIds: res.commentIds
            }));
    }

    retrieveFeed = async () => {
        let url = '/retrieve_comments?postId=' + this.props.postId;
        const response = await fetch(url)

        const json = await response.json();

        if (response.status !== 200) {
            throw Error(json.message)
        }
        return json;
    }

    renderComments = () =>
    {
        let comments = [];

        // Add the posts
        let commentIds = this.state.commentIds;
        for (let i = 0; i < commentIds.length; ++i)
        {
            comments.push(<CommentBox comment = {commentIds[i]}/>);
        }

        return comments;
    }

    render()
    {
        return(
            <div className="CommentSection-container">
                CommentSection
                {this.renderComments()}
            </div>
        );
    }
}

export class AddComment extends Component {
    constructor(props)
    {
        super(props);
        this.state = {message: "Insert comment here"};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    addComment = function(commentId){
        this.postComment(commentId)
            .then(
                console.log("Comment added")
            );
    }

    postComment = async (commentId) =>
    {
        let url = '/add_comment';
        const response = await fetch(url,
         {
             method: 'POST',
             headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({commentId: commentId, message: this.state.message, postId: this.props.postId, userId: this.props.myUserId})
         });

        const json = await response.json();

        if (response.status !== 200) {
            throw Error(json.message)
        }

        return json;
    }

    handleChange(event) {
        this.setState({message: event.target.value});
    }

    handleSubmit(event) {
        // Post to database
        this.getNumberOfComments();

        // Prevent page from refreshing
        event.preventDefault()
    }

    actuallySubmit(commentAmount)
    {
        let commentId = this.props.myUserId.toString() + this.props.postId.toString() + commentAmount.toString();
        console.log(commentId);
        this.addComment(commentId);
    }

    // Get number of comments made by user so far
    getNumberOfComments = () =>
    {
        this.getCommentsOnPost()
            .then(res => {
                console.log("amount: " + res.amount);
                this.actuallySubmit(res.amount)});
    }

    getCommentsOnPost = async () => {
        const response = await fetch('/comments_made_on_post?postId=' + this.props.postId + '&userId=' + this.props.myUserId);
        const json = await response.json();

        if (response.status !== 200) {
            throw Error(json.message)
        }
        return json;
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Comment:
                    <input type="text" value={this.state.message} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}

export class CommentBox extends Component {
    state = {
        user: {username: null, horoscope: null, log: null}
    }

    componentDidMount() {
        this.retrieveUserData()
            .then(res => this.setState( {
            user: {username: res.username, horoscope: res.horoscope, log: res.log}
        }));
    }

    getDate = function(mysqlTime)
    {
        // Split timestamp into [ Y, M, D, h, m, s ]
        var t = mysqlTime.split(/[- T : .]/);


        // Apply each element to the Date function
        var d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));

        return d;
    }

    timeSince = function(date) {

        var seconds = Math.floor((new Date() - date) / 1000);

        var interval = Math.floor(seconds / 31536000);

        if (interval > 1) {
            return interval + " years";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " days";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }

    retrieveUserData = async () => {
        const response = await fetch('/user_data?userId=' + this.props.comment.userId);
        const json = await response.json();

        if (response.status !== 200) {
            throw Error(json.message)
        }
        return json;
    }

    render() {
        return (
            <div className='Comment-container'>
                <p>{this.timeSince(this.getDate(this.props.comment.timeStamp))} ago</p>
                <p></p>
                <button>{this.state.user.username}</button>
                {this.props.comment.message}
            </div>
        );
    }
}