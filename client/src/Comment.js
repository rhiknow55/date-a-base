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
        this.loadComments();
        this.props.onRef(this);
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
    }

    loadComments() {
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
            comments.push(<CommentBox key={commentIds[i].commentId} comment = {commentIds[i]}/>);
        }

        return comments;
    }

    render()
    {
        return(
            <div className="CommentSection-container">
                CommentSection
                {this.renderComments()}
                <br></br>
            </div>
        );
    }
}



export class AddComment extends Component {
    constructor(props)
    {
        super(props);
        this.state = {message: ""};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Handling change of textbox
    handleChange(event) {
        this.setState({message: event.target.value});
    }

    // Handling the click of the submit button. Will get the number of comments made by user on that post first
    handleSubmit(event) {
        // Post to database
        this.getNumberOfComments();

        // Prevent page from refreshing
        event.preventDefault()
    }

    // Get number of comments made by user so far
    getNumberOfComments = () =>
    {
        this.getCommentsOnPost()
            .then(res => {
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

    // This gets called once done getting number of comments
    // It calls the actual method that adds the comment
    actuallySubmit(commentAmount)
    {
        let commentId = this.props.myUserId.toString() + '0' + this.props.postId.toString() + '0' + commentAmount.toString();
        this.addComment(commentId);
    }

    // Actually sending an API call to post comment to database
    addComment = function(commentId){
        this.postComment(commentId)
            .then(
                this.props.refresh(),
                this.setState({message: ""})
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

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input className="form-control form-control-lg" type="text" placeholder="Add comment here..." value={this.state.message} onChange={this.handleChange}/>
                <span>&nbsp;</span>
                <button type="submit" className="btn btn-primary mb-2">Comment</button>
                <span>&nbsp;</span>
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
                <button className="Comment-user-button">{this.state.user.username}</button>
                <div className="Comment-message">{this.props.comment.message}</div>
                <p className="Comment-timestamp">{this.timeSince(this.getDate(this.props.comment.timeStamp))} ago</p>
            </div>
        );
    }
}