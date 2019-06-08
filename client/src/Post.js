import React, { Component }from 'react';

class Post extends Component
{
    render() {
        return (
            <div>
                <p>Post Name = {this.props.postName}</p>
            </div>
        );
    }
}

export default Post;