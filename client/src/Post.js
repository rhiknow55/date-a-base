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
            user: {username: null, horoscope: null, log: null},
            liked: false
        }

        this.handleLike = this.handleLike.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({postId: nextProps.postId}, () => {
            this.getPost()
        })
    }

    componentDidMount() {
        this.getPost();
    }

    getPost()
    {
        // Load the feed contents
        this.getPostAsync()
            .then(res => {
            this.setState({
                message: res.message,
                image: res.image,
                userId: res.userId
            });

        this.getUserData();
        this.getLikedPost();
        this.refreshCommentSection();
    });
    }

    getPostAsync = async () => {
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
        const response = await fetch('/user_data?userId=' + this.props.myUserId);
        const json = await response.json();

        if (response.status !== 200) {
            throw Error(json.message)
        }
        return json;
    }

    getLikedPost = function()
    {
        this.retrieveLikedPost()
            .then(res => this.setState( {
            liked: res.liked
        }));
    }

    retrieveLikedPost = async () => {
        const response = await fetch('/get_if_like?userId=' + this.props.myUserId + '&postId=' + this.state.postId);
        const json = await response.json();

        if (response.status !== 200) {
            throw Error(json.message)
        }
        return json;
    }

    handleLike(event) {
        if (this.state.liked)
        {
            this.unlikePost();
        }
        else
        {
            this.likePost();
        }

        event.preventDefault();
    }

    // Actually sending an API call to like post to database
    likePost = function(){
        this.likePostAsync()
            .then(
                this.setState({liked: true})
            );
    }

    likePostAsync = async (commentId) =>
    {
        let url = '/like_post';
        const response = await fetch(url,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId: this.props.myUserId, postId: this.state.postId})
        });

        const json = await response.json();

        if (response.status !== 200) {
            throw Error(json.message)
        }

        return json;
    }

    // Actually sending an API call to unlike post to database
    unlikePost = function(){
        this.unlikePostAsync()
            .then(
                this.setState({liked: false})
            );
    }

    unlikePostAsync = async (commentId) =>
    {
        let url = '/unlike_post';
        const response = await fetch(url,
        {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId: this.props.myUserId, postId: this.state.postId})
        });

        const json = await response.json();

        if (response.status !== 200) {
            throw Error(json.message)
        }

        return json;
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
                <p>Post = {this.state.postId}</p>
                <p>Username = {this.state.user.username}</p>
                <p>Message = {this.state.message}</p>
                <button type="button" onClick={this.handleLike} className="Comment-user-button">{this.state.liked ? 'Unlike' : 'Like'}</button>
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

export class AddPost extends Component
{
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

    // Handling the click of the submit button. Will get the number of posts made by user
    handleSubmit(event) {
        // Post to database
        this.getNumberOfPosts();

        // Prevent page from refreshing
        event.preventDefault()
    }

    // Get number of posts made by user so far
    getNumberOfPosts = () =>
    {
        this.getPostsMade()
            .then(res => {
                this.actuallySubmit(res.amount)
            });
    }

    getPostsMade = async () => {
        const response = await fetch('/posts_made_by_user?userId=' + this.props.myUserId);
        const json = await response.json();

        if (response.status !== 200) {
            throw Error(json.message)
        }
        return json;
    }

    // This gets called once done getting number of comments
    // It calls the actual method that adds the comment
    actuallySubmit(postAmount)
    {
        let postId = this.props.myUserId.toString() + '0' + postAmount.toString();
        this.addPost(postId);
    }

    // Actually sending an API call to post comment to database
    addPost = function(postId){
        this.postPost(postId)
            .then(
                this.props.refresh(),
                this.setState({message: ""})
            );
    }

    postPost = async (postId) =>
    {
        let url = '/add_post';
        const response = await fetch(url,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({postId: postId, message: this.state.message, userId: this.props.myUserId})
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
                <div className="form-group">
                    <textarea className="form-control rounded-5" value={this.state.message} onChange={this.handleChange}
                        id="exampleFormControlTextarea1" placeholder="What's on your mind?" rows="10"></textarea>
                    <span>&nbsp;</span>
                    <button type="submit" className="btn btn-primary mb-2">Post</button>
                    <span>&nbsp;</span>
                </div>
            </form>
        );
    }
}


export default Post;