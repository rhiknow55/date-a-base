import React, { Component }from 'react';
// import { CommentSection, AddComment, CommentBox } from './Comment.js';
// import './Post.css';


class Trophy extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            trophyId: this.props.trophyId,
        }
    }

    render() {
        return (
            <div className="Trophy-container">
                <p>Trophy Id = {this.state.trophyId}</p>
                
            </div>
        );
    }
}

export default Trophy;